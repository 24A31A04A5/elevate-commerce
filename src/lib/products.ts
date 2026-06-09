export type Product = {
  id: string;
  name: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  category: "Audio" | "Desk" | "Lighting" | "Travel" | "Wear";
  rating: number;
  reviewCount: number;
  image: string;
  gallery: string[];
  badge?: "New" | "Bestseller" | "Limited";
  description: string;
  specs: { label: string; value: string }[];
};

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;

export const PRODUCTS: Product[] = [
  {
    id: "titan-keydeck",
    name: "Titan Keydeck",
    tagline: "Machined aluminum mechanical keyboard",
    price: 240,
    category: "Desk",
    rating: 4.9,
    reviewCount: 1284,
    image: img("photo-1587829741301-dc798b83add3"),
    gallery: [img("photo-1587829741301-dc798b83add3"), img("photo-1618384887929-16ec33fab9ef"), img("photo-1595044426077-d36d9236d54a")],
    badge: "Bestseller",
    description: "A low-profile mechanical keyboard milled from a single billet of aluminum. Hot-swappable switches, wireless triple-mode, and a typing feel tuned by the same engineers behind Linear's shortcut philosophy.",
    specs: [
      { label: "Material", value: "6063 Aluminum" },
      { label: "Layout", value: "75% / 84 keys" },
      { label: "Battery", value: "120 hours" },
      { label: "Connectivity", value: "BT 5.3 / 2.4G / USB-C" },
    ],
  },
  {
    id: "orbital-pointer",
    name: "Orbital Pointer",
    tagline: "Optical precision mouse",
    price: 120,
    category: "Desk",
    rating: 4.8,
    reviewCount: 642,
    image: img("photo-1527864550417-7fd91fc51a46"),
    gallery: [img("photo-1527864550417-7fd91fc51a46"), img("photo-1629429407759-01cd3d7cfb38")],
    description: "Symmetric ergonomics, 8K polling, and a magnetic dock that disappears into your desk.",
    specs: [
      { label: "DPI", value: "100–32,000" },
      { label: "Polling", value: "8,000 Hz" },
      { label: "Weight", value: "63g" },
      { label: "Battery", value: "70 hours" },
    ],
  },
  {
    id: "horizon-carry",
    name: "Horizon Carry-on",
    tagline: "Nappa leather travel bag",
    price: 450,
    originalPrice: 520,
    category: "Travel",
    rating: 4.7,
    reviewCount: 318,
    image: img("photo-1553062407-98eeb64c6a62"),
    gallery: [img("photo-1553062407-98eeb64c6a62"), img("photo-1547949003-9792a18a2601")],
    badge: "New",
    description: "A 40L carry-on with a sculpted leather shell, magnetic flap, and a removable laptop sleeve.",
    specs: [
      { label: "Capacity", value: "40 L" },
      { label: "Material", value: "Full-grain Nappa" },
      { label: "Weight", value: "1.4 kg" },
      { label: "Warranty", value: "Lifetime" },
    ],
  },
  {
    id: "elevate-stand",
    name: "Elevate Stand",
    tagline: "Walnut & steel monitor stand",
    price: 85,
    category: "Desk",
    rating: 4.6,
    reviewCount: 421,
    image: img("photo-1527443224154-c4a3942d3acf"),
    gallery: [img("photo-1527443224154-c4a3942d3acf")],
    description: "Solid walnut top on a powder-coated steel base. Hides cables, lifts your monitor 4 inches.",
    specs: [
      { label: "Top", value: "Solid Walnut" },
      { label: "Base", value: "Powder-coated steel" },
      { label: "Height", value: "100 mm" },
      { label: "Load", value: "30 kg" },
    ],
  },
  {
    id: "halo-lamp",
    name: "Halo Task Lamp",
    tagline: "Dimmable desk lamp",
    price: 195,
    category: "Lighting",
    rating: 4.9,
    reviewCount: 540,
    image: img("photo-1565814329452-e1efa11c5b89"),
    gallery: [img("photo-1565814329452-e1efa11c5b89")],
    badge: "Limited",
    description: "A CRI-97 LED bar with continuous dimming and circadian temperature shifting from 2700K to 6500K.",
    specs: [
      { label: "Brightness", value: "1100 lm" },
      { label: "CRI", value: "97" },
      { label: "Range", value: "2700–6500K" },
      { label: "Power", value: "USB-C PD" },
    ],
  },
  {
    id: "obelisk-speaker",
    name: "Obelisk Speaker",
    tagline: "Matte basalt bookshelf",
    price: 1200,
    category: "Audio",
    rating: 5.0,
    reviewCount: 96,
    image: img("photo-1545454675-3531b543be5d"),
    gallery: [img("photo-1545454675-3531b543be5d")],
    badge: "Limited",
    description: "A cast-basalt enclosure that disappears into the room and reproduces a flat response curve from 38 Hz to 24 kHz.",
    specs: [
      { label: "Drivers", value: "1\" tweeter, 5\" mid" },
      { label: "Power", value: "150 W class-D" },
      { label: "Inputs", value: "AirPlay 2, BT, optical" },
      { label: "Weight", value: "6.2 kg" },
    ],
  },
  {
    id: "linear-chrono",
    name: "Linear Chronograph",
    tagline: "Titanium automatic watch",
    price: 320,
    category: "Wear",
    rating: 4.8,
    reviewCount: 212,
    image: img("photo-1523275335684-37898b6baf30"),
    gallery: [img("photo-1523275335684-37898b6baf30")],
    description: "Grade 5 titanium case, sapphire crystal, Miyota 9100 movement.",
    specs: [
      { label: "Case", value: "Grade 5 Titanium 39mm" },
      { label: "Crystal", value: "Domed sapphire" },
      { label: "Movement", value: "Miyota 9100" },
      { label: "Water", value: "100m" },
    ],
  },
  {
    id: "module-tote",
    name: "Module Tote",
    tagline: "Recycled canvas everyday bag",
    price: 95,
    category: "Travel",
    rating: 4.5,
    reviewCount: 187,
    image: img("photo-1548036328-c9fa89d128fa"),
    gallery: [img("photo-1548036328-c9fa89d128fa")],
    description: "A 14L daily tote in 100% recycled canvas with a padded laptop sleeve.",
    specs: [
      { label: "Capacity", value: "14 L" },
      { label: "Material", value: "Recycled canvas" },
      { label: "Laptop", value: "Fits 16\"" },
      { label: "Weight", value: "480 g" },
    ],
  },
];

export const CATEGORIES = ["All", "Audio", "Desk", "Lighting", "Travel", "Wear"] as const;
export type Category = (typeof CATEGORIES)[number];
