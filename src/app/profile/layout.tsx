import Sidebar from "@/components/profile/sidebar";
import { UserRouteGuard } from "@/components/wrapper/userRouteGuard";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserRouteGuard>
      <div className="min-h-screen">
        <main className="bg-slate-50 mx-auto p-4 lg:px-10">
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
    </UserRouteGuard>
  );
}
