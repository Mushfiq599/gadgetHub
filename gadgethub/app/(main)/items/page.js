"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { gadgets, CATEGORIES } from "@/lib/data";
import GadgetCard from "@/components/GadgetCard";
import { Search, SlidersHorizontal, X } from "lucide-react";

const SORT_OPTIONS = [
    { value: "default", label: "Default" },
    { value: "price-asc", label: "Price: Low → High" },
    { value: "price-desc", label: "Price: High → Low" },
    { value: "rating-desc", label: "Top Rated" },
    { value: "name-asc", label: "Name: A → Z" },
];

export default function ItemsPage() {
    const searchParams = useSearchParams();
    const initialCategory = searchParams.get("category") || "All";

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState(initialCategory);
    const [sort, setSort] = useState("default");

    // Filtered + sorted list
    const filtered = useMemo(() => {
        let list = [...gadgets];

        // Search filter
        if (search.trim()) {
            const q = search.toLowerCase();
            list = list.filter(
                (g) =>
                    g.title.toLowerCase().includes(q) ||
                    g.shortDescription.toLowerCase().includes(q) ||
                    g.brand.toLowerCase().includes(q)
            );
        }

        // Category filter
        if (category !== "All") {
            list = list.filter((g) => g.category === category);
        }

        // Sort
        switch (sort) {
            case "price-asc":
                list.sort((a, b) => a.price - b.price);
                break;
            case "price-desc":
                list.sort((a, b) => b.price - a.price);
                break;
            case "rating-desc":
                list.sort((a, b) => b.rating - a.rating);
                break;
            case "name-asc":
                list.sort((a, b) => a.title.localeCompare(b.title));
                break;
            default:
                break;
        }

        return list;
    }, [search, category, sort]);

    const clearFilters = () => {
        setSearch("");
        setCategory("All");
        setSort("default");
    };

    const hasActiveFilters =
        search.trim() !== "" || category !== "All" || sort !== "default";

    return (
        <div style={{ backgroundColor: "#0f172a", minHeight: "100vh" }}>
            {/* Page header */}
            <div
                style={{
                    backgroundColor: "#0a1120",
                    borderBottom: "1px solid #1e293b",
                }}
                className="py-12"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="text-sm font-medium mb-1" style={{ color: "#6366f1" }}>
                        BROWSE
                    </p>
                    <h1 className="text-3xl font-bold" style={{ color: "#f1f5f9" }}>
                        All Gadgets
                    </h1>
                    <p className="mt-2 text-sm" style={{ color: "#94a3b8" }}>
                        {gadgets.length} products across {CATEGORIES.length - 1} categories
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* ── Filters bar ── */}
                <div
                    style={{
                        backgroundColor: "#1e293b",
                        border: "1px solid #334155",
                    }}
                    className="rounded-2xl p-4 mb-8 flex flex-col lg:flex-row gap-4 items-stretch lg:items-center"
                >
                    {/* Search */}
                    <div className="relative flex-1">
                        <Search
                            size={16}
                            className="absolute left-3 top-1/2 -translate-y-1/2"
                            style={{ color: "#94a3b8" }}
                        />
                        <input
                            type="text"
                            placeholder="Search gadgets, brands..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={{
                                backgroundColor: "#0f172a",
                                border: "1px solid #334155",
                                color: "#f1f5f9",
                            }}
                            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-500"
                        />
                    </div>

                    {/* Category filter */}
                    <div className="flex items-center gap-2">
                        <SlidersHorizontal size={15} style={{ color: "#94a3b8" }} />
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            style={{
                                backgroundColor: "#0f172a",
                                border: "1px solid #334155",
                                color: "#f1f5f9",
                            }}
                            className="px-3 py-2.5 rounded-xl text-sm outline-none focus:border-indigo-500 transition-colors cursor-pointer"
                        >
                            {CATEGORIES.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Sort filter */}
                    <div>
                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            style={{
                                backgroundColor: "#0f172a",
                                border: "1px solid #334155",
                                color: "#f1f5f9",
                            }}
                            className="px-3 py-2.5 rounded-xl text-sm outline-none focus:border-indigo-500 transition-colors cursor-pointer"
                        >
                            {SORT_OPTIONS.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Clear button */}
                    {hasActiveFilters && (
                        <button
                            onClick={clearFilters}
                            style={{
                                color: "#ef4444",
                                border: "1px solid rgba(239,68,68,0.3)",
                                backgroundColor: "rgba(239,68,68,0.08)",
                            }}
                            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-red-500/20 transition-colors"
                        >
                            <X size={14} />
                            Clear
                        </button>
                    )}
                </div>

                {/* ── Category pill tabs (quick filter) ── */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setCategory(cat)}
                            style={{
                                backgroundColor:
                                    category === cat
                                        ? "#6366f1"
                                        : "rgba(30,41,59,0.8)",
                                color: category === cat ? "white" : "#94a3b8",
                                border:
                                    category === cat
                                        ? "1px solid #6366f1"
                                        : "1px solid #334155",
                            }}
                            className="px-4 py-1.5 rounded-full text-sm font-medium hover:border-indigo-500 transition-all duration-150"
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* ── Results count ── */}
                <div className="flex items-center justify-between mb-6">
                    <p className="text-sm" style={{ color: "#94a3b8" }}>
                        Showing{" "}
                        <span style={{ color: "#f1f5f9" }} className="font-medium">
                            {filtered.length}
                        </span>{" "}
                        {filtered.length === 1 ? "result" : "results"}
                        {category !== "All" && (
                            <span>
                                {" "}in{" "}
                                <span style={{ color: "#6366f1" }} className="font-medium">
                                    {category}
                                </span>
                            </span>
                        )}
                    </p>
                </div>

                {/* ── Grid ── */}
                {filtered.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filtered.map((gadget) => (
                            <GadgetCard key={gadget.id} gadget={gadget} />
                        ))}
                    </div>
                ) : (
                    /* Empty state */
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <div
                            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                            style={{ backgroundColor: "#1e293b" }}
                        >
                            <Search size={28} style={{ color: "#334155" }} />
                        </div>
                        <h3 className="text-lg font-semibold mb-2" style={{ color: "#f1f5f9" }}>
                            No gadgets found
                        </h3>
                        <p className="text-sm mb-6" style={{ color: "#94a3b8" }}>
                            Try a different search term or clear your filters.
                        </p>
                        <button
                            onClick={clearFilters}
                            style={{ backgroundColor: "#6366f1" }}
                            className="px-6 py-2.5 rounded-xl text-sm font-medium text-white hover:opacity-90 transition-opacity"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}