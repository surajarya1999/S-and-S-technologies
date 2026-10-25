"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import API from "@/lib/axios"; // Axios instance import kiya gaya hai
import { Send, MessageSquare, Mail, Clock, CheckCircle, AlertCircle } from "lucide-react";

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
        <div className="bg-[#F9F8F6] text-[#111111] font-sans min-h-screen grid-pattern relative overflow-x-hidden">

            <main className="max-w-5xl mx-auto px-4 md:px-6 py-10 md:py-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center max-w-2xl mx-auto mb-8 md:mb-12"
                >
                    <span className="text-[10px] md:text-xs font-bold text-amber-600 uppercase tracking-widest">
                        Get In Touch
                    </span>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 mt-2 mb-3 sm:mb-4">
                        Let's build your next web platform
                    </h1>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed px-2">
                        Have a project in mind or need a custom web engineering proposal? Send us your requirements below.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 items-start">

                    {/* Direct Contact Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="lg:col-span-5 bg-slate-900 text-white p-6 sm:p-8 rounded-2xl md:rounded-3xl space-y-6 sm:space-y-8 shadow-xl"
                    >
                        <div>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">
                                Direct Contact
                            </span>
                            <h3 className="text-xl sm:text-2xl font-bold mt-1 mb-2 sm:mb-3">S&S Web Technologies</h3>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                Available for Q4 client engagements, Next.js migrations, and interactive digital product engineering.
                            </p>
                        </div>

                        <div className="space-y-4 text-xs">
                            <div className="flex items-center gap-3 text-slate-300">
                                <div className="p-2.5 rounded-xl bg-slate-800 text-amber-400 flex-shrink-0">
                                    <Mail className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="font-semibold text-slate-400 text-[9px] sm:text-[10px] uppercase">Email Us</p>
                                    <p className="font-bold text-white text-xs sm:text-sm">sswebtech.com</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 text-slate-300">
                                <div className="p-2.5 rounded-xl bg-slate-800 text-amber-400 flex-shrink-0">
                                    <Clock className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="font-semibold text-slate-400 text-[9px] sm:text-[10px] uppercase">Response Time</p>
                                    <p className="font-bold text-white text-xs sm:text-sm">Within 2 Hours (Mon - Sat)</p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-slate-800">
                            <p className="text-[10px] uppercase font-bold text-slate-400 mb-3">Prefer Quick Chat?</p>
                            <a
                                href="https://wa.me/+917509478047?text=Hi%20S%26S%20Digital%20Studio!%20I%20want%20to%20discuss%20a%20new%20project."
                                target="_blank"
                                rel="noreferrer"
                                className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-lg"
                            >
                                <MessageSquare className="w-4 h-4" /> Instant WhatsApp Discussion
                            </a>
                        </div>
                    </motion.div>

                    {/* Form Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="lg:col-span-7 bg-white border border-slate-200 p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-3xl shadow-sm"
                    >
                        {submitted ? (
                            <div className="py-8 sm:py-12 text-center space-y-4" id="contact-form">
                                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                                    <CheckCircle className="w-7 h-7 sm:w-8 sm:h-8" />
                                </div>
                                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">Inquiry Received!</h3>
                                <p className="text-slate-600 text-xs max-w-sm mx-auto leading-relaxed">
                                    Thank you for reaching out. S&S Web Technologies team will review your project requirements and respond within 2 hours.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5" id="contact-form">
                                {errorMessage && (
                                    <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                                        <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                                        <span>{errorMessage}</span>
                                    </div>
                                )}

                                <div>
                                    <label className="block text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                        Your Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        required
                                        placeholder="John Doe"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 sm:p-3.5 text-xs sm:text-sm focus:border-slate-900 focus:outline-none transition"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                        Work Email Address
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="john@company.com"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 sm:p-3.5 text-xs sm:text-sm focus:border-slate-900 focus:outline-none transition"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                        Project Scope & Details
                                    </label>
                                    <textarea
                                        rows={4}
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        placeholder="Describe project goals, key features needed, expected timeline, or budget bracket..."
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 sm:p-3.5 text-xs sm:text-sm focus:border-slate-900 focus:outline-none transition"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-3.5 sm:py-4 rounded-xl bg-slate-900 hover:bg-amber-600 text-white font-bold text-xs uppercase tracking-wider transition duration-300 flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
                                >
                                    <span>{loading ? "Sending Message..." : "Submit Project Inquiry"}</span>
                                    <Send className="w-4 h-4" />
                                </button>
                            </form>
                        )}
                    </motion.div>

                </div>
            </main>
        </div>
    );
}