import Shop from "@/components/shop/shop";
import { getCategories, getProducts } from "@/lib/data";

export default async function ShopPage() {
  const [products, categories] = await Promise.all([
      getProducts(),
      getCategories(),
    ]);
  return (
    <Shop
      products={products}
      categories={categories}
    />
  );
}
