"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
    const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
    const [isHovered, setIsHovered] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!isVisible) setIsVisible(true);
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseLeave = () => {
            setIsVisible(false);
        };

        // Detect hover on interactive elements (links, buttons, inputs)
        const handleMouseOver = (e) => {
            if (
                e.target.tagName === "A" ||
                e.target.tagName === "BUTTON" ||
                e.target.closest("a") ||
                e.target.closest("button") ||
                e.target.tagName === "INPUT" ||
                e.target.tagName === "TEXTAREA" ||
                e.target.tagName === "SELECT"
            ) {
                setIsHovered(true);
            } else {
                setIsHovered(false);
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseleave", handleMouseLeave);
        document.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseleave", handleMouseLeave);
            document.removeEventListener("mouseover", handleMouseOver);
        };
    }, [isVisible]);

    if (!isVisible) return null;

    return (
        <>
            {/* Inner Sharp Dot */}
            <motion.div
                className="pointer-events-none fixed z-[9999] rounded-full bg-slate-900 hidden md:block"
                animate={{
                    x: mousePosition.x - 4,
                    y: mousePosition.y - 4,
                    scale: isHovered ? 0.5 : 1,
                }}
                transition={{ type: "spring", stiffness: 1000, damping: 50 }}
                style={{ width: 8, height: 8 }}
            />

            {/* Outer Following Ring with Hover Expansion */}
            <motion.div
                className="pointer-events-none fixed z-[9998] rounded-full border border-amber-600/80 bg-amber-500/10 hidden md:block"
                animate={{
                    x: mousePosition.x - (isHovered ? 24 : 18),
                    y: mousePosition.y - (isHovered ? 24 : 18),
                    width: isHovered ? 48 : 36,
                    height: isHovered ? 48 : 36,
                    scale: isHovered ? 1.1 : 1,
                }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
            />
        </>
    );
}