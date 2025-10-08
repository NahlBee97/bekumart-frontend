import ProductDetail from "@/components/products/dinamic";
import { getProductById, getProductPhotos } from "@/lib/productData";

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const decodedId = decodeURIComponent(params.id);

  const [product, photos] = await Promise.all([
    getProductById(decodedId),
    getProductPhotos(decodedId),
  ]);

  return <ProductDetail product={product} photos={photos} />;
}
