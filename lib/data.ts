export interface ProductVariant {
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

export const PRODUCTS: Product[] = [
  {
    "id": "ca-100-stack",
    "slug": "ca-100-stack",
    "name": "Buy Counterfeit $100 Canadian Dollars Banknotes",
    "tagline": "Premium authentic $100 Canadian Dollars. Engineered for extreme close-ups on production film grids under motion picture guidelines.",
    "category": "Canadian Dollars",
    "badge": "New Production",
    "rating": 4.8,
    "reviewCount": 56,
    "basePrice": 200,
    "originalPrice": 300,
    "colorTheme": "from-amber-500/10 to-yellow-600/15 text-amber-400 border-amber-500/20",
    "stripeColor": "#D4AF37",
    "bannerColor": "bg-amber-600/10 border-amber-500/30 text-amber-400",
    "imageSet": [
      "https://propcounterfeitnotes.com/public/upload/product/buy-counterfeit-100-cad-banknotes.251webp",
      "https://propcounterfeitnotes.com/public/upload/product/buy-counterfeit-100-cad-banknotes.251webp"
    ],
    "description": "$100 Canadian Dollars with exquisite anti-reflective matte coating, perfect for high-definition cinematic capture.",
    "longDescription": "Cinema-grade realistic currency reproduction certified for television and motion picture use.",
    "coaText": "Certified compliant with legal filming guidelines.",
    "variants": [
      {
        "name": "Starter Bundle (50 Notes - $5,000 Face Value)",
        "price": 200,
        "savingsLabel": "Save 33%",
        "billCount": 50
      },
      {
        "name": "Compact Bundle (100 Notes - $10,000 Face Value)",
        "price": 400,
        "savingsLabel": "Save 31%",
        "billCount": 100
      },
      {
        "name": "Premium Bundle (250 Notes - $25,000 Face Value)",
        "price": 1000,
        "savingsLabel": "Save 23%",
        "billCount": 250
      },
      {
        "name": "Production Bundle (500 Notes - $50,000 Face Value)",
        "price": 2000,
        "savingsLabel": "Save 33%",
        "billCount": 500
      },
      {
        "name": "Studio Vault Pack (1,000 Notes - $100,000 Face Value)",
        "price": 4000,
        "savingsLabel": "Save 38%",
        "billCount": 1000
      },
      {
        "name": "Director Platinum Pack (2,500 Notes - $250,000 Face Value)",
        "price": 10000,
        "savingsLabel": "Save 47%",
        "billCount": 2500
      }
    ],
    "packageContents": [
      "100x high-fidelity replica bills matching regulatory dimensions.",
      "Heavy-duty secure strap branded with production-grade style bands.",
      "Laminated Certificate of Authenticity signed by visual compliance officers.",
      "Anti-humidity film protector sleeve for secure storage."
    ],
    "storageInstructions": "Store horizontally inside secure lockers. Keep away from extreme heat. Do not use iron or heat devices directly.",
    "supplyChain": "Reproduction plates prepared at local imaging workshops. Synthetic fibers sourced domestically."
  },
  {
    "id": "ca-50-stack",
    "slug": "ca-50-stack",
    "name": "Buy Counterfeit $50 Canadian Dollars Banknotes",
    "tagline": "Premium authentic $50 Canadian Dollars. Engineered for extreme close-ups on production film grids under motion picture guidelines.",
    "category": "Canadian Dollars",
    "rating": 4.8,
    "reviewCount": 42,
    "basePrice": 200,
    "originalPrice": 300,
    "colorTheme": "from-rose-500/10 to-red-600/15 text-rose-400 border-rose-500/20",
    "stripeColor": "#C0397B",
    "bannerColor": "bg-rose-600/10 border-rose-500/30 text-rose-400",
    "imageSet": [
      "https://propcounterfeitnotes.com/public/upload/product/buy-counterfeit-50-cad-banknotes.250webp",
      "https://propcounterfeitnotes.com/public/upload/product/buy-counterfeit-50-cad-banknotes.250webp"
    ],
    "description": "$50 Canadian Dollars with exquisite anti-reflective matte coating, perfect for high-definition cinematic capture.",
    "longDescription": "Cinema-grade realistic currency reproduction certified for television and motion picture use.",
    "coaText": "Certified compliant with legal filming guidelines.",
    "variants": [
      {
        "name": "Starter Bundle (50 Notes - $2,500 Face Value)",
        "price": 200,
        "savingsLabel": "Save 33%",
        "billCount": 50
      },
      {
        "name": "Compact Bundle (100 Notes - $5,000 Face Value)",
        "price": 400,
        "savingsLabel": "Save 31%",
        "billCount": 100
      },
      {
        "name": "Premium Bundle (250 Notes - $12,500 Face Value)",
        "price": 1000,
        "savingsLabel": "Save 23%",
        "billCount": 250
      },
      {
        "name": "Production Bundle (500 Notes - $25,000 Face Value)",
        "price": 2000,
        "savingsLabel": "Save 33%",
        "billCount": 500
      },
      {
        "name": "Studio Vault Pack (1,000 Notes - $50,000 Face Value)",
        "price": 4000,
        "savingsLabel": "Save 38%",
        "billCount": 1000
      },
      {
        "name": "Director Platinum Pack (2,500 Notes - $125,000 Face Value)",
        "price": 10000,
        "savingsLabel": "Save 47%",
        "billCount": 2500
      }
    ],
    "packageContents": [
      "100x high-fidelity replica bills matching regulatory dimensions.",
      "Heavy-duty secure strap branded with production-grade style bands.",
      "Laminated Certificate of Authenticity signed by visual compliance officers.",
      "Anti-humidity film protector sleeve for secure storage."
    ],
    "storageInstructions": "Store horizontally inside secure lockers. Keep away from extreme heat. Do not use iron or heat devices directly.",
    "supplyChain": "Reproduction plates prepared at local imaging workshops. Synthetic fibers sourced domestically."
  },
  {
    "id": "ca-20-stack",
    "slug": "ca-20-stack",
    "name": "Buy Counterfeit $20 Canadian Dollars Banknotes",
    "tagline": "Premium authentic $20 Canadian Dollars. Engineered for extreme close-ups on production film grids under motion picture guidelines.",
    "category": "Canadian Dollars",
    "badge": "Best Seller",
    "rating": 4.8,
    "reviewCount": 69,
    "basePrice": 200,
    "originalPrice": 300,
    "colorTheme": "from-emerald-500/10 to-teal-500/15 text-emerald-400 border-emerald-500/20",
    "stripeColor": "#6A8E4E",
    "bannerColor": "bg-emerald-600/10 border-emerald-500/30 text-emerald-400",
    "imageSet": [
      "https://propcounterfeitnotes.com/public/upload/product/buy-counterfeit-20-cad-banknotes.249webp",
      "https://propcounterfeitnotes.com/public/upload/product/buy-counterfeit-20-cad-banknotes.249webp"
    ],
    "description": "$20 Canadian Dollars with exquisite anti-reflective matte coating, perfect for high-definition cinematic capture.",
    "longDescription": "Cinema-grade realistic currency reproduction certified for television and motion picture use.",
    "coaText": "Certified compliant with legal filming guidelines.",
    "variants": [
      {
        "name": "Starter Bundle (50 Notes - $1,000 Face Value)",
        "price": 200,
        "savingsLabel": "Save 33%",
        "billCount": 50
      },
      {
        "name": "Compact Bundle (100 Notes - $2,000 Face Value)",
        "price": 400,
        "savingsLabel": "Save 31%",
        "billCount": 100
      },
      {
        "name": "Premium Bundle (250 Notes - $5,000 Face Value)",
        "price": 1000,
        "savingsLabel": "Save 23%",
        "billCount": 250
      },
      {
        "name": "Production Bundle (500 Notes - $10,000 Face Value)",
        "price": 2000,
        "savingsLabel": "Save 33%",
        "billCount": 500
      },
      {
        "name": "Studio Vault Pack (1,000 Notes - $20,000 Face Value)",
        "price": 4000,
        "savingsLabel": "Save 38%",
        "billCount": 1000
      },
      {
        "name": "Director Platinum Pack (2,500 Notes - $50,000 Face Value)",
        "price": 10000,
        "savingsLabel": "Save 47%",
        "billCount": 2500
      }
    ],
    "packageContents": [
      "100x high-fidelity replica bills matching regulatory dimensions.",
      "Heavy-duty secure strap branded with production-grade style bands.",
      "Laminated Certificate of Authenticity signed by visual compliance officers.",
      "Anti-humidity film protector sleeve for secure storage."
    ],
    "storageInstructions": "Store horizontally inside secure lockers. Keep away from extreme heat. Do not use iron or heat devices directly.",
    "supplyChain": "Reproduction plates prepared at local imaging workshops. Synthetic fibers sourced domestically."
  },
  {
    "id": "ca-10-stack",
    "slug": "ca-10-stack",
    "name": "Buy Counterfeit $10 Canadian Dollars Banknotes",
    "tagline": "Premium authentic $10 Canadian Dollars. Engineered for extreme close-ups on production film grids under motion picture guidelines.",
    "category": "Canadian Dollars",
    "rating": 4.8,
    "reviewCount": 47,
    "basePrice": 200,
    "originalPrice": 300,
    "colorTheme": "from-violet-500/10 to-purple-500/15 text-purple-400 border-purple-500/20",
    "stripeColor": "#8B5CF6",
    "bannerColor": "bg-purple-600/10 border-purple-500/30 text-purple-400",
    "imageSet": [
      "https://propcounterfeitnotes.com/public/upload/product/buy-counterfeit-10-cad-banknotes.248webp",
      "https://propcounterfeitnotes.com/public/upload/product/buy-counterfeit-10-cad-banknotes.248webp"
    ],
    "description": "$10 Canadian Dollars with exquisite anti-reflective matte coating, perfect for high-definition cinematic capture.",
    "longDescription": "Cinema-grade realistic currency reproduction certified for television and motion picture use.",
    "coaText": "Certified compliant with legal filming guidelines.",
    "variants": [
      {
        "name": "Starter Bundle (50 Notes - $500 Face Value)",
        "price": 200,
        "savingsLabel": "Save 33%",
        "billCount": 50
      },
      {
        "name": "Compact Bundle (100 Notes - $1,000 Face Value)",
        "price": 400,
        "savingsLabel": "Save 31%",
        "billCount": 100
      },
      {
        "name": "Premium Bundle (250 Notes - $2,500 Face Value)",
        "price": 1000,
        "savingsLabel": "Save 23%",
        "billCount": 250
      },
      {
        "name": "Production Bundle (500 Notes - $5,000 Face Value)",
        "price": 2000,
        "savingsLabel": "Save 33%",
        "billCount": 500
      },
      {
        "name": "Studio Vault Pack (1,000 Notes - $10,000 Face Value)",
        "price": 4000,
        "savingsLabel": "Save 38%",
        "billCount": 1000
      },
      {
        "name": "Director Platinum Pack (2,500 Notes - $25,000 Face Value)",
        "price": 10000,
        "savingsLabel": "Save 47%",
        "billCount": 2500
      }
    ],
    "packageContents": [
      "100x high-fidelity replica bills matching regulatory dimensions.",
      "Heavy-duty secure strap branded with production-grade style bands.",
      "Laminated Certificate of Authenticity signed by visual compliance officers.",
      "Anti-humidity film protector sleeve for secure storage."
    ],
    "storageInstructions": "Store horizontally inside secure lockers. Keep away from extreme heat. Do not use iron or heat devices directly.",
    "supplyChain": "Reproduction plates prepared at local imaging workshops. Synthetic fibers sourced domestically."
  },
  {
    "id": "ca-5-stack",
    "slug": "ca-5-stack",
    "name": "Buy Counterfeit $5 Canadian Dollars Banknotes",
    "tagline": "Premium authentic $5 Canadian Dollars. Engineered for extreme close-ups on production film grids under motion picture guidelines.",
    "category": "Canadian Dollars",
    "rating": 4.8,
    "reviewCount": 63,
    "basePrice": 200,
    "originalPrice": 300,
    "colorTheme": "from-blue-500/10 to-indigo-600/15 text-blue-400 border-blue-500/20",
    "stripeColor": "#2E5FA8",
    "bannerColor": "bg-blue-600/10 border-blue-500/30 text-blue-400",
    "imageSet": [
      "https://propcounterfeitnotes.com/public/upload/product/buy-counterfeit-5-cad-banknotes.247webp",
      "https://propcounterfeitnotes.com/public/upload/product/buy-counterfeit-5-cad-banknotes.247webp"
    ],
    "description": "$5 Canadian Dollars with exquisite anti-reflective matte coating, perfect for high-definition cinematic capture.",
    "longDescription": "Cinema-grade realistic currency reproduction certified for television and motion picture use.",
    "coaText": "Certified compliant with legal filming guidelines.",
    "variants": [
      {
        "name": "Starter Bundle (50 Notes - $250 Face Value)",
        "price": 200,
        "savingsLabel": "Save 33%",
        "billCount": 50
      },
      {
        "name": "Compact Bundle (100 Notes - $500 Face Value)",
        "price": 400,
        "savingsLabel": "Save 31%",
        "billCount": 100
      },
      {
        "name": "Premium Bundle (250 Notes - $1,250 Face Value)",
        "price": 1000,
        "savingsLabel": "Save 23%",
        "billCount": 250
      },
      {
        "name": "Production Bundle (500 Notes - $2,500 Face Value)",
        "price": 2000,
        "savingsLabel": "Save 33%",
        "billCount": 500
      },
      {
        "name": "Studio Vault Pack (1,000 Notes - $5,000 Face Value)",
        "price": 4000,
        "savingsLabel": "Save 38%",
        "billCount": 1000
      },
      {
        "name": "Director Platinum Pack (2,500 Notes - $12,500 Face Value)",
        "price": 10000,
        "savingsLabel": "Save 47%",
        "billCount": 2500
      }
    ],
    "packageContents": [
      "100x high-fidelity replica bills matching regulatory dimensions.",
      "Heavy-duty secure strap branded with production-grade style bands.",
      "Laminated Certificate of Authenticity signed by visual compliance officers.",
      "Anti-humidity film protector sleeve for secure storage."
    ],
    "storageInstructions": "Store horizontally inside secure lockers. Keep away from extreme heat. Do not use iron or heat devices directly.",
    "supplyChain": "Reproduction plates prepared at local imaging workshops. Synthetic fibers sourced domestically."
  },
  {
    "id": "us-100-stack",
    "slug": "us-100-stack",
    "name": "Buy Counterfeit $100 US Dollars Banknotes",
    "tagline": "Premium authentic $100 US Dollars. Engineered for extreme close-ups on production film grids under motion picture guidelines.",
    "category": "US Dollars",
    "badge": "New Production",
    "rating": 4.8,
    "reviewCount": 41,
    "basePrice": 200,
    "originalPrice": 300,
    "colorTheme": "from-amber-500/10 to-yellow-600/15 text-amber-400 border-amber-500/20",
    "stripeColor": "#D4AF37",
    "bannerColor": "bg-amber-600/10 border-amber-500/30 text-amber-400",
    "imageSet": [
      "https://propcounterfeitnotes.com/public/upload/product/buy-counterfeit-100-cad-banknotes.251webp",
      "https://propcounterfeitnotes.com/public/upload/product/buy-counterfeit-100-cad-banknotes.251webp"
    ],
    "description": "$100 US Dollars with exquisite anti-reflective matte coating, perfect for high-definition cinematic capture.",
    "longDescription": "Cinema-grade realistic currency reproduction certified for television and motion picture use.",
    "coaText": "Certified compliant with legal filming guidelines.",
    "variants": [
      {
        "name": "Starter Bundle (50 Notes - $5,000 Face Value)",
        "price": 200,
        "savingsLabel": "Save 33%",
        "billCount": 50
      },
      {
        "name": "Compact Bundle (100 Notes - $10,000 Face Value)",
        "price": 400,
        "savingsLabel": "Save 31%",
        "billCount": 100
      },
      {
        "name": "Premium Bundle (250 Notes - $25,000 Face Value)",
        "price": 1000,
        "savingsLabel": "Save 23%",
        "billCount": 250
      },
      {
        "name": "Production Bundle (500 Notes - $50,000 Face Value)",
        "price": 2000,
        "savingsLabel": "Save 33%",
        "billCount": 500
      },
      {
        "name": "Studio Vault Pack (1,000 Notes - $100,000 Face Value)",
        "price": 4000,
        "savingsLabel": "Save 38%",
        "billCount": 1000
      },
      {
        "name": "Director Platinum Pack (2,500 Notes - $250,000 Face Value)",
        "price": 10000,
        "savingsLabel": "Save 47%",
        "billCount": 2500
      }
    ],
    "packageContents": [
      "100x high-fidelity replica bills matching regulatory dimensions.",
      "Heavy-duty secure strap branded with production-grade style bands.",
      "Laminated Certificate of Authenticity signed by visual compliance officers.",
      "Anti-humidity film protector sleeve for secure storage."
    ],
    "storageInstructions": "Store horizontally inside secure lockers. Keep away from extreme heat. Do not use iron or heat devices directly.",
    "supplyChain": "Reproduction plates prepared at local imaging workshops. Synthetic fibers sourced domestically."
  },
  {
    "id": "us-50-stack",
    "slug": "us-50-stack",
    "name": "Buy Counterfeit $50 US Dollars Banknotes",
    "tagline": "Premium authentic $50 US Dollars. Engineered for extreme close-ups on production film grids under motion picture guidelines.",
    "category": "US Dollars",
    "rating": 4.8,
    "reviewCount": 71,
    "basePrice": 200,
    "originalPrice": 300,
    "colorTheme": "from-rose-500/10 to-red-600/15 text-rose-400 border-rose-500/20",
    "stripeColor": "#C0397B",
    "bannerColor": "bg-rose-600/10 border-rose-500/30 text-rose-400",
    "imageSet": [
      "https://propcounterfeitnotes.com/public/upload/product/buy-counterfeit-50-cad-banknotes.250webp",
      "https://propcounterfeitnotes.com/public/upload/product/buy-counterfeit-50-cad-banknotes.250webp"
    ],
    "description": "$50 US Dollars with exquisite anti-reflective matte coating, perfect for high-definition cinematic capture.",
    "longDescription": "Cinema-grade realistic currency reproduction certified for television and motion picture use.",
    "coaText": "Certified compliant with legal filming guidelines.",
    "variants": [
      {
        "name": "Starter Bundle (50 Notes - $2,500 Face Value)",
        "price": 200,
        "savingsLabel": "Save 33%",
        "billCount": 50
      },
      {
        "name": "Compact Bundle (100 Notes - $5,000 Face Value)",
        "price": 400,
        "savingsLabel": "Save 31%",
        "billCount": 100
      },
      {
        "name": "Premium Bundle (250 Notes - $12,500 Face Value)",
        "price": 1000,
        "savingsLabel": "Save 23%",
        "billCount": 250
      },
      {
        "name": "Production Bundle (500 Notes - $25,000 Face Value)",
        "price": 2000,
        "savingsLabel": "Save 33%",
        "billCount": 500
      },
      {
        "name": "Studio Vault Pack (1,000 Notes - $50,000 Face Value)",
        "price": 4000,
        "savingsLabel": "Save 38%",
        "billCount": 1000
      },
      {
        "name": "Director Platinum Pack (2,500 Notes - $125,000 Face Value)",
        "price": 10000,
        "savingsLabel": "Save 47%",
        "billCount": 2500
      }
    ],
    "packageContents": [
      "100x high-fidelity replica bills matching regulatory dimensions.",
      "Heavy-duty secure strap branded with production-grade style bands.",
      "Laminated Certificate of Authenticity signed by visual compliance officers.",
      "Anti-humidity film protector sleeve for secure storage."
    ],
    "storageInstructions": "Store horizontally inside secure lockers. Keep away from extreme heat. Do not use iron or heat devices directly.",
    "supplyChain": "Reproduction plates prepared at local imaging workshops. Synthetic fibers sourced domestically."
  },
  {
    "id": "au-100-stack",
    "slug": "au-100-stack",
    "name": "Buy Counterfeit $100 Australian Dollars Banknotes",
    "tagline": "Premium authentic $100 Australian Dollars. Engineered for extreme close-ups on production film grids under motion picture guidelines.",
    "category": "Australian Dollars",
    "badge": "New Production",
    "rating": 4.8,
    "reviewCount": 31,
    "basePrice": 200,
    "originalPrice": 300,
    "colorTheme": "from-amber-500/10 to-yellow-600/15 text-amber-400 border-amber-500/20",
    "stripeColor": "#D4AF37",
    "bannerColor": "bg-amber-600/10 border-amber-500/30 text-amber-400",
    "imageSet": [
      "https://propcounterfeitnotes.com/public/upload/product/buy-aud-100-dollars.219webp",
      "https://propcounterfeitnotes.com/public/upload/product/buy-aud-100-dollars.219webp"
    ],
    "description": "$100 Australian Dollars with exquisite anti-reflective matte coating, perfect for high-definition cinematic capture.",
    "longDescription": "Cinema-grade realistic currency reproduction certified for television and motion picture use.",
    "coaText": "Certified compliant with legal filming guidelines.",
    "variants": [
      {
        "name": "Starter Bundle (50 Notes - $5,000 Face Value)",
        "price": 200,
        "savingsLabel": "Save 33%",
        "billCount": 50
      },
      {
        "name": "Compact Bundle (100 Notes - $10,000 Face Value)",
        "price": 400,
        "savingsLabel": "Save 31%",
        "billCount": 100
      },
      {
        "name": "Premium Bundle (250 Notes - $25,000 Face Value)",
        "price": 1000,
        "savingsLabel": "Save 23%",
        "billCount": 250
      },
      {
        "name": "Production Bundle (500 Notes - $50,000 Face Value)",
        "price": 2000,
        "savingsLabel": "Save 33%",
        "billCount": 500
      },
      {
        "name": "Studio Vault Pack (1,000 Notes - $100,000 Face Value)",
        "price": 4000,
        "savingsLabel": "Save 38%",
        "billCount": 1000
      },
      {
        "name": "Director Platinum Pack (2,500 Notes - $250,000 Face Value)",
        "price": 10000,
        "savingsLabel": "Save 47%",
        "billCount": 2500
      }
    ],
    "packageContents": [
      "100x high-fidelity replica bills matching regulatory dimensions.",
      "Heavy-duty secure strap branded with production-grade style bands.",
      "Laminated Certificate of Authenticity signed by visual compliance officers.",
      "Anti-humidity film protector sleeve for secure storage."
    ],
    "storageInstructions": "Store horizontally inside secure lockers. Keep away from extreme heat. Do not use iron or heat devices directly.",
    "supplyChain": "Reproduction plates prepared at local imaging workshops. Synthetic fibers sourced domestically."
  },
  {
    "id": "au-50-stack",
    "slug": "au-50-stack",
    "name": "Buy Counterfeit $50 Australian Dollars Banknotes",
    "tagline": "Premium authentic $50 Australian Dollars. Engineered for extreme close-ups on production film grids under motion picture guidelines.",
    "category": "Australian Dollars",
    "rating": 4.8,
    "reviewCount": 40,
    "basePrice": 200,
    "originalPrice": 300,
    "colorTheme": "from-rose-500/10 to-red-600/15 text-rose-400 border-rose-500/20",
    "stripeColor": "#C0397B",
    "bannerColor": "bg-rose-600/10 border-rose-500/30 text-rose-400",
    "imageSet": [
      "https://propcounterfeitnotes.com/public/upload/product/buy-counterfeit-aud-50-dollar-banknotes.252webp",
      "https://propcounterfeitnotes.com/public/upload/product/buy-counterfeit-aud-50-dollar-banknotes.252webp"
    ],
    "description": "$50 Australian Dollars with exquisite anti-reflective matte coating, perfect for high-definition cinematic capture.",
    "longDescription": "Cinema-grade realistic currency reproduction certified for television and motion picture use.",
    "coaText": "Certified compliant with legal filming guidelines.",
    "variants": [
      {
        "name": "Starter Bundle (50 Notes - $2,500 Face Value)",
        "price": 200,
        "savingsLabel": "Save 33%",
        "billCount": 50
      },
      {
        "name": "Compact Bundle (100 Notes - $5,000 Face Value)",
        "price": 400,
        "savingsLabel": "Save 31%",
        "billCount": 100
      },
      {
        "name": "Premium Bundle (250 Notes - $12,500 Face Value)",
        "price": 1000,
        "savingsLabel": "Save 23%",
        "billCount": 250
      },
      {
        "name": "Production Bundle (500 Notes - $25,000 Face Value)",
        "price": 2000,
        "savingsLabel": "Save 33%",
        "billCount": 500
      },
      {
        "name": "Studio Vault Pack (1,000 Notes - $50,000 Face Value)",
        "price": 4000,
        "savingsLabel": "Save 38%",
        "billCount": 1000
      },
      {
        "name": "Director Platinum Pack (2,500 Notes - $125,000 Face Value)",
        "price": 10000,
        "savingsLabel": "Save 47%",
        "billCount": 2500
      }
    ],
    "packageContents": [
      "100x high-fidelity replica bills matching regulatory dimensions.",
      "Heavy-duty secure strap branded with production-grade style bands.",
      "Laminated Certificate of Authenticity signed by visual compliance officers.",
      "Anti-humidity film protector sleeve for secure storage."
    ],
    "storageInstructions": "Store horizontally inside secure lockers. Keep away from extreme heat. Do not use iron or heat devices directly.",
    "supplyChain": "Reproduction plates prepared at local imaging workshops. Synthetic fibers sourced domestically."
  },
  {
    "id": "au-20-stack",
    "slug": "au-20-stack",
    "name": "Buy Counterfeit $20 Australian Dollars Banknotes",
    "tagline": "Premium authentic $20 Australian Dollars. Engineered for extreme close-ups on production film grids under motion picture guidelines.",
    "category": "Australian Dollars",
    "badge": "Best Seller",
    "rating": 4.8,
    "reviewCount": 55,
    "basePrice": 200,
    "originalPrice": 300,
    "colorTheme": "from-emerald-500/10 to-teal-500/15 text-emerald-400 border-emerald-500/20",
    "stripeColor": "#6A8E4E",
    "bannerColor": "bg-emerald-600/10 border-emerald-500/30 text-emerald-400",
    "imageSet": [
      "https://propcounterfeitnotes.com/public/upload/product/buy-aud-20-dollars.221webp",
      "https://propcounterfeitnotes.com/public/upload/product/buy-aud-20-dollars.221webp"
    ],
    "description": "$20 Australian Dollars with exquisite anti-reflective matte coating, perfect for high-definition cinematic capture.",
    "longDescription": "Cinema-grade realistic currency reproduction certified for television and motion picture use.",
    "coaText": "Certified compliant with legal filming guidelines.",
    "variants": [
      {
        "name": "Starter Bundle (50 Notes - $1,000 Face Value)",
        "price": 200,
        "savingsLabel": "Save 33%",
        "billCount": 50
      },
      {
        "name": "Compact Bundle (100 Notes - $2,000 Face Value)",
        "price": 400,
        "savingsLabel": "Save 31%",
        "billCount": 100
      },
      {
        "name": "Premium Bundle (250 Notes - $5,000 Face Value)",
        "price": 1000,
        "savingsLabel": "Save 23%",
        "billCount": 250
      },
      {
        "name": "Production Bundle (500 Notes - $10,000 Face Value)",
        "price": 2000,
        "savingsLabel": "Save 33%",
        "billCount": 500
      },
      {
        "name": "Studio Vault Pack (1,000 Notes - $20,000 Face Value)",
        "price": 4000,
        "savingsLabel": "Save 38%",
        "billCount": 1000
      },
      {
        "name": "Director Platinum Pack (2,500 Notes - $50,000 Face Value)",
        "price": 10000,
        "savingsLabel": "Save 47%",
        "billCount": 2500
      }
    ],
    "packageContents": [
      "100x high-fidelity replica bills matching regulatory dimensions.",
      "Heavy-duty secure strap branded with production-grade style bands.",
      "Laminated Certificate of Authenticity signed by visual compliance officers.",
      "Anti-humidity film protector sleeve for secure storage."
    ],
    "storageInstructions": "Store horizontally inside secure lockers. Keep away from extreme heat. Do not use iron or heat devices directly.",
    "supplyChain": "Reproduction plates prepared at local imaging workshops. Synthetic fibers sourced domestically."
  },
  {
    "id": "au-10-stack",
    "slug": "au-10-stack",
    "name": "Buy Counterfeit $10 Australian Dollars Banknotes",
    "tagline": "Premium authentic $10 Australian Dollars. Engineered for extreme close-ups on production film grids under motion picture guidelines.",
    "category": "Australian Dollars",
    "rating": 4.8,
    "reviewCount": 72,
    "basePrice": 200,
    "originalPrice": 300,
    "colorTheme": "from-violet-500/10 to-purple-500/15 text-purple-400 border-purple-500/20",
    "stripeColor": "#8B5CF6",
    "bannerColor": "bg-purple-600/10 border-purple-500/30 text-purple-400",
    "imageSet": [
      "https://propcounterfeitnotes.com/public/upload/product/buy-aud-10-dollar.222webp",
      "https://propcounterfeitnotes.com/public/upload/product/buy-aud-10-dollar.222webp"
    ],
    "description": "$10 Australian Dollars with exquisite anti-reflective matte coating, perfect for high-definition cinematic capture.",
    "longDescription": "Cinema-grade realistic currency reproduction certified for television and motion picture use.",
    "coaText": "Certified compliant with legal filming guidelines.",
    "variants": [
      {
        "name": "Starter Bundle (50 Notes - $500 Face Value)",
        "price": 200,
        "savingsLabel": "Save 33%",
        "billCount": 50
      },
      {
        "name": "Compact Bundle (100 Notes - $1,000 Face Value)",
        "price": 400,
        "savingsLabel": "Save 31%",
        "billCount": 100
      },
      {
        "name": "Premium Bundle (250 Notes - $2,500 Face Value)",
        "price": 1000,
        "savingsLabel": "Save 23%",
        "billCount": 250
      },
      {
        "name": "Production Bundle (500 Notes - $5,000 Face Value)",
        "price": 2000,
        "savingsLabel": "Save 33%",
        "billCount": 500
      },
      {
        "name": "Studio Vault Pack (1,000 Notes - $10,000 Face Value)",
        "price": 4000,
        "savingsLabel": "Save 38%",
        "billCount": 1000
      },
      {
        "name": "Director Platinum Pack (2,500 Notes - $25,000 Face Value)",
        "price": 10000,
        "savingsLabel": "Save 47%",
        "billCount": 2500
      }
    ],
    "packageContents": [
      "100x high-fidelity replica bills matching regulatory dimensions.",
      "Heavy-duty secure strap branded with production-grade style bands.",
      "Laminated Certificate of Authenticity signed by visual compliance officers.",
      "Anti-humidity film protector sleeve for secure storage."
    ],
    "storageInstructions": "Store horizontally inside secure lockers. Keep away from extreme heat. Do not use iron or heat devices directly.",
    "supplyChain": "Reproduction plates prepared at local imaging workshops. Synthetic fibers sourced domestically."
  },
  {
    "id": "eu-500-stack",
    "slug": "eu-500-stack",
    "name": "Buy Counterfeit €500 Euro Banknotes",
    "tagline": "Premium authentic €500 Euro. Engineered for extreme close-ups on production film grids under motion picture guidelines.",
    "category": "Euro",
    "rating": 4.8,
    "reviewCount": 64,
    "basePrice": 200,
    "originalPrice": 300,
    "colorTheme": "from-emerald-500/10 to-teal-500/15 text-emerald-400 border-emerald-500/20",
    "stripeColor": "#6A8E4E",
    "bannerColor": "bg-emerald-600/10 border-emerald-500/30 text-emerald-400",
    "imageSet": [
      "https://propcounterfeitnotes.com/public/upload/product/buy-500-euro-bills.226webp",
      "https://propcounterfeitnotes.com/public/upload/product/buy-500-euro-bills.226webp"
    ],
    "description": "€500 Euro with exquisite anti-reflective matte coating, perfect for high-definition cinematic capture.",
    "longDescription": "Cinema-grade realistic currency reproduction certified for television and motion picture use.",
    "coaText": "Certified compliant with legal filming guidelines.",
    "variants": [
      {
        "name": "Starter Bundle (50 Notes - €25,000 Face Value)",
        "price": 200,
        "savingsLabel": "Save 33%",
        "billCount": 50
      },
      {
        "name": "Compact Bundle (100 Notes - €50,000 Face Value)",
        "price": 400,
        "savingsLabel": "Save 31%",
        "billCount": 100
      },
      {
        "name": "Premium Bundle (250 Notes - €125,000 Face Value)",
        "price": 1000,
        "savingsLabel": "Save 23%",
        "billCount": 250
      },
      {
        "name": "Production Bundle (500 Notes - €250,000 Face Value)",
        "price": 2000,
        "savingsLabel": "Save 33%",
        "billCount": 500
      },
      {
        "name": "Studio Vault Pack (1,000 Notes - €500,000 Face Value)",
        "price": 4000,
        "savingsLabel": "Save 38%",
        "billCount": 1000
      },
      {
        "name": "Director Platinum Pack (2,500 Notes - €1,250,000 Face Value)",
        "price": 10000,
        "savingsLabel": "Save 47%",
        "billCount": 2500
      }
    ],
    "packageContents": [
      "100x high-fidelity replica bills matching regulatory dimensions.",
      "Heavy-duty secure strap branded with production-grade style bands.",
      "Laminated Certificate of Authenticity signed by visual compliance officers.",
      "Anti-humidity film protector sleeve for secure storage."
    ],
    "storageInstructions": "Store horizontally inside secure lockers. Keep away from extreme heat. Do not use iron or heat devices directly.",
    "supplyChain": "Reproduction plates prepared at local imaging workshops. Synthetic fibers sourced domestically."
  },
  {
    "id": "eu-200-stack",
    "slug": "eu-200-stack",
    "name": "Buy Counterfeit €200 Euro Banknotes",
    "tagline": "Premium authentic €200 Euro. Engineered for extreme close-ups on production film grids under motion picture guidelines.",
    "category": "Euro",
    "rating": 4.8,
    "reviewCount": 72,
    "basePrice": 200,
    "originalPrice": 300,
    "colorTheme": "from-emerald-500/10 to-teal-500/15 text-emerald-400 border-emerald-500/20",
    "stripeColor": "#6A8E4E",
    "bannerColor": "bg-emerald-600/10 border-emerald-500/30 text-emerald-400",
    "imageSet": [
      "https://propcounterfeitnotes.com/public/upload/product/buy-eur200-euro-bills.227webp",
      "https://propcounterfeitnotes.com/public/upload/product/buy-eur200-euro-bills.227webp"
    ],
    "description": "€200 Euro with exquisite anti-reflective matte coating, perfect for high-definition cinematic capture.",
    "longDescription": "Cinema-grade realistic currency reproduction certified for television and motion picture use.",
    "coaText": "Certified compliant with legal filming guidelines.",
    "variants": [
      {
        "name": "Starter Bundle (50 Notes - €10,000 Face Value)",
        "price": 200,
        "savingsLabel": "Save 33%",
        "billCount": 50
      },
      {
        "name": "Compact Bundle (100 Notes - €20,000 Face Value)",
        "price": 400,
        "savingsLabel": "Save 31%",
        "billCount": 100
      },
      {
        "name": "Premium Bundle (250 Notes - €50,000 Face Value)",
        "price": 1000,
        "savingsLabel": "Save 23%",
        "billCount": 250
      },
      {
        "name": "Production Bundle (500 Notes - €100,000 Face Value)",
        "price": 2000,
        "savingsLabel": "Save 33%",
        "billCount": 500
      },
      {
        "name": "Studio Vault Pack (1,000 Notes - €200,000 Face Value)",
        "price": 4000,
        "savingsLabel": "Save 38%",
        "billCount": 1000
      },
      {
        "name": "Director Platinum Pack (2,500 Notes - €500,000 Face Value)",
        "price": 10000,
        "savingsLabel": "Save 47%",
        "billCount": 2500
      }
    ],
    "packageContents": [
      "100x high-fidelity replica bills matching regulatory dimensions.",
      "Heavy-duty secure strap branded with production-grade style bands.",
      "Laminated Certificate of Authenticity signed by visual compliance officers.",
      "Anti-humidity film protector sleeve for secure storage."
    ],
    "storageInstructions": "Store horizontally inside secure lockers. Keep away from extreme heat. Do not use iron or heat devices directly.",
    "supplyChain": "Reproduction plates prepared at local imaging workshops. Synthetic fibers sourced domestically."
  },
  {
    "id": "eu-100-stack",
    "slug": "eu-100-stack",
    "name": "Buy Counterfeit €100 Euro Banknotes",
    "tagline": "Premium authentic €100 Euro. Engineered for extreme close-ups on production film grids under motion picture guidelines.",
    "category": "Euro",
    "badge": "New Production",
    "rating": 4.8,
    "reviewCount": 69,
    "basePrice": 200,
    "originalPrice": 300,
    "colorTheme": "from-amber-500/10 to-yellow-600/15 text-amber-400 border-amber-500/20",
    "stripeColor": "#D4AF37",
    "bannerColor": "bg-amber-600/10 border-amber-500/30 text-amber-400",
    "imageSet": [
      "https://propcounterfeitnotes.com/public/upload/product/buy-eur100-euro-bills.228webp",
      "https://propcounterfeitnotes.com/public/upload/product/buy-eur100-euro-bills.228webp"
    ],
    "description": "€100 Euro with exquisite anti-reflective matte coating, perfect for high-definition cinematic capture.",
    "longDescription": "Cinema-grade realistic currency reproduction certified for television and motion picture use.",
    "coaText": "Certified compliant with legal filming guidelines.",
    "variants": [
      {
        "name": "Starter Bundle (50 Notes - €5,000 Face Value)",
        "price": 200,
        "savingsLabel": "Save 33%",
        "billCount": 50
      },
      {
        "name": "Compact Bundle (100 Notes - €10,000 Face Value)",
        "price": 400,
        "savingsLabel": "Save 31%",
        "billCount": 100
      },
      {
        "name": "Premium Bundle (250 Notes - €25,000 Face Value)",
        "price": 1000,
        "savingsLabel": "Save 23%",
        "billCount": 250
      },
      {
        "name": "Production Bundle (500 Notes - €50,000 Face Value)",
        "price": 2000,
        "savingsLabel": "Save 33%",
        "billCount": 500
      },
      {
        "name": "Studio Vault Pack (1,000 Notes - €100,000 Face Value)",
        "price": 4000,
        "savingsLabel": "Save 38%",
        "billCount": 1000
      },
      {
        "name": "Director Platinum Pack (2,500 Notes - €250,000 Face Value)",
        "price": 10000,
        "savingsLabel": "Save 47%",
        "billCount": 2500
      }
    ],
    "packageContents": [
      "100x high-fidelity replica bills matching regulatory dimensions.",
      "Heavy-duty secure strap branded with production-grade style bands.",
      "Laminated Certificate of Authenticity signed by visual compliance officers.",
      "Anti-humidity film protector sleeve for secure storage."
    ],
    "storageInstructions": "Store horizontally inside secure lockers. Keep away from extreme heat. Do not use iron or heat devices directly.",
    "supplyChain": "Reproduction plates prepared at local imaging workshops. Synthetic fibers sourced domestically."
  },
  {
    "id": "eu-50-stack",
    "slug": "eu-50-stack",
    "name": "Buy Counterfeit €50 Euro Banknotes",
    "tagline": "Premium authentic €50 Euro. Engineered for extreme close-ups on production film grids under motion picture guidelines.",
    "category": "Euro",
    "rating": 4.8,
    "reviewCount": 65,
    "basePrice": 200,
    "originalPrice": 300,
    "colorTheme": "from-rose-500/10 to-red-600/15 text-rose-400 border-rose-500/20",
    "stripeColor": "#C0397B",
    "bannerColor": "bg-rose-600/10 border-rose-500/30 text-rose-400",
    "imageSet": [
      "https://propcounterfeitnotes.com/public/upload/product/buy-eur50-euro-bills.229webp",
      "https://propcounterfeitnotes.com/public/upload/product/buy-eur50-euro-bills.229webp"
    ],
    "description": "€50 Euro with exquisite anti-reflective matte coating, perfect for high-definition cinematic capture.",
    "longDescription": "Cinema-grade realistic currency reproduction certified for television and motion picture use.",
    "coaText": "Certified compliant with legal filming guidelines.",
    "variants": [
      {
        "name": "Starter Bundle (50 Notes - €2,500 Face Value)",
        "price": 200,
        "savingsLabel": "Save 33%",
        "billCount": 50
      },
      {
        "name": "Compact Bundle (100 Notes - €5,000 Face Value)",
        "price": 400,
        "savingsLabel": "Save 31%",
        "billCount": 100
      },
      {
        "name": "Premium Bundle (250 Notes - €12,500 Face Value)",
        "price": 1000,
        "savingsLabel": "Save 23%",
        "billCount": 250
      },
      {
        "name": "Production Bundle (500 Notes - €25,000 Face Value)",
        "price": 2000,
        "savingsLabel": "Save 33%",
        "billCount": 500
      },
      {
        "name": "Studio Vault Pack (1,000 Notes - €50,000 Face Value)",
        "price": 4000,
        "savingsLabel": "Save 38%",
        "billCount": 1000
      },
      {
        "name": "Director Platinum Pack (2,500 Notes - €125,000 Face Value)",
        "price": 10000,
        "savingsLabel": "Save 47%",
        "billCount": 2500
      }
    ],
    "packageContents": [
      "100x high-fidelity replica bills matching regulatory dimensions.",
      "Heavy-duty secure strap branded with production-grade style bands.",
      "Laminated Certificate of Authenticity signed by visual compliance officers.",
      "Anti-humidity film protector sleeve for secure storage."
    ],
    "storageInstructions": "Store horizontally inside secure lockers. Keep away from extreme heat. Do not use iron or heat devices directly.",
    "supplyChain": "Reproduction plates prepared at local imaging workshops. Synthetic fibers sourced domestically."
  },
  {
    "id": "eu-20-stack",
    "slug": "eu-20-stack",
    "name": "Buy Counterfeit €20 Euro Banknotes",
    "tagline": "Premium authentic €20 Euro. Engineered for extreme close-ups on production film grids under motion picture guidelines.",
    "category": "Euro",
    "badge": "Best Seller",
    "rating": 4.8,
    "reviewCount": 39,
    "basePrice": 200,
    "originalPrice": 300,
    "colorTheme": "from-emerald-500/10 to-teal-500/15 text-emerald-400 border-emerald-500/20",
    "stripeColor": "#6A8E4E",
    "bannerColor": "bg-emerald-600/10 border-emerald-500/30 text-emerald-400",
    "imageSet": [
      "https://propcounterfeitnotes.com/public/upload/product/buy-eur20-euro-bills.230webp",
      "https://propcounterfeitnotes.com/public/upload/product/buy-eur20-euro-bills.230webp"
    ],
    "description": "€20 Euro with exquisite anti-reflective matte coating, perfect for high-definition cinematic capture.",
    "longDescription": "Cinema-grade realistic currency reproduction certified for television and motion picture use.",
    "coaText": "Certified compliant with legal filming guidelines.",
    "variants": [
      {
        "name": "Starter Bundle (50 Notes - €1,000 Face Value)",
        "price": 200,
        "savingsLabel": "Save 33%",
        "billCount": 50
      },
      {
        "name": "Compact Bundle (100 Notes - €2,000 Face Value)",
        "price": 400,
        "savingsLabel": "Save 31%",
        "billCount": 100
      },
      {
        "name": "Premium Bundle (250 Notes - €5,000 Face Value)",
        "price": 1000,
        "savingsLabel": "Save 23%",
        "billCount": 250
      },
      {
        "name": "Production Bundle (500 Notes - €10,000 Face Value)",
        "price": 2000,
        "savingsLabel": "Save 33%",
        "billCount": 500
      },
      {
        "name": "Studio Vault Pack (1,000 Notes - €20,000 Face Value)",
        "price": 4000,
        "savingsLabel": "Save 38%",
        "billCount": 1000
      },
      {
        "name": "Director Platinum Pack (2,500 Notes - €50,000 Face Value)",
        "price": 10000,
        "savingsLabel": "Save 47%",
        "billCount": 2500
      }
    ],
    "packageContents": [
      "100x high-fidelity replica bills matching regulatory dimensions.",
      "Heavy-duty secure strap branded with production-grade style bands.",
      "Laminated Certificate of Authenticity signed by visual compliance officers.",
      "Anti-humidity film protector sleeve for secure storage."
    ],
    "storageInstructions": "Store horizontally inside secure lockers. Keep away from extreme heat. Do not use iron or heat devices directly.",
    "supplyChain": "Reproduction plates prepared at local imaging workshops. Synthetic fibers sourced domestically."
  },
  {
    "id": "eu-10-stack",
    "slug": "eu-10-stack",
    "name": "Buy Counterfeit €10 Euro Banknotes",
    "tagline": "Premium authentic €10 Euro. Engineered for extreme close-ups on production film grids under motion picture guidelines.",
    "category": "Euro",
    "rating": 4.8,
    "reviewCount": 66,
    "basePrice": 200,
    "originalPrice": 300,
    "colorTheme": "from-violet-500/10 to-purple-500/15 text-purple-400 border-purple-500/20",
    "stripeColor": "#8B5CF6",
    "bannerColor": "bg-purple-600/10 border-purple-500/30 text-purple-400",
    "imageSet": [
      "https://propcounterfeitnotes.com/public/upload/product/buy-eur10-euro-bills.231webp",
      "https://propcounterfeitnotes.com/public/upload/product/buy-eur10-euro-bills.231webp"
    ],
    "description": "€10 Euro with exquisite anti-reflective matte coating, perfect for high-definition cinematic capture.",
    "longDescription": "Cinema-grade realistic currency reproduction certified for television and motion picture use.",
    "coaText": "Certified compliant with legal filming guidelines.",
    "variants": [
      {
        "name": "Starter Bundle (50 Notes - €500 Face Value)",
        "price": 200,
        "savingsLabel": "Save 33%",
        "billCount": 50
      },
      {
        "name": "Compact Bundle (100 Notes - €1,000 Face Value)",
        "price": 400,
        "savingsLabel": "Save 31%",
        "billCount": 100
      },
      {
        "name": "Premium Bundle (250 Notes - €2,500 Face Value)",
        "price": 1000,
        "savingsLabel": "Save 23%",
        "billCount": 250
      },
      {
        "name": "Production Bundle (500 Notes - €5,000 Face Value)",
        "price": 2000,
        "savingsLabel": "Save 33%",
        "billCount": 500
      },
      {
        "name": "Studio Vault Pack (1,000 Notes - €10,000 Face Value)",
        "price": 4000,
        "savingsLabel": "Save 38%",
        "billCount": 1000
      },
      {
        "name": "Director Platinum Pack (2,500 Notes - €25,000 Face Value)",
        "price": 10000,
        "savingsLabel": "Save 47%",
        "billCount": 2500
      }
    ],
    "packageContents": [
      "100x high-fidelity replica bills matching regulatory dimensions.",
      "Heavy-duty secure strap branded with production-grade style bands.",
      "Laminated Certificate of Authenticity signed by visual compliance officers.",
      "Anti-humidity film protector sleeve for secure storage."
    ],
    "storageInstructions": "Store horizontally inside secure lockers. Keep away from extreme heat. Do not use iron or heat devices directly.",
    "supplyChain": "Reproduction plates prepared at local imaging workshops. Synthetic fibers sourced domestically."
  },
  {
    "id": "eu-5-stack",
    "slug": "eu-5-stack",
    "name": "Buy Counterfeit €5 Euro Banknotes",
    "tagline": "Premium authentic €5 Euro. Engineered for extreme close-ups on production film grids under motion picture guidelines.",
    "category": "Euro",
    "rating": 4.8,
    "reviewCount": 37,
    "basePrice": 200,
    "originalPrice": 300,
    "colorTheme": "from-blue-500/10 to-indigo-600/15 text-blue-400 border-blue-500/20",
    "stripeColor": "#2E5FA8",
    "bannerColor": "bg-blue-600/10 border-blue-500/30 text-blue-400",
    "imageSet": [
      "https://propcounterfeitnotes.com/public/upload/product/buy-eur5-euro-bills.232webp",
      "https://propcounterfeitnotes.com/public/upload/product/buy-eur5-euro-bills.232webp"
    ],
    "description": "€5 Euro with exquisite anti-reflective matte coating, perfect for high-definition cinematic capture.",
    "longDescription": "Cinema-grade realistic currency reproduction certified for television and motion picture use.",
    "coaText": "Certified compliant with legal filming guidelines.",
    "variants": [
      {
        "name": "Starter Bundle (50 Notes - €250 Face Value)",
        "price": 200,
        "savingsLabel": "Save 33%",
        "billCount": 50
      },
      {
        "name": "Compact Bundle (100 Notes - €500 Face Value)",
        "price": 400,
        "savingsLabel": "Save 31%",
        "billCount": 100
      },
      {
        "name": "Premium Bundle (250 Notes - €1,250 Face Value)",
        "price": 1000,
        "savingsLabel": "Save 23%",
        "billCount": 250
      },
      {
        "name": "Production Bundle (500 Notes - €2,500 Face Value)",
        "price": 2000,
        "savingsLabel": "Save 33%",
        "billCount": 500
      },
      {
        "name": "Studio Vault Pack (1,000 Notes - €5,000 Face Value)",
        "price": 4000,
        "savingsLabel": "Save 38%",
        "billCount": 1000
      },
      {
        "name": "Director Platinum Pack (2,500 Notes - €12,500 Face Value)",
        "price": 10000,
        "savingsLabel": "Save 47%",
        "billCount": 2500
      }
    ],
    "packageContents": [
      "100x high-fidelity replica bills matching regulatory dimensions.",
      "Heavy-duty secure strap branded with production-grade style bands.",
      "Laminated Certificate of Authenticity signed by visual compliance officers.",
      "Anti-humidity film protector sleeve for secure storage."
    ],
    "storageInstructions": "Store horizontally inside secure lockers. Keep away from extreme heat. Do not use iron or heat devices directly.",
    "supplyChain": "Reproduction plates prepared at local imaging workshops. Synthetic fibers sourced domestically."
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    title: "How to Choose the Best Prop Bills for 4K and 8K Video Productions",
    slug: "choosingpropbills-4k-8k",
    category: "Technical Specs",
    author: "Dominic Tremblay (Director of Photography)",
    date: "June 10, 2026",
    readTime: "5 min read",
    disclaimer: "Technical Review: Based on Red V-Raptor and ARRI Alexa filming tests.",
    heroImage: "/liko.jpg",
    summary: "Why paper weights, reflection factors, and color matching are critical when filming currency stacks up close in high resolutions.",
    contentMarkdown: `Filming in 4K, 8K, and IMAX means every fiber on set is scrutinized. Prop money that looks fine from 10 meters away will look like cardstock paper once you cut to a medium close-up of a suitcase transaction.

Here is the technical guide to selecting prop bills that fool modern sensors.

### The Problem with Digital Camera Glare
Regular printer paper is coated in wood-pulp sizing agents that reflect standard LED studio tubes. When high-power key lights hit cheap props, they create a 'hot spot' of high-glare white light, rendering the banknote design unreadable. 

To bypass this, professional prop bills are coated in a **micro-rough anti-reflection coating**. This disperses incoming light in multiple directions, maintaining the vivid green, red, or gold tones of Canadian notes even under high key lighting.

### Polymer Feel & Texture Modeling
Canadian banknotes feel unique because they are manufactured out of a specialized polypropylene plastic polymer. While you cannot legally print props on actual polymer, you should use **long-fiber synthetic compound bills** of correct weights (approx. 90-100 GSM). They possess the correct slip coefficient, allowing actors to count them quickly on camera without sticking.

### Denomination Advice for Color Correction
* **Spruce Green ($20)**: Highly forgiving under cool-toned and ambient neon lighting. Great overall stack filler.
* **Gold Ochre ($100)**: Prone to yellow-channel saturation under warm tungsten lighting. Always ensure your DPs adjust white balance to prevent prop gold from looking orange.
* **Crimson ($50)**: Ideal for high contrast. Pops dramatically in dark briefcases against dark leather lining.
`,
    relatedSlugs: ["prop-money-price-guide-comparison"],
    productSlugs: ["frontier-100-stack", "hollywood-north-jumbo"]
  },
  {
    title: "Prop Money Price Guide: High-Quality vs Low-Quality Stacks",
    slug: "prop-money-price-guide-comparison",
    category: "Money Matters",
    author: "Sarah Lin (Production Unit Manager)",
    date: "June 12, 2026",
    readTime: "7 min read",
    disclaimer: "Budgeting Breakdown: Evaluated on prop durability and reuse factors.",
    heroImage: "/OIP.webp",
    summary: "How to budget for prop money. Discover why investing in premium non-glare, heavy-gauge stacks saves production budget over multiple film cycles.",
    contentMarkdown: `Every line producer faces the task of cutting costs. When looking at the budget, prop money might seem like a place to pinch pennies. But down-budget decisions often cost more on-set.

Here is a financial and operational comparison of buying top-tier prop money sets versus cheap marketplace alternatives.

### The True Cost of Cheap Props
* **High Attrition Rates**: Cheap paper props tear, wrinkle, and absorbs dirt. They are generally single-use. If a scene requires multiple takes of throwing cash, cheap bills become unusable by take 4.
* **Post-Production Expenses**: Color grading and fixing flat, glowing blue spots in post-production costs thousands of dollars per hour.
* **On-Set Delays**: If a scene looks fake during filming, the director will spend valuable crew hours adjusting camera angles to hide the money, delaying the schedule.

### Sizing and Stacking Strategy
By purchasing Canadian Prop Money's professional stacks, you receive reusable and resilient synthetic sheets that hold up across dozens of filming cycles. To optimize your budget, apply the **“Prop Master Sandwich”** trick:
* Buy one or two **Standard Stacks** of high-detail single denomination props.
* Place these ultra-high realistic prop bills on the top, bottom, and outside of cash straps.
* Use blank paper spacers or slightly distressed filler bills for the interior of the stacks. This fills out large duffel bags or briefcases at a tenth of the cost!
`,
    relatedSlugs: ["where-to-buy-prop-money-canada", "choosingpropbills-4k-8k"],
    productSlugs: ["directors-vault-bundle", "hollywood-north-jumbo"]
  },
  {
    title: "Where to buy canadian prop money?",
    slug: "where-to-buy-canadian-prop-money",
    category: "Buying Guide",
    author: "Marcus Vance (Lead Set Designer & Prop Master)",
    date: "June 14, 2026",
    readTime: "12 min read",
    disclaimer: "Industry Sourcing Overview: Detailed compliance roadmap for acquiring legal, film-grade Canadian currency reproductions.",
    heroImage: "/OIP.webp",
    summary: "A complete professional guide for film directors, prop masters, and production offices on where and how to legally buy realistic Canadian prop money. Navigate federal screening policies, Bank of Canada compliance codes, and avoid visual errors on high-definition sets.",
    contentMarkdown: `When designing a scene that involves high-stakes transactions, a complex bank heist, or luxury displays of cash, sourcing high-quality props is your first major challenge. For film, television, and theatrical productions in Canada, the primary objective is not just making the scene look outstanding, but ensuring the entire process remains completely legal and secure.

Canadian currency is visually distinctive and highly advanced. From the vibrant color schemes of the polymer Frontier series to the complex translucent layers and metallic bands, reproducing Canadian banknotes requires supreme attention to detail. At the same time, strict federal counterfeiting laws regulate reproduction to prevent any fraudulent misuse of currency props.

In this comprehensive journal entry, we will analyze exactly where to buy Canadian prop money, how to evaluate quality benchmarks, and how to safeguard your production house from legal risk.

### Navigating Bank of Canada Legal Instructions

Before purchasing a single stack of play bills, you must understand the legal parameters. The Bank of Canada governs all forms of currency reproduction under Section 457 of the Criminal Code of Canada. Sourcing from non-compliant, unvetted marketplaces can result in shipments being permanently confiscated by border services, or worse, trigger legal investigations against your studio.

Under legitimate licensing paradigms, prop money must incorporate custom visual contrasts to ensure it cannot be accepted as active tender in retail situations:

* **Conspicuous Marking**: All replica bills must display clearly printed text notices like "FOR MOTION PICTURE USE ONLY", "PROP COPY", or "NOT LEGAL TENDER" on both sides.

* **Dimensional and Spatial Scaling**: Double-sided replicas must be scaled significantly larger (minimum 150%) or smaller (maximum 75%) of official currency dimensions, OR incorporate substantial cosmetic or plate changes that immediately disable automatic bank-grade processing equipment.

* **Face Plate Modifications**: Core typographic design matrices must change. Major text elements are adjusted—for example, replacing the word "Canada" with "Movie Use" or "Prop Copy". Portraits of political figures, such as Queen Elizabeth II, King Charles III, or Sir Robert Borden, are subtly altered to express distinct caricatures or hand-drawn features.

* **Material Restrictions**: True Canadian banknotes are minted on biaxially-oriented polypropylene (polymer). Because true polymer substrate printing is heavily restricted, professional prop notes are produced of custom synthetic compound paper stocks with specialized lacquer coatings.

### Major Sourcing Channels: Where to Purchase Legally

When sourcing prop money in Canada, production managers generally follow three pathways, each carrying different cost, convenience, and quality trade-offs:

1. Local Film Prop Houses: Based in major cities like Toronto, Vancouver, and Montreal, active prop warehouses carry pre-made stock. While they offer immediate local pick-ups, their product lines are frequently limited, and pricing can be very expensive, as they often charge high rental fees per scene or require costly security deposits.

2. Specialty E-Commerce Producers: Dedicated digital platforms like Canadian Prop Money are considered the industry standard. By focusing exclusively on compliant Canadian Dollar replicas, they offer high-volume production bundles with pre-packaged paper bank straps, physical Certificates of Authenticity, and reliable, fast express shipping.

3. Broad Global Novelty Sites: General online marketplaces sell broad novelty paper cash stacks. However, these are often printed on thin, low-density materials that tear instantly, lack double-sided ink coverage, and reflect harsh studio glares. Worse, they often bypass critical Bank of Canada warning labels, posing severe regulatory liability for your production.

### Evaluating Prop Realism for 4K and 8K Cinema Sensors

In the era of modern cinema, selecting props requires analyzing raw physical specs rather than just looking at the wholesale pricing:

### The Secret of Non-Glare Matte Lacquer
Most regular paper carries sizing agents that reflect lighting with high-intensity spikes, causing a blinding white glow on-screen. Professional movie bills use custom-sprayed micro-rough anti-reflection coating to maintain deep, organic color tones.

### Multi-Channel Registration & Alignment
Ensure your chosen merchant prints with precise double-sided plate alignment. If cash is intended to scatter, cascade, or be counted in high-contrast frames, misaligned back-faces will ruin the camera perspective.

### Synthetic Long-Fibers (Slip Coefficients)
To allow actors to count cash under high-pressure scenes naturally, the paper must slide seamlessly. Premium synthetic paper fibers prevent static adhesion, so cash stacks count smoothly without clumping.

### How to Efficiently Structure Your Prop Budget

To make your funding stretch further on extensive prop shoots, prop masters utilize a few clever on-set strategies:

* Buy two premium high-resolution double-sided "Standard Stacks" and use them to sandwich cheaper, single-sided, or blank filler notes inside the main cash straps. A suitcase or duffel bag appears filled to the brim with stacks, while saving up to 85% of your prop development budget.

* Settle on Spruce Green ($20 CAD) and Gold Ochre ($100 CAD) notes. These carry beautiful color channels that pop incredibly well under dark studio configurations.
`,
    relatedSlugs: ["realistic-canadian-prop-money", "choosingpropbills-4k-8k"],
    productSlugs: ["ca-100-stack", "ca-20-stack"]
  },
  {
    title: "Realistic canadian prop money",
    slug: "realistic-canadian-prop-money",
    category: "Technical Specs",
    author: "Dominic Tremblay (DP & Visual FX Supervisor)",
    date: "June 14, 2026",
    readTime: "11 min read",
    disclaimer: "Cinematography Review: Resolving high-density optical reflection factors on modern 8K digital sensor grids.",
    heroImage: "/liko.jpg",
    summary: "Discover the material science and graphical engineering behind movie-grade polymer replica currency. From custom matte lacquer systems to high-stability synthetic fiber weights, find out how realistic prop money maintains visual immersion in close-up focus rings.",
    contentMarkdown: `Filming replica banknotes has become incredibly demanding with the advancement of high-definition digital cinema. In the past, when movies were captured on standard-definition video or grainy 16mm stock, prop money was just basic paper tinted green with loose outlines. Today, with camera sensors like the RED V-Raptor, ARRI Alexa 35, and Sony Venice capturing every single fiber of set-dressing in razor-sharp 8K, cheap replicas stand out instantly and pull the audience out of the experience.

To sustain the cinematic illusion, realistic prop money must undergo complex physical, chemical, and graphic engineering. Sourcing great props is no longer about finding simple printouts; it is about matching how physical replica sheets interact with light, lenses, and human hands on active sets.

Below is an in-depth exploration of the material science behind professional-grade Canadian prop money.

### Resolving Studio Lighting Reflections: The Glare Barrier

The single greatest failure point for cheap prop money is how it interacts with studio lights. Real banknotes are handled repeatedly in circulation, needing to resist moisture, oil, and continuous wear. Canadian polymer banknotes have a specialized plastic texture that diffuses ambient light evenly across their surface.

Cheaper replica bills printed on general copier paper, standard cardstock, or gloss photo paper behave terribly under lights. General short-fiber papers absorb light flatly, resulting in washed-out colors on screen, while glossy papers bounce direct specular hotspots from LED light ribbons and key softboxes. This glare obscures the banknote design entirely, revealing its artificial nature on camera.

To combat this, cinematic prop notes are spray-treated with a custom **micro-rough anti-reflective matte lacquer**. This coating is formulated to replicate the exact refractive characteristics of circulating currency. It breaks apart incoming directional studio lights, redirecting it in subtle ambient directions. Under high backlighting, the spruce green of a $20 stack or the rich gold of a $100 stack retains deep, authentic saturation.

### Spectral Color Matching and Custom Pigment Inks

Canadian frontier-series currency features extremely intricate, custom-mixed color gradients and metallic bands. General office printers operate on CMYK color scales which lack the ability to properly mimic the rich spectral tones of authentic banknotes. The gold on a Canadian $100 bill frequently prints as a flat mustard yellow, and the crimson on a $50 bill prints out as a muddy maroon.

Professional prop suppliers utilize **high-density custom pigment ink formulas** mixed specifically to capture the precise color profiles of real Canadian dollars. This means that when the image hits your DP’s color-grading monitor, the notes translate immediately with perfect balance, reducing the cost and labor of frame-by-frame masking in post-production.

### The Material Science of Polymer Emulation

In 2011, the Bank of Canada transitioned the country's currency away from cotton-based paper to durable polymer bills. Polymer is incredibly difficult to emulate under film setups. Prop masters are legally forbidden from printing replica money onto actual polymer raw plates to prevent potential counterfeiting abuses.

To solve this, advanced manufacturers leverage **long-fiber synthetic compound paper stocks**.

Unlike standard wood-pulp papers which retain sharp, permanent creasing and stick together in humid environments, long-fiber synthetic paper stocks (typically optimized between 90 and 100 GSM weights) replicate the stiffness and visual memory of genuine polymer. This gives the bills incredible properties:

* **Spring Back (Memory)**: Synthetic compound stocks retain a clean surface structure, bouncing back flatly after soft bends rather than gathering chaotic wrinkles.

* **Smooth Slider Coefficients**: They move and glide against each other effortlessly. Actors can count, thumb, and slide cash bills in fast-paced card games without static sticking.

* **Acoustic Integrity**: They emit the distinctive crisp "polymer snap" sound when crumpled or flicked, providing realistic, immersive sound design directly on set.

### Sharpness at Macro Focal Lengths and Regulatory Limits

A key scene often requires a slow, micro-focus tracking shot of a cash briefcase, or an actor scrutinizing a bill close to the camera lens. At macro focal lengths, the microscopic printing must appear completely sharp.

Authentic bills contain miniature security print paths—tiny typography that looks like a solid line to the naked eye. High-end props produce these with high-density offset or lithographic print plates. Even modified legal labels like "FOR MOTION PICTURE USE ONLY" maintain extremely sharp, crisp borders under zoom. By integrating these compliance notices into the design, prop teams achieve a balance between regulatory safety and complete, unbroken visual immersion.
`,
    relatedSlugs: ["where-to-buy-canadian-prop-money", "choosingpropbills-4k-8k"],
    productSlugs: ["ca-100-stack", "ca-50-stack"]
  }
];

export const FAQ_CATEGORIES = [
  {
    name: "Buying & Ordering",
    faqs: [
      {
        q: "How do I place an order with Canadian Prop Money?",
        a: "We make ordering seamless! Simply use our interactive order builder on this website to add your desired stacks. When ready, click 'Submit Order via WhatsApp' to pre-fill a detailed purchase text directly to our dispatch desk. Alternatively, you can checkout normally or email us at sales@canadianpropmoney.org for custom production quotes."
      },
      {
        q: "How long does shipping take within Canada?",
        a: "We offer Same Day Shipping ($40) via express couriers for Toronto, Vancouver, and Montreal metro areas. Normal Shipping ($20) takes 2-4 business days nationwide. Speed options can be finalized directly in checkout."
      },
      {
        q: "Do you ship worldwide or just in Canada?",
        a: "While our focus is Canadian Dollar reproductions, we ship internationally via secure tracked post. International Shipping is standard $50 and takes 5-9 business days depending on customs clearances."
      }
    ]
  },
  {
    name: "Legal Compliance",
    faqs: [
      {
        q: "Is buying and owning Canadian prop money legal?",
        a: "Yes! Purchasing, owning, and using our prop money in film, theatrical, educational, or training productions is 100% legal. Our designs are custom-reconfigured to strictly comply with Bank of Canada regulations and federal compliance standards. We incorporate conspicuous legal markings ('FOR MOTION PICTURE USE ONLY', 'PROP COPY') and disable bank-grade retail scanning features while preserving gorgeous camera realism."
      },
      {
        q: "Does your prop money come with a physical certificate?",
        a: "Absolutely! Every single stack or bundle order includes an official, laminated Certificate of Authenticity (COA). It references subsection compliance and certifies that your currency replicas are designated artistic props. Keep this in your production kit during filming to show inspectors or police!"
      },
      {
        q: "Are the bills printed on both sides?",
        a: "Yes, our stacks are fully double-sided, high-resolution reproductions. However, because they are double-sided, we strictly incorporate multiple legal safety notices in the graphical plates (e.g. replacing 'Canada' with 'Movie Use', modified portraits, altered microtext) to prevent any misuse while maintaining outstanding optical realism."
      }
    ]
  },
  {
    name: "Product & Quality",
    faqs: [
      {
        q: "What makes your props look so real in 4K and 8K?",
        a: "Our bills are coated with an exclusive, non-reflective matte lacquer that completely eliminates the studio lighting glare common in cheap props. We also match the rich spruce green, crimson red, violet purple, and metallic gold color tones of the Canadian Frontier series banknotes with precision custom pigment inks."
      },
      {
        q: "Do the banknotes have real holographic bands?",
        a: "No. Federal laws forbid replicating active optical security holograms. Instead, we use highly advanced gold-foil and paint-grid printing techniques that mimic the metallic, luminous look of Canadian security bands under camera lenses, without being scanned by automatic teller machines."
      },
      {
        q: "Can I count these bills quickly on camera?",
        a: "Yes, our prop notes are engineered using specialty long-fiber synthetic paper stocks that duplicate the exact weight and high slide coefficient of polymer. They count, shuffle, and throw seamlessly like real banknotes without sticking."
      }
    ]
  },
  {
    name: "Pricing & Custom Bundles",
    faqs: [
      {
        q: "Can I order custom denom configurations?",
        a: "Definitely! Our 'Hollywood North Jumbo Pack' is completely customizable. If you need a specific balance of denominations (e.g., all $50s, or $20/$100 mix), just write your preferences in the Order Notes at checkout or contact us via WhatsApp."
      },
      {
        q: "Do you offer bulk discounts for major television series?",
        a: "Yes, we collaborate regularly with union productions and prop departments. For custom orders exceeding $2,000, please send a list of production specifications to sales@canadianpropmoney.org for a custom quotation."
      }
    ]
  }

];
