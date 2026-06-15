"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import toast from "react-hot-toast";
import {
    PlusCircle,
    Tag,
    AlignLeft,
    FileText,
    DollarSign,
    Star,
    Image as ImageIcon,
    Loader2,
    Package,
    ShieldCheck,
} from "lucide-react";
import { CATEGORIES } from "@/lib/data";

const CATEGORY_OPTIONS = CATEGORIES.filter((c) => c !== "All");

export default function AddItemPage() {
    const { user, loading } = useProtectedRoute();
    const { role } = useAuth();
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const [form, setForm] = useState({
        title: "",
        category: "",
        brand: "",
        shortDescription: "",
        fullDescription: "",
        price: "",
        rating: "",
        imageUrl: "",
    });

    // Block non-admin users
    useEffect(() => {
        if (!loading && user && role === "user") {
            toast.error("Access denied. Admins only.");
            router.push("/");
        }
    }, [user, role, loading, router]);

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !form.title ||
            !form.category ||
            !form.brand ||
            !form.shortDescription ||
            !form.fullDescription ||
            !form.price
        ) {
            toast.error("Please fill in all required fields");
            return;
        }

        const price = parseFloat(form.price);
        const rating = parseFloat(form.rating);

        if (isNaN(price) || price <= 0) {
            toast.error("Please enter a valid price");
            return;
        }
        if (form.rating && (isNaN(rating) || rating < 1 || rating > 5)) {
            toast.error("Rating must be between 1 and 5");
            return;
        }

        setSubmitting(true);
        try {
            const newGadget = {
                id: `user-${Date.now()}`,
                title: form.title.trim(),
                category: form.category,
                brand: form.brand.trim(),
                shortDescription: form.shortDescription.trim(),
                fullDescription: form.fullDescription.trim(),
                price,
                rating: form.rating ? rating : 0,
                imageUrl:
                    form.imageUrl.trim() ||
                    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
                specs: {},
                addedBy: user.uid,
                createdAt: new Date().toISOString().split("T")[0],
            };

            const existing = JSON.parse(
                localStorage.getItem("gadgethub_items") || "[]"
            );
            existing.push(newGadget);
            localStorage.setItem("gadgethub_items", JSON.stringify(existing));

            toast.success("Gadget added successfully!");
            router.push("/items/manage");
        } catch {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    // ── Loading / access check ──
    if (loading || !user || role !== "admin") {
        return (
            <div
                style={{ backgroundColor: "#0f172a", minHeight: "100vh" }}
                className="flex items-center justify-center"
            >
                <Loader2
                    size={32}
                    className="animate-spin"
                    style={{ color: "#6366f1" }}
                />
            </div>
        );
    }

    return (
        <div style={{ backgroundColor: "#0f172a", minHeight: "100vh" }}>

            {/* Header */}
            <div
                style={{ backgroundColor: "#0a1120", borderBottom: "1px solid #1e293b" }}
                className="py-12"
            >
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center"
                            style={{ backgroundColor: "rgba(99,102,241,0.15)" }}
                        >
                            <PlusCircle size={20} style={{ color: "#6366f1" }} />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <p
                                    className="text-xs font-medium uppercase tracking-wider"
                                    style={{ color: "#6366f1" }}
                                >
                                    Admin Only
                                </p>
                                <span
                                    className="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full"
                                    style={{
                                        backgroundColor: "rgba(99,102,241,0.15)",
                                        color: "#6366f1",
                                        border: "1px solid rgba(99,102,241,0.3)",
                                    }}
                                >
                                    <ShieldCheck size={10} />
                                    Admin
                                </span>
                            </div>
                            <h1 className="text-2xl font-bold" style={{ color: "#f1f5f9" }}>
                                Add a Gadget
                            </h1>
                        </div>
                    </div>
                    <p className="text-sm mt-2" style={{ color: "#94a3b8" }}>
                        Fill in the details below to add a new gadget to the catalogue.
                    </p>
                </div>
            </div>

            {/* Form */}
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* ── Basic Info ── */}
                    <div
                        style={{ backgroundColor: "#1e293b", border: "1px solid #334155" }}
                        className="rounded-2xl p-6 sm:p-8"
                    >
                        <h2
                            className="text-base font-semibold mb-6 flex items-center gap-2"
                            style={{ color: "#f1f5f9" }}
                        >
                            <Package size={16} style={{ color: "#6366f1" }} />
                            Basic Information
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                            {/* Title */}
                            <div className="sm:col-span-2">
                                <label
                                    className="block text-sm font-medium mb-2"
                                    style={{ color: "#94a3b8" }}
                                >
                                    Title <span style={{ color: "#ef4444" }}>*</span>
                                </label>
                                <div className="relative">
                                    <Tag
                                        size={15}
                                        className="absolute left-3 top-1/2 -translate-y-1/2"
                                        style={{ color: "#94a3b8" }}
                                    />
                                    <input
                                        type="text"
                                        name="title"
                                        value={form.title}
                                        onChange={handleChange}
                                        placeholder="e.g. Sony WF-1000XM5"
                                        style={{
                                            backgroundColor: "#0f172a",
                                            border: "1px solid #334155",
                                            color: "#f1f5f9",
                                        }}
                                        className="w-full pl-9 pr-4 py-3 rounded-xl text-sm outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-600"
                                    />
                                </div>
                            </div>

                            {/* Brand */}
                            <div>
                                <label
                                    className="block text-sm font-medium mb-2"
                                    style={{ color: "#94a3b8" }}
                                >
                                    Brand <span style={{ color: "#ef4444" }}>*</span>
                                </label>
                                <input
                                    type="text"
                                    name="brand"
                                    value={form.brand}
                                    onChange={handleChange}
                                    placeholder="e.g. Sony"
                                    style={{
                                        backgroundColor: "#0f172a",
                                        border: "1px solid #334155",
                                        color: "#f1f5f9",
                                    }}
                                    className="w-full px-4 py-3 rounded-xl text-sm outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-600"
                                />
                            </div>

                            {/* Category */}
                            <div>
                                <label
                                    className="block text-sm font-medium mb-2"
                                    style={{ color: "#94a3b8" }}
                                >
                                    Category <span style={{ color: "#ef4444" }}>*</span>
                                </label>
                                <select
                                    name="category"
                                    value={form.category}
                                    onChange={handleChange}
                                    style={{
                                        backgroundColor: "#0f172a",
                                        border: "1px solid #334155",
                                        color: form.category ? "#f1f5f9" : "#475569",
                                    }}
                                    className="w-full px-4 py-3 rounded-xl text-sm outline-none focus:border-indigo-500 transition-colors cursor-pointer"
                                >
                                    <option value="" disabled>Select a category</option>
                                    {CATEGORY_OPTIONS.map((cat) => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* ── Descriptions ── */}
                    <div
                        style={{ backgroundColor: "#1e293b", border: "1px solid #334155" }}
                        className="rounded-2xl p-6 sm:p-8"
                    >
                        <h2
                            className="text-base font-semibold mb-6 flex items-center gap-2"
                            style={{ color: "#f1f5f9" }}
                        >
                            <FileText size={16} style={{ color: "#6366f1" }} />
                            Descriptions
                        </h2>

                        <div className="space-y-5">

                            {/* Short */}
                            <div>
                                <label
                                    className="block text-sm font-medium mb-2"
                                    style={{ color: "#94a3b8" }}
                                >
                                    Short Description{" "}
                                    <span style={{ color: "#ef4444" }}>*</span>
                                    <span className="ml-2 font-normal text-xs" style={{ color: "#475569" }}>
                                        (shown on cards)
                                    </span>
                                </label>
                                <div className="relative">
                                    <AlignLeft
                                        size={15}
                                        className="absolute left-3 top-3.5"
                                        style={{ color: "#94a3b8" }}
                                    />
                                    <textarea
                                        name="shortDescription"
                                        value={form.shortDescription}
                                        onChange={handleChange}
                                        placeholder="A brief one-line summary..."
                                        rows={2}
                                        style={{
                                            backgroundColor: "#0f172a",
                                            border: "1px solid #334155",
                                            color: "#f1f5f9",
                                            resize: "none",
                                        }}
                                        className="w-full pl-9 pr-4 py-3 rounded-xl text-sm outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-600"
                                    />
                                </div>
                            </div>

                            {/* Full */}
                            <div>
                                <label
                                    className="block text-sm font-medium mb-2"
                                    style={{ color: "#94a3b8" }}
                                >
                                    Full Description{" "}
                                    <span style={{ color: "#ef4444" }}>*</span>
                                    <span className="ml-2 font-normal text-xs" style={{ color: "#475569" }}>
                                        (shown on detail page)
                                    </span>
                                </label>
                                <textarea
                                    name="fullDescription"
                                    value={form.fullDescription}
                                    onChange={handleChange}
                                    placeholder="Write a detailed description covering features, performance..."
                                    rows={5}
                                    style={{
                                        backgroundColor: "#0f172a",
                                        border: "1px solid #334155",
                                        color: "#f1f5f9",
                                        resize: "vertical",
                                    }}
                                    className="w-full px-4 py-3 rounded-xl text-sm outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-600"
                                />
                            </div>
                        </div>
                    </div>

                    {/* ── Pricing & Rating ── */}
                    <div
                        style={{ backgroundColor: "#1e293b", border: "1px solid #334155" }}
                        className="rounded-2xl p-6 sm:p-8"
                    >
                        <h2
                            className="text-base font-semibold mb-6 flex items-center gap-2"
                            style={{ color: "#f1f5f9" }}
                        >
                            <DollarSign size={16} style={{ color: "#6366f1" }} />
                            Pricing & Rating
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                            {/* Price */}
                            <div>
                                <label
                                    className="block text-sm font-medium mb-2"
                                    style={{ color: "#94a3b8" }}
                                >
                                    Price (USD) <span style={{ color: "#ef4444" }}>*</span>
                                </label>
                                <div className="relative">
                                    <DollarSign
                                        size={15}
                                        className="absolute left-3 top-1/2 -translate-y-1/2"
                                        style={{ color: "#94a3b8" }}
                                    />
                                    <input
                                        type="number"
                                        name="price"
                                        value={form.price}
                                        onChange={handleChange}
                                        placeholder="99.99"
                                        min="0"
                                        step="0.01"
                                        style={{
                                            backgroundColor: "#0f172a",
                                            border: "1px solid #334155",
                                            color: "#f1f5f9",
                                        }}
                                        className="w-full pl-9 pr-4 py-3 rounded-xl text-sm outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-600"
                                    />
                                </div>
                            </div>

                            {/* Rating */}
                            <div>
                                <label
                                    className="block text-sm font-medium mb-2"
                                    style={{ color: "#94a3b8" }}
                                >
                                    Rating{" "}
                                    <span className="font-normal text-xs" style={{ color: "#475569" }}>
                                        (1–5, optional)
                                    </span>
                                </label>
                                <div className="relative">
                                    <Star
                                        size={15}
                                        className="absolute left-3 top-1/2 -translate-y-1/2"
                                        style={{ color: "#94a3b8" }}
                                    />
                                    <input
                                        type="number"
                                        name="rating"
                                        value={form.rating}
                                        onChange={handleChange}
                                        placeholder="4.5"
                                        min="1"
                                        max="5"
                                        step="0.1"
                                        style={{
                                            backgroundColor: "#0f172a",
                                            border: "1px solid #334155",
                                            color: "#f1f5f9",
                                        }}
                                        className="w-full pl-9 pr-4 py-3 rounded-xl text-sm outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-600"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── Image ── */}
                    <div
                        style={{ backgroundColor: "#1e293b", border: "1px solid #334155" }}
                        className="rounded-2xl p-6 sm:p-8"
                    >
                        <h2
                            className="text-base font-semibold mb-6 flex items-center gap-2"
                            style={{ color: "#f1f5f9" }}
                        >
                            <ImageIcon size={16} style={{ color: "#6366f1" }} />
                            Image
                        </h2>

                        <div>
                            <label
                                className="block text-sm font-medium mb-2"
                                style={{ color: "#94a3b8" }}
                            >
                                Image URL{" "}
                                <span className="font-normal text-xs" style={{ color: "#475569" }}>
                                    (optional — a default will be used if blank)
                                </span>
                            </label>
                            <div className="relative">
                                <ImageIcon
                                    size={15}
                                    className="absolute left-3 top-1/2 -translate-y-1/2"
                                    style={{ color: "#94a3b8" }}
                                />
                                <input
                                    type="url"
                                    name="imageUrl"
                                    value={form.imageUrl}
                                    onChange={handleChange}
                                    placeholder="https://images.unsplash.com/..."
                                    style={{
                                        backgroundColor: "#0f172a",
                                        border: "1px solid #334155",
                                        color: "#f1f5f9",
                                    }}
                                    className="w-full pl-9 pr-4 py-3 rounded-xl text-sm outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-600"
                                />
                            </div>

                            {/* Preview */}
                            {form.imageUrl && (
                                <div className="mt-4">
                                    <p className="text-xs mb-2" style={{ color: "#94a3b8" }}>
                                        Preview:
                                    </p>
                                    <img
                                        src={form.imageUrl}
                                        alt="Preview"
                                        onError={(e) => { e.target.style.display = "none"; }}
                                        className="h-40 w-full object-cover rounded-xl"
                                        style={{ border: "1px solid #334155" }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* ── Submit ── */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <button
                            type="submit"
                            disabled={submitting}
                            style={{ backgroundColor: "#6366f1" }}
                            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {submitting ? (
                                <>
                                    <Loader2 size={16} className="animate-spin" />
                                    Adding Gadget...
                                </>
                            ) : (
                                <>
                                    <PlusCircle size={16} />
                                    Add Gadget
                                </>
                            )}
                        </button>
                        <button
                            type="button"
                            onClick={() => router.push("/items/manage")}
                            style={{ color: "#94a3b8", border: "1px solid #334155" }}
                            className="sm:w-40 py-3.5 rounded-xl text-sm font-medium hover:text-white hover:border-indigo-500 transition-colors"
                        >
                            Cancel
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}