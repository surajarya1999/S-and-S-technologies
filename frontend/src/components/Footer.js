"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone, MessageSquare } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Case Studies & Work", href: "/work" },
  { name: "Skills & Experience", href: "/experience" },
  { name: "Reviews", href: "/reviews" },
  { name: "Get in Touch", href: "/contact" },
];

const socialClass =
  "flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition duration-300 hover:-translate-y-0.5 hover:border-transparent hover:text-white";

export default function Footer() {
  return (
    <footer className="relative z-20 overflow-hidden border-t border-white/10 bg-[#0B0F17] pb-10 pt-16 font-sans text-slate-300">
      {/* Line grid + colour glow background */}
      <div
        aria-hidden
        className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:40px_40px]"
      />
      <div aria-hidden className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-violet-600/30 blur-3xl" />
      <div aria-hidden className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-pink-500/20 blur-3xl" />
      <div aria-hidden className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-orange-400" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">

        {/* Top CTA Banner */}
        <div className="relative z-10 mb-12 flex flex-col items-start justify-between gap-6 overflow-hidden rounded-3xl bg-gradient-to-br bg-gray-900 p-6 shadow-2xl sm:p-8 md:flex-row md:items-center">
          <div aria-hidden className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-white/20 blur-2xl" />
          <div aria-hidden className="absolute -bottom-10 right-20 h-40 w-40 rounded-full bg-cyan-300/30 blur-2xl" />

          <div className="relative">
            <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-white backdrop-blur">
              Have a Project in Mind?
            </span>
            <h3 className="mt-3 text-2xl font-black text-white sm:text-3xl">
              Let’s build something extraordinary together.
            </h3>
            <p className="mt-2 max-w-lg text-sm text-white/90">
              We engineer fast, modern, and scalable web solutions tailored for high-growth businesses.
            </p>
          </div>

          <Link
            href="/contact#contact-form"
            className="relative z-30 flex w-full cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-white px-6 py-4 text-sm font-bold text-violet-700 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-white/60 active:scale-95 md:w-auto"
          >
            <span>Start a Conversation</span>
            <ArrowUpRight className="h-4 w-4 shrink-0" />
          </Link>
        </div>

        {/* Footer Main Content Grid */}
        <div className="grid grid-cols-1 gap-10 border-b border-white/10 pb-12 md:grid-cols-12 lg:gap-12">

          {/* Brand Info (5 cols) */}
          <div className="space-y-4 md:col-span-5">
            <div className="flex items-center gap-3">
              {/* Logo: public/logo.png */}
              <img
                src="/logor.png"
                alt="S&S Web Technologies logo"
                className="h-16 w-auto shrink-0 object-contain sm:h-20"
              />
              <h3 className="text-lg font-extrabold tracking-tight text-white">
                S&S Web Technologies
                <span className="bg-gradient-to-r from-fuchsia-400 to-orange-400 bg-clip-text text-transparent">.</span>
              </h3>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-slate-400">
              Full-service digital studio specializing in Next.js development, modern UI/UX design, and high-performance Web APIs.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              {/* GitHub */}
              <a
                href="https://github.com/surajarya1999"
                target="_blank"
                rel="noreferrer"
                className={`${socialClass} hover:bg-gradient-to-br hover:from-slate-600 hover:to-slate-800`}
                aria-label="GitHub"
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/suraj-arya460"
                target="_blank"
                rel="noreferrer"
                className={`${socialClass} hover:bg-gradient-to-br hover:from-sky-500 hover:to-blue-700`}
                aria-label="LinkedIn"
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </a>

              {/* Twitter / X */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className={`${socialClass} hover:bg-gradient-to-br hover:from-fuchsia-500 hover:to-orange-500`}
                aria-label="Twitter"
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation Links (3 cols) */}
          <div className="space-y-4 md:col-span-3">
            <h4 className="text-sm font-extrabold text-white">Navigation</h4>
            <ul className="space-y-2.5 text-sm font-medium text-slate-400">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 transition hover:text-white"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-fuchsia-500 to-orange-400 opacity-60 transition group-hover:scale-150 group-hover:opacity-100" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details (4 cols) */}
          <div className="space-y-4 md:col-span-4">
            <h4 className="text-sm font-extrabold text-white">Direct Contact</h4>
            <div className="space-y-3 text-sm text-slate-400">
              <a
                href="mailto:contact@ssdigitalstudio.com"
                className="group flex items-center gap-3 transition hover:text-white"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-md">
                  <Mail className="h-4 w-4" />
                </span>
                <span className="break-all">contact@sswebtech.com</span>
              </a>

              <a
                href="tel:+917509478047"
                className="group flex items-center gap-3 transition hover:text-white"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-md">
                  <Phone className="h-4 w-4" />
                </span>
                <span>+91 75094 78047</span>
              </a>

              <a
                href="https://wa.me/917509478047"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-3 transition hover:text-emerald-300"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-md">
                  <MessageSquare className="h-4 w-4" />
                </span>
                <span>WhatsApp Instant Support</span>
              </a>

              <div className="flex items-start gap-3 pt-1">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 text-white shadow-md">
                  <MapPin className="h-4 w-4" />
                </span>
                <span className="pt-1">Gwalior Madhya Pradesh, India (Serving Global Clients)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Rights */}
        <div className="flex flex-col items-center justify-between gap-4 pt-8 text-xs text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} S&S Web Technologies. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="cursor-pointer transition hover:text-white">Privacy Policy</span>
            <span className="cursor-pointer transition hover:text-white">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}