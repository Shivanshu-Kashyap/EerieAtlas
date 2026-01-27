import { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Ghost, Clock, Trash2, Edit } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";

interface Story {
    _id: string;
    title: string;
    content: string;
    author: {
        username: string;
        avatar?: string;
    };
    location: string;
    type: string;
    images: string[];
    createdAt: string;
    views: number;
}

export function ProfilePage() {
    const { user } = useContext(AuthContext)!;
    const [stories, setStories] = useState<Story[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const truncateText = (text: string, limit: number = 100) => {
        // Remove text formatting characters like ** and _ and <u>
        const cleanText = text.replace(/(\*\*|__|[*_]|<u>|<\/u>)/g, "");
        if (cleanText.length <= limit) return cleanText;
        return cleanText.substring(0, limit) + "...";
    };

    useEffect(() => {
        if (!user) {
            navigate("/auth");
            return;
        }

        const fetchUserStories = async () => {
            try {
                // Assuming backend supports filtering by author query param
                const res = await fetch(`http://localhost:5000/api/stories?author=${user._id}`);
                const data = await res.json();

                // If the backend returns all stories (fallback), filter client side
                // But we implemented backend filtering, so it should be fine.
                // Just in case, let's verify if data is an array
                if (Array.isArray(data)) {
                    setStories(data);
                } else {
                    console.error("Received non-array data:", data);
                }
            } catch (error) {
                console.error("Failed to fetch stories", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserStories();
    }, [user, navigate]);

    const handleDelete = async (storyId: string) => {
        if (!confirm("Are you sure you want to delete this story? This action cannot be undone.")) return;

        try {
            const res = await fetch(`http://localhost:5000/api/stories/${storyId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${user?.token}`
                }
            });

            if (res.ok) {
                setStories(prev => prev.filter(s => s._id !== storyId));
            } else {
                const data = await res.json();
                alert(data.message || "Failed to delete story");
            }
        } catch (error) {
            console.error("Error deleting story:", error);
            alert("An error occurred");
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex flex-col relative">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542259681-d4cd429188d8?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-fixed opacity-5 pointer-events-none" />

            <Header />

            <main className="flex-grow pt-24 pb-12 px-4 relative z-10">
                <div className="container mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-display text-white mb-4 tracking-wider">
                            Your Paranormal Log
                        </h1>
                        <p className="text-gray-400 font-mono text-sm tracking-widest uppercase mb-8">
                            Manage your submitted encounters
                        </p>
                    </div>

                    {loading ? (
                        <div className="text-center text-gray-500 font-mono animate-pulse">Loading Archives...</div>
                    ) : stories.length === 0 ? (
                        <div className="text-center text-gray-500 font-mono">
                            <p className="mb-4">No stories found in your log.</p>
                            <Link to="/create-story" className="text-red-500 hover:underline">Create your first entry</Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {stories.map((story, index) => (
                                <motion.div
                                    key={story._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="relative group"
                                >
                                    {/* Edit/Delete Overlay */}
                                    <div className="absolute top-2 right-2 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => navigate(`/create-story?edit=${story._id}`)}
                                            className="p-2 bg-blue-900/80 text-white rounded-full hover:bg-blue-800 transition-colors"
                                            title="Edit Story"
                                        >
                                            <Edit size={14} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(story._id)}
                                            className="p-2 bg-red-900/80 text-white rounded-full hover:bg-red-800 transition-colors"
                                            title="Delete Story"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>

                                    <div className="bg-black/40 backdrop-blur-sm border border-white/10 h-full flex flex-col rounded-sm overflow-hidden hover:border-white/20 transition-all duration-300">
                                        {/* Image Area */}
                                        <div className="h-48 overflow-hidden relative">
                                            {story.images && story.images.length > 0 ? (
                                                <img
                                                    src={story.images[0].replace('http://', 'https://')}
                                                    alt={story.title}
                                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-neutral-900 flex items-center justify-center">
                                                    <Ghost className="w-12 h-12 text-neutral-800" />
                                                </div>
                                            )}
                                            <div className="absolute top-4 left-4">
                                                <span className="bg-black/80 backdrop-blur-md px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-gray-400 border border-white/10">
                                                    {story.type}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-6 flex-1 flex flex-col">
                                            <div className="flex items-center gap-4 text-[10px] text-gray-500 font-mono uppercase tracking-wider mb-3">
                                                <div className="flex items-center gap-1">
                                                    <Clock size={12} />
                                                    <span>{format(new Date(story.createdAt), "MMM d, yyyy")}</span>
                                                </div>
                                            </div>

                                            <h3 className="text-xl font-display text-white mb-3 leading-tight">
                                                {story.title}
                                            </h3>

                                            <p className="text-gray-400 text-sm mb-6 font-serif leading-relaxed flex-1">
                                                {truncateText(story.content)}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}
