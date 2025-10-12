import AdminSidebar from "@/components/admin/adminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen font-sans">
      <main className="container mx-auto py-4 lg:py-8">
        <div className="flex flex-col lg:flex-row gap-8">
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
