import { StatCardSkeleton } from "./statCardSkeleton";

export const CustomerSectionSkeleton = () => {
  return (
    <section>
      <div className="grid grid-cols-1 grid-rows-2 gap-4">
        <StatCardSkeleton />
        <StatCardSkeleton />
      </div>
    </section>
  );
};
