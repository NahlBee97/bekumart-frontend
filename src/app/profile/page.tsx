import AccountInfo from "@/components/profile/accountInfo";
import AddressInfo from "@/components/profile/addressInfo";

export default function ProfilePage() {
  
  return (
      <main className="px-4">
        <div className="mb-4">
          <h1 className="text-xl md:text-3xl font-bold tracking-tight text-blue-500">
            Pengaturan Akun
          </h1>
        </div>

        <div className="space-y-10">
          <AccountInfo />
          <AddressInfo />
        </div>
      </main>
  );
}
