"use client"

import { ICategory } from "@/interfaces/dataInterfaces";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export const CategoryFilter = ({ categories }: { categories: ICategory[] }) => {
  const queryParams = useSearchParams();
  const keyword = queryParams.get("search");
  const router = useRouter();

  const handleClick = (category: string) => {
    const params = new URLSearchParams(queryParams.toString());

    if (category) params.set("search", category.toString());
    else params.delete("search");

    // Navigate with new params
    router.push(`/shop?${params.toString()}`);
  };
  return (
    <div>
      <h3 className="font-semibold mb-3 text-blue-500">Kategori</h3>
      <div className="space-y-2">
        <div
          className={`flex text-sm items-center gap-1 ${
            !keyword && "text-blue-500 font-semibold "
          } cursor-pointer hover:text-blue-500`}
          onClick={() => {
            const params = new URLSearchParams(queryParams.toString());
            params.delete("search");
            router.push(`/shop?${params.toString()}`);
          }}
        >
          Semua
        </div>
        {categories.map((c) => {
          const isActive = keyword === c.name;
          return (
            <div
              className={`flex text-sm items-center gap-1 ${
                isActive && "text-blue-500 font-semibold "
              } cursor-pointer hover:text-blue-500`}
              key={c.id}
              onClick={() => handleClick(c.name)}
            >
              {c.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};
