import Link from "next/link";
import {
    Cpu,
    Target,
    Users,
    Zap,
    ArrowRight,
    Github,
    Mail,
} from "lucide-react";

const stats = [
    { value: "10+", label: "Curated Gadgets" },
    { value: "7", label: "Categories" },
    { value: "4.7★", label: "Average Rating" },
    { value: "100%", label: "Passion Driven" },
];

const team = [
    {
        name: "Alex Rivera",
        role: "Founder & Curator",
        avatar: "AR",
        color: "#6366f1",
        bio: "Obsessed with finding gadgets that genuinely improve daily life.",
    },
    {
        name: "Mia Chen",
        role: "Tech Reviewer",
        avatar: "MC",
        color: "#22d3ee",
        bio: "Tests every product rigorously before it makes the cut.",
    },
    {
        name: "Jordan Blake",
        role: "UI Designer",
        avatar: "JB",
        color: "#a855f7",
        bio: "Makes sure the experience is as good as the products.",
    },
];

const values = [
    {
        icon: Target,
        color: "#6366f1",
        title: "Curation over quantity",
        description:
            "We'd rather show you 10 perfect gadgets than 1,000 mediocre ones. Every item on GadgetHub is here for a reason.",
    },
    {
        icon: Users,
        color: "#22d3ee",
        title: "Community first",
        description:
            "GadgetHub is built for real users — enthusiasts, professionals, and everyday people looking for reliable tech.",
    },
    {
        icon: Zap,
        color: "#22c55e",
        title: "Always current",
        description:
            "We update our catalogue regularly so you're always looking at gadgets that are available and worth buying today.",
    },
];

export default function AboutPage() {
    return (
        <div style={{ backgroundColor: "#0f172a", minHeight: "100vh" }}>

            {/* ── Hero ── */}
            <section
                style={{
                    background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)",
                    borderBottom: "1px solid #1e293b",
                }}
                className="py-20 sm:py-28"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    {/* Logo mark */}
                    <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                        style={{ backgroundColor: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.3)" }}
                    >
                        <Cpu size={32} style={{ color: "#6366f1" }} />
                    </div>

                    <h1
                        className="text-4xl sm:text-5xl font-extrabold mb-5 tracking-tight"
                        style={{ color: "#f1f5f9" }}
                    >
                        About{" "}
                        <span
                            style={{
                                background: "linear-gradient(90deg, #6366f1, #22d3ee)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            GadgetHub
                        </span>
                    </h1>

                    <p
                        className="text-lg max-w-2xl mx-auto leading-relaxed"
                        style={{ color: "#94a3b8" }}
                    >
                        GadgetHub is a curated showcase of the best tech gadgets available
                        today. We cut through the noise so you can discover devices that are
                        genuinely worth your time and money.
                    </p>
                </div>
            </section>

            {/* ── Stats ── */}
            <section
                style={{ borderBottom: "1px solid #1e293b" }}
                className="py-14"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {stats.map((stat) => (
                            <div
                                key={stat.label}
                                style={{
                                    backgroundColor: "#1e293b",
                                    border: "1px solid #334155",
                                }}
                                className="rounded-2xl py-8 px-6 text-center hover:border-indigo-500 transition-colors"
                            >
                                <div
                                    className="text-4xl font-extrabold mb-2"
                                    style={{ color: "#6366f1" }}
                                >
                                    {stat.value}
                                </div>
                                <div className="text-sm" style={{ color: "#94a3b8" }}>
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Mission ── */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                        {/* Text */}
                        <div>
                            <p
                                className="text-sm font-medium mb-3 uppercase tracking-wider"
                                style={{ color: "#6366f1" }}
                            >
                                Our Mission
                            </p>
                            <h2
                                className="text-3xl font-bold mb-5"
                                style={{ color: "#f1f5f9" }}
                            >
                                Making great tech accessible to everyone
                            </h2>
                            <div className="space-y-4">
                                <p className="text-sm leading-relaxed" style={{ color: "#94a3b8" }}>
                                    The tech world moves fast. New gadgets launch every day, and
                                    it's nearly impossible to know what's actually worth buying.
                                    GadgetHub exists to solve that problem.
                                </p>
                                <p className="text-sm leading-relaxed" style={{ color: "#94a3b8" }}>
                                    We spend hours researching, comparing, and evaluating gadgets
                                    across every major category — from wireless earbuds and
                                    smartwatches to mechanical keyboards and gaming gear. Only the
                                    best make it onto the platform.
                                </p>
                                <p className="text-sm leading-relaxed" style={{ color: "#94a3b8" }}>
                                    Whether you're a tech enthusiast hunting for the next upgrade
                                    or a first-time buyer looking for a reliable recommendation,
                                    GadgetHub gives you the information you need to decide with
                                    confidence.
                                </p>
                            </div>
                            <Link
                                href="/items"
                                style={{ backgroundColor: "#6366f1" }}
                                className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-opacity"
                            >
                                Browse Gadgets
                                <ArrowRight size={15} />
                            </Link>
                        </div>

                        {/* Visual card */}
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { label: "Earbuds & Audio", count: "2 items", color: "#6366f1" },
                                { label: "Smartwatches", count: "2 items", color: "#22d3ee" },
                                { label: "Keyboards", count: "1 item", color: "#a855f7" },
                                { label: "Gaming Gear", count: "2 items", color: "#ef4444" },
                                { label: "Power Banks", count: "1 item", color: "#22c55e" },
                                { label: "Webcams", count: "1 item", color: "#f59e0b" },
                            ].map((item) => (
                                <div
                                    key={item.label}
                                    style={{
                                        backgroundColor: "#1e293b",
                                        border: "1px solid #334155",
                                    }}
                                    className="rounded-xl p-4 hover:border-indigo-500 transition-colors"
                                >
                                    <div
                                        className="w-2 h-2 rounded-full mb-3"
                                        style={{ backgroundColor: item.color }}
                                    />
                                    <p
                                        className="text-sm font-semibold"
                                        style={{ color: "#f1f5f9" }}
                                    >
                                        {item.label}
                                    </p>
                                    <p className="text-xs mt-1" style={{ color: "#94a3b8" }}>
                                        {item.count}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Values ── */}
            <section
                style={{
                    backgroundColor: "#0a1120",
                    borderTop: "1px solid #1e293b",
                    borderBottom: "1px solid #1e293b",
                }}
                className="py-20"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <p
                            className="text-sm font-medium mb-2 uppercase tracking-wider"
                            style={{ color: "#6366f1" }}
                        >
                            What We Stand For
                        </p>
                        <h2 className="text-3xl font-bold" style={{ color: "#f1f5f9" }}>
                            Our Values
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {values.map(({ icon: Icon, color, title, description }) => (
                            <div
                                key={title}
                                style={{
                                    backgroundColor: "#1e293b",
                                    border: "1px solid #334155",
                                }}
                                className="p-8 rounded-2xl hover:border-indigo-500 transition-colors"
                            >
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                                    style={{ backgroundColor: `${color}1a` }}
                                >
                                    <Icon size={22} style={{ color }} />
                                </div>
                                <h3
                                    className="font-semibold text-lg mb-3"
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

            {/* ── Team ── */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <p
                            className="text-sm font-medium mb-2 uppercase tracking-wider"
                            style={{ color: "#6366f1" }}
                        >
                            The People Behind It
                        </p>
                        <h2 className="text-3xl font-bold" style={{ color: "#f1f5f9" }}>
                            Meet the Team
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
                        {team.map((member) => (
                            <div
                                key={member.name}
                                style={{
                                    backgroundColor: "#1e293b",
                                    border: "1px solid #334155",
                                }}
                                className="p-6 rounded-2xl text-center hover:border-indigo-500 transition-colors"
                            >
                                {/* Avatar */}
                                <div
                                    className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg"
                                    style={{ backgroundColor: member.color }}
                                >
                                    {member.avatar}
                                </div>
                                <h3
                                    className="font-semibold text-base"
                                    style={{ color: "#f1f5f9" }}
                                >
                                    {member.name}
                                </h3>
                                <p
                                    className="text-xs font-medium mt-0.5 mb-3"
                                    style={{ color: member.color }}
                                >
                                    {member.role}
                                </p>
                                <p className="text-xs leading-relaxed" style={{ color: "#94a3b8" }}>
                                    {member.bio}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section
                style={{
                    backgroundColor: "#0a1120",
                    borderTop: "1px solid #1e293b",
                }}
                className="py-20"
            >
                <div className="max-w-2xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4" style={{ color: "#f1f5f9" }}>
                        Ready to explore?
                    </h2>
                    <p className="text-sm mb-8" style={{ color: "#94a3b8" }}>
                        Browse our full catalogue and find your next favourite gadget.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/items"
                            style={{ backgroundColor: "#6366f1" }}
                            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-opacity"
                        >
                            Browse All Gadgets
                            <ArrowRight size={15} />
                        </Link>

                        <Link
                            href="mailto:hello@gadgethub.com"
                            style={{ color: "#94a3b8", border: "1px solid #334155" }}
                            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold hover:text-white hover:border-indigo-500 transition-colors"
                        >
                            <Mail size={15} />
                            Get in touch
                        </Link>
                    </div>
                </div>
            </section >

        </div >
    );
}