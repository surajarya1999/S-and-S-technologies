"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X, ShieldCheck } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Featured Work", href: "/work" },
    { name: "Experience & Skills", href: "/experience" },
    { name: "Reviews", href: "/reviews" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#F9F8F6]/95 backdrop-blur-md border-b border-[#E8E5DF] px-4 md:px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-slate-900 text-white font-black text-xs md:text-sm tracking-wider flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300">
            S&S
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-base md:text-lg tracking-tight leading-none">
              S&S Web Technologies<span className="text-amber-600">.</span>
            </span>
            <span className="text-[9px] md:text-[10px] font-semibold tracking-widest uppercase text-slate-400 mt-1">
              Web Engineering
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs font-bold uppercase tracking-wider text-slate-600">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition ${pathname === link.href
                ? "text-slate-900 font-extrabold border-b-2 border-amber-600 pb-0.5"
                : "hover:text-slate-900"
                }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          {/* ADMIN PORTAL BUTTON */}
          <Link
            href="/admin/dashboard"
            title="Admin Dashboard"
            className="p-2.5 rounded-full bg-slate-200/80 hover:bg-amber-500 text-slate-800 hover:text-slate-950 transition duration-300 flex items-center justify-center border border-slate-300/80 shadow-sm"
          >
            <ShieldCheck className="w-4 h-4" />
          </Link>

          <Link
            href="/contact"
            className="px-5 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold hover:bg-amber-600 transition duration-300 shadow-sm flex items-center gap-2"
          >
            <span>Start Project</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-slate-800 focus:outline-none"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-[#F9F8F6] border-b border-[#E8E5DF] px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`text-sm font-bold tracking-wider uppercase py-1 ${pathname === link.href
                  ? "text-amber-600 font-black"
                  : "text-slate-700 hover:text-slate-900"
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="pt-2 flex flex-col gap-2">
            {/* MOBILE ADMIN LINK */}
            <Link
              href="/admin/dashboard"
              onClick={() => setIsOpen(false)}
              className="w-full py-2.5 rounded-xl border border-slate-300 bg-white/80 text-slate-800 text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              <span>Admin Panel</span>
            </Link>

            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="w-full py-3 rounded-xl bg-slate-900 text-white text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2"
            >
              <span>Start Project</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}