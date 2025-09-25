import { CheckCircleIcon } from "lucide-react";
import Link from "next/link";

export default function Success() {
  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center p-4 font-sans">
      <div className="bg-white p-6 md:p-10 rounded-2xl shadow-xl w-full max-w-2xl text-center">
        <CheckCircleIcon />

        <h1 className="text-3xl font-bold text-gray-800 mt-4">
          Thank You for Your Order!
        </h1>

        <div className="mt-10">
          <Link
            href="/products"
            className="inline-block w-full sm:w-auto px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-300"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
