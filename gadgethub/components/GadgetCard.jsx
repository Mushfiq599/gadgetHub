import Link from "next/link";
import Image from "next/image";
import { Star, ArrowRight } from "lucide-react";

export default function GadgetCard({ gadget }) {
    return (
        <div
            style={{
                backgroundColor: "#1e293b",
                border: "1px solid #334155",
            }}
            className="group rounded-2xl overflow-hidden hover:border-indigo-500 hover:-translate-y-1 transition-all duration-200 flex flex-col"
        >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
                <Image
                    src={gadget.imageUrl}
                    alt={gadget.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Category badge */}
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
                {/* Rating badge */}
                <div className="absolute top-3 right-3">
                    <span
                        className="text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1"
                        style={{
                            backgroundColor: "rgba(0,0,0,0.6)",
                            color: "#f59e0b",
                        }}
                    >
                        <Star size={11} fill="#f59e0b" />
                        {gadget.rating}
                    </span>
                </div>
            </div>

            {/* Body */}
            <div className="p-5 flex flex-col flex-1">
                <p className="text-xs mb-1" style={{ color: "#94a3b8" }}>
                    {gadget.brand}
                </p>
                <h3
                    className="font-semibold text-base mb-2 leading-snug"
                    style={{ color: "#f1f5f9" }}
                >
                    {gadget.title}
                </h3>
                <p
                    className="text-sm leading-relaxed flex-1"
                    style={{ color: "#94a3b8" }}
                >
                    {gadget.shortDescription}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between mt-5 pt-4"
                    style={{ borderTop: "1px solid #334155" }}
                >
                    <span className="font-bold text-lg" style={{ color: "#6366f1" }}>
                        ${gadget.price}
                    </span>
                    <Link
                        href={`/items/${gadget.id}`}
                        style={{
                            backgroundColor: "rgba(99,102,241,0.15)",
                            color: "#6366f1",
                            border: "1px solid rgba(99,102,241,0.3)",
                        }}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all duration-150"
                    >
                        View Details
                        <ArrowRight size={13} />
                    </Link>
                </div>
            </div>
        </div>
    );
}