import { FilmProvider } from "@/contexts/FilmContext";
import FilmNavbar from "@/components/film/FilmNavbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CineVault — Watch Movies & Series",
  description: "Stream the world's best films and series in stunning quality. CineVault — your cinematic universe.",
};

export default function FilmLayout({ children }: { children: React.ReactNode }) {
  return (
    <FilmProvider>
      <div className="min-h-screen bg-[#0A0A0F] text-white">
        <FilmNavbar />
        <main>{children}</main>
      </div>
    </FilmProvider>
  );
}
