"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  Home,
  Monitor,
  ShoppingCart,
  ChevronsRight,
  Moon,
  Sun,
  Plus,
  Edit,
  Trash2,
  Search,
  Loader2,
  Save,
  UploadCloud,
  Package,
  LogOut,
  Laptop,
  ChevronDown,
  Bell,
  User,
  Activity,
  TrendingUp,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  getFileFromGitHub,
  saveFileToGitHub,
  uploadImageToGitHub,
} from "@/lib/github";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/lib/data/products";
import type { Rental } from "@/lib/data/rentals";

/* ============================================================
   TYPES
============================================================ */

type ProductForm = Omit<
  Product,
  "id" | "slug" | "imageUrl" | "price" | "design"
> & {
  price: string;
  image: File | null;
  design: NonNullable<Product["design"]>;
};

type RentalForm = Omit<Rental, "id" | "imageUrl" | "pricePerDay"> & {
  pricePerDay: string;
  image: File | null;
};

const productSpecFields = [
  "cpu",
  "ram",
  "storage",
  "gpu",
  "screen",
  "battery",
  "weight",
  "os",
] as const;
const rentalSpecFields = ["cpu", "ram", "storage", "gpu"] as const;

const getErrorMessage = (error: unknown) =>
  error instanceof Error
    ? error.message
    : "Terjadi kesalahan yang tidak diketahui.";

export default function AdminDashboard() {
  const [isDark, setIsDark] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("Dashboard");

  const [token, setToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const [products, setProducts] = useState<Product[]>([]);
  const [productSha, setProductSha] = useState("");

  const [rentals, setRentals] = useState<Rental[]>([]);
  const [rentalSha, setRentalSha] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"product" | "rental">("product");
  const [editingId, setEditingId] = useState<string | null>(null);

  const initialProductForm: ProductForm = {
    name: "",
    brand: "",
    price: "",
    category: "Gaming",
    condition: "Baru",
    description: "",
    isSoldOut: false,
    image: null as File | null,
    design: { material: "", color: "", weight: "", thickness: "" },
    specs: {
      cpu: "",
      ram: "",
      storage: "",
      gpu: "",
      screen: "",
      battery: "",
      weight: "",
      os: "",
    },
  };

  const initialRentalForm: RentalForm = {
    name: "",
    brand: "",
    pricePerDay: "",
    category: "Gaming",
    minDays: 1,
    image: null as File | null,
    specs: { cpu: "", ram: "", storage: "", gpu: "" },
  };

  const [productForm, setProductForm] = useState(initialProductForm);
  const [rentalForm, setRentalForm] = useState(initialRentalForm);

  const loadAdminData = useCallback(async (tk: string) => {
    const [prodData, rentData] = await Promise.all([
      getFileFromGitHub<Product[]>(tk, "public/data/products.json"),
      getFileFromGitHub<Rental[]>(tk, "public/data/rentals.json"),
    ]);

    return {
      products: prodData.data,
      productSha: prodData.sha,
      rentals: rentData.data,
      rentalSha: rentData.sha,
    };
  }, []);

  const login = async (tk: string) => {
    setLoading(true);
    try {
      const data = await loadAdminData(tk);
      setToken(tk);
      setProducts(data.products);
      setProductSha(data.productSha);
      setRentals(data.rentals);
      setRentalSha(data.rentalSha);
      setIsLoggedIn(true);
      localStorage.setItem("gh_token", tk);
    } catch (err: unknown) {
      alert(getErrorMessage(err));
      localStorage.removeItem("gh_token");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isDark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [isDark]);

  useEffect(() => {
    const savedToken = localStorage.getItem("gh_token");
    if (!savedToken) return;

    void loadAdminData(savedToken)
      .then((data) => {
        setToken(savedToken);
        setProducts(data.products);
        setProductSha(data.productSha);
        setRentals(data.rentals);
        setRentalSha(data.rentalSha);
        setIsLoggedIn(true);
      })
      .catch((error: unknown) => {
        alert(getErrorMessage(error));
        localStorage.removeItem("gh_token");
      });
  }, [loadAdminData]);

  const handleLogout = () => {
    localStorage.removeItem("gh_token");
    setIsLoggedIn(false);
    setProducts([]);
    setRentals([]);
  };

  /* ------------------ SAVE PRODUCT ------------------ */
  const handleSaveProduct = async () => {
    if (!productForm.name || !productForm.price)
      return alert("Nama & Harga wajib diisi");
    setLoading(true);
    try {
      const imageUrl = productForm.image
        ? await uploadImageToGitHub(token, productForm.image)
        : "/images/logo.png";
      const { image, ...productData } = productForm;
      let updated = [...products];

      if (editingId) {
        updated = updated.map((p) =>
          p.id === editingId
            ? {
                ...p,
                ...productData,
                price: parseInt(productForm.price),
                imageUrl: image ? imageUrl : p.imageUrl,
              }
            : p
        );
      } else {
        updated.unshift({
          id: Date.now().toString(),
          slug: productForm.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          ...productData,
          price: parseInt(productForm.price),
          imageUrl,
        });
      }

      const res = await saveFileToGitHub(
        token,
        "public/data/products.json",
        updated,
        productSha,
        `Admin: Update Produk ${productForm.name}`
      );
      setProducts(updated);
      setProductSha(res.content.sha);
      setIsModalOpen(false);
      alert("✅ Produk disimpan!");
    } catch (err: unknown) {
      alert(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  /* ------------------ SAVE RENTAL ------------------ */
  const handleSaveRental = async () => {
    if (!rentalForm.name || !rentalForm.pricePerDay)
      return alert("Nama & Harga wajib diisi");
    setLoading(true);
    try {
      const imageUrl = rentalForm.image
        ? await uploadImageToGitHub(token, rentalForm.image)
        : "/images/logo.png";
      const { image, ...rentalData } = rentalForm;
      let updated = [...rentals];

      if (editingId) {
        updated = updated.map((r) =>
          r.id === editingId
            ? {
                ...r,
                ...rentalData,
                pricePerDay: parseInt(rentalForm.pricePerDay),
                imageUrl: image ? imageUrl : r.imageUrl,
              }
            : r
        );
      } else {
        updated.unshift({
          id: Date.now().toString(),
          ...rentalData,
          pricePerDay: parseInt(rentalForm.pricePerDay),
          imageUrl,
        });
      }

      const res = await saveFileToGitHub(
        token,
        "public/data/rentals.json",
        updated,
        rentalSha,
        `Admin: Update Rental ${rentalForm.name}`
      );
      setRentals(updated);
      setRentalSha(res.content.sha);
      setIsModalOpen(false);
      alert("✅ Rental disimpan!");
    } catch (err: unknown) {
      alert(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  /* ------------------ DELETE ------------------ */
  const handleDelete = async (
    type: "product" | "rental",
    id: string,
    name: string
  ) => {
    if (!confirm(`Yakin mau hapus ${name}?`)) return;
    setLoading(true);
    try {
      if (type === "product") {
        const updated = products.filter((p) => p.id !== id);
        const res = await saveFileToGitHub(
          token,
          "public/data/products.json",
          updated,
          productSha,
          `Admin: Hapus Produk ${name}`
        );
        setProducts(updated);
        setProductSha(res.content.sha);
      } else {
        const updated = rentals.filter((r) => r.id !== id);
        const res = await saveFileToGitHub(
          token,
          "public/data/rentals.json",
          updated,
          rentalSha,
          `Admin: Hapus Rental ${name}`
        );
        setRentals(updated);
        setRentalSha(res.content.sha);
      }
      alert("🗑️ Dihapus!");
    } catch (err: unknown) {
      alert(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const openEditProduct = (p: Product) => {
    setModalType("product");
    setProductForm({
      name: p.name,
      brand: p.brand,
      price: p.price.toString(),
      category: p.category,
      condition: p.condition,
      description: p.description,
      isSoldOut: p.isSoldOut,
      image: null,
      design: p.design || initialProductForm.design,
      specs: p.specs,
    });
    setEditingId(p.id);
    setIsModalOpen(true);
  };

  const openEditRental = (r: Rental) => {
    setModalType("rental");
    setRentalForm({
      name: r.name,
      brand: r.brand,
      pricePerDay: r.pricePerDay.toString(),
      category: r.category,
      minDays: r.minDays,
      image: null,
      specs: r.specs,
    });
    setEditingId(r.id);
    setIsModalOpen(true);
  };

  /* ------------------ LOGIN SCREEN ------------------ */
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 p-4">
        <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 w-full max-w-md space-y-6 shadow-2xl">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-red-900/50">
              <Package className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
            <p className="text-gray-400 text-sm mt-1">Laptop Makassar</p>
          </div>
          <div className="space-y-2">
            <Label className="text-gray-300">GitHub Token</Label>
            <Input
              type="password"
              placeholder="ghp_..."
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="bg-gray-950 border-gray-800 text-white"
            />
          </div>
          <Button
            onClick={() => {
              setLoading(true);
              void login(token);
            }}
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 h-11 text-base"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Masuk Dashboard"}
          </Button>
        </div>
      </div>
    );
  }

  
  return (
    <div className={`flex min-h-screen w-full ${isDark ? "dark" : ""}`}>
      <div className="flex w-full bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans">
        <Sidebar
          open={sidebarOpen}
          setOpen={setSidebarOpen}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onLogout={handleLogout}
          productCount={products.length}
          rentalCount={rentals.length}
        />

        <main className="flex-1 bg-gray-50 dark:bg-gray-950 p-6 md:p-10 overflow-auto h-screen">
          {/* HEADER */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold">
                {activeTab === "Products"
                  ? "Manajemen Produk"
                  : activeTab === "Rentals"
                  ? "Manajemen Rental"
                  : "Dashboard"}
              </h1>
              <p className="text-gray-500 mt-1">
                {activeTab === "Dashboard"
                  ? "Ringkasan toko Anda hari ini."
                  : "Kelola data toko Anda."}
              </p>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <button className="relative p-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full" />
              </button>
              <button
                onClick={() => setIsDark(!isDark)}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >
                {isDark ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </button>
              <button className="p-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                <User className="h-5 w-5" />
              </button>

              {activeTab === "Products" && (
                <Button
                  onClick={() => {
                    setModalType("product");
                    setProductForm(initialProductForm);
                    setEditingId(null);
                    setIsModalOpen(true);
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" /> Tambah Produk
                </Button>
              )}
              {activeTab === "Rentals" && (
                <Button
                  onClick={() => {
                    setModalType("rental");
                    setRentalForm(initialRentalForm);
                    setEditingId(null);
                    setIsModalOpen(true);
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" /> Tambah Rental
                </Button>
              )}
            </div>
          </div>

          {/* DASHBOARD OVERVIEW */}
          {activeTab === "Dashboard" && (
            <DashboardOverview products={products} rentals={rentals} />
          )}

          {/* PRODUK */}
          {activeTab === "Products" && (
            <DataTable
              data={products}
              type="product"
              search={search}
              setSearch={setSearch}
              onEdit={openEditProduct}
              onDelete={(id: string, name: string) =>
                handleDelete("product", id, name)
              }
            />
          )}

          {/* RENTALS */}
          {activeTab === "Rentals" && (
            <DataTable
              data={rentals}
              type="rental"
              search={search}
              setSearch={setSearch}
              onEdit={openEditRental}
              onDelete={(id: string, name: string) =>
                handleDelete("rental", id, name)
              }
            />
          )}
        </main>
      </div>

      {/* DIALOG FORM */}
      <Dialog
        open={isModalOpen}
        onOpenChange={(open) => {
          setIsModalOpen(open);
          if (!open) setEditingId(null);
        }}
      >
        <DialogContent className="w-[95vw] max-w-4xl sm:max-w-[900px] bg-white dark:bg-gray-900 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {editingId ? "Edit" : "Tambah"}{" "}
              {modalType === "product" ? "Produk" : "Rental"}
            </DialogTitle>
          </DialogHeader>

          {modalType === "product" ? (
            <div className="space-y-6 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="space-y-2">
                  <Label>Nama Laptop</Label>
                  <Input
                    value={productForm.name}
                    onChange={(e) =>
                      setProductForm({ ...productForm, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Brand</Label>
                  <Input
                    value={productForm.brand}
                    onChange={(e) =>
                      setProductForm({ ...productForm, brand: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Harga</Label>
                  <Input
                    type="number"
                    value={productForm.price}
                    onChange={(e) =>
                      setProductForm({ ...productForm, price: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Deskripsi</Label>
                  <Input
                    value={productForm.description}
                    onChange={(e) =>
                      setProductForm({
                        ...productForm,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Kategori</Label>
                  <select
                    value={productForm.category}
                    onChange={(e) =>
                      setProductForm({
                        ...productForm,
                        category: e.target.value,
                      })
                    }
                    className="w-full h-10 rounded-md border px-3 bg-transparent dark:bg-gray-950"
                  >
                    <option>Gaming</option>
                    <option>Ultrabook</option>
                    <option>Business</option>
                    <option>Office</option>
                    <option>MacBook</option>
                  </select>
                </div>
              </div>

              <div className="border-t pt-4 border-gray-200 dark:border-gray-800">
                <h3 className="text-lg font-bold mb-4">
                  Desain (Tampil di halaman Detail)
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label>Material</Label>
                    <Input
                      value={productForm.design.material}
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          design: {
                            ...productForm.design,
                            material: e.target.value,
                          },
                        })
                      }
                      placeholder="Aluminium alloy"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Warna</Label>
                    <Input
                      value={productForm.design.color}
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          design: {
                            ...productForm.design,
                            color: e.target.value,
                          },
                        })
                      }
                      placeholder="Space Gray"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Berat</Label>
                    <Input
                      value={productForm.design.weight}
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          design: {
                            ...productForm.design,
                            weight: e.target.value,
                          },
                        })
                      }
                      placeholder="1.5 kg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Ketebalan</Label>
                    <Input
                      value={productForm.design.thickness}
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          design: {
                            ...productForm.design,
                            thickness: e.target.value,
                          },
                        })
                      }
                      placeholder="15-18 mm"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t pt-4 border-gray-200 dark:border-gray-800">
                <h3 className="text-lg font-bold mb-4">Spesifikasi</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {productSpecFields.map((k) => (
                    <div key={k} className="space-y-2">
                      <Label className="uppercase text-xs">{k}</Label>
                      <Input
                        value={productForm.specs[k]}
                        onChange={(e) =>
                          setProductForm({
                            ...productForm,
                            specs: {
                              ...productForm.specs,
                              [k]: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4 border-gray-200 dark:border-gray-800 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-2">
                  <Label>Upload Foto</Label>
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 p-4 text-center rounded-xl relative hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <input
                      type="file"
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          image: e.target.files?.[0] || null,
                        })
                      }
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <UploadCloud className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm">
                      {productForm.image
                        ? productForm.image.name
                        : "Klik upload foto"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-center bg-gray-50 dark:bg-gray-950 p-6 rounded-xl border border-gray-200 dark:border-gray-800">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={productForm.isSoldOut}
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          isSoldOut: e.target.checked,
                        })
                      }
                      className="w-6 h-6 rounded"
                    />
                    <div>
                      <p className="font-bold">Tandai Sold Out</p>
                      <p className="text-xs text-gray-500">Stok habis.</p>
                    </div>
                  </label>
                </div>
              </div>

              <Button
                onClick={handleSaveProduct}
                disabled={loading}
                className="w-full h-12 bg-red-600 text-lg font-bold"
              >
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <>
                    <Save className="w-5 h-5 mr-2" /> Simpan Produk
                  </>
                )}
              </Button>
            </div>
          ) : (
            <div className="space-y-6 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label>Nama Laptop</Label>
                  <Input
                    value={rentalForm.name}
                    onChange={(e) =>
                      setRentalForm({ ...rentalForm, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Brand</Label>
                  <Input
                    value={rentalForm.brand}
                    onChange={(e) =>
                      setRentalForm({ ...rentalForm, brand: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Harga / Hari</Label>
                  <Input
                    type="number"
                    value={rentalForm.pricePerDay}
                    onChange={(e) =>
                      setRentalForm({
                        ...rentalForm,
                        pricePerDay: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Minimal Sewa (Hari)</Label>
                  <Input
                    type="number"
                    value={rentalForm.minDays}
                    onChange={(e) =>
                      setRentalForm({
                        ...rentalForm,
                        minDays: parseInt(e.target.value),
                      })
                    }
                  />
                </div>
              </div>

              <div className="border-t pt-4 border-gray-200 dark:border-gray-800">
                <h3 className="text-lg font-bold mb-4">Spesifikasi Utama</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {rentalSpecFields.map((k) => (
                    <div key={k} className="space-y-2">
                      <Label className="uppercase text-xs">{k}</Label>
                      <Input
                        value={rentalForm.specs[k]}
                        onChange={(e) =>
                          setRentalForm({
                            ...rentalForm,
                            specs: {
                              ...rentalForm.specs,
                              [k]: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4 border-gray-200 dark:border-gray-800">
                <Label>Upload Foto</Label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 p-4 text-center rounded-xl relative hover:bg-gray-50 dark:hover:bg-gray-800/50 mt-2">
                  <input
                    type="file"
                    onChange={(e) =>
                      setRentalForm({
                        ...rentalForm,
                        image: e.target.files?.[0] || null,
                      })
                    }
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <UploadCloud className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm">
                    {rentalForm.image
                      ? rentalForm.image.name
                      : "Klik upload foto"}
                  </p>
                </div>
              </div>

              <Button
                onClick={handleSaveRental}
                disabled={loading}
                className="w-full h-12 bg-red-600 text-lg font-bold"
              >
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <>
                    <Save className="w-5 h-5 mr-2" /> Simpan Rental
                  </>
                )}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

/* ============================================================
   SIDEBAR (pattern dashboard-with-collapsible-sidebar)
============================================================ */

type SidebarProps = {
  open: boolean;
  setOpen: (v: boolean) => void;
  activeTab: string;
  setActiveTab: (v: string) => void;
  onLogout: () => void;
  productCount: number;
  rentalCount: number;
};

const Sidebar = ({
  open,
  setOpen,
  activeTab,
  setActiveTab,
  onLogout,
  productCount,
  rentalCount,
}: SidebarProps) => {
  return (
    <nav
      className={`sticky top-0 h-screen shrink-0 border-r transition-all duration-300 ease-in-out z-20 flex flex-col ${
        open ? "w-64" : "w-16"
      } border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-2 shadow-sm`}
    >
      <TitleSection open={open} />

      <div className="flex-1 space-y-1 mb-2 overflow-y-auto">
        <Option
          Icon={Home}
          title="Dashboard"
          selected={activeTab}
          setSelected={setActiveTab}
          open={open}
        />
        <Option
          Icon={ShoppingCart}
          title="Products"
          selected={activeTab}
          setSelected={setActiveTab}
          open={open}
          notifs={productCount}
        />
        <Option
          Icon={Laptop}
          title="Rentals"
          selected={activeTab}
          setSelected={setActiveTab}
          open={open}
          notifs={rentalCount}
        />
        <Option
          Icon={Monitor}
          title="View Site"
          selected={activeTab}
          setSelected={() => window.open("/", "_blank")}
          open={open}
        />
      </div>

      <div className="border-t border-gray-200 dark:border-gray-800 pt-2 space-y-1">
        <button
          onClick={onLogout}
          className="flex h-11 w-full items-center rounded-md text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
        >
          <div className="grid h-full w-12 place-content-center shrink-0">
            <LogOut className="h-4 w-4" />
          </div>
          {open && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>

      <ToggleClose open={open} setOpen={setOpen} />
    </nav>
  );
};

type OptionProps = {
  Icon: LucideIcon;
  title: string;
  selected: string;
  setSelected: (v: string) => void;
  open: boolean;
  notifs?: number;
};

const Option = ({
  Icon,
  title,
  selected,
  setSelected,
  open,
  notifs,
}: OptionProps) => {
  const isSelected = selected === title;

  return (
    <button
      onClick={() => setSelected(title)}
      className={`relative flex h-11 w-full items-center rounded-md transition-all duration-200 ${
        isSelected
          ? "bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 shadow-sm border-l-2 border-red-500 font-semibold"
          : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200"
      }`}
    >
      <div className="grid h-full w-12 place-content-center shrink-0">
        <Icon className="h-4 w-4" />
      </div>

      {open && (
        <span className="text-sm font-medium transition-opacity duration-200 opacity-100">
          {title}
        </span>
      )}

      {notifs !== undefined && notifs > 0 && open && (
        <span className="absolute right-3 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 dark:bg-red-600 px-1 text-xs text-white font-medium">
          {notifs}
        </span>
      )}
    </button>
  );
};

const TitleSection = ({ open }: { open: boolean }) => (
  <div className="mb-6 border-b border-gray-200 dark:border-gray-800 pb-4">
    <div className="flex cursor-pointer items-center justify-between rounded-md p-2 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800">
      <div className="flex items-center gap-3 overflow-hidden">
        <div className="grid size-10 shrink-0 place-content-center rounded-lg bg-gradient-to-br from-red-500 to-red-700 shadow-sm">
          <Package className="h-5 w-5 text-white" />
        </div>
        {open && (
          <div className="leading-tight transition-opacity duration-200 opacity-100">
            <span className="block text-sm font-semibold text-gray-900 dark:text-gray-100">
              Laptop Makassar
            </span>
            <span className="block text-xs text-gray-500 dark:text-gray-400">
              Admin Panel
            </span>
          </div>
        )}
      </div>
      {open && (
        <ChevronDown className="h-4 w-4 text-gray-400 dark:text-gray-500 shrink-0" />
      )}
    </div>
  </div>
);

const ToggleClose = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
}) => (
  <button
    onClick={() => setOpen(!open)}
    className="w-full border-t border-gray-200 dark:border-gray-800 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
  >
    <div className="flex items-center p-1">
      <div className="grid size-10 place-content-center">
        <ChevronsRight
          className={`h-4 w-4 transition-transform duration-300 text-gray-500 dark:text-gray-400 ${
            open ? "rotate-180" : ""
          }`}
        />
      </div>
      {open && (
        <span className="text-sm font-medium text-gray-600 dark:text-gray-300 transition-opacity duration-200 opacity-100">
          Hide
        </span>
      )}
    </div>
  </button>
);

/* ============================================================
   DASHBOARD OVERVIEW (Stat cards)
============================================================ */

type StatColor = "blue" | "purple" | "green" | "orange";

const StatCard = ({
  icon: Icon,
  label,
  value,
  color,
  hint,
}: {
  icon: LucideIcon;
  label: string;
  value: number | string;
  color: StatColor;
  hint?: string;
}) => {
  const colorMap: Record<StatColor, string> = {
    blue: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
    purple:
      "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400",
    green:
      "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400",
    orange:
      "bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400",
  };
  return (
    <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 rounded-lg ${colorMap[color]}`}>
          <Icon className="h-5 w-5" />
        </div>
        <TrendingUp className="h-4 w-4 text-green-500" />
      </div>
      <h3 className="font-medium text-gray-600 dark:text-gray-400 mb-1">
        {label}
      </h3>
      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        {value}
      </p>
      {hint && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{hint}</p>
      )}
    </div>
  );
};

const DashboardOverview = ({
  products,
  rentals,
}: {
  products: Product[];
  rentals: Rental[];
}) => {
  const soldOut = products.filter((p) => p.isSoldOut).length;
  const totalPrice = products.reduce((total, product) => total + product.price, 0);

  return (
    <div className="animate-in fade-in space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={ShoppingCart}
          label="Total Produk"
          value={products.length}
          color="blue"
          hint="Semua unit terdaftar"
        />
        <StatCard
          icon={Laptop}
          label="Total Rental"
          value={rentals.length}
          color="purple"
          hint="Unit siap disewa"
        />
        <StatCard
          icon={Package}
          label="Total Harga"
          value={`Rp ${totalPrice.toLocaleString("id-ID")}`}
          color="green"
          hint="Gabungan harga seluruh laptop"
        />
        <StatCard
          icon={Activity}
          label="Sold Out"
          value={soldOut}
          color="orange"
          hint="Perlu restock"
        />
      </div>

      {/* Produk terbaru */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Produk Terbaru</h3>
        </div>
        {products.length === 0 ? (
          <p className="text-sm text-gray-500">Belum ada produk.</p>
        ) : (
          <div className="space-y-2">
            {products.slice(0, 5).map((p) => (
              <div
                key={p.id}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  className="w-10 h-10 rounded-lg object-cover bg-gray-100 border border-gray-200 dark:border-gray-700"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{p.name}</p>
                  <p className="text-xs text-gray-500 truncate">{p.brand}</p>
                </div>
                <span className="text-sm font-medium">
                  Rp {p.price.toLocaleString("id-ID")}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};



type DataTableProps<T extends Product | Rental> = {
  data: T[];
  type: "product" | "rental";
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  onEdit: (item: T) => void;
  onDelete: (id: string, name: string) => void;
};

const DataTable = <T extends Product | Rental>({
  data,
  type,
  search,
  setSearch,
  onEdit,
  onDelete,
}: DataTableProps<T>) => {
  const filtered = data.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.brand.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="animate-in fade-in">
      <div className="mb-6 flex items-center gap-3">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Cari..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <p className="text-sm text-gray-500">
          Menampilkan {filtered.length} item
        </p>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
            <tr>
              <th className="px-6 py-4 font-semibold">Nama</th>
              <th className="px-6 py-4 font-semibold">
                {type === "product" ? "Harga" : "Harga/Hari"}
              </th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-10 text-gray-500">
                  Kosong.
                </td>
              </tr>
            ) : (
              filtered.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <td className="px-6 py-4 flex items-center gap-4">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-12 h-12 rounded-lg object-cover bg-gray-100 border border-gray-200 dark:border-gray-700"
                    />
                    <div>
                      <p className="font-bold">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.brand}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium">
                    Rp{" "}
                    {("price" in item
                      ? item.price
                      : item.pricePerDay
                    ).toLocaleString("id-ID")}
                  </td>
                  <td className="px-6 py-4">
                    {"isSoldOut" in item ? (
                      item.isSoldOut ? (
                        <Badge variant="destructive">SOLD OUT</Badge>
                      ) : (
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-0">
                          TERSEDIA
                        </Badge>
                      )
                    ) : (
                      <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-0">
                        RENTAL
                      </Badge>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(item)}
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(item.id, item.name)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/* Alias supaya kompatibel dengan demo.tsx dari task */
export const Example = AdminDashboard;