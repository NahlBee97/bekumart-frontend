import { IProduct } from "@/interfaces/dataInterfaces";
import ProductCard from "../products/productCard";

export const ProductSection = ({ products, title }: { products: IProduct[]; title:string}) => {
if (products.length === 0) return (
  <section className="w-full min-h-screen flex flex-col justify-center text-center bg-white  border border-slate-200  rounded-lg p-4 sm:p-6 shadow-sm">
    <h2 className="text-base font-semibold text-blue-500 mb-4 uppercase tracking-wider">
      {title}
    </h2>
    <h2 className="text-base font-semibold text-slate-600 mb-4 tracking-wider">
      Silahkan cari produk lainnya
    </h2>
  </section>
);

  return (
    <section className="w-full bg-white  border border-slate-200  rounded-lg p-4 sm:p-6 shadow-sm">
      <h2 className="text-base font-semibold text-slate-600 mb-4 uppercase tracking-wider">
        Product Tersedia
      </h2>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
