"use client";

import { useState } from "react";
import { useBlogs } from "@/context/BlogContext";
import Image from "next/image";
import Link from "next/link";
import { Search, Calendar, ArrowRight, ArrowLeft, BookOpen } from "lucide-react";
import CategoryNav from "@/components/CategoryNav";

export default function BlogsPage() {
  const { blogs, isLoading } = useBlogs();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const categories = ["ALL", "LIFESTYLE", "ARCHITECTURE", "INVESTMENT", "GUIDES"];

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          blog.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          blog.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === "ALL" || blog.category.toUpperCase() === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    } catch {
      return dateStr;
    }
  };

  const getReadTime = (content: string) => {
    const words = content?.split(/\s+/)?.length || 0;
    const minutes = Math.max(1, Math.ceil(words / 200));
    return `${minutes} min read`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center text-xs font-bold text-[#666666]">
        Loading Amaya Journal...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-[#111111] pb-24">
      <CategoryNav />

      <div className="container-custom pt-6 md:pt-10">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#666666] hover:text-[#111111] mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#EAEAEA]">
          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full bg-[#F5F5F7] border border-[#EAEAEA] text-[10px] font-bold tracking-[0.2em] uppercase text-[#111111] inline-block">
              AMAYA JOURNAL
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111111] tracking-tight">
              Real Estate & Rental Guides
            </h1>
            <p className="text-xs sm:text-sm text-[#666666] max-w-xl">
              Curated architectural essays, rental market trends, and lifestyle guides for modern luxury living.
            </p>
          </div>

          <div className="w-full lg:w-96 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#777777]" />
            <input 
              type="text" 
              placeholder="Search articles..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#F5F5F7] border border-[#EAEAEA] focus:border-[#111111] focus:bg-white pl-11 pr-4 py-3 rounded-xl text-xs text-[#111111] outline-none transition-all shadow-xs"
            />
          </div>
        </div>

        {/* Categories Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                selectedCategory === cat 
                  ? "bg-[#111111] text-white border-[#111111]"
                  : "bg-[#FAFAFA] text-[#555555] border-[#EAEAEA] hover:border-[#CCCCCC]"
              }`}
            >
              {cat === "ALL" ? "All Topics" : cat}
            </button>
          ))}
        </div>

        {/* Blogs Grid */}
        {filteredBlogs.length === 0 ? (
          <div className="py-20 text-center border border-dashed border-[#EAEAEA] rounded-2xl bg-[#FAFAFA]">
            <BookOpen className="w-10 h-10 text-[#CCCCCC] mx-auto mb-3" />
            <p className="text-sm font-bold text-[#111111] mb-1">No articles found matching your criteria.</p>
            <p className="text-xs text-[#666666]">Try adjusting your search terms or category selection.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map((blog) => (
              <Link key={blog.id} href={`/blogs/${blog.id}`} className="group block">
                <div className="h-full flex flex-col bg-white border border-[#EAEAEA] hover:border-[#111111] rounded-2xl overflow-hidden p-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-lg transition-all duration-300">
                  <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-[#F5F5F7] mb-4">
                    <Image 
                      src={blog.imageUrl || 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1000'} 
                      alt={blog.title} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/95 backdrop-blur-md border border-[#EAEAEA] text-[10px] font-bold text-[#111111] rounded-full uppercase">
                      {blog.category}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-[#777777] text-xs mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> {formatDate(blog.createdAt)}
                    </span>
                    <span>•</span>
                    <span>{getReadTime(blog.content)}</span>
                  </div>

                  <h3 className="text-base font-bold text-[#111111] group-hover:text-black leading-snug mb-2 line-clamp-2">
                    {blog.title}
                  </h3>

                  <p className="text-xs text-[#666666] leading-relaxed line-clamp-3 mb-4 flex-1">
                    {blog.summary}
                  </p>

                  <div className="pt-3 border-t border-[#F0F0F0] flex items-center justify-between text-xs font-bold text-[#111111]">
                    <span>Read Article</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
