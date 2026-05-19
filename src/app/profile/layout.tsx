import Sidebar from "@/components/profile/sidebar";
import { UserRouteGuard } from "@/components/wrapper/userRouteGuard";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserRouteGuard>
      <div className="min-h-screen bg-slate-50">
        <main className="container mx-auto p-2">
          <div className="flex flex-col lg:flex-row">
            {/* Sidebar */}
            <div className="hidden md:block w-full lg:w-auto">
              <Sidebar />
            </div>

            {/* Main Content */}
            <div className="flex-1">{children}</div>
          </div>
        </main>
      </div>
    </UserRouteGuard>
  );
}
