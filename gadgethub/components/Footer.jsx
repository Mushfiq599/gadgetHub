import Link from "next/link";
import { Cpu, Code2, X, Video } from "lucide-react";

export default function Footer() {
    return (
        <footer
            style={{
                backgroundColor: "#0f172a",
                borderTop: "1px solid #1e293b",
            }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Brand */}
                    <div className="space-y-3">
                        <Link href="/" className="flex items-center gap-2">
                            <div
                                style={{ backgroundColor: "#6366f1" }}
                                className="w-8 h-8 rounded-lg flex items-center justify-center"
                            >
                                <Cpu size={18} color="white" />
                            </div>
                            <span className="font-bold text-xl" style={{ color: "#f1f5f9" }}>
                                Gadget<span style={{ color: "#6366f1" }}>Hub</span>
                            </span>
                        </Link>
                        <p style={{ color: "#94a3b8" }} className="text-sm leading-relaxed">
                            Curated tech gadgets for enthusiasts, professionals, and everyday users.
                        </p>
                        <div className="flex items-center gap-3 pt-1">
                            {[Code2, X, Video].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    style={{ color: "#94a3b8", backgroundColor: "#1e293b" }}
                                    className="w-9 h-9 rounded-lg flex items-center justify-center hover:text-white transition-colors"
                                >
                                    <Icon size={16} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick links */}
                    <div>
                        <h3
                            style={{ color: "#f1f5f9" }}
                            className="font-semibold text-sm mb-4 uppercase tracking-wider"
                        >
                            Navigation
                        </h3>
                        <ul className="space-y-2">
                            {[
                                { href: "/", label: "Home" },
                                { href: "/items", label: "Browse Items" },
                                { href: "/about", label: "About" },
                                { href: "/items/add", label: "Add a Gadget" },
                            ].map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        style={{ color: "#94a3b8" }}
                                        className="text-sm hover:text-white transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h3
                            style={{ color: "#f1f5f9" }}
                            className="font-semibold text-sm mb-4 uppercase tracking-wider"
                        >
                            Categories
                        </h3>
                        <ul className="space-y-2">
                            {["Earbuds", "Smartwatch", "Keyboard", "Gaming", "Power", "Webcam"].map(
                                (cat) => (
                                    <li key={cat}>
                                        <Link
                                            href={`/items?category=${cat}`}
                                            style={{ color: "#94a3b8" }}
                                            className="text-sm hover:text-white transition-colors"
                                        >
                                            {cat}
                                        </Link>
                                    </li>
                                )
                            )}
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div
                    style={{ borderTop: "1px solid #1e293b" }}
                    className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
                >
                    <p style={{ color: "#94a3b8" }} className="text-sm">
                        © {new Date().getFullYear()} GadgetHub. All rights reserved.
                    </p>
                    <p style={{ color: "#94a3b8" }} className="text-sm">
                        Built with Next.js & Firebase
                    </p>
                </div>
            </div>
        </footer >
    );
}