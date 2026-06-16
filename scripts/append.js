const fs = require('fs');

let fileContent = fs.readFileSync('lib/data.ts', 'utf-8');

const usProducts = `
  {
    id: "us-100-stack",
    slug: "us-100-stack",
    name: "Buy Counterfeit $100 USD Banknotes",
    tagline: "The high-roller gold standard. Features reflective safe foil micro-stripes for absolute high-end aesthetic appeal.",
    category: "US Dollars",
    badge: "New Production",
    rating: 5.0,
    reviewCount: 88,
    basePrice: 500,
    originalPrice: 85,
    colorTheme: "from-amber-500/10 to-yellow-600/15 text-amber-400 border-amber-500/20",
    stripeColor: "#D4AF37",
    bannerColor: "bg-amber-600/10 border-amber-500/30 text-amber-400",
    imageSet: [
      "https://propcounterfeitnotes.com/public/upload/product/buy-counterfeit-100-cad-banknotes.251webp",
      "https://propcounterfeitnotes.com/public/upload/product/buy-counterfeit-100-cad-banknotes.251webp",
      "https://propcounterfeitnotes.com/public/upload/product/buy-counterfeit-100-cad-banknotes.251webp"
    ],
    description: "Looking for a trusted source to buy fake US dollar bills online? Prop Counterfeit Notes Inc offers premium counterfeit USD banknotes that are expertly crafted to replicate the look, feel, and security features of genuine currency.",
    longDescription: "Our counterfeit US dollar bills are produced using advanced printing technology and authentic materials. Each note features microprinting, holographic stripes, watermarks, and UV-reactive elements—making them virtually indistinguishable from real notes.",
    coaText: "Commercial clearance certified. Compliant with international currency prop laws.",
    variants: [
      { name: "Standard Stack (100 Bills - $10,000 Face Value)", price: 65, billCount: 100 },
      { name: "Pro Director Pack (500 Bills - $50,000 Face Value)", price: 245, savingsLabel: "Save 25%", billCount: 500 },
      { name: "Studio Vault Pack (1000 Bills - $100,000 Face Value)", price: 420, savingsLabel: "Save 35%", billCount: 1000 }
    ],
    packageContents: [
      "100x high-fidelity replica gold-ochre $100 bills.",
      "Custom gold-foil embossed security paper band.",
      "Individual serial registration card and COA leaflet.",
      "Matte display sleeve."
    ],
    storageInstructions: "Store inside dry vault drawer.",
    supplyChain: "Assembled and chemically micro-bound. Shipped via security-sealed parcel express."
  },
  {
    id: "us-50-stack",
    slug: "us-50-stack",
    name: "Buy Counterfeit $50 USD Banknotes",
    tagline: "The rich, commanding stack. Stunning contrast in suitcases, cash bags, and rapid count scenes.",
    category: "US Dollars",
    rating: 4.8,
    reviewCount: 65,
    basePrice: 5000,
    originalPrice: 70,
    colorTheme: "from-rose-500/10 to-red-600/15 text-rose-400 border-rose-500/20",
    stripeColor: "#C0397B",
    bannerColor: "bg-rose-600/10 border-rose-500/30 text-rose-400",
    imageSet: [
      "https://propcounterfeitnotes.com/public/upload/product/buy-counterfeit-50-cad-banknotes.250webp",
      "https://propcounterfeitnotes.com/public/upload/product/buy-counterfeit-50-cad-banknotes.250webp",
      "https://propcounterfeitnotes.com/public/upload/product/buy-counterfeit-50-cad-banknotes.250webp"
    ],
    description: "Looking for a trusted source to buy fake US dollar bills online? Prop Counterfeit Notes Inc offers premium counterfeit USD banknotes.",
    longDescription: "Our counterfeit US dollar bills are produced using advanced printing technology and authentic materials. Each note features microprinting, holographic stripes, watermarks, and UV-reactive elements.",
    coaText: "Legally compliant. Film-studio cleared.",
    variants: [
      { name: "Standard Stack (100 Bills - $5,000 Face Value)", price: 55, billCount: 100 },
      { name: "Pro Director Pack (500 Bills - $25,000 Face Value)", price: 195, savingsLabel: "Save 29%", billCount: 500 },
      { name: "Studio Vault Pack (1000 Bills - $50,000 Face Value)", price: 340, savingsLabel: "Save 38%", billCount: 1000 }
    ],
    packageContents: [
      "100x high-fidelity replica $50 bills.",
      "Style banding.",
      "COA verification document and license sleeve.",
      "Protective heavy-gauge shipping tube."
    ],
    storageInstructions: "Store cool and dry.",
    supplyChain: "Shipped in impact-proof packaging with full tracking."
  },
  {
    id: "us-20-stack",
    slug: "us-20-stack",
    name: "Buy Counterfeit $20 USD Banknotes",
    tagline: "Primary production banknote. Near-indistinguishable color and texture under camera lens.",
    category: "US Dollars",
    badge: "Best Seller",
    rating: 4.9,
    reviewCount: 142,
    basePrice: 500,
    originalPrice: 60,
    colorTheme: "from-emerald-500/10 to-teal-500/15 text-emerald-400 border-emerald-500/20",
    stripeColor: "#6A8E4E",
    bannerColor: "bg-emerald-600/10 border-emerald-500/30 text-emerald-400",
    imageSet: [
      "https://propcounterfeitnotes.com/public/upload/product/buy-counterfeit-20-cad-banknotes.249webp",
      "https://propcounterfeitnotes.com/public/upload/product/buy-counterfeit-20-cad-banknotes.249webp",
      "https://propcounterfeitnotes.com/public/upload/product/buy-counterfeit-20-cad-banknotes.249webp"
    ],
    description: "Looking for a trusted source to buy fake US dollar bills online? Prop Counterfeit Notes Inc offers premium counterfeit USD banknotes.",
    longDescription: "Our counterfeit US dollar bills are produced using advanced printing technology and authentic materials. Each note features microprinting, holographic stripes, watermarks, and UV-reactive elements.",
    coaText: "Official COA Issued. Fully cleared for domestic filmmaking.",
    variants: [
      { name: "Standard Stack (100 Bills - $2,000 Face Value)", price: 45, billCount: 100 },
      { name: "Pro Director Pack (500 Bills - $10,000 Face Value)", price: 165, savingsLabel: "Save 27%", billCount: 500 },
      { name: "Studio Vault Pack (1000 Bills - $20,000 Face Value)", price: 290, savingsLabel: "Save 35%", billCount: 1000 }
    ],
    packageContents: [
      "100x high-fidelity replica $20 bills.",
      "Heavy-duty security strap.",
      "Laminated Certificate of Authenticity.",
      "Anti-humidity film protector sleeve."
    ],
    storageInstructions: "Store horizontally inside an airtight film vault.",
    supplyChain: "Distributed securely primarily from our secure lockers."
  },
  {
    id: "us-10-stack",
    slug: "us-10-stack",
    name: "Buy Counterfeit $10 USD Banknotes",
    tagline: "Elegant notes, fully detailed vertical-styled for modern street culture aesthetics.",
    category: "US Dollars",
    rating: 4.7,
    reviewCount: 42,
    basePrice: 500,
    originalPrice: 50,
    colorTheme: "from-violet-500/10 to-purple-500/15 text-purple-400 border-purple-500/20",
    stripeColor: "#8B5CF6",
    bannerColor: "bg-purple-600/10 border-purple-500/30 text-purple-400",
    imageSet: [
      "https://propcounterfeitnotes.com/public/upload/product/buy-counterfeit-10-cad-banknotes.248webp",
      "https://propcounterfeitnotes.com/public/upload/product/buy-counterfeit-10-cad-banknotes.248webp",
      "https://propcounterfeitnotes.com/public/upload/product/buy-counterfeit-10-cad-banknotes.248webp"
    ],
    description: "Prop Counterfeit Notes Inc offers premium counterfeit USD banknotes.",
    longDescription: "Our counterfeit US dollar bills are produced using advanced printing technology.",
    coaText: "Certified compliant with legal filming guidelines.",
    variants: [
      { name: "Standard Stack (100 Bills - $1,000 Face Value)", price: 40, billCount: 100 },
      { name: "Pro Director Pack (500 Bills - $5,000 Face Value)", price: 150, savingsLabel: "Save 25%", billCount: 500 },
      { name: "Studio Vault Pack (1000 Bills - $10,000 Face Value)", price: 260, savingsLabel: "Save 35%", billCount: 1000 }
    ],
    packageContents: [
      "100x replica $10 bills.",
      "Custom paper band strap.",
      "Signed COA and safety manual."
    ],
    storageInstructions: "Store flat when possible.",
    supplyChain: "Shipped securely."
  },
  {
    id: "us-5-stack",
    slug: "us-5-stack",
    name: "Buy Counterfeit $5 USD Banknotes",
    tagline: "Deep detailed stacks. Ideal for general retail till sets.",
    category: "US Dollars",
    rating: 4.6,
    reviewCount: 31,
    basePrice: 500,
    originalPrice: 45,
    colorTheme: "from-blue-500/10 to-indigo-600/15 text-blue-400 border-blue-500/20",
    stripeColor: "#2E5FA8",
    bannerColor: "bg-blue-600/10 border-blue-500/30 text-blue-400",
    imageSet: [
      "https://propcounterfeitnotes.com/public/upload/product/buy-counterfeit-5-cad-banknotes.247webp",
      "https://propcounterfeitnotes.com/public/upload/product/buy-counterfeit-5-cad-banknotes.247webp",
      "https://propcounterfeitnotes.com/public/upload/product/buy-counterfeit-5-cad-banknotes.247webp"
    ],
    description: "Prop Counterfeit Notes Inc offers premium counterfeit USD banknotes.",
    longDescription: "Our counterfeit US dollar bills are produced using advanced printing.",
    coaText: "Cleared for film and production sets nationwide.",
    variants: [
      { name: "Standard Stack (100 Bills - $500 Face Value)", price: 35, billCount: 100 },
      { name: "Pro Director Pack (500 Bills - $2,500 Face Value)", price: 130, savingsLabel: "Save 26%", billCount: 500 },
      { name: "Studio Vault Pack (1000 Bills - $5,000 Face Value)", price: 220, savingsLabel: "Save 37%", billCount: 1000 }
    ],
    packageContents: [
      "100x replica $5 bills.",
      "Paper strap binder.",
      "Standard COA checklist leaflet."
    ],
    storageInstructions: "Store cool, dry, and flat.",
    supplyChain: "Secure domestic parcel dispatch."
  }
`;

const arrIndex = fileContent.lastIndexOf('];');
if (arrIndex !== -1) {
    const before = fileContent.substring(0, arrIndex);
    const after = fileContent.substring(arrIndex);
    let modified = before;
    if (before.trim().endsWith(',')) {
        modified += usProducts;
    } else {
        modified += ',' + usProducts;
    }
    modified += after;
    fs.writeFileSync('lib/data.ts', modified);
    console.log('Successfully appended US Dollar products!');
} else {
    console.log('Could not find end of products array');
}
