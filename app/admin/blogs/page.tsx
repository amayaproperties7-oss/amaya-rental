"use client";

import { useBlogs } from "@/context/BlogContext";
import { RevealSection } from "@/components/RevealSection";
import Image from "next/image";
import { Plus, Search, BookOpen, Edit3, Trash2, ExternalLink, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function AdminBlogsPage() {
  const { blogs, deleteBlog } = useBlogs();
  const { user, isLoading: authLoading } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  
  const ADMIN_EMAIL = "amayaproperties7@gmail.com";

  useEffect(() => {
    if (!authLoading && (!user || user.email !== ADMIN_EMAIL)) {
      router.push("/admin/login");
    }
  }, [user, authLoading, router]);

  const filteredBlogs = blogs.filter(b => 
    (b.title?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
    (b.category?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
    (b.summary?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <div className="min-h-screen bg-background pt-32 pb-20 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        <Link href="/admin" className="inline-flex items-center gap-2 text-[10px] tracking-widest text-white/40 hover:text-gold mb-8 transition-colors">
          <ArrowLeft className="w-3 h-3" /> BACK TO DASHBOARD
        </Link>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
          <RevealSection>
            <h1 className="text-4xl font-serif tracking-widest mb-2">MANAGE JOURNAL</h1>
            <p className="text-[10px] tracking-[0.5em] text-gold uppercase font-bold">Editorial Control & Publication Panel</p>
          </RevealSection>

          <RevealSection delay={0.2}>
            <Link href="/admin/blogs/add" className="flex items-center gap-4 px-10 py-4 bg-gold text-black text-[10px] font-bold tracking-[0.4em] hover:bg-white transition-all rounded-sm">
              <Plus className="w-4 h-4" /> ADD NEW ENTRY
            </Link>
          </RevealSection>
        </div>

        {/* Search Bar */}
        <RevealSection className="relative mb-12 max-w-2xl">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
          <input 
            type="text" 
            placeholder="SEARCH BY TITLE, CATEGORY, OR KEYWORD..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-surface border border-white/5 pl-16 pr-6 py-6 text-[10px] tracking-[0.2em] outline-none focus:border-gold transition-colors rounded-sm"
          />
        </RevealSection>

        {/* Blog List */}
        <div className="grid grid-cols-1 gap-6">
          {filteredBlogs.map((blog, i) => (
            <RevealSection key={blog.id} delay={i * 0.05} className="flex flex-col md:flex-row items-center gap-8 p-6 bg-surface border border-white/5 rounded-sm group hover:bg-white/[0.02] transition-colors">
               <div className="relative w-full md:w-48 aspect-[4/3] overflow-hidden rounded-sm bg-black/20 shrink-0">
                  <Image 
                    src={blog.imageUrl || 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1000'} 
                    alt={blog.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
               </div>
              
              <div className="flex-1 space-y-4 min-w-0">
                 <div>
                   <div className="flex items-center gap-3 mb-2">
                     <span className="px-3 py-1 bg-white/5 text-[8px] tracking-widest uppercase font-bold text-gold border border-gold/10">{blog.category}</span>
                     <span className="text-[9px] tracking-widest text-white/40 uppercase font-bold">{formatDate(blog.createdAt)}</span>
                   </div>
                   <h2 className="text-2xl font-serif mb-2 text-white truncate">{blog.title}</h2>
                   <p className="text-white/60 text-xs line-clamp-2 leading-relaxed max-w-3xl font-light">{blog.summary}</p>
                 </div>
                 
                 <div className="flex flex-wrap gap-4 items-center">
                    <div className="text-[10px] tracking-widest text-white/40 uppercase font-bold">BY: <span className="text-white/80 font-bold">{blog.author}</span></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                    {blog.isPublished ? (
                      <div className="px-3 py-1 bg-green-500/10 text-[8px] tracking-widest uppercase font-bold text-green-400 border border-green-500/20">PUBLISHED</div>
                    ) : (
                      <div className="px-3 py-1 bg-yellow-500/10 text-[8px] tracking-widest uppercase font-bold text-yellow-400 border border-yellow-500/20">DRAFT</div>
                    )}
                 </div>
              </div>

              <div className="flex gap-4 w-full md:w-auto shrink-0">
                 <Link href={`/blogs/${blog.id}`} className="flex-1 md:flex-none p-4 bg-white/5 border border-white/10 hover:border-white transition-colors rounded-sm flex items-center justify-center" title="Preview Article">
                    <ExternalLink className="w-4 h-4" />
                 </Link>
                 <Link href={`/admin/blogs/edit/${blog.id}`} className="flex-1 md:flex-none p-4 bg-white/5 border border-white/10 hover:border-gold transition-colors rounded-sm flex items-center justify-center" title="Edit Article">
                    <Edit3 className="w-4 h-4" />
                 </Link>
                 <button 
                  onClick={() => {
                    if (confirm("Are you sure you want to delete this journal entry?")) {
                      deleteBlog(blog.id);
                    }
                  }}
                  className="flex-1 md:flex-none p-4 bg-red-500/10 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all rounded-sm flex items-center justify-center"
                  title="Delete Article"
                 >
                    <Trash2 className="w-4 h-4" />
                 </button>
              </div>
            </RevealSection>
          ))}
          
          {filteredBlogs.length === 0 && (
            <div className="py-40 text-center border border-dashed border-white/10 rounded-sm">
               <p className="text-white/20 tracking-[0.5em] uppercase text-[10px]">No journal entries matching your search</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
