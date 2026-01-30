import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { format } from "date-fns";
import { AuthContext } from "../context/AuthContext";
import { MapPin, Calendar, Eye, Star, Share2, MessageSquare, User, Send, ChevronLeft, Twitter, Facebook, MessageCircle } from "lucide-react";

interface Comment {
    _id: string;
    content: string;
    user: {
        username: string;
    };
    createdAt: string;
}

interface Story {
    _id: string;
    title: string;
    content: string;
    author: {
        username: string;
    };
    location: string;
    type: string;
    images: string[];
    createdAt: string;
    views: number;
    averageRating: number;
}

export function StoryDetailPage() {
    const { id } = useParams();
    const { user } = useContext(AuthContext)!;
    const [story, setStory] = useState<Story | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState("");
    const [loading, setLoading] = useState(true);
    const [userRating, setUserRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [userRated, setUserRated] = useState(false);
    const [showShareMenu, setShowShareMenu] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch Story
                const storyRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/stories/${id}`);
                const storyData = await storyRes.json();
                setStory(storyData);

                // Fetch Comments
                const commentsRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/comments/${id}`);
                const commentsData = await commentsRes.json();
                setComments(commentsData);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleCommentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !newComment.trim()) return;

        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/comments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.token}`
                },
                body: JSON.stringify({
                    storyId: id,
                    content: newComment
                })
            });
            const data = await res.json();
            setComments(prev => [data, ...prev]);
            setNewComment("");
        } catch (error) {
            console.error("Error posting comment:", error);
        }
    };

    const handleRate = async (rating: number) => {
        if (!user) {
            alert("Please login to rate this case.");
            return;
        }

        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/stories/${id}/rate`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.token}`
                },
                body: JSON.stringify({ rating })
            });

            if (res.ok) {
                setUserRated(true);
                setUserRating(rating);
                // Refresh story data to get new average
                const storyRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/stories/${id}`);
                const storyData = await storyRes.json();
                setStory(storyData);
            }
        } catch (error) {
            console.error("Error rating story:", error);
        }
    };

    if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-red-500 font-mono">Decrypting Archive...</div>;
    if (!story) return <div className="min-h-screen bg-black flex items-center justify-center text-gray-500">Record Not Found</div>;

    const heroImage = story.images && story.images.length > 0
        ? story.images[0].replace('http://', 'https://')
        : "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2000&auto=format&fit=crop";

    return (
        <div className="min-h-screen bg-[#0a0a0a]">
            {/* Hero Section */}
            <div className="relative h-[60vh] w-full overflow-hidden">
                {/* Navigation Header */}
                <div className="absolute top-0 left-0 w-full p-6 z-20 flex justify-between items-start">
                    <Link
                        to="/explore"
                        className="group flex items-center gap-2 bg-black/20 hover:bg-black/40 backdrop-blur-md border border-white/5 hover:border-red-500/30 text-white px-4 py-2 rounded-full transition-all duration-300"
                    >
                        <ChevronLeft size={16} className="text-red-500 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm font-mono uppercase tracking-widest text-gray-300 group-hover:text-white">Back</span>
                    </Link>

                    <Link to="/" className="group">
                        <h1 className="text-2xl font-display text-white tracking-[0.15em] uppercase drop-shadow-xl">
                            Eerie<span className="text-red-600 drop-shadow-[0_0_10px_rgba(220,38,38,0.5)]">Atlas</span>
                        </h1>
                    </Link>
                </div>
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${heroImage})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />

                <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
                    <div className="container mx-auto">
                        <span className="inline-block px-3 py-1 mb-4 border border-red-500/30 bg-red-900/10 text-red-400 text-[10px] font-mono uppercase tracking-[0.2em] backdrop-blur-sm">
                            {story.type}
                        </span>
                        <h1 className="text-4xl md:text-6xl font-display text-white mb-6 leading-tight max-w-4xl shadow-black drop-shadow-lg">
                            {story.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-300 font-mono">
                            <div className="flex items-center gap-2">
                                <MapPin size={16} className="text-red-500" />
                                <span>{story.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar size={16} className="text-red-500" />
                                <span>{format(new Date(story.createdAt), "MMMM d, yyyy")}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Eye size={16} className="text-red-500" />
                                <span>{story.views} Views</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Star size={16} className="text-yellow-500" />
                                <span>{story.averageRating?.toFixed(1) || "N/A"}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-8">
                    <div className="prose prose-invert prose-lg max-w-none font-serif text-gray-300 leading-loose">
                        <p className="first-letter:text-5xl first-letter:font-display first-letter:text-red-500 first-letter:float-left first-letter:mr-3">
                            {story.content.split('\n').map((paragraph, i) => {
                                // Basic Markdown Parser for display
                                const parseContent = (text: string) => {
                                    const parts = text.split(/(\*\*.*?\*\*|_{1}.*?_{1}|<u>.*?<\/u>)/g);
                                    return parts.map((part, index) => {
                                        if (part.startsWith('**') && part.endsWith('**')) {
                                            return <strong key={index} className="text-white font-bold">{part.slice(2, -2)}</strong>;
                                        } else if (part.startsWith('_') && part.endsWith('_')) {
                                            return <em key={index} className="text-gray-200 italic">{part.slice(1, -1)}</em>;
                                        } else if (part.startsWith('<u>') && part.endsWith('</u>')) {
                                            return <u key={index} className="text-gray-300 decoration-red-500/50 underline-offset-4">{part.slice(3, -4)}</u>;
                                        }
                                        return part;
                                    });
                                };

                                return (
                                    <span key={i} className="block mb-6">
                                        {parseContent(paragraph)}
                                    </span>
                                );
                            })}
                        </p>
                    </div>

                    {/* Image Gallery if multiple images */}
                    {story.images.length > 1 && (
                        <div className="grid grid-cols-2 gap-4 mt-8">
                            {story.images.slice(1).map((img, idx) => (
                                <img key={idx} src={img.replace('http://', 'https://')} alt="Evidence" className="rounded-sm border border-white/10 opacity-80 hover:opacity-100 transition-opacity" />
                            ))}
                        </div>
                    )}

                    {/* Interaction Bar */}
                    <div className="flex justify-between items-center mt-12 py-6 border-t border-b border-white/5">
                        <div className="flex gap-4 relative">
                            <button
                                onClick={() => setShowShareMenu(!showShareMenu)}
                                className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors uppercase text-xs font-mono tracking-wider"
                            >
                                <Share2 size={16} /> Share Case
                            </button>

                            {showShareMenu && (
                                <div className="absolute top-full left-0 mt-2 bg-black/90 border border-white/10 rounded-sm p-2 flex flex-col gap-2 z-50 w-40 backdrop-blur-md">
                                    <button
                                        onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(`Check out this paranormal case: ${story?.title} ${window.location.href}`)}`, '_blank')}
                                        className="flex items-center gap-3 text-gray-400 hover:text-[#25D366] px-3 py-2 text-xs font-mono uppercase tracking-wider transition-colors text-left"
                                    >
                                        <MessageCircle size={14} /> WhatsApp
                                    </button>
                                    <button
                                        onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out this paranormal case: ${story?.title}`)}&url=${encodeURIComponent(window.location.href)}`, '_blank')}
                                        className="flex items-center gap-3 text-gray-400 hover:text-[#1DA1F2] px-3 py-2 text-xs font-mono uppercase tracking-wider transition-colors text-left"
                                    >
                                        <Twitter size={14} /> Twitter / X
                                    </button>
                                    <button
                                        onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
                                        className="flex items-center gap-3 text-gray-400 hover:text-[#1877F2] px-3 py-2 text-xs font-mono uppercase tracking-wider transition-colors text-left"
                                    >
                                        <Facebook size={14} /> Facebook
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="flex gap-4">
                            <div className="flex items-center gap-2 group relative">
                                {!userRated ? (
                                    <div className="flex items-center gap-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                onClick={() => handleRate(star)}
                                                onMouseEnter={() => setHoverRating(star)}
                                                onMouseLeave={() => setHoverRating(0)}
                                                className="focus:outline-none transition-transform hover:scale-110"
                                            >
                                                <Star
                                                    size={16}
                                                    className={`${(hoverRating || userRating) >= star
                                                        ? "text-yellow-500 fill-yellow-500"
                                                        : "text-gray-600"
                                                        } transition-colors duration-200`}
                                                />
                                            </button>
                                        ))}
                                        <span className="text-gray-400 uppercase text-xs font-mono tracking-wider ml-2">
                                            {hoverRating ? `Rate ${hoverRating}` : "Rate Case"}
                                        </span>
                                    </div>
                                ) : (
                                    <span className="text-yellow-500 text-xs font-mono uppercase tracking-wider flex items-center gap-2">
                                        <Star size={16} className="fill-yellow-500" /> Rated
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Comments Section */}
                    <div className="mt-16">
                        <h3 className="text-2xl font-display text-white mb-8 flex items-center gap-3">
                            <MessageSquare className="text-red-500" />
                            Field Observations ({comments.length})
                        </h3>

                        {/* Comment Form */}
                        {user ? (
                            <form onSubmit={handleCommentSubmit} className="mb-8 relative">
                                <textarea
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    placeholder="Add your observation..."
                                    className="w-full bg-black/40 border border-white/10 rounded-sm p-4 text-gray-300 focus:outline-none focus:border-red-900/50 min-h-[100px]"
                                />
                                <button
                                    type="submit"
                                    className="absolute bottom-4 right-4 bg-red-900/20 hover:bg-red-900/40 text-red-200 p-2 rounded-full transition-colors"
                                >
                                    <Send size={16} />
                                </button>
                            </form>
                        ) : (
                            <div className="bg-white/5 p-4 rounded-sm text-center mb-8">
                                <Link to="/auth" className="text-red-400 underline">Log in</Link> to add your observation.
                            </div>
                        )}

                        {/* Comments List */}
                        <div className="space-y-6">
                            {comments.map((comment) => (
                                <div key={comment._id} className="bg-white/[0.02] p-6 rounded-sm border border-white/5">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-red-900/20 rounded-full flex items-center justify-center text-xs text-red-200 font-mono">
                                                {comment.user.username.charAt(0)}
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-bold text-white font-sans">{comment.user.username}</h4>
                                                <span className="text-[10px] text-gray-500 font-mono uppercase"> verified Agent</span>
                                            </div>
                                        </div>
                                        <span className="text-xs text-gray-600 font-mono">{format(new Date(comment.createdAt), "MMM d, HH:mm")}</span>
                                    </div>
                                    <p className="text-gray-400 text-sm leading-relaxed">{comment.content}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-4 space-y-8">
                    {/* Author Card */}
                    <div className="bg-black/40 border border-white/10 p-6 rounded-sm">
                        <h4 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4">Case Filed By</h4>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center">
                                <User size={24} className="text-gray-400" />
                            </div>
                            <div>
                                <h3 className="text-white font-display text-lg">{story.author.username}</h3>
                                <p className="text-xs text-gray-500">Contributing Member</p>
                            </div>
                        </div>
                    </div>

                    {/* Related Cases (Placeholder) */}
                    <div>
                        <h4 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4">Related Cases</h4>
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex gap-4 group cursor-pointer">
                                    <div className="w-20 h-20 bg-white/5 rounded-sm overflow-hidden">
                                        <div className="w-full h-full bg-neutral-800" />
                                    </div>
                                    <div>
                                        <h5 className="text-sm text-gray-300 font-medium group-hover:text-red-400 transition-colors">Classified Case #{800 + i}</h5>
                                        <p className="text-[10px] text-gray-500 mt-1">Access Restricted</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
