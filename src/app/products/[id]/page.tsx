import ProductDetail from "@/components/products/dinamic";
import { getProductById, getProductPhotos } from "@/lib/productData";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [product, photos] = await Promise.all([
    getProductById(id),
    getProductPhotos(id),
  ]);

  return <ProductDetail product={product} photos={photos} />;
}
