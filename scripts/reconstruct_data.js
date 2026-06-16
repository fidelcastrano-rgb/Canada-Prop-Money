const fs = require('fs');

const createVariant = (denom, count, multiplier = 1, currency = '$') => [
  { name: `Starter Bundle (50 Notes - ${currency}${(50*denom).toLocaleString()} Face Value)`, price: 200, savingsLabel: "Save 33%", billCount: 50 },
  { name: `Compact Bundle (100 Notes - ${currency}${(100*denom).toLocaleString()} Face Value)`, price: 400, savingsLabel: "Save 31%", billCount: 100 },
  { name: `Premium Bundle (250 Notes - ${currency}${(250*denom).toLocaleString()} Face Value)`, price: 1000, savingsLabel: "Save 23%", billCount: 250 },
  { name: `Production Bundle (500 Notes - ${currency}${(500*denom).toLocaleString()} Face Value)`, price: 2000, savingsLabel: "Save 33%", billCount: 500 },
  { name: `Studio Vault Pack (1,000 Notes - ${currency}${(1000*denom).toLocaleString()} Face Value)`, price: 4000, savingsLabel: "Save 38%", billCount: 1000 },
  { name: `Director Platinum Pack (2,500 Notes - ${currency}${(2500*denom).toLocaleString()} Face Value)`, price: 10000, savingsLabel: "Save 47%", billCount: 2500 }
];

const colors = {
  100: { t: "from-amber-500/10 to-yellow-600/15 text-amber-400 border-amber-500/20", s: "#D4AF37", b: "bg-amber-600/10 border-amber-500/30 text-amber-400" },
  50: { t: "from-rose-500/10 to-red-600/15 text-rose-400 border-rose-500/20", s: "#C0397B", b: "bg-rose-600/10 border-rose-500/30 text-rose-400" },
  20: { t: "from-emerald-500/10 to-teal-500/15 text-emerald-400 border-emerald-500/20", s: "#6A8E4E", b: "bg-emerald-600/10 border-emerald-500/30 text-emerald-400" },
  10: { t: "from-violet-500/10 to-purple-500/15 text-purple-400 border-purple-500/20", s: "#8B5CF6", b: "bg-purple-600/10 border-purple-500/30 text-purple-400" },
  5: { t: "from-blue-500/10 to-indigo-600/15 text-blue-400 border-blue-500/20", s: "#2E5FA8", b: "bg-blue-600/10 border-blue-500/30 text-blue-400" },
};

const generateSet = (prefix, denoms, currencyName, symbol, imagesObj) => {
  return denoms.map(d => ({
    id: `${prefix}-${d}-stack`,
    slug: `${prefix}-${d}-stack`,
    name: `Buy Counterfeit ${symbol}${d} ${currencyName} Banknotes`,
    tagline: `Premium authentic ${symbol}${d} ${currencyName}. Engineered for extreme close-ups on production film grids under motion picture guidelines.`,
    category: currencyName,
    badge: d === 100 ? "New Production" : d === 20 ? "Best Seller" : undefined,
    rating: 4.8,
    reviewCount: 30 + Math.floor(Math.random() * 50),
    basePrice: 200,
    originalPrice: 300,
    colorTheme: colors[d]?.t || colors[20].t,
    stripeColor: colors[d]?.s || colors[20].s,
    bannerColor: colors[d]?.b || colors[20].b,
    imageSet: [
      imagesObj[d] || `https://picsum.photos/seed/prop${d}/600/400`,
      imagesObj[d] || `https://picsum.photos/seed/prop${d}/600/400`
    ],
    description: `${symbol}${d} ${currencyName} with exquisite anti-reflective matte coating, perfect for high-definition cinematic capture.`,
    longDescription: `Cinema-grade realistic currency reproduction certified for television and motion picture use.`,
    coaText: "Certified compliant with legal filming guidelines.",
    variants: createVariant(d, 0, 1, symbol),
    packageContents: [
      `100x high-fidelity replica bills matching regulatory dimensions.`,
      `Heavy-duty secure strap branded with production-grade style bands.`,
      `Laminated Certificate of Authenticity signed by visual compliance officers.`,
      `Anti-humidity film protector sleeve for secure storage.`
    ],
    storageInstructions: "Store horizontally inside secure lockers. Keep away from extreme heat. Do not use iron or heat devices directly.",
    supplyChain: "Reproduction plates prepared at local imaging workshops. Synthetic fibers sourced domestically."
  }));
};

const caImgs = {
  100: "https://propcounterfeitnotes.com/public/upload/product/buy-counterfeit-100-cad-banknotes.251webp",
  50: "https://propcounterfeitnotes.com/public/upload/product/buy-counterfeit-50-cad-banknotes.250webp",
  20: "https://propcounterfeitnotes.com/public/upload/product/buy-counterfeit-20-cad-banknotes.249webp",
  10: "https://propcounterfeitnotes.com/public/upload/product/buy-counterfeit-10-cad-banknotes.248webp",
  5: "https://propcounterfeitnotes.com/public/upload/product/buy-counterfeit-5-cad-banknotes.247webp"
};

const usImgs = {
  100: "https://propcounterfeitnotes.com/public/upload/product/buy-counterfeit-100-cad-banknotes.251webp",
  50: "https://propcounterfeitnotes.com/public/upload/product/buy-counterfeit-50-cad-banknotes.250webp"
};

const audImgs = {
  100: "https://propcounterfeitnotes.com/public/upload/product/buy-aud-100-dollars.219webp",
  50: "https://propcounterfeitnotes.com/public/upload/product/buy-counterfeit-aud-50-dollar-banknotes.252webp",
  20: "https://propcounterfeitnotes.com/public/upload/product/buy-aud-20-dollars.221webp",
  10: "https://propcounterfeitnotes.com/public/upload/product/buy-aud-10-dollar.222webp"
};

const euImgs = {
  500: "https://propcounterfeitnotes.com/public/upload/product/buy-500-euro-bills.226webp",
  200: "https://propcounterfeitnotes.com/public/upload/product/buy-eur200-euro-bills.227webp",
  100: "https://propcounterfeitnotes.com/public/upload/product/buy-eur100-euro-bills.228webp",
  50: "https://propcounterfeitnotes.com/public/upload/product/buy-eur50-euro-bills.229webp",
  20: "https://propcounterfeitnotes.com/public/upload/product/buy-eur20-euro-bills.230webp",
  10: "https://propcounterfeitnotes.com/public/upload/product/buy-eur10-euro-bills.231webp",
  5: "https://propcounterfeitnotes.com/public/upload/product/buy-eur5-euro-bills.232webp"
};

let allProds = [
  ...generateSet('ca', [100, 50, 20, 10, 5], 'Canadian Dollars', '$', caImgs),
  ...generateSet('us', [100, 50, 20, 10, 5], 'US Dollars', '$', usImgs),
  ...generateSet('au', [100, 50, 20, 10], 'Australian Dollars', '$', audImgs),
  ...generateSet('eu', [500, 200, 100, 50, 20, 10, 5], 'Euro', '€', euImgs)
];

// FILTER GENERIC PICSUM IMAGES
allProds = allProds.filter(p => !p.imageSet[0].includes('picsum.photos'));

let newProdsString = "export const PRODUCTS: Product[] = " + JSON.stringify(allProds, null, 2) + ";\n";

const libDataContent = `export interface ProductVariant {
  name: string;
  price: number;
  savingsLabel?: string;
  billCount: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  category: "Canadian Dollars" | "US Dollars" | "Australian Dollars" | "Euro";
  badge?: "Best Seller" | "Bundle Deal" | "New Production";
  rating: number;
  reviewCount: number;
  basePrice: number;
  originalPrice: number;
  colorTheme: string;
  stripeColor: string;
  bannerColor: string;
  imageSet: string[];
  description: string;
  longDescription: string;
  coaText: string;
  variants: ProductVariant[];
  packageContents: string[];
  storageInstructions: string;
  supplyChain: string;
}

export interface BlogPost {
  title: string;
  slug: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  disclaimer: string;
  heroImage: string;
  summary: string;
  contentMarkdown: string;
  relatedSlugs: string[];
  productSlugs: string[];
}

`;

const oldDataTs = fs.readFileSync('lib/data.ts', 'utf8');

// The old file currently ONLY contains the BLOG_POSTS and FAQ_CATEGORIES as we accidentally deleted the top
// Just concatenate them!
fs.writeFileSync('lib/data.ts', libDataContent + newProdsString + "\n" + oldDataTs);
console.log('Restored fully!');
