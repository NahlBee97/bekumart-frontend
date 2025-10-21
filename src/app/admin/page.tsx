import CustomerSection from "@/components/admin/dashboard/customerSection";
import OriginSection from "@/components/admin/dashboard/originSection";
import SalesSection from "@/components/admin/dashboard/salesSection";

export default function DashboardPage() {
  return (
    <main className=" min-h-screen">
      <div className="space-y-8">
        <SalesSection />
        <div className="flec flex-col">
          <h2 className="text-2xl text-blue-500 font-bold mb-4">
            Customer Insights
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <OriginSection />
            </div>
            <CustomerSection />
          </div>
        </div>
      </div>
    </main>
  );
}
