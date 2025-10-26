export const SummaryRow = ({
  label,
  value,
}: {
  label: string;
  value: string | React.ReactNode;
}) => (
  <div className="flex items-center justify-between">
    <dt className="text-sm text-gray-600">{label}</dt>
    <dd className="text-sm font-medium text-gray-900">{value}</dd>
  </div>
);
