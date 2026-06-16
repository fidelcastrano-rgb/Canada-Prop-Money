import * as fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('./scripts/output.html', 'utf-8');
const $ = cheerio.load(html);

const products: any[] = [];
$('.product').each((i, el) => {
    // Attempt to match typical woocommerce or shopify product classes
    const title = $(el).find('.woocommerce-loop-product__title, .product-title, h2, h3').first().text().trim();
    const priceText = $(el).find('.price').first().text().trim();
    const image = $(el).find('img').first().attr('src');
    const link = $(el).find('a').first().attr('href');

    if (title) {
        products.push({ title, priceText, image, link });
    }
});

if (products.length === 0) {
    // If not found, let's just dump all h2/h3 to see what the structure is
    $('h2, h3').each((i, el) => {
        const title = $(el).text().trim();
        const link = $(el).find('a').attr('href') || $(el).closest('a').attr('href');
        if (title) console.log("Header:", title, "Link:", link);
    });
} else {
    console.log(JSON.stringify(products, null, 2));
}
