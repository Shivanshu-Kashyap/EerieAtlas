import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import heroBg from "../../assets/hero_background_v2.png";
import crowSvg from "../../assets/crow.svg";

type PinType = "ghost" | "ufo" | "witchcraft" | "possession";

interface Location {
    id: number;
    x: number;
    y: number;
    type: PinType;
    title: string;
}

const locations: Location[] = [
    { id: 1, x: 20, y: 35, type: "ghost", title: "Winchester Mystery House" },
    { id: 2, x: 48, y: 28, type: "witchcraft", title: "Black Forest" },
    { id: 3, x: 75, y: 20, type: "ufo", title: "Tunguska Event" },
    { id: 4, x: 88, y: 30, type: "possession", title: "Aokigahara Forest" },
    { id: 5, x: 18, y: 45, type: "ufo", title: "Roswell" },
    { id: 6, x: 52, y: 60, type: "ghost", title: "Castle of Good Hope" },
    { id: 7, x: 65, y: 45, type: "witchcraft", title: "Bhangarh Fort" },
];

export function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();
    const navigate = useNavigate();

    // Parallax transforms
    const bgY = useTransform(scrollY, [0, 1000], [0, 300]);
    const mapY = useTransform(scrollY, [0, 1000], [0, 150]);
    const textY = useTransform(scrollY, [0, 500], [0, 100]);

    return (
        <section ref={containerRef} className="relative h-screen min-h-[900px] flex items-center justify-center overflow-hidden bg-black">

            {/* 1. Background Image with Parallax & Lightning */}
            <motion.div
                className="absolute inset-0 z-0"
                style={{ y: bgY }}
            >
                <img
                    src={heroBg}
                    alt="Haunted Mansion and Reaper"
                    className="absolute inset-0 w-full h-full object-cover object-[center_top] scale-105"
                />
                <div className="absolute inset-0 bg-black/30 mix-blend-multiply" /> {/* Depth Dimmer */}

                {/* Lightning Flash Overlay */}
                <motion.div
                    className="absolute inset-0 bg-blue-100/10 mix-blend-overlay z-10 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.4, 0, 0.1, 0] }}
                    transition={{
                        duration: 0.2,
                        repeat: Infinity,
                        repeatDelay: 5 + Math.random() * 10, // Random thunder strikes
                        ease: "easeOut"
                    }}
                />

                {/* Vignette for Cinematic Focus */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.5)_60%,black_100%)]" />
            </motion.div>

            {/* 2. Fog Layers - REMOVED */}


            {/* 3. Flying Crows Animation */}
            <div className="absolute top-1/4 left-0 w-full h-full pointer-events-none z-10 overflow-hidden">
                <motion.img
                    src={crowSvg}
                    alt="Crow"
                    className="absolute w-12 h-8 opacity-80 object-contain drop-shadow-lg"
                    initial={{ x: "-10vw", y: "20vh", scale: 0.5 }}
                    animate={{ x: "110vw", y: "10vh", scale: 0.8 }}
                    transition={{ duration: 12, repeat: Infinity, delay: 2, ease: "linear" }}
                />
                <motion.img
                    src={crowSvg}
                    alt="Crow"
                    className="absolute w-8 h-6 opacity-70 object-contain drop-shadow-lg"
                    initial={{ x: "-10vw", y: "25vh", scale: 0.3 }}
                    animate={{ x: "110vw", y: "15vh", scale: 0.5 }}
                    transition={{ duration: 14, repeat: Infinity, delay: 5, ease: "linear" }}
                />
            </div>

            {/* 4. Mansion Window Glow - Pulsing Warmth */}
            <motion.div
                className="absolute top-[35%] left-[22%] w-16 h-24 bg-orange-600/40 rounded-full blur-[40px] mix-blend-screen opacity-0 z-10"
                animate={{ opacity: [0.1, 0.3, 0.1, 0.2] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* 5. Ghost/Reaper Presence - Subtle Aura */}
            <motion.div
                className="absolute bottom-[30%] right-[12%] w-32 h-64 bg-cyan-900/20 rounded-full blur-[60px] mix-blend-screen opacity-20 z-10"
                animate={{ opacity: [0.1, 0.25, 0.1] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* 6. World Map with Holographic Feel - Ambient Background */}
            <motion.div
                className="absolute inset-x-0 top-[48%] -translate-y-1/2 h-[80%] z-10 opacity-30 mix-blend-overlay pointer-events-none"
                style={{ y: mapY }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 0.3, scale: 1 }}
                transition={{ duration: 2, delay: 0.5 }}
            >
                <div
                    className="w-full h-full bg-contain bg-center bg-no-repeat"
                    style={{
                        backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg")',
                        filter: "invert(1) sepia(20%) hue-rotate(180deg) saturate(50%) contrast(150%)",
                        maskImage: "radial-gradient(circle at center, black 30%, transparent 80%)"
                    }}
                />
            </motion.div>

            {/* 6. Floating Particles (Embers & Dust) - WARMER */}
            <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-orange-200/40 rounded-full blur-[1px]"
                        initial={{
                            x: Math.random() * window.innerWidth,
                            y: window.innerHeight + 10,
                            opacity: 0
                        }}
                        animate={{
                            y: -100,
                            opacity: [0, 0.3, 0],
                            x: `calc(${Math.random() * 100}vw + ${(Math.random() - 0.5) * 50}px)`
                        }}
                        transition={{
                            duration: 8 + Math.random() * 5,
                            repeat: Infinity,
                            delay: Math.random() * 10,
                            ease: "linear"
                        }}
                    />
                ))}
            </div>

            {/* 7. Pins (Candles) - Reduced brightness */}
            <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                <div className="relative w-full h-[80%] max-w-[1400px] pointer-events-auto">
                    {locations.map((loc) => (
                        <div
                            key={loc.id}
                            className="absolute cursor-pointer group flex flex-col items-center justify-center transform -translate-x-1/2 -translate-y-1/2"
                            style={{ top: `${loc.y}%`, left: `${loc.x}%` }}
                        >
                            {/* Candle Flame Visual */}
                            <div className="relative opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                                {/* Core Flame */}
                                <motion.div
                                    className="w-1 h-1 rounded-full bg-orange-100 shadow-[0_0_6px_0px_rgba(255,200,100,0.6)] z-20 relative"
                                    animate={{
                                        opacity: [0.7, 0.9, 0.7],
                                        scale: [1, 1.1, 0.9]
                                    }}
                                    transition={{
                                        duration: 0.15,
                                        repeat: Infinity,
                                        repeatType: "reverse",
                                    }}
                                />
                                {/* Outer Glow */}
                                <motion.div
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-orange-500/20 blur-sm z-10"
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 8. Hero Content */}
            <motion.div
                className="relative z-30 text-center px-4 w-full max-w-7xl mx-auto flex flex-col items-center justify-start h-full pt-48 md:pt-64"
                style={{ y: textY }}
            >
                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="relative flex flex-col items-center justify-center leading-tight"
                >
                    <motion.h1
                        className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 font-display text-white tracking-widest uppercase drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)]"
                        animate={{
                            scale: [1, 1.01, 1],
                            opacity: [0.9, 1, 0.9]
                        }}
                        transition={{
                            duration: 7,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <span className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-[0.2em] bg-clip-text text-transparent bg-gradient-to-b from-gray-100 to-gray-400">
                            Discover
                        </span>
                        <span className="font-serif italic text-2xl md:text-4xl text-[#C0A080] font-light lowercase tracking-widest opacity-80 my-2 md:my-0">
                            the
                        </span>
                        <span className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-[0.15em] text-gray-300">
                            Unseen
                        </span>
                    </motion.h1>
                </motion.div>

                {/* Subtitle */}
                <motion.div
                    initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
                    animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                    transition={{ duration: 2, delay: 1.5, ease: "easeOut" }}
                    className="mt-8 mb-16 flex items-center gap-6"
                >
                    <div className="h-[1px] w-8 md:w-16 bg-gradient-to-r from-transparent to-[#504040] opacity-40" />
                    <p className="text-gray-400 font-light tracking-[0.4em] uppercase text-xs md:text-sm shadow-black drop-shadow-md">
                        Paranormal Activity Around the World
                    </p>
                    <div className="h-[1px] w-8 md:w-16 bg-gradient-to-l from-transparent to-[#504040] opacity-40" />
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                    className="flex flex-col sm:flex-row gap-8 md:gap-12 justify-center items-center w-full max-w-lg"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1 }}
                >
                    {/* Explore Button - Deep Blue/Slate */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full sm:w-auto px-10 py-4 bg-[#0A0F1C] border border-blue-900/30 text-blue-100/90 rounded-[1px] shadow-[0_0_20px_rgba(0,0,0,0.8)] hover:shadow-[0_0_30px_rgba(30,58,138,0.2)] hover:border-blue-800/60 hover:text-white transition-all duration-500 group relative overflow-hidden"
                        onClick={() => navigate('/explore')}
                    >
                        <span className="font-display tracking-[0.2em] text-xs font-semibold relative z-10 uppercase">Explore Now</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-900/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    </motion.button>

                    {/* Submit Button - Deep Sepia */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full sm:w-auto px-10 py-4 bg-[#120805] border border-orange-900/30 text-orange-100/90 rounded-[1px] shadow-[0_0_20px_rgba(0,0,0,0.8)] hover:shadow-[0_0_30px_rgba(124,45,18,0.2)] hover:border-orange-800/60 hover:text-white transition-all duration-500 group relative overflow-hidden"
                        onClick={() => navigate('/create-story')}
                    >
                        <span className="font-display tracking-[0.2em] text-xs font-semibold relative z-10 uppercase">Submit Story</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-900/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    </motion.button>
                </motion.div>
            </motion.div>

            {/* 9. Bottom Gradeint Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black via-black/80 to-transparent z-20" />
        </section>
    );
}
