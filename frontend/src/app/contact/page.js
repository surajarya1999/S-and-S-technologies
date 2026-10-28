"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import API from "@/lib/axios"; // Axios instance
import { Send, MessageSquare, Mail, Clock, CheckCircle, AlertCircle, Sparkles } from "lucide-react";

const inputClass =
    "w-full rounded-xl border-2 border-slate-200 bg-slate-50 p-3 text-sm text-slate-900 transition placeholder:text-slate-400 focus:border-fuchsia-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-fuchsia-100 sm:p-3.5";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        message: ""
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage("");

        try {
            // Axios post request
            const res = await API.post("/api/contacts", formData);

            if (res.data.success) {
                setSubmitted(true);
                setFormData({ fullName: "", email: "", message: "" });
            } else {
                setErrorMessage(res.data.message || "Failed to submit. Please try again.");
            }
        } catch (error) {
            setErrorMessage(error.response?.data?.message || "Cannot connect to backend server. Make sure Express server is running.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="grid-pattern relative min-h-screen overflow-x-hidden bg-[#F9F8F6] font-sans text-[#111111] antialiased selection:bg-fuchsia-500 selection:text-white">

            <main className="mx-auto max-w-5xl px-4 py-10 md:px-6 md:py-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mx-auto mb-8 max-w-2xl space-y-4 text-center md:mb-12"
                >
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-fuchsia-200 bg-white px-3.5 py-1.5 text-xs font-bold text-fuchsia-700 shadow-sm">
                        <Sparkles className="h-3.5 w-3.5" />
                        Get In Touch
                    </span>
                    <h1 className="text-4xl font-black leading-[1.08] tracking-tight text-slate-950 sm:text-5xl md:text-6xl">
                        Let’s build your{" "}
                        <span className="block bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-500 bg-clip-text text-transparent">
                            next web platform
                        </span>
                    </h1>
                    <p className="mx-auto max-w-xl px-2 text-sm leading-relaxed text-slate-600 sm:text-base">
                        Have a project in mind or need a custom web engineering proposal? Send us your requirements below.
                    </p>
                </motion.div>

                <div className="grid items-start gap-6 sm:gap-8 lg:grid-cols-12">

                    {/* Direct Contact Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="relative space-y-6 overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-violet-900 to-fuchsia-800 p-6 text-white shadow-2xl sm:space-y-8 sm:p-8 lg:col-span-5"
                    >
                        <div aria-hidden className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-pink-500/40 blur-3xl" />
                        <div aria-hidden className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-cyan-400/30 blur-3xl" />

                        <div className="relative">
                            <span className="inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-bold text-amber-300">
                                Direct Contact
                            </span>
                            <h3 className="mb-2 mt-3 text-2xl font-extrabold sm:mb-3">S&S Web Technologies</h3>
                            <p className="text-sm leading-relaxed text-violet-100/90">
                                Available for Q4 client engagements, Next.js migrations, and interactive digital product engineering.
                            </p>
                        </div>

                        <div className="relative space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="flex-shrink-0 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 p-2.5 text-white shadow-md">
                                    <Mail className="h-4 w-4" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-xs font-semibold text-violet-200">Email Us</p>
                                    <p className="break-words text-sm font-bold text-white">sswebtech.com</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="flex-shrink-0 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 p-2.5 text-white shadow-md">
                                    <Clock className="h-4 w-4" />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-violet-200">Response Time</p>
                                    <p className="text-sm font-bold text-white">Within 2 Hours (Mon - Sat)</p>
                                </div>
                            </div>
                        </div>

                        <div className="relative border-t border-white/15 pt-5">
                            <p className="mb-3 text-xs font-bold text-violet-200">Prefer Quick Chat?</p>
                            <a
                                href="https://wa.me/917509478047?text=Hi%20S%26S%20Digital%20Studio!%20I%20want%20to%20discuss%20a%20new%20project."
                                target="_blank"
                                rel="noreferrer"
                                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-500 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-900/30 transition hover:bg-emerald-400 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300"
                            >
                                <MessageSquare className="h-4 w-4" /> Instant WhatsApp Discussion
                            </a>
                        </div>
                    </motion.div>

                    {/* Form Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="relative overflow-hidden rounded-3xl border-2 border-violet-100 bg-white p-6 shadow-xl sm:p-8 md:p-10 lg:col-span-7"
                    >
                        <div aria-hidden className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-orange-400" />

                        {submitted ? (
                            <div className="space-y-4 py-8 text-center sm:py-12" id="contact-form">
                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-lg shadow-emerald-200">
                                    <CheckCircle className="h-8 w-8" />
                                </div>
                                <h3 className="text-2xl font-extrabold text-slate-950">Inquiry Received!</h3>
                                <p className="mx-auto max-w-sm text-sm leading-relaxed text-slate-600">
                                    Thank you for reaching out. S&S Web Technologies team will review your project requirements and respond within 2 hours.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5" id="contact-form">
                                {errorMessage && (
                                    <div className="flex items-center gap-2 rounded-2xl border border-rose-200 bg-rose-50 p-3.5 text-sm text-rose-700">
                                        <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
                                        <span>{errorMessage}</span>
                                    </div>
                                )}

                                <div>
                                    <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                                        Your Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        required
                                        placeholder="John Doe"
                                        className={inputClass}
                                    />
                                </div>

                                <div>
                                    <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                                        Work Email Address
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="john@company.com"
                                        className={inputClass}
                                    />
                                </div>

                                <div>
                                    <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                                        Project Scope & Details
                                    </label>
                                    <textarea
                                        rows={4}
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        placeholder="Describe project goals, key features needed, expected timeline, or budget bracket..."
                                        className={inputClass}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 py-4 text-sm font-bold text-white shadow-lg shadow-fuchsia-300/50 transition hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-fuchsia-300 disabled:opacity-50 disabled:hover:translate-y-0"
                                >
                                    <span>{loading ? "Sending Message..." : "Submit Project Inquiry"}</span>
                                    <Send className="h-4 w-4" />
                                </button>
                            </form>
                        )}
                    </motion.div>

                </div>
            </main>
        </div>
    );
}