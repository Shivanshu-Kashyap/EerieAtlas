import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type PinType = "ghost" | "ufo" | "witchcraft" | "possession";

interface Location {
    id: number;
    x: number; // Percentage
    y: number; // Percentage
    type: PinType;
    title: string;
}

const locations: Location[] = [
    { id: 1, x: 20, y: 30, type: "ghost", title: "Winchester Mystery House" },
    { id: 2, x: 45, y: 40, type: "witchcraft", title: "Black Forest" },
    { id: 3, x: 70, y: 25, type: "ufo", title: "Tunguska Event" },
    { id: 4, x: 85, y: 60, type: "possession", title: "Aokigahara Forest" },
    { id: 5, x: 15, y: 50, type: "ufo", title: "Roswell" },
    { id: 6, x: 55, y: 35, type: "ghost", title: "Poveglia Island" },
];

const pinColors = {
    ghost: "bg-blue-300 shadow-[0_0_20px_#a5b4fc]",
    ufo: "bg-[var(--color-ufo-green)] shadow-[0_0_20px_var(--color-ufo-green)]",
    witchcraft: "bg-purple-500 shadow-[0_0_20px_#a855f7]",
    possession: "bg-red-800 shadow-[0_0_20px_#991b1b]",
};

export function WorldMapSection() {
    const [selectedId, setSelectedId] = useState<number | null>(null);

    return (
        <section className="relative py-20 bg-[var(--color-horror-card)] overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-display text-white mb-4">Paranormal Hotspots</h2>
                    <p className="text-gray-400">Live activity feed from the global network</p>
                </div>

                <div className="relative w-full aspect-[16/9] bg-black/50 rounded-xl border border-white/10 shadow-2xl overflow-hidden group">
                    {/* Map Background (Dark World Map) */}
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-40 transition-transform duration-[10s] ease-linear group-hover:scale-105"
                        style={{
                            backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg")',
                            filter: "invert(1) opacity(0.2) drop-shadow(0 0 10px white)"
                        }}
                    />

                    {/* Grid Overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

                    {/* Pins */}
                    {locations.map((loc) => (
                        <div
                            key={loc.id}
                            className="absolute cursor-pointer"
                            style={{ top: `${loc.y}%`, left: `${loc.x}%` }}
                            onClick={() => setSelectedId(loc.id)}
                        >
                            {/* Pulsating Glow */}
                            <motion.div
                                className={`w-3 h-3 rounded-full ${pinColors[loc.type]}`}
                                animate={{
                                    scale: [1, 1.5, 1],
                                    opacity: [0.7, 1, 0.7],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: Math.random() * 2, // Randomize Pulse
                                }}
                            />

                            {/* Ripple Effect on Click */}
                            <AnimatePresence>
                                {selectedId === loc.id && (
                                    <motion.div
                                        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 ${pinColors[loc.type].split(' ')[0].replace('bg-', 'border-')}`}
                                        initial={{ width: 0, height: 0, opacity: 1 }}
                                        animate={{ width: 200, height: 200, opacity: 0 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                        onAnimationComplete={() => setSelectedId(null)}
                                    />
                                )}
                            </AnimatePresence>

                            {/* Tooltip */}
                            <div className="absolute top-4 left-1/2 -translate-x-1/2 opacity-0 group-hover/pin:opacity-100 transition-opacity">
                                <span className="text-xs bg-black/80 px-2 py-1 rounded text-white whitespace-nowrap border border-white/10">
                                    {loc.title}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
