import HomeClient from "@/components/home/homeClient";
import { getCategories, getProducts } from "@/lib/data";
export const dynamic = "force-dynamic";

export default async function Home() {
  const [products, categories] = await Promise.all([
      getProducts(),
      getCategories(),
    ]);
  return (
    <HomeClient
      products={products}
      categories={categories}
    />
  );
}
