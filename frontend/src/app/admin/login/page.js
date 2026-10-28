"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import API from "@/lib/axios"; // Axios instance
import { Lock, User, Loader2, ShieldCheck } from "lucide-react";

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Backend API request through Axios
      const res = await API.post("/api/admin/login", credentials);

      if (res.data.success) {
        localStorage.setItem("adminToken", res.data.token || "authenticated_ss_studio");
        router.push("/admin/dashboard");
      } else {
        setError(res.data.message || "Invalid admin credentials!");
      }
    } catch (err) {
      // Fallback local check if the backend route is not configured yet
      if (credentials.username === "surajarya460" && credentials.password === "suraj3214") {
        localStorage.setItem("adminToken", "authenticated_ss_studio");
        router.push("/admin/dashboard");
      } else {
        setError(err.response?.data?.message || "Invalid admin credentials or server error!");
      }
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border-2 border-white/10 bg-white/5 py-3.5 pl-10 pr-4 text-sm text-white transition placeholder:text-slate-500 focus:border-fuchsia-500 focus:bg-white/10 focus:outline-none focus:ring-4 focus:ring-fuchsia-500/20";

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0B0F17] p-4 font-sans antialiased selection:bg-fuchsia-500 selection:text-white">
      {/* Line grid + colour glow background */}
      <div
        aria-hidden
        className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:40px_40px]"
      />
      <div aria-hidden className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-violet-600/40 blur-3xl" />
      <div aria-hidden className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-pink-500/30 blur-3xl" />
      <div aria-hidden className="absolute right-1/4 top-10 h-60 w-60 rounded-full bg-orange-400/20 blur-3xl" />

      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
        <div aria-hidden className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-orange-400" />

        <div className="mb-7 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-orange-400 text-white shadow-lg shadow-fuchsia-500/30">
            <ShieldCheck className="h-7 w-7" />
          </div>
          <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-amber-300">
            Control Panel
          </span>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-white">Admin Portal</h1>
          <p className="mt-1 text-sm text-slate-400">Sign in to manage projects, reviews and inquiries.</p>
        </div>

        {error && (
          <div className="mb-4 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-center text-sm text-rose-300">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-300">Username</label>
            <div className="relative">
              <User className="absolute left-3.5 top-4 h-4 w-4 text-slate-500" />
              <input
                type="text"
                required
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                className={inputClass}
                placeholder="Enter admin username"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-300">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-4 h-4 w-4 text-slate-500" />
              <input
                type="password"
                required
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                className={inputClass}
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 py-4 text-sm font-bold text-white shadow-lg shadow-fuchsia-500/30 transition hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-fuchsia-400/50 disabled:opacity-50 disabled:hover:translate-y-0"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Verifying...</span>
              </>
            ) : (
              <span>Sign In to Dashboard</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}