import ProductPageClient from "@/components/home";
import { getCategories, getProducts } from "@/lib/productData";

export default async function Home() {
  const [products, categories] = await Promise.all([
      getProducts(),
      getCategories(),
    ]);
  return (
    <ProductPageClient
      products={products}
      categories={categories}
    />
  );
}
