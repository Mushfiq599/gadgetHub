"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth, DEMO_CREDENTIALS } from "@/context/AuthContext";
import toast from "react-hot-toast";
import { Cpu, Mail, Lock, Eye, EyeOff, LogIn, ShieldCheck, User } from "lucide-react";

export default function LoginPage() {
    const { login, loginWithGoogle } = useAuth();
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!email || !password) { toast.error("Please fill in all fields"); return; }
        setLoading(true);
        try {
            await login(email, password);
            toast.success("Welcome back!");
            router.push("/");
        } catch (err) {
            const msg =
                err.code === "auth/invalid-credential" ? "Invalid email or password" :
                    err.code === "auth/too-many-requests" ? "Too many attempts. Try again later." :
                        "Login failed. Please try again.";
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogle = async () => {
        setGoogleLoading(true);
        try {
            await loginWithGoogle();
            toast.success("Welcome to GadgetHub!");
            router.push("/");
        } catch {
            toast.error("Google sign-in failed. Please try again.");
        } finally {
            setGoogleLoading(false);
        }
    };

    // Fill form with demo credentials
    const fillDemo = (type) => {
        const creds = DEMO_CREDENTIALS[type];
        setEmail(creds.email);
        setPassword(creds.password);
        toast.success(`${creds.label} credentials filled!`);
    };

    return (
        <div
            style={{ backgroundColor: "#0f172a", minHeight: "100vh" }}
            className="flex items-center justify-center px-4 py-16"
        >
            <div className="w-full max-w-md">

                {/* Logo */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-2 mb-6">
                        <div
                            style={{ backgroundColor: "#6366f1" }}
                            className="w-10 h-10 rounded-xl flex items-center justify-center"
                        >
                            <Cpu size={22} color="white" />
                        </div>
                        <span className="font-bold text-2xl" style={{ color: "#f1f5f9" }}>
                            Gadget<span style={{ color: "#6366f1" }}>Hub</span>
                        </span>
                    </Link>
                    <h1 className="text-2xl font-bold" style={{ color: "#f1f5f9" }}>
                        Welcome back
                    </h1>
                    <p className="text-sm mt-1" style={{ color: "#94a3b8" }}>
                        Sign in to your account to continue
                    </p>
                </div>

                {/* ── Demo credentials ── */}
                <div
                    style={{
                        backgroundColor: "#1e293b",
                        border: "1px solid #334155",
                    }}
                    className="rounded-2xl p-4 mb-4"
                >
                    <p
                        className="text-xs font-semibold uppercase tracking-wider mb-3"
                        style={{ color: "#94a3b8" }}
                    >
                        Quick Demo Access
                    </p>
                    <div className="grid grid-cols-2 gap-3">

                        {/* Demo Admin */}
                        <button
                            onClick={() => fillDemo("admin")}
                            style={{
                                backgroundColor: "rgba(99,102,241,0.1)",
                                border: "1px solid rgba(99,102,241,0.3)",
                            }}
                            className="flex flex-col items-start p-3 rounded-xl hover:border-indigo-500 transition-colors text-left"
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <div
                                    className="w-7 h-7 rounded-lg flex items-center justify-center"
                                    style={{ backgroundColor: "rgba(99,102,241,0.2)" }}
                                >
                                    <ShieldCheck size={14} style={{ color: "#6366f1" }} />
                                </div>
                                <span
                                    className="text-xs font-bold"
                                    style={{ color: "#6366f1" }}
                                >
                                    Demo Admin
                                </span>
                            </div>
                            <p className="text-xs" style={{ color: "#94a3b8" }}>
                                {DEMO_CREDENTIALS.admin.email}
                            </p>
                            <p className="text-xs mt-0.5" style={{ color: "#475569" }}>
                                Pass: {DEMO_CREDENTIALS.admin.password}
                            </p>
                        </button>

                        {/* Demo User */}
                        <button
                            onClick={() => fillDemo("user")}
                            style={{
                                backgroundColor: "rgba(34,197,94,0.08)",
                                border: "1px solid rgba(34,197,94,0.25)",
                            }}
                            className="flex flex-col items-start p-3 rounded-xl hover:border-green-500 transition-colors text-left"
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <div
                                    className="w-7 h-7 rounded-lg flex items-center justify-center"
                                    style={{ backgroundColor: "rgba(34,197,94,0.15)" }}
                                >
                                    <User size={14} style={{ color: "#22c55e" }} />
                                </div>
                                <span
                                    className="text-xs font-bold"
                                    style={{ color: "#22c55e" }}
                                >
                                    Demo User
                                </span>
                            </div>
                            <p className="text-xs" style={{ color: "#94a3b8" }}>
                                {DEMO_CREDENTIALS.user.email}
                            </p>
                            <p className="text-xs mt-0.5" style={{ color: "#475569" }}>
                                Pass: {DEMO_CREDENTIALS.user.password}
                            </p>
                            
                        </button>
                    </div>

                    <p className="text-xs mt-3 text-center" style={{ color: "#475569" }}>
                        Click a card to auto-fill credentials, then sign in
                    </p>
                </div>

                {/* Login card */}
                <div
                    style={{
                        backgroundColor: "#1e293b",
                        border: "1px solid #334155",
                    }}
                    className="rounded-2xl p-8"
                >
                    {/* Google */}
                    <button
                        onClick={handleGoogle}
                        disabled={googleLoading}
                        style={{
                            backgroundColor: "#0f172a",
                            border: "1px solid #334155",
                            color: "#f1f5f9",
                        }}
                        className="w-full flex items-center justify-center gap-3 py-3 rounded-xl text-sm font-medium hover:border-indigo-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-6"
                    >
                        <svg width="18" height="18" viewBox="0 0 48 48">
                            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                        </svg>
                        {googleLoading ? "Signing in..." : "Continue with Google"}
                    </button>

                    {/* Divider */}
                    <div className="flex items-center gap-3 mb-6">
                        <div style={{ backgroundColor: "#334155" }} className="flex-1 h-px" />
                        <span className="text-xs" style={{ color: "#94a3b8" }}>
                            or sign in with email
                        </span>
                        <div style={{ backgroundColor: "#334155" }} className="flex-1 h-px" />
                    </div>

                    {/* Form */}
                    <form onSubmit={handleLogin} className="space-y-5">

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium mb-2" style={{ color: "#94a3b8" }}>
                                Email address
                            </label>
                            <div className="relative">
                                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#94a3b8" }} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    style={{
                                        backgroundColor: "#0f172a",
                                        border: "1px solid #334155",
                                        color: "#f1f5f9",
                                    }}
                                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-600"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium mb-2" style={{ color: "#94a3b8" }}>
                                Password
                            </label>
                            <div className="relative">
                                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#94a3b8" }} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    style={{
                                        backgroundColor: "#0f172a",
                                        border: "1px solid #334155",
                                        color: "#f1f5f9",
                                    }}
                                    className="w-full pl-10 pr-11 py-3 rounded-xl text-sm outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-600"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((p) => !p)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2"
                                    style={{ color: "#94a3b8" }}
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            style={{ backgroundColor: "#6366f1" }}
                            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                        >
                            {loading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    <LogIn size={16} />
                                    Sign In
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Footer link */}
                <p className="text-center text-sm mt-6" style={{ color: "#94a3b8" }}>
                    Don&apos;t have an account?{" "}
                    <Link href="/register" style={{ color: "#6366f1" }} className="font-medium hover:opacity-80 transition-opacity">
                        Create one
                    </Link>
                </p>
            </div>
        </div>
    );
}