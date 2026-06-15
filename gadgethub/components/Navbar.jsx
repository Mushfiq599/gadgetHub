"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";
import {
    Cpu,
    Menu,
    X,
    ChevronDown,
    LogOut,
    ShieldCheck,
} from "lucide-react";
import { FiPlusCircle, FiLayout, FiShoppingCart, FiPackage, FiUser } from "react-icons/fi";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/items", label: "Items" },
    { href: "/about", label: "About" },
];

export default function Navbar() {
    const { user, role, logout } = useAuth();
    const { cartCount } = useCart();
    const pathname = usePathname();
    const router = useRouter();

    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown on outside click
    useEffect(() => {
        function handle(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handle);
        return () => document.removeEventListener("mousedown", handle);
    }, []);

    // Close menus on route change
    useEffect(() => {
        setMenuOpen(false);
        setDropdownOpen(false);
    }, [pathname]);

    const handleLogout = async () => {
        await logout();
        toast.success("Logged out successfully");
        router.push("/");
    };

    const isActive = (href) =>
        href === "/" ? pathname === "/" : pathname.startsWith(href);

    // ── Dropdown menu items by role ──────────────────────────────────
    const adminMenuItems = [
        { href: "/items/add", icon: FiPlusCircle, label: "Add Item" },
        { href: "/items/manage", icon: FiLayout, label: "Manage Items" },
    ];

    const userMenuItems = [
        { href: "/cart", icon: FiShoppingCart, label: "My Cart", badge: cartCount },
        { href: "/orders", icon: FiPackage, label: "My Orders" },
    ];

    const menuItems = role === "admin" ? adminMenuItems : userMenuItems;

    // ── Avatar initial ───────────────────────────────────────────────
    const avatarLetter = user
        ? (user.displayName ? user.displayName[0] : user.email[0]).toUpperCase()
        : "?";

    const displayName = user?.displayName || user?.email || "";

    return (
        <header
            style={{ backgroundColor: "#0f172a", borderBottom: "1px solid #1e293b" }}
            className="sticky top-0 z-50"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* ── Logo ── */}
                    <Link href="/" className="flex items-center gap-2 flex-shrink-0">
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

                    {/* ── Desktop nav links ── */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                style={{
                                    color: isActive(link.href) ? "#6366f1" : "#94a3b8",
                                    backgroundColor: isActive(link.href)
                                        ? "rgba(99,102,241,0.1)"
                                        : "transparent",
                                }}
                                className="px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150 hover:text-white"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* ── Desktop right side ── */}
                    <div className="hidden md:flex items-center gap-3">
                        {!user ? (
                            <>
                                <Link
                                    href="/login"
                                    style={{ color: "#94a3b8" }}
                                    className="text-sm font-medium px-4 py-2 rounded-lg transition-colors hover:text-white"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    style={{ backgroundColor: "#6366f1" }}
                                    className="text-sm font-medium px-4 py-2 rounded-lg text-white transition-colors hover:opacity-90"
                                >
                                    Register
                                </Link>
                            </>
                        ) : (
                            <div className="relative" ref={dropdownRef}>

                                {/* Cart icon shortcut for users */}
                                {role === "user" && (
                                    <Link
                                        href="/cart"
                                        className="relative mr-2 p-2 rounded-lg transition-colors hover:bg-white/5"
                                        style={{ color: "#94a3b8" }}
                                    >
                                        <FiShoppingCart size={20} />
                                        {cartCount > 0 && (
                                            <span
                                                className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center text-white"
                                                style={{ backgroundColor: "#6366f1" }}
                                            >
                                                {cartCount > 9 ? "9+" : cartCount}
                                            </span>
                                        )}
                                    </Link>
                                )}

                                {/* Avatar button */}
                                <button
                                    onClick={() => setDropdownOpen((p) => !p)}
                                    style={{
                                        backgroundColor: "#1e293b",
                                        border: "1px solid #334155",
                                    }}
                                    className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors hover:border-indigo-500"
                                >
                                    {/* Avatar */}
                                    <div
                                        style={{
                                            backgroundColor:
                                                role === "admin" ? "#6366f1" : "#22c55e",
                                        }}
                                        className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold"
                                    >
                                        {avatarLetter}
                                    </div>
                                    <span
                                        style={{ color: "#f1f5f9" }}
                                        className="text-sm font-medium max-w-28 truncate"
                                    >
                                        {displayName}
                                    </span>
                                    <ChevronDown
                                        size={14}
                                        style={{ color: "#94a3b8" }}
                                        className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""
                                            }`}
                                    />
                                </button>

                                {/* ── Dropdown ── */}
                                {dropdownOpen && (
                                    <div
                                        style={{
                                            backgroundColor: "#1e293b",
                                            border: "1px solid #334155",
                                        }}
                                        className="absolute right-0 mt-2 w-56 rounded-xl shadow-xl overflow-hidden"
                                    >
                                        {/* User info */}
                                        <div
                                            style={{ borderBottom: "1px solid #334155" }}
                                            className="px-4 py-3"
                                        >
                                            <div className="flex items-center gap-2 mb-1">
                                                <p
                                                    style={{ color: "#f1f5f9" }}
                                                    className="text-sm font-medium truncate"
                                                >
                                                    {user.displayName || "User"}
                                                </p>
                                                {/* Role badge */}
                                                <span
                                                    className="text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1 flex-shrink-0"
                                                    style={
                                                        role === "admin"
                                                            ? {
                                                                backgroundColor: "rgba(99,102,241,0.15)",
                                                                color: "#6366f1",
                                                                border: "1px solid rgba(99,102,241,0.3)",
                                                            }
                                                            : {
                                                                backgroundColor: "rgba(34,197,94,0.12)",
                                                                color: "#22c55e",
                                                                border: "1px solid rgba(34,197,94,0.25)",
                                                            }
                                                    }
                                                >
                                                    {role === "admin" ? (
                                                        <><ShieldCheck size={10} /> Admin</>
                                                    ) : (
                                                        <><FiUser size={10} /> User</>
                                                    )}
                                                </span>
                                            </div>
                                            <p
                                                style={{ color: "#94a3b8" }}
                                                className="text-xs truncate"
                                            >
                                                {user.email}
                                            </p>
                                        </div>

                                        {/* Role-based menu items */}
                                        <div className="py-1">
                                            {menuItems.map(({ href, icon: Icon, label, badge }) => (
                                                <Link
                                                    key={href}
                                                    href={href}
                                                    className="flex items-center justify-between px-4 py-2.5 text-sm transition-colors hover:bg-white/5"
                                                    style={{ color: "#94a3b8" }}
                                                >
                                                    <span className="flex items-center gap-3">
                                                        <Icon size={15} />
                                                        {label}
                                                    </span>
                                                    {badge > 0 && (
                                                        <span
                                                            className="text-xs font-bold px-2 py-0.5 rounded-full text-white"
                                                            style={{ backgroundColor: "#6366f1" }}
                                                        >
                                                            {badge}
                                                        </span>
                                                    )}
                                                </Link>
                                            ))}
                                        </div>

                                        {/* Logout */}
                                        <div
                                            style={{ borderTop: "1px solid #334155" }}
                                            className="py-1"
                                        >
                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-white/5"
                                                style={{ color: "#ef4444" }}
                                            >
                                                <LogOut size={15} />
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* ── Mobile hamburger ── */}
                    <button
                        onClick={() => setMenuOpen((p) => !p)}
                        style={{ color: "#94a3b8" }}
                        className="md:hidden p-2 rounded-lg hover:text-white transition-colors"
                    >
                        {menuOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </div>

            {/* ── Mobile menu ── */}
            {menuOpen && (
                <div
                    style={{
                        backgroundColor: "#0f172a",
                        borderTop: "1px solid #1e293b",
                    }}
                    className="md:hidden px-4 py-4 space-y-1"
                >
                    {/* Nav links */}
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            style={{
                                color: isActive(link.href) ? "#6366f1" : "#94a3b8",
                                backgroundColor: isActive(link.href)
                                    ? "rgba(99,102,241,0.1)"
                                    : "transparent",
                            }}
                            className="block px-4 py-2.5 rounded-lg text-sm font-medium hover:text-white transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}

                    {/* Auth section */}
                    <div
                        style={{ borderTop: "1px solid #1e293b" }}
                        className="pt-3 mt-3"
                    >
                        {!user ? (
                            <div className="flex flex-col gap-2">
                                <Link
                                    href="/login"
                                    style={{ color: "#94a3b8", border: "1px solid #334155" }}
                                    className="block text-center px-4 py-2.5 rounded-lg text-sm font-medium hover:text-white transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    style={{ backgroundColor: "#6366f1" }}
                                    className="block text-center px-4 py-2.5 rounded-lg text-sm font-medium text-white hover:opacity-90 transition-opacity"
                                >
                                    Register
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-1">
                                {/* User info */}
                                <div className="px-4 py-2 flex items-center gap-2">
                                    <div
                                        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                                        style={{
                                            backgroundColor:
                                                role === "admin" ? "#6366f1" : "#22c55e",
                                        }}
                                    >
                                        {avatarLetter}
                                    </div>
                                    <div className="min-w-0">
                                        <p
                                            style={{ color: "#f1f5f9" }}
                                            className="text-sm font-medium truncate"
                                        >
                                            {user.displayName || "User"}
                                        </p>
                                        <p
                                            style={{ color: "#94a3b8" }}
                                            className="text-xs truncate"
                                        >
                                            {user.email}
                                        </p>
                                    </div>
                                    <span
                                        className="ml-auto text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                                        style={
                                            role === "admin"
                                                ? { backgroundColor: "rgba(99,102,241,0.15)", color: "#6366f1" }
                                                : { backgroundColor: "rgba(34,197,94,0.12)", color: "#22c55e" }
                                        }
                                    >
                                        {role === "admin" ? "Admin" : "User"}
                                    </span>
                                </div>

                                {/* Role-based links */}
                                {menuItems.map(({ href, icon: Icon, label, badge }) => (
                                    <Link
                                        key={href}
                                        href={href}
                                        style={{ color: "#94a3b8" }}
                                        className="flex items-center justify-between px-4 py-2.5 rounded-lg text-sm hover:text-white hover:bg-white/5 transition-colors"
                                    >
                                        <span className="flex items-center gap-3">
                                            <Icon size={15} />
                                            {label}
                                        </span>
                                        {badge > 0 && (
                                            <span
                                                className="text-xs font-bold px-2 py-0.5 rounded-full text-white"
                                                style={{ backgroundColor: "#6366f1" }}
                                            >
                                                {badge}
                                            </span>
                                        )}
                                    </Link>
                                ))}

                                {/* Logout */}
                                <button
                                    onClick={handleLogout}
                                    style={{ color: "#ef4444" }}
                                    className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm hover:bg-white/5 transition-colors"
                                >
                                    <LogOut size={15} />
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}