"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/utils/supabase';

export interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  summary: string;
  imageUrl: string;
  category: string;
  author: string;
  isPublished: boolean;
  createdAt: string;
}

interface BlogContextType {
  blogs: Blog[];
  addBlog: (blog: Blog) => Promise<void>;
  deleteBlog: (id: string) => Promise<void>;
  updateBlog: (blog: Blog) => Promise<void>;
  isLoading: boolean;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

const mapFromDB = (db: any): Blog => ({
  id: db.id,
  title: db.title,
  slug: db.slug,
  content: db.content || "",
  summary: db.summary || "",
  imageUrl: db.image_url || "",
  category: db.category || "Real Estate",
  author: db.author || "Amaya Admin",
  isPublished: db.is_published !== false,
  createdAt: db.created_at || new Date().toISOString(),
});

const mapToDB = (blog: Blog): any => ({
  id: blog.id,
  title: blog.title,
  slug: blog.slug,
  content: blog.content,
  summary: blog.summary,
  image_url: blog.imageUrl,
  category: blog.category,
  author: blog.author,
  is_published: blog.isPublished,
});

const MOCK_BLOGS: Blog[] = [
  {
    id: "mock-1",
    title: "The Architecture of Light & Space",
    slug: "architecture-of-light-and-space",
    summary: "Discover the interplay of natural lighting, glass facades, and expansive spatial geometry in modern luxury villas.",
    content: "Luxury is not merely defined by the materials we select, but by the space we cultivate. In contemporary architecture, the integration of natural light represents a cornerstone of high-end design.\n\n### The Geometry of Illumination\n\nBy leveraging floor-to-ceiling glass facades and strategically placed skylights, modern estates dissolve the barrier between private sanctuaries and the exterior environment. Lighting changes the color temperature of interiors naturally throughout the course of a day, creating an organic rhythm that enhances the mood and well-being of its occupants.\n\n### Designing the Void\n\nGreat luxury is found in spatial geometry—double-height living lounges, floating staircases, and uncluttered volumetric areas that allow the architecture to breathe. At Amaya Rental Amenities, we prioritize designs that treat space itself as the ultimate luxury asset.",
    imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1000",
    category: "Design",
    author: "Amaya Editorial Team",
    isPublished: true,
    createdAt: new Date(Date.now() - 3600000 * 24 * 3).toISOString() // 3 days ago
  },
  {
    id: "mock-2",
    title: "Leasing Outlook: Premium Rental Residences in 2026",
    slug: "leasing-outlook-premium-rentals-2026",
    summary: "An in-depth analysis of high-net-worth rental trends, highlighting the surging demand for fully insured luxury rental flats.",
    content: "The market for luxury rental residences has entered an elevated phase where flexible leasing, architectural integrity, and absolute peace of mind are the driving forces for sophisticated tenants.\n\n### The Insured Rental Advantage\n\nHistorically, tenancy transactions carried hidden maintenance and deposit disputes. Today's high-net-worth executives and expatriates are shifting focus towards rental flats that are fully certified and insured by AMAYA. This guarantees deposit safety, seamless maintenance, and hassle-free occupancy.\n\n### Regional Highlights\n\nFrom sea-facing rental penthouses in South Mumbai to designer flats in Bandra West, prime urban centers continue to command unprecedented rental yields, cementing insured rental flats as the ultimate modern lifestyle choice.",
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000",
    category: "Leasing",
    author: "Javed Sayed, Advisor",
    isPublished: true,
    createdAt: new Date(Date.now() - 3600000 * 24 * 7).toISOString() // 7 days ago
  }
];

export function BlogProvider({ children }: { children: ReactNode }) {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [useLocalStorageFallback, setUseLocalStorageFallback] = useState(false);

  // Load blogs on mount
  useEffect(() => {
    const loadBlogs = async () => {
      try {
        if (supabase) {
          const fetchPromise = supabase
            .from('blogs')
            .select('*')
            .order('created_at', { ascending: false })
            .then((res: any) => res)
            .catch(() => ({ data: null, error: { message: 'offline' } }));

          const timeoutPromise = new Promise<any>((resolve) =>
            setTimeout(() => resolve({ data: null, error: { message: 'timeout' } }), 1500)
          );

          const { data, error } = (await Promise.race([fetchPromise, timeoutPromise])) as any;

          if (!error && data && data.length > 0) {
            setBlogs(data.map(mapFromDB));
          } else {
            setupFallback();
          }
        } else {
          setupFallback();
        }
      } catch {
        setupFallback();
      } finally {
        setIsLoading(false);
      }
    };

    const setupFallback = () => {
      setUseLocalStorageFallback(true);
      const savedBlogs = localStorage.getItem('amaya_blogs');
      if (savedBlogs) {
        try {
          setBlogs(JSON.parse(savedBlogs));
        } catch (e) {
          setBlogs(MOCK_BLOGS);
        }
      } else {
        setBlogs(MOCK_BLOGS);
        localStorage.setItem('amaya_blogs', JSON.stringify(MOCK_BLOGS));
      }
    };

    loadBlogs();
  }, []);

  const addBlog = async (blog: Blog) => {
    // Optimistic update
    setBlogs(prev => [blog, ...prev]);

    if (supabase && !useLocalStorageFallback) {
      try {
        console.log('Attempting to save blog to Supabase:', mapToDB(blog));
        const { error } = await supabase.from('blogs').insert(mapToDB(blog));
        
        if (error) {
          console.error('Supabase Blog Insert Error:', error.message);
          // If inserting failed due to table missing or other db error, switch to local storage and alert
          if (error.code === '42P01') { // Table not found relation error code
            alert("Database table 'blogs' does not exist in Supabase yet. Reverting to local storage storage for this session.");
            switchToLocalFallbackWithNewBlog(blog);
          } else {
            alert(`Error saving blog: ${error.message}`);
          }
        } else {
          console.log('Successfully saved blog to Supabase!');
        }
      } catch (e) {
        console.error('Failed to add blog to Supabase', e);
        switchToLocalFallbackWithNewBlog(blog);
      }
    } else {
      switchToLocalFallbackWithNewBlog(blog);
    }
  };

  const switchToLocalFallbackWithNewBlog = (newBlog: Blog) => {
    setUseLocalStorageFallback(true);
    const updated = [newBlog, ...blogs.filter(b => b.id !== newBlog.id)];
    setBlogs(updated);
    localStorage.setItem('amaya_blogs', JSON.stringify(updated));
  };

  const deleteBlog = async (id: string) => {
    const originalBlogs = [...blogs];
    
    // Optimistic update
    setBlogs(prev => prev.filter(b => b.id !== id));
    
    if (supabase && !useLocalStorageFallback) {
      try {
        const { error } = await supabase.from('blogs').delete().eq('id', id);
        
        if (error) {
          console.error('Supabase Blog Delete Error:', error);
          setBlogs(originalBlogs);
          alert(`Error deleting blog: ${error.message}`);
        } else {
          console.log('Successfully deleted blog from Supabase!');
        }
      } catch (e) {
        console.error('Failed to delete blog from Supabase', e);
        setBlogs(originalBlogs);
        alert("An unexpected error occurred while deleting the blog.");
      }
    } else {
      const updated = blogs.filter(b => b.id !== id);
      localStorage.setItem('amaya_blogs', JSON.stringify(updated));
    }
  };

  const updateBlog = async (updatedBlog: Blog) => {
    const originalBlogs = [...blogs];
    setBlogs(prev => prev.map(b => b.id === updatedBlog.id ? updatedBlog : b));
    
    if (supabase && !useLocalStorageFallback) {
      try {
        const { error } = await supabase.from('blogs').update(mapToDB(updatedBlog)).eq('id', updatedBlog.id);
        if (error) {
          console.error('Supabase Blog Update Error:', error);
          setBlogs(originalBlogs);
          alert(`Error updating blog: ${error.message}`);
        }
      } catch (e) {
        console.error('Failed to update blog in Supabase', e);
        setBlogs(originalBlogs);
      }
    } else {
      const updated = blogs.map(b => b.id === updatedBlog.id ? updatedBlog : b);
      localStorage.setItem('amaya_blogs', JSON.stringify(updated));
    }
  };

  return (
    <BlogContext.Provider value={{ blogs, addBlog, deleteBlog, updateBlog, isLoading }}>
      {children}
    </BlogContext.Provider>
  );
}

export function useBlogs() {
  const context = useContext(BlogContext);
  if (context === undefined) {
    return {
      blogs: [],
      addBlog: async () => {},
      deleteBlog: async () => {},
      updateBlog: async () => {},
      isLoading: true
    };
  }
  return context;
}
