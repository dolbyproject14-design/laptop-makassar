import { MetadataRoute } from 'next'
import { dummyProducts } from '@/lib/data/products'

// Tambahkan baris ini agar sitemap bisa di-generate saat build statis
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://laptopmakassar.com'

  const productUrls = dummyProducts.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/rentals`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...productUrls,
  ]
}