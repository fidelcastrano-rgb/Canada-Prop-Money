const fs = require('fs');

let fileContent = fs.readFileSync('lib/data.ts', 'utf-8');

const audProducts = `  {
    id: "au-100-stack",
    slug: "au-100-stack",
    name: "Buy Counterfeit AUD $100 Dollar Banknotes",
    tagline: "High-quality Australian Dollar prop stacks. Crisp polymer finish replica for cinematic scenes.",
    category: "Australian Dollars",
    rating: 4.8,
    reviewCount: 76,
    basePrice: 500,
    originalPrice: 85,
    colorTheme: "from-green-500/10 to-teal-600/15 text-green-400 border-green-500/20",
    stripeColor: "#22c55e",
    bannerColor: "bg-green-600/10 border-green-500/30 text-green-400",
    imageSet: [
      "https://propcounterfeitnotes.com/public/upload/product/buy-aud-100-dollars.219webp",
      "https://propcounterfeitnotes.com/public/upload/product/buy-aud-100-dollars.219webp",
      "https://propcounterfeitnotes.com/public/upload/product/buy-aud-100-dollars.219webp"
    ],
    description: "Looking for a trusted source to buy fake Australian dollar bills online? Prop Counterfeit Notes Inc offers premium counterfeit AUD banknotes.",
    longDescription: "Our counterfeit Australian dollar bills are produced using advanced printing technology and authentic materials. Each note features microprinting, holographic stripes, watermarks, and UV-reactive elements.",
    coaText: "Official COA Issued. Fully cleared for domestic filmmaking.",
    variants: [
      { name: "Standard Stack (100 Bills - $10,000 Face Value)", price: 65, billCount: 100 },
      { name: "Pro Director Pack (500 Bills - $50,000 Face Value)", price: 245, savingsLabel: "Save 25%", billCount: 500 },
      { name: "Studio Vault Pack (1000 Bills - $100,000 Face Value)", price: 420, savingsLabel: "Save 35%", billCount: 1000 }
    ],
    packageContents: [
      "100x high-fidelity replica AUD $100 bills.",
      "Custom security paper band.",
      "Individual serial registration card and COA leaflet."
    ],
    storageInstructions: "Store horizontally inside an airtight film vault.",
    supplyChain: "Distributed securely primarily from our secure lockers."
  },
  {
    id: "au-50-stack",
    slug: "au-50-stack",
    name: "Buy Counterfeit AUD $50 Dollar Banknotes",
    tagline: "Standard production banknote. Near-indistinguishable color and texture under camera lens.",
    category: "Australian Dollars",
    badge: "Best Seller",
    rating: 4.9,
    reviewCount: 104,
    basePrice: 500,
    originalPrice: 60,
    colorTheme: "from-yellow-500/10 to-orange-500/15 text-yellow-400 border-yellow-500/20",
    stripeColor: "#eab308",
    bannerColor: "bg-yellow-600/10 border-yellow-500/30 text-yellow-400",
    imageSet: [
      "https://propcounterfeitnotes.com/public/upload/product/buy-counterfeit-aud-50-dollar-banknotes.252webp",
      "https://propcounterfeitnotes.com/public/upload/product/buy-counterfeit-aud-50-dollar-banknotes.252webp",
      "https://propcounterfeitnotes.com/public/upload/product/buy-counterfeit-aud-50-dollar-banknotes.252webp"
    ],
    description: "Looking for a trusted source to buy fake Australian dollar bills online? Prop Counterfeit Notes Inc offers premium counterfeit AUD banknotes.",
    longDescription: "Our counterfeit Australian dollar bills are produced using advanced printing technology and authentic materials. Each note features microprinting, holographic stripes, watermarks, and UV-reactive elements.",
    coaText: "Cleared for film and production sets nationwide.",
    variants: [
      { name: "Standard Stack (100 Bills - $5,000 Face Value)", price: 55, billCount: 100 },
      { name: "Pro Director Pack (500 Bills - $25,000 Face Value)", price: 195, savingsLabel: "Save 29%", billCount: 500 },
      { name: "Studio Vault Pack (1000 Bills - $50,000 Face Value)", price: 340, savingsLabel: "Save 38%", billCount: 1000 }
    ],
    packageContents: [
      "100x high-fidelity replica AUD $50 bills.",
      "Heavy-duty security strap.",
      "Laminated Certificate of Authenticity."
    ],
    storageInstructions: "Store cool, dry, and flat.",
    supplyChain: "Shipped in impact-proof packaging with full tracking."
  },
  {
    id: "au-20-stack",
    slug: "au-20-stack",
    name: "Buy Counterfeit AUD $20 Dollar Banknotes",
    tagline: "Vibrant and detailed. Exceptional contrast for fast-action transactions.",
    category: "Australian Dollars",
    rating: 4.7,
    reviewCount: 38,
    basePrice: 500,
    originalPrice: 45,
    colorTheme: "from-red-500/10 to-rose-600/15 text-red-400 border-red-500/20",
    stripeColor: "#ef4444",
    bannerColor: "bg-red-600/10 border-red-500/30 text-red-400",
    imageSet: [
      "https://propcounterfeitnotes.com/public/upload/product/buy-aud-20-dollars.221webp",
      "https://propcounterfeitnotes.com/public/upload/product/buy-aud-20-dollars.221webp",
      "https://propcounterfeitnotes.com/public/upload/product/buy-aud-20-dollars.221webp"
    ],
    description: "Looking for a trusted source to buy fake Australian dollar bills online? Prop Counterfeit Notes Inc offers premium counterfeit AUD banknotes.",
    longDescription: "Our counterfeit Australian dollar bills are produced using advanced printing technology and authentic materials. Each note features microprinting, holographic stripes, watermarks, and UV-reactive elements.",
    coaText: "Official COA Issued. Fully cleared for domestic filmmaking.",
    variants: [
      { name: "Standard Stack (100 Bills - $2,000 Face Value)", price: 45, billCount: 100 },
      { name: "Pro Director Pack (500 Bills - $10,000 Face Value)", price: 165, savingsLabel: "Save 27%", billCount: 500 },
      { name: "Studio Vault Pack (1000 Bills - $20,000 Face Value)", price: 290, savingsLabel: "Save 35%", billCount: 1000 }
    ],
    packageContents: [
      "100x high-fidelity replica AUD $20 bills.",
      "Heavy-duty security strap."
    ],
    storageInstructions: "Store horizontally inside an airtight film vault.",
    supplyChain: "Distributed securely primarily from our secure lockers."
  },
  {
    id: "au-10-stack",
    slug: "au-10-stack",
    name: "Buy Counterfeit AUD $10 Dollar Banknotes",
    tagline: "Elegant notes, detailed for modern aesthetics.",
    category: "Australian Dollars",
    rating: 4.6,
    reviewCount: 22,
    basePrice: 500,
    originalPrice: 35,
    colorTheme: "from-blue-500/10 to-indigo-500/15 text-blue-400 border-blue-500/20",
    stripeColor: "#3b82f6",
    bannerColor: "bg-blue-600/10 border-blue-500/30 text-blue-400",
    imageSet: [
      "https://propcounterfeitnotes.com/public/upload/product/buy-aud-10-dollar.222webp",
      "https://propcounterfeitnotes.com/public/upload/product/buy-aud-10-dollar.222webp",
      "https://propcounterfeitnotes.com/public/upload/product/buy-aud-10-dollar.222webp"
    ],
    description: "Looking for a trusted source to buy fake Australian dollar bills online? Prop Counterfeit Notes Inc offers premium counterfeit AUD banknotes.",
    longDescription: "Our counterfeit Australian dollar bills are produced using advanced printing technology and authentic materials. Each note features microprinting, holographic stripes, watermarks, and UV-reactive elements.",
    coaText: "Certified compliant with legal filming guidelines.",
    variants: [
      { name: "Standard Stack (100 Bills - $1,000 Face Value)", price: 40, billCount: 100 },
      { name: "Pro Director Pack (500 Bills - $5,000 Face Value)", price: 150, savingsLabel: "Save 25%", billCount: 500 },
      { name: "Studio Vault Pack (1000 Bills - $10,000 Face Value)", price: 260, savingsLabel: "Save 35%", billCount: 1000 }
    ],
    packageContents: [
      "100x replica AUD $10 bills.",
      "Custom paper band strap."
    ],
    storageInstructions: "Store flat when possible.",
    supplyChain: "Shipped securely."
  }`;

const blogIndex = fileContent.indexOf('export const BLOG_POSTS');
const productsEndIndex = fileContent.lastIndexOf('];', blogIndex);

if (productsEndIndex !== -1) {
    const before = fileContent.slice(0, productsEndIndex);
    const after = fileContent.slice(productsEndIndex);
    
    // Check if we need comma
    let snippet = audProducts + '\n';
    if (!before.trim().endsWith(',')) snippet = ',\n' + snippet;
    
    fileContent = before + snippet + after;
    fs.writeFileSync('lib/data.ts', fileContent);
    console.log('Fixed lib/data.ts!');
} else {
    console.log('Could not find products end index');
}
