import SalesSection from "@/components/admin/dashboard/salesSection";

export default function DashboardPage() {
  return (
    <main className="py-4 md:py-8 min-h-screen">
      <div className="space-y-8">
        <SalesSection/>
      </div>
    </main>
  );
}
