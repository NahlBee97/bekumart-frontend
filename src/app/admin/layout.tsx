import AdminSidebar from "@/components/admin/adminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <main className="mx-auto p-4 lg:p-8">
        <div className=" flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="hidden md:block w-full lg:w-auto">
            <AdminSidebar />
          </div>

          {/* Main Content */}
          <div className="flex-1">{children}</div>
        </div>
      </main>
    </div>
  );
}
