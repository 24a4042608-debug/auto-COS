"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, User, Clapperboard, AlertCircle, CheckCircle2 } from "lucide-react";
import { useFilm } from "@/contexts/FilmContext";

export default function AuthPage() {
  const [tab, setTab] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();
  const { login, register } = useFilm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (tab === "register" && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      const ok = tab === "login"
        ? await login(email, password)
        : await register(name, email, password);

      if (ok) {
        setSuccess(tab === "login" ? "Welcome back! Redirecting..." : "Account created! Redirecting...");
        setTimeout(() => router.push("/film"), 1200);
      } else {
        setError(tab === "login" ? "Invalid email or password." : "Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] flex">
      {/* Left panel — cinematic backdrop */}
      <div className="hidden lg:block lg:w-1/2 xl:w-3/5 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?q=80&w=1200"
          alt="CineVault"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0F]/60 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-transparent to-transparent" />

        {/* Brand overlay */}
        <div className="absolute bottom-12 left-12 space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#E50914] rounded-sm flex items-center justify-center">
              <Clapperboard className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-black text-2xl">CINE<span className="text-[#E50914]">VAULT</span></span>
          </div>
          <p className="text-zinc-400 text-sm max-w-xs leading-relaxed">
            Stream thousands of premium films and series in stunning cinematic quality.
          </p>
          {/* Feature bullets */}
          <ul className="space-y-1.5 mt-4">
            {[
              "Unlimited movies & series",
              "Stream in HD on any device",
              "Download & watch offline",
              "Cancel anytime",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2 text-zinc-300 text-sm">
                <CheckCircle2 className="w-4 h-4 text-[#E50914] flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm space-y-8">
          
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 justify-center">
            <div className="w-9 h-9 bg-[#E50914] rounded-sm flex items-center justify-center">
              <Clapperboard className="w-4.5 h-4.5 text-white" />
            </div>
            <span className="text-white font-black text-2xl">CINE<span className="text-[#E50914]">VAULT</span></span>
          </div>

          {/* Tab switcher */}
          <div className="flex bg-zinc-900 rounded-sm p-1 border border-white/10">
            {(["login", "register"] as const).map((t) => (
              <button
                key={t}
                onClick={() => { setTab(t); setError(""); setSuccess(""); }}
                className={`flex-1 py-2.5 text-sm font-semibold rounded-sm transition-all cursor-pointer ${
                  tab === t ? "bg-[#E50914] text-white shadow-lg shadow-red-900/30" : "text-zinc-500 hover:text-white"
                }`}
              >
                {t === "login" ? "Sign In" : "Create Account"}
              </button>
            ))}
          </div>

          {/* Heading */}
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-1"
            >
              <h1 className="text-white text-2xl font-black">
                {tab === "login" ? "Welcome back" : "Join CineVault"}
              </h1>
              <p className="text-zinc-500 text-sm">
                {tab === "login"
                  ? "Sign in to continue watching."
                  : "Create your account to start streaming."}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name (register only) */}
            <AnimatePresence>
              {tab === "register" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Full name"
                      required={tab === "register"}
                      className="w-full bg-zinc-900 border border-white/10 text-white text-sm pl-11 pr-4 py-3.5 rounded-sm placeholder:text-zinc-600 focus:outline-none focus:border-[#E50914]/60 transition-colors"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                required
                className="w-full bg-zinc-900 border border-white/10 text-white text-sm pl-11 pr-4 py-3.5 rounded-sm placeholder:text-zinc-600 focus:outline-none focus:border-[#E50914]/60 transition-colors"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="w-full bg-zinc-900 border border-white/10 text-white text-sm pl-11 pr-11 py-3.5 rounded-sm placeholder:text-zinc-600 focus:outline-none focus:border-[#E50914]/60 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white cursor-pointer transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Confirm password (register only) */}
            <AnimatePresence>
              {tab === "register" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm password"
                      required={tab === "register"}
                      className="w-full bg-zinc-900 border border-white/10 text-white text-sm pl-11 pr-4 py-3.5 rounded-sm placeholder:text-zinc-600 focus:outline-none focus:border-[#E50914]/60 transition-colors"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Forgot password */}
            {tab === "login" && (
              <div className="text-right">
                <button type="button" className="text-zinc-500 text-xs hover:text-white cursor-pointer transition-colors">
                  Forgot password?
                </button>
              </div>
            )}

            {/* Error / Success */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="flex items-center gap-2 bg-red-950/40 border border-red-500/30 text-red-400 text-sm px-3 py-2.5 rounded-sm"
                >
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {error}
                </motion.div>
              )}
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="flex items-center gap-2 bg-green-950/40 border border-green-500/30 text-green-400 text-sm px-3 py-2.5 rounded-sm"
                >
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  {success}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#E50914] hover:bg-[#f40612] disabled:opacity-60 disabled:cursor-not-allowed text-white py-3.5 font-bold text-sm rounded-sm transition-all cursor-pointer flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-red-900/30"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {tab === "login" ? "Signing in..." : "Creating account..."}
                </span>
              ) : (
                tab === "login" ? "Sign In" : "Create Account"
              )}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-zinc-600 text-xs">or continue with</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Social buttons */}
            <div className="grid grid-cols-2 gap-3">
              {["Google", "Apple"].map((provider) => (
                <button
                  key={provider}
                  type="button"
                  className="flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-zinc-300 text-sm py-3 rounded-sm transition-all cursor-pointer"
                >
                  {provider === "Google" ? "G" : ""}
                  {provider === "Apple" ? "⌘" : ""}
                  {provider}
                </button>
              ))}
            </div>
          </form>

          {/* Terms */}
          {tab === "register" && (
            <p className="text-zinc-600 text-xs text-center leading-relaxed">
              By creating an account, you agree to our{" "}
              <span className="text-zinc-400 hover:text-white cursor-pointer">Terms of Service</span>{" "}
              and{" "}
              <span className="text-zinc-400 hover:text-white cursor-pointer">Privacy Policy</span>.
            </p>
          )}

          <p className="text-zinc-600 text-xs text-center">
            <Link href="/film" className="text-zinc-500 hover:text-white transition-colors">
              ← Back to CineVault
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
