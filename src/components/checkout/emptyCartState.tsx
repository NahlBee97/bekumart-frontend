import Link from "next/link";

// Sub-components for better organization
export const EmptyCartState = () => (
  <div className="flex h-screen items-center justify-center bg-gray-50">
    <div className="flex flex-col gap-4 justify-center items-center">
      <h2 className="text-xl font-semibold text-gray-700">
        Tidak ada produk untuk checkout
      </h2>
      <Link
        href="/"
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
      >
        Lanjut Belanja
      </Link>
    </div>
  </div>
);
