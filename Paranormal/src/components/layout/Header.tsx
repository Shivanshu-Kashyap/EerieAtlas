import { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { Menu, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

// Blood Drip Animation Component
function BloodLink({ children, href }: { children: React.ReactNode; href: string }) {
    return (
        <a href={href} className="relative group text-gray-300 hover:text-white transition-colors text-sm font-medium h-7 flex items-center px-1">
            <span className="relative z-10 group-hover:text-red-600 transition-colors duration-300 font-sans tracking-wide drop-shadow-[0_0_8px_rgba(220,38,38,0.5)]">
                {children}
            </span>

            {/* Blood Droplets Container */}
            <div className="absolute top-full left-0 w-full h-10 pointer-events-none overflow-visible flex justify-center">

                {/* Droplet 1: Slow viscous drip */}
                <motion.div
                    className="absolute -top-1 w-[3px] bg-red-600 rounded-b-full shadow-[0_0_6px_rgba(220,38,38,0.9)] opacity-0"
                    initial={{ height: 0, opacity: 0 }}
                    whileHover={{
                        height: [0, 15, 0], // Elongates then disappears
                        y: [0, 5, 20],      // Moves down
                        opacity: [0, 1, 0]
                    }}
                    transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        ease: "easeIn",
                        times: [0, 0.4, 1]
                    }}
                />

                {/* Droplet 2: Detaching drop */}
                <motion.div
                    className="absolute -top-1 w-1.5 h-1.5 bg-red-700 rounded-full shadow-[0_0_4px_rgba(185,28,28,0.9)] opacity-0"
                    whileHover={{
                        y: [0, 40],
                        opacity: [0, 1, 1, 0],
                        scale: [0.5, 1, 0.8]
                    }}
                    transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        delay: 0.4,
                        ease: "easeIn"
                    }}
                    style={{ marginLeft: "2px" }}
                />
            </div>

            {/* Hover Glow Background */}
            <div className="absolute inset-0 bg-red-900/0 group-hover:bg-red-900/10 blur-md transition-colors duration-300 rounded-full -z-10" />
        </a>
    );
}

export function Header() {
    const [scrolled, setScrolled] = useState(false);
    const { user, logout } = useContext(AuthContext)!;
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled
                ? "bg-black/95 backdrop-blur-md border-b border-white/5 shadow-2xl py-3"
                : "bg-gradient-to-b from-black/90 via-black/50 to-transparent py-8"
                }`}
        >
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-between">
                    {/* Logo - Permanent Red Atlas */}
                    <div className="flex items-center">
                        <h1 className="text-2xl font-display text-white tracking-[0.15em] cursor-pointer group uppercase">
                            Eerie<span className="text-red-600 drop-shadow-[0_0_10px_rgba(220,38,38,0.5)]">Atlas</span>
                        </h1>
                    </div>

                    {/* Right Side Container: Nav + Icons */}
                    <div className="flex items-center gap-8">
                        {/* Navigation - Hidden on mobile */}
                        <nav className="hidden md:flex items-center gap-8">
                            <span onClick={() => navigate('/explore')} style={{ cursor: 'pointer' }}>
                                <BloodLink href="#">Explore</BloodLink>
                            </span>
                            <BloodLink href="#">Myths</BloodLink>
                            <BloodLink href="#">Analysis</BloodLink>
                            <span onClick={() => navigate('/create-story')} style={{ cursor: 'pointer' }}>
                                <BloodLink href="#">Submit</BloodLink>
                            </span>
                        </nav>

                        <div className="flex items-center gap-4">
                            {/* Hamburger - Mobile Only */}
                            <button className="md:hidden text-gray-300 hover:text-white hover:bg-white/5 p-2 rounded-full transition-all">
                                <Menu className="w-5 h-5" />
                            </button>

                            {/* Auth Status */}
                            {user ? (
                                <div className="flex items-center gap-3 group relative cursor-pointer">
                                    {/* Avatar - Always Visible */}
                                    <div className="w-9 h-9 rounded-full bg-red-900/20 border border-red-500/50 flex items-center justify-center text-red-100 uppercase font-mono text-xs shadow-[0_0_10px_rgba(220,38,38,0.3)] z-20 relative">
                                        {user.username.charAt(0)}
                                    </div>

                                    {/* Name & Title - Reveals on Hover */}
                                    <div className="flex flex-col max-w-0 opacity-0 group-hover:max-w-[150px] group-hover:opacity-100 transition-all duration-500 ease-out overflow-hidden z-20">
                                        <span className="text-[10px] font-mono text-red-500 tracking-widest uppercase leading-tight whitespace-nowrap">
                                            Clearance Lvl 1
                                        </span>
                                        <span className="text-xs font-display text-white tracking-wider whitespace-nowrap">
                                            Agent {user.username}
                                        </span>
                                    </div>

                                    {/* Logout Dropdown - Appears on Hover */}
                                    <div className="absolute top-1/2 right-0 pt-8 w-40 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-10">
                                        <div className="bg-black/95 backdrop-blur-md border border-white/10 shadow-2xl rounded-b-sm flex flex-col">
                                            <button
                                                onClick={() => navigate('/profile')}
                                                className="w-full p-3 text-xs font-mono text-gray-300 hover:text-white hover:bg-white/5 uppercase tracking-widest transition-colors text-right border-b border-white/5"
                                            >
                                                Profile
                                            </button>
                                            <button
                                                onClick={logout}
                                                className="w-full p-3 text-xs font-mono text-red-500 hover:text-red-400 hover:bg-white/5 uppercase tracking-widest transition-colors text-right flex items-center justify-end gap-2 group/btn"
                                            >
                                                Logout
                                                <span className="opacity-0 group-hover/btn:opacity-100 transition-opacity">→</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <button
                                    onClick={() => navigate('/auth')}
                                    className="text-gray-300 hover:text-white hover:bg-white/5 p-2 rounded-full transition-all flex items-center gap-2"
                                >
                                    <User className="w-5 h-5" />
                                    <span className="hidden md:block text-xs font-mono uppercase tracking-wider">Login</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
