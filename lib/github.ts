// lib/github.ts

const REPO_OWNER = "dolbyproject14-design"; // GANTI DENGAN USERNAME KAMU
const REPO_NAME = "laptop-makassar";        // GANTI DENGAN NAMA REPO KAMU
const FILE_PATH = "public/images/data/products.json";

// Helper: Base64 (Support Karakter Indonesia)
const encodeBase64 = (str: string) => window.btoa(unescape(encodeURIComponent(str)));
const decodeBase64 = (str: string) => decodeURIComponent(escape(window.atob(str.replace(/\s/g, ''))));

export async function getProductsFromGitHub(token: string) {
  const res = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}?ref=main`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
  if (!res.ok) {
    const message =
      res.status === 401
        ? "Token GitHub tidak valid atau sudah kedaluwarsa."
        : res.status === 403
          ? "Token tidak memiliki izin yang cukup atau batas request GitHub tercapai."
          : res.status === 404
            ? "Repository, branch main, atau file data produk tidak ditemukan."
            : `Gagal mengambil data dari GitHub (HTTP ${res.status}).`;
    throw new Error(message);
  }
  const data = await res.json();
  return {
    products: JSON.parse(decodeBase64(data.content)),
    sha: data.sha
  };
}

export async function saveProductsToGitHub(token: string, products: any[], sha: string, message: string) {
  const res = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      message: message,
      content: encodeBase64(JSON.stringify(products, null, 2)),
      sha: sha,
      branch: "main",
    }),
  });
  if (!res.ok) throw new Error("Gagal menyimpan data ke GitHub.");
  return res.json();
}

export async function uploadImageToGitHub(token: string, file: File) {
  const base64 = await new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
  });

  const fileName = `img-${Date.now()}.${file.name.split('.').pop()}`;
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