"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, LogOut, Search, Loader2, Laptop, Save, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { getProductsFromGitHub, saveProductsToGitHub, uploadImageToGitHub } from "@/lib/github";

export default function AdminDashboard() {
  const [token, setToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const [products, setProducts] = useState<any[]>([]);
  const [sha, setSha] = useState("");
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const initialForm = {
    name: "", brand: "", price: "", category: "Gaming", condition: "Baru", description: "", isSoldOut: false, image: null as File | null,
    specs: { cpu: "", ram: "", storage: "", gpu: "", screen: "", battery: "", weight: "", os: "" },
  };
  const [formData, setFormData] = useState(initialForm);

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

  const handleSave = async () => {
    if (!formData.name || !formData.price) return alert("Nama & Harga wajib diisi");
    setLoading(true);
    try {
      let imageUrl = formData.image ? await uploadImageToGitHub(token, formData.image) : "/images/logo.png";
      
      let updatedProducts = [...products];
      if (editingId) {
        // Edit Mode
        updatedProducts = updatedProducts.map(p => p.id === editingId ? {
          ...p, ...formData, price: parseInt(formData.price), imageUrl: formData.image ? imageUrl : p.imageUrl, specs: formData.specs
        } : p);
      } else {
        // Add Mode
        const newProduct = {
          id: Date.now().toString(),
          slug: formData.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          ...formData,
          price: parseInt(formData.price),
          imageUrl: imageUrl,
        };
        updatedProducts.unshift(newProduct);
      }

      const res = await saveProductsToGitHub(token, updatedProducts, sha, `Admin: ${editingId ? 'Edit' : 'Tambah'} ${formData.name}`);
      setProducts(updatedProducts);
      setSha(res.content.sha);
      setIsModalOpen(false);
      setFormData(initialForm);
      setEditingId(null);
      alert("✅ Berhasil disimpan! Cloudflare sedang mendeploy website (1-2 menit).");
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
      const updatedProducts = products.filter(p => p.id !== id);
      const res = await saveProductsToGitHub(token, updatedProducts, sha, `Admin: Hapus ${name}`);
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
      name: product.name, brand: product.brand, price: product.price.toString(), category: product.category,
      condition: product.condition, description: product.description, isSoldOut: product.isSoldOut,
      image: null, specs: product.specs
    });
    setEditingId(product.id);
    setIsModalOpen(true);
  };

  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase()));

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-onyx p-4">
        <div className="bg-brand-dark p-8 rounded-xl border border-white/10 w-full max-w-md space-y-4 shadow-2xl">
          <div className="text-center mb-6">
            <Laptop className="w-12 h-12 text-brand-red mx-auto mb-2" />
            <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
            <p className="text-gray-400 text-sm">Laptop Makassar</p>
          </div>
          <Input type="password" placeholder="Masukkan GitHub Token (ghp_...)" value={token} onChange={(e) => setToken(e.target.value)} className="bg-black/50 text-white border-white/20" />
          <Button onClick={() => login(token)} disabled={loading} className="w-full bg-brand-red hover:bg-brand-red-dark h-11">
            {loading ? <Loader2 className="animate-spin" /> : "Masuk"}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-onyx p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-brand-dark p-4 rounded-xl border border-white/10 gap-4">
          <h1 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
            <Laptop className="text-brand-red" /> Manajemen Produk
          </h1>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input placeholder="Cari laptop..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 bg-black/50 text-white border-white/20" />
            </div>
            <Button variant="outline" onClick={() => { localStorage.removeItem("gh_token"); setIsLoggedIn(false); }} className="text-white border-white/20 hover:bg-white/10">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* TOMBOL TAMBAH */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-400 text-sm">Total: {products.length} Produk</p>
          <Dialog open={isModalOpen} onOpenChange={(open) => { setIsModalOpen(open); if(!open) { setFormData(initialForm); setEditingId(null); } }}>
            <DialogTrigger asChild>
              <Button className="bg-brand-red hover:bg-brand-red-dark"><Plus className="w-4 h-4 mr-2" /> Tambah Produk</Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl bg-brand-dark text-white border-white/10 max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingId ? "Edit Produk" : "Tambah Produk Baru"}</DialogTitle>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div><label className="text-sm text-gray-400">Nama Laptop</label><Input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="bg-black/50 border-white/10" /></div>
                <div><label className="text-sm text-gray-400">Brand</label><Input value={formData.brand} onChange={(e) => setFormData({...formData, brand: e.target.value})} className="bg-black/50 border-white/10" /></div>
                <div><label className="text-sm text-gray-400">Harga (Angka)</label><Input type="number" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="bg-black/50 border-white/10" /></div>
                <div><label className="text-sm text-gray-400">Deskripsi</label><Input value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="bg-black/50 border-white/10" /></div>
                <div>
                  <label className="text-sm text-gray-400">Kategori</label>
                  <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full h-10 rounded-md bg-black/50 text-white border border-white/10 px-3">
                    <option>Gaming</option><option>Ultrabook</option><option>Business</option><option>Office</option><option>Creator</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Kondisi</label>
                  <select value={formData.condition} onChange={(e) => setFormData({...formData, condition: e.target.value})} className="w-full h-10 rounded-md bg-black/50 text-white border border-white/10 px-3">
                    <option value="Baru">Baru</option><option value="Second">Second</option>
                  </select>
                </div>
              </div>

              <h3 className="text-md font-bold mt-4 mb-2 border-b border-white/10 pb-2">Spesifikasi</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.keys(formData.specs).map((key) => (
                  <div key={key}>
                    <label className="text-sm text-gray-400 uppercase">{key}</label>
                    <Input value={(formData.specs as any)[key]} onChange={(e) => setFormData({...formData, specs: {...formData.specs, [key]: e.target.value}})} className="bg-black/50 border-white/10" />
                  </div>
                ))}
              </div>

              <div className="mt-4 flex flex-col md:flex-row gap-4 items-center">
                <div className="flex-1 w-full">
                  <label className="text-sm text-gray-400">Upload Foto {editingId && "(Kosongkan jika tidak diganti)"}</label>
                  <Input type="file" accept="image/*" onChange={(e) => setFormData({...formData, image: e.target.files?.[0] || null})} className="bg-black/50 border-white/10 file:text-white file:bg-brand-red cursor-pointer" />
                </div>
                <div className="flex items-center gap-2 mt-4 md:mt-6 bg-black/30 p-3 rounded-lg border border-white/10">
                  <input type="checkbox" checked={formData.isSoldOut} onChange={(e) => setFormData({...formData, isSoldOut: e.target.checked})} className="w-5 h-5 accent-brand-red" />
                  <label className="text-sm font-medium cursor-pointer">Tandai Sold Out</label>
                </div>
              </div>

              <Button onClick={handleSave} disabled={loading} className="w-full mt-6 bg-brand-red hover:bg-brand-red-dark h-12">
                {loading ? <Loader2 className="animate-spin" /> : <><Save className="w-4 h-4 mr-2" /> Simpan Data</>}
              </Button>
            </DialogContent>
          </Dialog>
        </div>

        {/* TABEL PRODUK */}
        <div className="bg-brand-dark rounded-xl border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-300">
              <thead className="bg-black/40 text-gray-400 uppercase font-semibold">
                <tr>
                  <th className="px-6 py-4">Produk</th>
                  <th className="px-6 py-4">Harga</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <img src={product.imageUrl} alt={product.name} className="w-12 h-12 rounded object-cover bg-gray-800" />
                      <div>
                        <p className="font-bold text-white">{product.name}</p>
                        <p className="text-xs text-gray-500">{product.brand} · {product.category}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono">Rp {product.price.toLocaleString("id-ID")}</td>
                    <td className="px-6 py-4">
                      {product.isSoldOut ? (
                        <span className="px-2 py-1 bg-red-500/20 text-red-400 border border-red-500/30 rounded text-xs">SOLD OUT</span>
                      ) : (
                        <span className="px-2 py-1 bg-green-500/20 text-green-400 border border-green-500/30 rounded text-xs">TERSEDIA</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => openEdit(product)} className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(product.id, product.name)} className="text-red-400 hover:text-red-300 hover:bg-red-500/10">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}