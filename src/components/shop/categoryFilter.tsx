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
      <h3 className="font-semibold mb-3 text-frost">Kategori</h3>
      <div className="space-y-2">
        <div
          className={`flex text-sm items-center gap-1 ${
            !keyword && "text-frost font-semibold "
          } cursor-pointer hover:text-frost`}
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
                isActive && "text-frost font-semibold "
              } cursor-pointer hover:text-frost`}
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
