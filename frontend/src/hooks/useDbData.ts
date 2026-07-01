"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api";
import { Product, Collection, LUXURY_PRODUCTS, LUXURY_COLLECTIONS } from "@/constants/mockData";

export function useDbData() {
  const [products, setProducts] = useState<Product[]>(LUXURY_PRODUCTS);
  const [collections, setCollections] = useState<Collection[]>(LUXURY_COLLECTIONS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        // Fetch products, categories in parallel
        const [productsRes, categoriesRes] = await Promise.all([
          api.get("/products", { params: { per_page: 50 } }),
          api.get("/categories")
        ]);

        const dbCategories = categoriesRes.data?.data || categoriesRes.data || [];
        const dbProducts = productsRes.data?.data || productsRes.data || [];

        if (dbProducts.length > 0) {
          // Map DB Categories to Collection interface
          const mappedCollections: Collection[] = dbCategories.map((cat: any) => ({
            id: String(cat.id),
            slug: cat.slug || `category-${cat.id}`,
            name: cat.name,
            tagline: cat.description || "Seasonal Silhouette Series",
            description: cat.description || "An exploration of clothing geometry and structural balance.",
            coverImage: cat.cover_image || "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200",
            year: "2026",
            season: "Autumn/Winter"
          }));

          // Map DB Products to Product interface
          const mappedProducts: Product[] = dbProducts.map((p: any) => {
            // Extract images from assets
            const images = p.assets && p.assets.length > 0 
              ? p.assets.map((asset: any) => asset.url || `http://localhost:8000/${asset.path}`)
              : ["https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800"]; // placeholder

            // Format price as currency (VND)
            const formattedPrice = new Intl.NumberFormat('vi-VN', {
              style: 'currency',
              currency: 'VND'
            }).format(Number(p.price || 0));

            return {
              id: String(p.id),
              slug: p.slug || `product-${p.id}`,
              name: p.name,
              price: formattedPrice,
              description: p.description || p.short_description || "No description available.",
              shortDescription: p.short_description || "A clean silhouette designed for dynamic posture.",
              images: images,
              collectionSlug: p.category?.slug || "all",
              fabric: p.attributes?.material || "100% Premium Cotton",
              care: ["Dry clean only", "Do not bleach", "Iron low heat"],
              details: [
                `SKU: ${p.sku}`,
                `Material: ${p.attributes?.material || "Premium Fiber"}`,
                `Origin: ${p.attributes?.origin || "Atelier Workshop"}`
              ],
              colors: [
                { name: "Raw Cream", hex: "#FAF8F5" },
                { name: "Slate Black", hex: "#111111" }
              ],
              sizes: ["S", "M", "L", "XL"],
              isEditorsPick: p.id % 2 === 0, // mock criteria
              isNewArrival: p.status === "active"
            };
          });

          setProducts(mappedProducts);
          if (mappedCollections.length > 0) {
            setCollections(mappedCollections);
          }
        }
      } catch (error) {
        console.warn("API load failed, falling back to campaign mock data:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return { products, collections, loading };
}
