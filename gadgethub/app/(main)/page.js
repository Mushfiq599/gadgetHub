"use client";

import Link from "next/link";
import Image from "next/image";
import { gadgets } from "@/lib/data";
import {
    ArrowRight,
    Star,
    Zap,
    Shield,
    RefreshCw,
    Headphones,
    Watch,
    Keyboard,
    Gamepad2,
    BatteryCharging,
    Camera,
    Puzzle,
} from "lucide-react";

// ─── Section 1: Hero ───────────────────────────────────────────────
function Hero() {
    return (
        <section
            style={{
                background:
                    "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)",
                borderBottom: "1px solid #1e293b",
            }}
            className="relative overflow-hidden py-24 sm:py-32"
        >
            {/* Background glow */}
            <div
                style={{
                    background:
                        "radial-gradient(ellipse at 50% 50%, rgba(99,102,241,0.15) 0%, transparent 70%)",
                }}
                className="absolute inset-0 pointer-events-none"
            />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-6"
                    style={{ backgroundColor: "rgba(99,102,241,0.15)", color: "#6366f1", border: "1px solid rgba(99,102,241,0.3)" }}
                >
                    <Zap size={12} />
                    New arrivals every week
                </div>

                <h1
                    className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6"
                    style={{ color: "#f1f5f9" }}
                >
                    Discover the{" "}
                    <span
                        style={{
                            background: "linear-gradient(90deg, #6366f1, #22d3ee)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        Future of Tech
                    </span>
                </h1>

                <p
                    className="text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
                    style={{ color: "#94a3b8" }}
                >
                    Curated gadgets handpicked for enthusiasts, professionals, and
                    everyday users. From earbuds to smartwatches — find your next
                    favorite device.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="/items"
                        style={{ backgroundColor: "#6366f1" }}
                        className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-white font-semibold hover:opacity-90 transition-opacity"
                    >
                        Browse Gadgets
                        <ArrowRight size={18} />
                    </Link>
                    <Link
                        href="/about"
                        style={{ color: "#94a3b8", border: "1px solid #334155" }}
                        className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold hover:text-white hover:border-indigo-500 transition-colors"
                    >
                        Learn More
                    </Link>
                </div>

                {/* Stats row */}
                <div className="mt-16 grid grid-cols-3 gap-4 max-w-lg mx-auto">
                    {[
                        { value: "10+", label: "Gadgets" },
                        { value: "7", label: "Categories" },
                        { value: "4.7★", label: "Avg Rating" },
                    ].map((stat) => (
                        <div
                            key={stat.label}
                            style={{ backgroundColor: "rgba(30,41,59,0.6)", border: "1px solid #334155" }}
                            className="rounded-xl py-4 px-3"
                        >
                            <div className="text-2xl font-bold" style={{ color: "#6366f1" }}>
                                {stat.value}
                            </div>
                            <div className="text-xs mt-1" style={{ color: "#94a3b8" }}>
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ─── Section 2: Featured Gadgets ───────────────────────────────────
function FeaturedGadgets() {
    const featured = gadgets.slice(0, 4);

    return (
        <section className="py-20" style={{ backgroundColor: "#0f172a" }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Heading */}
                <div className="flex items-end justify-between mb-10">
                    <div>
                        <p className="text-sm font-medium mb-2" style={{ color: "#6366f1" }}>
                            HAND PICKED
                        </p>
                        <h2 className="text-3xl font-bold" style={{ color: "#f1f5f9" }}>
                            Featured Gadgets
                        </h2>
                    </div>
                    <Link
                        href="/items"
                        className="hidden sm:inline-flex items-center gap-1 text-sm font-medium hover:opacity-80 transition-opacity"
                        style={{ color: "#6366f1" }}
                    >
                        View all <ArrowRight size={15} />
                    </Link>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {featured.map((gadget) => (
                        <Link
                            key={gadget.id}
                            href={`/items/${gadget.id}`}
                            style={{
                                backgroundColor: "#1e293b",
                                border: "1px solid #334155",
                            }}
                            className="group rounded-2xl overflow-hidden hover:border-indigo-500 hover:-translate-y-1 transition-all duration-200"
                        >
                            <div className="relative h-44 overflow-hidden">
                                <Image
                                    src={gadget.imageUrl}
                                    alt={gadget.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute top-3 left-3">
                                    <span
                                        className="text-xs font-semibold px-2.5 py-1 rounded-full"
                                        style={{ backgroundColor: "rgba(99,102,241,0.85)", color: "white" }}
                                    >
                                        {gadget.category}
                                    </span>
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="font-semibold text-sm mb-1 truncate" style={{ color: "#f1f5f9" }}>
                                    {gadget.title}
                                </h3>
                                <div className="flex items-center justify-between mt-3">
                                    <span className="font-bold" style={{ color: "#6366f1" }}>
                                        ${gadget.price}
                                    </span>
                                    <span className="text-xs flex items-center gap-1" style={{ color: "#f59e0b" }}>
                                        <Star size={12} fill="#f59e0b" />
                                        {gadget.rating}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ─── Section 3: Categories ──────────────────────────────────────────
const categoryData = [
    { label: "Earbuds", icon: Headphones, color: "#6366f1" },
    { label: "Smartwatch", icon: Watch, color: "#22d3ee" },
    { label: "Keyboard", icon: Keyboard, color: "#a855f7" },
    { label: "Gaming", icon: Gamepad2, color: "#ef4444" },
    { label: "Power", icon: BatteryCharging, color: "#22c55e" },
    { label: "Webcam", icon: Camera, color: "#f59e0b" },
    { label: "Accessories", icon: Puzzle, color: "#ec4899" },
];

function Categories() {
    return (
        <section
            className="py-20"
            style={{ backgroundColor: "#0a1120", borderTop: "1px solid #1e293b", borderBottom: "1px solid #1e293b" }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <p className="text-sm font-medium mb-2" style={{ color: "#6366f1" }}>
                        EXPLORE BY TYPE
                    </p>
                    <h2 className="text-3xl font-bold" style={{ color: "#f1f5f9" }}>
                        Shop by Category
                    </h2>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
                    {categoryData.map(({ label, icon: Icon, color }) => (
                        <Link
                            key={label}
                            href={`/items?category=${label}`}
                            style={{
                                backgroundColor: "#1e293b",
                                border: "1px solid #334155",
                            }}
                            className="group flex flex-col items-center gap-3 py-6 px-3 rounded-2xl hover:border-indigo-500 hover:-translate-y-1 transition-all duration-200"
                        >
                            <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 duration-200"
                                style={{ backgroundColor: `${color}1a` }}
                            >
                                <Icon size={22} style={{ color }} />
                            </div>
                            <span className="text-xs font-medium text-center" style={{ color: "#94a3b8" }}>
                                {label}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ─── Section 4: Why GadgetHub ───────────────────────────────────────
const features = [
    {
        icon: Zap,
        color: "#6366f1",
        title: "Curated Picks",
        description:
            "Every gadget is hand-selected by our team for quality, value, and real-world performance.",
    },
    {
        icon: Shield,
        color: "#22d3ee",
        title: "Trusted Reviews",
        description:
            "Detailed specs and honest descriptions help you make confident purchasing decisions.",
    },
    {
        icon: RefreshCw,
        color: "#22c55e",
        title: "Always Updated",
        description:
            "We add new gadgets regularly so you never miss the latest releases and upgrades.",
    },
];

function WhyGadgetHub() {
    return (
        <section className="py-20" style={{ backgroundColor: "#0f172a" }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-14">
                    <p className="text-sm font-medium mb-2" style={{ color: "#6366f1" }}>
                        WHY CHOOSE US
                    </p>
                    <h2 className="text-3xl font-bold" style={{ color: "#f1f5f9" }}>
                        Why GadgetHub?
                    </h2>
                    <p className="mt-3 max-w-xl mx-auto text-sm leading-relaxed" style={{ color: "#94a3b8" }}>
                        We make it easy to discover, compare, and choose the right tech for your lifestyle.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {features.map(({ icon: Icon, color, title, description }) => (
                        <div
                            key={title}
                            style={{
                                backgroundColor: "#1e293b",
                                border: "1px solid #334155",
                            }}
                            className="p-8 rounded-2xl hover:border-indigo-500 transition-colors duration-200"
                        >
                            <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                                style={{ backgroundColor: `${color}1a` }}
                            >
                                <Icon size={22} style={{ color }} />
                            </div>
                            <h3 className="font-semibold text-lg mb-2" style={{ color: "#f1f5f9" }}>
                                {title}
                            </h3>
                            <p className="text-sm leading-relaxed" style={{ color: "#94a3b8" }}>
                                {description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ─── Section 5: Top Rated ───────────────────────────────────────────
function TopRated() {
    const topRated = [...gadgets]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 4);

    return (
        <section
            className="py-20"
            style={{ backgroundColor: "#0a1120", borderTop: "1px solid #1e293b" }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-end justify-between mb-10">
                    <div>
                        <p className="text-sm font-medium mb-2" style={{ color: "#f59e0b" }}>
                            HIGHEST RATED
                        </p>
                        <h2 className="text-3xl font-bold" style={{ color: "#f1f5f9" }}>
                            Top Rated Gadgets
                        </h2>
                    </div>
                    <Link
                        href="/items"
                        className="hidden sm:inline-flex items-center gap-1 text-sm font-medium hover:opacity-80 transition-opacity"
                        style={{ color: "#6366f1" }}
                    >
                        See all <ArrowRight size={15} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {topRated.map((gadget, index) => (
                        <Link
                            key={gadget.id}
                            href={`/items/${gadget.id}`}
                            style={{
                                backgroundColor: "#1e293b",
                                border: "1px solid #334155",
                            }}
                            className="group p-5 rounded-2xl hover:border-yellow-500/50 hover:-translate-y-1 transition-all duration-200"
                        >
                            {/* Rank badge */}
                            <div className="flex items-center justify-between mb-4">
                                <span
                                    className="text-xs font-bold px-2.5 py-1 rounded-full"
                                    style={{
                                        backgroundColor: index === 0 ? "rgba(245,158,11,0.15)" : "rgba(30,41,59,0.8)",
                                        color: index === 0 ? "#f59e0b" : "#94a3b8",
                                        border: index === 0 ? "1px solid rgba(245,158,11,0.3)" : "1px solid #334155",
                                    }}
                                >
                                    #{index + 1}
                                </span>
                                <div className="flex items-center gap-1" style={{ color: "#f59e0b" }}>
                                    <Star size={13} fill="#f59e0b" />
                                    <span className="text-sm font-semibold">{gadget.rating}</span>
                                </div>
                            </div>

                            {/* Image */}
                            <div className="relative h-36 rounded-xl overflow-hidden mb-4">
                                <Image
                                    src={gadget.imageUrl}
                                    alt={gadget.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>

                            <h3 className="font-semibold text-sm mb-1 truncate" style={{ color: "#f1f5f9" }}>
                                {gadget.title}
                            </h3>
                            <p className="text-xs truncate mb-3" style={{ color: "#94a3b8" }}>
                                {gadget.brand} · {gadget.category}
                            </p>
                            <p className="font-bold text-sm" style={{ color: "#6366f1" }}>
                                ${gadget.price}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ─── Main Export ────────────────────────────────────────────────────
export default function Home() {
    return (
        <>
            <Hero />
            <FeaturedGadgets />
            <Categories />
            <WhyGadgetHub />
            <TopRated />
        </>
    );
}