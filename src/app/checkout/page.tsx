import CheckoutPageClient from "@/components/checkout/checkoutPageClient";
import { UserRouteGuard } from "@/components/wrapper/userRouteGuard";

export default function CheckoutPage() {
  return (
    <UserRouteGuard>
      <CheckoutPageClient />
    </UserRouteGuard>
  );
}
