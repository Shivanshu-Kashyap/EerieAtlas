import { useEffect, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";
import ctaBg from "../../assets/cta_bg.png";

export function FeatureCards() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { amount: 0.2, once: false });

    // AI Score Counter
    const scoreRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (isInView && scoreRef.current) {
            const controls = animate(0, 78, {
                duration: 2,
                onUpdate(value) {
                    if (scoreRef.current) {
                        scoreRef.current.textContent = `${Math.round(value)}%`;
                    }
                }
            });
            return () => controls.stop();
        }
    }, [isInView]);

    return (
        <section ref={sectionRef} className="relative py-24 bg-black overflow-hidden">
            {/* Background Image Layer */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-60"
                    style={{
                        backgroundImage: `url(${ctaBg})`,
                        filter: "contrast(1.2) brightness(0.8)"
                    }}
                />
                {/* Gradient Overlay for Fade - Lighter to reveal bg */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/40 to-black/90" />
            </div>

            {/* 6. Ambient Fog Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-screen overflow-hidden">
                <motion.div
                    className="absolute inset-0 bg-[url('https://raw.githubusercontent.com/daniel-friyia/animated-fog/main/fog1.png')] bg-cover opacity-30"
                    animate={isInView ? { x: [-100, 0] } : { opacity: 0 }}
                    transition={{ duration: 30, repeat: Infinity, repeatType: "mirror", ease: "linear" }}
                />
            </div>

            <div className="container mx-auto px-4 max-w-6xl relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* 2. Haunted Locations Card */}
                    <motion.div
                        className="relative h-[450px] bg-[#050505] border border-white/10 rounded-sm overflow-hidden group cursor-pointer shadow-[0_0_20px_rgba(0,0,0,0.8)]"
                        initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
                        animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 50, filter: "blur(5px)" }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        whileHover="hover"
                    >
                        {/* Hover Border Glow */}
                        <motion.div
                            className="absolute inset-0 border border-transparent transition-colors duration-500 pointer-events-none z-20 rounded-sm"
                            variants={{ hover: { borderColor: "rgba(59, 130, 246, 0.5)" } }} // Blueish tint for locations
                        />

                        {/* Content */}
                        <div className="p-6 h-full flex flex-col relative z-10">
                            <h3 className="text-xl font-display text-white mb-2 tracking-wide">Haunted Locations</h3>
                            <p className="text-gray-400 text-xs mb-4 font-light leading-relaxed">
                                Explore the world's most haunted places
                            </p>

                            {/* Image Container */}
                            <div className="flex-1 relative overflow-hidden rounded-sm mb-6 bg-black border border-white/5">
                                <motion.img
                                    src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&h=400&fit=crop"
                                    alt="Haunted House"
                                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500"
                                    variants={{ hover: { scale: 1.05 } }}
                                    transition={{ duration: 0.7 }}
                                />
                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

                                {/* Candle Flicker Effect */}
                                <motion.div
                                    className="absolute bottom-12 left-8 w-1 h-1 bg-orange-500 shadow-[0_0_20px_10px_rgba(234,88,12,0.6)] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
                                    animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.2, 1] }}
                                    transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
                                />
                                <motion.div
                                    className="absolute bottom-12 right-12 w-1 h-1 bg-orange-500 shadow-[0_0_15px_8px_rgba(234,88,12,0.5)] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 delay-500"
                                    animate={{ opacity: [0.5, 0.9, 0.5], scale: [1, 1.1, 1] }}
                                    transition={{ duration: 2.5, repeat: Infinity, repeatType: "mirror" }}
                                />
                            </div>

                            <Button text="View Map" variant="blue" />
                        </div>
                    </motion.div>


                    {/* 3. Recent Sightings Card */}
                    <motion.div
                        className="relative h-[450px] bg-[#050505] border border-white/10 rounded-sm overflow-hidden group cursor-pointer shadow-[0_0_20px_rgba(0,0,0,0.8)]"
                        initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
                        animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 50, filter: "blur(5px)" }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        whileHover="hover"
                    >
                        {/* Hover Border Glow */}
                        <motion.div
                            className="absolute inset-0 border border-transparent transition-colors duration-500 pointer-events-none z-20 rounded-sm"
                            variants={{ hover: { borderColor: "rgba(255, 255, 255, 0.3)" } }}
                        />

                        <div className="p-6 h-full flex flex-col relative z-10">
                            <h3 className="text-xl font-display text-white mb-6 tracking-wide border-b border-white/10 pb-4">Recent Sightings</h3>

                            {/* List Items */}
                            <div className="space-y-6 flex-1">
                                <SightingItem
                                    title="UFO Over Scotland"
                                    loc="231 in Edinburgh"
                                    img="https://images.unsplash.com/photo-1541363111435-5c1b7d867904?w=100&h=100&fit=crop"
                                    delay={0}
                                />
                                <motion.div
                                    className="h-px bg-white/5 w-full"
                                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                />
                                <SightingItem
                                    title="Shadow Figure in Japan"
                                    loc="231 in Kyoto"
                                    img="https://images.unsplash.com/photo-1610216705422-caa3fcb6d158?w=100&h=100&fit=crop"
                                    delay={0.2}
                                />
                            </div>

                            <Button text="Read Reports" variant="dark" />
                        </div>
                    </motion.div>


                    {/* 4. AI Case Analysis Card */}
                    <motion.div
                        className="relative h-[450px] bg-[#050505] border border-white/10 rounded-sm overflow-hidden group cursor-pointer shadow-[0_0_20px_rgba(0,0,0,0.8)]"
                        initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
                        animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 50, filter: "blur(5px)" }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        whileHover="hover"
                    >
                        {/* Hover Border Glow */}
                        <motion.div
                            className="absolute inset-0 border border-transparent transition-colors duration-500 pointer-events-none z-20 rounded-sm"
                            variants={{ hover: { borderColor: "rgba(220, 38, 38, 0.5)" } }}
                        />

                        {/* Scanning Line */}
                        <motion.div
                            className="absolute top-0 left-0 w-full h-1 bg-red-500/50 shadow-[0_0_15px_rgba(220,38,38,0.6)] z-20"
                            animate={{ top: ["0%", "100%"], opacity: [0, 1, 0] }}
                            transition={{ duration: 3, repeat: Infinity, repeatDelay: 5, ease: "linear" }}
                        />

                        <div className="p-6 h-full flex flex-col relative z-10">
                            {/* Background Image / Visualization */}
                            <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800 via-black to-black" />

                            <h3 className="text-xl font-display text-white mb-2 tracking-wide relative z-10">AI Case Analysis</h3>
                            <p className="text-gray-400 text-xs mb-8 font-light relative z-10 leading-relaxed">
                                Analyzing Paranormal Reports
                                <br />
                                <span className="text-gray-500">Credibility Score:</span>
                            </p>

                            <div className="flex-1 flex flex-col justify-center items-center relative z-10">
                                <div className="text-6xl font-display text-white mb-2 transition-all drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                                    <span ref={scoreRef}>0</span>%
                                </div>

                                {/* Visualization Box */}
                                <div className="w-full h-24 border border-white/10 bg-black/50 relative overflow-hidden mb-2">
                                    <div className="absolute inset-0 flex items-center justify-around">
                                        {[1, 2, 3, 4, 5].map(i => (
                                            <motion.div
                                                key={i}
                                                className="w-1 bg-white/20"
                                                animate={{ height: ["20%", "80%", "30%"] }}
                                                transition={{ duration: 0.5 + Math.random(), repeat: Infinity, repeatType: "mirror" }}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Micro Typing Cursor */}
                                <motion.div
                                    className="text-[10px] text-green-500/70 font-mono self-start uppercase tracking-widest"
                                    variants={{ hover: { opacity: 1 } }}
                                    initial={{ opacity: 0.5 }}
                                >
                                    &gt; Analyzing data stream...
                                </motion.div>
                            </div>

                            <Button text="Try the Analyzer" variant="red" />
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}

function SightingItem({ title, loc, img, delay }: { title: string, loc: string, img: string, delay: number }) {
    return (
        <motion.div
            className="flex items-start gap-4 p-2 rounded-sm hover:bg-white/5 transition-colors"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 + delay, duration: 0.5 }}
        >
            <img src={img} alt="" className="w-14 h-10 object-cover rounded-sm border border-white/10 opacity-70" />
            <div>
                <h4 className="text-gray-200 font-display text-sm tracking-wide group-hover:text-white transition-colors">{title}</h4>
                <p className="text-gray-500 text-[10px] font-mono mt-1">{loc}</p>
            </div>
        </motion.div>
    )
}

function Button({ text, variant }: { text: string, variant: "blue" | "red" | "dark" }) {
    // Styles matching HeroSection buttons
    const baseClasses = "w-full py-4 rounded-[1px] font-display tracking-[0.2em] text-xs font-semibold uppercase relative overflow-hidden group shadow-[0_0_20px_rgba(0,0,0,0.8)] transition-all duration-500";

    // Variant-specific styles (Background, Border, Text, Shadow)
    const variants = {
        blue: "bg-[#0A0F1C] border border-blue-900/30 text-blue-100/90 hover:shadow-[0_0_30px_rgba(30,58,138,0.2)] hover:border-blue-800/60 hover:text-white",
        red: "bg-[#1a0505] border border-red-900/30 text-red-100/90 hover:shadow-[0_0_30px_rgba(185,28,28,0.2)] hover:border-red-800/60 hover:text-white", // Adjusted for Red variant
        dark: "bg-[#0F1012] border border-gray-800/30 text-gray-300 hover:shadow-[0_0_30px_rgba(100,100,100,0.15)] hover:border-gray-600/50 hover:text-white"
    };

    // Inner shine gradient colors
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

            {/* Shine Effect */}
            <div className={`absolute inset-0 bg-gradient-to-r ${gradients[variant]} -translate-x-full group-hover:translate-x-full transition-transform duration-1000`} />
        </motion.button>
    )
}
