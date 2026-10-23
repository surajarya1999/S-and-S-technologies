"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import API from "@/lib/axios"; // Axios instance import kiya gaya hai
import { Lock, User, Loader2 } from "lucide-react";

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
      // Fallback local check agar backend route abhi configured nahi hai
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

  return (
    <div className="min-h-screen bg-[#0B0F17] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
        <div className="text-center mb-6">
          <span className="text-amber-500 font-bold text-xs uppercase tracking-widest">
            Control Panel
          </span>
          <h1 className="text-2xl font-black text-white mt-1">Admin Portal</h1>
        </div>

        {error && (
          <div className="p-3 mb-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs rounded-xl text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-slate-400 text-xs uppercase font-bold mb-1">
              Username
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
              <input
                type="text"
                required
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-3 text-white text-xs focus:border-amber-500 focus:outline-none"
                placeholder="Enter admin username"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-400 text-xs uppercase font-bold mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
              <input
                type="password"
                required
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-3 text-white text-xs focus:border-amber-500 focus:outline-none"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-lg mt-2 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
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