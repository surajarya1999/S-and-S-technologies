"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Layout, Database, Cpu, Award } from "lucide-react";

const skillCategories = [
  {
    title: "Frontend Engineering",
    icon: Layout,
    skills: ["React.js & Next.js (App Router)", "TypeScript", "Tailwind CSS", "Three.js / WebGL 3D", "Framer Motion", "Responsive Web Design"],
  },
  {
    title: "Backend & Systems",
    icon: Database,
    skills: ["Node.js & Express", "PostgreSQL / Prisma ORM & MongoDB", "RESTful & GraphQL APIs", "User Auth & JWT", "Stripe API Integration", "Serverless Deployment"],
  },
  {
    title: "Performance & Quality",
    icon: Cpu,
    skills: ["Lighthouse 99+ Speed Standard", "Core Web Vitals Optimization", "Technical SEO Architecture", "Cross-Browser Testing", "Git Version Workflows", "CI/CD Deployment Pipeline"],
  },
];

const workflowSteps = [
  { step: "01", title: "Discovery & Scope", desc: "Analyzing project requirements, defining features list, selecting technical stack, and planning transparent milestones." },
  { step: "02", title: "Architecture & UI", desc: "Wireframing user flows, responsive UI layouts, interactive 3D components, and API schema design." },
  { step: "03", title: "Engineering & Speed", desc: "Writing modular, scalable React/Next.js code with server components, optimized assets, and responsive Tailwind styling." },
  { step: "04", title: "Testing & Launch", desc: "Running Lighthouse performance checks, cross-device QA testing, SEO indexing setup, and production deployment." },
];

export default function ExperiencePage() {
  return (
    <div className="bg-[#F9F8F6] text-[#111111] font-sans min-h-screen grid-pattern relative overflow-x-hidden">
      

      <main className="max-w-6xl mx-auto px-4 md:px-6 py-10 md:py-16 space-y-12 md:space-y-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="border-b border-[#E8E5DF] pb-8 md:pb-12"
        >
          <span className="text-[10px] md:text-xs font-bold text-amber-600 uppercase tracking-widest">
            Engineering Capabilities
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight text-slate-900 mt-2 mb-4 leading-tight">
            Full-stack skills & <br className="hidden sm:inline" />
            <span className="text-slate-400 font-normal">battle-tested engineering standards.</span>
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm md:text-base max-w-2xl leading-relaxed">
            We focus on clean architecture, lightning-fast rendering speeds, and intuitive UI interactions for high-conversion web platforms.
          </p>
        </motion.div>

        <section>
          <div className="flex items-center gap-2 mb-6 sm:mb-8">
            <Award className="w-5 h-5 text-amber-600" />
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">Technical Expertise</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {skillCategories.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm hover:border-slate-900 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base sm:text-lg text-slate-900 mb-3 sm:mb-4">{cat.title}</h3>
                  <ul className="space-y-2.5">
                    {cat.skills.map((skill, sIdx) => (
                      <li key={sIdx} className="text-xs text-slate-600 flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </section>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-slate-900 text-white rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-12 shadow-xl"
        >
          <div className="max-w-2xl mb-8 md:mb-10">
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">
              Our Process
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold mt-1">How we engineer projects from scratch</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {workflowSteps.map((ws, i) => (
              <div key={i} className="bg-slate-800/60 border border-slate-700/80 rounded-xl md:rounded-2xl p-5 sm:p-6 space-y-2.5 sm:space-y-3 relative group hover:border-amber-500/50 transition">
                <span className="text-2xl sm:text-3xl font-black text-amber-400">{ws.step}</span>
                <h4 className="font-bold text-sm sm:text-base text-white">{ws.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{ws.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>
      </main>
    </div>
  );
}