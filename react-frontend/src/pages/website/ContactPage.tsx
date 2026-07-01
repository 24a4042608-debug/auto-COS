import React, { useRef, useState } from "react";
import { STORE_LOCATIONS } from "@/constants/mockData";
import MagneticButton from "@/components/ui/luxury/MagneticButton";

const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:8000/api";

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isLoading, setIsLoading]         = useState(false);
  const [errorMsg, setErrorMsg]           = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsLoading(true);
    setErrorMsg(null);

    const data = new FormData(formRef.current);

    try {
      const res = await fetch(`${API_BASE}/contact`, {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          name:     data.get("name"),
          email:    data.get("email"),
          category: data.get("category"),
          message:  data.get("message"),
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        // Extract first validation error if present
        const firstError = json.errors
          ? Object.values(json.errors as Record<string, string[]>)[0][0]
          : json.message ?? "Something went wrong.";
        setErrorMsg(firstError);
        return;
      }

      setFormSubmitted(true);
    } catch {
      setErrorMsg("Network error — please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 pt-36 md:pt-44 pb-12 md:pb-24 space-y-24 font-sans">
      
      {/* Editorial Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-[10px] tracking-[0.4em] uppercase text-luxury-gold block">
          Communications
        </span>
        <h1 className="font-serif text-luxury-heading text-luxury-text-primary tracking-wide uppercase">
          Contact Atelier
        </h1>
        <p className="text-sm text-luxury-text-secondary leading-relaxed max-w-xl">
          Inquire about private viewings, custom fittings, or campaign collaborations. Our correspondence office handles all requests within 48 hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
        
        {/* Left Column: Form & Map */}
        <div className="lg:col-span-7 space-y-12">
          
          {/* Contact Form */}
          <div className="bg-white border border-luxury-border p-8 md:p-12 rounded-sm space-y-8">
            <h2 className="font-serif text-2xl text-luxury-text-primary tracking-wide uppercase">
              Send Correspondence
            </h2>
            
            {formSubmitted ? (
              <div className="bg-luxury-gold/5 border border-luxury-gold/20 p-8 text-center space-y-3">
                <span className="text-luxury-gold font-serif text-lg block">Thank You</span>
                <p className="text-xs text-luxury-text-secondary leading-relaxed">
                  Your message has been received in our Paris office. A concierge will reach out to you within 48 hours.
                </p>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">

                {/* Error banner */}
                {errorMsg && (
                  <div className="bg-red-50 border border-red-200 px-4 py-3 text-xs text-red-700">
                    {errorMsg}
                  </div>
                )}

                {/* Grid Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-[10px] uppercase tracking-widest text-luxury-text-secondary">
                      Full Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      className="w-full px-4 py-3 bg-[#FAFAFA] border border-luxury-border text-xs focus:border-luxury-gold focus:outline-none transition-colors rounded-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-[10px] uppercase tracking-widest text-luxury-text-secondary">
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="e.g. john@atelier.com"
                      className="w-full px-4 py-3 bg-[#FAFAFA] border border-luxury-border text-xs focus:border-luxury-gold focus:outline-none transition-colors rounded-none"
                    />
                  </div>
                </div>

                {/* Dropdown Inquiry */}
                <div className="space-y-2">
                  <label htmlFor="category" className="text-[10px] uppercase tracking-widest text-luxury-text-secondary">
                    Inquiry Type
                  </label>
                  <select
                    id="category"
                    name="category"
                    className="w-full px-4 py-3 bg-[#FAFAFA] border border-luxury-border text-xs focus:border-luxury-gold focus:outline-none transition-colors rounded-none"
                  >
                    <option>Bespoke Draping Appointment</option>
                    <option>Boutique Viewing Request</option>
                    <option>Press &amp; Campaign Editorial</option>
                    <option>General Correspondence</option>
                  </select>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label htmlFor="message" className="text-[10px] uppercase tracking-widest text-luxury-text-secondary">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    placeholder="Describe your request..."
                    className="w-full px-4 py-3 bg-[#FAFAFA] border border-luxury-border text-xs focus:border-luxury-gold focus:outline-none transition-colors rounded-none resize-none"
                  />
                </div>

                <MagneticButton
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-luxury-text-primary text-white hover:bg-luxury-gold py-4 text-xs uppercase tracking-[0.25em] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Sending…" : "Transmit Message"}
                </MagneticButton>

              </form>
            )}

          </div>

          {/* Map placeholder */}
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-widest text-luxury-text-secondary block">
              Flagship Sanctuary Map
            </span>
            <div className="relative h-[300px] w-full bg-[#EAEAEA] flex items-center justify-center overflow-hidden border border-luxury-border rounded-sm">
              <img
                src="https://images.unsplash.com/photo-1485968579580-b6d095142e6e?q=80&w=1200"
                alt="Map Background Placeholder"
                className="absolute inset-0 w-full h-full object-cover opacity-35 filter grayscale contrast-125"
              />
              {/* Frosted Glass coordinate marker */}
              <div className="relative z-10 p-6 bg-white/80 border border-luxury-border shadow-md text-center max-w-xs backdrop-blur-sm">
                <span className="text-[9px] uppercase tracking-widest text-luxury-gold block mb-1">
                  Atelier Sanctuary
                </span>
                <span className="font-serif text-sm text-luxury-text-primary block font-medium">
                  42 Rue de Sévigné, Paris
                </span>
                <span className="text-[10px] text-luxury-text-secondary block mt-1.5 font-sans leading-relaxed">
                  Located in the historical Marais district. Open Monday through Saturday.
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Store locations info */}
        <div className="lg:col-span-5 space-y-12 lg:sticky lg:top-36">
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-widest text-luxury-gold block font-sans">
              Flagship boutiques
            </span>
            <h2 className="font-serif text-2xl text-luxury-text-primary tracking-wide uppercase">
              Boutique Locations
            </h2>
            <p className="text-xs text-luxury-text-secondary leading-relaxed">
              We welcome walk-ins for lookbook viewings, but recommend scheduling appointments for private fittings.
            </p>
          </div>

          <hr className="border-luxury-border" />

          {/* Boutiques list */}
          <div className="space-y-10">
            {STORE_LOCATIONS.map((store) => (
              <div key={store.city} className="space-y-3">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-serif text-lg text-luxury-text-primary tracking-wide uppercase">
                    {store.city}
                  </h3>
                  <span className="text-[10px] text-luxury-gold uppercase tracking-widest">
                    {store.name.split(" ")[0]}
                  </span>
                </div>
                <div className="text-xs text-luxury-text-secondary space-y-1 leading-relaxed">
                  <p className="font-medium text-luxury-text-primary">{store.name}</p>
                  <p>{store.address}</p>
                  <p>Tel: {store.phone}</p>
                </div>
                <div className="border-l border-luxury-gold/45 pl-3 py-0.5 space-y-1">
                  {store.hours.map((h, idx) => (
                    <span key={idx} className="block text-[10px] text-luxury-text-secondary">
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
}
