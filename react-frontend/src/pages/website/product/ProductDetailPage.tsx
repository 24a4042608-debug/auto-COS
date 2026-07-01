import React, { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, Share2, Info } from "lucide-react";
import { useDbData } from "@/hooks/useDbData";
import Accordion from "@/components/ui/luxury/Accordion";
import MagneticButton from "@/components/ui/luxury/MagneticButton";
import Dialog from "@/components/ui/luxury/Dialog";

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { products, loading } = useDbData();

  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [isSizeDialogOpen, setIsSizeDialogOpen] = useState(false);

  const product = products.find((p) => p.slug === slug);

  React.useEffect(() => {
    if (product && !selectedColor) {
      setSelectedColor(product.colors[0]?.name || "");
    }
  }, [product, selectedColor]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] pt-36 md:pt-44 bg-luxury-bg">
        <div className="w-6 h-6 rounded-full border-2 border-luxury-gold border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!product) {
    return <Navigate to="/products" replace />;
  }

  const relatedProducts = products
    .filter((p) => p.collectionSlug === product.collectionSlug && p.id !== product.id)
    .slice(0, 3);

  const accordionItems = [
    {
      id: "fabric",
      title: "Material & Composition",
      content: (
        <div className="space-y-2">
          <p>{product.fabric}</p>
          <p>All fabric fibers are hand-selected from regenerative, carbon-neutral agricultural regions in Northern Italy and the Mongolian plains.</p>
        </div>
      ),
    },
    {
      id: "care",
      title: "Care Instructions",
      content: (
        <ul className="list-disc pl-4 space-y-1">
          {product.care.map((c, i) => <li key={i}>{c}</li>)}
        </ul>
      ),
    },
    {
      id: "details",
      title: "Silhouette Details",
      content: (
        <ul className="list-disc pl-4 space-y-1">
          {product.details.map((d, i) => <li key={i}>{d}</li>)}
        </ul>
      ),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 pt-36 md:pt-44 pb-12 md:pb-24 space-y-24">
      <Link
        to="/products"
        className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-luxury-text-secondary hover:text-luxury-gold transition-colors focus:outline-none"
      >
        <ArrowLeft className="w-4 h-4 stroke-[1.5]" />
        [ Back to Catalogue ]
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        <div className="lg:col-span-7 space-y-6">
          {product.images.map((img, index) => (
            <div key={index} className="relative aspect-[3/4] overflow-hidden bg-white border border-[#050505]">
              <img src={img} alt={`${product.name} detail view ${index + 1}`} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
              <div className="absolute bottom-4 right-4 bg-[#050505] text-[9px] font-mono text-[#F4F4F0] px-2.5 py-1 uppercase tracking-widest">
                View 0{index + 1} / 0{product.images.length}
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-5 lg:sticky lg:top-36 space-y-8">
          <div className="space-y-4">
            <span className="font-mono text-[9px] tracking-[0.2em] text-[#E61919] uppercase block">
              [ Collection: {product.collectionSlug.replace(/-/g, " ")} ]
            </span>
            <div className="flex justify-between items-start gap-4">
              <h1 className="font-sans font-black text-3xl md:text-4xl text-luxury-text-primary tracking-tight leading-tight uppercase">
                {product.name}
              </h1>
              <span className="font-mono text-lg text-luxury-text-primary whitespace-nowrap mt-1.5">
                [ {product.price} ]
              </span>
            </div>
            <p className="text-xs text-luxury-text-secondary leading-relaxed font-sans pt-2">{product.description}</p>
          </div>

          <hr className="border-[#050505]/15" />

          <div className="space-y-3 font-mono text-[10px]">
            <span className="text-luxury-text-secondary uppercase tracking-widest block">[ Color: {selectedColor || "N/A"} ]</span>
            <div className="flex gap-3">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c.name)}
                  className="w-6 h-6 border flex items-center justify-center transition-all duration-300 focus:outline-none cursor-pointer"
                  style={{ borderColor: selectedColor === c.name ? "#E61919" : "rgba(5,5,5,0.2)" }}
                  aria-label={`Select color ${c.name}`}
                >
                  <span className="w-4 h-4 block" style={{ backgroundColor: c.hex }} />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3 font-mono text-[10px]">
            <div className="flex justify-between items-baseline">
              <span className="text-luxury-text-secondary uppercase tracking-widest">[ Size: {selectedSize || "Select size"} ]</span>
              <button onClick={() => setIsSizeDialogOpen(true)} className="text-[9px] uppercase tracking-widest text-[#E61919] hover:underline focus:outline-none flex items-center gap-1 cursor-pointer">
                Size Guide <Info className="w-3 h-3 stroke-[1.5]" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`border px-4 py-2.5 text-xs transition-all duration-300 focus:outline-none cursor-pointer ${
                    selectedSize === size
                      ? "border-[#E61919] bg-[#E61919]/5 text-[#E61919] font-bold"
                      : "border-[#050505]/20 text-luxury-text-primary hover:border-[#050505]"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 space-y-3">
            <button className="w-full bg-[#050505] text-[#F4F4F0] hover:bg-[#E61919] hover:text-white py-4 text-xs font-mono uppercase tracking-[0.25em] transition-colors duration-300 border-none cursor-pointer">
              [ Book Atelier Viewing ]
            </button>
            <div className="flex items-center justify-between text-[9px] font-mono tracking-widest text-luxury-text-secondary px-1 uppercase">
              <span>// Limited capsule production</span>
              <button className="hover:text-[#E61919] transition-colors flex items-center gap-1 focus:outline-none cursor-pointer">
                Share silhouette <Share2 className="w-3.5 h-3.5 stroke-[1.5]" />
              </button>
            </div>
          </div>

          <hr className="border-[#050505]/15" />
          <Accordion items={accordionItems} />
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="border-t border-[#050505] pt-16 space-y-12">
          <div className="text-center space-y-2">
            <span className="font-mono text-[9px] tracking-[0.2em] text-[#E61919] uppercase block">[ CURATED STYLING ]</span>
            <h2 className="font-sans font-black text-2xl md:text-3xl text-luxury-text-primary tracking-tight uppercase">Suggested Coordinates</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {relatedProducts.map((p) => (
              <div key={p.id} className="group flex flex-col">
                <Link to={`/product/${p.slug}`} className="block relative aspect-[3/4] overflow-hidden mb-6 bg-white border border-[#050505]">
                  <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </Link>
                <div className="flex justify-between items-baseline gap-2">
                  <h3 className="font-sans font-bold text-base text-luxury-text-primary tracking-tight uppercase group-hover:text-[#E61919] transition-colors duration-300">
                    <Link to={`/product/${p.slug}`}>{p.name}</Link>
                  </h3>
                  <span className="text-xs text-luxury-text-secondary font-mono">[ {p.price} ]</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <Dialog isOpen={isSizeDialogOpen} onClose={() => setIsSizeDialogOpen(false)} title="[ Atelier Size Guide ]">
        <div className="space-y-6 font-sans">
          <p className="text-xs text-luxury-text-secondary leading-relaxed">
            Our silhouettes feature architectural, relaxed draping cuts. Please choose your usual French/Italian measurements.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-xs">
              <thead>
                <tr className="border-b border-[#050505] font-mono text-[10px] uppercase text-luxury-text-primary">
                  <th className="py-2.5">Atelier Size</th>
                  <th className="py-2.5">French (FR)</th>
                  <th className="py-2.5">Italian (IT)</th>
                  <th className="py-2.5">Chest (cm)</th>
                  <th className="py-2.5">Waist (cm)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#050505]/20 text-luxury-text-secondary font-mono text-[10px]">
                {[["XS","34","38","80 - 84","62 - 66"],["S","36","40","84 - 88","66 - 70"],["M","38","42","88 - 92","70 - 74"],["L","40","44","92 - 96","74 - 78"]].map(([sz,...rest]) => (
                  <tr key={sz}>
                    <td className="py-2.5 font-bold text-luxury-text-primary">{sz}</td>
                    {rest.map((v,i) => <td key={i} className="py-2.5">{v}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
