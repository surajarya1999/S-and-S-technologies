"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import API from "@/lib/axios"; // Axios instance
import { Star, MessageSquare, CheckCircle, Loader2, Quote, Send, Sparkles } from "lucide-react";

// Review cards cycle through these colour palettes
const PALETTES = [
    { tone: "from-amber-400 to-orange-500", border: "hover:border-orange-400", glow: "hover:shadow-orange-200", star: "text-orange-500", quote: "text-orange-100 group-hover:text-orange-200", avatar: "from-amber-400 to-orange-500" },
    { tone: "from-violet-500 to-fuchsia-500", border: "hover:border-violet-400", glow: "hover:shadow-violet-200", star: "text-violet-500", quote: "text-violet-100 group-hover:text-violet-200", avatar: "from-violet-500 to-fuchsia-500" },
    { tone: "from-cyan-400 to-blue-600", border: "hover:border-cyan-400", glow: "hover:shadow-cyan-200", star: "text-cyan-500", quote: "text-cyan-100 group-hover:text-cyan-200", avatar: "from-cyan-400 to-blue-600" },
];

const inputClass =
    "w-full rounded-xl border-2 border-slate-200 bg-slate-50 p-3 text-sm text-slate-900 transition placeholder:text-slate-400 focus:border-fuchsia-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-fuchsia-100";

export default function ReviewsPage() {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        clientName: "",
        companyOrRole: "",
        rating: 5,
        comment: "",
    });
    const [submitting, setSubmitting] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");

    // Fetch approved reviews via Axios
    useEffect(() => {
        API.get("/api/feedbacks")
            .then((res) => {
                if (res.data.success) {
                    setFeedbacks(res.data.data);
                }
            })
            .catch((err) => console.error("Error fetching feedbacks:", err))
            .finally(() => setLoading(false));
    }, []);

    // Submit new feedback via Axios
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setSuccessMsg("");

        try {
            const res = await API.post("/api/feedbacks", formData);

            if (res.data.success) {
                setSuccessMsg("Thank you! Your feedback has been submitted for admin moderation.");
                setFormData({ clientName: "", companyOrRole: "", rating: 5, comment: "" });
            } else {
                alert(res.data.message || "Failed to submit feedback");
            }
        } catch (err) {
            alert(err.response?.data?.message || "Server connection error while submitting review.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="grid-pattern relative min-h-screen overflow-x-hidden bg-[#F9F8F6] font-sans text-[#111111] antialiased selection:bg-fuchsia-500 selection:text-white">
            <main className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">

                {/* Header with banner image */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12 grid items-center gap-10 border-b border-[#E8E5DF] pb-8 md:pb-12 lg:grid-cols-12"
                >
                    <div className="space-y-5 text-center lg:col-span-7 lg:text-left">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-fuchsia-200 bg-white px-3.5 py-1.5 text-xs font-bold text-fuchsia-700 shadow-sm">
                            <Sparkles className="h-3.5 w-3.5" />
                            Client Testimonials
                        </span>
                        <h1 className="text-4xl font-black leading-[1.08] tracking-tight text-slate-950 sm:text-5xl md:text-6xl">
                            Proof of{" "}
                            <span className="block bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-500 bg-clip-text text-transparent">
                                engineering excellence.
                            </span>
                        </h1>
                        <p className="mx-auto max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base md:text-lg lg:mx-0">
                            Read real feedback from clients and collaborators on our delivered full-stack web applications.
                        </p>
                    </div>

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
                                    src="/banner1.png"
                                    alt="S&S Client Trust Showcase"
                                    className="h-44 w-full rounded-2xl object-cover transition-transform duration-500 group-hover:scale-105 sm:h-52"
                                />
                                <div className="mt-2 flex items-center justify-between gap-2 rounded-xl bg-gradient-to-r from-violet-50 to-fuchsia-50 p-3 text-xs font-bold text-slate-700">
                                    <span>100% Verified Reviews</span>
                                    <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
                                        Client Satisfaction
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Approved Reviews Showcase */}
                <div className="mb-16">
                    <div className="mb-6 flex items-center gap-3">
                        <span className="rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 p-2 text-white shadow-md">
                            <MessageSquare className="h-5 w-5" />
                        </span>
                        <h2 className="text-2xl font-extrabold text-slate-950 sm:text-3xl">Approved Client Reviews</h2>
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center gap-3 py-12 text-sm font-semibold text-slate-500">
                            <Loader2 className="h-6 w-6 animate-spin text-fuchsia-500" />
                            <span>Loading client reviews...</span>
                        </div>
                    ) : feedbacks.length === 0 ? (
                        <div className="rounded-3xl border-2 border-dashed border-violet-200 bg-white p-12 text-center text-sm text-slate-500">
                            No approved reviews published yet. Be the first to share your experience below!
                        </div>
                    ) : (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {feedbacks.map((item, index) => {
                                const c = PALETTES[index % PALETTES.length];
                                return (
                                    <motion.div
                                        key={item._id}
                                        initial={{ opacity: 0, y: 25 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${c.border} ${c.glow}`}
                                    >
                                        <div aria-hidden className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${c.tone}`} />
                                        <Quote className={`absolute right-5 top-6 h-10 w-10 transition ${c.quote}`} />

                                        <div className="relative z-10 space-y-3">
                                            <div className={`flex gap-1 ${c.star}`}>
                                                {[...Array(item.rating)].map((_, i) => (
                                                    <Star key={i} className="h-4 w-4 fill-current" />
                                                ))}
                                            </div>
                                            <p className="text-sm italic leading-relaxed text-slate-700">
                                                “{item.comment}”
                                            </p>
                                        </div>

                                        <div className="relative z-10 mt-6 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
                                            <div className="flex min-w-0 items-center gap-3">
                                                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-sm font-black text-white shadow ${c.avatar}`}>
                                                    {item.clientName?.charAt(0)?.toUpperCase()}
                                                </span>
                                                <div className="min-w-0">
                                                    <h3 className="truncate text-sm font-extrabold text-slate-950">{item.clientName}</h3>
                                                    <p className="truncate text-xs font-medium text-slate-500">{item.companyOrRole}</p>
                                                </div>
                                            </div>
                                            <div className="flex shrink-0 items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-600">
                                                <CheckCircle className="h-3.5 w-3.5" />
                                                <span>Verified</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Interactive Feedback Form */}
                <div className="relative mx-auto max-w-xl overflow-hidden rounded-3xl border-2 border-violet-100 bg-white p-6 shadow-xl sm:p-8 md:p-10">
                    <div aria-hidden className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-orange-400" />

                    <div className="mb-6 border-b border-slate-100 pb-4">
                        <h3 className="flex items-center gap-2.5 text-xl font-extrabold text-slate-950">
                            <span className="rounded-xl bg-gradient-to-br from-fuchsia-500 to-orange-500 p-2 text-white shadow-md">
                                <MessageSquare className="h-4 w-4" />
                            </span>
                            Share Your Experience
                        </h3>
                        <p className="mt-2 text-sm text-slate-500">
                            Worked with us? Leave a review to help us build even better products.
                        </p>
                    </div>

                    {successMsg && (
                        <div className="mb-6 flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-medium text-emerald-800">
                            <CheckCircle className="h-4 w-4 shrink-0 text-emerald-600" />
                            <span>{successMsg}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                                <label className="mb-1.5 block text-sm font-semibold text-slate-700">Your Full Name *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.clientName}
                                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                                    className={inputClass}
                                    placeholder="e.g. Rahul Sharma"
                                />
                            </div>
                            <div>
                                <label className="mb-1.5 block text-sm font-semibold text-slate-700">Company / Role *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.companyOrRole}
                                    onChange={(e) => setFormData({ ...formData, companyOrRole: e.target.value })}
                                    className={inputClass}
                                    placeholder="e.g. Founder, TechCorp"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="mb-1.5 block text-sm font-semibold text-slate-700">Rating *</label>
                            <select
                                value={formData.rating}
                                onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                                className={inputClass}
                            >
                                <option value={5}>⭐⭐⭐⭐⭐ (5 Stars - Outstanding)</option>
                                <option value={4}>⭐⭐⭐⭐ (4 Stars - Great)</option>
                                <option value={3}>⭐⭐⭐ (3 Stars - Satisfactory)</option>
                                <option value={2}>⭐⭐ (2 Stars - Needs Improvement)</option>
                                <option value={1}>⭐ (1 Star - Poor)</option>
                            </select>
                        </div>

                        <div>
                            <label className="mb-1.5 block text-sm font-semibold text-slate-700">Feedback Message *</label>
                            <textarea
                                rows={4}
                                required
                                value={formData.comment}
                                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                                className={inputClass}
                                placeholder="Describe the service quality, project execution, or communication..."
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={submitting}
                            className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 py-4 text-sm font-bold text-white shadow-lg shadow-fuchsia-300/50 transition hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-fuchsia-300 disabled:opacity-50 disabled:hover:translate-y-0"
                        >
                            {submitting ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    <span>Sending Feedback...</span>
                                </>
                            ) : (
                                <>
                                    <span>Submit Testimonial</span>
                                    <Send className="h-4 w-4" />
                                </>
                            )}
                        </button>
                    </form>
                </div>

            </main>
        </div>
    );
}