import React from "react";
import Link from "next/link";

function Memberbtn() {
    return (
        <div className="relative flex items-center justify-center">
            {/* Tombol utama */}
            <Link
                href="/Team"
                className="relative z-10 flex items-center justify-center md:px-10 md:py-5 px-5 py-2 text-white bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-300 focus:ring-opacity-50"
                style={{
                    boxShadow: `
                0 0 20px rgba(168, 85, 247, 0.6),
                0 0 40px rgba(168, 85, 247, 0.4),
                inset 0 0 15px rgba(255, 255, 255, 0.1)
            `,
                }}
            >
                <span className="font-bold text-sm md:text-lg tracking-wide">
                    Show More
                </span>
                <svg
                    className="ml-3"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
            </Link>
        </div>
    );
}

export default Memberbtn;
