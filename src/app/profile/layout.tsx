import Sidebar from "@/components/profile/sidebar";

export default function ProfileLayout({
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
            <Sidebar />
          </div>

          {/* Main Content */}
          <div className="flex-1">{children}</div>
        </div>
      </main>
    </div>
  );
}
