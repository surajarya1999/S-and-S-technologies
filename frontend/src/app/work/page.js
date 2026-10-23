"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Zap, ExternalLink, Code2, ShieldCheck, Cpu, Loader2 } from "lucide-react";
import API from "@/lib/axios";

export default function WorkPage() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await API.get("/api/projects");
                // Support both response formats (response.data.data or response.data)
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
        <div className="bg-[#F9F8F6] text-[#111111] font-sans min-h-screen grid-pattern relative overflow-x-hidden">
            <main className="max-w-6xl mx-auto px-4 md:px-6 py-10 md:py-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="border-b border-[#E8E5DF] pb-8 md:pb-12 mb-8 md:mb-12"
                >
                    <span className="text-[10px] md:text-xs font-bold text-amber-600 uppercase tracking-widest">
                        Portfolio Case Studies
                    </span>
                    <h1 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight text-slate-900 mt-2 mb-4 leading-tight">
                        High-converting digital products <br className="hidden sm:inline" />
                        <span className="text-slate-400 font-normal">engineered for performance.</span>
                    </h1>
                    <p className="text-slate-600 text-xs sm:text-sm md:text-base max-w-2xl leading-relaxed">
                        Detailed breakdown of production-ready web applications built with Next.js, Tailwind CSS, and 3D interactive graphics.
                    </p>
                </motion.div>

                {loading ? (
                    <div className="py-20 flex flex-col items-center justify-center gap-3 text-slate-500 text-xs font-semibold">
                        <Loader2 className="w-6 h-6 animate-spin text-amber-600" />
                        <span>Loading projects from database...</span>
                    </div>
                ) : projects.length === 0 ? (
                    <div className="p-12 bg-white border border-slate-200 rounded-3xl text-center text-slate-500 text-xs">
                        No projects uploaded yet via the Admin Control Center.
                    </div>
                ) : (
                    <div className="space-y-8 md:space-y-12">
                        {projects.map((project, index) => (
                            <motion.div
                                key={project._id || index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.15 }}
                                className="bg-white border border-slate-200 rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm hover:border-slate-900 transition-all duration-300 group"
                            >
                                <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-start">

                                    {/* Details Column */}
                                    <div className="lg:col-span-7 space-y-4 sm:space-y-6">
                                        <div className="flex items-center gap-3">
                                            <span className="text-[10px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full bg-amber-100 text-amber-900">
                                                {project.category}
                                            </span>
                                            {project.featured === "true" && (
                                                <span className="text-[10px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full bg-slate-900 text-white">
                                                    Featured
                                                </span>
                                            )}
                                        </div>

                                        <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors">
                                            {project.title}
                                        </h2>

                                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                            {project.description}
                                        </p>

                                        {/* Dual Images inside the card structure */}
                                        <div className="grid grid-cols-2 gap-3 pt-2">
                                            {project.image1 && (
                                                <div className="relative h-32 sm:h-40 rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                                                    <img
                                                        src={project.image1}
                                                        alt={`${project.title} Banner`}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                                    />
                                                    <span className="absolute bottom-2 left-2 bg-slate-900/70 text-amber-400 text-[9px] font-bold px-2 py-0.5 rounded backdrop-blur">
                                                        Main Banner
                                                    </span>
                                                </div>
                                            )}
                                            {project.image2 && (
                                                <div className="relative h-32 sm:h-40 rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                                                    <img
                                                        src={project.image2}
                                                        alt={`${project.title} Detail`}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                                    />
                                                    <span className="absolute bottom-2 left-2 bg-slate-900/70 text-amber-400 text-[9px] font-bold px-2 py-0.5 rounded backdrop-blur">
                                                        Detail View
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Metrics & Actions Column */}
                                    <div className="lg:col-span-5 bg-slate-50 border border-slate-100 rounded-xl md:rounded-2xl p-5 sm:p-6 flex flex-col justify-between space-y-6">
                                        <div>
                                            <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3 sm:mb-4">
                                                Engineering Standards
                                            </h4>
                                            <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                                                <div className="bg-white p-3 sm:p-3.5 rounded-xl border border-slate-200/80 space-y-1">
                                                    <Zap className="w-4 h-4 text-amber-600" />
                                                    <p className="text-xs sm:text-sm font-black text-slate-900">99/100</p>
                                                    <p className="text-[9px] sm:text-[10px] font-semibold text-slate-400 uppercase">Lighthouse</p>
                                                </div>
                                                <div className="bg-white p-3 sm:p-3.5 rounded-xl border border-slate-200/80 space-y-1">
                                                    <Cpu className="w-4 h-4 text-amber-600" />
                                                    <p className="text-xs sm:text-sm font-black text-slate-900">MongoDB</p>
                                                    <p className="text-[9px] sm:text-[10px] font-semibold text-slate-400 uppercase">Database</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3 pt-4 border-t border-slate-200">
                                            {project.liveLink && (
                                                <a
                                                    href={project.liveLink}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-slate-900 hover:bg-amber-600 text-white font-bold text-xs uppercase tracking-wider text-center transition flex items-center justify-center gap-2 shadow-sm"
                                                >
                                                    <span>Live Preview</span>
                                                    <ExternalLink className="w-3.5 h-3.5" />
                                                </a>
                                            )}
                                            {project.githubLink && (
                                                <a
                                                    href={project.githubLink}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="w-full sm:w-auto py-3 px-4 rounded-xl border border-slate-300 hover:border-slate-900 font-bold text-xs uppercase tracking-wider text-slate-800 transition flex items-center justify-center gap-2 text-center"
                                                >
                                                    <Code2 className="w-3.5 h-3.5" />
                                                    <span>Code</span>
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}