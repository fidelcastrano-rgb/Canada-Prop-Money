import * as http from 'http';

const targetUrl = "https://propcounterfeitnotes.com/category/buy-counterfeit-us-dollar-bills";
const targetCategory = "US Dollars";

const postData = JSON.stringify({
  mode: "scrape",
  targetUrl: targetUrl,
  targetCategory: targetCategory
});

const req = http.request({
  hostname: '127.0.0.1',
  port: 3000,
  path: '/api/scrape',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
}, (res) => {
  let body = '';
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => {
    console.log("Scrape response:", body);
    const result = JSON.parse(body);
    if (!result.success || !result.products) {
      console.log("No products returned or error");
      return;
    }
    
    // Now trigger merge mode
    const mergeData = JSON.stringify({
      mode: "merge",
      products: result.products
    });

    const mergeReq = http.request({
      hostname: '127.0.0.1',
      port: 3000,
      path: '/api/scrape',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(mergeData)
      }
    }, (mRes) => {
      let mBody = '';
      mRes.on('data', (chunk) => mBody += chunk);
      mRes.on('end', () => {
        console.log("Merge response:", mBody);
      });
    });
    mergeReq.on('error', (e) => console.error(e));
    mergeReq.write(mergeData);
    mergeReq.end();
  });
});

req.on('error', (e) => console.error(e));
req.write(postData);
req.end();
