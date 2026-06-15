"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import {
    Package,
    ArrowRight,
    ChevronDown,
    ChevronUp,
    ShoppingCart,
    Calendar,
    Hash,
    Loader2,
    CheckCircle2,
    Clock,
    Truck,
} from "lucide-react";
import { FiPackage } from "react-icons/fi";

const STATUS_STYLES = {
    Confirmed: {
        bg: "rgba(99,102,241,0.12)",
        color: "#6366f1",
        border: "1px solid rgba(99,102,241,0.3)",
        icon: CheckCircle2,
    },
    Processing: {
        bg: "rgba(245,158,11,0.12)",
        color: "#f59e0b",
        border: "1px solid rgba(245,158,11,0.3)",
        icon: Clock,
    },
    Shipped: {
        bg: "rgba(34,211,238,0.12)",
        color: "#22d3ee",
        border: "1px solid rgba(34,211,238,0.3)",
        icon: Truck,
    },
    Delivered: {
        bg: "rgba(34,197,94,0.12)",
        color: "#22c55e",
        border: "1px solid rgba(34,197,94,0.3)",
        icon: Package,
    },
};

function StatusBadge({ status }) {
    const style = STATUS_STYLES[status] || STATUS_STYLES.Confirmed;
    const Icon = style.icon;
    return (
        <span
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full"
            style={{
                backgroundColor: style.bg,
                color: style.color,
                border: style.border,
            }}
        >
            <Icon size={11} />
            {status}
        </span>
    );
}

function OrderCard({ order }) {
    const [expanded, setExpanded] = useState(false);

    return (
        <div
            style={{
                backgroundColor: "#1e293b",
                border: "1px solid #334155",
            }}
            className="rounded-2xl overflow-hidden"
        >
            {/* ── Order header ── */}
            <div className="p-5 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                    {/* Left — order info */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                        {/* Order ID */}
                        <div className="flex items-center gap-2">
                            <Hash size={14} style={{ color: "#94a3b8" }} />
                            <span className="text-sm font-bold" style={{ color: "#f1f5f9" }}>
                                {order.orderId}
                            </span>
                        </div>

                        {/* Date */}
                        <div className="flex items-center gap-2">
                            <Calendar size={13} style={{ color: "#94a3b8" }} />
                            <span className="text-sm" style={{ color: "#94a3b8" }}>
                                {new Date(order.date).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </span>
                        </div>

                        {/* Item count */}
                        <div className="flex items-center gap-2">
                            <ShoppingCart size={13} style={{ color: "#94a3b8" }} />
                            <span className="text-sm" style={{ color: "#94a3b8" }}>
                                {order.itemCount} item{order.itemCount > 1 ? "s" : ""}
                            </span>
                        </div>
                    </div>

                    {/* Right — status + total */}
                    <div className="flex items-center gap-3 flex-wrap">
                        <StatusBadge status={order.status} />
                        <span className="font-extrabold text-lg" style={{ color: "#6366f1" }}>
                            ${order.total.toFixed(2)}
                        </span>
                    </div>
                </div>

                {/* Preview images */}
                <div className="flex items-center gap-2 mt-4">
                    <div className="flex -space-x-2">
                        {order.items.slice(0, 4).map((item, i) => (
                            <div
                                key={i}
                                className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0"
                                style={{
                                    border: "2px solid #1e293b",
                                    zIndex: order.items.length - i,
                                }}
                            >
                                <Image
                                    src={item.imageUrl}
                                    alt={item.title}
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />
                            </div>
                        ))}
                        {order.items.length > 4 && (
                            <div
                                className="relative w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                                style={{
                                    backgroundColor: "#0f172a",
                                    border: "2px solid #334155",
                                    color: "#94a3b8",
                                    zIndex: 0,
                                }}
                            >
                                +{order.items.length - 4}
                            </div>
                        )}
                    </div>
                    <span className="text-xs ml-2" style={{ color: "#94a3b8" }}>
                        {order.items.map((i) => i.title).slice(0, 2).join(", ")}
                        {order.items.length > 2 && ` +${order.items.length - 2} more`}
                    </span>
                </div>

                {/* Expand button */}
                <button
                    onClick={() => setExpanded((p) => !p)}
                    className="mt-4 flex items-center gap-1.5 text-xs font-semibold transition-colors hover:text-white"
                    style={{ color: "#6366f1" }}
                >
                    {expanded ? (
                        <><ChevronUp size={14} /> Hide Details</>
                    ) : (
                        <><ChevronDown size={14} /> View Details</>
                    )}
                </button>
            </div>

            {/* ── Expanded items ── */}
            {expanded && (
                <div style={{ borderTop: "1px solid #334155" }}>
                    {/* Items list */}
                    <div className="p-5 sm:p-6 space-y-4">
                        {order.items.map((item, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-4"
                            >
                                {/* Image */}
                                <div
                                    className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0"
                                    style={{ border: "1px solid #334155" }}
                                >
                                    <Image
                                        src={item.imageUrl}
                                        alt={item.title}
                                        fill
                                        className="object-cover"
                                        unoptimized
                                    />
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <Link href={`/items/${item.id}`}>
                                        <p
                                            className="text-sm font-semibold truncate hover:text-indigo-400 transition-colors"
                                            style={{ color: "#f1f5f9" }}
                                        >
                                            {item.title}
                                        </p>
                                    </Link>
                                    <p className="text-xs mt-0.5" style={{ color: "#94a3b8" }}>
                                        {item.brand} · {item.category}
                                    </p>
                                </div>

                                {/* Qty + price */}
                                <div className="text-right flex-shrink-0">
                                    <p className="text-sm font-bold" style={{ color: "#6366f1" }}>
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </p>
                                    <p className="text-xs mt-0.5" style={{ color: "#94a3b8" }}>
                                        Qty: {item.quantity} × ${item.price.toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order totals */}
                    <div
                        className="px-5 sm:px-6 py-4 space-y-2"
                        style={{ borderTop: "1px solid #334155", backgroundColor: "rgba(15,23,42,0.5)" }}
                    >
                        <div className="flex justify-between text-sm">
                            <span style={{ color: "#94a3b8" }}>Subtotal</span>
                            <span style={{ color: "#f1f5f9" }}>
                                ${order.items.reduce((s, i) => s + i.price * i.quantity, 0).toFixed(2)}
                            </span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span style={{ color: "#94a3b8" }}>Shipping</span>
                            <span style={{ color: order.total > 108 ? "#22c55e" : "#f1f5f9" }}>
                                {order.total > 108 ? "Free" : "$9.99"}
                            </span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span style={{ color: "#94a3b8" }}>Tax (8%)</span>
                            <span style={{ color: "#f1f5f9" }}>
                                ${(order.items.reduce((s, i) => s + i.price * i.quantity, 0) * 0.08).toFixed(2)}
                            </span>
                        </div>
                        <div
                            className="flex justify-between pt-2"
                            style={{ borderTop: "1px solid #334155" }}
                        >
                            <span className="font-bold" style={{ color: "#f1f5f9" }}>Total</span>
                            <span className="font-extrabold text-lg" style={{ color: "#6366f1" }}>
                                ${order.total.toFixed(2)}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function OrdersPage() {
    const { user, loading } = useProtectedRoute();
    const [orders, setOrders] = useState([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        if (!user) return;
        const all = JSON.parse(
            localStorage.getItem("gadgethub_orders") || "[]"
        );
        // Only show this user's orders
        const userOrders = all.filter((o) => o.userId === user.uid);
        setOrders(userOrders);
        setMounted(true);
    }, [user]);

    // Loading
    if (loading || !mounted) {
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

    if (!user) return null;

    const totalSpent = orders.reduce((s, o) => s + o.total, 0);
    const totalItems = orders.reduce((s, o) => s + o.itemCount, 0);

    return (
        <div style={{ backgroundColor: "#0f172a", minHeight: "100vh" }}>

            {/* ── Header ── */}
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
                                <FiPackage size={20} style={{ color: "#6366f1" }} />
                            </div>
                            <div>
                                <p
                                    className="text-xs font-medium uppercase tracking-wider"
                                    style={{ color: "#6366f1" }}
                                >
                                    My Orders
                                </p>
                                <h1 className="text-2xl font-bold" style={{ color: "#f1f5f9" }}>
                                    Order History
                                </h1>
                            </div>
                        </div>
                        <Link
                            href="/items"
                            style={{ backgroundColor: "#6366f1" }}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-opacity self-start sm:self-auto"
                        >
                            Shop More
                            <ArrowRight size={15} />
                        </Link>
                    </div>

                    {/* Stats */}
                    {orders.length > 0 && (
                        <div className="flex flex-wrap gap-4 mt-6">
                            {[
                                { label: "Total Orders", value: orders.length, color: "#6366f1" },
                                { label: "Items Ordered", value: totalItems, color: "#22d3ee" },
                                { label: "Total Spent", value: `$${totalSpent.toFixed(2)}`, color: "#22c55e" },
                            ].map((stat) => (
                                <div
                                    key={stat.label}
                                    style={{
                                        backgroundColor: "#1e293b",
                                        border: "1px solid #334155",
                                    }}
                                    className="flex items-center gap-3 px-5 py-3 rounded-xl"
                                >
                                    <span
                                        className="text-xl font-extrabold"
                                        style={{ color: stat.color }}
                                    >
                                        {stat.value}
                                    </span>
                                    <span className="text-sm" style={{ color: "#94a3b8" }}>
                                        {stat.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* ── Orders list ── */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {orders.length === 0 ? (
                    /* Empty state */
                    <div className="flex flex-col items-center justify-center py-28 text-center">
                        <div
                            className="w-20 h-20 rounded-2xl flex items-center justify-center mb-5"
                            style={{
                                backgroundColor: "#1e293b",
                                border: "1px solid #334155",
                            }}
                        >
                            <Package size={36} style={{ color: "#334155" }} />
                        </div>
                        <h3
                            className="text-xl font-bold mb-2"
                            style={{ color: "#f1f5f9" }}
                        >
                            No orders yet
                        </h3>
                        <p
                            className="text-sm mb-8 max-w-sm"
                            style={{ color: "#94a3b8" }}
                        >
                            You haven&apos;t placed any orders yet. Browse our gadgets and
                            find something you love.
                        </p>
                        <Link
                            href="/items"
                            style={{ backgroundColor: "#6366f1" }}
                            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-opacity"
                        >
                            Browse Gadgets
                            <ArrowRight size={16} />
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <p className="text-sm mb-6" style={{ color: "#94a3b8" }}>
                            Showing{" "}
                            <span style={{ color: "#f1f5f9" }} className="font-medium">
                                {orders.length}
                            </span>{" "}
                            order{orders.length > 1 ? "s" : ""} — most recent first
                        </p>
                        {orders.map((order) => (
                            <OrderCard key={order.orderId} order={order} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}