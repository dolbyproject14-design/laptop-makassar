"use client";

import React, { useState, useEffect } from "react";
import {
  Home,
  Monitor,
  ShoppingCart,
  Settings,
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
  Image as ImageIcon,
} from "lucide-react";
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
  getProductsFromGitHub,
  saveProductsToGitHub,
  uploadImageToGitHub,
} from "@/lib/github";
import { Badge } from "@/components/ui/badge";

export default function AdminDashboard() {
  const [isDark, setIsDark] = useState(true); // Default dark mode
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("Products");

  const [token, setToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [sha, setSha] = useState("");
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const initialForm = {
    name: "",
    brand: "",
    price: "",
    category: "Gaming",
    condition: "Baru",
    description: "",
    isSoldOut: false,
    image: null as File | null,
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
  const [formData, setFormData] = useState(initialForm);

  // Handle Dark Mode
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  // Cek Token Tersimpan
  useEffect(() => {
    const savedToken = localStorage.getItem("gh_token");
    if (savedToken) {
      setToken(savedToken);
      login(savedToken);
    }
  }, []);

  const login = async (tk: string) => {
    setLoading(true);
    try {
      const data = await getProductsFromGitHub(tk);
      setProducts(data.products);
      setSha(data.sha);
      setIsLoggedIn(true);
      localStorage.setItem("gh_token", tk);
    } catch (err: any) {
      alert(err.message);
      localStorage.removeItem("gh_token");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("gh_token");
    setIsLoggedIn(false);
    setProducts([]);
  };

  const handleSave = async () => {
    if (!formData.name || !formData.price)
      return alert("Nama & Harga wajib diisi");
    setLoading(true);
    try {
      let imageUrl = formData.image
        ? await uploadImageToGitHub(token, formData.image)
        : "/images/logo.png";

      let updatedProducts = [...products];
      if (editingId) {
        updatedProducts = updatedProducts.map((p) =>
          p.id === editingId
            ? {
                ...p,
                ...formData,
                price: parseInt(formData.price),
                imageUrl: formData.image ? imageUrl : p.imageUrl,
                specs: formData.specs,
              }
            : p
        );
      } else {
        const newProduct = {
          id: Date.now().toString(),
          slug: formData.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          ...formData,
          price: parseInt(formData.price),
          imageUrl: imageUrl,
        };
        updatedProducts.unshift(newProduct);
      }

      const res = await saveProductsToGitHub(
        token,
        updatedProducts,
        sha,
        `Admin: ${editingId ? "Edit" : "Tambah"} ${formData.name}`
      );
      setProducts(updatedProducts);
      setSha(res.content.sha);
      setIsModalOpen(false);
      setFormData(initialForm);
      setEditingId(null);
      alert("✅ Berhasil disimpan! Website akan terupdate dalam 1-2 menit.");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Yakin mau hapus ${name}?`)) return;
    setLoading(true);
    try {
      const updatedProducts = products.filter((p) => p.id !== id);
      const res = await saveProductsToGitHub(
        token,
        updatedProducts,
        sha,
        `Admin: Hapus ${name}`
      );
      setProducts(updatedProducts);
      setSha(res.content.sha);
      alert("🗑️ Produk dihapus!");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const openEdit = (product: any) => {
    setFormData({
      name: product.name,
      brand: product.brand,
      price: product.price.toString(),
      category: product.category,
      condition: product.condition,
      description: product.description,
      isSoldOut: product.isSoldOut,
      image: null,
      specs: product.specs,
    });
    setEditingId(product.id);
    setIsModalOpen(true);
  };

  const handleSpecChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      specs: { ...formData.specs, [e.target.name]: e.target.value },
    });
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase())
  );

  // --- TAMPILAN LOGIN ---
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
            onClick={() => login(token)}
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 h-11 text-base"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Masuk Dashboard"}
          </Button>
        </div>
      </div>
    );
  }

  // --- TAMPILAN DASHBOARD UTAMA ---
  return (
    <div className={`flex min-h-screen w-full ${isDark ? "dark" : ""}`}>
      <div className="flex w-full bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans">
        {/* SIDEBAR */}
        <nav
          className={`sticky top-0 h-screen shrink-0 border-r transition-all duration-300 ease-in-out z-20 ${
            sidebarOpen ? "w-64" : "w-20"
          } border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-3 shadow-sm flex flex-col`}
        >
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-10 h-10 shrink-0 bg-red-600 rounded-xl flex items-center justify-center shadow-md">
                <Package className="w-5 h-5 text-white" />
              </div>
              {sidebarOpen && (
                <div className="leading-tight">
                  <p className="font-bold text-sm">Laptop Makassar</p>
                  <p className="text-xs text-gray-500">Admin Panel</p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-1 flex-1">
            <NavItem
              icon={Home}
              title="Dashboard"
              active={activeTab === "Dashboard"}
              onClick={() => setActiveTab("Dashboard")}
              open={sidebarOpen}
            />
            <NavItem
              icon={ShoppingCart}
              title="Products"
              active={activeTab === "Products"}
              onClick={() => setActiveTab("Products")}
              open={sidebarOpen}
            />
            <NavItem
              icon={Monitor}
              title="View Site"
              active={false}
              onClick={() => window.open("/", "_blank")}
              open={sidebarOpen}
            />
            <NavItem
              icon={Settings}
              title="Settings"
              active={activeTab === "Settings"}
              onClick={() => setActiveTab("Settings")}
              open={sidebarOpen}
            />
          </div>

          <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-800 space-y-1">
            <button
              onClick={handleLogout}
              className="flex h-11 w-full items-center rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
            >
              <div className="grid h-full w-12 place-content-center shrink-0">
                <LogOut className="h-5 w-5" />
              </div>
              {sidebarOpen && <span className="text-sm font-medium">Logout</span>}
            </button>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="flex h-11 w-full items-center rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="grid h-full w-12 place-content-center shrink-0">
                <ChevronsRight
                  className={`h-5 w-5 transition-transform ${
                    sidebarOpen ? "rotate-180" : ""
                  }`}
                />
              </div>
              {sidebarOpen && <span className="text-sm font-medium">Hide</span>}
            </button>
          </div>
        </nav>

        {/* MAIN CONTENT */}
        <main className="flex-1 p-6 md:p-10 overflow-auto h-screen">
          {/* HEADER */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold">Manajemen Produk</h1>
              <p className="text-gray-500 mt-1">Kelola katalog laptop Anda di sini.</p>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Cari laptop..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800"
                />
              </div>
              <Button
                onClick={() => setIsDark(!isDark)}
                variant="outline"
                size="icon"
                className="shrink-0"
              >
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              <Button
                onClick={() => {
                  setFormData(initialForm);
                  setEditingId(null);
                  setIsModalOpen(true);
                }}
                className="bg-red-600 hover:bg-red-700 text-white shrink-0 shadow-lg shadow-red-600/20"
              >
                <Plus className="w-4 h-4 mr-2" /> Tambah Produk
              </Button>
            </div>
          </div>

          {/* TABLE */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 dark:bg-gray-950 text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-800">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Produk</th>
                    <th className="px-6 py-4 font-semibold">Harga</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                    <th className="px-6 py-4 font-semibold text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {filteredProducts.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-10 text-center text-gray-500">
                        Tidak ada produk ditemukan.
                      </td>
                    </tr>
                  ) : (
                    filteredProducts.map((product) => (
                      <tr
                        key={product.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                      >
                        <td className="px-6 py-4 flex items-center gap-4">
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-12 h-12 rounded-lg object-cover bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                          />
                          <div>
                            <p className="font-bold text-gray-900 dark:text-white line-clamp-1">
                              {product.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {product.brand} · {product.category}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-medium">
                          Rp {product.price.toLocaleString("id-ID")}
                        </td>
                        <td className="px-6 py-4">
                          {product.isSoldOut ? (
                            <Badge variant="destructive" className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 hover:bg-red-100 border-0">
                              SOLD OUT
                            </Badge>
                          ) : (
                            <Badge variant="default" className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 hover:bg-green-100 border-0">
                              TERSEDIA
                            </Badge>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => openEdit(product)}
                              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete(product.id, product.name)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* MODAL TAMBAH/EDIT PRODUK (DIPERCANTIK) */}
      <Dialog
        open={isModalOpen}
        onOpenChange={(open) => {
          setIsModalOpen(open);
          if (!open) {
            setFormData(initialForm);
            setEditingId(null);
          }
        }}
      >
        <DialogContent className="max-w-3xl bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {editingId ? "Edit Produk" : "Tambah Produk Baru"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 mt-4">
            {/* INFO UTAMA */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nama Laptop</Label>
                <Input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Contoh: Asus ROG Strix G16"
                  className="bg-gray-50 dark:bg-gray-950"
                />
              </div>
              <div className="space-y-2">
                <Label>Brand</Label>
                <Input
                  value={formData.brand}
                  onChange={(e) =>
                    setFormData({ ...formData, brand: e.target.value })
                  }
                  placeholder="Contoh: Asus"
                  className="bg-gray-50 dark:bg-gray-950"
                />
              </div>
              <div className="space-y-2">
                <Label>Harga (Angka saja)</Label>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  placeholder="Contoh: 18500000"
                  className="bg-gray-50 dark:bg-gray-950"
                />
              </div>
              <div className="space-y-2">
                <Label>Deskripsi Singkat</Label>
                <Input
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Laptop gaming performa tinggi..."
                  className="bg-gray-50 dark:bg-gray-950"
                />
              </div>
              <div className="space-y-2">
                <Label>Kategori</Label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full h-10 rounded-md bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option>Gaming</option>
                  <option>Ultrabook</option>
                  <option>Business</option>
                  <option>Office</option>
                  <option>Creator</option>
                  <option>MacBook</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Kondisi</Label>
                <select
                  value={formData.condition}
                  onChange={(e) =>
                    setFormData({ ...formData, condition: e.target.value })
                  }
                  className="w-full h-10 rounded-md bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="Baru">Baru</option>
                  <option value="Second">Second</option>
                </select>
              </div>
            </div>

            {/* SPESIFIKASI */}
            <div className="border-t border-gray-100 dark:border-gray-800 pt-6">
              <h3 className="text-lg font-bold mb-4">Spesifikasi</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.keys(formData.specs).map((key) => (
                  <div key={key} className="space-y-2">
                    <Label className="uppercase text-xs tracking-wider text-gray-500">
                      {key}
                    </Label>
                    <Input
                      name={key}
                      value={(formData.specs as any)[key]}
                      onChange={handleSpecChange}
                      placeholder={`-`}
                      className="bg-gray-50 dark:bg-gray-950"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* FOTO & STATUS */}
            <div className="border-t border-gray-100 dark:border-gray-800 pt-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="space-y-2">
                <Label>Upload Foto Produk</Label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-4 text-center hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        image: e.target.files?.[0] || null,
                      })
                    }
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <UploadCloud className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    {formData.image
                      ? formData.image.name
                      : "Klik untuk upload foto"}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    PNG, JPG (Maks 1MB)
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center bg-gray-50 dark:bg-gray-950 p-6 rounded-xl border border-gray-200 dark:border-gray-800">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isSoldOut}
                    onChange={(e) =>
                      setFormData({ ...formData, isSoldOut: e.target.checked })
                    }
                    className="w-6 h-6 rounded border-gray-300 text-red-600 focus:ring-red-600 focus:ring-offset-0"
                  />
                  <div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                      Tandai Sold Out
                    </p>
                    <p className="text-xs text-gray-500">
                      Centang jika stok barang habis.
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* TOMBOL SIMPAN */}
            <Button
              onClick={handleSave}
              disabled={loading}
              className="w-full h-12 mt-4 bg-red-600 hover:bg-red-700 text-lg font-bold shadow-lg shadow-red-600/30"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Save className="w-5 h-5 mr-2" /> Simpan Data
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Komponen Sidebar Item
const NavItem = ({ icon: Icon, title, active, onClick, open }: any) => {
  return (
    <button
      onClick={onClick}
      className={`flex h-11 w-full items-center rounded-xl transition-all duration-200 ${
        active
          ? "bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 font-bold shadow-sm"
          : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200 font-medium"
      }`}
    >
      <div className="grid h-full w-12 place-content-center shrink-0">
        <Icon className="h-5 w-5" />
      </div>
      {open && <span className="text-sm">{title}</span>}
    </button>
  );
};