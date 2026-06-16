const fs = require('fs');

let fileContent = fs.readFileSync('lib/data.ts', 'utf-8');

const euroProducts = `  {
    id: "eu-500-stack",
    slug: "eu-500-stack",
    name: "Buy Counterfeit €500 Euro Banknotes",
    tagline: "Ultra-rare, high-denomination €500 notes for high-stakes plots and luxury drops.",
    category: "Euro",
    badge: "New Production",
    rating: 5.0,
    reviewCount: 10,
    basePrice: 500,
    originalPrice: 85,
    colorTheme: "from-fuchsia-500/10 to-purple-600/15 text-fuchsia-400 border-fuchsia-500/20",
    stripeColor: "#c026d3",
    bannerColor: "bg-fuchsia-600/10 border-fuchsia-500/30 text-fuchsia-400",
    imageSet: [
      "https://propcounterfeitnotes.com/public/upload/product/buy-500-euro-bills.226webp",
      "https://propcounterfeitnotes.com/public/upload/product/buy-500-euro-bills.226webp",
      "https://propcounterfeitnotes.com/public/upload/product/buy-500-euro-bills.226webp"
    ],
    description: "Ultra-realistic counterfeit €500 notes perfect for European cinema and international productions.",
    longDescription: "Buy realistic counterfeit euros online with high-quality paper and security features. These €500 notes mimic the Europa Series texture and include holographic strips.",
    coaText: "Motion picture prop collectible. Not legal tender.",
    variants: [
      { name: "Standard Stack (100 Bills - €50,000 Face Value)", price: 65, billCount: 100 },
      { name: "Director Pack (500 Bills - €250,000 Face Value)", price: 250, savingsLabel: "Save 23%", billCount: 500 }
    ],
    packageContents: [
      "100x high-fidelity replica €500 bills.",
      "Custom security paper band."
    ],
    storageInstructions: "Store horizontally.",
    supplyChain: "Distributed securely."
  },
  {
    id: "eu-200-stack",
    slug: "eu-200-stack",
    name: "Buy Counterfeit €200 Euro Banknotes",
    tagline: "Crisp and accurate €200 notes for cinematic high-value transactions.",
    category: "Euro",
    rating: 4.9,
    reviewCount: 24,
    basePrice: 500,
    originalPrice: 80,
    colorTheme: "from-yellow-500/10 to-amber-500/15 text-yellow-500 border-yellow-500/20",
    stripeColor: "#eab308",
    bannerColor: "bg-yellow-600/10 border-yellow-500/30 text-yellow-400",
    imageSet: [
      "https://propcounterfeitnotes.com/public/upload/product/buy-eur200-euro-bills.227webp",
      "https://propcounterfeitnotes.com/public/upload/product/buy-eur200-euro-bills.227webp",
      "https://propcounterfeitnotes.com/public/upload/product/buy-eur200-euro-bills.227webp"
    ],
    description: "Highly accurate counterfeit €200 euros ideal for movies, theatre, and photography.",
    longDescription: "Features correct color-shifting inks, holographic strips, and watermarks that make them indistinguishable to the naked eye and camera lens.",
    coaText: "Motion picture prop collectible. Not legal tender.",
    variants: [
      { name: "Standard Stack (100 Bills - €20,000 Face Value)", price: 65, billCount: 100 },
      { name: "Director Pack (500 Bills - €100,000 Face Value)", price: 250, savingsLabel: "Save 23%", billCount: 500 }
    ],
    packageContents: [
      "100x high-fidelity replica €200 bills.",
      "Custom security paper band."
    ],
    storageInstructions: "Store horizontally.",
    supplyChain: "Distributed securely."
  },
  {
    id: "eu-100-stack",
    slug: "eu-100-stack",
    name: "Buy Counterfeit €100 Euro Banknotes",
    tagline: "The staple €100 notes for high-stakes movie scenes and music videos.",
    category: "Euro",
    rating: 4.9,
    reviewCount: 42,
    basePrice: 500,
    originalPrice: 75,
    colorTheme: "from-emerald-500/10 to-green-600/15 text-emerald-400 border-emerald-500/20",
    stripeColor: "#10b981",
    bannerColor: "bg-emerald-600/10 border-emerald-500/30 text-emerald-400",
    imageSet: [
      "https://propcounterfeitnotes.com/public/upload/product/buy-eur100-euro-bills.228webp",
      "https://propcounterfeitnotes.com/public/upload/product/buy-eur100-euro-bills.228webp",
      "https://propcounterfeitnotes.com/public/upload/product/buy-eur100-euro-bills.228webp"
    ],
    description: "High-quality counterfeit €100 euros designed for visual precision on camera.",
    longDescription: "Printed on a specialized cotton-cellulose blend that mimics the crisp 'snap' and texture of genuine Euro banknotes.",
    coaText: "Motion picture prop collectible. Not legal tender.",
    variants: [
      { name: "Standard Stack (100 Bills - €10,000 Face Value)", price: 60, billCount: 100 },
      { name: "Director Pack (500 Bills - €50,000 Face Value)", price: 220, savingsLabel: "Save 26%", billCount: 500 }
    ],
    packageContents: [
      "100x high-fidelity replica €100 bills.",
      "Custom security paper band."
    ],
    storageInstructions: "Store horizontally.",
    supplyChain: "Distributed securely."
  },
  {
    id: "eu-50-stack",
    slug: "eu-50-stack",
    name: "Buy Counterfeit €50 Euro Banknotes",
    tagline: "Most requested €50 note for authentic street transactions.",
    category: "Euro",
    badge: "Best Seller",
    rating: 5.0,
    reviewCount: 18,
    basePrice: 500,
    originalPrice: 65,
    colorTheme: "from-orange-500/10 to-red-500/15 text-orange-400 border-orange-500/20",
    stripeColor: "#f97316",
    bannerColor: "bg-orange-600/10 border-orange-500/30 text-orange-400",
    imageSet: [
      "https://propcounterfeitnotes.com/public/upload/product/buy-eur50-euro-bills.229webp",
      "https://propcounterfeitnotes.com/public/upload/product/buy-eur50-euro-bills.229webp",
      "https://propcounterfeitnotes.com/public/upload/product/buy-eur50-euro-bills.229webp"
    ],
    description: "Reliable and high-resolution counterfeit €50 notes with accurate security band visuals.",
    longDescription: "Sourced to match the thickness and tactile feel of the Euro Series 2. Ideal for rapid counting and cash register close-ups.",
    coaText: "Motion picture prop collectible. Not legal tender.",
    variants: [
      { name: "Standard Stack (100 Bills - €5,000 Face Value)", price: 50, billCount: 100 },
      { name: "Director Pack (500 Bills - €25,000 Face Value)", price: 180, savingsLabel: "Save 28%", billCount: 500 }
    ],
    packageContents: [
      "100x high-fidelity replica €50 bills.",
      "Custom security paper band."
    ],
    storageInstructions: "Store horizontally.",
    supplyChain: "Distributed securely."
  },
  {
    id: "eu-20-stack",
    slug: "eu-20-stack",
    name: "Buy Counterfeit €20 Euro Banknotes",
    tagline: "Perfect €20 notes for 'cash register' scenes or everyday transactions.",
    category: "Euro",
    rating: 4.8,
    reviewCount: 31,
    basePrice: 500,
    originalPrice: 50,
    colorTheme: "from-sky-500/10 to-blue-500/15 text-sky-400 border-sky-500/20",
    stripeColor: "#0ea5e9",
    bannerColor: "bg-sky-600/10 border-sky-500/30 text-sky-400",
    imageSet: [
      "https://propcounterfeitnotes.com/public/upload/product/buy-eur20-euro-bills.230webp",
      "https://propcounterfeitnotes.com/public/upload/product/buy-eur20-euro-bills.230webp",
      "https://propcounterfeitnotes.com/public/upload/product/buy-eur20-euro-bills.230webp"
    ],
    description: "Detailed rendering of the blue €20 note, featuring architectural motifs.",
    longDescription: "Our props are strictly classified as motion picture props and novelty collectibles. They are legal to own for artistic, educational, and entertainment purposes.",
    coaText: "Motion picture prop collectible. Not legal tender.",
    variants: [
      { name: "Standard Stack (100 Bills - €2,000 Face Value)", price: 40, billCount: 100 },
      { name: "Director Pack (500 Bills - €10,000 Face Value)", price: 150, savingsLabel: "Save 25%", billCount: 500 }
    ],
    packageContents: [
      "100x high-fidelity replica €20 bills.",
      "Custom security paper band."
    ],
    storageInstructions: "Store horizontally.",
    supplyChain: "Distributed securely."
  },
  {
    id: "eu-10-stack",
    slug: "eu-10-stack",
    name: "Buy Counterfeit €10 Euro Banknotes",
    tagline: "Everyday €10 notes for background fill and wallet scenes.",
    category: "Euro",
    rating: 4.9,
    reviewCount: 24,
    basePrice: 500,
    originalPrice: 45,
    colorTheme: "from-rose-500/10 to-red-600/15 text-rose-400 border-rose-500/20",
    stripeColor: "#f43f5e",
    bannerColor: "bg-rose-600/10 border-rose-500/30 text-rose-400",
    imageSet: [
      "https://propcounterfeitnotes.com/public/upload/product/buy-eur10-euro-bills.231webp",
      "https://propcounterfeitnotes.com/public/upload/product/buy-eur10-euro-bills.231webp",
      "https://propcounterfeitnotes.com/public/upload/product/buy-eur10-euro-bills.231webp"
    ],
    description: "Realistic fake €10 note featuring high-res offset printing.",
    longDescription: "While they are visually realistic fake money, they are NOT legal tender. Engineered specifically for high-definition cameras.",
    coaText: "Motion picture prop collectible. Not legal tender.",
    variants: [
      { name: "Standard Stack (100 Bills - €1,000 Face Value)", price: 35, billCount: 100 },
      { name: "Director Pack (500 Bills - €5,000 Face Value)", price: 130, savingsLabel: "Save 25%", billCount: 500 }
    ],
    packageContents: [
      "100x high-fidelity replica €10 bills.",
      "Custom security paper band."
    ],
    storageInstructions: "Store horizontally.",
    supplyChain: "Distributed securely."
  },
  {
    id: "eu-5-stack",
    slug: "eu-5-stack",
    name: "Buy Counterfeit €5 Euro Banknotes",
    tagline: "Standard issue €5 notes for low-stakes exchanges.",
    category: "Euro",
    rating: 4.7,
    reviewCount: 12,
    basePrice: 500,
    originalPrice: 40,
    colorTheme: "from-slate-500/10 to-gray-500/15 text-slate-400 border-slate-500/20",
    stripeColor: "#64748b",
    bannerColor: "bg-slate-600/10 border-slate-500/30 text-slate-400",
    imageSet: [
      "https://propcounterfeitnotes.com/public/upload/product/buy-eur5-euro-bills.232webp",
      "https://propcounterfeitnotes.com/public/upload/product/buy-eur5-euro-bills.232webp",
      "https://propcounterfeitnotes.com/public/upload/product/buy-eur5-euro-bills.232webp"
    ],
    description: "Accurate architectural details and tint matching the €5 Europa series.",
    longDescription: "Our stock is sourced to match the thickness and tactile feel of real currency. Does not contain magnetic ink.",
    coaText: "Motion picture prop collectible. Not legal tender.",
    variants: [
      { name: "Standard Stack (100 Bills - €500 Face Value)", price: 30, billCount: 100 },
      { name: "Director Pack (500 Bills - €2,500 Face Value)", price: 110, savingsLabel: "Save 26%", billCount: 500 }
    ],
    packageContents: [
      "100x high-fidelity replica €5 bills.",
      "Custom security paper band."
    ],
    storageInstructions: "Store horizontally.",
    supplyChain: "Distributed securely."
  }`;

const blogIndex = fileContent.indexOf('export const BLOG_POSTS');
const productsEndIndex = fileContent.lastIndexOf('];', blogIndex);

if (productsEndIndex !== -1) {
    const before = fileContent.slice(0, productsEndIndex);
    const after = fileContent.slice(productsEndIndex);
    
    // Check if we need comma
    let snippet = euroProducts + '\n';
    if (!before.trim().endsWith(',')) snippet = ',\n' + snippet;
    
    fileContent = before + snippet + after;
    fs.writeFileSync('lib/data.ts', fileContent);
    console.log('Fixed lib/data.ts!');
} else {
    console.log('Could not find products end index');
}
