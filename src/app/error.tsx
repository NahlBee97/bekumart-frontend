"use client";

import { useEffect } from "react";

export default function Error({ error }: { error: Error }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 text-center px-4">
      <h2 className="text-2xl font-semibold text-red-700">
        Terjadi Kesalahan
      </h2>
      <p className="mt-2 text-gray-600">
        {process.env.NODE_ENV === "development"
          ? error.message
          : "An unexpected error occurred."}
      </p>
      <button
        onClick={handleRefresh} // Call the hard refresh function
        className="mt-6 px-5 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
      >
        Coba Lagi
      </button>
    </div>
  );
}
