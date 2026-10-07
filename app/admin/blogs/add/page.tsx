"use client";

import { useBlogs } from "@/context/BlogContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Image as ImageIcon, Sparkles } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function AddBlogPage() {
  const { addBlog } = useBlogs();
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  
  const ADMIN_EMAIL = "amayaproperties7@gmail.com";

  useEffect(() => {
    if (!authLoading && (!user || user.email !== ADMIN_EMAIL)) {
      router.push("/admin/login");
    }
  }, [user, authLoading, router]);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    summary: "",
    content: "",
    imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1000",
    category: "Design",
    author: "Amaya Editorial Team",
    isPublished: true
  });

  const [isGeneratingSlug, setIsGeneratingSlug] = useState(false);

  // Auto-generate slug from title
  useEffect(() => {
    if (!formData.title) return;
    const generated = formData.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // remove special chars
      .replace(/[\s_]+/g, '-')  // replace spaces and underscores with hyphens
      .replace(/^-+|-+$/g, ''); // trim starting/ending hyphens
    
    setFormData(prev => ({ ...prev, slug: generated }));
  }, [formData.title]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newBlog = {
      ...formData,
      id: "blog-" + Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    
    await addBlog(newBlog);
    router.push("/admin/blogs");
  };

  return (
    <div className="min-h-screen bg-background pt-32 pb-20 px-6 md:px-20">
      <div className="max-w-4xl mx-auto">
        <Link href="/admin/blogs" className="inline-flex items-center gap-2 text-[10px] tracking-widest text-white/40 hover:text-gold mb-8 transition-colors">
          <ArrowLeft className="w-3 h-3" /> BACK TO JOURNAL
        </Link>

        <div className="mb-12">
          <h1 className="text-4xl font-serif tracking-widest mb-2">WRITE JOURNAL ENTRY</h1>
          <p className="text-[10px] tracking-[0.5em] text-gold uppercase font-bold">Curate Architectural Stories</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-12">
          {/* Article Info */}
          <div className="bg-surface border border-white/5 p-10 rounded-sm space-y-8">
            <h2 className="text-[10px] tracking-[0.4em] text-white/40 uppercase font-bold border-b border-white/5 pb-4">Article Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-2">
                 <label className="text-[9px] tracking-widest text-white/40 uppercase font-bold">Article Title</label>
                 <input 
                   required
                   value={formData.title}
                   onChange={(e) => setFormData({...formData, title: e.target.value})}
                   className="w-full bg-black/20 border border-white/10 p-4 text-sm outline-none focus:border-gold transition-colors text-white"
                   placeholder="e.g. The Architecture of Light & Space"
                 />
               </div>
               <div className="space-y-2">
                 <label className="text-[9px] tracking-widest text-white/40 uppercase font-bold flex items-center justify-between">
                   <span>Slug URL Path</span>
                   <span className="text-[8px] text-gold/60 flex items-center gap-1"><Sparkles className="w-2.5 h-2.5" /> Auto-Generated</span>
                 </label>
                 <input 
                   required
                   value={formData.slug}
                   onChange={(e) => setFormData({...formData, slug: e.target.value})}
                   className="w-full bg-black/20 border border-white/10 p-4 text-sm outline-none focus:border-gold transition-colors text-white/60 font-mono"
                   placeholder="e.g. architecture-of-light-and-space"
                 />
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-2">
                 <label className="text-[9px] tracking-widest text-white/40 uppercase font-bold">Category</label>
                 <select 
                   value={formData.category}
                   onChange={(e) => setFormData({...formData, category: e.target.value})}
                   className="w-full bg-black/20 border border-white/10 p-4 text-sm outline-none focus:border-gold transition-colors text-white/80"
                 >
                   <option value="Design">Design & Architecture</option>
                   <option value="Investment">Investment & Finance</option>
                   <option value="Lifestyle">Luxury Lifestyle</option>
                   <option value="Interviews">Architect Interviews</option>
                   <option value="Showcase">Properties Spotlight</option>
                 </select>
               </div>
               <div className="space-y-2">
                 <label className="text-[9px] tracking-widest text-white/40 uppercase font-bold">Author Name</label>
                 <input 
                   required
                   value={formData.author}
                   onChange={(e) => setFormData({...formData, author: e.target.value})}
                   className="w-full bg-black/20 border border-white/10 p-4 text-sm outline-none focus:border-gold transition-colors text-white"
                   placeholder="e.g. Amaya Editorial Team"
                 />
               </div>
            </div>

            <div className="space-y-2">
               <label className="text-[9px] tracking-widest text-white/40 uppercase font-bold">Short Summary / Subtitle</label>
               <textarea 
                 required
                 rows={3}
                 value={formData.summary}
                 onChange={(e) => setFormData({...formData, summary: e.target.value})}
                 className="w-full bg-black/20 border border-white/10 p-4 text-sm outline-none focus:border-gold transition-colors resize-none text-white font-light"
                 placeholder="Brief teaser of the article for the visual listing grid cards..."
               />
            </div>
          </div>

          {/* Publication Options */}
          <div className="bg-surface border border-white/5 p-10 rounded-sm space-y-6">
            <h2 className="text-[10px] tracking-[0.4em] text-white/40 uppercase font-bold border-b border-white/5 pb-4">Display & Status</h2>
            <div className="flex items-center gap-4">
              <input 
                type="checkbox"
                id="isPublished"
                checked={formData.isPublished}
                onChange={(e) => setFormData({...formData, isPublished: e.target.checked})}
                className="w-5 h-5 accent-gold bg-black/20 border border-white/10 cursor-pointer"
              />
              <label htmlFor="isPublished" className="text-[10px] tracking-widest text-white/60 uppercase font-bold cursor-pointer select-none">
                Publish immediately (make visible in customer journal portal)
              </label>
            </div>
          </div>

          {/* Article Visual Portrait */}
          <div className="bg-surface border border-white/5 p-10 rounded-sm space-y-8">
            <h2 className="text-[10px] tracking-[0.4em] text-white/40 uppercase font-bold border-b border-white/5 pb-4">Cover Image (JPEG/PNG)</h2>
            <div className="space-y-4">
               <div className="relative group">
                  <div className={`w-full aspect-[21/9] border-2 border-dashed transition-all flex flex-col items-center justify-center gap-4 rounded-sm overflow-hidden ${
                    formData.imageUrl.startsWith("http") 
                    ? "border-white/5 bg-black/20" 
                    : "border-gold/30 bg-gold/5"
                  }`}>
                     {formData.imageUrl ? (
                       <div className="relative w-full h-full">
                         <img src={formData.imageUrl} alt="Cover Preview" className="w-full h-full object-cover" />
                         <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button 
                              type="button" 
                              onClick={() => setFormData({...formData, imageUrl: ""})}
                              className="px-6 py-2 bg-red-500 text-white text-[10px] font-bold tracking-widest uppercase rounded-sm"
                            >
                              Remove Image
                            </button>
                         </div>
                       </div>
                     ) : (
                       <>
                         <ImageIcon className="w-10 h-10 text-white/10 group-hover:text-gold/40 transition-colors" />
                         <div className="text-center">
                           <p className="text-[10px] tracking-widest text-white/40 uppercase font-bold mb-2">Click to select or drag and drop</p>
                           <p className="text-[8px] tracking-widest text-white/20 uppercase">PNG, JPG up to 10MB</p>
                         </div>
                         <input 
                           type="file" 
                           accept="image/*"
                           onChange={(e) => {
                             const file = e.target.files?.[0];
                             if (file) {
                               const reader = new FileReader();
                               reader.onloadend = () => {
                                 setFormData({...formData, imageUrl: reader.result as string});
                               };
                               reader.readAsDataURL(file);
                             }
                           }}
                           className="absolute inset-0 opacity-0 cursor-pointer"
                         />
                       </>
                     )}
                  </div>
               </div>
            </div>
          </div>

          {/* Detailed Content */}
          <div className="bg-surface border border-white/5 p-10 rounded-sm space-y-8">
            <h2 className="text-[10px] tracking-[0.4em] text-white/40 uppercase font-bold border-b border-white/5 pb-4">Article Body Content</h2>
            <div className="space-y-2">
               <label className="text-[9px] tracking-widest text-white/40 uppercase font-bold">Editorial Text (HTML or Markdown compatible)</label>
               <textarea 
                 required
                 rows={15}
                 value={formData.content}
                 onChange={(e) => setFormData({...formData, content: e.target.value})}
                 className="w-full bg-black/20 border border-white/10 p-6 text-sm outline-none focus:border-gold transition-colors resize-none text-white leading-relaxed font-light"
                 placeholder="Write the architectural narrative of the journal entry here. Supports double linebreaks for paragraphs. You can use markdown subheadings like ### Subtitle too."
               />
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col md:flex-row gap-6">
             <button 
               type="submit"
               className="flex-1 flex items-center justify-center gap-4 py-6 bg-gold text-black text-[10px] font-bold tracking-[0.5em] hover:bg-white transition-all rounded-sm shadow-xl shadow-gold/10"
             >
                <Save className="w-4 h-4" /> PUBLISH JOURNAL ENTRY
             </button>
             <button 
               type="button"
               onClick={() => router.back()}
               className="px-12 py-6 bg-white/5 border border-white/10 text-white/40 text-[10px] font-bold tracking-[0.5em] hover:bg-white/10 transition-all rounded-sm"
             >
                CANCEL
             </button>
          </div>
        </form>
      </div>
    </div>
  );
}
