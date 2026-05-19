import AdminSidebar from "@/components/admin/adminSidebar";
import { AdminRouteGuard } from "@/components/wrapper/adminRouteGuard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminRouteGuard>
      <div className="min-h-screen bg-slate-50">
        <div className="container mx-auto p-2">
          <div className=" flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="hidden md:block w-full lg:w-auto">
              <AdminSidebar />
            </div>

            {/* Main Content */}
            <div className="flex-1">{children}</div>
          </div>
        </div>
      </div>
    </AdminRouteGuard>
  );
}
