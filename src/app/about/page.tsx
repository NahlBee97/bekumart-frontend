import Head from "next/head";
import { Users, Target, Eye } from "lucide-react";

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>Tentang Kami - FrozenFood Delights</title>
        <meta
          name="description"
          content="Kenali lebih jauh tentang FrozenFood Delights, misi kami, dan tim di baliknya."
        />
      </Head>

      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <section className="bg-blue-600 text-white text-center py-20">
          <div className="container mx-auto px-6">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
              Tentang FrozenFood Delights
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto">
              Menyediakan kemudahan dan kelezatan makanan beku berkualitas
              tinggi langsung ke dapur Anda.
            </p>
          </div>
        </section>

        {/* Mission and Vision Section */}
        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div>
                  <div className="flex items-center gap-4 mb-3">
                    <Eye className="h-8 w-8 text-blue-500" />
                    <h2 className="text-3xl font-bold text-gray-800">
                      Visi Kami
                    </h2>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    Menjadi pilihan utama keluarga Indonesia untuk solusi
                    makanan beku yang praktis, lezat, dan terpercaya.
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-4 mb-3">
                    <Target className="h-8 w-8 text-blue-500" />
                    <h2 className="text-3xl font-bold text-gray-800">
                      Misi Kami
                    </h2>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    Kami berkomitmen untuk memilih bahan baku terbaik, menjaga
                    standar kebersihan tertinggi, dan memberikan layanan
                    pelanggan yang ramah dan responsif untuk memastikan kepuasan
                    Anda.
                  </p>
                </div>
              </div>
              <div className="text-center">
                {/* eslint-disable-next-line */}
                <img
                  src="https://images.unsplash.com/photo-1585442795893-b15d29f809d3?q=80&w=1887&auto=format&fit=crop"
                  alt="Produk Frozen Food"
                  className="rounded-lg shadow-xl mx-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="bg-white py-16 sm:py-24">
          <div className="container mx-auto px-6 text-center">
            <Users className="h-12 w-12 mx-auto text-blue-500 mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Tim Kami
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-12">
              Kami adalah sekelompok pecinta kuliner yang bersemangat untuk
              memudahkan hidup Anda dengan makanan beku berkualitas.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {/* Team Member 1 */}
              <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                {/* eslint-disable-next-line */}
                <img
                  src="https://placehold.co/150x150/6366f1/ffffff?text=CEO"
                  alt="CEO"
                  className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white"
                />
                <h3 className="text-xl font-semibold text-gray-900">
                  Ahmad Pratama
                </h3>
                <p className="text-blue-500">Founder & CEO</p>
              </div>
              {/* Team Member 2 */}
              <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                {/* eslint-disable-next-line */}
                <img
                  src="https://placehold.co/150x150/ec4899/ffffff?text=COO"
                  alt="COO"
                  className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white"
                />
                <h3 className="text-xl font-semibold text-gray-900">
                  Siti Lestari
                </h3>
                <p className="text-blue-500">Head of Operations</p>
              </div>
              {/* Team Member 3 */}
              <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                {/* eslint-disable-next-line */}
                <img
                  src="https://placehold.co/150x150/f59e0b/ffffff?text=CMO"
                  alt="CMO"
                  className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white"
                />
                <h3 className="text-xl font-semibold text-gray-900">
                  Budi Santoso
                </h3>
                <p className="text-blue-500">Marketing Manager</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};