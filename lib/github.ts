// lib/github.ts

const REPO_OWNER = "dolbyproject14-design"; // GANTI JIKA PERLU
const REPO_NAME = "laptop-makassar";        // GANTI JIKA PERLU

// Helper: Base64 (Support Karakter Indonesia)
const encodeBase64 = (str: string) => window.btoa(unescape(encodeURIComponent(str)));
const decodeBase64 = (str: string) => decodeURIComponent(escape(window.atob(str.replace(/\s/g, ''))));

// Fungsi umum untuk mengambil file JSON apa pun dari GitHub
export async function getFileFromGitHub<T>(token: string, filePath: string): Promise<{ data: T; sha: string }> {
  const res = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filePath}?ref=main`);
  if (!res.ok) throw new Error(`Gagal mengambil data ${filePath}. Cek Token/Koneksi.`);
  const data = await res.json();
  return {
    data: JSON.parse(decodeBase64(data.content)) as T,
    sha: data.sha
  };
}

// Fungsi umum untuk menyimpan file JSON ke GitHub
export async function saveFileToGitHub(token: string, filePath: string, content: unknown[], sha: string, message: string) {
  const res = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filePath}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      message: message,
      content: encodeBase64(JSON.stringify(content, null, 2)),
      sha: sha,
      branch: "main",
    }),
  });
  if (!res.ok) throw new Error(`Gagal menyimpan data ke ${filePath}.`);
  return res.json();
}

// Fungsi Upload Gambar
export async function uploadImageToGitHub(token: string, file: File) {
  const base64 = await new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
  });

  const cleanName = file.name.toLowerCase().replace(/[^a-z0-9.]/g, "-");
  const extension = cleanName.split('.').pop();
  const safeExt = (extension === "jpg" || extension === "png" || extension === "webp") ? extension : "jpg";
  const fileName = `img-${Date.now()}.${safeExt}`;

  const res = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/public/images/products/${fileName}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      message: `Upload foto: ${fileName}`,
      content: base64.split(",")[1],
      branch: "main",
    }),
  });

  if (!res.ok) throw new Error("Gagal upload gambar.");
  return `/images/products/${fileName}`;
}