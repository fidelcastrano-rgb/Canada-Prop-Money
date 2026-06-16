import * as https from 'https';

const url = "https://propcounterfeitnotes.com/category/buy-counterfeit-us-dollar-bills";

https.get(url, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log(data);
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});
