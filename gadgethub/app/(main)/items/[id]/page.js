"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { getGadgetById, getRelatedGadgets, gadgets as seedGadgets } from "@/lib/data";
import GadgetCard from "@/components/GadgetCard";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import {
    ArrowLeft,
    Star,
    Tag,
    Cpu,
    CheckCircle2,
    Loader2,
    ShoppingCart,
    Zap,
} from "lucide-react";

export default function ItemDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const { user, role } = useAuth();
    const { addToCart, cartItems } = useCart();

    const [gadget, setGadget] = useState(null);
    const [related, setRelated] = useState([]);
    const [loading, setLoading] = useState(true);
    const [qty, setQty] = useState(1);
    const [adding, setAdding] = useState(false);

    // Check if already in cart
    const inCart = cartItems.some((item) => item.id === id);

    useEffect(() => {
        if (!id) return;

        // Check seed data first
        let found = getGadgetById(id);

        // Then check localStorage
        if (!found) {
            const stored = JSON.parse(
                localStorage.getItem("gadgethub_items") || "[]"
            );
            found = stored.find((g) => g.id === id);
        }

        if (!found) { setLoading(false); return; }

        setGadget(found);

        // Related items
        const stored = JSON.parse(
            localStorage.getItem("gadgethub_items") || "[]"
        );
        const allGadgets = [...seedGadgets, ...stored];
        const relatedItems = allGadgets
            .filter((g) => g.category === found.category && g.id !== found.id)
            .slice(0, 3);
        setRelated(relatedItems);
        setLoading(false);
    }, [id]);

    const handleAddToCart = async () => {
        if (!user) return;
        setAdding(true);
        await new Promise((r) => setTimeout(r, 500)); // small UX delay
        addToCart(gadget, qty);
        setAdding(false);
    };

    const renderStars = (rating) =>
        Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                size={16}
                fill={i < Math.floor(rating) ? "#f59e0b" : "none"}
                style={{ color: "#f59e0b" }}
            />
        ));

    // ── Loading ──
    if (loading) {
        return (
            <div
                style={{ backgroundColor: "#0f172a", minHeight: "100vh" }}
                className="flex items-center justify-center"
            >
                <Loader2 size={32} className="animate-spin" style={{ color: "#6366f1" }} />
            </div>
        );
    }

    // ── Not found ──
    if (!gadget) {
        return (
            <div
                style={{ backgroundColor: "#0f172a", minHeight: "100vh" }}
                className="flex flex-col items-center justify-center text-center px-4"
            >
                <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: "#1e293b" }}
                >
                    <Tag size={28} style={{ color: "#334155" }} />
                </div>
                <h2 className="text-xl font-bold mb-2" style={{ color: "#f1f5f9" }}>
                    Gadget not found
                </h2>
                <p className="text-sm mb-6" style={{ color: "#94a3b8" }}>
                    This item may have been deleted or the link is invalid.
                </p>
                <Link
                    href="/items"
                    style={{ backgroundColor: "#6366f1" }}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-opacity"
                >
                    <ArrowLeft size={15} />
                    Back to Items
                </Link>
            </div>
        );
    }

    return (
        <div style={{ backgroundColor: "#0f172a", minHeight: "100vh" }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

                {/* Back */}
                <Link
                    href="/items"
                    style={{ color: "#94a3b8", border: "1px solid #334155" }}
                    className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl mb-8 hover:text-white hover:border-indigo-500 transition-colors"
                >
                    <ArrowLeft size={15} />
                    Back to Items
                </Link>

                {/* ── Main card ── */}
                <div
                    style={{ backgroundColor: "#1e293b", border: "1px solid #334155" }}
                    className="rounded-2xl overflow-hidden mb-10"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2">

                        {/* Image */}
                        <div
                            className="relative h-72 lg:h-full min-h-96"
                            style={{ backgroundColor: "#0f172a" }}
                        >
                            <Image
                                src={gadget.imageUrl}
                                alt={gadget.title}
                                fill
                                className="object-cover"
                                priority
                                unoptimized={!!gadget.addedBy}
                            />
                            <div
                                className="absolute inset-0 lg:hidden"
                                style={{ background: "linear-gradient(to top, #1e293b 0%, transparent 60%)" }}
                            />
                        </div>

                        {/* Info */}
                        <div className="p-8 lg:p-10 flex flex-col">

                            {/* Badges */}
                            <div className="flex flex-wrap items-center gap-2 mb-4">
                                <span
                                    className="text-xs font-semibold px-3 py-1 rounded-full"
                                    style={{
                                        backgroundColor: "rgba(99,102,241,0.15)",
                                        color: "#6366f1",
                                        border: "1px solid rgba(99,102,241,0.3)",
                                    }}
                                >
                                    {gadget.category}
                                </span>
                                <span
                                    className="text-xs font-medium px-3 py-1 rounded-full"
                                    style={{
                                        backgroundColor: "rgba(30,41,59,0.8)",
                                        color: "#94a3b8",
                                        border: "1px solid #334155",
                                    }}
                                >
                                    {gadget.brand}
                                </span>
                                {gadget.addedBy && (
                                    <span
                                        className="text-xs font-medium px-3 py-1 rounded-full"
                                        style={{
                                            backgroundColor: "rgba(34,197,94,0.1)",
                                            color: "#22c55e",
                                            border: "1px solid rgba(34,197,94,0.3)",
                                        }}
                                    >
                                        Your item
                                    </span>
                                )}
                            </div>

                            {/* Title */}
                            <h1
                                className="text-2xl sm:text-3xl font-extrabold mb-3 leading-tight"
                                style={{ color: "#f1f5f9" }}
                            >
                                {gadget.title}
                            </h1>

                            {/* Stars */}
                            <div className="flex items-center gap-3 mb-5">
                                <div className="flex items-center gap-0.5">
                                    {renderStars(gadget.rating)}
                                </div>
                                <span className="text-sm font-semibold" style={{ color: "#f59e0b" }}>
                                    {gadget.rating > 0 ? gadget.rating : "No rating"}
                                </span>
                                {gadget.rating > 0 && (
                                    <span className="text-sm" style={{ color: "#94a3b8" }}>out of 5</span>
                                )}
                            </div>

                            {/* Price */}
                            <div
                                className="mb-6 pb-6"
                                style={{ borderBottom: "1px solid #334155" }}
                            >
                                <span className="text-4xl font-extrabold" style={{ color: "#6366f1" }}>
                                    ${gadget.price.toFixed(2)}
                                </span>
                            </div>

                            {/* Short description */}
                            <p className="text-sm font-semibold mb-1 uppercase tracking-wide" style={{ color: "#94a3b8" }}>
                                Overview
                            </p>
                            <p className="text-sm leading-relaxed mb-6" style={{ color: "#cbd5e1" }}>
                                {gadget.shortDescription}
                            </p>

                            {/* ── Cart section — only for logged-in users ── */}
                            {user && role === "user" && (
                                <div
                                    className="mb-6 p-4 rounded-2xl"
                                    style={{ backgroundColor: "#0f172a", border: "1px solid #334155" }}
                                >
                                    {inCart ? (
                                        // Already in cart state
                                        <div className="flex flex-col sm:flex-row items-center gap-3">
                                            <div
                                                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold flex-1 justify-center"
                                                style={{
                                                    backgroundColor: "rgba(34,197,94,0.12)",
                                                    color: "#22c55e",
                                                    border: "1px solid rgba(34,197,94,0.3)",
                                                }}
                                            >
                                                <CheckCircle2 size={16} />
                                                Added to Cart
                                            </div>
                                            <Link
                                                href="/cart"
                                                style={{ backgroundColor: "#6366f1" }}
                                                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-opacity"
                                            >
                                                <ShoppingCart size={15} />
                                                View Cart
                                            </Link>
                                        </div>
                                    ) : (
                                        // Add to cart state
                                        <div className="flex flex-col sm:flex-row items-center gap-3">
                                            {/* Qty selector */}
                                            <div
                                                className="flex items-center rounded-xl overflow-hidden"
                                                style={{ border: "1px solid #334155" }}
                                            >
                                                <button
                                                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                                                    className="w-10 h-11 flex items-center justify-center text-lg font-bold transition-colors hover:bg-white/5"
                                                    style={{ color: "#94a3b8" }}
                                                >
                                                    −
                                                </button>
                                                <span
                                                    className="w-10 text-center text-sm font-bold"
                                                    style={{ color: "#f1f5f9" }}
                                                >
                                                    {qty}
                                                </span>
                                                <button
                                                    onClick={() => setQty((q) => q + 1)}
                                                    className="w-10 h-11 flex items-center justify-center text-lg font-bold transition-colors hover:bg-white/5"
                                                    style={{ color: "#94a3b8" }}
                                                >
                                                    +
                                                </button>
                                            </div>

                                            {/* Add to cart button */}
                                            <button
                                                onClick={handleAddToCart}
                                                disabled={adding}
                                                style={{ backgroundColor: "#6366f1" }}
                                                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
                                            >
                                                {adding ? (
                                                    <>
                                                        <Loader2 size={15} className="animate-spin" />
                                                        Adding...
                                                    </>
                                                ) : (
                                                    <>
                                                        <ShoppingCart size={15} />
                                                        Add to Cart
                                                    </>
                                                )}
                                            </button>

                                            {/* Buy now button */}
                                            <button
                                                onClick={async () => {
                                                    if (!adding && !inCart) {
                                                        setAdding(true);
                                                        await new Promise((r) => setTimeout(r, 500));
                                                        addToCart(gadget, qty);
                                                        setAdding(false);
                                                    }
                                                    router.push("/cart");
                                                }}
                                                style={{
                                                    backgroundColor: "rgba(34,197,94,0.12)",
                                                    color: "#22c55e",
                                                    border: "1px solid rgba(34,197,94,0.3)",
                                                }}
                                                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold hover:opacity-80 transition-opacity"
                                            >
                                                <Zap size={14} />
                                                Buy Now
                                            </button>
                                        </div>
                                    )}

                                    {/* Subtotal when qty > 1 */}
                                    {!inCart && qty > 1 && (
                                        <p className="text-xs text-center mt-3" style={{ color: "#94a3b8" }}>
                                            Subtotal:{" "}
                                            <span style={{ color: "#6366f1" }} className="font-bold">
                                                ${(gadget.price * qty).toFixed(2)}
                                            </span>
                                        </p>
                                    )}
                                </div>
                            )}

                            {/* Not logged in prompt */}
                            {!user && (
                                <div
                                    className="mb-6 p-4 rounded-2xl flex items-center justify-between gap-4"
                                    style={{ backgroundColor: "#0f172a", border: "1px solid #334155" }}
                                >
                                    <p className="text-sm" style={{ color: "#94a3b8" }}>
                                        Sign in to add this item to your cart
                                    </p>
                                    <Link
                                        href="/login"
                                        style={{ backgroundColor: "#6366f1" }}
                                        className="flex-shrink-0 px-4 py-2 rounded-xl text-xs font-bold text-white hover:opacity-90 transition-opacity"
                                    >
                                        Sign In
                                    </Link>
                                </div>
                            )}

                            {/* Meta tiles */}
                            <div className="grid grid-cols-2 gap-3 mt-auto">
                                {[
                                    { icon: Tag, label: "Category", value: gadget.category },
                                    { icon: Cpu, label: "Brand", value: gadget.brand },
                                    { icon: Star, label: "Rating", value: gadget.rating > 0 ? `${gadget.rating} / 5` : "—" },
                                    { icon: CheckCircle2, label: "Added", value: gadget.createdAt },
                                ].map(({ icon: Icon, label, value }) => (
                                    <div
                                        key={label}
                                        style={{ backgroundColor: "#0f172a", border: "1px solid #334155" }}
                                        className="rounded-xl p-3"
                                    >
                                        <div className="flex items-center gap-1.5 mb-1">
                                            <Icon size={12} style={{ color: "#6366f1" }} />
                                            <span
                                                className="text-xs font-medium uppercase tracking-wide"
                                                style={{ color: "#94a3b8" }}
                                            >
                                                {label}
                                            </span>
                                        </div>
                                        <p className="text-sm font-semibold" style={{ color: "#f1f5f9" }}>
                                            {value}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Full description + Specs ── */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-14">

                    <div
                        style={{ backgroundColor: "#1e293b", border: "1px solid #334155" }}
                        className="lg:col-span-2 rounded-2xl p-8"
                    >
                        <h2 className="text-lg font-bold mb-4" style={{ color: "#f1f5f9" }}>
                            Full Description
                        </h2>
                        <p
                            className="text-sm leading-relaxed"
                            style={{ color: "#94a3b8", lineHeight: "1.9" }}
                        >
                            {gadget.fullDescription}
                        </p>
                    </div>

                    <div
                        style={{ backgroundColor: "#1e293b", border: "1px solid #334155" }}
                        className="rounded-2xl p-8"
                    >
                        <h2 className="text-lg font-bold mb-4" style={{ color: "#f1f5f9" }}>
                            Specifications
                        </h2>
                        {gadget.specs && Object.keys(gadget.specs).length > 0 ? (
                            <div className="space-y-3">
                                {Object.entries(gadget.specs).map(([key, value]) => (
                                    <div
                                        key={key}
                                        className="flex flex-col gap-0.5 pb-3"
                                        style={{ borderBottom: "1px solid #334155" }}
                                    >
                                        <span
                                            className="text-xs font-medium uppercase tracking-wide"
                                            style={{ color: "#94a3b8" }}
                                        >
                                            {key}
                                        </span>
                                        <span className="text-sm font-semibold" style={{ color: "#f1f5f9" }}>
                                            {value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm" style={{ color: "#94a3b8" }}>
                                No specifications added for this item.
                            </p>
                        )}
                    </div>
                </div>

                {/* ── Related ── */}
                {related.length > 0 && (
                    <div>
                        <div className="flex items-end justify-between mb-6">
                            <h2 className="text-2xl font-bold" style={{ color: "#f1f5f9" }}>
                                Related Gadgets
                            </h2>
                            <Link
                                href={`/items?category=${gadget.category}`}
                                className="text-sm font-medium hover:opacity-80 transition-opacity"
                                style={{ color: "#6366f1" }}
                            >
                                See all {gadget.category} →
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {related.map((item) => (
                                <GadgetCard key={item.id} gadget={item} />
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}