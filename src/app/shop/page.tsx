import Shop from "@/components/shop/shop";
import api from "@/lib/axios";
import { getProducts } from "@/lib/data";

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ search: string }>;
}) {
  const { search } = await searchParams;
  let products;
  if (search) {
    const response = await api.get(`/api/products?search=${search}`);
    products = response.data.data;
  } else {
    products = await getProducts();
  }
  return <Shop products={products} />;
}
