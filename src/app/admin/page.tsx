import CustomerSection from "@/components/admin/dashboard/customerSection";
import OperationalSection from "@/components/admin/dashboard/operationalSection";
import ProductSection from "@/components/admin/dashboard/productSection";
import SalesSection from "@/components/admin/dashboard/salesSection";

export default function DashboardPage() {
  return (
    <main className="py-4 md:py-8 min-h-screen">
      <div className="space-y-8">
        <SalesSection/>
        <ProductSection/>
        <CustomerSection/>
        <OperationalSection/>
      </div>
    </main>
  );
}
