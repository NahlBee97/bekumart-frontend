interface props {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

export const StatCard = ({ title, value, icon }:props) => {
  return (
    <div className="h-24 md:h-40 bg-white py-2 md:py-4 md:px-2 rounded-2xl shadow-sm shadow-ink/5 hover:shadow-md transition-shadow duration-300 flex flex-col items-center justify-center gap-2">
      <div className="bg-frost-light text-frost-deep p-1.5 md:p-3 rounded-full">{icon}</div>
      <div className="text-center">
        <p className="text-xs md:text-sm text-fog">{title}</p>
        <p className="text-sm md:text-xl text-ink font-display font-semibold">{value}</p>
      </div>
    </div>
  );
};