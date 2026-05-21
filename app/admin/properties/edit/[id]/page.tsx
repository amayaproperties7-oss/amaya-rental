"use client";

import { useProperties } from "@/context/PropertyContext";
import { useAuth } from "@/context/AuthContext";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Image as ImageIcon, Loader2 } from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EditPropertyPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const { properties, updateProperty, isLoading } = useProperties();
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const ADMIN_EMAIL = "amayaproperties7@gmail.com";

  const [formData, setFormData] = useState({
    projectName: "",
    region: "Mumbai",
    location: "",
    price: "",
    priceNumeric: 0,
    listingType: "Sale",
    bhkType: "3 BHK",
    area: "",
    projectStatus: "Ready to Move",
    developerName: "",
    description: "",
    imageUrl: "",
    isFeatured: false,
    isInsured: false
  });

  const [isPropertyFound, setIsPropertyFound] = useState<boolean | null>(null);

  // Authenticate admin user
  useEffect(() => {
    if (!authLoading && (!user || user.email !== ADMIN_EMAIL)) {
      router.push("/admin/login");
    }
  }, [user, authLoading, router]);

  // Load property details
  useEffect(() => {
    if (isLoading) return;

    const prop = properties.find((p) => p.id === resolvedParams.id);
    if (prop) {
      setFormData({
        projectName: prop.projectName || "",
        region: prop.region || "Mumbai",
        location: prop.location || "",
        price: prop.price || "",
        priceNumeric: prop.priceNumeric || 0,
        listingType: prop.listingType || "Sale",
        bhkType: prop.bhkType || "3 BHK",
        area: prop.area || "",
        projectStatus: prop.projectStatus || "Ready to Move",
        developerName: prop.developerName || "",
        description: prop.description || "",
        imageUrl: prop.images?.[0] || "",
        isFeatured: !!prop.isFeatured,
        isInsured: !!prop.isInsured
      });
      setIsPropertyFound(true);
    } else {
      setIsPropertyFound(false);
    }
  }, [resolvedParams.id, properties, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedProperty = {
      id: resolvedParams.id,
      projectName: formData.projectName,
      region: formData.region,
      location: formData.location,
      price: formData.price,
      priceNumeric: parseInt(formData.price.replace(/[^0-9]/g, "")) || 0,
      listingType: formData.listingType,
      bhkType: formData.bhkType,
      area: formData.area,
      projectStatus: formData.projectStatus,
      developerName: formData.developerName,
      description: formData.description,
      images: [formData.imageUrl],
      isFeatured: formData.isFeatured,
      isInsured: formData.isInsured
    };
    
    await updateProperty(updatedProperty);
    router.push("/admin/properties");
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-8 h-8 text-gold animate-spin" />
        <p className="text-[10px] tracking-[0.4em] text-white/40 uppercase font-bold">Curating Experience...</p>
      </div>
    );
  }

  if (isPropertyFound === false) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-6 px-6">
        <h1 className="text-3xl font-serif text-white tracking-widest text-center">PROPERTY NOT FOUND</h1>
        <p className="text-[10px] tracking-[0.2em] text-white/40 uppercase text-center max-w-md">
          The property listing you are attempting to edit could not be found or has been removed.
        </p>
        <Link href="/admin/properties" className="inline-flex items-center gap-2 text-[10px] tracking-widest text-gold hover:text-white transition-colors border border-gold/20 px-6 py-3 bg-gold/5 uppercase font-bold rounded-sm">
          <ArrowLeft className="w-3 h-3" /> Back to Inventory
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-32 pb-20 px-6 md:px-20">
      <div className="max-w-4xl mx-auto">
        <Link href="/admin/properties" className="inline-flex items-center gap-2 text-[10px] tracking-widest text-white/40 hover:text-gold mb-8 transition-colors">
          <ArrowLeft className="w-3 h-3" /> BACK TO INVENTORY
        </Link>

        <div className="mb-12">
          <h1 className="text-4xl font-serif tracking-widest mb-2">EDIT PROPERTY</h1>
          <p className="text-[10px] tracking-[0.5em] text-gold uppercase font-bold">Refine Architectural Excellence</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-12">
          {/* Basic Info */}
          <div className="bg-surface border border-white/5 p-10 rounded-sm space-y-8">
            <h2 className="text-[10px] tracking-[0.4em] text-white/40 uppercase font-bold border-b border-white/5 pb-4">Basic Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-2">
                 <label className="text-[9px] tracking-widest text-white/40 uppercase font-bold">Project Name</label>
                 <input 
                   required
                   value={formData.projectName}
                   onChange={(e) => setFormData({...formData, projectName: e.target.value})}
                   className="w-full bg-black/20 border border-white/10 p-4 text-sm outline-none focus:border-gold transition-colors"
                   placeholder="e.g. DLF Camellias"
                 />
               </div>
               <div className="space-y-2">
                 <label className="text-[9px] tracking-widest text-white/40 uppercase font-bold">Location / Area</label>
                 <input 
                   required
                   value={formData.location}
                   onChange={(e) => setFormData({...formData, location: e.target.value})}
                   className="w-full bg-black/20 border border-white/10 p-4 text-sm outline-none focus:border-gold transition-colors"
                   placeholder="e.g. Sector 42, Gurgaon"
                 />
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="space-y-2">
                 <label className="text-[9px] tracking-widest text-white/40 uppercase font-bold">Price Label</label>
                 <input 
                   required
                   value={formData.price}
                   onChange={(e) => setFormData({...formData, price: e.target.value})}
                   className="w-full bg-black/20 border border-white/10 p-4 text-sm outline-none focus:border-gold transition-colors"
                   placeholder="e.g. ₹ 12.5 Cr"
                 />
               </div>
               <div className="space-y-2">
                 <label className="text-[9px] tracking-widest text-white/40 uppercase font-bold">BHK Type</label>
                 <select 
                   value={formData.bhkType}
                   onChange={(e) => setFormData({...formData, bhkType: e.target.value})}
                   className="w-full bg-black/20 border border-white/10 p-4 text-sm outline-none focus:border-gold transition-colors text-white/60"
                 >
                   <option>2 BHK</option>
                   <option>3 BHK</option>
                   <option>4 BHK</option>
                   <option>Penthouse</option>
                   <option>Villa</option>
                 </select>
               </div>
               <div className="space-y-2">
                 <label className="text-[9px] tracking-widest text-white/40 uppercase font-bold">Area (Sq.Ft)</label>
                 <input 
                   required
                   value={formData.area}
                   onChange={(e) => setFormData({...formData, area: e.target.value})}
                   className="w-full bg-black/20 border border-white/10 p-4 text-sm outline-none focus:border-gold transition-colors"
                   placeholder="e.g. 3,500 Sq.Ft"
                 />
               </div>
            </div>
          </div>

          {/* Featured Option */}
          <div className="bg-surface border border-white/5 p-10 rounded-sm space-y-6">
            <h2 className="text-[10px] tracking-[0.4em] text-white/40 uppercase font-bold border-b border-white/5 pb-4">Display Options</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <input 
                  type="checkbox"
                  id="isFeatured"
                  checked={formData.isFeatured}
                  onChange={(e) => setFormData({...formData, isFeatured: e.target.checked})}
                  className="w-5 h-5 accent-gold bg-black/20 border border-white/10"
                />
                <label htmlFor="isFeatured" className="text-[10px] tracking-widest text-white/60 uppercase font-bold cursor-pointer">
                  Feature this property on the homepage
                </label>
              </div>

              <div className="flex items-center gap-4">
                <input 
                  type="checkbox"
                  id="isInsured"
                  checked={formData.isInsured}
                  onChange={(e) => setFormData({...formData, isInsured: e.target.checked})}
                  className="w-5 h-5 accent-gold bg-black/20 border border-white/10"
                />
                <label htmlFor="isInsured" className="text-[10px] tracking-widest text-gold uppercase font-bold cursor-pointer">
                  Mark as Insured & Trusted property
                </label>
              </div>
            </div>
          </div>

          {/* Details & Media */}
          <div className="bg-surface border border-white/5 p-10 rounded-sm space-y-8">
            <h2 className="text-[10px] tracking-[0.4em] text-white/40 uppercase font-bold border-b border-white/5 pb-4">Architectural Details</h2>
            
            <div className="space-y-2">
               <label className="text-[9px] tracking-widest text-white/40 uppercase font-bold">Developer Name</label>
               <input 
                 value={formData.developerName}
                 onChange={(e) => setFormData({...formData, developerName: e.target.value})}
                 className="w-full bg-black/20 border border-white/10 p-4 text-sm outline-none focus:border-gold transition-colors"
                 placeholder="e.g. DLF Luxury Homes"
               />
            </div>

            <div className="space-y-2">
               <label className="text-[9px] tracking-widest text-white/40 uppercase font-bold">Property Description</label>
               <textarea 
                 rows={5}
                 value={formData.description}
                 onChange={(e) => setFormData({...formData, description: e.target.value})}
                 className="w-full bg-black/20 border border-white/10 p-4 text-sm outline-none focus:border-gold transition-colors resize-none"
                 placeholder="Describe the architectural soul of the property..."
               />
            </div>

            <div className="space-y-4">
               <label className="text-[9px] tracking-widest text-white/40 uppercase font-bold">Property Portrait (JPEG/PNG)</label>
               <div className="relative group">
                  <div className={`w-full aspect-video border-2 border-dashed transition-all flex flex-col items-center justify-center gap-4 rounded-sm overflow-hidden ${
                    formData.imageUrl.startsWith("http") || formData.imageUrl.startsWith("data:")
                    ? "border-white/5 bg-black/20" 
                    : "border-gold/30 bg-gold/5"
                  }`}>
                     {formData.imageUrl ? (
                       <div className="relative w-full h-full">
                         <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                         <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button 
                              type="button" 
                              onClick={() => setFormData({...formData, imageUrl: ""})}
                              className="px-6 py-2 bg-red-500 text-white text-[10px] font-bold tracking-widest uppercase"
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

          {/* Actions */}
          <div className="flex flex-col md:flex-row gap-6">
             <button 
               type="submit"
               className="flex-1 flex items-center justify-center gap-4 py-6 bg-gold text-black text-[10px] font-bold tracking-[0.5em] hover:bg-white transition-all rounded-sm shadow-xl shadow-gold/10"
             >
                <Save className="w-4 h-4" /> SAVE CHANGES
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
