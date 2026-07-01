import { notFound } from "next/navigation";
import Link from "next/link";
import { LUXURY_COLLECTIONS, LUXURY_PRODUCTS } from "@/constants/mockData";
import { ArrowLeft } from "lucide-react";

interface CollectionDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CollectionDetailPage({
  params,
}: CollectionDetailPageProps) {
  const { slug } = await params;
  const collection = LUXURY_COLLECTIONS.find((c) => c.slug === slug);

  if (!collection) {
    notFound();
  }

  // Filter products by collection slug
  const products = LUXURY_PRODUCTS.filter((p) => p.collectionSlug === slug);

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 space-y-16">
      
      {/* Back Button */}
      <Link
        href="/collections"
        className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-luxury-text-secondary hover:text-luxury-gold transition-colors focus:outline-none"
      >
        <ArrowLeft className="w-4 h-4 stroke-[1.5]" />
        Back to Collections
      </Link>

      {/* Campaign Details Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-end border-b border-luxury-border pb-12">
        <div className="lg:col-span-7 space-y-4">
          <span className="text-[10px] tracking-[0.3em] uppercase text-luxury-gold block font-sans">
            Campaign {collection.season} &bull; {collection.year}
          </span>
          <h1 className="font-serif text-3xl md:text-5xl text-luxury-text-primary tracking-wide uppercase">
            {collection.name}
          </h1>
          <p className="text-sm text-luxury-text-secondary leading-relaxed font-sans max-w-xl">
            {collection.description}
          </p>
        </div>
        <div className="lg:col-span-5 flex lg:justify-end text-xs text-luxury-text-secondary font-sans tracking-wide">
          <span>{products.length} Curated Silhouettes</span>
        </div>
      </div>

      {/* Collection Cover Parallax Image */}
      <div className="relative h-[45vh] md:h-[60vh] overflow-hidden rounded-sm border border-luxury-border/30">
        <img
          src={collection.coverImage}
          alt={collection.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Products Grid */}
      <div className="space-y-12">
        <h2 className="font-serif text-xl tracking-wider text-luxury-text-primary uppercase border-b border-luxury-border/40 pb-4">
          Collection Silhouettes
        </h2>

        {products.length === 0 ? (
          <p className="text-sm text-luxury-text-secondary font-sans py-8">
            Atelier items are currently in archive.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {products.map((product) => (
              <div key={product.id} className="group flex flex-col">
                <Link
                  href={`/product/${product.slug}`}
                  className="block relative aspect-[3/4] overflow-hidden mb-6 bg-white border border-luxury-border/60 rounded-sm"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {product.images[1] && (
                    <img
                      src={product.images[1]}
                      alt={product.name}
                      className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    />
                  )}
                </Link>

                <div className="flex justify-between items-baseline gap-2">
                  <h3 className="font-serif text-lg text-luxury-text-primary tracking-wide group-hover:text-luxury-gold transition-colors duration-300">
                    <Link href={`/product/${product.slug}`}>{product.name}</Link>
                  </h3>
                  <span className="text-xs text-luxury-text-secondary font-sans">
                    {product.price}
                  </span>
                </div>
                
                <span className="text-[10px] text-luxury-text-secondary tracking-wider mt-1 font-sans">
                  {product.fabric.split(".")[0]}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
