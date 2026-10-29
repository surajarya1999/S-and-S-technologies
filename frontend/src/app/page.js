"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  Code2,
  Database,
  MessageSquare,
  Sparkles,
  Zap,
  Smartphone,
  Rocket,
  Check,
} from "lucide-react";

const RATES = { INR: 1, USD: 0.012 };
const SYMBOLS = { INR: "₹", USD: "$" };

const BASE = { frontend: 12000, fullstack: 28000 };

const ADDONS = [
  { key: "fastDelivery", label: "Express 48-Hour Delivery", short: "Express Delivery", price: 3000, emoji: "⚡", tone: "from-amber-400 to-orange-500" },
  { key: "adminPanel", label: "Custom Admin Dashboard", short: "Admin Dashboard", price: 6500, emoji: "⚙️", tone: "from-violet-500 to-fuchsia-500" },
  { key: "seoSetup", label: "Technical SEO & Performance", short: "Technical SEO", price: 2500, emoji: "🚀", tone: "from-cyan-400 to-blue-500" },
  { key: "maintenance", label: "1-Month Post-Launch Support", short: "1-Mo Support", price: 4000, emoji: "🛠️", tone: "from-emerald-400 to-teal-500" },
];

const FEATURES = [
  { icon: Zap, title: "Fast by default", text: "Next.js App Router, optimized images and clean code for quick loads.", tone: "from-amber-400 to-orange-500", glow: "shadow-orange-200" },
  { icon: Smartphone, title: "Fully responsive", text: "Looks perfect on every screen: phone, tablet, or desktop.", tone: "from-pink-500 to-rose-500", glow: "shadow-pink-200" },
  { icon: Rocket, title: "Built to convert", text: "Clear CTAs and SEO setup that turn visitors into customers.", tone: "from-violet-500 to-indigo-500", glow: "shadow-violet-200" },
];

export default function Home() {
  const [showText, setShowText] = useState(false);
  const [currency, setCurrency] = useState("INR");
  const [plan, setPlan] = useState("frontend");
  const [addons, setAddons] = useState({
    fastDelivery: false,
    adminPanel: false,
    seoSetup: false,
    maintenance: false,
  });

  // Show the welcome text 10 seconds after the video starts
  useEffect(() => {
    const timer = setTimeout(() => setShowText(true), 10000);
    return () => clearTimeout(timer);
  }, []);

  const rate = RATES[currency];
  const sym = SYMBOLS[currency];
  const money = (n) => `${sym}${Math.round(n * rate).toLocaleString()}`;

  const total = ADDONS.reduce(
    (sum, a) => (addons[a.key] ? sum + a.price : sum),
    BASE[plan]
  );
  const formattedTotal = money(total);

  const toggleAddon = (key) => setAddons((p) => ({ ...p, [key]: !p[key] }));

  const whatsappUrl = `https://wa.me/917509478047?text=${encodeURIComponent(
    `Hi S&S Web Technologies! I calculated an estimate for a ${plan} project. Estimated Budget: ${formattedTotal}`
  )}`;

  return (
    <div className="grid-pattern relative min-h-screen w-full overflow-x-hidden bg-[#F9F8F6] font-sans text-[#111111] antialiased selection:bg-fuchsia-500 selection:text-white">
      <main className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-6 sm:px-6 md:pb-10 lg:px-8">
        {/* HERO WITH VIDEO BACKGROUND */}
        <section className="w-full pb-8 sm:pb-12 md:pb-16">
          <div className="relative isolate left-1/2 mb-12 w-screen -translate-x-1/2 overflow-hidden bg-black sm:mb-16">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              disablePictureInPicture
              aria-hidden="true"
              className="absolute inset-0 -z-20 h-full w-full object-cover will-change-transform [-webkit-backface-visibility:hidden] [transform:translateZ(0)]"
            >
              <source src="/v3.mp4" type="video/mp4" />
            </video>
            <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-black/60 via-black/35 to-black/70" />
            <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.55)_100%)]" />

            <div className="mx-auto flex min-h-[540px] max-w-3xl flex-col items-center justify-center space-y-6 px-5 py-16 text-center sm:min-h-[600px] sm:px-8 md:min-h-[680px]">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-2 text-xs font-bold text-white backdrop-blur">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-300 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-amber-400" />
                </span>
                Available for Q4 Client Engagements
              </div>

              <h1 className="text-4xl font-black leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl">
                High-converting web platforms{" "}
                <span className="gradient-text block bg-gradient-to-r from-amber-300 via-blue-300 to-pink-400 bg-clip-text text-transparent">
                  engineered by S&S Web Technologies
                </span>
              </h1>

              <p className="max-w-xl text-base leading-relaxed text-white/90 md:text-lg">
                We build fast, responsive, and production-ready React.js and Next.js applications, Tailwind CSS interfaces, and interactive digital products designed to scale your revenue.
              </p>

              <div className="flex w-full flex-col items-stretch gap-3 pt-2 sm:w-auto sm:flex-row sm:items-center sm:gap-4">
                <a
                  href="#pricing"
                  className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-500 to-pink-500 px-7 py-4 text-sm font-bold text-white shadow-lg shadow-fuchsia-900/40 transition hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-fuchsia-300"
                >
                  <Calculator className="h-4 w-4" />
                  Calculate Project Cost
                </a>
                <Link
                  href="/work"
                  className="rounded-2xl border-2 border-white/70 bg-white/10 px-7 py-4 text-center text-sm font-bold text-white backdrop-blur transition hover:bg-white/25 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/50"
                >
                  View Case Studies
                </Link>
              </div>

              <div className="flex flex-wrap justify-center gap-2 pt-2">
                {["Next.js", "Tailwind CSS", "React", "SEO Ready"].map((t) => (
                  <span key={t} className="rounded-full border border-white/25 bg-white/15 px-3 py-1 text-xs font-bold text-white backdrop-blur">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Video banner */}
          <div className="w-full relative rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-900 shadow-2xl group max-w-8xl mx-auto">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-[260px] sm:h-[420px] md:h-[520px] object-cover [-webkit-backface-visibility:hidden] [transform:translateZ(0)]"
            >
              <source src="/video.mp4" type="video/mp4" />
              your device does not support the video tag.
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

        {/* FEATURES */}
        <section className="grid gap-4 py-6 sm:grid-cols-2 md:py-10 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, text, tone, glow }) => (
            <div key={title} className={`rounded-3xl border border-white bg-white p-6 shadow-lg ${glow} transition hover:-translate-y-1`}>
              <div className={`mb-4 inline-flex rounded-2xl bg-gradient-to-br ${tone} p-3 text-white shadow-md`}>
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mb-1 text-lg font-extrabold text-slate-950">{title}</h3>
              <p className="text-sm leading-6 text-slate-600">{text}</p>
            </div>
          ))}
        </section>

        {/* COST ESTIMATOR */}
        <section id="pricing" className="w-full scroll-mt-6 py-14 sm:py-16 md:py-20">
          <div className="mb-8 flex flex-col items-start justify-between gap-5 sm:mb-12 md:flex-row md:items-end">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-100 px-3 py-1 text-xs font-bold text-violet-700">
                <Sparkles className="h-3.5 w-3.5" /> Transparent Pricing
              </span>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl md:text-5xl">
                Project Budget Estimator
              </h2>
            </div>

            <div className="flex items-center gap-1 rounded-2xl border border-violet-100 bg-white p-1 shadow-sm">
              {["INR", "USD"].map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  aria-pressed={currency === c}
                  className={`rounded-xl px-5 py-2 text-xs font-bold transition focus:outline-none focus-visible:ring-4 focus-visible:ring-violet-200 ${currency === c
                    ? "bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white shadow"
                    : "text-slate-600 hover:text-violet-700"
                    }`}
                >
                  {SYMBOLS[c]} {c}
                </button>
              ))}
            </div>
          </div>

          <div className="grid w-full gap-6 sm:gap-8 lg:grid-cols-3">
            <div className="space-y-8 sm:space-y-10 lg:col-span-2">
              {/* Plan */}
              <div>
                <h3 className="mb-4 text-sm font-extrabold text-slate-700">1. Select Primary Scope</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    { id: "frontend", icon: Code2, title: "Frontend Web Application", text: "Pixel-perfect React/Next.js interface, 100% responsive, custom animations & optimized SEO.", tone: "from-cyan-400 to-blue-600", ring: "border-blue-500 ring-blue-200", plus: "" },
                    { id: "fullstack", icon: Database, title: "Full-Stack Platform", text: "Complete application with Next.js App Router, Database integration, User Auth, & Custom APIs.", tone: "from-fuchsia-500 to-orange-500", ring: "border-fuchsia-500 ring-fuchsia-200", plus: "+" },
                  ].map((p) => {
                    const active = plan === p.id;
                    const Icon = p.icon;
                    return (
                      <button
                        type="button"
                        key={p.id}
                        onClick={() => setPlan(p.id)}
                        aria-pressed={active}
                        className={`rounded-3xl border-2 bg-white p-5 text-left transition-all duration-200 focus:outline-none focus-visible:ring-4 sm:p-6 ${active ? `${p.ring} ring-4 shadow-xl` : "border-slate-200 shadow-sm hover:border-violet-300"
                          }`}
                      >
                        <div className="mb-4 flex items-start justify-between gap-3">
                          <div className={`rounded-2xl bg-gradient-to-br ${p.tone} p-3 text-white shadow-md`}>
                            <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                          </div>
                          <span className="text-xl font-black text-slate-950">
                            {money(BASE[p.id])}
                            {p.plus}
                          </span>
                        </div>
                        <h4 className="mb-2 text-base font-extrabold text-slate-950">{p.title}</h4>
                        <p className="text-sm leading-6 text-slate-500">{p.text}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Add-ons */}
              <div>
                <h3 className="mb-4 text-sm font-extrabold text-slate-700">2. Choose Optional Add-ons</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {ADDONS.map((a) => (
                    <label
                      key={a.key}
                      className={`flex cursor-pointer items-center justify-between gap-3 rounded-2xl border-2 p-4 text-sm transition focus-within:ring-4 focus-within:ring-violet-200 ${addons[a.key]
                        ? "border-violet-500 bg-violet-50 font-semibold shadow-md"
                        : "border-slate-200 bg-white hover:border-violet-300"
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${a.tone} text-base shadow`}>
                          {a.emoji}
                        </span>
                        <input
                          type="checkbox"
                          checked={addons[a.key]}
                          onChange={() => toggleAddon(a.key)}
                          className="h-4 w-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500"
                        />
                        <span className="text-xs sm:text-[13px]">{a.label}</span>
                      </div>
                      <span className="whitespace-nowrap text-xs font-extrabold text-violet-700">
                        +{money(a.price)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Quote card */}
            <div className="relative h-fit overflow-hidden rounded-3xl bg-gradient-to-br bg-gray-800 p-6 text-white shadow-2xl sm:p-8 lg:sticky lg:top-6">
              <div aria-hidden className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-pink-500/40 blur-3xl" />
              <div aria-hidden className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-cyan-400/30 blur-3xl" />

              <div className="relative">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-bold text-amber-300">
                  <Sparkles className="h-3.5 w-3.5" /> Real-Time Quote
                </span>
                <h4 className="mb-5 mt-3 text-2xl font-extrabold">Estimated Investment</h4>

                <div className="mb-5 space-y-3 border-b border-white/15 pb-5 text-xs text-violet-100">
                  <div className="flex justify-between gap-3">
                    <span>Base Scope ({plan === "frontend" ? "Frontend" : "Full-Stack"})</span>
                    <span className="whitespace-nowrap font-bold text-white">{money(BASE[plan])}</span>
                  </div>
                  {ADDONS.filter((a) => addons[a.key]).map((a) => (
                    <div key={a.key} className="flex justify-between gap-3 text-violet-200">
                      <span>{a.short}</span>
                      <span className="whitespace-nowrap">+{money(a.price)}</span>
                    </div>
                  ))}
                </div>

                <div className="mb-8 flex items-baseline justify-between gap-3">
                  <span className="text-xs font-semibold text-violet-200">Total Price</span>
                  <span className="bg-gradient-to-r from-amber-300 to-pink-300 bg-clip-text text-4xl font-black tracking-tight text-transparent">
                    {formattedTotal}
                  </span>
                </div>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-500 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-900/30 transition hover:bg-emerald-400 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300"
                >
                  <MessageSquare className="h-4 w-4" />
                  Get Proposal on WhatsApp
                </a>
              </div>
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
      </main >
    </div >
  );
}