import { ProductSection } from "@/components/admin/dashboard/productSection";
import { ProductsTable } from "@/components/admin/products/productTable";
import { getCategories, getProducts } from "@/lib/data";
import { FileText } from "lucide-react";
export const dynamic = "force-dynamic";

export default async function ProductsAdminPage() {
  let isLoading = true;

  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  isLoading = false;

  return (
    <div className="min-h-screen">
      <div className="container mx-auto ">
        <div className=" md:flex md:items-center md:justify-between">
          <header className="mb-2">
            <div className="flex items-center space-x-3">
              <FileText className="h-6 w-6 text-blue-500 dark:text-gray-200" />
              <h1 className="text-2xl font-bold text-blue-500 dark:text-white">
                Product Management
              </h1>
            </div>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Melihat, mengatur, dan update stok produk.
            </p>
          </header>
        </div>

        <ProductSection />
        <ProductsTable products={products} categories={categories} isLoading={isLoading} />
      </div>
    </div>
  );
}
