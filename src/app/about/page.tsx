import Head from "next/head";
import { Users, Target, Eye, Snowflake } from "lucide-react";
import { Reveal } from "@/components/reveal";

export default function AboutPage() {
  return (
    <main className="bg-mist">
      <Head>
        <title>BekuMart</title>
        <meta
          name="description"
          content="Kenali lebih jauh tentang BekuMart, misi kami, dan tim di baliknya."
        />
      </Head>

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-ink text-white text-center py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-frost-deep/40 via-ink to-ink" />
          <div className="relative container flex flex-col items-center mx-auto px-6 animate-fade-up">
            <div className="frost-shimmer bg-white/10 rounded-2xl p-4 mb-4">
              <Snowflake className="w-10 h-10 text-frost-light" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-semibold leading-tight mb-4">
              BekuMart
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto text-white/75">
              Menyediakan kemudahan dan kelezatan makanan beku berkualitas
              tinggi langsung ke dapur Anda.
            </p>
          </div>
        </section>

        {/* Mission and Vision Section */}
        <Reveal as="section" className=" py-16 sm:py-24">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="bg-frost-light rounded-full p-2.5">
                      <Eye className="h-6 w-6 text-frost-deep" />
                    </div>
                    <h2 className="font-display text-2xl md:text-3xl font-semibold text-ink">
                      Visi Kami
                    </h2>
                  </div>
                  <p className="text-fog leading-relaxed">
                    Menjadi pilihan utama keluarga Indonesia untuk solusi
                    makanan beku yang praktis, lezat, dan terpercaya.
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="bg-frost-light rounded-full p-2.5">
                      <Target className="h-6 w-6 text-frost-deep" />
                    </div>
                    <h2 className="font-display text-2xl md:text-3xl font-semibold text-ink">
                      Misi Kami
                    </h2>
                  </div>
                  <p className="text-fog leading-relaxed">
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
                  src="./frozen-food.jpg"
                  alt="Produk Frozen Food"
                  className="rounded-2xl shadow-xl shadow-ink/10 mx-auto"
                />
              </div>
            </div>
          </div>
        </Reveal>

        {/* Team Section */}
        <Reveal as="section" className="py-16 sm:py-24">
          <div className="container mx-auto px-6 text-center">
            <div className="inline-flex bg-frost-light rounded-full p-3 mb-4">
              <Users className="h-8 w-8 text-frost-deep" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink mb-4">
              Tim Kami
            </h2>
            <p className="text-fog max-w-2xl mx-auto mb-12">
              Kami adalah sekelompok pecinta kuliner yang bersemangat untuk
              memudahkan hidup Anda dengan makanan beku berkualitas.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {[
                { name: "Nahalil", role: "Founder & CEO", img: "https://placehold.co/150x150/14b8c4/ffffff?text=CEO" },
                { name: "Nindhi Meyna S.", role: "Head of Operations", img: "https://placehold.co/150x150/e63950/ffffff?text=COO" },
                { name: "Nadienatul Syahirah", role: "Marketing Manager", img: "https://placehold.co/150x150/0b7285/ffffff?text=CMO" },
              ].map((member) => (
                <div
                  key={member.name}
                  className="bg-white p-6 rounded-2xl shadow-sm shadow-ink/5 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                >
                  {/* eslint-disable-next-line */}
                  <img
                    src={member.img}
                    alt={member.role}
                    className="w-24 h-24 rounded-full mx-auto mb-4 ring-4 ring-frost-light"
                  />
                  <h3 className="font-display text-xl font-semibold text-ink">
                    {member.name}
                  </h3>
                  <p className="text-frost-deep text-sm font-medium">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
