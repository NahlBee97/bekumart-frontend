import { ShopSidebar } from "@/components/shop/shopSidebar";
import { getCategories } from "@/lib/data";

export default async function shopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getCategories();
  return (
    <div className="min-h-screen">
      <main className="bg-slate-50 mx-auto p-4 lg:px-10">
        <div className=" flex flex-col lg:flex-row gap-4">
          {/* Sidebar */}
          <div className="hidden md:block w-full lg:w-auto">
            <ShopSidebar categories={categories} />
          </div>

          {/* Main Content */}
          <div className="flex-1">{children}</div>
        </div>
      </main>
    </div>
  );
}
