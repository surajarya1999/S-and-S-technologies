"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  Code2,
  Database,
  MessageSquare,
  PlayCircle,
  Sparkles,
} from "lucide-react";

export default function Home() {
  const [showText, setShowText] = useState(false);

  // Video play hone ke exact 10 seconds baad text show karne ke liye timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(true);
    }, 10000); // 10000ms = 10 seconds

    return () => clearTimeout(timer);
  }, []);

  const [currency, setCurrency] = useState("INR");
  const [plan, setPlan] = useState("frontend");

  const [addons, setAddons] = useState({
    fastDelivery: false,
    adminPanel: false,
    seoSetup: false,
    maintenance: false,
  });

  const rates = { INR: 1, USD: 0.012 };
  const symbols = { INR: "₹", USD: "$" };

  const prices = {
    base: { frontend: 12000, fullstack: 28000 },
    addons: {
      fastDelivery: 3000,
      adminPanel: 6500,
      seoSetup: 2500,
      maintenance: 4000,
    },
  };

  const rate = rates[currency];
  const sym = symbols[currency];

  const calculateTotal = () => {
    let total = prices.base[plan];

    if (addons.fastDelivery) total += prices.addons.fastDelivery;
    if (addons.adminPanel) total += prices.addons.adminPanel;
    if (addons.seoSetup) total += prices.addons.seoSetup;
    if (addons.maintenance) total += prices.addons.maintenance;

    return Math.round(total * rate).toLocaleString();
  };

  const toggleAddon = (key) => {
    setAddons((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const formattedTotal = `${sym}${calculateTotal()}`;

  const whatsappUrl = `https://wa.me/+917509478047?text=${encodeURIComponent(
    `Hi S&S Digital Studio! I calculated an estimate for a ${plan} project. Estimated Budget: ${formattedTotal}`
  )}`;

  return (
    <div className="bg-[#F9F8F6] text-[#111111] font-sans antialiased selection:bg-slate-900 selection:text-white grid-pattern relative overflow-x-hidden min-h-screen w-full">

      <main className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 max-w-7xl">

        {/* HERO SECTION WITH SIDE-BY-SIDE TEXT & IMAGE LAYOUT */}
        <section className="py-8 sm:py-12 md:py-16 border-b border-[#E8E5DF] relative w-full">

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12 sm:mb-16">

            {/* LEFT COLUMN - TEXT & BUTTONS */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-amber-100/80 text-amber-900 text-[11px] sm:text-xs font-bold border border-amber-200 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
                Available for Q4 Client Engagements
              </div>

              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-[-0.045em] text-slate-950 leading-[1.08]">
                High-converting web platforms{" "}
                <span className="text-slate-400 font-normal block sm:inline">
                  engineered by S&S. Web Technologies
                </span>
              </h1>

              <p className="text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl">
                We build fast, responsive, and production-ready Next.js applications, Tailwind CSS interfaces, and interactive digital products designed to scale your revenue.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 pt-2">
                <a
                  href="#pricing"
                  className="w-full sm:w-auto px-6 py-4 rounded-xl bg-slate-950 text-white text-xs font-bold uppercase tracking-wider hover:bg-amber-600 transition-colors duration-300 flex items-center justify-center gap-2 shadow-md"
                >
                  <span>Calculate Project Cost</span>
                  <Calculator className="w-4 h-4" />
                </a>

                <Link
                  href="/work"
                  className="w-full sm:w-auto px-6 py-4 rounded-xl border border-slate-300 bg-white text-slate-800 text-xs font-bold uppercase tracking-wider hover:border-slate-900 hover:bg-slate-50 transition-colors duration-300 text-center shadow-sm"
                >
                  View Case Studies
                </Link>
              </div>
            </div>

            {/* RIGHT COLUMN - STYLISH 3D IMAGE PREVIEW */}
            <div className="lg:col-span-5 relative">
              <div className="absolute -z-10 w-72 h-72 bg-amber-500/15 rounded-full blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              <div className="rounded-2xl sm:rounded-3xl border border-slate-200/80 bg-white p-2 shadow-xl overflow-hidden group">
                <img
                  src="/banner4.png"
                  alt="S&S Web Technologies Showcase"
                  className="w-full h-[280px] sm:h-[340px] object-cover rounded-xl sm:rounded-2xl group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

          </div>

          {/* FULL-WIDTH RESPONSIVE VIDEO BANNER WITH 10S DELAY SLOW-MO THEME TEXT */}
          <div className="w-full relative rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-900 shadow-2xl group max-w-8xl mx-auto">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-[260px] sm:h-[420px] md:h-[520px] object-cover [-webkit-backface-visibility:hidden] [transform:translateZ(0)]"
            >
              <source src="/video.mp4" type="video/mp4" />
              Aapka browser video tag ko support nahi karta.
            </video>

            {/* 10s Delay Slow-mo Text Overlay Matched with Website Theme */}
            {showText && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-4 transition-all duration-1000">
                <h2 className="text-[#F9F8F6] font-extrabold text-2xl sm:text-4xl md:text-6xl tracking-wide text-center drop-shadow-[0_15px_25px_rgba(0,0,0,0.9)] animate-slowmo-fade">
                  Welcome to <span className="text-amber-400 font-black">S&S Web Technologies</span>
                </h2>
              </div>
            )}

          </div>

        </section>

        {/* COST ESTIMATOR SECTION */}
        <section
          id="pricing"
          className="py-14 sm:py-18 md:py-20 border-b border-[#E8E5DF] w-full"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 sm:mb-12 gap-5">
            <div>
              <span className="text-[10px] sm:text-xs font-bold text-amber-700 uppercase tracking-[0.2em]">
                Transparent Pricing
              </span>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-950 mt-2">
                Project Budget Estimator
              </h2>
            </div>

            <div className="bg-white p-1 rounded-xl flex items-center gap-1 border border-slate-200 shadow-sm">
              <button
                onClick={() => setCurrency("INR")}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${currency === "INR"
                  ? "bg-slate-950 text-white"
                  : "text-slate-600 hover:text-slate-950"
                  }`}
              >
                ₹ INR
              </button>

              <button
                onClick={() => setCurrency("USD")}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${currency === "USD"
                  ? "bg-slate-950 text-white"
                  : "text-slate-600 hover:text-slate-950"
                  }`}
              >
                $ USD
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 w-full">
            <div className="lg:col-span-2 space-y-8 sm:space-y-10">

              {/* PRIMARY SCOPE */}
              <div>
                <h3 className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-[0.16em] mb-4">
                  1. Select Primary Scope
                </h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div
                    onClick={() => setPlan("frontend")}
                    className={`group p-5 sm:p-6 rounded-2xl border cursor-pointer transition-all duration-200 ${plan === "frontend"
                      ? "bg-white border-amber-500 ring-2 ring-amber-500/20 shadow-md"
                      : "bg-white/60 border-slate-200 hover:border-amber-300 shadow-sm"
                      }`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-2.5 bg-slate-100 rounded-xl group-hover:bg-amber-50 transition-colors">
                        <Code2 className="w-5 h-5 sm:w-6 sm:h-6 text-slate-900" />
                      </div>

                      <span className="text-lg sm:text-xl font-black text-slate-950">
                        {sym}
                        {Math.round(prices.base.frontend * rate).toLocaleString()}
                      </span>
                    </div>

                    <h4 className="font-bold text-slate-950 text-sm sm:text-base mb-2">
                      Frontend Web Application
                    </h4>

                    <p className="text-xs sm:text-sm text-slate-500 leading-6">
                      Pixel-perfect React/Next.js interface, 100% responsive, custom animations & optimized SEO.
                    </p>
                  </div>

                  <div
                    onClick={() => setPlan("fullstack")}
                    className={`group p-5 sm:p-6 rounded-2xl border cursor-pointer transition-all duration-200 ${plan === "fullstack"
                      ? "bg-white border-amber-500 ring-2 ring-amber-500/20 shadow-md"
                      : "bg-white/60 border-slate-200 hover:border-amber-300 shadow-sm"
                      }`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-2.5 bg-amber-50 rounded-xl group-hover:bg-amber-100 transition-colors">
                        <Database className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
                      </div>

                      <span className="text-lg sm:text-xl font-black text-slate-950">
                        {sym}
                        {Math.round(prices.base.fullstack * rate).toLocaleString()}+
                      </span>
                    </div>

                    <h4 className="font-bold text-slate-950 text-sm sm:text-base mb-2">
                      Full-Stack Platform
                    </h4>

                    <p className="text-xs sm:text-sm text-slate-500 leading-6">
                      Complete application with Next.js App Router, Database integration, User Auth, & Custom APIs.
                    </p>
                  </div>
                </div>
              </div>

              {/* ADDONS */}
              <div>
                <h3 className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-[0.16em] mb-4">
                  2. Choose Optional Add-ons
                </h3>

                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    {
                      key: "fastDelivery",
                      label: "⚡ Express 48-Hour Delivery",
                      price: prices.addons.fastDelivery,
                    },
                    {
                      key: "adminPanel",
                      label: "⚙️ Custom Admin Dashboard",
                      price: prices.addons.adminPanel,
                    },
                    {
                      key: "seoSetup",
                      label: "🚀 Technical SEO & Performance",
                      price: prices.addons.seoSetup,
                    },
                    {
                      key: "maintenance",
                      label: "🛠️ 1-Month Post-Launch Support",
                      price: prices.addons.maintenance,
                    },
                  ].map((item) => (
                    <label
                      key={item.key}
                      className={`p-4 rounded-xl border text-slate-700 cursor-pointer flex items-center justify-between gap-3 text-xs transition-colors duration-200 shadow-sm ${addons[item.key]
                        ? "border-amber-500 bg-amber-50/70 font-semibold"
                        : "border-slate-200 bg-white hover:border-amber-300"
                        }`}
                    >
                      <div className="flex items-center gap-2.5 sm:gap-3">
                        <input
                          type="checkbox"
                          checked={addons[item.key]}
                          onChange={() => toggleAddon(item.key)}
                          className="rounded border-slate-300 text-slate-900 focus:ring-amber-500 w-4 h-4"
                        />

                        <span className="text-[11px] sm:text-xs">
                          {item.label}
                        </span>
                      </div>

                      <span className="font-bold text-slate-900 text-xs whitespace-nowrap">
                        +{sym}
                        {Math.round(item.price * rate).toLocaleString()}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* REAL-TIME QUOTE CARD */}
            <div className="bg-slate-950 text-white p-6 sm:p-8 rounded-2xl flex flex-col justify-between h-fit lg:sticky lg:top-24 shadow-xl">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400">
                  Real-Time Quote
                </span>

                <h4 className="font-bold text-xl sm:text-2xl mt-2 mb-5 sm:mb-6">
                  Estimated Investment
                </h4>

                <div className="space-y-4 text-xs border-b border-white/10 pb-5 mb-5 text-slate-300">
                  <div className="flex justify-between gap-3">
                    <span>
                      Base Scope (
                      {plan === "frontend" ? "Frontend" : "Full-Stack"})
                    </span>

                    <span className="font-bold text-white whitespace-nowrap">
                      {sym}
                      {Math.round(prices.base[plan] * rate).toLocaleString()}
                    </span>
                  </div>

                  {addons.fastDelivery && (
                    <div className="flex justify-between gap-3 text-slate-400">
                      <span>Express Delivery</span>
                      <span className="whitespace-nowrap">
                        +{sym}
                        {Math.round(prices.addons.fastDelivery * rate).toLocaleString()}
                      </span>
                    </div>
                  )}

                  {addons.adminPanel && (
                    <div className="flex justify-between gap-3 text-slate-400">
                      <span>Admin Dashboard</span>
                      <span className="whitespace-nowrap">
                        +{sym}
                        {Math.round(prices.addons.adminPanel * rate).toLocaleString()}
                      </span>
                    </div>
                  )}

                  {addons.seoSetup && (
                    <div className="flex justify-between gap-3 text-slate-400">
                      <span>Technical SEO</span>
                      <span className="whitespace-nowrap">
                        +{sym}
                        {Math.round(prices.addons.seoSetup * rate).toLocaleString()}
                      </span>
                    </div>
                  )}

                  {addons.maintenance && (
                    <div className="flex justify-between gap-3 text-slate-400">
                      <span>1-Mo Support</span>
                      <span className="whitespace-nowrap">
                        +{sym}
                        {Math.round(prices.addons.maintenance * rate).toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-baseline gap-3 mb-6 sm:mb-8">
                  <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                    Total Price
                  </span>

                  <span className="text-3xl sm:text-4xl font-black text-amber-400 tracking-tight">
                    {formattedTotal}
                  </span>
                </div>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors duration-200 text-center shadow-lg"
              >
                <MessageSquare className="w-4 h-4" />
                Instant WhatsApp Proposal
              </a>
            </div>
          </div>
        </section>

        {/* CALL TO ACTION */}
        <section className="py-12 sm:py-16 text-center border-b border-[#E8E5DF] my-8 sm:my-12 w-full">
          <span className="text-[10px] sm:text-xs font-bold text-amber-700 uppercase tracking-[0.2em]">
            Ready to Collaborate?
          </span>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-950 tracking-tight mt-3 mb-4">
            Let’s discuss your next project details.
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-7 max-w-md mx-auto mb-8">
            Check out our detailed case studies, technical skills, or send us an inquiry directly.
          </p>

          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            <Link
              href="/work"
              className="px-6 py-3.5 rounded-xl bg-slate-950 text-white text-xs font-bold uppercase tracking-wider hover:bg-amber-600 transition-colors duration-200 shadow-sm"
            >
              Explore Work
            </Link>

            <Link
              href="/experience"
              className="px-6 py-3.5 rounded-xl border border-slate-300 bg-white text-slate-800 text-xs font-bold uppercase tracking-wider hover:border-slate-900 hover:bg-slate-50 transition-colors duration-200 shadow-sm"
            >
              Skills & Experience
            </Link>

            <Link
              href="/contact"
              className="px-6 py-3.5 rounded-xl bg-amber-600 text-white text-xs font-bold uppercase tracking-wider hover:bg-amber-700 transition-colors duration-200 flex items-center gap-1.5 shadow-sm"
            >
              Contact Us
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>
      </main>

    </div>
  );
}