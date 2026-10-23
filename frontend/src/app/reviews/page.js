"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import API from "@/lib/axios"; // Axios instance import kiya gaya hai
import { Star, MessageSquare, CheckCircle, Loader2, Quote, Send } from "lucide-react";

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
        <div className="bg-[#F9F8F6] text-[#111111] font-sans min-h-screen">
            <main className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-16">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="border-b border-[#E8E5DF] pb-8 md:pb-12 mb-12"
                >
                    <span className="text-[10px] md:text-xs font-bold text-amber-600 uppercase tracking-widest bg-amber-100/60 px-3 py-1 rounded-full">
                        Client Testimonials
                    </span>
                    <h1 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight text-slate-900 mt-3 mb-3">
                        Proof of <span className="text-slate-400 font-normal">engineering excellence.</span>
                    </h1>
                    <p className="text-slate-600 text-xs sm:text-sm md:text-base max-w-2xl leading-relaxed">
                        Read real feedback from clients and collaborators on our delivered full-stack web applications.
                    </p>
                </motion.div>

                {/* Approved Reviews Showcase */}
                <div className="mb-16">
                    <h2 className="text-xl font-extrabold text-slate-900 mb-6 flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 text-amber-600" /> Approved Client Reviews
                    </h2>

                    {loading ? (
                        <div className="py-12 flex justify-center items-center gap-2 text-slate-500 text-xs font-semibold">
                            <Loader2 className="w-5 h-5 animate-spin text-amber-600" />
                            <span>Loading client reviews...</span>
                        </div>
                    ) : feedbacks.length === 0 ? (
                        <div className="p-12 bg-white border border-slate-200 rounded-3xl text-center text-slate-500 text-xs">
                            No approved reviews published yet. Be the first to share your experience below!
                        </div>
                    ) : (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {feedbacks.map((item, index) => (
                                <motion.div
                                    key={item._id}
                                    initial={{ opacity: 0, y: 25 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="bg-white border border-slate-200/90 rounded-2xl md:rounded-3xl p-6 shadow-sm hover:border-slate-900 transition-all duration-300 flex flex-col justify-between relative group"
                                >
                                    <Quote className="absolute top-5 right-5 w-8 h-8 text-slate-100 group-hover:text-amber-100 transition" />

                                    <div className="space-y-3 relative z-10">
                                        <div className="flex gap-1 text-amber-500">
                                            {[...Array(item.rating)].map((_, i) => (
                                                <Star key={i} className="w-4 h-4 fill-current" />
                                            ))}
                                        </div>
                                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                                            "{item.comment}"
                                        </p>
                                    </div>

                                    <div className="pt-4 border-t border-slate-100 mt-6 flex items-center justify-between relative z-10">
                                        <div>
                                            <h3 className="font-extrabold text-slate-900 text-xs sm:text-sm">{item.clientName}</h3>
                                            <p className="text-[10px] text-slate-500 font-medium">{item.companyOrRole}</p>
                                        </div>
                                        <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                                            <CheckCircle className="w-3 h-3" />
                                            <span>Verified</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Interactive Feedback Form */}
                <div className="max-w-xl mx-auto bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm relative">
                    <div className="mb-6 border-b border-slate-100 pb-4">
                        <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                            <MessageSquare className="w-5 h-5 text-amber-600" /> Share Your Experience
                        </h3>
                        <p className="text-xs text-slate-500 mt-1">
                            Worked with us? Leave a review to help us build even better products.
                        </p>
                    </div>

                    {successMsg && (
                        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-2xl font-medium flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>{successMsg}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                        <div className="grid sm:grid-cols-2 gap-3.5">
                            <div>
                                <label className="block text-slate-700 font-semibold mb-1">Your Full Name *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.clientName}
                                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:border-slate-900 focus:bg-white focus:outline-none transition"
                                    placeholder="e.g. Rahul Sharma"
                                />
                            </div>
                            <div>
                                <label className="block text-slate-700 font-semibold mb-1">Company / Role *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.companyOrRole}
                                    onChange={(e) => setFormData({ ...formData, companyOrRole: e.target.value })}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:border-slate-900 focus:bg-white focus:outline-none transition"
                                    placeholder="e.g. Founder, TechCorp"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-slate-700 font-semibold mb-1">Rating *</label>
                            <select
                                value={formData.rating}
                                onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:border-slate-900 focus:bg-white focus:outline-none transition"
                            >
                                <option value={5}>⭐⭐⭐⭐⭐ (5 Stars - Outstanding)</option>
                                <option value={4}>⭐⭐⭐⭐ (4 Stars - Great)</option>
                                <option value={3}>⭐⭐⭐ (3 Stars - Satisfactory)</option>
                                <option value={2}>⭐⭐ (2 Stars - Needs Improvement)</option>
                                <option value={1}>⭐ (1 Star - Poor)</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-slate-700 font-semibold mb-1">Feedback Message *</label>
                            <textarea
                                rows={3}
                                required
                                value={formData.comment}
                                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:border-slate-900 focus:bg-white focus:outline-none transition"
                                placeholder="Describe the service quality, project execution, or communication..."
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={submitting}
                            className="w-full py-3.5 bg-slate-900 hover:bg-amber-600 text-white font-bold uppercase rounded-xl transition shadow-md disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
                        >
                            {submitting ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    <span>Sending Feedback...</span>
                                </>
                            ) : (
                                <>
                                    <span>Submit Testimonial</span>
                                    <Send className="w-3.5 h-3.5" />
                                </>
                            )}
                        </button>
                    </form>
                </div>

            </main>
        </div>
    );
}