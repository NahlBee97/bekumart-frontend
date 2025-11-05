import { ProductClient } from "@/components/products/productClient";
import { getProductById, getProductPhotos, getProductReviews } from "@/lib/data";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let isLoading = true

  const [product, photos, reviews] = await Promise.all([
    getProductById(id),
    getProductPhotos(id),
    getProductReviews(id),
  ]);

  isLoading = false;

  return (
    <ProductClient 
      product={product} 
      photos={photos} 
      reviews={reviews} 
      isLoading={isLoading}
    />
  )
}
