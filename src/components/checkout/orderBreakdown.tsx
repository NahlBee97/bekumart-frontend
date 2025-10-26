import { SummaryRow } from "./summaryRow";

interface props {
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
  isCalculating: boolean;
}

export const OrderBreakdown = ({
  subtotal,
  shippingCost,
  tax,
  total,
  isCalculating,
}:props) => (
  <dl className="mt-6 space-y-4 border-t border-gray-200 pt-6">
    <SummaryRow
      label="Subtotal"
      value={`Rp ${subtotal.toLocaleString("id-ID")}`}
    />
    <SummaryRow
      label="Pengiriman"
      value={
        isCalculating ? (
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
        ) : shippingCost > 0 ? (
          `Rp ${shippingCost.toLocaleString("id-ID")}`
        ) : (
          "Gratis"
        )
      }
    />
    <SummaryRow label="PPN 11%" value={`Rp ${tax.toLocaleString("id-ID")}`} />
    <div className="flex items-center justify-between border-t border-gray-200 pt-4">
      <dt className="text-base font-semibold text-gray-900">Total Belanja</dt>
      <dd className="text-xl font-semibold text-blue-500">
        Rp {total.toLocaleString("id-ID", { minimumFractionDigits: 0 })}
      </dd>
    </div>
  </dl>
);
