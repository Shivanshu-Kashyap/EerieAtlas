import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ctaBg from "../../assets/cta_bg.png";

const stories = [
    {
        id: 1,
        title: "Ghosts of the Tower",
        location: "London, UK",
        date: "Oct 31, 2023",
        // Using a reliable 'spooky castle/building' image
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&h=400&fit=crop",
        type: "ghost"
    },
    {
        id: 2,
        title: "Roswell Incident 2.0",
        location: "New Mexico, USA",
        date: "Sep 20, 2023",
        // Using a reliable 'night/stars/UFO vibe' image
        image: "https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?w=600&h=400&fit=crop",
        type: "ufo"
    },
    {
        id: 3,
        title: "The Banshee's Cry",
        location: "Cork, Ireland",
        date: "Nov 13, 2023",
        // This one was confirmed working
        image: "https://images.unsplash.com/photo-1509557965875-b88c97052f0e?w=600&h=400&fit=crop",
        type: "banshee"
    }
];

export function FeaturedStories() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { amount: 0.2, once: true });

    // Parallax & Exit Effect
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Exit animation: cards darken and fog thickens when scrolling past
    const exitOpacity = useTransform(scrollYProgress, [0.8, 1], [1, 0.5]);
    const fadeBlur = useTransform(scrollYProgress, [0.8, 1], ["0px", "8px"]);

    return (
        <section ref={containerRef} className="relative py-32 bg-black overflow-hidden border-t border-white/5">
            {/* Background Image Layer */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-60"
                    style={{
                        backgroundImage: `url(${ctaBg})`,
                        filter: "contrast(1.2) brightness(0.8)"
                    }}
                />
                {/* Gradient Overlay for Fade */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/90" />
            </div>

            {/* 6. Background Atmosphere - Matching Feature Cards */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute bottom-0 left-0 w-full h-[300px] bg-gradient-to-t from-[#0A0F1C] to-transparent opacity-80" />
            </div>

            <motion.div
                className="container mx-auto px-4 max-w-6xl relative z-10"
                style={{ opacity: exitOpacity, filter: `blur(${fadeBlur})` }}
            >
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/10 pb-8 relative">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                    >
                        <h2 className="text-4xl md:text-5xl font-display text-white mb-4 tracking-wide drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                            Featured Stories
                        </h2>
                        <p className="text-gray-400 text-sm font-mono tracking-[0.2em] uppercase text-blue-200/60">
                            Deep Dive into the Unknown
                        </p>
                    </motion.div>

                    {/* See All Button - Standardized Style */}
                    <div className="mt-6 md:mt-0">
                        <Button text="View All Archives" variant="dark" icon={true} />
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {stories.map((story, index) => (
                        <StoryCard key={story.id} story={story} index={index} isInView={isInView} />
                    ))}
                </div>

            </motion.div>

            {/* Ambient Fog Overlay for Section */}
            <motion.div
                className="absolute inset-0 pointer-events-none z-20 mix-blend-screen overflow-hidden"
                style={{ opacity: useTransform(scrollYProgress, [0.5, 1], [0.1, 0.4]) }} // Fog thickens on exit
            >
                <div className="absolute inset-0 bg-[url('https://raw.githubusercontent.com/daniel-friyia/animated-fog/main/fog2.png')] bg-cover opacity-20 animate-fog-slow" />
            </motion.div>
        </section>
    );
}

function StoryCard({ story, index, isInView }: { story: any, index: number, isInView: boolean }) {
    return (
        <motion.div
            className="group relative h-[420px] bg-[#080808] border border-white/10 rounded-sm overflow-hidden cursor-pointer shadow-[0_0_30px_rgba(0,0,0,0.6)] hover:shadow-[0_0_40px_rgba(0,0,0,0.8)] transition-all duration-500"
            initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.7, delay: index * 0.2, ease: "easeOut" }}
            whileHover={{ y: -5 }}
        >
            {/* Hover Border Glow */}
            <motion.div
                className="absolute inset-0 border border-transparent transition-colors duration-500 pointer-events-none z-20 rounded-sm"
                variants={{
                    hover: { borderColor: story.type === 'ghost' ? 'rgba(251, 146, 60, 0.4)' : story.type === 'ufo' ? 'rgba(59, 130, 246, 0.4)' : 'rgba(20, 184, 166, 0.4)' }
                }}
            />

            {/* Image & Zoom */}
            <div className="absolute inset-0 h-[65%] overflow-hidden">
                <motion.img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover transition-all duration-700 opacity-70 group-hover:opacity-100 group-hover:scale-110"
                />
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#080808]/50 to-[#080808]" />
            </div>

            {/* --- Specific Card Animations --- */}

            {/* Ghost Type Animations */}
            {story.type === "ghost" && (
                <>
                    {/* Window Lights Flicker */}
                    <motion.div
                        className="absolute top-[30%] left-[40%] w-1 h-2 bg-orange-400/50 rounded-full blur-sm"
                        animate={{ opacity: [0, 0.8, 0.2, 0.6, 0] }}
                        transition={{ duration: 3, repeat: Infinity, times: [0, 0.1, 0.3, 0.4, 1] }}
                    />
                    {/* Ambient Light Flicker Overlay */}
                    <motion.div
                        className="absolute inset-0 bg-orange-900/10 mix-blend-overlay"
                        animate={{ opacity: [0, 0.2, 0] }}
                        transition={{ duration: 4 + Math.random(), repeat: Infinity }}
                    />
                </>
            )}

            {/* UFO Type Animations */}
            {story.type === "ufo" && (
                <>
                    {/* Light Beam Pulse */}
                    <motion.div
                        className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-[60%] bg-gradient-to-b from-blue-400/20 to-transparent blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                        animate={{ width: ["10%", "15%", "10%"] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                    {/* Cool Blue Glow */}
                    <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/20 transition-colors duration-500 mix-blend-overlay" />
                    <motion.div
                        className="absolute top-0 left-0 right-0 h-1/2 bg-[url('https://raw.githubusercontent.com/daniel-friyia/animated-fog/main/fog1.png')] bg-cover opacity-0 group-hover:opacity-30 mix-blend-screen"
                        animate={{ x: [-20, 0] }}
                        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
                    />
                </>
            )}

            {/* Banshee Type Animations */}
            {story.type === "banshee" && (
                <>
                    {/* Cold Mist */}
                    <motion.div
                        className="absolute bottom-[35%] left-0 w-full h-1/3 bg-gradient-to-t from-teal-900/30 to-transparent blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-1000"
                    />
                    <div className="absolute inset-0 bg-teal-900/0 group-hover:bg-teal-900/10 transition-colors duration-500 mix-blend-overlay" />
                </>
            )}

            {/* Content Content - Re-positioned */}
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20 flex flex-col h-[35%] justify-between bg-[#080808] border-t border-white/5">
                <div>
                    {/* Category Tag */}
                    <span className={`inline-block py-1 px-2 mb-2 text-[10px] font-mono uppercase tracking-widest rounded-sm border ${story.type === 'ghost' ? 'border-orange-900/50 text-orange-200/70 bg-orange-900/10' :
                        story.type === 'ufo' ? 'border-blue-900/50 text-blue-200/70 bg-blue-900/10' :
                            'border-teal-900/50 text-teal-200/70 bg-teal-900/10'
                        }`}>
                        {story.type} Encounter
                    </span>

                    <motion.h3
                        className="text-xl font-display text-white mb-1 tracking-wide"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        {story.title}
                    </motion.h3>
                </div>

                {/* Metadata */}
                <div className="flex items-center justify-between text-xs font-mono text-gray-500 border-t border-white/5 pt-2 mt-2">
                    <span className="opacity-70">{story.date}</span>
                    <span className="text-gray-400 group-hover:text-white transition-colors cursor-default">{story.location}</span>
                </div>
            </div>

            {/* Top Gloss Highlight */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50" />

        </motion.div>
    );
}

// Reusing the Standard Button Component
function Button({ text, variant, icon }: { text: string, variant: "blue" | "red" | "dark", icon?: boolean }) {
    const baseClasses = "px-8 py-3 rounded-[1px] font-display tracking-[0.2em] text-xs font-semibold uppercase relative overflow-hidden group shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-all duration-500 inline-flex items-center gap-2";

    const variants = {
        blue: "bg-[#0A0F1C] border border-blue-900/30 text-blue-100/90 hover:shadow-[0_0_30px_rgba(30,58,138,0.2)] hover:border-blue-800/60 hover:text-white",
        red: "bg-[#1a0505] border border-red-900/30 text-red-100/90 hover:shadow-[0_0_30px_rgba(185,28,28,0.2)] hover:border-red-800/60 hover:text-white",
        dark: "bg-[#0F1012] border border-gray-800/30 text-gray-300 hover:shadow-[0_0_30px_rgba(100,100,100,0.15)] hover:border-gray-600/50 hover:text-white"
    };

    const gradients = {
        blue: "from-transparent via-blue-900/10 to-transparent",
        red: "from-transparent via-red-900/10 to-transparent",
        dark: "from-transparent via-gray-700/10 to-transparent"
    };

    return (
        <motion.button
            className={`${baseClasses} ${variants[variant]}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <span className="relative z-10">{text}</span>
            {icon && <ArrowRight className="w-4 h-4 relative z-10 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />}

            {/* Shine Effect */}
            <div className={`absolute inset-0 bg-gradient-to-r ${gradients[variant]} -translate-x-full group-hover:translate-x-full transition-transform duration-1000`} />
        </motion.button>
    )
}
