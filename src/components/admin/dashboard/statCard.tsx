interface props {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

export const StatCard = ({ title, value, icon }:props) => {
  return (
    <div className="h-24 md:h-40 bg-white py-2 md:py-4 md:px-2 rounded-lg shadow-md flex flex-col items-center justify-center gap-2">
      <div className="bg-blue-100 text-blue-600 p-1 md:p-3 rounded-full">{icon}</div>
      <div className="text-center">
        <p className="text-xs md:text-sm text-gray-500">{title}</p>
        <p className="text-sm md:text-xl text-blue-500 font-semibold">{value}</p>
      </div>
    </div>
  );
};