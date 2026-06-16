async function run() {
  try {
    const res = await fetch('http://127.0.0.1:3000/api/scrape', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        mode: 'scrape',
        targetUrl: 'https://propcounterfeitnotes.com/category/buy-counterfeit-us-dollar-bills',
        targetCategory: 'US Dollars'
      })
    });
    const data = await res.json();
    console.log(`Scrape returned ${data.products?.length} products`);

    if (data.success && data.products) {
      const mergeRes = await fetch('http://127.0.0.1:3000/api/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'merge',
          products: data.products
        })
      });
      const mergeData = await mergeRes.json();
      console.log('Merge result:', mergeData);
    }
  } catch(e) {
    console.error(e);
  }
}
run();
