import "./globals.css";
import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/footer";
import AuthWrapper from "@/components/wrapper/authWrapper";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jbMono = JetBrains_Mono({
  variable: "--font-jbmono",
  subsets: ["latin"],
  weight: ["500", "600"],
});

export const metadata: Metadata = {
  title: "BekuMart",
  description: "Frozen food store terpercaya — segar, beku, sampai di depan pintu.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jbMono.variable} font-sans antialiased`}
      >
        <AuthWrapper>{children}</AuthWrapper>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              borderRadius: "12px",
              background: "#0E1B22",
              color: "#F3FBFC",
              fontSize: "14px",
            },
          }}
        />
        <Footer />
      </body>
    </html>
  );
}
