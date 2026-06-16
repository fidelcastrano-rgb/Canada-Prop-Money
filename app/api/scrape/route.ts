import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";
import * as fs from "fs";
import * as path from "path";

// Function to extract denomination from product title
function getDenomination(title: string): number {
  const match = title.match(/\$(\d+)/);
  if (match) return parseInt(match[1], 10);
  return 20; // Default fallback
}

// Function to determine color theme and colors based on denomination
function getThemeAndColors(denom: number) {
  switch (denom) {
    case 5:
      return {
        colorTheme: "from-blue-500/10 to-indigo-600/15 text-blue-400 border-blue-500/20",
        stripeColor: "#2E5FA8",
        bannerColor: "bg-blue-600/10 border-blue-500/30 text-blue-400"
      };
    case 10:
      return {
        colorTheme: "from-violet-500/10 to-purple-500/15 text-purple-400 border-purple-500/20",
        stripeColor: "#8B5CF6",
        bannerColor: "bg-purple-600/10 border-purple-500/30 text-purple-400"
      };
    case 50:
      return {
        colorTheme: "from-rose-500/10 to-red-600/15 text-rose-400 border-rose-500/20",
        stripeColor: "#C0397B",
        bannerColor: "bg-rose-600/10 border-rose-500/30 text-rose-400"
      };
    case 100:
      return {
        colorTheme: "from-amber-500/10 to-yellow-600/15 text-amber-400 border-amber-500/20",
        stripeColor: "#D4AF37",
        bannerColor: "bg-amber-600/10 border-amber-500/30 text-amber-400"
      };
    case 20:
    default:
      return {
        colorTheme: "from-emerald-500/10 to-teal-500/15 text-emerald-400 border-emerald-500/20",
        stripeColor: "#6A8E4E",
        bannerColor: "bg-emerald-600/10 border-emerald-500/30 text-emerald-400"
      };
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { mode, products, targetUrl, htmlSource, targetCategory = "Canadian Dollars" } = body;

    // Scrape Mode
    if (mode === "scrape") {
      let indexHtml = "";
      
      if (htmlSource) {
        console.log(`[SCRAPER] Using provided HTML source code.`);
        indexHtml = htmlSource;
      } else if (targetUrl) {
        console.log(`[SCRAPER] Fetching category index page from ${targetUrl}`);
        const indexRes = await fetch(targetUrl, {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
          }
        });

        if (!indexRes.ok) {
          throw new Error(`HTTP error fetching category page: ${indexRes.status}`);
        }
        indexHtml = await indexRes.text();
      } else {
        return NextResponse.json({ success: false, error: "Must provide targetUrl or htmlSource" }, { status: 400 });
      }

      const $ = cheerio.load(indexHtml);
      const scrapedCards: any[] = [];
      
      $(".product-grid").each((i, el) => {
        const title = $(el).find(".product-content h3.title a").text().trim();
        const relativeLink = $(el).find(".product-content h3.title a").attr("href") || "";
        const priceText = $(el).find(".product-content .infos .price").text().trim();
        const imageSrc = $(el).find(".product-image img.pic-1").attr("src") || "";

        if (title && relativeLink) {
          scrapedCards.push({
            title,
            link: relativeLink,
            priceText,
            imageSrc
          });
        }
      });

      console.log(`[SCRAPER] Found ${scrapedCards.length} products on category page.`);
      const processedProducts: any[] = [];

      for (const card of scrapedCards) {
        try {
          console.log(`[SCRAPER] Fetching detail details for ${card.title} from ${card.link}`);
          // Ensure absolute URL
          const linkToFetch = card.link.startsWith("http") ? card.link : `https://propcounterfeitnotes.com${card.link}`;
          const detailRes = await fetch(linkToFetch, {
            headers: {
              "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
            }
          });

          if (!detailRes.ok) {
            console.warn(`[SCRAPER] Failed to fetch details for ${card.title}.`);
            continue;
          }

          const detailHtml = await detailRes.text();
          const $detail = cheerio.load(detailHtml);

          const title = card.title;
          const cleanedTitle = title.replace(/^Buy\s+/i, ""); 
          const slug = cleanedTitle.toLowerCase()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-");
          
          const denom = getDenomination(title);
          const prefix = targetCategory === "US Dollars" ? "us" : "ca";
          const id = `${prefix}-${denom}-stack`;

          const longDescription = $detail(".tab-content").text().trim() || 
            $detail("p").first().text().trim() || 
            "Cinema-grade realistic currency reproduction certified for television and motion picture use.";

          const descriptionMatch = longDescription.match(/^[^.!?]+[.!?]+[^.!?]+[.!?]+/);
          const description = descriptionMatch ? descriptionMatch[0] : `${cleanedTitle} with exquisite anti-reflective matte coating, perfect for high-definition cinematic capture.`;

          const variants: any[] = [];
          
          $detail("select#v-price option").each((vIdx, opt) => {
            const valueAttr = $detail(opt).attr("value");
            const labelAttr = $detail(opt).text().trim();
            
            if (valueAttr && labelAttr) {
              const priceVal = parseFloat(valueAttr) || 500;
              const faceValueMatch = labelAttr.replace(/,/g, "").match(/\$?(\d+)/);
              const faceValue = faceValueMatch ? parseInt(faceValueMatch[1], 10) : 5000;
              const billCount = faceValue / denom;

              variants.push({
                name: `Standard Pack (${labelAttr} Face Value)`,
                price: priceVal,
                billCount: isNaN(billCount) ? 250 : Math.round(billCount)
              });
            }
          });

          if (variants.length === 0) {
            variants.push(
              { name: "Standard Stack (100 Bills - Regular Hand-Strap)", price: 45, billCount: 100 },
              { name: "Pro Director Pack (500 Bills - Heavy Duty Banding)", price: 180, savingsLabel: "Save 20%", billCount: 500 },
              { name: "Studio Vault Pack (1000 Bills - Aluminum Storage)", price: 320, savingsLabel: "Save 28%", billCount: 1000 }
            );
          }

          const basePrice = variants[0]?.price || 45;
          const themeInfo = getThemeAndColors(denom);

          processedProducts.push({
            id,
            slug,
            name: cleanedTitle,
            tagline: `Premium authentic ${cleanedTitle.toLowerCase()}. Engineered for extreme close-ups on production film grids under motion picture guidelines.`,
            category: targetCategory as any,
            badge: denom === 100 ? "New Production" : denom === 20 ? "Best Seller" : undefined,
            rating: denom === 100 ? 5.0 : denom === 20 ? 4.9 : parseFloat((4.5 + Math.random() * 0.5).toFixed(1)),
            reviewCount: Math.floor(30 + Math.random() * 120),
            basePrice,
            originalPrice: Math.round(basePrice * 1.3),
            colorTheme: themeInfo.colorTheme,
            stripeColor: themeInfo.stripeColor,
            bannerColor: themeInfo.bannerColor,
            imageSet: [
              card.imageSrc || `https://picsum.photos/seed/prop${denom}f/600/400`,
              `https://picsum.photos/seed/prop${denom}b/600/400`,
              `https://picsum.photos/seed/prop${denom}d/600/400`
            ],
            description,
            longDescription,
            coaText: `Official COA Issued: Meets Bank of Canada guidelines for legitimate filmmaking props.`,
            variants,
            packageContents: [
              `${variants[0]?.billCount || 100}x high-fidelity replica bills matching regulatory dimensions.`,
              `Heavy-duty secure strap branded with production-grade style bands.`,
              `Laminated Certificate of Authenticity signed by visual compliance officers.`,
              `Anti-humidity film protector sleeve for secure storage.`
            ],
            storageInstructions: `Store horizontally inside secure lockers. Keep away from extreme heat. Do not use iron or heat devices directly.`,
            supplyChain: `Reproduction plates prepared at local imaging workshops. Synthetic fibers sourced domestically.`
          });

        } catch (err: any) {
          console.error(`[SCRAPER] Failed detail crawl for ${card.title}:`, err.message);
        }
      }

      return NextResponse.json({
        success: true,
        timestamp: new Date().toISOString(),
        count: processedProducts.length,
        products: processedProducts
      });
    }

    // Save Mode
    if (mode === "merge" || mode === "overwrite") {
      if (!products || !Array.isArray(products)) {
        return NextResponse.json({ success: false, error: "Missing or invalid products array" }, { status: 400 });
      }

      const filePath = path.join(process.cwd(), "lib", "data.ts");
      
      if (!fs.existsSync(filePath)) {
        return NextResponse.json({ success: false, error: "Product data.ts file not found at local target path" }, { status: 500 });
      }

      let fileContent = fs.readFileSync(filePath, "utf-8");
      let updatedProducts = [];

      if (mode === "merge") {
        const currentData = require("@/lib/data");
        const currentProducts = currentData.PRODUCTS || [];
        
        const mergedMap = new Map();
        currentProducts.forEach((p: any) => mergedMap.set(p.id, p));
        
        products.forEach((p: any) => {
          mergedMap.set(p.id, p); 
        });
        
        updatedProducts = Array.from(mergedMap.values());
      } else {
        updatedProducts = products;
      }

      const newProductsString = `export const PRODUCTS: Product[] = ${JSON.stringify(updatedProducts, null, 2)};`;
      const regex = /export\s+const\s+PRODUCTS:\s+Product\[\]\s*=\s*\[[\s\S]*?\];/;
      
      if (regex.test(fileContent)) {
        fileContent = fileContent.replace(regex, newProductsString);
        fs.writeFileSync(filePath, fileContent, "utf-8");
        
        return NextResponse.json({
          success: true,
          mode,
          count: updatedProducts.length,
          message: `Successfully written ${updatedProducts.length} products to global database config file (/lib/data.ts).`
        });
      } else {
        return NextResponse.json({
          success: false,
          error: "Could not find PRODUCTS regex pattern in physical data file structure"
        }, { status: 500 });
      }
    }

    return NextResponse.json({ success: false, error: "Invalid mode specified" }, { status: 400 });

  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message || String(error)
    }, { status: 500 });
  }
}

