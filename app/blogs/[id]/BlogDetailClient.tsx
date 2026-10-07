"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { RevealSection } from "@/components/RevealSection";
import { useBlogs } from "@/context/BlogContext";
import { useProperties } from "@/context/PropertyContext";
import { 
  ChevronLeft, 
  Share2, 
  Calendar, 
  User, 
  ArrowRight, 
  BookOpen,
  ShieldCheck 
} from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function BlogDetailClient({ params }: PageProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { blogs, isLoading: blogsLoading } = useBlogs();
  const { properties } = useProperties();
  
  const [blog, setBlog] = useState<any>(null);

  useEffect(() => {
    if (blogsLoading) return;
    const found = blogs.find(b => b.id === resolvedParams.id);
    setBlog(found);
  }, [resolvedParams.id, blogs, blogsLoading]);

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  const getReadTime = (content: string) => {
    const words = content?.split(/\s+/)?.length || 0;
    const minutes = Math.max(1, Math.ceil(words / 200));
    return `${minutes} MIN READ`;
  };

  const renderContent = (content: string) => {
    if (!content) return null;
    return content.split('\n\n').map((paragraph, index) => {
      if (paragraph.startsWith('###')) {
        return (
          <h3 key={index} className="text-xl sm:text-2xl font-bold tracking-tight text-[#111111] mt-8 mb-4">
            {paragraph.replace('###', '').trim()}
          </h3>
        );
      }
      if (paragraph.startsWith('##')) {
        return (
          <h2 key={index} className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#111111] mt-10 mb-4">
            {paragraph.replace('##', '').trim()}
          </h2>
        );
      }
      return (
        <p key={index} className="text-[#333333] leading-relaxed text-sm sm:text-base mb-6">
          {paragraph}
        </p>
      );
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog?.title || "Amaya Journal",
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Article link copied to clipboard!");
    }
  };

  if (blogsLoading) return <div className="min-h-screen bg-white flex items-center justify-center text-xs font-bold text-[#666666]">Loading Article...</div>;
  if (!blogsLoading && !blog) return <div className="min-h-screen bg-white flex items-center justify-center text-xs font-bold text-[#666666]">Article not found</div>;

  const matchingProperties = properties.slice(0, 3);

  return (
    <div className="min-h-screen bg-white text-[#111111] pb-24">
      {/* Top Navigation */}
      <div className="container-custom pt-6 pb-4 flex items-center justify-between">
        <button 
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#111111] hover:text-black p-2 rounded-lg hover:bg-[#F5F5F7] transition-all"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Journal
        </button>
        <button 
          onClick={handleShare}
          className="p-2.5 rounded-full border border-[#EAEAEA] hover:border-[#111111] text-[#111111] transition-all"
          title="Share Article"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      {/* Hero Visual Header */}
      <div className="container-custom pb-8">
        <div className="relative aspect-[16/9] md:aspect-[21/9] w-full rounded-2xl md:rounded-3xl overflow-hidden border border-[#EAEAEA] bg-[#F5F5F7]">
          <Image 
            src={blog.imageUrl || 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1600'} 
            alt={blog.title} 
            fill 
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6 text-white space-y-3">
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-white text-black text-[10px] font-bold tracking-wider uppercase rounded-full">
                {blog.category}
              </span>
              <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-[10px] font-bold tracking-wider uppercase rounded-full">
                {getReadTime(blog.content)}
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow-md">
              {blog.title}
            </h1>
            <div className="flex flex-wrap gap-4 items-center text-white/80 text-xs">
              <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> By {blog.author}</span>
              <span>•</span>
              <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {formatDate(blog.createdAt)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Reader Column */}
      <div className="container-custom">
        <div className="max-w-3xl mx-auto py-6">
          {/* Summary Lead Block */}
          <div className="border-l-3 border-[#111111] pl-6 py-2 mb-10 bg-[#FAFAFA] rounded-r-xl p-4">
            <p className="text-base sm:text-lg text-[#333333] leading-relaxed font-medium italic">
              {blog.summary}
            </p>
          </div>

          {/* Render Body Paragraphs */}
          <div className="space-y-4">
            {renderContent(blog.content)}
          </div>

          {/* Author Signature Block */}
          <div className="mt-16 border-t border-[#EAEAEA] pt-8 flex items-center gap-5 p-6 rounded-2xl bg-[#FAFAFA] border">
            <div className="w-12 h-12 bg-[#111111] text-white flex justify-center items-center rounded-xl shrink-0 font-bold">
              <BookOpen className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] tracking-wider text-[#888888] font-bold uppercase">Published By</span>
              <h4 className="text-base font-bold text-[#111111]">{blog.author}</h4>
              <p className="text-xs text-[#666666]">
                Amaya Rental Amenities Editorial curates insights on residential leasing, design, and market trends.
              </p>
            </div>
          </div>
        </div>

        {/* Matching Properties Section */}
        {matchingProperties.length > 0 && (
          <div className="mt-20 border-t border-[#EAEAEA] pt-14">
            <div className="mb-8">
              <span className="text-[10px] tracking-widest text-[#888888] uppercase font-bold block mb-1">
                FEATURED RESIDENCES
              </span>
              <h3 className="text-2xl font-extrabold text-[#111111] tracking-tight">
                Explore Available Rental Properties
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {matchingProperties.map((prop) => (
                <Link key={prop.id} href={`/property/${prop.id}`} className="group block">
                  <div className="bg-white border border-[#EAEAEA] hover:border-[#111111] rounded-2xl overflow-hidden p-4 transition-all duration-300 shadow-xs hover:shadow-md">
                    <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-[#F5F5F7] mb-3">
                      <Image 
                        src={prop.images[0]} 
                        alt={prop.projectName} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2.5 right-2.5 px-2.5 py-1 bg-white text-black text-[10px] font-bold rounded-full shadow-xs">
                        {prop.price}
                      </div>
                    </div>
                    <h4 className="text-sm font-bold text-[#111111] group-hover:text-black mb-1 truncate">
                      {prop.projectName}
                    </h4>
                    <div className="flex justify-between items-center text-xs text-[#666666]">
                      <span>{prop.location}</span>
                      <span className="font-bold text-[#111111] flex items-center gap-1 group-hover:underline">
                        View Flat <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
