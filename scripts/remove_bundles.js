const fs = require('fs');
let code = fs.readFileSync('lib/data.ts', 'utf8');

// The usProducts started with { id: "us-100-stack"...
// Wait, we can just replace the whole bundle objects with empty string if they exist.
code = code.replace(/\{\s*"id":\s*"ca-director-bundle".*?\},?\s*(?=\{|\n\])/gs, '');
code = code.replace(/\{\s*"id":\s*"ca-hollywood-pack".*?\},?\s*(?=\{|\n\])/gs, '');
code = code.replace(/\{\s*"id":\s*"bundle-.*?".*?\},?\s*(?=\{|\n\])/gs, '');

fs.writeFileSync('lib/data.ts', code);
console.log('Done!');
