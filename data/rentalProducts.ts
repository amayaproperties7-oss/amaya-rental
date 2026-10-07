export interface RentalProduct {
  id: string;
  title: string;
  category: string;
  categorySlug: string;
  price: string;
  priceNumeric: number;
  originalPrice?: string;
  deposit: string;
  rating: number;
  reviewsCount: number;
  images: string[];
  specs: { label: string; value: string }[];
  features: string[];
  delivery: string;
  tag?: string;
  description: string;
}

export const ALL_RENTAL_PRODUCTS: RentalProduct[] = [
  // 1. PACKAGES (1 BHK, 2 BHK, 3 BHK, Complete House Packages)
  {
    id: "pkg-1bhk",
    title: "1 BHK Essential Home Rental Package",
    category: "Packages",
    categorySlug: "packages",
    price: "₹ 1,899 / mo",
    priceNumeric: 1899,
    originalPrice: "₹ 2,499 / mo",
    deposit: "₹ 2,500",
    rating: 4.9,
    reviewsCount: 312,
    images: [
      "/assets/images/categories/packages.jpg"
    ],
    specs: [
      { label: "Items Included", value: "Queen Bed + Mattress + 3-Seater Sofa + 190L Refrigerator" },
      { label: "Ideal For", value: "1 BHK Apartments & Working Professionals" },
      { label: "Tenure", value: "3 to 24 Months" }
    ],
    features: ["Free Relocation", "Free Maintenance & Deep Cleaning", "Zero Damage Protection"],
    delivery: "Delivered & Installed in 48 hours",
    tag: "1 BHK Package",
    description: "Complete 1 BHK rental solution. Includes a premium queen bed with mattress, comfortable 3-seater living room sofa, and 190L energy-saving refrigerator."
  },
  {
    id: "pkg-2bhk",
    title: "2 BHK Complete Home Rental Package",
    category: "Packages",
    categorySlug: "packages",
    price: "₹ 2,799 / mo",
    priceNumeric: 2799,
    originalPrice: "₹ 3,699 / mo",
    deposit: "₹ 3,500",
    rating: 4.9,
    reviewsCount: 248,
    images: [
      "/assets/images/categories/pkg_2bhk.jpg"
    ],
    specs: [
      { label: "Items Included", value: "2 Queen Beds + 2 Mattresses + 3-Seater Sofa + Coffee Table + 245L Refrigerator + Washing Machine" },
      { label: "Ideal For", value: "2 BHK Families & Shared Living" },
      { label: "Tenure", value: "3 to 24 Months" }
    ],
    features: ["Dual Bedroom Furnishing", "Major Appliances Suite", "Annual Fabric Deep Clean"],
    delivery: "Delivered & Installed in 48-72 hours",
    tag: "2 BHK Package",
    description: "Full-scale 2 BHK home rental package with two queen beds, orthopedic mattresses, plush living room sofa set, center coffee table, double-door frost-free refrigerator, and automatic washing machine."
  },
  {
    id: "pkg-3bhk",
    title: "3 BHK Premium Home Rental Package",
    category: "Packages",
    categorySlug: "packages",
    price: "₹ 3,899 / mo",
    priceNumeric: 3899,
    originalPrice: "₹ 4,999 / mo",
    deposit: "₹ 4,500",
    rating: 4.9,
    reviewsCount: 176,
    images: [
      "/assets/images/categories/pkg_3bhk.jpg"
    ],
    specs: [
      { label: "Items Included", value: "3 Beds + 3 Mattresses + 5-Seater L-Shape Sofa + Dining Set (4-Seater) + 245L Refrigerator + Washing Machine + Smart TV (43\")" },
      { label: "Ideal For", value: "3 BHK Residences & Executive Living" },
      { label: "Tenure", value: "3 to 24 Months" }
    ],
    features: ["Turnkey 3-Bedroom Setup", "Free Priority Relocation", "Full Damage Protection"],
    delivery: "Delivered & Installed in 72 hours",
    tag: "3 BHK Package",
    description: "Expansive 3 BHK rental package covering all three bedrooms, designer L-shaped sectional sofa, 4-seater dining table, smart television, and essential kitchen & laundry appliances."
  },
  {
    id: "pkg-complete-house",
    title: "Complete House Luxury Rental Package",
    category: "Packages",
    categorySlug: "packages",
    price: "₹ 4,999 / mo",
    priceNumeric: 4999,
    originalPrice: "₹ 6,499 / mo",
    deposit: "₹ 5,500",
    rating: 5.0,
    reviewsCount: 142,
    images: [
      "/assets/images/categories/pkg_complete_house.jpg"
    ],
    specs: [
      { label: "Items Included", value: "Complete Bedrooms + Living Room Suite + Dining Set + Full Appliances Suite (Fridge, Washer, Smart TV, RO Water Purifier)" },
      { label: "Ideal For", value: "Independent Villas, Penthouses & Full Homes" },
      { label: "Tenure", value: "3 to 24 Months" }
    ],
    features: ["100% Turnkey Ready-to-Move", "Periodic Complimentary Deep Cleaning", "Dedicated Lease Concierge"],
    delivery: "Delivered & Installed by certified team",
    tag: "Complete House",
    description: "All-in-one complete house rental solution. Unpack your bags and start living with fully furnished bedrooms, luxury living lounge, 6-seater dining set, smart entertainment, and complete major home appliances."
  },

  // 2. WATER PURIFIERS
  {
    id: "wp-1",
    title: "Amaya Pure Mineral RO+UV Water Purifier",
    category: "Water Purifiers",
    categorySlug: "water-purifiers",
    price: "₹ 449 / mo",
    priceNumeric: 449,
    originalPrice: "₹ 599 / mo",
    deposit: "₹ 500",
    rating: 4.9,
    reviewsCount: 521,
    images: [
      "/assets/images/categories/water_purifiers.jpg"
    ],
    specs: [
      { label: "Filtration", value: "7-Stage RO + UV + UF + Mineralizer" },
      { label: "Storage Capacity", value: "8 Litres" },
      { label: "Installation", value: "Free Wall Mount" }
    ],
    features: ["Zero Maintenance Cost", "Free Filter Replacement", "Smart TDS Controller"],
    delivery: "Free Installation in 48 hours",
    tag: "Best Seller",
    description: "Advanced RO purification system that eliminates bacteria, viruses, and heavy metals while restoring essential alkaline minerals."
  },
  {
    id: "wp-2",
    title: "Amaya Copper Active Smart RO Dispenser",
    category: "Water Purifiers",
    categorySlug: "water-purifiers",
    price: "₹ 549 / mo",
    priceNumeric: 549,
    originalPrice: "₹ 699 / mo",
    deposit: "₹ 600",
    rating: 4.8,
    reviewsCount: 310,
    images: [
      "/assets/images/categories/water_purifiers.jpg"
    ],
    specs: [
      { label: "Filtration", value: "RO + Copper Infusion + UV LED" },
      { label: "Storage", value: "10 Litres Stainless Steel Tank" }
    ],
    features: ["99.9% Microbial Protection", "Free Relocation", "Automated Service Alerts"],
    delivery: "Delivered & Installed in 48 hours",
    tag: "New",
    description: "Ayurvedic copper mineral infusion technology for enhanced immunity, paired with a hygienic stainless steel storage reservoir."
  },

  // 3. BEDS
  {
    id: "bed-1",
    title: "Aura Queen Size Bed with Box Storage",
    category: "Beds",
    categorySlug: "beds",
    price: "₹ 599 / mo",
    priceNumeric: 599,
    originalPrice: "₹ 799 / mo",
    deposit: "₹ 800",
    rating: 4.8,
    reviewsCount: 260,
    images: [
      "/assets/images/categories/beds.jpg"
    ],
    specs: [
      { label: "Bed Size", value: "Queen Size (60x78 inches)" },
      { label: "Material", value: "Premium Engineered Wood with Teak Finish" },
      { label: "Storage", value: "4-Compartment Box Storage" }
    ],
    features: ["Termite Proof", "Heavy Duty Slats", "Free Assembly"],
    delivery: "Delivered in 48 hours",
    tag: "Popular",
    description: "Spacious queen size wooden bed with dual-compartment under-bed storage, upholstered headboard, and sturdy mattress slats."
  },
  {
    id: "bed-2",
    title: "Nordic Solid Wood King Size Bed",
    category: "Beds",
    categorySlug: "beds",
    price: "₹ 749 / mo",
    priceNumeric: 749,
    originalPrice: "₹ 999 / mo",
    deposit: "₹ 1,000",
    rating: 4.9,
    reviewsCount: 198,
    images: [
      "/assets/images/categories/beds.jpg"
    ],
    specs: [
      { label: "Bed Size", value: "King Size (72x78 inches)" },
      { label: "Material", value: "Sheesham Solid Hardwood" }
    ],
    features: ["Handcrafted Finish", "Noise Free Frame", "Lifetime Termite Warranty"],
    delivery: "Delivered in 72 hours",
    description: "Crafted from seasoned solid Sheesham wood with clean lines and sturdy Scandinavian minimalist construction."
  },

  // 4. SOFAS
  {
    id: "sofa-1",
    title: "Naples 3-Seater Fabric Sofa - Slate Grey",
    category: "Sofas",
    categorySlug: "sofas",
    price: "₹ 549 / mo",
    priceNumeric: 549,
    originalPrice: "₹ 749 / mo",
    deposit: "₹ 700",
    rating: 4.8,
    reviewsCount: 410,
    images: [
      "/assets/images/categories/sofas.jpg"
    ],
    specs: [
      { label: "Seating Capacity", value: "3 Persons" },
      { label: "Upholstery", value: "Breathable Premium Linen Fabric" },
      { label: "Foam Density", value: "32 High Resilient Density Foam" }
    ],
    features: ["Stain Resistant Fabric", "Solid Sal Wood Frame", "Deep Cushion Seating"],
    delivery: "Delivered in 48 hours",
    tag: "Top Rated",
    description: "Generously cushioned 3-seater sofa draped in premium textured slate fabric. Features ergonomic armrests and pocket springs."
  },
  {
    id: "sofa-2",
    title: "Milano L-Shape Reversible Sectional Sofa",
    category: "Sofas",
    categorySlug: "sofas",
    price: "₹ 949 / mo",
    priceNumeric: 949,
    originalPrice: "₹ 1,299 / mo",
    deposit: "₹ 1,200",
    rating: 4.9,
    reviewsCount: 165,
    images: [
      "/assets/images/categories/sofas.jpg"
    ],
    specs: [
      { label: "Configuration", value: "4-5 Seater L-Shape (Reversible Lounger)" },
      { label: "Frame", value: "Hardwood & Powder Coated Metal Legs" }
    ],
    features: ["Modular Reversible Chaise", "Plush Tufted Backrest", "Complimentary Cushions"],
    delivery: "Delivered in 72 hours",
    tag: "Luxury",
    description: "Expansive luxury sectional sofa that allows positioning the chaise on either the left or right side according to your room layout."
  },

  // 5. MATTRESSES
  {
    id: "mat-1",
    title: "Orthopedic Memory Foam Mattress - Queen",
    category: "Mattresses",
    categorySlug: "mattresses",
    price: "₹ 349 / mo",
    priceNumeric: 349,
    originalPrice: "₹ 499 / mo",
    deposit: "₹ 400",
    rating: 4.9,
    reviewsCount: 380,
    images: [
      "/assets/images/categories/mattresses.jpg"
    ],
    specs: [
      { label: "Dimensions", value: "78 x 60 x 6 inches (Queen)" },
      { label: "Layering", value: "High Resilience + Gel Memory Foam" }
    ],
    features: ["Zero Motion Transfer", "Removable Breathable Zipper Cover", "Hypoallergenic"],
    delivery: "Delivered in 24 hours",
    tag: "Ergonomic",
    description: "Engineered with spinal alignment technology, contouring memory foam, and cooling air-mesh fabric for rejuvenating sleep."
  },
  {
    id: "mat-2",
    title: "Dual Comfort Pocket Spring Mattress - King",
    category: "Mattresses",
    categorySlug: "mattresses",
    price: "₹ 449 / mo",
    priceNumeric: 449,
    originalPrice: "₹ 599 / mo",
    deposit: "₹ 500",
    rating: 4.8,
    reviewsCount: 190,
    images: [
      "/assets/images/categories/mattresses.jpg"
    ],
    specs: [
      { label: "Dimensions", value: "78 x 72 x 8 inches (King)" },
      { label: "Support", value: "Individually Encased Pocket Coils" }
    ],
    features: ["Edge Support Foam Encasement", "Medium-Plush Feel", "Sanitized & Fresh"],
    delivery: "Delivered in 48 hours",
    description: "Premium king mattress combining individual pocket springs with pressure-relieving high density foam."
  },

  // 6. WARDROBE & ORGANIZER
  {
    id: "ward-1",
    title: "Modern 3-Door Wardrobe with Full Mirror",
    category: "Wardrobe & Organizer",
    categorySlug: "wardrobe-organizer",
    price: "₹ 499 / mo",
    priceNumeric: 499,
    originalPrice: "₹ 699 / mo",
    deposit: "₹ 600",
    rating: 4.8,
    reviewsCount: 220,
    images: [
      "/assets/images/categories/wardrobe.jpg"
    ],
    specs: [
      { label: "Doors", value: "3 Hinged Doors + Exterior Mirror" },
      { label: "Shelving", value: "6 Shelves, 1 Hanging Rod, 2 Lockable Drawers" }
    ],
    features: ["Key Lock Security", "Seamless Soft Close Hinges", "Scratch Resistant Melamine"],
    delivery: "Delivered in 48 hours",
    tag: "Spacious",
    description: "Comprehensive bedroom storage with dedicated hanging wardrobe space, inner drawer lock, and full-length dressing mirror."
  },
  {
    id: "ward-2",
    title: "Compact 2-Door Minimalist Wardrobe",
    category: "Wardrobe & Organizer",
    categorySlug: "wardrobe-organizer",
    price: "₹ 349 / mo",
    priceNumeric: 349,
    originalPrice: "₹ 499 / mo",
    deposit: "₹ 400",
    rating: 4.7,
    reviewsCount: 145,
    images: [
      "/assets/images/categories/wardrobe.jpg"
    ],
    specs: [
      { label: "Dimensions", value: "72 x 32 x 18 inches" },
      { label: "Shelves", value: "4 Shelves + Hanging Rod" }
    ],
    features: ["Space Saving Footprint", "Water Resistant Base", "Smooth Metal Handles"],
    delivery: "Delivered in 48 hours",
    description: "Perfect for apartments and studios. Offers ample vertical storage for apparel, coats, and linen."
  },

  // 7. REFRIGERATORS & FREEZERS
  {
    id: "fridge-1",
    title: "Double Door Frost-Free Refrigerator (245L)",
    category: "Refrigerators & Freezers",
    categorySlug: "refrigerators-freezers",
    price: "₹ 749 / mo",
    priceNumeric: 749,
    originalPrice: "₹ 999 / mo",
    deposit: "₹ 800",
    rating: 4.9,
    reviewsCount: 490,
    images: [
      "/assets/images/categories/refrigerators.jpg"
    ],
    specs: [
      { label: "Capacity", value: "245 Litres" },
      { label: "Type", value: "Frost-Free Double Door" },
      { label: "Energy Rating", value: "3-Star Smart Inverter" }
    ],
    features: ["Stabilizer Free Operation", "Toughened Glass Shelves", "Fast Ice Freezing"],
    delivery: "Delivered in 24-48 hours",
    tag: "Best Seller",
    description: "Reliable frost-free double door refrigerator with multi-airflow cooling, moist balance crisper, and smart inverter compressor."
  },
  {
    id: "fridge-2",
    title: "Single Door Direct Cool Refrigerator (190L)",
    category: "Refrigerators & Freezers",
    categorySlug: "refrigerators-freezers",
    price: "₹ 499 / mo",
    priceNumeric: 499,
    originalPrice: "₹ 699 / mo",
    deposit: "₹ 600",
    rating: 4.8,
    reviewsCount: 310,
    images: [
      "/assets/images/categories/refrigerators.jpg"
    ],
    specs: [
      { label: "Capacity", value: "190 Litres" },
      { label: "Energy Rating", value: "4-Star Energy Saving" }
    ],
    features: ["Anti-Bacterial Gasket", "Chiller Tray", "Spacious Vegetable Box"],
    delivery: "Delivered in 24 hours",
    description: "Energy-efficient direct cool refrigerator with quick ice making capability and large vegetable crisper."
  },

  // 8. TELEVISIONS
  {
    id: "tv-1",
    title: "Smart 4K Ultra HD LED TV (43 Inch)",
    category: "Televisions",
    categorySlug: "televisions",
    price: "₹ 649 / mo",
    priceNumeric: 649,
    originalPrice: "₹ 899 / mo",
    deposit: "₹ 700",
    rating: 4.9,
    reviewsCount: 420,
    images: [
      "/assets/images/categories/televisions.jpg"
    ],
    specs: [
      { label: "Display Size", value: "43 Inch (108 cm)" },
      { label: "Resolution", value: "4K Ultra HD (3840 x 2160)" },
      { label: "OS", value: "Google TV with Netflix, Prime, YouTube" }
    ],
    features: ["Dolby Audio 24W", "Bezel-less Design", "Chromecast Built-in"],
    delivery: "Delivered & Wall-mounted in 48 hours",
    tag: "Popular",
    description: "Cinematic 4K UHD Smart TV with vibrant HDR10 contrast, Google Assistant voice remote, and dual HDMI ports."
  },
  {
    id: "tv-2",
    title: "Cinema 55\" 4K Frameless Smart QLED TV",
    category: "Televisions",
    categorySlug: "televisions",
    price: "₹ 999 / mo",
    priceNumeric: 999,
    originalPrice: "₹ 1,399 / mo",
    deposit: "₹ 1,200",
    rating: 4.9,
    reviewsCount: 175,
    images: [
      "/assets/images/categories/televisions.jpg"
    ],
    specs: [
      { label: "Display Size", value: "55 Inch (139 cm)" },
      { label: "Display Tech", value: "Quantum Dot QLED Panel (120Hz)" }
    ],
    features: ["Dolby Atmos Sound", "Hands-Free Voice Search", "Gaming Mode Low Latency"],
    delivery: "Delivered & Wall-mounted in 48 hours",
    tag: "Flagship",
    description: "Breathtaking 55-inch QLED display offering 1 billion colors, quantum processor, and theater-grade Dolby Atmos sound."
  },

  // 9. WASHING MACHINES
  {
    id: "wm-1",
    title: "Fully Automatic Front Load Washing Machine (7 Kg)",
    category: "Washing Machines",
    categorySlug: "washing-machines",
    price: "₹ 749 / mo",
    priceNumeric: 749,
    originalPrice: "₹ 999 / mo",
    deposit: "₹ 800",
    rating: 4.9,
    reviewsCount: 380,
    images: [
      "/assets/images/categories/washing_machines.jpg"
    ],
    specs: [
      { label: "Capacity", value: "7.0 Kg" },
      { label: "Loading Type", value: "Front Load Fully Automatic" },
      { label: "Spin Speed", value: "1200 RPM" }
    ],
    features: ["Inbuilt Water Heater", "15 Wash Programs", "Steam Hygiene Wash"],
    delivery: "Free Delivery & Plumbing Setup",
    tag: "Best Seller",
    description: "Quiet and energy-efficient inverter front load washing machine with steam wash to sterilize fabrics and prevent wrinkles."
  },
  {
    id: "wm-2",
    title: "Fully Automatic Top Load Washing Machine (6.5 Kg)",
    category: "Washing Machines",
    categorySlug: "washing-machines",
    price: "₹ 549 / mo",
    priceNumeric: 549,
    originalPrice: "₹ 749 / mo",
    deposit: "₹ 600",
    rating: 4.8,
    reviewsCount: 290,
    images: [
      "/assets/images/categories/washing_machines.jpg"
    ],
    specs: [
      { label: "Capacity", value: "6.5 Kg" },
      { label: "Loading", value: "Top Load with Soft Close Glass Lid" }
    ],
    features: ["Smart Inverter Technology", "TurboWash System", "Stainless Steel Drum"],
    delivery: "Delivered & Installed in 24 hours",
    description: "Compact and powerful top load washer with smart water sensors and lint filters for effortless daily laundry."
  },

  // 10. AIR CONDITIONERS
  {
    id: "ac-1",
    title: "1.5 Ton 5-Star Dual Inverter Split AC",
    category: "Air Conditioners",
    categorySlug: "air-conditioners",
    price: "₹ 1,199 / mo",
    priceNumeric: 1199,
    originalPrice: "₹ 1,599 / mo",
    deposit: "₹ 1,500",
    rating: 4.9,
    reviewsCount: 460,
    images: [
      "/assets/images/categories/air_conditioners.jpg"
    ],
    specs: [
      { label: "Tonnage", value: "1.5 Ton (Ideal for up to 180 sq.ft)" },
      { label: "Energy Rating", value: "5 Star Dual Inverter" },
      { label: "Condenser", value: "100% Copper with Anti-Corrosion Coating" }
    ],
    features: ["Free Standard Installation", "PM 2.5 Air Filter", "Whisper-Quiet 21dB Operation"],
    delivery: "Delivered & Installed by certified tech",
    tag: "Summer Essential",
    description: "Rapid cooling inverter split AC with ultra-low electricity consumption and smart temperature sensing."
  },
  {
    id: "ac-2",
    title: "1.0 Ton 3-Star Inverter Split AC",
    category: "Air Conditioners",
    categorySlug: "air-conditioners",
    price: "₹ 899 / mo",
    priceNumeric: 899,
    originalPrice: "₹ 1,199 / mo",
    deposit: "₹ 1,000",
    rating: 4.8,
    reviewsCount: 230,
    images: [
      "/assets/images/categories/air_conditioners.jpg"
    ],
    specs: [
      { label: "Tonnage", value: "1.0 Ton (Ideal for up to 120 sq.ft)" },
      { label: "Cooling Tech", value: "Fast Cooling Turbo Mode" }
    ],
    features: ["Stabilizer Free Operation", "Self Diagnosis", "Dust Filter Protection"],
    delivery: "Delivered in 48 hours",
    description: "Compact split AC for bedrooms and home studies with reliable performance and energy savings."
  },

  // 11. CHAIRS & STOOLS
  {
    id: "chair-1",
    title: "Ergonomic High-Back Executive Mesh Chair",
    category: "Chairs & Stools",
    categorySlug: "chairs-stools",
    price: "₹ 249 / mo",
    priceNumeric: 249,
    originalPrice: "₹ 349 / mo",
    deposit: "₹ 300",
    rating: 4.9,
    reviewsCount: 512,
    images: [
      "/assets/images/categories/chairs.jpg"
    ],
    specs: [
      { label: "Type", value: "High Back with Adjustable Headrest" },
      { label: "Mechanism", value: "Multi-Angle Synchro Tilt Lock" }
    ],
    features: ["Adjustable Lumbar Support", "3D Armrests", "Heavy-Duty Nylon Base"],
    delivery: "Delivered in 24 hours",
    tag: "Work From Home",
    description: "Engineered for 8+ hours of comfortable seating with breathable Korean mesh back and high-density moulded foam cushion."
  },
  {
    id: "chair-2",
    title: "Mid-Century Modern Velvet Accent Armchair",
    category: "Chairs & Stools",
    categorySlug: "chairs-stools",
    price: "₹ 299 / mo",
    priceNumeric: 299,
    originalPrice: "₹ 449 / mo",
    deposit: "₹ 400",
    rating: 4.8,
    reviewsCount: 160,
    images: [
      "/assets/images/categories/chairs.jpg"
    ],
    specs: [
      { label: "Upholstery", value: "Plush Velvet with Tapered Metal Legs" },
      { label: "Usage", value: "Living Room / Bedroom Accent" }
    ],
    features: ["Ergonomic Wingback Silhouette", "Gold Accent Tip Legs", "Firm Seat Cushion"],
    delivery: "Delivered in 48 hours",
    description: "An elegant statement armchair adding luxury and vibrant character to any living room or reading corner."
  },

  // 12. STUDY TABLES
  {
    id: "table-1",
    title: "Minimalist Modern Study Desk with Drawer",
    category: "Study Tables",
    categorySlug: "study-tables",
    price: "₹ 299 / mo",
    priceNumeric: 299,
    originalPrice: "₹ 399 / mo",
    deposit: "₹ 300",
    rating: 4.8,
    reviewsCount: 340,
    images: [
      "/assets/images/categories/study_tables.jpg"
    ],
    specs: [
      { label: "Tabletop Size", value: "48 x 24 inches" },
      { label: "Material", value: "Engineered Wood with Metal Legs" }
    ],
    features: ["Cable Grommet Hole", "Smooth Slide Drawer", "Scratch Resistant Finish"],
    delivery: "Delivered in 24 hours",
    tag: "Study & Work",
    description: "Sturdy and spacious workstation desk with matte metal legs and built-in drawer for stationary and laptop accessories."
  },
  {
    id: "table-2",
    title: "Executive L-Shaped Corner Workstation Desk",
    category: "Study Tables",
    categorySlug: "study-tables",
    price: "₹ 499 / mo",
    priceNumeric: 499,
    originalPrice: "₹ 699 / mo",
    deposit: "₹ 500",
    rating: 4.9,
    reviewsCount: 180,
    images: [
      "/assets/images/categories/study_tables.jpg"
    ],
    specs: [
      { label: "Configuration", value: "L-Shaped Corner Fit" },
      { label: "Shelving", value: "2 Open Storage Bookshelves" }
    ],
    features: ["Dual Monitor Friendly", "Heavy Duty Steel Frame", "Spacious Leg Room"],
    delivery: "Delivered in 48 hours",
    description: "Maximizes corner space, providing plenty of room for multiple monitors, printers, notebooks, and reference materials."
  },

  // 13. CENTER TABLES
  {
    id: "ct-1",
    title: "Nordic Wooden Center Coffee Table",
    category: "Center Tables",
    categorySlug: "center-tables",
    price: "₹ 199 / mo",
    priceNumeric: 199,
    originalPrice: "₹ 299 / mo",
    deposit: "₹ 250",
    rating: 4.8,
    reviewsCount: 220,
    images: [
      "/assets/images/categories/center_tables.jpg"
    ],
    specs: [
      { label: "Shape", value: "Oval with Bottom Storage Shelf" },
      { label: "Material", value: "Natural Oak Finish Wood" }
    ],
    features: ["Rounded Child-Safe Corners", "Magazine Shelf", "Non-Skid Base"],
    delivery: "Delivered in 24 hours",
    tag: "Living Room",
    description: "Clean oval Scandinavian coffee table featuring warm natural wood texture and lower shelf for magazines and remotes."
  },
  {
    id: "ct-2",
    title: "Modern Tempered Glass Top Center Table",
    category: "Center Tables",
    categorySlug: "center-tables",
    price: "₹ 249 / mo",
    priceNumeric: 249,
    originalPrice: "₹ 349 / mo",
    deposit: "₹ 300",
    rating: 4.7,
    reviewsCount: 110,
    images: [
      "/assets/images/categories/center_tables.jpg"
    ],
    specs: [
      { label: "Top", value: "8mm Beveled Tempered Safety Glass" },
      { label: "Frame", value: "Matte Black Powder Coated Steel" }
    ],
    features: ["Heat Resistant", "Easy Wipe Clean", "Geometric Base"],
    delivery: "Delivered in 48 hours",
    description: "Contemporary glass coffee table with geometric black steel frame, creating an open, airy feeling in compact living rooms."
  },

  // 14. BEDSIDE TABLES
  {
    id: "bst-1",
    title: "Aura 2-Drawer Wooden Bedside Nightstand",
    category: "Bedside Tables",
    categorySlug: "bedside-tables",
    price: "₹ 149 / mo",
    priceNumeric: 149,
    originalPrice: "₹ 249 / mo",
    deposit: "₹ 200",
    rating: 4.8,
    reviewsCount: 290,
    images: [
      "/assets/images/categories/bedside_tables.jpg"
    ],
    specs: [
      { label: "Drawers", value: "2 Smooth Telescopic Slide Drawers" },
      { label: "Finish", value: "Walnut & Matte White Dual Tone" }
    ],
    features: ["Silent Runners", "Top Lamp Surface", "Sturdy Base"],
    delivery: "Delivered in 24 hours",
    tag: "Compact",
    description: "Dual-drawer bedside table with sleek handles, keeping your night essentials, books, and smartphone within easy reach."
  },
  {
    id: "bst-2",
    title: "Minimalist Open-Shelf Bedside Table",
    category: "Bedside Tables",
    categorySlug: "bedside-tables",
    price: "₹ 119 / mo",
    priceNumeric: 119,
    originalPrice: "₹ 199 / mo",
    deposit: "₹ 150",
    rating: 4.7,
    reviewsCount: 140,
    images: [
      "/assets/images/categories/bedside_tables.jpg"
    ],
    specs: [
      { label: "Dimensions", value: "20 x 16 x 16 inches" },
      { label: "Design", value: "Open Cubby + Top Platform" }
    ],
    features: ["Lightweight & Moveable", "Water Resistant Finish"],
    delivery: "Delivered in 24 hours",
    description: "Simple, functional side table with an open cubby design for bedtime books, water bottles, and nightlights."
  },

  // 15. CHEST OF DRAWERS
  {
    id: "cod-1",
    title: "Classic 4-Drawer Wooden Chest of Drawers",
    category: "Chest of Drawers",
    categorySlug: "chest-of-drawers",
    price: "₹ 399 / mo",
    priceNumeric: 399,
    originalPrice: "₹ 549 / mo",
    deposit: "₹ 450",
    rating: 4.8,
    reviewsCount: 175,
    images: [
      "/assets/images/categories/chest_of_drawers.jpg"
    ],
    specs: [
      { label: "Drawers", value: "4 Full-Depth Slide Drawers" },
      { label: "Material", value: "Premium Engineered Wood, Oak Grain" }
    ],
    features: ["Anti-Tip Wall Kit Included", "Telescopic Steel Channels", "Deep Storage Capacity"],
    delivery: "Delivered in 48 hours",
    tag: "Organized",
    description: "Generous 4-drawer dresser ideal for organizing folded clothes, linen, baby accessories, and cosmetics."
  },
  {
    id: "cod-2",
    title: "Wide 6-Drawer Contemporary Storage Unit",
    category: "Chest of Drawers",
    categorySlug: "chest-of-drawers",
    price: "₹ 549 / mo",
    priceNumeric: 549,
    originalPrice: "₹ 749 / mo",
    deposit: "₹ 600",
    rating: 4.9,
    reviewsCount: 120,
    images: [
      "/assets/images/categories/chest_of_drawers.jpg"
    ],
    specs: [
      { label: "Drawers", value: "6 Drawers (3x2 Layout)" },
      { label: "Surface", value: "Wide Vanity Top Platform" }
    ],
    features: ["Soft Touch Pull Knobs", "Sturdy Backboard", "Dust Free Enclosure"],
    delivery: "Delivered in 48 hours",
    description: "Wide double-column chest of drawers with ample table space for decorative planters, jewelry boxes, or small vanity mirrors."
  },

  // EXTRA CATEGORIES
  {
    id: "dt-1",
    title: "Nordic 4-Seater Dining Table & Chairs Set",
    category: "Dining Tables",
    categorySlug: "dining-tables",
    price: "₹ 649 / mo",
    priceNumeric: 649,
    deposit: "₹ 700",
    rating: 4.9,
    reviewsCount: 210,
    images: ["https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?q=80&w=800"],
    specs: [{ label: "Capacity", value: "4 Seater (Table + 4 Chairs)" }],
    features: ["Heat Resistant Tabletop", "Ergonomic Chairs", "Free Assembly"],
    delivery: "Delivered in 48 hours",
    description: "Comfortable 4-seater dining set with cushioned fabric chairs and durable solid wood table frame."
  },
  {
    id: "micro-1",
    title: "Smart Convection Microwave Oven (28L)",
    category: "Microwaves & Ovens",
    categorySlug: "microwaves-ovens",
    price: "₹ 349 / mo",
    priceNumeric: 349,
    deposit: "₹ 400",
    rating: 4.8,
    reviewsCount: 195,
    images: ["https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?q=80&w=800"],
    specs: [{ label: "Capacity", value: "28 Litres" }, { label: "Features", value: "Bake, Grill, Reheat, Defrost" }],
    features: ["Touch Keypad", "Child Lock", "Ceramic Enamel Cavity"],
    delivery: "Delivered in 24 hours",
    description: "All-in-one convection microwave for fast cooking, baking cakes, grilling tikkas, and reheating meals."
  },
  {
    id: "fit-1",
    title: "Motorized Foldable Treadmill with Incline",
    category: "Fitness & Gym",
    categorySlug: "fitness-exercise",
    price: "₹ 999 / mo",
    priceNumeric: 999,
    deposit: "₹ 1,200",
    rating: 4.9,
    reviewsCount: 180,
    images: ["https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=800"],
    specs: [{ label: "Motor", value: "2.5 HP Peak Motor" }, { label: "Speed", value: "Up to 14 km/h" }],
    features: ["Hydraulic Soft Drop Folding", "Heart Rate Monitor", "Bluetooth Speakers"],
    delivery: "Free Delivery & Demo",
    description: "Commercial-grade home motorized treadmill with shock-absorbing running deck and LCD tracking display."
  }
];
