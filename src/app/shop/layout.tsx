import { ShopSidebar } from "@/components/shop/shopSidebar";
import { getCategories } from "@/lib/data";

export default async function shopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getCategories();
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto p-2">
        <div className=" flex flex-col lg:flex-row gap-4">
          {/* Sidebar */}
          <div className="hidden md:block w-full lg:w-auto">
            <ShopSidebar categories={categories} />
          </div>

          {/* Main Content */}
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </div>
  );
}
