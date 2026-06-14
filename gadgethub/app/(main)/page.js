"use client";

import { useState, useEffect, useCallback } from "react";
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
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

// ─── Slide data ─────────────────────────────────────────────────────
const heroSlides = [
    {
        id: "main",
        type: "content",
        badge: "New arrivals every week",
        headline: "Discover the",
        highlight: "Future of Tech",
        subtitle:
            "Curated gadgets handpicked for enthusiasts, professionals, and everyday users. From earbuds to smartwatches — find your next favourite device.",
        cta: { label: "Browse Gadgets", href: "/items" },
        secondary: { label: "Learn More", href: "/about" },
        stats: [
            { value: "10+", label: "Gadgets" },
            { value: "7", label: "Categories" },
            { value: "4.7★", label: "Avg Rating" },
        ],
    },
    {
        id: "earbuds",
        type: "product",
        category: "Earbuds",
        tag: "Premium Audio",
        headline: "Hear Every",
        highlight: "Detail",
        subtitle:
            "Industry-leading noise cancellation, Hi-Fi codecs, and all-day comfort. The best wireless earbuds, curated for you.",
        cta: { label: "Shop Earbuds", href: "/items?category=Earbuds" },
        image:
            "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=1200&q=80",
        accent: "#6366f1",
    },
    {
        id: "smartwatch",
        type: "product",
        category: "Smartwatch",
        tag: "Wearable Tech",
        headline: "Track Every",
        highlight: "Moment",
        subtitle:
            "From fitness tracking to GPS navigation — smartwatches built for athletes, adventurers, and everyday achievers.",
        cta: { label: "Shop Smartwatches", href: "/items?category=Smartwatch" },
        image:
            "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=1200&q=80",
        accent: "#22d3ee",
    },
    {
        id: "gaming",
        type: "product",
        category: "Gaming",
        tag: "Gaming Gear",
        headline: "Level Up Your",
        highlight: "Setup",
        subtitle:
            "Pro-grade mice, headsets, and peripherals engineered for precision, speed, and total immersion in every game.",
        cta: { label: "Shop Gaming", href: "/items?category=Gaming" },
        image:
            "https://images.unsplash.com/photo-1527814050087-3793815479db?w=1200&q=80",
        accent: "#ef4444",
    },
    {
        id: "keyboard",
        type: "product",
        category: "Keyboard",
        tag: "Mechanical Keyboards",
        headline: "Type With",
        highlight: "Precision",
        subtitle:
            "Gasket-mounted, wireless, fully programmable. Mechanical keyboards that make every keystroke a pleasure.",
        cta: { label: "Shop Keyboards", href: "/items?category=Keyboard" },
        image:
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
        accent: "#a855f7",
    },
];

// ─── Hero Slider ─────────────────────────────────────────────────────
function Hero() {
    const [current, setCurrent] = useState(0);
    const [animating, setAnimating] = useState(false);

    const goTo = useCallback(
        (index) => {
            if (animating) return;
            setAnimating(true);
            setTimeout(() => {
                setCurrent(index);
                setAnimating(false);
            }, 300);
        },
        [animating]
    );

    const prev = () =>
        goTo(current === 0 ? heroSlides.length - 1 : current - 1);
    const next = useCallback(
        () => goTo(current === heroSlides.length - 1 ? 0 : current + 1),
        [current, goTo]
    );

    // Auto-advance every 5 seconds
    useEffect(() => {
        const timer = setInterval(next, 5000);
        return () => clearInterval(timer);
    }, [next]);

    const slide = heroSlides[current];

    return (
        <section className="relative overflow-hidden" style={{ height: "620px" }}>
            {/* ── Slide backgrounds ── */}
            {heroSlides.map((s, i) => (
                <div
                    key={s.id}
                    className="absolute inset-0 transition-opacity duration-700"
                    style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}
                >
                    {s.type === "product" ? (
                        <>
                            <Image
                                src={s.image}
                                alt={s.category}
                                fill
                                className="object-cover"
                                priority={i === 0}
                            />
                            {/* Dark overlay */}
                            <div
                                className="absolute inset-0"
                                style={{
                                    background: `linear-gradient(100deg, rgba(15,23,42,0.97) 0%, rgba(15,23,42,0.85) 45%, rgba(15,23,42,0.3) 100%)`,
                                }}
                            />
                            {/* Accent color wash */}
                            <div
                                className="absolute inset-0"
                                style={{
                                    background: `linear-gradient(135deg, ${s.accent}18 0%, transparent 60%)`,
                                }}
                            />
                        </>
                    ) : (
                        <div
                            className="absolute inset-0"
                            style={{
                                background:
                                    "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)",
                            }}
                        >
                            <div
                                className="absolute inset-0"
                                style={{
                                    background:
                                        "radial-gradient(ellipse at 60% 50%, rgba(99,102,241,0.18) 0%, transparent 70%)",
                                }}
                            />
                        </div>
                    )}
                </div>
            ))}

            {/* ── Slide content ── */}
            <div
                className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center"
                style={{ zIndex: 10 }}
            >
                <div
                    className="max-w-2xl transition-all duration-500"
                    style={{
                        opacity: animating ? 0 : 1,
                        transform: animating ? "translateY(16px)" : "translateY(0)",
                    }}
                >
                    {/* Badge */}
                    {slide.type === "content" ? (
                        <div
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-5"
                            style={{
                                backgroundColor: "rgba(99,102,241,0.15)",
                                color: "#6366f1",
                                border: "1px solid rgba(99,102,241,0.35)",
                            }}
                        >
                            <Zap size={11} />
                            {slide.badge}
                        </div>
                    ) : (
                        <div
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-5 uppercase tracking-widest"
                            style={{
                                backgroundColor: `${slide.accent}20`,
                                color: slide.accent,
                                border: `1px solid ${slide.accent}50`,
                            }}
                        >
                            {slide.tag}
                        </div>
                    )}

                    {/* Headline */}
                    <h1
                        className="font-extrabold tracking-tight mb-4 leading-tight"
                        style={{
                            color: "#f1f5f9",
                            fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
                        }}
                    >
                        {slide.headline}{" "}
                        <span
                            style={
                                slide.type === "content"
                                    ? {
                                        background: "linear-gradient(90deg, #6366f1, #22d3ee)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                    }
                                    : { color: slide.accent }
                            }
                        >
                            {slide.highlight}
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p
                        className="text-base sm:text-lg leading-relaxed mb-8 max-w-xl"
                        style={{ color: "#94a3b8" }}
                    >
                        {slide.subtitle}
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-wrap items-center gap-3">
                        <Link
                            href={slide.cta.href}
                            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90"
                            style={{
                                backgroundColor:
                                    slide.type === "content" ? "#6366f1" : slide.accent,
                            }}
                        >
                            {slide.cta.label}
                            <ArrowRight size={16} />
                        </Link>
                        {slide.secondary && (
                            <Link
                                href={slide.secondary.href}
                                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold transition-colors hover:text-white hover:border-indigo-500"
                                style={{
                                    color: "#94a3b8",
                                    border: "1px solid #334155",
                                }}
                            >
                                {slide.secondary.label}
                            </Link>
                        )}
                    </div>

                    {/* Stats row — content slide only */}
                    {slide.type === "content" && slide.stats && (
                        <div className="flex flex-wrap gap-3 mt-10">
                            {slide.stats.map((stat) => (
                                <div
                                    key={stat.label}
                                    className="px-5 py-3 rounded-xl"
                                    style={{
                                        backgroundColor: "rgba(30,41,59,0.7)",
                                        border: "1px solid #334155",
                                        backdropFilter: "blur(8px)",
                                    }}
                                >
                                    <div
                                        className="text-xl font-extrabold"
                                        style={{ color: "#6366f1" }}
                                    >
                                        {stat.value}
                                    </div>
                                    <div className="text-xs mt-0.5" style={{ color: "#94a3b8" }}>
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* ── Prev / Next arrows ── */}
            <button
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-white/10"
                style={{
                    zIndex: 20,
                    backgroundColor: "rgba(15,23,42,0.6)",
                    border: "1px solid #334155",
                    color: "#f1f5f9",
                    backdropFilter: "blur(8px)",
                }}
            >
                <ChevronLeft size={20} />
            </button>
            <button
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-white/10"
                style={{
                    zIndex: 20,
                    backgroundColor: "rgba(15,23,42,0.6)",
                    border: "1px solid #334155",
                    color: "#f1f5f9",
                    backdropFilter: "blur(8px)",
                }}
            >
                <ChevronRight size={20} />
            </button>

            {/* ── Dot indicators ── */}
            <div
                className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2"
                style={{ zIndex: 20 }}
            >
                {heroSlides.map((s, i) => (
                    <button
                        key={s.id}
                        onClick={() => goTo(i)}
                        className="transition-all duration-300 rounded-full"
                        style={{
                            width: i === current ? "28px" : "8px",
                            height: "8px",
                            backgroundColor:
                                i === current
                                    ? slide.type === "content"
                                        ? "#6366f1"
                                        : slide.accent
                                    : "#334155",
                        }}
                    />
                ))}
            </div>

            {/* ── Slide counter ── */}
            <div
                className="absolute bottom-6 right-6 text-xs font-semibold"
                style={{ zIndex: 20, color: "#475569" }}
            >
                {String(current + 1).padStart(2, "0")} /{" "}
                {String(heroSlides.length).padStart(2, "0")}
            </div>
        </section>
    );
}

// ─── Section 2: Featured Gadgets ────────────────────────────────────
function FeaturedGadgets() {
    const featured = gadgets.slice(0, 4);

    return (
        <section className="py-20" style={{ backgroundColor: "#0f172a" }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                                        style={{
                                            backgroundColor: "rgba(99,102,241,0.85)",
                                            color: "white",
                                        }}
                                    >
                                        {gadget.category}
                                    </span>
                                </div>
                            </div>
                            <div className="p-4">
                                <h3
                                    className="font-semibold text-sm mb-1 truncate"
                                    style={{ color: "#f1f5f9" }}
                                >
                                    {gadget.title}
                                </h3>
                                <div className="flex items-center justify-between mt-3">
                                    <span className="font-bold" style={{ color: "#6366f1" }}>
                                        ${gadget.price}
                                    </span>
                                    <span
                                        className="text-xs flex items-center gap-1"
                                        style={{ color: "#f59e0b" }}
                                    >
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

// ─── Section 3: Categories ───────────────────────────────────────────
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
            style={{
                backgroundColor: "#0a1120",
                borderTop: "1px solid #1e293b",
                borderBottom: "1px solid #1e293b",
            }}
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
                            <span
                                className="text-xs font-medium text-center"
                                style={{ color: "#94a3b8" }}
                            >
                                {label}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ─── Section 4: Why GadgetHub ────────────────────────────────────────
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
                    <p
                        className="mt-3 max-w-xl mx-auto text-sm leading-relaxed"
                        style={{ color: "#94a3b8" }}
                    >
                        We make it easy to discover, compare, and choose the right tech for
                        your lifestyle.
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
                            <h3
                                className="font-semibold text-lg mb-2"
                                style={{ color: "#f1f5f9" }}
                            >
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

// ─── Section 5: Top Rated ────────────────────────────────────────────
function TopRated() {
    const topRated = [...gadgets].sort((a, b) => b.rating - a.rating).slice(0, 4);

    return (
        <section
            className="py-20"
            style={{
                backgroundColor: "#0a1120",
                borderTop: "1px solid #1e293b",
            }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-end justify-between mb-10">
                    <div>
                        <p
                            className="text-sm font-medium mb-2"
                            style={{ color: "#f59e0b" }}
                        >
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
                            <div className="flex items-center justify-between mb-4">
                                <span
                                    className="text-xs font-bold px-2.5 py-1 rounded-full"
                                    style={{
                                        backgroundColor:
                                            index === 0
                                                ? "rgba(245,158,11,0.15)"
                                                : "rgba(30,41,59,0.8)",
                                        color: index === 0 ? "#f59e0b" : "#94a3b8",
                                        border:
                                            index === 0
                                                ? "1px solid rgba(245,158,11,0.3)"
                                                : "1px solid #334155",
                                    }}
                                >
                                    #{index + 1}
                                </span>
                                <div
                                    className="flex items-center gap-1"
                                    style={{ color: "#f59e0b" }}
                                >
                                    <Star size={13} fill="#f59e0b" />
                                    <span className="text-sm font-semibold">{gadget.rating}</span>
                                </div>
                            </div>

                            <div className="relative h-36 rounded-xl overflow-hidden mb-4">
                                <Image
                                    src={gadget.imageUrl}
                                    alt={gadget.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>

                            <h3
                                className="font-semibold text-sm mb-1 truncate"
                                style={{ color: "#f1f5f9" }}
                            >
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

// ─── Main Export ─────────────────────────────────────────────────────
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