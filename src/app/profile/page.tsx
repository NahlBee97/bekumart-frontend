import AccountInfo from "@/components/profile/accountInfo";
import AddressInfo from "@/components/profile/addressInfo";
import { getUserAddresses } from "@/lib/addressData";
import { getUserData } from "@/lib/userData";

export default async function ProfilePage() {

  const [ initialUser, initialAddresess ] = await Promise.all([getUserData(), getUserAddresses()])
  
  return (
    <div className="min-h-screen antialiased">
      <main className="max-w-4xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="mb-4">
          <h1 className="text-xl md:text-3xl font-bold tracking-tight text-blue-500">
            Pengaturan Akun
          </h1>
        </div>

        <div className="space-y-10">
          <AccountInfo initialUser={initialUser} />
          <AddressInfo initialAddresess={initialAddresess}/>
        </div>
      </main>
    </div>
  );
}
