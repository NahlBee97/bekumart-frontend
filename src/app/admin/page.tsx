import AccountInfo from "@/components/profile/accountInfo";

// --- Main Component ---
export default function AdminPage() {
  // --- State Management ---
  return (
    <main className="bg-gray-50 min-h-screen antialiased">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Account Settings
          </h1>
          <p className="mt-1 text-md text-gray-600">
            Manage your profile, password, and shipping addresses.
          </p>
        </div>

        <div className="space-y-10">
          <AccountInfo />
        </div>
    </main>
  );
}
