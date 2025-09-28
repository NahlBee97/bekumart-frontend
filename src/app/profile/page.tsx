import AccountInfo from "@/components/profile/accountInfo";
import AddressInfo from "@/components/profile/addressInfo";

// --- Main Component ---
export default function ProfilePage() {
  // --- State Management ---
  return (
    <div className="bg-gray-50 min-h-screen antialiased">
      <main className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
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
          <AddressInfo />
        </div>
      </main>
    </div>
  );
}
