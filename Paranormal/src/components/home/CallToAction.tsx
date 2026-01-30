import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ctaBg from "../../assets/cta_bg.png";

export function CallToAction() {
    const containerRef = useRef<HTMLElement>(null);
    const navigate = useNavigate();
    const isInView = useInView(containerRef, { amount: 0.3, once: false });
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Exit Animation: Dimming and Fog Thickening
    const exitOpacity = useTransform(scrollYProgress, [0.6, 1], [1, 0.6]);
    const exitFog = useTransform(scrollYProgress, [0.6, 1], [0.2, 0.5]);

    return (
        <section ref={containerRef} className="relative py-32 bg-black overflow-hidden flex items-center justify-center">

            {/* 1. Background & Atmosphere */}
            <div className="absolute inset-0 z-0">
                {/* Dark Forest / Torch Background */}
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-70 transition-opacity duration-1000"
                    style={{
                        backgroundImage: `url(${ctaBg})`,
                        filter: "contrast(1.1) brightness(0.9)"
                    }}
                />

                {/* Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black z-10" />

                {/* 4. Candle / Torch Flicker (Simulated Lights) */}
                <motion.div
                    className="absolute bottom-[20%] left-[20%] w-32 h-32 bg-orange-600/20 rounded-full blur-[60px]"
                    animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.2, 1] }}
                    transition={{ duration: 3, repeat: Infinity, repeatType: "mirror" }}
                />
                <motion.div
                    className="absolute bottom-[20%] right-[20%] w-40 h-40 bg-red-600/10 rounded-full blur-[80px]"
                    animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.1, 1] }}
                    transition={{ duration: 4, repeat: Infinity, repeatType: "mirror", delay: 1 }}
                />
            </div>

            {/* 5. Fog Drift */}
            <motion.div
                className="absolute bottom-0 left-0 w-full h-1/2 z-10 pointer-events-none mix-blend-screen"
                style={{ opacity: exitFog }}
            >
                <div className="absolute inset-0 bg-[url('https://raw.githubusercontent.com/daniel-friyia/animated-fog/main/fog2.png')] bg-cover opacity-20 animate-fog-slow" />
            </motion.div>

            <motion.div
                className="relative z-20 text-center px-4 max-w-3xl flex flex-col items-center"
                style={{ opacity: exitOpacity }}
            >
                {/* 2. Heading Animation - Breathing */}
                <motion.h2
                    className="text-4xl md:text-6xl font-display text-white mb-6 tracking-wide drop-shadow-lg"
                    initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                    animate={isInView ? {
                        opacity: [1, 0.96, 1],
                        scale: 1,
                        filter: "blur(0px)"
                    } : {}}
                    transition={{
                        opacity: { duration: 0.8, ease: "easeOut" },
                        scale: { duration: 0.8 },
                        filter: { duration: 0.8 },
                        // Breathing loop
                        default: { repeat: Infinity, duration: 7, repeatType: "reverse", ease: "easeInOut", delay: 0.8 }
                    }}
                >
                    Dare to Share Your Experience?
                </motion.h2>

                {/* 3. Subtitle Reveal */}
                <motion.p
                    className="text-gray-400 text-lg mb-12 font-light tracking-widest uppercase opacity-80"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 0.8, y: 0 } : {}}
                    transition={{ duration: 1, delay: 0.4 }}
                >
                    Join our community and reveal the unknown
                </motion.p>

                {/* 6. Standardized Button */}
                <div
                    className="relative"
                    // Simple entrance animation
                    style={{ opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.8s ease 0.6s' }}
                >
                    <Button text="Submit Your Report" variant="red" icon={true} onClick={() => navigate('/create-story')} />
                </div>

            </motion.div>
        </section>
    );
}

// Reusing Button Component locally (Ideally this would be in a shared component file)
function Button({ text, variant, icon, onClick }: { text: string, variant: "blue" | "red" | "dark", icon?: boolean, onClick?: () => void }) {
    const baseClasses = "px-10 py-4 rounded-[1px] font-display tracking-[0.25em] text-xs font-bold uppercase relative overflow-hidden group shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-all duration-500 inline-flex items-center gap-3";

    const variants = {
        blue: "bg-[#0A0F1C] border border-blue-900/30 text-blue-100/90 hover:shadow-[0_0_30px_rgba(30,58,138,0.2)] hover:border-blue-800/60 hover:text-white",
        red: "bg-[#1a0505] border border-red-900/30 text-red-100/90 hover:shadow-[0_0_40px_rgba(220,38,38,0.3)] hover:border-red-600/60 hover:text-white",
        dark: "bg-[#0F1012] border border-gray-800/30 text-gray-300 hover:shadow-[0_0_30px_rgba(100,100,100,0.15)] hover:border-gray-600/50 hover:text-white"
    };

    const gradients = {
        blue: "from-transparent via-blue-900/20 to-transparent",
        red: "from-transparent via-red-900/20 to-transparent",
        dark: "from-transparent via-gray-700/10 to-transparent"
    };

    return (
        <motion.button
            className={`${baseClasses} ${variants[variant]}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
        >
            <span className="relative z-10">{text}</span>
            {icon && <ArrowRight className="w-4 h-4 relative z-10 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />}

            {/* Shine Effect */}
            <div className={`absolute inset-0 bg-gradient-to-r ${gradients[variant]} -translate-x-full group-hover:translate-x-full transition-transform duration-1000`} />
        </motion.button>
    )
}
