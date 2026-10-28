"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Zap, ExternalLink, Code2, Cpu, Loader2, Sparkles } from "lucide-react";
import API from "@/lib/axios";

// Each project card cycles through one of these colour palettes
const PALETTES = [
    {
        tone: "from-amber-400 to-orange-500",
        pill: "bg-orange-100 text-orange-800",
        border: "hover:border-orange-400",
        glow: "hover:shadow-orange-200",
        title: "group-hover:text-orange-600",
        icon: "text-orange-500",
        tile: "bg-orange-50 border-orange-100",
        shadow: "shadow-orange-200",
    },
    {
        tone: "from-violet-500 to-fuchsia-500",
        pill: "bg-violet-100 text-violet-800",
        border: "hover:border-violet-400",
        glow: "hover:shadow-violet-200",
        title: "group-hover:text-violet-600",
        icon: "text-violet-600",
        tile: "bg-violet-50 border-violet-100",
        shadow: "shadow-violet-200",
    },
    {
        tone: "from-cyan-400 to-blue-600",
        pill: "bg-cyan-100 text-cyan-800",
        border: "hover:border-cyan-400",
        glow: "hover:shadow-cyan-200",
        title: "group-hover:text-cyan-600",
        icon: "text-cyan-600",
        tile: "bg-cyan-50 border-cyan-100",
        shadow: "shadow-cyan-200",
    },
];

export default function WorkPage() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await API.get("/api/projects");
                const resData = response.data;
                if (resData.success || Array.isArray(resData)) {
                    setProjects(resData.data || resData);
                }
            } catch (err) {
                console.error("Failed to fetch projects:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    return (
        <div className="grid-pattern relative min-h-screen overflow-x-hidden bg-[#F9F8F6] font-sans text-[#111111] antialiased selection:bg-fuchsia-500 selection:text-white">
            <main className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-16">

                {/* HEADER SECTION WITH DESIGN BANNER IMAGE */}
                <div className="mb-8 grid items-center gap-10 border-b border-[#E8E5DF] pb-8 md:mb-12 md:pb-12 lg:grid-cols-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-5 text-center lg:col-span-7 lg:text-left"
                    >
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-fuchsia-200 bg-white px-3.5 py-1.5 text-xs font-bold text-fuchsia-700 shadow-sm">
                            <Sparkles className="h-3.5 w-3.5" />
                            Portfolio Case Studies
                        </span>
                        <h1 className="text-4xl font-black leading-[1.08] tracking-tight text-slate-950 sm:text-5xl md:text-6xl">
                            High-converting digital products{" "}
                            <span className="block bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-500 bg-clip-text text-transparent">
                                engineered for performance.
                            </span>
                        </h1>
                        <p className="mx-auto max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base md:text-lg lg:mx-0">
                            Detailed breakdown of production-ready web applications built with React.js, Next.js, Tailwind CSS, and modern full-stack architecture.
                        </p>
                    </motion.div>

                    {/* TOP FEATURED DESIGN BANNER (does not affect the dynamic projects) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none"
                    >
                        <div className="absolute -inset-2 -z-10 rounded-[2rem] bg-gradient-to-br from-violet-500 via-fuchsia-500 to-orange-400 opacity-70 blur-xl" />
                        <div className="group overflow-hidden rounded-3xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-orange-400 p-[3px] shadow-2xl">
                            <div className="overflow-hidden rounded-[1.4rem] bg-white p-2">
                                <img
                                    src="/banner3.png"
                                    alt="S&S Studio Workflow Showcase"
                                    className="h-48 w-full rounded-2xl object-cover transition-transform duration-500 group-hover:scale-105 sm:h-56"
                                />
                                <div className="mt-2 flex items-center justify-between gap-2 rounded-xl bg-gradient-to-r from-violet-50 to-fuchsia-50 p-3 text-xs font-bold text-slate-700">
                                    <span>3D Interactive & UI Studio</span>
                                    <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
                                        Engineering Excellence
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* DYNAMIC PROJECTS FROM DATABASE */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center gap-3 py-20 text-sm font-semibold text-slate-500">
                        <Loader2 className="h-8 w-8 animate-spin text-fuchsia-500" />
                        <span>Loading projects from database...</span>
                    </div>
                ) : projects.length === 0 ? (
                    <div className="rounded-3xl border-2 border-dashed border-violet-200 bg-white p-12 text-center text-sm text-slate-500">
                        No projects uploaded yet via the Admin Control Center.
                    </div>
                ) : (
                    <div className="space-y-8 md:space-y-12">
                        {projects.map((project, index) => {
                            const c = PALETTES[index % PALETTES.length];
                            return (
                                <motion.div
                                    key={project._id || index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.15 }}
                                    className={`group relative overflow-hidden rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl sm:p-8 md:p-10 ${c.border} ${c.glow}`}
                                >
                                    <div aria-hidden className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${c.tone}`} />

                                    <div className="grid items-start gap-6 lg:grid-cols-12 lg:gap-8">

                                        {/* Details Column */}
                                        <div className="space-y-4 sm:space-y-6 lg:col-span-7">
                                            <div className="flex flex-wrap items-center gap-2.5">
                                                <span className={`rounded-full px-3.5 py-1 text-xs font-bold ${c.pill}`}>
                                                    {project.category}
                                                </span>
                                                {project.featured === "true" && (
                                                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-950 px-3.5 py-1 text-xs font-bold text-white">
                                                        <Sparkles className="h-3 w-3 text-amber-300" />
                                                        Featured
                                                    </span>
                                                )}
                                            </div>

                                            <h2 className={`text-2xl font-extrabold text-slate-950 transition-colors sm:text-3xl ${c.title}`}>
                                                {project.title}
                                            </h2>

                                            <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
                                                {project.description}
                                            </p>

                                            {/* Dual Images inside the card structure */}
                                            <div className="grid grid-cols-2 gap-3 pt-2">
                                                {project.image1 && (
                                                    <div className="relative h-32 overflow-hidden rounded-2xl bg-slate-100 shadow-sm sm:h-40">
                                                        <img
                                                            src={project.image1}
                                                            alt={`${project.title} Banner`}
                                                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                                        />
                                                        <span className={`absolute bottom-2 left-2 rounded-lg bg-gradient-to-r px-2.5 py-1 text-[10px] font-bold text-white shadow ${c.tone}`}>
                                                            Main Banner
                                                        </span>
                                                    </div>
                                                )}
                                                {project.image2 && (
                                                    <div className="relative h-32 overflow-hidden rounded-2xl bg-slate-100 shadow-sm sm:h-40">
                                                        <img
                                                            src={project.image2}
                                                            alt={`${project.title} Detail`}
                                                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                                        />
                                                        <span className={`absolute bottom-2 left-2 rounded-lg bg-gradient-to-r px-2.5 py-1 text-[10px] font-bold text-white shadow ${c.tone}`}>
                                                            Detail View
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Metrics & Actions Column */}
                                        <div className="flex flex-col justify-between space-y-6 rounded-2xl bg-gradient-to-br from-slate-50 to-white p-5 ring-1 ring-slate-100 sm:p-6 lg:col-span-5">
                                            <div>
                                                <h4 className="mb-3 text-sm font-extrabold text-slate-700 sm:mb-4">
                                                    Engineering Standards
                                                </h4>
                                                <div className="grid grid-cols-2 gap-3">
                                                    <div className={`space-y-1 rounded-2xl border p-3.5 ${c.tile}`}>
                                                        <Zap className={`h-5 w-5 ${c.icon}`} />
                                                        <p className="text-base font-black text-slate-950">99/100</p>
                                                        <p className="text-xs font-semibold text-slate-500">Lighthouse</p>
                                                    </div>
                                                    <div className={`space-y-1 rounded-2xl border p-3.5 ${c.tile}`}>
                                                        <Cpu className={`h-5 w-5 ${c.icon}`} />
                                                        <p className="text-base font-black text-slate-950">MongoDB</p>
                                                        <p className="text-xs font-semibold text-slate-500">Database</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex flex-col items-stretch gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:items-center">
                                                {project.liveLink && (
                                                    <a
                                                        href={project.liveLink}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className={`flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r px-4 py-3.5 text-center text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-4 focus-visible:ring-fuchsia-200 sm:flex-1 ${c.tone} ${c.shadow}`}
                                                    >
                                                        <span>Live Preview</span>
                                                        <ExternalLink className="h-4 w-4" />
                                                    </a>
                                                )}
                                                {project.githubLink && (
                                                    <a
                                                        href={project.githubLink}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-slate-300 bg-white px-4 py-3.5 text-center text-sm font-bold text-slate-800 transition hover:border-slate-900 hover:bg-slate-50 focus:outline-none focus-visible:ring-4 focus-visible:ring-slate-200 sm:w-auto"
                                                    >
                                                        <Code2 className="h-4 w-4" />
                                                        <span>Code</span>
                                                    </a>
                                                )}
                                            </div>
                                        </div>

                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </main>
        </div>
    );
}