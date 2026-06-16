const fs = require('fs');

let code = fs.readFileSync('lib/data.ts', 'utf8');
const lines = code.split('\n');

let currentDenom = 0;
let currentCurrency = '$';
let inVariants = false;
let newLines = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  const idMatch = line.match(/"?id"?:\s*"(?:ca|us|au|eu)-(\d+)-stack"/);
  if (idMatch) {
    currentDenom = parseInt(idMatch[1]);
  }
  
  const nameMatch = line.match(/"?name"?:\s*"Buy.*?([$€])/);
  if (nameMatch) {
    currentCurrency = nameMatch[1];
  }
  
  if (line.match(/^\s*"?basePrice"?:\s*\d+,/)) {
    newLines.push(`    "basePrice": 200,`);
    continue;
  }
  
  if (line.match(/^\s*"?originalPrice"?:\s*\d+,/)) {
    newLines.push(`    "originalPrice": 300,`);
    continue;
  }
  
  if (line.match(/^\s*"?variants"?:\s*\[/)) {
    inVariants = true;
    newLines.push(`    "variants": [`);
    
    // insert the new variants
    newLines.push(`      { "name": "Starter Bundle (50 Notes - ${currentCurrency}${(50*currentDenom).toLocaleString()} Face Value)", "price": 200, "savingsLabel": "Save 33%", "billCount": 50 },`);
    newLines.push(`      { "name": "Compact Bundle (100 Notes - ${currentCurrency}${(100*currentDenom).toLocaleString()} Face Value)", "price": 400, "savingsLabel": "Save 31%", "billCount": 100 },`);
    newLines.push(`      { "name": "Premium Bundle (250 Notes - ${currentCurrency}${(250*currentDenom).toLocaleString()} Face Value)", "price": 1000, "savingsLabel": "Save 23%", "billCount": 250 },`);
    newLines.push(`      { "name": "Production Bundle (500 Notes - ${currentCurrency}${(500*currentDenom).toLocaleString()} Face Value)", "price": 2000, "savingsLabel": "Save 33%", "billCount": 500 },`);
    newLines.push(`      { "name": "Studio Vault Pack (1,000 Notes - ${currentCurrency}${(1000*currentDenom).toLocaleString()} Face Value)", "price": 4000, "savingsLabel": "Save 38%", "billCount": 1000 },`);
    newLines.push(`      { "name": "Director Platinum Pack (2,500 Notes - ${currentCurrency}${(2500*currentDenom).toLocaleString()} Face Value)", "price": 10000, "savingsLabel": "Save 47%", "billCount": 2500 }`);
    
    continue;
  }
  
  if (inVariants) {
    if (line.trim() === '],') {
      inVariants = false;
      newLines.push(line);
    }
    // skip other lines inside variants
    continue;
  }
  
  newLines.push(line);
}

fs.writeFileSync('lib/data.ts', newLines.join('\n'));
console.log('Update Complete!');
