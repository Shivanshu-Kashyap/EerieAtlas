import { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { User, Lock, Mail, ArrowRight } from "lucide-react";
import ctaBg from "../assets/cta_bg.png"; // Reusing the atmospheric background

export function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
    const { login } = useContext(AuthContext)!;
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const apiUrl = import.meta.env.VITE_BACKEND_URL.replace(/\/$/, '');
        const endpoint = isLogin ? `${apiUrl}/api/auth/login` : `${apiUrl}/api/auth/register`;
        const payload = isLogin ? { email, password } : { username, email, password };

        try {
            const res = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Something went wrong");
            }

            login(data);
            navigate("/");
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
            {/* Background Atmosphere */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-40"
                    style={{ backgroundImage: `url(${ctaBg})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/80" />
            </div>

            {/* Auth Container - Glassmorphism */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-sm shadow-[0_0_50px_rgba(0,0,0,0.8)]"
            >
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-display text-white tracking-widest uppercase mb-2">
                        Eerie<span className="text-red-600">Atlas</span>
                    </h2>
                    <p className="text-gray-400 font-mono text-xs tracking-[0.2em] uppercase">
                        {isLogin ? "Access the Archives" : "Join the Investigation"}
                    </p>
                </div>

                {/* Toggle Switch */}
                <div className="flex bg-black/40 rounded-sm p-1 mb-8 border border-white/5">
                    <button
                        onClick={() => setIsLogin(true)}
                        className={`flex-1 py-1 text-xs font-mono tracking-wider uppercase transition-all rounded-sm ${isLogin ? "bg-red-900/40 text-white shadow-[0_0_10px_rgba(220,38,38,0.2)]" : "text-gray-500 hover:text-gray-300"}`}
                    >
                        Login
                    </button>
                    <button
                        onClick={() => setIsLogin(false)}
                        className={`flex-1 py-1 text-xs font-mono tracking-wider uppercase transition-all rounded-sm ${!isLogin ? "bg-red-900/40 text-white shadow-[0_0_10px_rgba(220,38,38,0.2)]" : "text-gray-500 hover:text-gray-300"}`}
                    >
                        Sign Up
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <AnimatePresence mode="wait">
                        {!isLogin && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="space-y-1">
                                    <label className="text-xs font-mono text-gray-400 uppercase tracking-wider ml-1">Codename</label>
                                    <div className="relative group">
                                        <User className="absolute left-3 top-2.5 text-gray-500 w-4 h-4 group-focus-within:text-red-500 transition-colors" />
                                        <input
                                            type="text"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            className="w-full bg-black/50 border border-white/10 rounded-sm py-2 pl-10 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-red-900/50 focus:bg-black/70 transition-all font-sans text-sm"
                                            placeholder="Enter your username"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="space-y-1">
                        <label className="text-xs font-mono text-gray-400 uppercase tracking-wider ml-1">Email Frequency</label>
                        <div className="relative group">
                            <Mail className="absolute left-3 top-2.5 text-gray-500 w-4 h-4 group-focus-within:text-red-500 transition-colors" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-black/50 border border-white/10 rounded-sm py-2 pl-10 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-red-900/50 focus:bg-black/70 transition-all font-sans text-sm"
                                placeholder="Enter your email"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-mono text-gray-400 uppercase tracking-wider ml-1">Access Code</label>
                        <div className="relative group">
                            <Lock className="absolute left-3 top-2.5 text-gray-500 w-4 h-4 group-focus-within:text-red-500 transition-colors" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-black/50 border border-white/10 rounded-sm py-2 pl-10 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-red-900/50 focus:bg-black/70 transition-all font-sans text-sm"
                                placeholder="Enter your password"
                            />
                        </div>
                    </div>

                    {error && (
                        <p className="text-red-500 text-xs text-center font-mono bg-red-900/10 py-2 border border-red-900/30">
                            Error: {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-[#1a0505] border border-red-900/30 text-red-100/90 hover:text-white hover:border-red-800/60 hover:shadow-[0_0_20px_rgba(185,28,28,0.2)] py-3 rounded-[1px] font-display tracking-[0.2em] text-xs font-semibold uppercase transition-all duration-300 flex items-center justify-center gap-2 group"
                    >
                        <span>{isLogin ? "Sign In" : "Register"}</span>
                        <ArrowRight className="w-4 h-4 opacity-70 group-hover:translate-x-1 transition-transform" />
                    </button>
                </form>

                {/* Footer Decor */}
                <div className="mt-8 flex justify-between items-center text-[10px] text-gray-600 font-mono uppercase tracking-widest">
                    <span>Secured Connection</span>
                    <span>Encrypted</span>
                </div>
            </motion.div>
        </div>
    );
}
