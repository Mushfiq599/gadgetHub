"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import toast from "react-hot-toast";
import { gadgets as seedGadgets } from "@/lib/data";
import {
    LayoutDashboard,
    PlusCircle,
    Trash2,
    Eye,
    Loader2,
    Package,
    Star,
    Tag,
    AlertTriangle,
    X,
    ShieldCheck,
} from "lucide-react";

export default function ManageItemsPage() {
    const { user, loading } = useProtectedRoute();
    const { role } = useAuth();
    const router = useRouter();
    const [items, setItems] = useState([]);
    const [deleteTarget, setDeleteTarget] = useState(null);

    // Block non-admin users
    useEffect(() => {
        if (!loading && user && role === "user") {
            toast.error("Access denied. Admins only.");
            router.push("/");
        }
    }, [user, role, loading, router]);

    // Load items
    useEffect(() => {
        if (!user || role !== "admin") return;
        const stored = JSON.parse(localStorage.getItem("gadgethub_items") || "[]");
        const userAdded = stored.filter((i) => i.addedBy);
        setItems([...seedGadgets, ...userAdded]);
    }, [user, role]);

    const handleDelete = (item) => setDeleteTarget(item);

    const confirmDelete = () => {
        if (!deleteTarget) return;
        if (!deleteTarget.addedBy) {
            toast.error("Seed gadgets cannot be deleted");
            setDeleteTarget(null);
            return;
        }
        const stored = JSON.parse(localStorage.getItem("gadgethub_items") || "[]");
        const updated = stored.filter((i) => i.id !== deleteTarget.id);
        localStorage.setItem("gadgethub_items", JSON.stringify(updated));
        setItems((prev) => prev.filter((i) => i.id !== deleteTarget.id));
        toast.success(`"${deleteTarget.title}" removed`);
        setDeleteTarget(null);
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

    const userAddedCount = items.filter((i) => i.addedBy).length;

    return (
        <div style={{ backgroundColor: "#0f172a", minHeight: "100vh" }}>

            {/* Header */}
            <div
                style={{ backgroundColor: "#0a1120", borderBottom: "1px solid #1e293b" }}
                className="py-12"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center"
                                style={{ backgroundColor: "rgba(99,102,241,0.15)" }}
                            >
                                <LayoutDashboard size={20} style={{ color: "#6366f1" }} />
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
                                    Manage Items
                                </h1>
                            </div>
                        </div>
                        <Link
                            href="/items/add"
                            style={{ backgroundColor: "#6366f1" }}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-opacity self-start sm:self-auto"
                        >
                            <PlusCircle size={16} />
                            Add New Gadget
                        </Link>
                    </div>

                    {/* Stats */}
                    <div className="flex flex-wrap gap-4 mt-6">
                        {[
                            { label: "Total Gadgets", value: items.length, color: "#6366f1" },
                            { label: "Admin Added", value: userAddedCount, color: "#22c55e" },
                            { label: "Seed Gadgets", value: seedGadgets.length, color: "#22d3ee" },
                        ].map((stat) => (
                            <div
                                key={stat.label}
                                style={{ backgroundColor: "#1e293b", border: "1px solid #334155" }}
                                className="flex items-center gap-3 px-5 py-3 rounded-xl"
                            >
                                <span className="text-2xl font-bold" style={{ color: stat.color }}>
                                    {stat.value}
                                </span>
                                <span className="text-sm" style={{ color: "#94a3b8" }}>
                                    {stat.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <div
                            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                            style={{ backgroundColor: "#1e293b" }}
                        >
                            <Package size={28} style={{ color: "#334155" }} />
                        </div>
                        <h3 className="text-lg font-semibold mb-2" style={{ color: "#f1f5f9" }}>
                            No gadgets yet
                        </h3>
                        <p className="text-sm mb-6" style={{ color: "#94a3b8" }}>
                            Add your first gadget to see it here.
                        </p>
                        <Link
                            href="/items/add"
                            style={{ backgroundColor: "#6366f1" }}
                            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-opacity"
                        >
                            <PlusCircle size={15} />
                            Add a Gadget
                        </Link>
                    </div>
                ) : (
                    <>
                        {/* Desktop table */}
                        <div
                            className="hidden md:block rounded-2xl overflow-hidden"
                            style={{ backgroundColor: "#1e293b", border: "1px solid #334155" }}
                        >
                            <table className="w-full">
                                <thead>
                                    <tr style={{ borderBottom: "1px solid #334155" }}>
                                        {["Gadget", "Category", "Price", "Rating", "Source", "Actions"].map((h) => (
                                            <th
                                                key={h}
                                                className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider"
                                                style={{ color: "#94a3b8" }}
                                            >
                                                {h}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((item, index) => (
                                        <tr
                                            key={item.id}
                                            style={{
                                                borderBottom: index < items.length - 1 ? "1px solid #334155" : "none",
                                            }}
                                            className="hover:bg-white/[0.02] transition-colors"
                                        >
                                            {/* Gadget */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0"
                                                        style={{ border: "1px solid #334155" }}
                                                    >
                                                        <Image
                                                            src={item.imageUrl}
                                                            alt={item.title}
                                                            fill
                                                            className="object-cover"
                                                            unoptimized={!!item.addedBy}
                                                        />
                                                    </div>
                                                    <div>
                                                        <p
                                                            className="text-sm font-semibold truncate max-w-48"
                                                            style={{ color: "#f1f5f9" }}
                                                        >
                                                            {item.title}
                                                        </p>
                                                        <p className="text-xs mt-0.5" style={{ color: "#94a3b8" }}>
                                                            {item.brand}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Category */}
                                            <td className="px-6 py-4">
                                                <span
                                                    className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full"
                                                    style={{
                                                        backgroundColor: "rgba(99,102,241,0.15)",
                                                        color: "#6366f1",
                                                        border: "1px solid rgba(99,102,241,0.3)",
                                                    }}
                                                >
                                                    <Tag size={10} />
                                                    {item.category}
                                                </span>
                                            </td>

                                            {/* Price */}
                                            <td className="px-6 py-4">
                                                <span className="text-sm font-bold" style={{ color: "#6366f1" }}>
                                                    ${item.price.toFixed(2)}
                                                </span>
                                            </td>

                                            {/* Rating */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-1.5">
                                                    <Star size={13} fill="#f59e0b" style={{ color: "#f59e0b" }} />
                                                    <span className="text-sm font-medium" style={{ color: "#f1f5f9" }}>
                                                        {item.rating > 0 ? item.rating : "—"}
                                                    </span>
                                                </div>
                                            </td>

                                            {/* Source */}
                                            <td className="px-6 py-4">
                                                <span
                                                    className="text-xs font-medium px-2.5 py-1 rounded-full"
                                                    style={
                                                        item.addedBy
                                                            ? {
                                                                backgroundColor: "rgba(34,197,94,0.1)",
                                                                color: "#22c55e",
                                                                border: "1px solid rgba(34,197,94,0.3)",
                                                            }
                                                            : {
                                                                backgroundColor: "rgba(34,211,238,0.1)",
                                                                color: "#22d3ee",
                                                                border: "1px solid rgba(34,211,238,0.3)",
                                                            }
                                                    }
                                                >
                                                    {item.addedBy ? "Admin Added" : "Seed"}
                                                </span>
                                            </td>

                                            {/* Actions */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <Link
                                                        href={`/items/${item.id}`}
                                                        style={{
                                                            backgroundColor: "rgba(99,102,241,0.1)",
                                                            color: "#6366f1",
                                                            border: "1px solid rgba(99,102,241,0.3)",
                                                        }}
                                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all"
                                                    >
                                                        <Eye size={12} />
                                                        View
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(item)}
                                                        disabled={!item.addedBy}
                                                        style={
                                                            item.addedBy
                                                                ? {
                                                                    backgroundColor: "rgba(239,68,68,0.1)",
                                                                    color: "#ef4444",
                                                                    border: "1px solid rgba(239,68,68,0.3)",
                                                                }
                                                                : {
                                                                    backgroundColor: "rgba(51,65,85,0.3)",
                                                                    color: "#475569",
                                                                    border: "1px solid #334155",
                                                                    cursor: "not-allowed",
                                                                }
                                                        }
                                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:bg-red-600 hover:text-white hover:border-red-600 disabled:hover:bg-transparent disabled:hover:text-slate-500 disabled:hover:border-slate-700"
                                                    >
                                                        <Trash2 size={12} />
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile cards */}
                        <div className="md:hidden space-y-4">
                            {items.map((item) => (
                                <div
                                    key={item.id}
                                    style={{ backgroundColor: "#1e293b", border: "1px solid #334155" }}
                                    className="rounded-2xl p-4"
                                >
                                    <div className="flex items-start gap-3 mb-4">
                                        <div
                                            className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0"
                                            style={{ border: "1px solid #334155" }}
                                        >
                                            <Image
                                                src={item.imageUrl}
                                                alt={item.title}
                                                fill
                                                className="object-cover"
                                                unoptimized={!!item.addedBy}
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p
                                                className="text-sm font-semibold truncate"
                                                style={{ color: "#f1f5f9" }}
                                            >
                                                {item.title}
                                            </p>
                                            <p className="text-xs mt-0.5" style={{ color: "#94a3b8" }}>
                                                {item.brand}
                                            </p>
                                            <div className="flex items-center gap-2 mt-2">
                                                <span
                                                    className="text-xs font-medium px-2 py-0.5 rounded-full"
                                                    style={{
                                                        backgroundColor: "rgba(99,102,241,0.15)",
                                                        color: "#6366f1",
                                                    }}
                                                >
                                                    {item.category}
                                                </span>
                                                <span
                                                    className="text-xs font-medium px-2 py-0.5 rounded-full"
                                                    style={
                                                        item.addedBy
                                                            ? { backgroundColor: "rgba(34,197,94,0.1)", color: "#22c55e" }
                                                            : { backgroundColor: "rgba(34,211,238,0.1)", color: "#22d3ee" }
                                                    }
                                                >
                                                    {item.addedBy ? "Admin Added" : "Seed"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        className="flex items-center justify-between py-3"
                                        style={{ borderTop: "1px solid #334155" }}
                                    >
                                        <div className="flex items-center gap-4">
                                            <span className="text-sm font-bold" style={{ color: "#6366f1" }}>
                                                ${item.price.toFixed(2)}
                                            </span>
                                            {item.rating > 0 && (
                                                <span className="flex items-center gap-1 text-sm" style={{ color: "#f59e0b" }}>
                                                    <Star size={12} fill="#f59e0b" />
                                                    {item.rating}
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Link
                                                href={`/items/${item.id}`}
                                                style={{
                                                    backgroundColor: "rgba(99,102,241,0.1)",
                                                    color: "#6366f1",
                                                    border: "1px solid rgba(99,102,241,0.3)",
                                                }}
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
                                            >
                                                <Eye size={12} />
                                                View
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(item)}
                                                disabled={!item.addedBy}
                                                style={
                                                    item.addedBy
                                                        ? {
                                                            backgroundColor: "rgba(239,68,68,0.1)",
                                                            color: "#ef4444",
                                                            border: "1px solid rgba(239,68,68,0.3)",
                                                        }
                                                        : {
                                                            backgroundColor: "rgba(51,65,85,0.3)",
                                                            color: "#475569",
                                                            border: "1px solid #334155",
                                                            cursor: "not-allowed",
                                                        }
                                                }
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
                                            >
                                                <Trash2 size={12} />
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* Delete modal */}
            {deleteTarget && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center px-4"
                    style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
                >
                    <div
                        style={{ backgroundColor: "#1e293b", border: "1px solid #334155" }}
                        className="w-full max-w-md rounded-2xl p-6 shadow-2xl"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                                    style={{ backgroundColor: "rgba(239,68,68,0.15)" }}
                                >
                                    <AlertTriangle size={20} style={{ color: "#ef4444" }} />
                                </div>
                                <h3 className="text-base font-bold" style={{ color: "#f1f5f9" }}>
                                    Delete Gadget
                                </h3>
                            </div>
                            <button
                                onClick={() => setDeleteTarget(null)}
                                style={{ color: "#94a3b8" }}
                                className="hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <p className="text-sm mb-2" style={{ color: "#94a3b8" }}>
                            Are you sure you want to delete:
                        </p>
                        <p className="text-sm font-semibold mb-2" style={{ color: "#f1f5f9" }}>
                            &ldquo;{deleteTarget.title}&rdquo;
                        </p>
                        <p className="text-xs mb-6" style={{ color: "#94a3b8" }}>
                            This action cannot be undone.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={confirmDelete}
                                style={{ backgroundColor: "#ef4444" }}
                                className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-opacity"
                            >
                                Yes, Delete
                            </button>
                            <button
                                onClick={() => setDeleteTarget(null)}
                                style={{ color: "#94a3b8", border: "1px solid #334155" }}
                                className="flex-1 py-2.5 rounded-xl text-sm font-medium hover:text-white hover:border-indigo-500 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}