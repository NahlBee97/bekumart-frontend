import { IProduct } from "@/interfaces/productInterfaces";
import ProductCard from "../products/productCard";

interface props {
  products: IProduct[];
  title: string;
}

export const ProductSection = ({ products, title }: props) => {
  return (
    <section className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 sm:p-6 shadow-sm">
      <h2 className="text-base font-semibold text-slate-600 dark:text-slate-300 mb-4 uppercase tracking-wider">
        {title}
      </h2>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
