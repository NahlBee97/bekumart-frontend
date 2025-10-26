import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4">
      <h1 className="text-6xl font-bold text-blue-600">404</h1>
      <h2 className="mt-4 text-2xl font-semibold text-gray-800">
        Halaman tidak ditemukan
      </h2>
      <p className="mt-2 text-gray-600">
        Maaf, kami tidak dapat menemukan halaman yang Anda cari.
      </p>
      <Link
        href="/"
        className="mt-6 px-5 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Kembali
      </Link>
    </div>
  );
}
