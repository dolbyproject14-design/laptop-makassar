"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Home, Monitor, ShoppingCart, Settings, ChevronsRight, Moon, Sun, Plus, Edit, Trash2, Search, Loader2, Save, UploadCloud, Package, LogOut, DollarSign, AlertTriangle, Boxes, Activity, Laptop
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { getFileFromGitHub, saveFileToGitHub, uploadImageToGitHub } from "@/lib/github";
import { Badge } from "@/components/ui/badge";

export default function AdminDashboard() {
  const [isDark, setIsDark] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("Dashboard");

  const [token, setToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  // State untuk Produk
  const [products, setProducts] = useState<any[]>([]);
  const [productSha, setProductSha] = useState("");
  
  // State untuk Rental
  const [rentals, setRentals] = useState<any[]>([]);
  const [rentalSha, setRentalSha] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"product" | "rental">("product");
  const [editingId, setEditingId] = useState<string | null>(null);

  const initialProductForm = {
    name: "", brand: "", price: "", category: "Gaming", condition: "Baru", description: "", isSoldOut: false, image: null as File | null,
    design: { material: "", color: "", weight: "", thickness: "" }, // FITUR BARU: DESAIN
    specs: { cpu: "", ram: "", storage: "", gpu: "", screen: "", battery: "", weight: "", os: "" },
  };
  
  const initialRentalForm = {
    name: "", brand: "", pricePerDay: "", category: "Gaming", minDays: 1, image: null as File | null,
    specs: { cpu: "", ram: "", storage: "", gpu: "" },
  };

  const [productForm, setProductForm] = useState(initialProductForm);
  const [rentalForm, setRentalForm] = useState(initialRentalForm);

  useEffect(() => {
    if (isDark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [isDark]);

  useEffect(() => {
    const savedToken = localStorage.getItem("gh_token");
    if (savedToken) { setToken(savedToken); login(savedToken); }
  }, []);

  const login = async (tk: string) => {
    setLoading(true);
    try {
      // Ambil data Products
      const prodData = await getFileFromGitHub(tk, "public/data/products.json");
      setProducts(prodData.data);
      setProductSha(prodData.sha);

      // Ambil data Rentals
      const rentData = await getFileFromGitHub(tk, "public/data/rentals.json");
      setRentals(rentData.data);
      setRentalSha(rentData.sha);
      
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
    setProducts([]); setRentals([]);
  };

  // --- LOGIKA SIMPAN PRODUK ---
  const handleSaveProduct = async () => {
    if (!productForm.name || !productForm.price) return alert("Nama & Harga wajib diisi");
    setLoading(true);
    try {
      let imageUrl = productForm.image ? await uploadImageToGitHub(token, productForm.image) : "/images/logo.png";
      let updated = [...products];

      if (editingId) {
        updated = updated.map(p => p.id === editingId ? { ...p, ...productForm, price: parseInt(productForm.price), imageUrl: productForm.image ? imageUrl : p.imageUrl } : p);
      } else {
        updated.unshift({ id: Date.now().toString(), slug: productForm.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"), ...productForm, price: parseInt(productForm.price), imageUrl });
      }

      const res = await saveFileToGitHub(token, "public/data/products.json", updated, productSha, `Admin: Update Produk ${productForm.name}`);
      setProducts(updated);
      setProductSha(res.content.sha);
      setIsModalOpen(false);
      alert("✅ Produk disimpan!");
    } catch (err: any) { alert(err.message); } finally { setLoading(false); }
  };

  // --- LOGIKA SIMPAN RENTAL ---
  const handleSaveRental = async () => {
    if (!rentalForm.name || !rentalForm.pricePerDay) return alert("Nama & Harga wajib diisi");
    setLoading(true);
    try {
      let imageUrl = rentalForm.image ? await uploadImageToGitHub(token, rentalForm.image) : "/images/logo.png";
      let updated = [...rentals];

      if (editingId) {
        updated = updated.map(r => r.id === editingId ? { ...r, ...rentalForm, pricePerDay: parseInt(rentalForm.pricePerDay), imageUrl: rentalForm.image ? imageUrl : r.imageUrl } : r);
      } else {
        updated.unshift({ id: Date.now().toString(), ...rentalForm, pricePerDay: parseInt(rentalForm.pricePerDay), imageUrl });
      }

      const res = await saveFileToGitHub(token, "public/data/rentals.json", updated, rentalSha, `Admin: Update Rental ${rentalForm.name}`);
      setRentals(updated);
      setRentalSha(res.content.sha);
      setIsModalOpen(false);
      alert("✅ Rental disimpan!");
    } catch (err: any) { alert(err.message); } finally { setLoading(false); }
  };

  // --- LOGIKA HAPUS ---
  const handleDelete = async (type: "product" | "rental", id: string, name: string) => {
    if (!confirm(`Yakin mau hapus ${name}?`)) return;
    setLoading(true);
    try {
      if (type === "product") {
        const updated = products.filter(p => p.id !== id);
        const res = await saveFileToGitHub(token, "public/data/products.json", updated, productSha, `Admin: Hapus Produk ${name}`);
        setProducts(updated); setProductSha(res.content.sha);
      } else {
        const updated = rentals.filter(r => r.id !== id);
        const res = await saveFileToGitHub(token, "public/data/rentals.json", updated, rentalSha, `Admin: Hapus Rental ${name}`);
        setRentals(updated); setRentalSha(res.content.sha);
      }
      alert("🗑️ Dihapus!");
    } catch (err: any) { alert(err.message); } finally { setLoading(false); }
  };

  const openEditProduct = (p: any) => {
    setModalType("product");
    setProductForm({ ...p, price: p.price.toString(), image: null, design: p.design || initialProductForm.design });
    setEditingId(p.id);
    setIsModalOpen(true);
  };

  const openEditRental = (r: any) => {
    setModalType("rental");
    setRentalForm({ ...r, pricePerDay: r.pricePerDay.toString(), image: null });
    setEditingId(r.id);
    setIsModalOpen(true);
  };

  const stats = useMemo(() => {
    const totalProducts = products.length;
    const soldOut = products.filter((p) => p.isSoldOut).length;
    const available = totalProducts - soldOut;
    const totalValue = products.reduce((acc, p) => acc + (p.price || 0), 0);
    return { totalProducts, soldOut, available, totalValue, totalRentals: rentals.length };
  }, [products, rentals]);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 p-4">
        <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 w-full max-w-md space-y-6 shadow-2xl">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-red-900/50"><Package className="w-8 h-8 text-white" /></div>
            <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
            <p className="text-gray-400 text-sm mt-1">Laptop Makassar</p>
          </div>
          <div className="space-y-2">
            <Label className="text-gray-300">GitHub Token</Label>
            <Input type="password" placeholder="ghp_..." value={token} onChange={(e) => setToken(e.target.value)} className="bg-gray-950 border-gray-800 text-white" />
          </div>
          <Button onClick={() => login(token)} disabled={loading} className="w-full bg-red-600 hover:bg-red-700 h-11 text-base">
            {loading ? <Loader2 className="animate-spin" /> : "Masuk Dashboard"}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex min-h-screen w-full ${isDark ? "dark" : ""}`}>
      <div className="flex w-full bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans">
        
        {/* SIDEBAR */}
        <nav className={`sticky top-0 h-screen shrink-0 border-r transition-all duration-300 ease-in-out z-20 ${sidebarOpen ? "w-64" : "w-20"} border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-3 shadow-sm flex flex-col`}>
          <div className="mb-8 flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 shrink-0 bg-red-600 rounded-xl flex items-center justify-center shadow-md"><Package className="w-5 h-5 text-white" /></div>
            {sidebarOpen && <div className="leading-tight"><p className="font-bold text-sm">Laptop Makassar</p><p className="text-xs text-gray-500">Admin Panel</p></div>}
          </div>
          <div className="space-y-1 flex-1">
            <NavItem icon={Home} title="Dashboard" active={activeTab === "Dashboard"} onClick={() => setActiveTab("Dashboard")} open={sidebarOpen} />
            <NavItem icon={ShoppingCart} title="Products" active={activeTab === "Products"} onClick={() => setActiveTab("Products")} open={sidebarOpen} />
            <NavItem icon={Laptop} title="Rentals" active={activeTab === "Rentals"} onClick={() => setActiveTab("Rentals")} open={sidebarOpen} />
            <NavItem icon={Monitor} title="View Site" active={false} onClick={() => window.open("/", "_blank")} open={sidebarOpen} />
          </div>
          <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-800 space-y-1">
            <button onClick={handleLogout} className="flex h-11 w-full items-center rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors">
              <div className="grid h-full w-12 place-content-center shrink-0"><LogOut className="h-5 w-5" /></div>
              {sidebarOpen && <span className="text-sm font-medium">Logout</span>}
            </button>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="flex h-11 w-full items-center rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <div className="grid h-full w-12 place-content-center shrink-0"><ChevronsRight className={`h-5 w-5 transition-transform ${sidebarOpen ? "rotate-180" : ""}`} /></div>
              {sidebarOpen && <span className="text-sm font-medium">Hide</span>}
            </button>
          </div>
        </nav>

        <main className="flex-1 p-6 md:p-10 overflow-auto h-screen">
          {/* HEADER */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold">{activeTab === "Products" ? "Manajemen Produk" : activeTab === "Rentals" ? "Manajemen Rental" : "Dashboard"}</h1>
              <p className="text-gray-500 mt-1">Kelola data toko Anda.</p>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <Button onClick={() => setIsDark(!isDark)} variant="outline" size="icon" className="shrink-0">{isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}</Button>
              {activeTab === "Products" && <Button onClick={() => { setModalType("product"); setProductForm(initialProductForm); setEditingId(null); setIsModalOpen(true); }} className="bg-red-600 text-white"><Plus className="w-4 h-4 mr-2" /> Tambah Produk</Button>}
              {activeTab === "Rentals" && <Button onClick={() => { setModalType("rental"); setRentalForm(initialRentalForm); setEditingId(null); setIsModalOpen(true); }} className="bg-red-600 text-white"><Plus className="w-4 h-4 mr-2" /> Tambah Rental</Button>}
            </div>
          </div>

          {/* TABEL PRODUK */}
          {activeTab === "Products" && (
            <DataTable data={products} type="product" search={search} setSearch={setSearch} onEdit={openEditProduct} onDelete={(id: string, name: string) => handleDelete("product", id, name)} />
          )}

          {/* TABEL RENTAL */}
          {activeTab === "Rentals" && (
            <DataTable data={rentals} type="rental" search={search} setSearch={setSearch} onEdit={openEditRental} onDelete={(id: string, name: string) => handleDelete("rental", id, name)} />
          )}
        </main>
      </div>

      {/* MODAL TAMBAH/EDIT */}
      <Dialog open={isModalOpen} onOpenChange={(open) => { setIsModalOpen(open); if (!open) setEditingId(null); }}>
        <DialogContent className="w-[95vw] max-w-4xl sm:max-w-[900px] bg-white dark:bg-gray-900 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {editingId ? "Edit" : "Tambah"} {modalType === "product" ? "Produk" : "Rental"}
            </DialogTitle>
          </DialogHeader>

          {modalType === "product" ? (
            // FORM PRODUK
            <div className="space-y-6 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="space-y-2"><Label>Nama Laptop</Label><Input value={productForm.name} onChange={(e) => setProductForm({...productForm, name: e.target.value})} /></div>
                <div className="space-y-2"><Label>Brand</Label><Input value={productForm.brand} onChange={(e) => setProductForm({...productForm, brand: e.target.value})} /></div>
                <div className="space-y-2"><Label>Harga</Label><Input type="number" value={productForm.price} onChange={(e) => setProductForm({...productForm, price: e.target.value})} /></div>
                <div className="space-y-2 md:col-span-2"><Label>Deskripsi</Label><Input value={productForm.description} onChange={(e) => setProductForm({...productForm, description: e.target.value})} /></div>
                <div className="space-y-2"><Label>Kategori</Label>
                  <select value={productForm.category} onChange={(e) => setProductForm({...productForm, category: e.target.value})} className="w-full h-10 rounded-md border px-3 bg-transparent dark:bg-gray-950">
                    <option>Gaming</option><option>Ultrabook</option><option>Business</option><option>Office</option><option>MacBook</option>
                  </select>
                </div>
              </div>

              {/* FORM DESIGN (TAMBAHAN BARU) */}
              <div className="border-t pt-4 border-gray-200 dark:border-gray-800">
                <h3 className="text-lg font-bold mb-4">Desain (Tampil di halaman Detail)</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2"><Label>Material</Label><Input value={productForm.design.material} onChange={(e) => setProductForm({...productForm, design: {...productForm.design, material: e.target.value}})} placeholder="Aluminium alloy" /></div>
                  <div className="space-y-2"><Label>Warna</Label><Input value={productForm.design.color} onChange={(e) => setProductForm({...productForm, design: {...productForm.design, color: e.target.value}})} placeholder="Space Gray" /></div>
                  <div className="space-y-2"><Label>Berat</Label><Input value={productForm.design.weight} onChange={(e) => setProductForm({...productForm, design: {...productForm.design, weight: e.target.value}})} placeholder="1.5 kg" /></div>
                  <div className="space-y-2"><Label>Ketebalan</Label><Input value={productForm.design.thickness} onChange={(e) => setProductForm({...productForm, design: {...productForm.design, thickness: e.target.value}})} placeholder="15-18 mm" /></div>
                </div>
              </div>

              {/* FORM SPESIFIKASI */}
              <div className="border-t pt-4 border-gray-200 dark:border-gray-800">
                <h3 className="text-lg font-bold mb-4">Spesifikasi</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.keys(productForm.specs).map(k => (
                    <div key={k} className="space-y-2"><Label className="uppercase text-xs">{k}</Label><Input value={(productForm.specs as any)[k]} onChange={(e) => setProductForm({...productForm, specs: {...productForm.specs, [k]: e.target.value}})} /></div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4 border-gray-200 dark:border-gray-800 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-2"><Label>Upload Foto</Label>
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 p-4 text-center rounded-xl relative hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <input type="file" onChange={(e) => setProductForm({...productForm, image: e.target.files?.[0] || null})} className="absolute inset-0 opacity-0 cursor-pointer" />
                    <UploadCloud className="w-8 h-8 mx-auto text-gray-400 mb-2" /><p className="text-sm">{productForm.image ? productForm.image.name : "Klik upload foto"}</p>
                  </div>
                </div>
                <div className="flex items-center justify-center bg-gray-50 dark:bg-gray-950 p-6 rounded-xl border border-gray-200 dark:border-gray-800">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" checked={productForm.isSoldOut} onChange={(e) => setProductForm({...productForm, isSoldOut: e.target.checked})} className="w-6 h-6 rounded" />
                    <div><p className="font-bold">Tandai Sold Out</p><p className="text-xs text-gray-500">Stok habis.</p></div>
                  </label>
                </div>
              </div>

              <Button onClick={handleSaveProduct} disabled={loading} className="w-full h-12 bg-red-600 text-lg font-bold">
                {loading ? <Loader2 className="animate-spin" /> : <><Save className="w-5 h-5 mr-2" /> Simpan Produk</>}
              </Button>
            </div>
          ) : (
            // FORM RENTAL
            <div className="space-y-6 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2"><Label>Nama Laptop</Label><Input value={rentalForm.name} onChange={(e) => setRentalForm({...rentalForm, name: e.target.value})} /></div>
                <div className="space-y-2"><Label>Brand</Label><Input value={rentalForm.brand} onChange={(e) => setRentalForm({...rentalForm, brand: e.target.value})} /></div>
                <div className="space-y-2"><Label>Harga / Hari</Label><Input type="number" value={rentalForm.pricePerDay} onChange={(e) => setRentalForm({...rentalForm, pricePerDay: e.target.value})} /></div>
                <div className="space-y-2"><Label>Minimal Sewa (Hari)</Label><Input type="number" value={rentalForm.minDays} onChange={(e) => setRentalForm({...rentalForm, minDays: parseInt(e.target.value)})} /></div>
              </div>
              <div className="border-t pt-4 border-gray-200 dark:border-gray-800">
                <h3 className="text-lg font-bold mb-4">Spesifikasi Utama</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.keys(rentalForm.specs).map(k => (
                    <div key={k} className="space-y-2"><Label className="uppercase text-xs">{k}</Label><Input value={(rentalForm.specs as any)[k]} onChange={(e) => setRentalForm({...rentalForm, specs: {...rentalForm.specs, [k]: e.target.value}})} /></div>
                  ))}
                </div>
              </div>
              <div className="border-t pt-4 border-gray-200 dark:border-gray-800">
                <Label>Upload Foto</Label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 p-4 text-center rounded-xl relative hover:bg-gray-50 dark:hover:bg-gray-800/50 mt-2">
                  <input type="file" onChange={(e) => setRentalForm({...rentalForm, image: e.target.files?.[0] || null})} className="absolute inset-0 opacity-0 cursor-pointer" />
                  <UploadCloud className="w-8 h-8 mx-auto text-gray-400 mb-2" /><p className="text-sm">{rentalForm.image ? rentalForm.image.name : "Klik upload foto"}</p>
                </div>
              </div>
              <Button onClick={handleSaveRental} disabled={loading} className="w-full h-12 bg-red-600 text-lg font-bold">
                {loading ? <Loader2 className="animate-spin" /> : <><Save className="w-5 h-5 mr-2" /> Simpan Rental</>}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Komponen Tabel Reusable
const DataTable = ({ data, type, search, setSearch, onEdit, onDelete }: any) => {
  const filtered = data.filter((i: any) => i.name.toLowerCase().includes(search.toLowerCase()) || i.brand.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="animate-in fade-in">
      <div className="mb-6 flex items-center gap-3">
        <div className="relative w-full max-w-md"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><Input placeholder="Cari..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" /></div>
        <p className="text-sm text-gray-500">Menampilkan {filtered.length} item</p>
      </div>
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
            <tr><th className="px-6 py-4 font-semibold">Nama</th><th className="px-6 py-4 font-semibold">{type === "product" ? "Harga" : "Harga/Hari"}</th><th className="px-6 py-4 font-semibold">Status</th><th className="px-6 py-4 font-semibold text-right">Aksi</th></tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {filtered.length === 0 ? <tr><td colSpan={4} className="text-center py-10 text-gray-500">Kosong.</td></tr> : filtered.map((item: any) => (
              <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <td className="px-6 py-4 flex items-center gap-4">
                  <img src={item.imageUrl} className="w-12 h-12 rounded-lg object-cover bg-gray-100 border border-gray-200 dark:border-gray-700" />
                  <div><p className="font-bold">{item.name}</p><p className="text-xs text-gray-500">{item.brand}</p></div>
                </td>
                <td className="px-6 py-4 font-medium">Rp {(type === "product" ? item.price : item.pricePerDay).toLocaleString("id-ID")}</td>
                <td className="px-6 py-4">
                  {type === "product" ? (
                    item.isSoldOut ? <Badge variant="destructive">SOLD OUT</Badge> : <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-0">TERSEDIA</Badge>
                  ) : <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-0">RENTAL</Badge>}
                </td>
                <td className="px-6 py-4 text-right">
                  <Button variant="ghost" size="icon" onClick={() => onEdit(item)} className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"><Edit className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => onDelete(item.id, item.name)} className="text-red-600 hover:text-red-700 hover:bg-red-50"><Trash2 className="w-4 h-4" /></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Komponen Sidebar
const NavItem = ({ icon: Icon, title, active, onClick, open }: any) => (
  <button onClick={onClick} className={`flex h-11 w-full items-center rounded-xl transition-all duration-200 ${active ? "bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 font-bold shadow-sm" : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 font-medium"}`}>
    <div className="grid h-full w-12 place-content-center shrink-0"><Icon className="h-5 w-5" /></div>
    {open && <span className="text-sm">{title}</span>}
  </button>
);