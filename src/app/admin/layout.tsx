import AdminSidebar from "@/components/admin/adminSidebar";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="2xl:px-[300px] xl:px-[150px] 2xl:pb-8 xl:pb-4">
      <div className="min-h-screen font-sans">
        <main className="container mx-auto py-4 lg:py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="w-full lg:w-auto">
              <AdminSidebar />
            </div>

            {/* Main Content */}
            <div className="flex-1">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
}
