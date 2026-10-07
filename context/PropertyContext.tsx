"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/utils/supabase';

export interface Property {
  id: string;
  projectName: string;
  region: string;
  location: string;
  price: string;
  priceNumeric: number;
  listingType: string;
  bhkType: string;
  images: string[];
  area?: string;
  projectStatus?: string;
  furnishing?: string;
  amenities?: string[];
  developerName?: string;
  description?: string;
  videoUrl?: string;
  agentName?: string;
  agentContact?: string;
  isFeatured?: boolean;
  isInsured?: boolean;
}

interface PropertyContextType {
  properties: Property[];
  addProperty: (property: Property) => Promise<void>;
  deleteProperty: (id: string) => Promise<void>;
  updateProperty: (property: Property) => Promise<void>;
  isLoading: boolean;
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export const DEFAULT_RENTAL_PROPERTIES: Property[] = [
  {
    id: "rental-vsp-1",
    projectName: "Luxury 3 BHK Apartment",
    region: "VISAKHAPATNAM",
    location: "MVP Colony, Visakhapatnam",
    price: "₹ 45,000 / month",
    priceNumeric: 45000,
    listingType: "Rent",
    bhkType: "3 BHK Flat",
    area: "2,100 sq.ft",
    projectStatus: "Immediate Move-in",
    furnishing: "Fully Furnished",
    developerName: "Amaya Coastal Living",
    description: "An elegant 3 BHK luxury rental apartment in prime MVP Colony. Designed with bespoke contemporary interiors, premium Italian flooring, modular kitchen with appliances, and private parking.",
    images: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200"],
    amenities: ["Modular Kitchen", "Air Conditioning", "Covered Parking", "24/7 Security", "Power Backup", "Gym"],
    isFeatured: true,
    isInsured: true
  },
  {
    id: "rental-vsp-2",
    projectName: "Rushikonda Sea Breeze Penthouse",
    region: "VISAKHAPATNAM",
    location: "Rushikonda, Visakhapatnam",
    price: "₹ 75,000 / month",
    priceNumeric: 75000,
    listingType: "Rent",
    bhkType: "4 BHK Penthouse",
    area: "3,200 sq.ft",
    projectStatus: "Ready to Move",
    furnishing: "Fully Furnished",
    developerName: "Bayview Sky Residences",
    description: "Spectacular hilltop sea-view penthouse with panoramic bay views over Rushikonda Beach. Features an expansive open terrace, smart automation, and 24/7 gated security.",
    images: ["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200"],
    amenities: ["Panoramic Sea View", "Private Terrace", "Infinity Pool", "Clubhouse", "Security", "EV Charging"],
    isFeatured: true,
    isInsured: true
  },
  {
    id: "rental-vsp-3",
    projectName: "Pandurangapuram Executive Flat",
    region: "VISAKHAPATNAM",
    location: "Pandurangapuram, Visakhapatnam",
    price: "₹ 52,000 / month",
    priceNumeric: 52000,
    listingType: "Rent",
    bhkType: "3 BHK Flat",
    area: "2,400 sq.ft",
    projectStatus: "Immediate Move-in",
    furnishing: "Fully Furnished",
    developerName: "Amaya Heritage Promenade",
    description: "A prestigious 3 BHK furnished flat steps from the RK Beach promenade. Bright dual-aspect balconies, high-speed fiber internet ready, and covered stilt parking.",
    images: ["https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=1200"],
    amenities: ["Beach Access", "Elevator", "Power Backup", "Security", "Intercom", "Covered Parking"],
    isFeatured: true,
    isInsured: true
  },
  {
    id: "rental-1",
    projectName: "Worli Sea-Face Sky Villa Flat",
    region: "SOUTH MUMBAI",
    location: "Worli",
    price: "₹ 4,50,000 / mo",
    priceNumeric: 450000,
    listingType: "Rent",
    bhkType: "4 BHK Flat",
    area: "3,800 Sq.Ft",
    projectStatus: "Immediate Move-in",
    furnishing: "Fully Furnished",
    developerName: "Lodha World Towers",
    description: "An ultra-exclusive 4 BHK sea-facing rental flat on high floors with unobstructed Arabian Sea sunsets. Features Italian marble flooring, bespoke German modular kitchen, wrap-around balcony, 3 dedicated parking slots, and 24/7 concierge security.",
    images: ["/assets/images/rental-hero-night.png"],
    amenities: ["Sea View", "Concierge", "Gym", "Swimming Pool", "Parking", "Security", "Clubhouse"],
    isFeatured: true,
    isInsured: true
  },
  {
    id: "rental-2",
    projectName: "Bandra West Designer Boulevard Flat",
    region: "WESTERN MUMBAI",
    location: "Bandra West",
    price: "₹ 2,75,000 / mo",
    priceNumeric: 275000,
    listingType: "Rent",
    bhkType: "3 BHK Flat",
    area: "2,200 Sq.Ft",
    projectStatus: "Immediate Move-in",
    furnishing: "Fully Furnished",
    developerName: "Rustomjee Elements",
    description: "Sophisticated 3 BHK luxury rental apartment located in prime Bandra West off Turner Road. Masterfully designed with acoustic double glazing, smart home automation, walk-in dressing suites, and private high-speed elevator access.",
    images: ["/assets/images/rental-hero-podium.png"],
    amenities: ["Private Lift", "Gym", "Swimming Pool", "Security", "Parking", "Smart Home"],
    isFeatured: true,
    isInsured: true
  },
  {
    id: "rental-3",
    projectName: "Malabar Hill Heritage View Flat",
    region: "SOUTH MUMBAI",
    location: "Malabar Hill",
    price: "₹ 5,20,000 / mo",
    priceNumeric: 520000,
    listingType: "Rent",
    bhkType: "4 BHK Flat",
    area: "4,200 Sq.Ft",
    projectStatus: "Ready to Occupy",
    furnishing: "Semi Furnished",
    developerName: "Amaya Heritage Collection",
    description: "Rare and prestigious 4 BHK high-floor rental flat overlooking Queen's Necklace and lush greenery. Double-height living hall, private staff quarters, and full AMAYA Insured Rental protection guarantee.",
    images: ["/assets/images/rental-hero-panorama.png"],
    amenities: ["Sea View", "Private Lift", "Garden", "Security", "Parking", "Staff Quarters"],
    isFeatured: true,
    isInsured: true
  },
  {
    id: "rental-4",
    projectName: "Juhu Beachfront Horizon Flat",
    region: "WESTERN MUMBAI",
    location: "Juhu",
    price: "₹ 3,50,000 / mo",
    priceNumeric: 350000,
    listingType: "Rent",
    bhkType: "3 BHK Flat",
    area: "2,600 Sq.Ft",
    projectStatus: "Immediate Move-in",
    furnishing: "Fully Furnished",
    developerName: "Kalpataru Horizon",
    description: "Steps away from Juhu Beach, this tranquil 3 BHK rental residence combines coastal serenity with opulent contemporary finishes. Includes imported fittings, floor-to-ceiling glass, and curated European furniture.",
    images: ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000"],
    amenities: ["Beach Access", "Sea View", "Gym", "Swimming Pool", "Security", "Parking"],
    isFeatured: false,
    isInsured: true
  },
  {
    id: "rental-5",
    projectName: "Lower Parel Sky Penthouse Flat",
    region: "CENTRAL MUMBAI",
    location: "Lower Parel",
    price: "₹ 6,00,000 / mo",
    priceNumeric: 600000,
    listingType: "Rent",
    bhkType: "Penthouse Flat",
    area: "5,400 Sq.Ft",
    projectStatus: "Ready to Occupy",
    furnishing: "Designer Furnished",
    developerName: "Piramal Mahalaxmi",
    description: "Monumental duplex penthouse flat for rent on the 62nd floor with panoramic views across the Mahalaxmi Racecourse and Mumbai Harbour. Private rooftop plunge pool, private elevator foyer, and dedicated butler lounge.",
    images: ["https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1000"],
    amenities: ["Plunge Pool", "Racecourse View", "Private Lift", "Gym", "Clubhouse", "Security"],
    isFeatured: false,
    isInsured: true
  },
  {
    id: "rental-6",
    projectName: "Powai Lakefront Modern Flat",
    region: "CENTRAL MUMBAI",
    location: "Powai",
    price: "₹ 1,45,000 / mo",
    priceNumeric: 145000,
    listingType: "Rent",
    bhkType: "2 BHK Flat",
    area: "1,350 Sq.Ft",
    projectStatus: "Available Now",
    furnishing: "Fully Furnished",
    developerName: "Hiranandani Gardens",
    description: "Stunning neoclassical 2 BHK rental flat in Hiranandani Powai overlooking the lake. Comes fully furnished with high-end appliances, central air-conditioning, and immediate clubhouse access.",
    images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1000"],
    amenities: ["Lake View", "Clubhouse", "Gym", "Parking", "Security", "Garden"],
    isFeatured: false,
    isInsured: true
  },
  {
    id: "rental-7",
    projectName: "Khar West Bohemian Chic Flat",
    region: "WESTERN MUMBAI",
    location: "Khar",
    price: "₹ 1,85,000 / mo",
    priceNumeric: 185000,
    listingType: "Rent",
    bhkType: "2 BHK Flat",
    area: "1,200 Sq.Ft",
    projectStatus: "Immediate Move-in",
    furnishing: "Fully Furnished",
    developerName: "Supreme Universal",
    description: "Bright and airy 2 BHK boutique flat for rent on 14th Road Khar. Features exposed brick accents, oak wood flooring, open island kitchen, and serene tree-lined avenue views.",
    images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1000"],
    amenities: ["Terrace Access", "Parking", "Security", "Power Backup"],
    isFeatured: false,
    isInsured: true
  },
  {
    id: "rental-8",
    projectName: "Prabhadevi Sea-Link Vista Flat",
    region: "SOUTH MUMBAI",
    location: "Prabhadevi",
    price: "₹ 3,10,000 / mo",
    priceNumeric: 310000,
    listingType: "Rent",
    bhkType: "3 BHK Flat",
    area: "2,450 Sq.Ft",
    projectStatus: "Immediate Move-in",
    furnishing: "Semi Furnished",
    developerName: "Beaumonde Towers",
    description: "Magnificent 3 BHK rental flat offering unhindered vistas of the Bandra-Worli Sea Link. Triple aspect windows, private service lift, 2 reserved parking slots, and strict 3-tier security.",
    images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1000"],
    amenities: ["Sea Link View", "Gym", "Swimming Pool", "Parking", "Security", "Tennis Court"],
    isFeatured: false,
    isInsured: true
  },
  {
    id: "rental-9",
    projectName: "Colaba Heritage Bay Studio Flat",
    region: "SOUTH MUMBAI",
    location: "Colaba",
    price: "₹ 95,000 / mo",
    priceNumeric: 95000,
    listingType: "Rent",
    bhkType: "1 BHK Flat",
    area: "750 Sq.Ft",
    projectStatus: "Available Now",
    furnishing: "Fully Furnished",
    developerName: "Amaya Colaba Colonial",
    description: "Character-rich 1 BHK colonial flat for rent with 14-foot high ceilings, restored Burma teak wood beams, modern Scandinavian furniture, and footsteps to the waterfront promenade.",
    images: ["https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1000"],
    amenities: ["High Ceilings", "Security", "Furnished", "Waterfront Access"],
    isFeatured: false,
    isInsured: true
  },
  {
    id: "rental-10",
    projectName: "Navi Mumbai Palm Beach Sky Flat",
    region: "NAVI MUMBAI",
    location: "Vashi",
    price: "₹ 85,000 / mo",
    priceNumeric: 85000,
    listingType: "Rent",
    bhkType: "3 BHK Flat",
    area: "1,950 Sq.Ft",
    projectStatus: "Available Now",
    furnishing: "Fully Furnished",
    developerName: "Akshar El Castillo",
    description: "Expansive 3 BHK rental flat situated right along Palm Beach Road. Features uninterrupted creek views, modern modular kitchen, clubhouse amenities, and quick highway transit connectivity.",
    images: ["https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80&w=1000"],
    amenities: ["Creek View", "Clubhouse", "Gym", "Swimming Pool", "Parking", "Security"],
    isFeatured: false,
    isInsured: true
  }
];

const formatRentalPrice = (priceStr?: string) => {
  if (!priceStr) return "₹ 1,50,000 / mo";
  if (priceStr.includes("/ mo") || priceStr.includes("/ month")) return priceStr;
  return `${priceStr} / mo`;
};

const formatRentalBhk = (bhkStr?: string) => {
  if (!bhkStr) return "2 BHK Flat";
  if (bhkStr.toLowerCase().includes("flat") || bhkStr.toLowerCase().includes("apartment")) return bhkStr;
  return `${bhkStr} Flat`;
};

const mapFromDB = (db: any): Property => ({
  id: String(db.id),
  projectName: db.project_name,
  region: db.region || "SOUTH MUMBAI",
  location: db.location || "Worli",
  price: formatRentalPrice(db.price),
  priceNumeric: db.price_numeric || 150000,
  listingType: "Rent", // Strictly rental
  bhkType: formatRentalBhk(db.bhk_type),
  area: db.area || "2,000 Sq.Ft",
  projectStatus: db.project_status || "Immediate Move-in",
  developerName: db.developer_name || "AMAYA Residences",
  description: db.description || "Exclusive luxury rental residence featuring premium finishes and comprehensive rental insurance.",
  images: db.image_url ? [db.image_url] : ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000"],
  isFeatured: db.is_featured || false,
  isInsured: db.is_insured !== false,
});

const mapToDB = (prop: Property): any => ({
  id: prop.id,
  project_name: prop.projectName,
  region: prop.region,
  location: prop.location,
  price: formatRentalPrice(prop.price),
  price_numeric: prop.priceNumeric,
  listing_type: "Rent", // Strictly rental
  bhk_type: formatRentalBhk(prop.bhkType),
  area: prop.area,
  project_status: prop.projectStatus,
  developer_name: prop.developerName,
  description: prop.description,
  image_url: prop.images?.[0] || "",
  is_featured: prop.isFeatured || false,
  is_insured: prop.isInsured || false,
});

export function PropertyProvider({ children }: { children: ReactNode }) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load properties on mount
  useEffect(() => {
    // Immediate initialization from cache or defaults
    if (typeof window !== 'undefined') {
      const realImagesMap: Record<string, string> = {
        "rental-1": "/assets/images/rental-hero-night.png",
        "rental-2": "/assets/images/rental-hero-podium.png",
        "rental-3": "/assets/images/rental-hero-panorama.png",
      };

      const cached = localStorage.getItem('amaya_rental_properties');
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) {
            const updated = parsed.map(p => ({
              ...p,
              listingType: "Rent",
              price: formatRentalPrice(p.price),
              bhkType: formatRentalBhk(p.bhkType),
              images: realImagesMap[p.id] ? [realImagesMap[p.id]] : p.images
            }));
            setProperties(updated);
            localStorage.setItem('amaya_rental_properties', JSON.stringify(updated));
            setIsLoading(false);
          } else {
            setProperties(DEFAULT_RENTAL_PROPERTIES);
            setIsLoading(false);
          }
        } catch {
          setProperties(DEFAULT_RENTAL_PROPERTIES);
          setIsLoading(false);
        }
      } else {
        setProperties(DEFAULT_RENTAL_PROPERTIES);
        localStorage.setItem('amaya_rental_properties', JSON.stringify(DEFAULT_RENTAL_PROPERTIES));
        setIsLoading(false);
      }
    } else {
      setProperties(DEFAULT_RENTAL_PROPERTIES);
      setIsLoading(false);
    }

    const loadPropertiesFromDB = async () => {
      try {
        if (supabase) {
          // Safe fetch with graceful resolve on timeout to prevent Dev Overlay errors
          const fetchPromise = supabase
            .from('properties')
            .select('*')
            .order('created_at', { ascending: false })
            .then((res: any) => res)
            .catch(() => ({ data: null, error: { message: 'network_unavailable' } }));

          const timeoutPromise = new Promise<any>((resolve) =>
            setTimeout(() => resolve({ data: null, error: { message: 'timeout' } }), 1500)
          );

          const { data, error } = (await Promise.race([fetchPromise, timeoutPromise])) as any;

          if (!error && data && data.length > 0) {
            const mapped = data.map(mapFromDB);
            setProperties(mapped);
            if (typeof window !== 'undefined') {
              localStorage.setItem('amaya_rental_properties', JSON.stringify(mapped));
            }
          }
        }
      } catch {
        // Fallback already initialized smoothly
      } finally {
        setIsLoading(false);
      }
    };

    loadPropertiesFromDB();
  }, []);

  const addProperty = async (property: Property) => {
    const rentalProp: Property = {
      ...property,
      listingType: "Rent",
      price: formatRentalPrice(property.price),
      bhkType: formatRentalBhk(property.bhkType)
    };

    // Optimistic update & cache
    setProperties(prev => {
      const next = [rentalProp, ...prev];
      if (typeof window !== 'undefined') {
        localStorage.setItem('amaya_rental_properties', JSON.stringify(next));
      }
      return next;
    });
    
    if (supabase) {
      try {
        console.log('Attempting to save rental flat to Supabase:', mapToDB(rentalProp));
        const { error } = await supabase.from('properties').insert(mapToDB(rentalProp));
        if (error) {
          console.warn('Supabase Insert Error, maintained in local storage:', error.message);
        } else {
          console.log('Successfully saved rental flat to Supabase!');
        }
      } catch (e) {
        console.error('Failed to add property to Supabase', e);
      }
    }
  };

  const deleteProperty = async (id: string) => {
    const originalProperties = [...properties];
    const updated = properties.filter(p => p.id !== id);
    setProperties(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('amaya_rental_properties', JSON.stringify(updated));
    }
    
    if (supabase) {
      try {
        const { error } = await supabase.from('properties').delete().eq('id', id);
        if (error) {
          console.warn('Supabase Delete Error (may be fallback item):', error.message);
        } else {
          console.log('Successfully deleted rental from Supabase!');
        }
      } catch (e) {
        console.error('Failed to delete property from Supabase', e);
      }
    }
  };

  const updateProperty = async (updatedProperty: Property) => {
    const rentalProp: Property = {
      ...updatedProperty,
      listingType: "Rent",
      price: formatRentalPrice(updatedProperty.price),
      bhkType: formatRentalBhk(updatedProperty.bhkType)
    };

    setProperties(prev => {
      const next = prev.map(p => p.id === rentalProp.id ? rentalProp : p);
      if (typeof window !== 'undefined') {
        localStorage.setItem('amaya_rental_properties', JSON.stringify(next));
      }
      return next;
    });
    
    if (supabase) {
      try {
        await supabase.from('properties').update(mapToDB(rentalProp)).eq('id', rentalProp.id);
      } catch (e) {
        console.error('Failed to update property in Supabase', e);
      }
    }
  };

  return (
    <PropertyContext.Provider value={{ properties, addProperty, deleteProperty, updateProperty, isLoading }}>
      {children}
    </PropertyContext.Provider>
  );
}

export function useProperties() {
  const context = useContext(PropertyContext);
  if (context === undefined) {
    return {
      properties: DEFAULT_RENTAL_PROPERTIES,
      addProperty: async () => {},
      deleteProperty: async () => {},
      updateProperty: async () => {},
      isLoading: false
    };
  }
  return context;
}
