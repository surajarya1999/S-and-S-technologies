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
    <header className="sticky top-0 z-50 border-b border-violet-100 bg-white/85 px-4 py-2 shadow-sm backdrop-blur-lg md:px-6 md:py-4">
      {/* Thin rainbow line at the very top */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-orange-400" />

      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Logo: put your PNG at public/logo.png */}
        <Link href="/" className="group flex items-center gap-3">
          <img
            src="/logor.png"
            alt="S&S Web Technologies logo"
            className="-my-2 h-15 w-auto max-w-none shrink-0 object-contain transition-transform duration-300 group-hover:scale-105 sm:-my-4 sm:h-15 md:-my-4 md:h-20"
          />
          <div className="flex flex-col">
            
          </div>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden items-center gap-1 text-sm font-bold text-slate-600 md:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-3.5 py-2 transition lg:px-4 ${active
                    ? "bg-gradient-to-r from-violet-100 to-fuchsia-100 font-extrabold text-violet-700"
                    : "hover:bg-violet-50 hover:text-violet-700"
                  }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">
          {/* ADMIN PORTAL BUTTON */}
          <Link
            href="/admin/dashboard"
            title="Admin Dashboard"
            aria-label="Admin Dashboard"
            className="flex items-center justify-center rounded-full border border-slate-200 bg-white p-2.5 text-slate-700 shadow-sm transition duration-300 hover:border-transparent hover:bg-gradient-to-br hover:from-amber-400 hover:to-orange-500 hover:text-white"
          >
            <ShieldCheck className="h-4 w-4" />
          </Link>

          <Link
            href="/contact"
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-fuchsia-300/50 transition duration-300 hover:-translate-y-0.5 hover:shadow-lg"
          >
            <span>Start Project</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          className="rounded-xl bg-violet-50 p-2 text-violet-700 transition hover:bg-violet-100 focus:outline-none focus-visible:ring-4 focus-visible:ring-violet-200 md:hidden"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="mx-auto mt-3 max-w-6xl space-y-4 rounded-2xl border border-violet-100 bg-white p-4 shadow-xl md:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`rounded-xl px-4 py-3 text-sm font-bold transition ${active
                      ? "bg-gradient-to-r from-violet-100 to-fuchsia-100 font-extrabold text-violet-700"
                      : "text-slate-700 hover:bg-violet-50 hover:text-violet-700"
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="flex flex-col gap-2 border-t border-slate-100 pt-4">
            {/* MOBILE ADMIN LINK */}
            <Link
              href="/admin/dashboard"
              onClick={() => setIsOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-slate-200 bg-white py-3 text-center text-sm font-bold text-slate-800"
            >
              <ShieldCheck className="h-4 w-4 text-orange-500" />
              <span>Admin Panel</span>
            </Link>

            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 py-3.5 text-center text-sm font-bold text-white shadow-md"
            >
              <span>Start Project</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}