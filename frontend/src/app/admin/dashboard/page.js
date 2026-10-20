"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import API from "@/lib/axios"; // Axios instance import kiya gaya hai
import {
    Upload,
    Trash2,
    CheckCircle,
    MessageSquare,
    Briefcase,
    Mail,
    LogOut,
    ExternalLink,
    XCircle,
    Loader2,
} from "lucide-react";

export default function AdminDashboard() {
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [activeTab, setActiveTab] = useState("projects");

    // Data States
    const [contacts, setContacts] = useState([]);
    const [feedbacks, setFeedbacks] = useState([]);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    // New Project Form State
    const [projectData, setProjectData] = useState({
        title: "",
        description: "",
        category: "Full-Stack",
        liveLink: "",
        githubLink: "",
        featured: "false",
    });
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [uploading, setUploading] = useState(false);

    // Router safely initialize & Auth Check
    useEffect(() => {
        setIsMounted(true);
        const token = localStorage.getItem("adminToken");

        if (!token) {
            router.push("/admin/login");
        } else {
            setIsAuthenticated(true);
            fetchInitialData();
        }
    }, [router]);

    // Fetch all module data using Axios
    const fetchInitialData = async () => {
        setLoading(true);
        try {
            const [resContacts, resProjects, resFeedbacks] = await Promise.all([
                API.get("/api/contacts"),
                API.get("/api/projects"),
                API.get("/api/feedbacks/all"),
            ]);

            if (resContacts.data.success) setContacts(resContacts.data.data);
            if (resProjects.data.success) setProjects(resProjects.data.data);
            if (resFeedbacks.data.success) setFeedbacks(resFeedbacks.data.data);
        } catch (err) {
            console.error("Dashboard Data Fetch Error:", err);
        } finally {
            setLoading(false);
        }
    };

    // Upload Project Handler using Axios
    const handleProjectSubmit = async (e) => {
        e.preventDefault();
        if (!image1 || !image2) {
            alert("Please select both Image 1 and Image 2!");
            return;
        }

        setUploading(true);
        const formData = new FormData();
        formData.append("title", projectData.title);
        formData.append("description", projectData.description);
        formData.append("category", projectData.category);
        formData.append("liveLink", projectData.liveLink);
        formData.append("githubLink", projectData.githubLink);
        formData.append("featured", projectData.featured);
        formData.append("image1", image1);
        formData.append("image2", image2);

        try {
            const res = await API.post("/api/projects", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (res.data.success) {
                alert("Project uploaded successfully!");
                setProjects([res.data.data, ...projects]);
                setProjectData({
                    title: "",
                    description: "",
                    category: "Full-Stack",
                    liveLink: "",
                    githubLink: "",
                    featured: "false",
                });
                setImage1(null);
                setImage2(null);
                e.target.reset();
            } else {
                alert(res.data.message || "Upload failed");
            }
        } catch (err) {
            alert("Error uploading project to server.");
        } finally {
            setUploading(false);
        }
    };

    // Delete Project Handler using Axios
    const handleDeleteProject = async (id) => {
        if (!confirm("Are you sure you want to delete this project?")) return;
        try {
            const res = await API.delete(`/api/projects/${id}`);
            if (res.status === 200 || res.data.success) {
                setProjects(projects.filter((p) => p._id !== id));
            }
        } catch (err) {
            alert("Failed to delete project");
        }
    };

    // Toggle Feedback Approval using Axios
    const handleToggleFeedback = async (id, currentStatus) => {
        try {
            const res = await API.patch(`/api/feedbacks/${id}/status`, {
                isApproved: !currentStatus,
            });
            if (res.status === 200 || res.data.success) {
                setFeedbacks(
                    feedbacks.map((f) => (f._id === id ? { ...f, isApproved: !currentStatus } : f))
                );
            }
        } catch (err) {
            alert("Failed to update review status");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        router.push("/admin/login");
    };

    if (!isMounted || !isAuthenticated) {
        return (
            <div className="min-h-screen bg-[#0B0F17] text-white flex items-center justify-center">
                <div className="flex items-center gap-3 text-amber-500">
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span className="text-xs font-bold uppercase tracking-wider">Verifying Session...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0B0F17] text-slate-200 font-sans">
            {/* Navbar Header */}
            <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur px-6 py-4 flex justify-between items-center sticky top-0 z-50">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 font-black flex items-center justify-center text-xs">
                        S&S
                    </div>
                    <h1 className="font-bold text-white text-sm sm:text-base">Control Center</h1>
                </div>

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white transition text-xs font-semibold"
                >
                    <LogOut className="w-4 h-4" /> Logout
                </button>
            </header>

            {/* Main Content Area */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
                {/* Navigation Tabs */}
                <div className="flex flex-wrap gap-2 sm:gap-3 border-b border-slate-800 pb-4 mb-8">
                    <button
                        onClick={() => setActiveTab("projects")}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition ${activeTab === "projects"
                            ? "bg-amber-500 text-slate-950 shadow-lg"
                            : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                            }`}
                    >
                        <Briefcase className="w-4 h-4" /> Manage Projects ({projects.length})
                    </button>

                    <button
                        onClick={() => setActiveTab("contacts")}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition ${activeTab === "contacts"
                            ? "bg-amber-500 text-slate-950 shadow-lg"
                            : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                            }`}
                    >
                        <Mail className="w-4 h-4" /> Inquiries ({contacts.length})
                    </button>

                    <button
                        onClick={() => setActiveTab("feedbacks")}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition ${activeTab === "feedbacks"
                            ? "bg-amber-500 text-slate-950 shadow-lg"
                            : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                            }`}
                    >
                        <MessageSquare className="w-4 h-4" /> Reviews ({feedbacks.length})
                    </button>
                </div>

                {loading ? (
                    <div className="py-20 text-center text-slate-500 flex flex-col items-center gap-2">
                        <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
                        <span className="text-xs">Fetching MongoDB Database records...</span>
                    </div>
                ) : (
                    <>
                        {/* TAB 1: PROJECTS MODULE */}
                        {activeTab === "projects" && (
                            <div className="grid lg:grid-cols-12 gap-8">
                                {/* Upload Form */}
                                <div className="lg:col-span-5 bg-slate-900 border border-slate-800 p-6 rounded-2xl h-fit shadow-xl">
                                    <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                                        <Upload className="w-4 h-4 text-amber-500" /> Upload New Project
                                    </h2>

                                    <form onSubmit={handleProjectSubmit} className="space-y-4 text-xs">
                                        <div>
                                            <label className="block text-slate-400 font-semibold mb-1">
                                                Project Title *
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={projectData.title}
                                                onChange={(e) =>
                                                    setProjectData({ ...projectData, title: e.target.value })
                                                }
                                                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-amber-500 focus:outline-none"
                                                placeholder="e.g. Next.js SaaS Platform"
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-slate-400 font-semibold mb-1">
                                                    Category *
                                                </label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={projectData.category}
                                                    onChange={(e) =>
                                                        setProjectData({ ...projectData, category: e.target.value })
                                                    }
                                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-amber-500 focus:outline-none"
                                                    placeholder="e.g. Full-Stack"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-slate-400 font-semibold mb-1">
                                                    Featured
                                                </label>
                                                <select
                                                    value={projectData.featured}
                                                    onChange={(e) =>
                                                        setProjectData({ ...projectData, featured: e.target.value })
                                                    }
                                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-amber-500 focus:outline-none"
                                                >
                                                    <option value="false">No</option>
                                                    <option value="true">Yes</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-slate-400 font-semibold mb-1">
                                                Description *
                                            </label>
                                            <textarea
                                                rows={3}
                                                required
                                                value={projectData.description}
                                                onChange={(e) =>
                                                    setProjectData({ ...projectData, description: e.target.value })
                                                }
                                                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-amber-500 focus:outline-none"
                                                placeholder="Brief summary of key features..."
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-slate-400 font-semibold mb-1">
                                                    Live URL
                                                </label>
                                                <input
                                                    type="url"
                                                    value={projectData.liveLink}
                                                    onChange={(e) =>
                                                        setProjectData({ ...projectData, liveLink: e.target.value })
                                                    }
                                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-amber-500 focus:outline-none"
                                                    placeholder="https://..."
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-slate-400 font-semibold mb-1">
                                                    GitHub Link
                                                </label>
                                                <input
                                                    type="url"
                                                    value={projectData.githubLink}
                                                    onChange={(e) =>
                                                        setProjectData({ ...projectData, githubLink: e.target.value })
                                                    }
                                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-amber-500 focus:outline-none"
                                                    placeholder="https://..."
                                                />
                                            </div>
                                        </div>

                                        {/* Dual Image Upload File Inputs */}
                                        <div className="space-y-3 pt-2">
                                            <div>
                                                <label className="block text-amber-400 font-bold mb-1">
                                                    Main Banner (Image 1) *
                                                </label>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    required
                                                    onChange={(e) => setImage1(e.target.files[0])}
                                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-slate-400 file:bg-amber-500 file:text-slate-950 file:border-0 file:rounded-lg file:px-3 file:py-1 file:font-bold cursor-pointer"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-amber-400 font-bold mb-1">
                                                    Detail Screen (Image 2) *
                                                </label>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    required
                                                    onChange={(e) => setImage2(e.target.files[0])}
                                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-slate-400 file:bg-amber-500 file:text-slate-950 file:border-0 file:rounded-lg file:px-3 file:py-1 file:font-bold cursor-pointer"
                                                />
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={uploading}
                                            className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold uppercase rounded-xl transition shadow-lg disabled:opacity-50 mt-4 flex items-center justify-center gap-2"
                                        >
                                            {uploading ? (
                                                <>
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                    <span>Uploading to Cloudinary...</span>
                                                </>
                                            ) : (
                                                <span>Publish Project</span>
                                            )}
                                        </button>
                                    </form>
                                </div>

                                {/* Published List */}
                                <div className="lg:col-span-7 space-y-4">
                                    <h2 className="text-base font-bold text-white mb-4">Live Projects List</h2>
                                    {projects.length === 0 ? (
                                        <div className="p-8 bg-slate-900 border border-slate-800 rounded-2xl text-center text-slate-500 text-xs">
                                            No projects published yet.
                                        </div>
                                    ) : (
                                        projects.map((item) => (
                                            <div
                                                key={item._id}
                                                className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm"
                                            >
                                                <div className="flex items-center gap-3 w-full sm:w-auto">
                                                    <img
                                                        src={item.image1}
                                                        alt={item.title}
                                                        className="w-16 h-14 object-cover rounded-xl border border-slate-800 shrink-0"
                                                    />
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <h3 className="font-bold text-white text-sm">{item.title}</h3>
                                                            <span className="text-[9px] bg-slate-800 text-amber-400 px-2 py-0.5 rounded-full font-bold">
                                                                {item.category}
                                                            </span>
                                                        </div>
                                                        <p className="text-xs text-slate-400 line-clamp-1 mt-1">
                                                            {item.description}
                                                        </p>
                                                        <div className="flex gap-3 mt-2 text-slate-400 text-xs">
                                                            {item.liveLink && (
                                                                <a
                                                                    href={item.liveLink}
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                    className="hover:text-amber-400 flex items-center gap-1"
                                                                >
                                                                    Live <ExternalLink className="w-3 h-3" />
                                                                </a>
                                                            )}
                                                            {item.githubLink && (
                                                                <a
                                                                    href={item.githubLink}
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                    className="hover:text-amber-400 flex items-center gap-1"
                                                                >
                                                                    Code{" "}
                                                                    <svg className="w-3 h-3 fill-current inline-block" viewBox="0 0 24 24">
                                                                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                                                                    </svg>
                                                                </a>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                <button
                                                    onClick={() => handleDeleteProject(item._id)}
                                                    className="p-2.5 bg-rose-500/10 text-rose-400 hover:bg-rose-600 hover:text-white rounded-xl transition self-end sm:self-center"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        )}

                        {/* TAB 2: INQUIRIES MODULE */}
                        {activeTab === "contacts" && (
                            <div className="space-y-4">
                                <h2 className="text-base font-bold text-white mb-4">Contact Messages Received</h2>
                                {contacts.length === 0 ? (
                                    <div className="p-8 bg-slate-900 border border-slate-800 rounded-2xl text-center text-slate-500 text-xs">
                                        No contact form submissions found.
                                    </div>
                                ) : (
                                    contacts.map((c) => (
                                        <div
                                            key={c._id}
                                            className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2 shadow-sm"
                                        >
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="font-bold text-white text-sm sm:text-base">
                                                        {c.fullName}
                                                    </h3>
                                                    <p className="text-amber-400 text-xs font-mono mt-0.5">{c.email}</p>
                                                </div>
                                                <span className="text-[10px] text-slate-500 font-mono">
                                                    {new Date(c.createdAt).toLocaleString()}
                                                </span>
                                            </div>
                                            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800/80 mt-2">
                                                "{c.message}"
                                            </p>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}

                        {/* TAB 3: REVIEWS MODERATION MODULE */}
                        {activeTab === "feedbacks" && (
                            <div className="space-y-4">
                                <h2 className="text-base font-bold text-white mb-4">Client Feedbacks</h2>
                                {feedbacks.length === 0 ? (
                                    <div className="p-8 bg-slate-900 border border-slate-800 rounded-2xl text-center text-slate-500 text-xs">
                                        No client reviews submitted yet.
                                    </div>
                                ) : (
                                    feedbacks.map((f) => (
                                        <div
                                            key={f._id}
                                            className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm"
                                        >
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <h3 className="font-bold text-white text-sm">{f.clientName}</h3>
                                                    <span className="text-xs text-slate-500">({f.companyOrRole})</span>
                                                </div>
                                                <p className="text-xs text-amber-400 font-bold">
                                                    Rating: {f.rating} / 5 ⭐
                                                </p>
                                                <p className="text-xs text-slate-300 mt-1">"{f.comment}"</p>
                                            </div>

                                            <button
                                                onClick={() => handleToggleFeedback(f._id, f.isApproved)}
                                                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition flex items-center gap-2 ${f.isApproved
                                                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                                    : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                                                    }`}
                                            >
                                                {f.isApproved ? (
                                                    <>
                                                        <CheckCircle className="w-4 h-4" />
                                                        <span>Approved (Live)</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <XCircle className="w-4 h-4" />
                                                        <span>Approve Review</span>
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    );
}