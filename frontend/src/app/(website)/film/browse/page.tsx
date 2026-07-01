import { Suspense } from "react";
import BrowseContent from "./BrowseContent";

export default function BrowsePage() {
  return (
    <Suspense fallback={
      <div className="bg-[#0A0A0F] min-h-screen pt-28 pb-20 flex items-center justify-center">
        <div className="space-y-3 text-center">
          <div className="w-8 h-8 border-2 border-[#E50914]/30 border-t-[#E50914] rounded-full animate-spin mx-auto" />
          <p className="text-zinc-500 text-sm">Loading films...</p>
        </div>
      </div>
    }>
      <BrowseContent />
    </Suspense>
  );
}
