export default function Hero() {
  return (
    <div
      className="relative rounded-xl overflow-hidden min-h-[400px] md:min-h-[480px] flex items-end p-6 md:p-10 bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.5) 100%), url("./frozen-banner.jpg")`,
      }}
    >
      <div className="relative max-w-2xl text-white">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
          Frozen Store Terbaik di Sila
        </h1>
        <p className="text-base md:text-lg mb-6">
          Temukan beragam pilihan makanan beku kami, dari sajian istimewa hingga
          hidangan penutup yang segar. Nikmati praktisnya bahan-bahan
          berkualitas yang kami kirim sampai ke rumah Anda.
        </p>
        <button
          onClick={() => window.location.href="/shop"}
          className="flex gap-2 px-10 py-3 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out transform hover:-translate-y-1 disabled:bg-blue-300 disabled:cursor-not-allowed"
        >
          <p>Belanja</p>
        </button>
      </div>
    </div>
  );
}
