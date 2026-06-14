"use client";

import { useState, useEffect, useCallback, useRef } from "react";
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

// ─── Animation styles injected once ─────────────────────────────────
const animationCSS = `
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(32px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-10px); }
  }
  @keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 0 0 rgba(99,102,241,0); }
    50%       { box-shadow: 0 0 24px 6px rgba(99,102,241,0.25); }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes marquee {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.92); }
    to   { opacity: 1; transform: scale(1); }
  }
  @keyframes slideRight {
    from { opacity: 0; transform: translateX(-24px); }
    to   { opacity: 1; transform: translateX(0); }
  }

  .anim-fade-up   { animation: fadeUp 0.6s ease both; }
  .anim-fade-in   { animation: fadeIn 0.5s ease both; }
  .anim-float     { animation: float 4s ease-in-out infinite; }
  .anim-pulse-glow{ animation: pulse-glow 2.5s ease-in-out infinite; }
  .anim-scale-in  { animation: scaleIn 0.5s ease both; }
  .anim-slide-right { animation: slideRight 0.5s ease both; }

  .shimmer-text {
    background: linear-gradient(90deg, #6366f1, #22d3ee, #6366f1);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shimmer 3s linear infinite;
  }

  .marquee-track {
    display: flex;
    width: max-content;
    animation: marquee 28s linear infinite;
  }
  .marquee-track:hover { animation-play-state: paused; }

  .card-hover {
    transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
  }
  .card-hover:hover {
    transform: translateY(-6px);
    box-shadow: 0 16px 40px rgba(99,102,241,0.18);
  }

  .btn-shine {
    position: relative;
    overflow: hidden;
  }
  .btn-shine::after {
    content: '';
    position: absolute;
    top: 0; left: -100%;
    width: 60%; height: 100%;
    background: linear-gradient(120deg, transparent, rgba(255,255,255,0.18), transparent);
    transition: left 0.45s ease;
  }
  .btn-shine:hover::after { left: 140%; }

  .icon-spin:hover { animation: spin-slow 1s linear; }

  .stagger-1 { animation-delay: 0.05s; }
  .stagger-2 { animation-delay: 0.12s; }
  .stagger-3 { animation-delay: 0.19s; }
  .stagger-4 { animation-delay: 0.26s; }
  .stagger-5 { animation-delay: 0.33s; }
  .stagger-6 { animation-delay: 0.40s; }
  .stagger-7 { animation-delay: 0.47s; }
`;

// ─── Inject CSS once ─────────────────────────────────────────────────
function GlobalAnimations() {
    return <style dangerouslySetInnerHTML={{ __html: animationCSS }} />;
}

// ─── Intersection observer hook ──────────────────────────────────────
function useInView(options = {}) {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
            { threshold: 0.12, ...options }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);
    return [ref, inView];
}

// ─── Animated counter ────────────────────────────────────────────────
function Counter({ target, suffix = "" }) {
    const [count, setCount] = useState(0);
    const [ref, inView] = useInView();
    useEffect(() => {
        if (!inView) return;
        const num = parseFloat(target);
        const duration = 1400;
        const steps = 50;
        const increment = num / steps;
        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            if (current >= num) { setCount(num); clearInterval(timer); }
            else setCount(Math.floor(current * 10) / 10);
        }, duration / steps);
        return () => clearInterval(timer);
    }, [inView, target]);
    return <span ref={ref}>{count}{suffix}</span>;
}

// ─── Slide data ──────────────────────────────────────────────────────
const heroSlides = [
    {
        id: "main", type: "content",
        badge: "New arrivals every week",
        headline: "Discover the", highlight: "Future of Tech",
        subtitle: "Curated gadgets handpicked for enthusiasts, professionals, and everyday users. From earbuds to smartwatches — find your next favourite device.",
        cta: { label: "Browse Gadgets", href: "/items" },
        secondary: { label: "Learn More", href: "/about" },
        stats: [
            { value: "30", suffix: "+", label: "Gadgets" },
            { value: "7", suffix: "", label: "Categories" },
            { value: "4.7", suffix: "★", label: "Avg Rating" },
        ],
    },
    {
        id: "earbuds", type: "product", category: "Earbuds",
        tag: "Premium Audio", headline: "Hear Every", highlight: "Detail",
        subtitle: "Industry-leading noise cancellation, Hi-Fi codecs, and all-day comfort. The best wireless earbuds, curated for you.",
        cta: { label: "Shop Earbuds", href: "/items?category=Earbuds" },
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=1400&q=80",
        accent: "#6366f1",
    },
    {
        id: "smartwatch", type: "product", category: "Smartwatch",
        tag: "Wearable Tech", headline: "Track Every", highlight: "Moment",
        subtitle: "From fitness tracking to GPS navigation — smartwatches built for athletes, adventurers, and everyday achievers.",
        cta: { label: "Shop Smartwatches", href: "/items?category=Smartwatch" },
        image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=1400&q=80",
        accent: "#22d3ee",
    },
    {
        id: "gaming", type: "product", category: "Gaming",
        tag: "Gaming Gear", headline: "Level Up Your", highlight: "Setup",
        subtitle: "Pro-grade mice, headsets, and peripherals engineered for precision, speed, and total immersion in every game.",
        cta: { label: "Shop Gaming", href: "/items?category=Gaming" },
        image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=1400&q=80",
        accent: "#ef4444",
    },
    {
        id: "keyboard", type: "product", category: "Keyboard",
        tag: "Mechanical Keyboards", headline: "Type With", highlight: "Precision",
        subtitle: "Gasket-mounted, wireless, fully programmable. Mechanical keyboards that make every keystroke a pleasure.",
        cta: { label: "Shop Keyboards", href: "/items?category=Keyboard" },
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=80",
        accent: "#a855f7",
    },
];

// ─── Hero ─────────────────────────────────────────────────────────────
function Hero() {
    const [current, setCurrent] = useState(0);
    const [animating, setAnimating] = useState(false);

    const goTo = useCallback((index) => {
        if (animating) return;
        setAnimating(true);
        setTimeout(() => { setCurrent(index); setAnimating(false); }, 350);
    }, [animating]);

    const prev = () => goTo(current === 0 ? heroSlides.length - 1 : current - 1);
    const next = useCallback(
        () => goTo(current === heroSlides.length - 1 ? 0 : current + 1),
        [current, goTo]
    );

    useEffect(() => {
        const t = setInterval(next, 5500);
        return () => clearInterval(t);
    }, [next]);

    const slide = heroSlides[current];

    return (
        <section className="relative overflow-hidden" style={{ height: "640px" }}>
            {/* Backgrounds */}
            {heroSlides.map((s, i) => (
                <div
                    key={s.id}
                    className="absolute inset-0"
                    style={{
                        opacity: i === current ? 1 : 0,
                        zIndex: i === current ? 1 : 0,
                        transition: "opacity 0.7s ease",
                    }}
                >
                    {s.type === "product" ? (
                        <>
                            <Image src={s.image} alt={s.category} fill className="object-cover" priority={i === 0} />
                            <div className="absolute inset-0" style={{ background: "linear-gradient(100deg,rgba(15,23,42,0.97) 0%,rgba(15,23,42,0.82) 45%,rgba(15,23,42,0.25) 100%)" }} />
                            <div className="absolute inset-0" style={{ background: `linear-gradient(135deg,${s.accent}20 0%,transparent 65%)` }} />
                        </>
                    ) : (
                        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,#0f172a 0%,#1e1b4b 50%,#0f172a 100%)" }}>
                            {/* Animated orbs */}
                            <div className="anim-float absolute rounded-full" style={{ width: 420, height: 420, top: "-80px", right: "8%", background: "radial-gradient(circle,rgba(99,102,241,0.13) 0%,transparent 70%)", animationDelay: "0s" }} />
                            <div className="anim-float absolute rounded-full" style={{ width: 280, height: 280, bottom: "40px", right: "22%", background: "radial-gradient(circle,rgba(34,211,238,0.10) 0%,transparent 70%)", animationDelay: "2s" }} />
                            <div className="anim-float absolute rounded-full" style={{ width: 180, height: 180, top: "30%", right: "48%", background: "radial-gradient(circle,rgba(168,85,247,0.09) 0%,transparent 70%)", animationDelay: "1s" }} />
                        </div>
                    )}
                </div>
            ))}

            {/* Content */}
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center" style={{ zIndex: 10 }}>
                <div
                    style={{
                        maxWidth: "640px",
                        opacity: animating ? 0 : 1,
                        transform: animating ? "translateY(20px)" : "translateY(0)",
                        transition: "opacity 0.4s ease, transform 0.4s ease",
                    }}
                >
                    {/* Badge */}
                    <div
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-5 uppercase tracking-widest anim-fade-up"
                        style={{
                            backgroundColor: slide.type === "content" ? "rgba(99,102,241,0.15)" : `${slide.accent}22`,
                            color: slide.type === "content" ? "#6366f1" : slide.accent,
                            border: `1px solid ${slide.type === "content" ? "rgba(99,102,241,0.35)" : `${slide.accent}55`}`,
                        }}
                    >
                        <Zap size={11} />
                        {slide.type === "content" ? slide.badge : slide.tag}
                    </div>

                    {/* Headline */}
                    <h1
                        className="font-extrabold tracking-tight mb-5 anim-fade-up stagger-1"
                        style={{ color: "#f1f5f9", fontSize: "clamp(2.4rem,5.5vw,4rem)", lineHeight: 1.1 }}
                    >
                        {slide.headline}{" "}
                        {slide.type === "content" ? (
                            <span className="shimmer-text">{slide.highlight}</span>
                        ) : (
                            <span style={{ color: slide.accent }}>{slide.highlight}</span>
                        )}
                    </h1>

                    {/* Subtitle */}
                    <p className="text-base sm:text-lg leading-relaxed mb-8 anim-fade-up stagger-2" style={{ color: "#94a3b8", maxWidth: "520px" }}>
                        {slide.subtitle}
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-wrap items-center gap-3 anim-fade-up stagger-3">
                        <Link
                            href={slide.cta.href}
                            className="btn-shine inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90"
                            style={{ backgroundColor: slide.type === "content" ? "#6366f1" : slide.accent }}
                        >
                            {slide.cta.label}
                            <ArrowRight size={16} />
                        </Link>
                        {slide.secondary && (
                            <Link
                                href={slide.secondary.href}
                                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold transition-colors hover:text-white hover:border-indigo-500"
                                style={{ color: "#94a3b8", border: "1px solid #334155" }}
                            >
                                {slide.secondary.label}
                            </Link>
                        )}
                    </div>

                    {/* Stats — content slide only */}
                    {slide.type === "content" && slide.stats && (
                        <div className="flex flex-wrap gap-3 mt-10 anim-fade-up stagger-4">
                            {slide.stats.map((stat) => (
                                <div
                                    key={stat.label}
                                    className="anim-pulse-glow px-5 py-3 rounded-xl"
                                    style={{ backgroundColor: "rgba(30,41,59,0.75)", border: "1px solid #334155", backdropFilter: "blur(8px)" }}
                                >
                                    <div className="text-2xl font-extrabold" style={{ color: "#6366f1" }}>
                                        <Counter target={stat.value} suffix={stat.suffix} />
                                    </div>
                                    <div className="text-xs mt-0.5" style={{ color: "#94a3b8" }}>{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Arrows */}
            {["prev", "next"].map((dir) => (
                <button
                    key={dir}
                    onClick={dir === "prev" ? prev : next}
                    className="absolute top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-110 hover:bg-white/10"
                    style={{
                        zIndex: 20,
                        [dir === "prev" ? "left" : "right"]: "16px",
                        backgroundColor: "rgba(15,23,42,0.65)",
                        border: "1px solid #334155",
                        color: "#f1f5f9",
                        backdropFilter: "blur(8px)",
                    }}
                >
                    {dir === "prev" ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
                </button>
            ))}

            {/* Dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2" style={{ zIndex: 20 }}>
                {heroSlides.map((s, i) => (
                    <button
                        key={s.id}
                        onClick={() => goTo(i)}
                        className="rounded-full transition-all duration-300"
                        style={{
                            width: i === current ? "28px" : "8px",
                            height: "8px",
                            backgroundColor: i === current
                                ? (slide.type === "content" ? "#6366f1" : slide.accent)
                                : "#334155",
                        }}
                    />
                ))}
            </div>

            {/* Counter */}
            <div className="absolute bottom-6 right-6 text-xs font-semibold" style={{ zIndex: 20, color: "#475569" }}>
                {String(current + 1).padStart(2, "0")} / {String(heroSlides.length).padStart(2, "0")}
            </div>
        </section>
    );
}

// ─── Marquee ticker ───────────────────────────────────────────────────
const tickerItems = [
    "Sony WF-1000XM5", "Apple Watch Ultra 2", "Keychron Q3 Max",
    "Razer DeathAdder V3", "Anker Prime 200W", "Logitech Brio 505",
    "Samsung Buds3 Pro", "SteelSeries Arctis Nova", "Garmin Forerunner 965",
    "Corsair K100 RGB", "Bose QC Ultra", "HyperX Cloud Alpha",
];

function Ticker() {
    const doubled = [...tickerItems, ...tickerItems];
    return (
        <div
            className="overflow-hidden py-3"
            style={{ backgroundColor: "#6366f1", borderTop: "1px solid #4f46e5", borderBottom: "1px solid #4f46e5" }}
        >
            <div className="marquee-track">
                {doubled.map((item, i) => (
                    <span key={i} className="inline-flex items-center gap-3 mx-6 text-xs font-semibold text-white/90 whitespace-nowrap uppercase tracking-widest">
                        <span style={{ color: "rgba(255,255,255,0.5)" }}>◆</span>
                        {item}
                    </span>
                ))}
            </div>
        </div>
    );
}

// ─── Featured Gadgets ─────────────────────────────────────────────────
function FeaturedGadgets() {
    const featured = gadgets.slice(0, 4);
    const [ref, inView] = useInView();

    return (
        <section className="py-24" style={{ backgroundColor: "#0f172a" }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div ref={ref} className="flex items-end justify-between mb-12">
                    <div className={inView ? "anim-slide-right" : ""} style={{ opacity: inView ? 1 : 0 }}>
                        <p className="text-xs font-bold mb-2 uppercase tracking-widest" style={{ color: "#6366f1" }}>
                            ✦ Hand Picked
                        </p>
                        <h2 className="text-3xl sm:text-4xl font-extrabold" style={{ color: "#f1f5f9" }}>
                            Featured Gadgets
                        </h2>
                    </div>
                    <Link
                        href="/items"
                        className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors hover:text-white btn-shine"
                        style={{ color: "#6366f1", border: "1px solid rgba(99,102,241,0.35)", backgroundColor: "rgba(99,102,241,0.08)" }}
                    >
                        View all <ArrowRight size={14} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {featured.map((gadget, i) => (
                        <Link
                            key={gadget.id}
                            href={`/items/${gadget.id}`}
                            className={`card-hover rounded-2xl overflow-hidden ${inView ? `anim-fade-up stagger-${i + 1}` : ""}`}
                            style={{
                                backgroundColor: "#1e293b",
                                border: "1px solid #334155",
                                opacity: inView ? 1 : 0,
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <div className="relative h-48 overflow-hidden">
                                <Image
                                    src={gadget.imageUrl}
                                    alt={gadget.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                {/* Gradient overlay */}
                                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(30,41,59,0.7) 0%, transparent 50%)" }} />
                                <div className="absolute top-3 left-3">
                                    <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ backgroundColor: "rgba(99,102,241,0.9)", color: "white" }}>
                                        {gadget.category}
                                    </span>
                                </div>
                                <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: "rgba(0,0,0,0.55)", color: "#f59e0b" }}>
                                    <Star size={11} fill="#f59e0b" /> {gadget.rating}
                                </div>
                            </div>
                            <div className="p-4 flex flex-col flex-1">
                                <p className="text-xs mb-1" style={{ color: "#94a3b8" }}>{gadget.brand}</p>
                                <h3 className="font-bold text-sm mb-auto leading-snug" style={{ color: "#f1f5f9" }}>{gadget.title}</h3>
                                <div className="flex items-center justify-between mt-4 pt-3" style={{ borderTop: "1px solid #334155" }}>
                                    <span className="font-extrabold text-base" style={{ color: "#6366f1" }}>${gadget.price}</span>
                                    <span className="text-xs font-semibold px-3 py-1 rounded-lg" style={{ backgroundColor: "rgba(99,102,241,0.12)", color: "#6366f1" }}>
                                        View →
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

// ─── Categories ───────────────────────────────────────────────────────
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
    const [ref, inView] = useInView();
    return (
        <section
            className="py-24"
            style={{ backgroundColor: "#0a1120", borderTop: "1px solid #1e293b", borderBottom: "1px solid #1e293b" }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div ref={ref} className="text-center mb-14">
                    <p className={`text-xs font-bold mb-3 uppercase tracking-widest ${inView ? "anim-fade-up" : ""}`} style={{ color: "#6366f1", opacity: inView ? 1 : 0 }}>
                        ✦ Explore by Type
                    </p>
                    <h2 className={`text-3xl sm:text-4xl font-extrabold ${inView ? "anim-fade-up stagger-1" : ""}`} style={{ color: "#f1f5f9", opacity: inView ? 1 : 0 }}>
                        Shop by Category
                    </h2>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
                    {categoryData.map(({ label, icon: Icon, color }, i) => (
                        <Link
                            key={label}
                            href={`/items?category=${label}`}
                            className={`card-hover group flex flex-col items-center gap-3 py-7 px-3 rounded-2xl ${inView ? `anim-fade-up stagger-${i + 1}` : ""}`}
                            style={{
                                backgroundColor: "#1e293b",
                                border: "1px solid #334155",
                                opacity: inView ? 1 : 0,
                            }}
                        >
                            <div
                                className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                                style={{ backgroundColor: `${color}18`, border: `1px solid ${color}30` }}
                            >
                                <Icon size={24} style={{ color }} className="icon-spin" />
                            </div>
                            <span className="text-xs font-semibold text-center" style={{ color: "#94a3b8" }}>{label}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ─── Why GadgetHub ────────────────────────────────────────────────────
const features = [
    { icon: Zap, color: "#6366f1", title: "Curated Picks", description: "Every gadget is hand-selected by our team for quality, value, and real-world performance." },
    { icon: Shield, color: "#22d3ee", title: "Trusted Reviews", description: "Detailed specs and honest descriptions help you make confident purchasing decisions." },
    { icon: RefreshCw, color: "#22c55e", title: "Always Updated", description: "We add new gadgets regularly so you never miss the latest releases and upgrades." },
];

function WhyGadgetHub() {
    const [ref, inView] = useInView();
    return (
        <section className="py-24" style={{ backgroundColor: "#0f172a" }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div ref={ref} className="text-center mb-16">
                    <p className={`text-xs font-bold mb-3 uppercase tracking-widest ${inView ? "anim-fade-up" : ""}`} style={{ color: "#6366f1", opacity: inView ? 1 : 0 }}>
                        ✦ Why Choose Us
                    </p>
                    <h2 className={`text-3xl sm:text-4xl font-extrabold mb-4 ${inView ? "anim-fade-up stagger-1" : ""}`} style={{ color: "#f1f5f9", opacity: inView ? 1 : 0 }}>
                        Why GadgetHub?
                    </h2>
                    <p className={`max-w-xl mx-auto text-sm leading-relaxed ${inView ? "anim-fade-up stagger-2" : ""}`} style={{ color: "#94a3b8", opacity: inView ? 1 : 0 }}>
                        We make it easy to discover, compare, and choose the right tech for your lifestyle.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {features.map(({ icon: Icon, color, title, description }, i) => (
                        <div
                            key={title}
                            className={`group p-8 rounded-2xl transition-all duration-300 hover:border-indigo-500 ${inView ? `anim-fade-up stagger-${i + 2}` : ""}`}
                            style={{
                                backgroundColor: "#1e293b",
                                border: "1px solid #334155",
                                opacity: inView ? 1 : 0,
                            }}
                        >
                            <div
                                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                                style={{ backgroundColor: `${color}18`, border: `1px solid ${color}30` }}
                            >
                                <Icon size={24} style={{ color }} />
                            </div>
                            <h3 className="font-bold text-lg mb-3" style={{ color: "#f1f5f9" }}>{title}</h3>
                            <p className="text-sm leading-relaxed" style={{ color: "#94a3b8" }}>{description}</p>
                            {/* Bottom accent line on hover */}
                            <div
                                className="mt-6 h-0.5 rounded-full transition-all duration-500 group-hover:w-full"
                                style={{ width: "0%", backgroundColor: color }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ─── Top Rated ────────────────────────────────────────────────────────
function TopRated() {
    const topRated = [...gadgets].sort((a, b) => b.rating - a.rating).slice(0, 4);
    const [ref, inView] = useInView();

    return (
        <section className="py-24" style={{ backgroundColor: "#0a1120", borderTop: "1px solid #1e293b" }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div ref={ref} className="flex items-end justify-between mb-12">
                    <div className={inView ? "anim-slide-right" : ""} style={{ opacity: inView ? 1 : 0 }}>
                        <p className="text-xs font-bold mb-2 uppercase tracking-widest" style={{ color: "#f59e0b" }}>
                            ✦ Highest Rated
                        </p>
                        <h2 className="text-3xl sm:text-4xl font-extrabold" style={{ color: "#f1f5f9" }}>
                            Top Rated Gadgets
                        </h2>
                    </div>
                    <Link
                        href="/items"
                        className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors hover:text-white btn-shine"
                        style={{ color: "#6366f1", border: "1px solid rgba(99,102,241,0.35)", backgroundColor: "rgba(99,102,241,0.08)" }}
                    >
                        See all <ArrowRight size={14} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {topRated.map((gadget, index) => (
                        <Link
                            key={gadget.id}
                            href={`/items/${gadget.id}`}
                            className={`card-hover group p-5 rounded-2xl ${inView ? `anim-fade-up stagger-${index + 1}` : ""}`}
                            style={{
                                backgroundColor: "#1e293b",
                                border: "1px solid #334155",
                                opacity: inView ? 1 : 0,
                            }}
                        >
                            {/* Rank + rating */}
                            <div className="flex items-center justify-between mb-4">
                                <span
                                    className="text-xs font-extrabold px-2.5 py-1 rounded-full"
                                    style={{
                                        backgroundColor: index === 0 ? "rgba(245,158,11,0.15)" : "rgba(30,41,59,0.8)",
                                        color: index === 0 ? "#f59e0b" : "#94a3b8",
                                        border: index === 0 ? "1px solid rgba(245,158,11,0.35)" : "1px solid #334155",
                                    }}
                                >
                                    #{index + 1}
                                </span>
                                <div className="flex items-center gap-1" style={{ color: "#f59e0b" }}>
                                    <Star size={13} fill="#f59e0b" />
                                    <span className="text-sm font-bold">{gadget.rating}</span>
                                </div>
                            </div>

                            {/* Image */}
                            <div className="relative h-36 rounded-xl overflow-hidden mb-4">
                                <Image
                                    src={gadget.imageUrl}
                                    alt={gadget.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-108"
                                    style={{ transition: "transform 0.5s ease" }}
                                />
                                {index === 0 && (
                                    <div className="absolute inset-0 rounded-xl" style={{ boxShadow: "inset 0 0 0 2px rgba(245,158,11,0.4)" }} />
                                )}
                            </div>

                            <h3 className="font-bold text-sm mb-1 truncate" style={{ color: "#f1f5f9" }}>{gadget.title}</h3>
                            <p className="text-xs truncate mb-3" style={{ color: "#94a3b8" }}>{gadget.brand} · {gadget.category}</p>
                            <p className="font-extrabold" style={{ color: "#6366f1" }}>${gadget.price}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ─── CTA Banner ───────────────────────────────────────────────────────
function CTABanner() {
    const [ref, inView] = useInView();
    return (
        <section className="py-24" style={{ backgroundColor: "#0f172a", borderTop: "1px solid #1e293b" }}>
            <div className="max-w-4xl mx-auto px-4 text-center">
                <div ref={ref}>
                    <div
                        className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-6 uppercase tracking-widest ${inView ? "anim-scale-in" : ""}`}
                        style={{ backgroundColor: "rgba(99,102,241,0.15)", color: "#6366f1", border: "1px solid rgba(99,102,241,0.3)", opacity: inView ? 1 : 0 }}
                    >
                        <Zap size={11} /> Start Exploring
                    </div>
                    <h2
                        className={`text-4xl sm:text-5xl font-extrabold mb-5 ${inView ? "anim-fade-up stagger-1" : ""}`}
                        style={{ color: "#f1f5f9", opacity: inView ? 1 : 0 }}
                    >
                        Ready to find your{" "}
                        <span className="shimmer-text">next gadget?</span>
                    </h2>
                    <p
                        className={`text-lg mb-10 ${inView ? "anim-fade-up stagger-2" : ""}`}
                        style={{ color: "#94a3b8", opacity: inView ? 1 : 0 }}
                    >
                        Browse 30+ curated tech gadgets across 7 categories. New arrivals added every week.
                    </p>
                    <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 ${inView ? "anim-fade-up stagger-3" : ""}`} style={{ opacity: inView ? 1 : 0 }}>
                        <Link
                            href="/items"
                            className="btn-shine inline-flex items-center gap-2 px-10 py-4 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-opacity"
                            style={{ backgroundColor: "#6366f1" }}
                        >
                            Browse All Gadgets
                            <ArrowRight size={16} />
                        </Link>
                        <Link
                            href="/register"
                            className="inline-flex items-center gap-2 px-10 py-4 rounded-xl text-sm font-semibold transition-colors hover:text-white hover:border-indigo-500"
                            style={{ color: "#94a3b8", border: "1px solid #334155" }}
                        >
                            Create Account
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

// ─── Main Export ──────────────────────────────────────────────────────
export default function Home() {
    return (
        <>
            <GlobalAnimations />
            <Hero />
            <Ticker />
            <FeaturedGadgets />
            <Categories />
            <WhyGadgetHub />
            <TopRated />
            <CTABanner />
        </>
    );
}