import Shop from "@/components/shop/shop";
import { apiUrl } from "@/config";
import api from "@/lib/axios";
import { getProducts } from "@/lib/data";

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ search: string, minPrice: string, maxPrice: string; rating: string }>;
}) {
  const { search, minPrice, maxPrice, rating } = await searchParams;
  const urlToHit = new URL("/api/products", apiUrl);

  // Add search parameter if exists
  if (search) {
    urlToHit.searchParams.append("search", search);
  }

  // Add price range parameters if they exist
  if (minPrice) {
    urlToHit.searchParams.append("minPrice", minPrice);
  }
  if (maxPrice) {
    urlToHit.searchParams.append("maxPrice", maxPrice);
  }

  // add rating
  if (rating) {
    urlToHit.searchParams.append("rating", rating);
  }

  let products;
  if (search || minPrice || maxPrice || rating) {
    const response = await api.get(urlToHit.toString());
    products = response.data.data;
  } else {
    products = await getProducts();
  }
  return <Shop products={products} />;
}
