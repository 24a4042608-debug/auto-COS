import { Playfair_Display, Inter } from "next/font/google";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/layouts/Footer";
import CustomCursor from "@/components/ui/luxury/CustomCursor";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${playfair.variable} ${inter.variable} theme-luxury min-h-screen flex flex-col relative overflow-x-hidden`}
    >
      {/* Premium custom mouse cursor */}
      <CustomCursor />

      {/* Floating glass navbar */}
      <Navbar />

      {/* Primary content showcase */}
      <main className="flex-grow pt-24 md:pt-28">
        {children}
      </main>

      {/* Premium campaign footer */}
      <Footer />
    </div>
  );
}
