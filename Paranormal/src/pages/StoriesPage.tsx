import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { Ghost, Clock, MapPin, User as UserIcon } from "lucide-react";

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

export function StoriesPage() {
    const [stories, setStories] = useState<Story[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStories = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/stories");
                const data = await res.json();
                setStories(data);
            } catch (error) {
                console.error("Failed to fetch stories", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStories();
    }, []);

    return (
        <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-12 px-4 relative">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-fixed opacity-10 pointer-events-none" />

            <div className="container mx-auto relative z-10">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-display text-white mb-4 tracking-wider">
                        The Archives
                    </h1>
                    <p className="text-gray-400 font-mono text-sm tracking-widest uppercase mb-8">
                        Explore the paranoid experiences of our community
                    </p>

                    <Link
                        to="/create-story"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-red-900/20 border border-red-900/50 text-red-200 uppercase tracking-widest text-xs font-semibold hover:bg-red-900/40 hover:text-white transition-all rounded-[1px] group"
                    >
                        <Ghost className="w-4 h-4" />
                        <span>Submit Your Encounter</span>
                    </Link>
                </div>

                {loading ? (
                    <div className="text-center text-gray-500 font-mono animate-pulse">Loading Archives...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {stories.map((story, index) => (
                            <motion.div
                                key={story._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link to={`/stories/${story._id}`} className="group block h-full">
                                    <div className="bg-black/40 backdrop-blur-sm border border-white/10 h-full flex flex-col hover:border-red-900/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(220,38,38,0.1)] rounded-sm overflow-hidden">
                                        {/* Image Area */}
                                        <div className="h-48 overflow-hidden relative">
                                            {story.images && story.images.length > 0 ? (
                                                <img
                                                    src={story.images[0].replace('http://', 'https://')}
                                                    alt={story.title}
                                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-110"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-neutral-900 flex items-center justify-center">
                                                    <Ghost className="w-12 h-12 text-neutral-800" />
                                                </div>
                                            )}

                                            {/* Type Badge */}
                                            <div className="absolute top-4 left-4">
                                                <span className="bg-black/80 backdrop-blur-md px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-red-500 border border-red-900/30">
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
                                                <div className="flex items-center gap-1">
                                                    <MapPin size={12} />
                                                    <span className="truncate max-w-[100px]">{story.location}</span>
                                                </div>
                                            </div>

                                            <h3 className="text-xl font-display text-white mb-3 leading-tight group-hover:text-red-500 transition-colors">
                                                {story.title}
                                            </h3>

                                            <p className="text-gray-400 text-sm line-clamp-3 mb-6 font-serif leading-relaxed flex-1">
                                                {story.content}
                                            </p>

                                            <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                                                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                                                    <UserIcon size={14} className="text-gray-400" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-300 font-medium">
                                                        {story.author?.username || "Unknown Agent"}
                                                    </p>
                                                    <p className="text-[10px] text-gray-600 font-mono uppercase tracking-wider">
                                                        Contributing Member
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
