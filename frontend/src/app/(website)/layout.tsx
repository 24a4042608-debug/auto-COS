import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/layouts/Footer";
import CustomCursor from "@/components/ui/luxury/CustomCursor";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="theme-luxury min-h-screen flex flex-col relative overflow-x-hidden"
    >
      {/* Premium custom mouse cursor */}
      <CustomCursor />

      {/* Floating glass navbar */}
      <Navbar />

      {/* Primary content showcase */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Premium campaign footer */}
      <Footer />
    </div>
  );
}
