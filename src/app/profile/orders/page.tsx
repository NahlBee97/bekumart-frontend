import OrderHistoryClient from "@/components/profile/orders/orderHistoryClient";
import { getUserId, getUserOrders } from "@/lib/data";

export default async function OrderHistoryPage() {
  const userId = await getUserId();
  const initialOrders = await getUserOrders(userId);

  return (
    <div className="min-h-screen font-sans">
      <div className="container mx-auto max-w-5xl px-4 py-2 sm:py-8">
        <header className="mb-6">
          <h1 className="text-xl md:text-3xl font-bold tracking-tight text-blue-500 sm:text-4xl">
            Riwayat Pesanan
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Lihat semua pesanan yang telah Anda buat.
          </p>
        </header>
        <main>
          <OrderHistoryClient initialOrders={initialOrders} />
        </main>
      </div>
    </div>
  );
}
