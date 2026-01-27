import { useState, useContext, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
    Image as ImageIcon,
    X,
    Bold,
    Italic,
    Underline,
    AlignLeft,
    AlignCenter,
    AlignRight,
    Send
} from "lucide-react";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";

export function CreateStoryPage() {
    const { user } = useContext(AuthContext)!;
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const editId = searchParams.get("edit");

    const fileInputRef = useRef<HTMLInputElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [location, setLocation] = useState("");
    const [type, setType] = useState("ghost");
    const [images, setImages] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (editId) {
            setLoading(true);
            fetch(`http://localhost:5000/api/stories/${editId}`)
                .then(res => res.json())
                .then(data => {
                    setTitle(data.title);
                    setContent(data.content);
                    setLocation(data.location);
                    setType(data.type);
                    // Keeping existing images handling simple for now - not populating file input
                    if (data.images && data.images.length > 0) {
                        setImagePreviews(data.images.map((img: string) => img.replace('http://', 'https://')));
                    }
                })
                .catch(() => setError("Failed to load story for editing"))
                .finally(() => setLoading(false));
        }
    }, [editId]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            setImages(prev => [...prev, ...filesArray]);

            // Create previews
            const newPreviews = filesArray.map(file => URL.createObjectURL(file));
            setImagePreviews(prev => [...prev, ...newPreviews]);
        }
    };

    const removeImage = (index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index));
        setImagePreviews(prev => prev.filter((_, i) => i !== index));
    };

    const handleFormat = (tag: string) => {
        if (!textareaRef.current) return;

        const start = textareaRef.current.selectionStart;
        const end = textareaRef.current.selectionEnd;
        const selectedText = content.substring(start, end);

        let newText = "";
        let newCursorPos = 0;

        if (tag === 'b') {
            newText = content.substring(0, start) + `**${selectedText}**` + content.substring(end);
            newCursorPos = start + 2 + selectedText.length;
        } else if (tag === 'i') {
            newText = content.substring(0, start) + `_${selectedText}_` + content.substring(end);
            newCursorPos = start + 1 + selectedText.length;
        } else if (tag === 'u') {
            newText = content.substring(0, start) + `<u>${selectedText}</u>` + content.substring(end);
            newCursorPos = start + 3 + selectedText.length; // <u> length is 3
        }

        setContent(newText);

        // Restore focus and cursor position (delayed to allow render)
        setTimeout(() => {
            if (textareaRef.current) {
                textareaRef.current.focus();
                textareaRef.current.setSelectionRange(newCursorPos, newCursorPos);
            }
        }, 0);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            setError("You must be logged in to share a story.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("content", content);
            formData.append("location", location);
            formData.append("type", type);

            images.forEach(image => {
                formData.append("images", image);
            });

            const url = editId
                ? `http://localhost:5000/api/stories/${editId}`
                : "http://localhost:5000/api/stories";

            const method = editId ? "PUT" : "POST";

            const res = await fetch(url, {
                method: method,
                headers: {
                    "Authorization": `Bearer ${user.token}`
                },
                body: formData
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Failed to submit story");
            }

            navigate("/explore"); // Redirect to stories list
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex flex-col relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-fixed opacity-10 pointer-events-none" />

            <Header />

            <main className="flex-grow pt-24 pb-12 px-4 relative z-10">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-display text-white mb-4 tracking-wider">
                            {editId ? "Edit Your Story" : "Write Your Story"}
                        </h1>
                        <p className="text-gray-400 font-mono text-sm tracking-widest uppercase">
                            Share your paranormal experience with the EerieAtlas Community
                        </p>
                    </div>

                    <motion.form
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-black/40 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-sm shadow-2xl"
                        onSubmit={handleSubmit}
                    >
                        {/* Title Input */}
                        <div className="mb-6">
                            <input
                                type="text"
                                placeholder="Give your story a mysterious title"
                                className="w-full bg-transparent border-b border-white/10 text-2xl md:text-3xl font-display text-white placeholder-gray-600 py-3 focus:outline-none focus:border-red-900 transition-colors"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            {/* Location Input */}
                            <div className="space-y-2">
                                <label className="text-xs font-mono text-gray-500 uppercase tracking-wider">Location</label>
                                <input
                                    type="text"
                                    placeholder="Where did it happen?"
                                    className="w-full bg-white/5 border border-white/10 rounded-sm py-2 px-4 text-white placeholder-gray-600 focus:outline-none focus:border-red-900/50 transition-colors"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Category Select */}
                            <div className="space-y-2">
                                <label className="text-xs font-mono text-gray-500 uppercase tracking-wider">Category</label>
                                <select
                                    className="w-full bg-white/5 border border-white/10 rounded-sm py-2 px-4 text-white focus:outline-none focus:border-red-900/50 transition-colors [&>option]:bg-black"
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                >
                                    <option value="ghost">Ghost & Spirits</option>
                                    <option value="ufo">UFO & Aliens</option>
                                    <option value="cryptid">Cryptids & Beasts</option>
                                    <option value="other">Unexplained Phenomena</option>
                                </select>
                            </div>
                        </div>

                        {/* Editor Toolbar (Mock) */}
                        <div className="flex items-center gap-4 py-3 px-4 bg-white/5 border-t border-x border-white/10 rounded-t-sm text-gray-400">
                            <button type="button" onClick={() => handleFormat('b')} className="hover:text-white transition-colors" title="Bold"><Bold size={16} /></button>
                            <button type="button" onClick={() => handleFormat('i')} className="hover:text-white transition-colors" title="Italic"><Italic size={16} /></button>
                            <button type="button" onClick={() => handleFormat('u')} className="hover:text-white transition-colors" title="Underline"><Underline size={16} /></button>
                            <div className="w-px h-4 bg-white/10 mx-2" />
                            <button type="button" className="hover:text-white transition-colors" disabled title="Not implemented"><AlignLeft size={16} /></button>
                            <button type="button" className="hover:text-white transition-colors" disabled title="Not implemented"><AlignCenter size={16} /></button>
                            <button type="button" className="hover:text-white transition-colors" disabled title="Not implemented"><AlignRight size={16} /></button>
                            <div className="w-px h-4 bg-white/10 mx-2" />
                            <button
                                type="button"
                                className="hover:text-white transition-colors flex items-center gap-2 hover:bg-white/10 px-2 py-1 rounded-sm"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <ImageIcon size={16} />
                                <span className="text-xs font-mono uppercase">Add Image</span>
                            </button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                                className="hidden"
                                multiple
                                accept="image/*"
                            />
                        </div>

                        {/* Content Textarea */}
                        <textarea
                            ref={textareaRef}
                            className="w-full bg-black/20 border border-white/10 border-t-0 rounded-b-sm p-4 text-gray-300 min-h-[400px] focus:outline-none focus:bg-black/40 transition-colors leading-relaxed resize-y custom-scrollbar"
                            placeholder="Start writing your chilling tale..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                        />

                        {/* Image Previews */}
                        {imagePreviews.length > 0 && (
                            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                                {imagePreviews.map((src, index) => (
                                    <div key={index} className="relative group aspect-square bg-black border border-white/10 rounded-sm overflow-hidden">
                                        <img src={src} alt="Preview" className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(index)}
                                            className="absolute top-2 right-2 p-1 bg-red-900/80 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X size={12} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {error && (
                            <div className="mt-6 p-3 bg-red-900/20 border border-red-900/50 text-red-200 text-xs font-mono text-center">
                                {error}
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="mt-8 flex justify-end gap-4">
                            <button
                                type="button"
                                onClick={() => navigate("/")}
                                className="px-6 py-2 border border-white/10 text-gray-400 font-mono text-xs uppercase tracking-widest hover:text-white hover:bg-white/5 transition-all rounded-[1px]"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-8 py-2 bg-gradient-to-r from-red-900 to-red-950 text-white font-display uppercase tracking-widest text-sm border border-red-800/50 hover:shadow-[0_0_20px_rgba(185,28,28,0.4)] transition-all rounded-[1px] flex items-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <span className="animate-pulse">Transmitting...</span>
                                ) : (
                                    <>
                                        <span>{editId ? "Update Story" : "Submit Story"}</span>
                                        <Send size={14} className="group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </div>
                    </motion.form>
                </div>
            </main>
            <Footer />
        </div>
    );
}
