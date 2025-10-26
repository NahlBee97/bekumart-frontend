import { OperationalSection } from "@/components/admin/dashboard/operationalSection";
import { OrderTable } from "@/components/admin/orders/orderTable";
import { Package } from "lucide-react";

export default function OrderPage() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto">
        <header className="mb-2">
          <div className="flex items-center space-x-3">
            <Package className="h-6 w-6 text-blue-500 dark:text-gray-200" />
            <h1 className="text-2xl font-bold text-blue-500 dark:text-white">
              Order Management
            </h1>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Melihat, mengatur, dan update pesanan customer.
          </p>
        </header>

        <OperationalSection />

        <OrderTable/>
      </div>
    </div>
  );
};