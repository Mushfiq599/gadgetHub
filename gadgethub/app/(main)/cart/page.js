"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import toast from "react-hot-toast";
import {
    ShoppingCart,
    Trash2,
    ArrowLeft,
    ArrowRight,
    Package,
    Tag,
    Loader2,
    Zap,
} from "lucide-react";
import { FiShoppingCart } from "react-icons/fi";

export default function CartPage() {
    const { user, loading: authLoading } = useProtectedRoute();
    const { cartItems, cartTotal, cartCount, updateQuantity, removeFromCart, clearCart } = useCart();
    const router = useRouter();

    const [placingOrder, setPlacingOrder] = useState(false);

    const handlePlaceOrder = async () => {
        if (cartItems.length === 0) return;
        setPlacingOrder(true);

        await new Promise((r) => setTimeout(r, 1200));

        // Build order object
        const order = {
            orderId: `ORD-${Date.now()}`,
            items: cartItems,
            total: cartTotal,
            itemCount: cartCount,
            status: "Confirmed",
            date: new Date().toISOString().split("T")[0],
            userEmail: user.email,
            userId: user.uid,
        };

        // Save to localStorage
        const existing = JSON.parse(
            localStorage.getItem("gadgethub_orders") || "[]"
        );
        existing.unshift(order);
        localStorage.setItem("gadgethub_orders", JSON.stringify(existing));

        // Clear cart
        clearCart();
        setPlacingOrder(false);

        toast.success("Order placed successfully!");
        router.push("/orders");
    };

    // Auth loading
    if (authLoading) {
        return (
            <div
                style={{ backgroundColor: "#0f172a", minHeight: "100vh" }}
                className="flex items-center justify-center"
            >
                <Loader2 size={32} className="animate-spin" style={{ color: "#6366f1" }} />
            </div>
        );
    }

    if (!user) return null;

    const shipping = cartTotal > 100 ? 0 : 9.99;
    const tax = parseFloat((cartTotal * 0.08).toFixed(2));
    const grandTotal = parseFloat((cartTotal + shipping + tax).toFixed(2));

    return (
        <div style={{ backgroundColor: "#0f172a", minHeight: "100vh" }}>

            {/* Header */}
            <div
                style={{ backgroundColor: "#0a1120", borderBottom: "1px solid #1e293b" }}
                className="py-12"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center"
                            style={{ backgroundColor: "rgba(99,102,241,0.15)" }}
                        >
                            <FiShoppingCart size={20} style={{ color: "#6366f1" }} />
                        </div>
                        <div>
                            <p
                                className="text-xs font-medium uppercase tracking-wider"
                                style={{ color: "#6366f1" }}
                            >
                                My Cart
                            </p>
                            <h1 className="text-2xl font-bold" style={{ color: "#f1f5f9" }}>
                                Shopping Cart
                            </h1>
                        </div>
                    </div>
                    <p className="text-sm mt-1" style={{ color: "#94a3b8" }}>
                        {cartCount === 0
                            ? "Your cart is empty"
                            : `${cartCount} item${cartCount > 1 ? "s" : ""} in your cart`}
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

                {cartItems.length === 0 ? (
                    /* ── Empty state ── */
                    <div className="flex flex-col items-center justify-center py-28 text-center">
                        <div
                            className="w-20 h-20 rounded-2xl flex items-center justify-center mb-5"
                            style={{ backgroundColor: "#1e293b", border: "1px solid #334155" }}
                        >
                            <ShoppingCart size={36} style={{ color: "#334155" }} />
                        </div>
                        <h3 className="text-xl font-bold mb-2" style={{ color: "#f1f5f9" }}>
                            Your cart is empty
                        </h3>
                        <p className="text-sm mb-8 max-w-sm" style={{ color: "#94a3b8" }}>
                            Looks like you haven&apos;t added anything yet. Browse our gadgets and find something you love.
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
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* ── Cart items ── */}
                        <div className="lg:col-span-2 space-y-4">

                            {/* Back link + clear cart */}
                            <div className="flex items-center justify-between mb-2">
                                <Link
                                    href="/items"
                                    className="inline-flex items-center gap-1.5 text-sm font-medium hover:text-white transition-colors"
                                    style={{ color: "#94a3b8" }}
                                >
                                    <ArrowLeft size={14} />
                                    Continue Shopping
                                </Link>
                                <button
                                    onClick={() => {
                                        clearCart();
                                        toast.success("Cart cleared");
                                    }}
                                    className="text-xs font-medium hover:opacity-80 transition-opacity"
                                    style={{ color: "#ef4444" }}
                                >
                                    Clear All
                                </button>
                            </div>

                            {/* Items list */}
                            {cartItems.map((item) => (
                                <div
                                    key={item.id}
                                    style={{
                                        backgroundColor: "#1e293b",
                                        border: "1px solid #334155",
                                    }}
                                    className="rounded-2xl p-4 sm:p-5"
                                >
                                    <div className="flex gap-4">

                                        {/* Image */}
                                        <Link href={`/items/${item.id}`} className="flex-shrink-0">
                                            <div
                                                className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden"
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
                                        </Link>

                                        {/* Details */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-2">
                                                <div className="min-w-0">
                                                    <span
                                                        className="text-xs font-semibold px-2 py-0.5 rounded-full inline-block mb-1"
                                                        style={{
                                                            backgroundColor: "rgba(99,102,241,0.15)",
                                                            color: "#6366f1",
                                                        }}
                                                    >
                                                        {item.category}
                                                    </span>
                                                    <Link href={`/items/${item.id}`}>
                                                        <h3
                                                            className="font-bold text-sm sm:text-base leading-snug hover:text-indigo-400 transition-colors truncate"
                                                            style={{ color: "#f1f5f9" }}
                                                        >
                                                            {item.title}
                                                        </h3>
                                                    </Link>
                                                    <p className="text-xs mt-0.5" style={{ color: "#94a3b8" }}>
                                                        {item.brand}
                                                    </p>
                                                </div>

                                                {/* Remove */}
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="flex-shrink-0 p-1.5 rounded-lg transition-colors hover:bg-red-500/10"
                                                    style={{ color: "#ef4444" }}
                                                >
                                                    <Trash2 size={15} />
                                                </button>
                                            </div>

                                            {/* Price + qty row */}
                                            <div className="flex items-center justify-between mt-3 pt-3" style={{ borderTop: "1px solid #334155" }}>
                                                <span className="font-extrabold text-base" style={{ color: "#6366f1" }}>
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                    {item.quantity > 1 && (
                                                        <span className="text-xs font-normal ml-1" style={{ color: "#94a3b8" }}>
                                                            (${item.price.toFixed(2)} each)
                                                        </span>
                                                    )}
                                                </span>

                                                {/* Qty controls */}
                                                <div
                                                    className="flex items-center rounded-xl overflow-hidden"
                                                    style={{ border: "1px solid #334155" }}
                                                >
                                                    <button
                                                        onClick={() => {
                                                            if (item.quantity === 1) {
                                                                removeFromCart(item.id);
                                                            } else {
                                                                updateQuantity(item.id, item.quantity - 1);
                                                            }
                                                        }}
                                                        className="w-9 h-9 flex items-center justify-center text-lg font-bold transition-colors hover:bg-white/5"
                                                        style={{ color: "#94a3b8" }}
                                                    >
                                                        −
                                                    </button>
                                                    <span
                                                        className="w-9 text-center text-sm font-bold"
                                                        style={{ color: "#f1f5f9" }}
                                                    >
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="w-9 h-9 flex items-center justify-center text-lg font-bold transition-colors hover:bg-white/5"
                                                        style={{ color: "#94a3b8" }}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* ── Order summary ── */}
                        <div className="lg:col-span-1">
                            <div
                                style={{
                                    backgroundColor: "#1e293b",
                                    border: "1px solid #334155",
                                }}
                                className="rounded-2xl p-6 sticky top-24"
                            >
                                <h2 className="text-lg font-bold mb-6" style={{ color: "#f1f5f9" }}>
                                    Order Summary
                                </h2>

                                {/* Line items */}
                                <div className="space-y-3 mb-5">
                                    <div className="flex items-center justify-between text-sm">
                                        <span style={{ color: "#94a3b8" }}>
                                            Subtotal ({cartCount} item{cartCount > 1 ? "s" : ""})
                                        </span>
                                        <span style={{ color: "#f1f5f9" }} className="font-medium">
                                            ${cartTotal.toFixed(2)}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span style={{ color: "#94a3b8" }}>Shipping</span>
                                        {shipping === 0 ? (
                                            <span style={{ color: "#22c55e" }} className="font-semibold">
                                                Free
                                            </span>
                                        ) : (
                                            <span style={{ color: "#f1f5f9" }} className="font-medium">
                                                ${shipping.toFixed(2)}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span style={{ color: "#94a3b8" }}>Tax (8%)</span>
                                        <span style={{ color: "#f1f5f9" }} className="font-medium">
                                            ${tax.toFixed(2)}
                                        </span>
                                    </div>

                                    {/* Free shipping notice */}
                                    {shipping > 0 && (
                                        <div
                                            className="text-xs px-3 py-2 rounded-lg"
                                            style={{
                                                backgroundColor: "rgba(34,197,94,0.08)",
                                                color: "#22c55e",
                                                border: "1px solid rgba(34,197,94,0.2)",
                                            }}
                                        >
                                            Add ${(100 - cartTotal).toFixed(2)} more for free shipping!
                                        </div>
                                    )}
                                </div>

                                {/* Divider */}
                                <div style={{ borderTop: "1px solid #334155" }} className="pt-4 mb-6">
                                    <div className="flex items-center justify-between">
                                        <span className="font-bold text-base" style={{ color: "#f1f5f9" }}>
                                            Total
                                        </span>
                                        <span className="font-extrabold text-xl" style={{ color: "#6366f1" }}>
                                            ${grandTotal.toFixed(2)}
                                        </span>
                                    </div>
                                </div>

                                {/* Place order button */}
                                <button
                                    onClick={handlePlaceOrder}
                                    disabled={placingOrder}
                                    style={{ backgroundColor: "#6366f1" }}
                                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed mb-3"
                                >
                                    {placingOrder ? (
                                        <>
                                            <Loader2 size={16} className="animate-spin" />
                                            Placing Order...
                                        </>
                                    ) : (
                                        <>
                                            <Zap size={16} />
                                            Place Order
                                        </>
                                    )}
                                </button>

                                {/* Continue shopping */}
                                <Link
                                    href="/items"
                                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-colors hover:text-white hover:border-indigo-500"
                                    style={{ color: "#94a3b8", border: "1px solid #334155" }}
                                >
                                    <ArrowLeft size={14} />
                                    Continue Shopping
                                </Link>

                                {/* Trust badges */}
                                <div
                                    className="mt-6 pt-5 space-y-2"
                                    style={{ borderTop: "1px solid #334155" }}
                                >
                                    {[
                                        { icon: Package, text: "Free shipping over $100" },
                                        { icon: ShoppingCart, text: "Secure checkout" },
                                        { icon: Tag, text: "Best price guaranteed" },
                                    ].map(({ icon: Icon, text }) => (
                                        <div
                                            key={text}
                                            className="flex items-center gap-2 text-xs"
                                            style={{ color: "#94a3b8" }}
                                        >
                                            <Icon size={13} style={{ color: "#6366f1" }} />
                                            {text}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}