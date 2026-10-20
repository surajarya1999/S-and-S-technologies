"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone, MessageSquare } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0B0F17] text-slate-300 pt-16 pb-12 border-t border-slate-800 relative z-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Top Professional CTA Banner */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-2xl relative z-10">
          <div>
            <span className="text-[10px] sm:text-xs font-bold text-amber-500 uppercase tracking-widest">
              Have a Project in Mind?
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
              Let’s build something extraordinary together.
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-lg">
              We engineer fast, modern, and scalable web solutions tailored for high-growth businesses.
            </p>
          </div>
          
          <Link
            href="/contact#contact-form"
            className="relative z-30 cursor-pointer px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition flex items-center gap-2 whitespace-nowrap shadow-lg pointer-events-auto active:scale-95"
          >
            <span>Start a Conversation</span>
            <ArrowUpRight className="w-4 h-4 shrink-0" />
          </Link>
        </div>

        {/* Footer Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-slate-800/80">

          {/* Brand Info (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 font-black text-sm">
                S&S
              </div>
              <h3 className="font-extrabold text-lg text-white tracking-tight">
                S&S Digital Studio
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Full-service digital studio specializing in Next.js development, modern UI/UX design, and high-performance Web APIs.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              {/* GitHub */}
              <a
                href="https://github.com/surajarya1999"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500 text-slate-400 hover:text-white transition cursor-pointer"
                aria-label="GitHub"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/suraj-arya460"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500 text-slate-400 hover:text-white transition cursor-pointer"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </a>

              {/* Twitter / X */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500 text-slate-400 hover:text-white transition cursor-pointer"
                aria-label="Twitter"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation Links (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs font-medium text-slate-400">
              <li>
                <Link href="/" className="hover:text-amber-400 transition cursor-pointer">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/work" className="hover:text-amber-400 transition cursor-pointer">
                  Case Studies & Work
                </Link>
              </li>
              <li>
                <Link href="/experience" className="hover:text-amber-400 transition cursor-pointer">
                  Skills & Experience
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-400 transition cursor-pointer">
                  Get in Touch
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Direct Contact
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <a
                href="mailto:contact@ssdigitalstudio.com"
                className="flex items-center gap-2.5 hover:text-amber-400 transition"
              >
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <span>contact@ssdigitalstudio.com</span>
              </a>

              <a
                href="tel:+917509478047"
                className="flex items-center gap-2.5 hover:text-amber-400 transition"
              >
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <span>+91 75094 78047</span>
              </a>

              <a
                href="https://wa.me/+917509478047"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 hover:text-emerald-400 transition"
              >
                <MessageSquare className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>WhatsApp Instant Support</span>
              </a>

              <div className="flex items-start gap-2.5 text-slate-400 pt-1">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>Gwalior Madhya Pradesh, India (Serving Global Clients)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Rights */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-[11px] text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} S&S Digital Studio. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}