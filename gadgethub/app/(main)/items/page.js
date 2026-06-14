"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { gadgets as seedGadgets, CATEGORIES } from "@/lib/data";
import GadgetCard from "@/components/GadgetCard";
import {
    Search,
    SlidersHorizontal,
    X,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

const SORT_OPTIONS = [
    { value: "default", label: "Default" },
    { value: "price-asc", label: "Price: Low → High" },
    { value: "price-desc", label: "Price: High → Low" },
    { value: "rating-desc", label: "Top Rated" },
    { value: "name-asc", label: "Name: A → Z" },
];

const ITEMS_PER_PAGE = 12;

function ItemsContent() {
    const searchParams = useSearchParams();
    const initialCategory = searchParams.get("category") || "All";

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState(initialCategory);
    const [sort, setSort] = useState("default");
    const [allGadgets, setAllGadgets] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [mounted, setMounted] = useState(false);

    // Load seed + localStorage only once on mount
    useEffect(() => {
        const stored = JSON.parse(
            localStorage.getItem("gadgethub_items") || "[]"
        );
        setAllGadgets([...seedGadgets, ...stored]);
        setMounted(true);
    }, []);

    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [search, category, sort]);

    // Filtered + sorted list
    const filtered = useMemo(() => {
        if (!mounted) return [];

        let list = [...allGadgets];

        if (search.trim()) {
            const q = search.toLowerCase();
            list = list.filter(
                (g) =>
                    g.title.toLowerCase().includes(q) ||
                    g.shortDescription.toLowerCase().includes(q) ||
                    g.brand.toLowerCase().includes(q)
            );
        }

        if (category !== "All") {
            list = list.filter((g) => g.category === category);
        }

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
    }, [search, category, sort, allGadgets, mounted]);

    // Pagination
    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedItems = filtered.slice(startIndex, endIndex);

    const clearFilters = () => {
        setSearch("");
        setCategory("All");
        setSort("default");
        setCurrentPage(1);
    };

    const hasActiveFilters =
        search.trim() !== "" || category !== "All" || sort !== "default";

    const getPageNumbers = () => {
        const pages = [];
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else if (currentPage <= 4) {
            pages.push(1, 2, 3, 4, 5, "...", totalPages);
        } else if (currentPage >= totalPages - 3) {
            pages.push(
                1,
                "...",
                totalPages - 4,
                totalPages - 3,
                totalPages - 2,
                totalPages - 1,
                totalPages
            );
        } else {
            pages.push(
                1,
                "...",
                currentPage - 1,
                currentPage,
                currentPage + 1,
                "...",
                totalPages
            );
        }
        return pages;
    };

    // Show skeleton while loading
    if (!mounted) {
        return (
            <div style={{ backgroundColor: "#0f172a", minHeight: "100vh" }}>
                <div
                    style={{
                        backgroundColor: "#0a1120",
                        borderBottom: "1px solid #1e293b",
                    }}
                    className="py-12"
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div
                            className="h-4 w-24 rounded mb-3"
                            style={{ backgroundColor: "#1e293b" }}
                        />
                        <div
                            className="h-8 w-48 rounded"
                            style={{ backgroundColor: "#1e293b" }}
                        />
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <div
                                key={i}
                                className="rounded-2xl overflow-hidden animate-pulse"
                                style={{
                                    backgroundColor: "#1e293b",
                                    border: "1px solid #334155",
                                    height: "320px",
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

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
                    <p
                        className="text-sm font-medium mb-1"
                        style={{ color: "#6366f1" }}
                    >
                        BROWSE
                    </p>
                    <h1 className="text-3xl font-bold" style={{ color: "#f1f5f9" }}>
                        All Gadgets
                    </h1>
                    <p className="mt-2 text-sm" style={{ color: "#94a3b8" }}>
                        {allGadgets.length} products across {CATEGORIES.length - 1}{" "}
                        categories
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Filters bar */}
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

                    {/* Category */}
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

                    {/* Sort */}
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

                    {/* Clear */}
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

                {/* Category pills */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setCategory(cat)}
                            style={{
                                backgroundColor:
                                    category === cat ? "#6366f1" : "rgba(30,41,59,0.8)",
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

                {/* Results info */}
                <div className="flex items-center justify-between mb-6">
                    <p className="text-sm" style={{ color: "#94a3b8" }}>
                        Showing{" "}
                        <span style={{ color: "#f1f5f9" }} className="font-medium">
                            {filtered.length === 0 ? 0 : startIndex + 1}–
                            {Math.min(endIndex, filtered.length)}
                        </span>{" "}
                        of{" "}
                        <span style={{ color: "#f1f5f9" }} className="font-medium">
                            {filtered.length}
                        </span>{" "}
                        results
                        {category !== "All" && (
                            <span>
                                {" "}
                                in{" "}
                                <span
                                    style={{ color: "#6366f1" }}
                                    className="font-medium"
                                >
                                    {category}
                                </span>
                            </span>
                        )}
                    </p>
                    {totalPages > 1 && (
                        <p className="text-sm" style={{ color: "#94a3b8" }}>
                            Page{" "}
                            <span style={{ color: "#f1f5f9" }} className="font-medium">
                                {currentPage}
                            </span>{" "}
                            of{" "}
                            <span style={{ color: "#f1f5f9" }} className="font-medium">
                                {totalPages}
                            </span>
                        </p>
                    )}
                </div>

                {/* Grid */}
                {paginatedItems.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
                            {paginatedItems.map((gadget) => (
                                <GadgetCard key={gadget.id} gadget={gadget} />
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-center gap-2 mt-6">
                                {/* Prev */}
                                <button
                                    onClick={() =>
                                        setCurrentPage((p) => Math.max(p - 1, 1))
                                    }
                                    disabled={currentPage === 1}
                                    style={{
                                        backgroundColor: "#1e293b",
                                        border: "1px solid #334155",
                                        color: currentPage === 1 ? "#475569" : "#94a3b8",
                                    }}
                                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium hover:border-indigo-500 hover:text-white transition-colors disabled:cursor-not-allowed disabled:hover:border-slate-700 disabled:hover:text-slate-500"
                                >
                                    <ChevronLeft size={15} />
                                    Prev
                                </button>

                                {/* Page numbers */}
                                <div className="flex items-center gap-1.5">
                                    {getPageNumbers().map((page, i) =>
                                        page === "..." ? (
                                            <span
                                                key={`ellipsis-${i}`}
                                                className="px-2 text-sm"
                                                style={{ color: "#475569" }}
                                            >
                                                …
                                            </span>
                                        ) : (
                                            <button
                                                key={`page-${page}`}
                                                onClick={() => setCurrentPage(page)}
                                                style={{
                                                    backgroundColor:
                                                        currentPage === page ? "#6366f1" : "#1e293b",
                                                    border:
                                                        currentPage === page
                                                            ? "1px solid #6366f1"
                                                            : "1px solid #334155",
                                                    color:
                                                        currentPage === page ? "white" : "#94a3b8",
                                                    minWidth: "38px",
                                                    height: "36px",
                                                }}
                                                className="px-3 rounded-xl text-sm font-medium hover:border-indigo-500 hover:text-white transition-colors"
                                            >
                                                {page}
                                            </button>
                                        )
                                    )}
                                </div>

                                {/* Next */}
                                <button
                                    onClick={() =>
                                        setCurrentPage((p) => Math.min(p + 1, totalPages))
                                    }
                                    disabled={currentPage === totalPages}
                                    style={{
                                        backgroundColor: "#1e293b",
                                        border: "1px solid #334155",
                                        color:
                                            currentPage === totalPages ? "#475569" : "#94a3b8",
                                    }}
                                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium hover:border-indigo-500 hover:text-white transition-colors disabled:cursor-not-allowed disabled:hover:border-slate-700 disabled:hover:text-slate-500"
                                >
                                    Next
                                    <ChevronRight size={15} />
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <div
                            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                            style={{ backgroundColor: "#1e293b" }}
                        >
                            <Search size={28} style={{ color: "#334155" }} />
                        </div>
                        <h3
                            className="text-lg font-semibold mb-2"
                            style={{ color: "#f1f5f9" }}
                        >
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

export default function ItemsPage() {
    return (
        <Suspense
            fallback={
                <div
                    style={{ backgroundColor: "#0f172a", minHeight: "100vh" }}
                    className="flex items-center justify-center"
                >
                    <div
                        className="w-8 h-8 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin"
                    />
                </div>
            }
        >
            <ItemsContent />
        </Suspense>
    );
}