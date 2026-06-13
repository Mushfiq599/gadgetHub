"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import { Cpu, Mail, Lock, Eye, EyeOff, User, UserPlus } from "lucide-react";

export default function RegisterPage() {
    const { register, loginWithGoogle } = useAuth();
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!name || !email || !password || !confirm) {
            toast.error("Please fill in all fields");
            return;
        }
        if (password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }
        if (password !== confirm) {
            toast.error("Passwords do not match");
            return;
        }
        setLoading(true);
        try {
            await register(name, email, password);
            toast.success("Account created! Welcome to GadgetHub.");
            router.push("/");
        } catch (err) {
            const msg =
                err.code === "auth/email-already-in-use"
                    ? "An account with this email already exists"
                    : err.code === "auth/invalid-email"
                        ? "Please enter a valid email address"
                        : err.code === "auth/weak-password"
                            ? "Password should be at least 6 characters"
                            : "Registration failed. Please try again.";
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
        } catch (err) {
            toast.error("Google sign-in failed. Please try again.");
        } finally {
            setGoogleLoading(false);
        }
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
                        Create your account
                    </h1>
                    <p className="text-sm mt-1" style={{ color: "#94a3b8" }}>
                        Join GadgetHub and start exploring
                    </p>
                </div>

                {/* Card */}
                <div
                    style={{
                        backgroundColor: "#1e293b",
                        border: "1px solid #334155",
                    }}
                    className="rounded-2xl p-8"
                >
                    {/* Google button */}
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
                        {googleLoading ? "Signing up..." : "Continue with Google"}
                    </button>

                    {/* Divider */}
                    <div className="flex items-center gap-3 mb-6">
                        <div style={{ backgroundColor: "#334155" }} className="flex-1 h-px" />
                        <span className="text-xs" style={{ color: "#94a3b8" }}>
                            or register with email
                        </span>
                        <div style={{ backgroundColor: "#334155" }} className="flex-1 h-px" />
                    </div>

                    {/* Form */}
                    <form onSubmit={handleRegister} className="space-y-5">

                        {/* Name */}
                        <div>
                            <label
                                className="block text-sm font-medium mb-2"
                                style={{ color: "#94a3b8" }}
                            >
                                Full name
                            </label>
                            <div className="relative">
                                <User
                                    size={16}
                                    className="absolute left-3 top-1/2 -translate-y-1/2"
                                    style={{ color: "#94a3b8" }}
                                />
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="John Doe"
                                    style={{
                                        backgroundColor: "#0f172a",
                                        border: "1px solid #334155",
                                        color: "#f1f5f9",
                                    }}
                                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-600"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label
                                className="block text-sm font-medium mb-2"
                                style={{ color: "#94a3b8" }}
                            >
                                Email address
                            </label>
                            <div className="relative">
                                <Mail
                                    size={16}
                                    className="absolute left-3 top-1/2 -translate-y-1/2"
                                    style={{ color: "#94a3b8" }}
                                />
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
                            <label
                                className="block text-sm font-medium mb-2"
                                style={{ color: "#94a3b8" }}
                            >
                                Password
                            </label>
                            <div className="relative">
                                <Lock
                                    size={16}
                                    className="absolute left-3 top-1/2 -translate-y-1/2"
                                    style={{ color: "#94a3b8" }}
                                />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Min. 6 characters"
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

                        {/* Confirm Password */}
                        <div>
                            <label
                                className="block text-sm font-medium mb-2"
                                style={{ color: "#94a3b8" }}
                            >
                                Confirm password
                            </label>
                            <div className="relative">
                                <Lock
                                    size={16}
                                    className="absolute left-3 top-1/2 -translate-y-1/2"
                                    style={{ color: "#94a3b8" }}
                                />
                                <input
                                    type={showConfirm ? "text" : "password"}
                                    value={confirm}
                                    onChange={(e) => setConfirm(e.target.value)}
                                    placeholder="Repeat your password"
                                    style={{
                                        backgroundColor: "#0f172a",
                                        border: "1px solid #334155",
                                        color: confirm && confirm !== password
                                            ? "#ef4444"
                                            : "#f1f5f9",
                                        borderColor: confirm && confirm !== password
                                            ? "#ef4444"
                                            : "#334155",
                                    }}
                                    className="w-full pl-10 pr-11 py-3 rounded-xl text-sm outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-600"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirm((p) => !p)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2"
                                    style={{ color: "#94a3b8" }}
                                >
                                    {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                            {confirm && confirm !== password && (
                                <p className="text-xs mt-1.5" style={{ color: "#ef4444" }}>
                                    Passwords do not match
                                </p>
                            )}
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
                                    Creating account...
                                </>
                            ) : (
                                <>
                                    <UserPlus size={16} />
                                    Create Account
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Footer link */}
                <p className="text-center text-sm mt-6" style={{ color: "#94a3b8" }}>
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        style={{ color: "#6366f1" }}
                        className="font-medium hover:opacity-80 transition-opacity"
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}