import CustomerSection from "@/components/admin/dashboard/customerSection";
import OriginSection from "@/components/admin/dashboard/originSection";
import SalesSection from "@/components/admin/dashboard/salesSection";

export default function DashboardPage() {
  return (
    <main className=" min-h-screen">
      <div className="space-y-8">
        <h2 className="text-xl md:text-2xl text-blue-500 font-bold mb-4">
          Penjualan & Pendapatan
        </h2>
        <SalesSection />
        <div className="flec flex-col">
          <h2 className="text-xl md:text-2xl text-blue-500 font-bold mb-4">
            Data Pelanggan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="row-start-2 md:row-start-1 md:col-span-2">
              <OriginSection />
            </div>
            <div>
              <CustomerSection />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
