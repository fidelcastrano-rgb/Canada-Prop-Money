const fs = require('fs');

const filesToEdit = [
  'app/api/scrape/route.ts',
  'app/terms/page.tsx',
  'app/blog/page.tsx',
  'app/page.tsx',
  'app/about/page.tsx',
  'app/faq/page.tsx',
  'app/layout.tsx',
  'app/checkout/page.tsx',
  'lib/data.ts',
  'components/Footer.tsx'
];

filesToEdit.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // app/api/scrape/route.ts replacements
    content = content.replace(/ under subsection 453 compliance structures/gi, ' under motion picture guidelines');
    content = content.replace(/Meets Bank of Canada Subsection 453 guidelines/g, 'Meets Bank of Canada guidelines');
    
    // app/terms/page.tsx
    content = content.replace(/ and Subsection 453 of the Federal Criminal Code of Canada/g, ' and the Federal Criminal Code of Canada');
    
    // app/blog/page.tsx
    content = content.replace(/regarding Subsection 453 federal guidelines/g, 'regarding federal guidelines');
    content = content.replace(/We adhere strictly to Section 453 federal rules\./g, 'We adhere strictly to federal rules.');
    
    // app/page.tsx
    content = content.replace(/\(Sec 453 Compliant\)/g, '(Legally Compliant)');
    content = content.replace(/Section 453 <CheckCircle/g, 'Legal Compliance <CheckCircle');
    content = content.replace(/Sec 453 Compliance/g, 'Legal Compliance');
    content = content.replace(/Compliant with Criminal Code Section 453 standards\./g, 'Compliant with Criminal Code standards.');
    
    // app/about/page.tsx
    content = content.replace(/\*\*Subsection 453 of the Criminal Code of Canada\.\*\*/g, '**the Criminal Code of Canada.**');
    content = content.replace(/CRIMINAL CODE SEC 453 Approved/g, 'CRIMINAL CODE APPROVED');
    content = content.replace(/Absolute Sec 453 Integrity/g, 'Absolute Legal Integrity');
    content = content.replace(/Subsection 453 text modifications/g, 'legal text modifications');
    content = content.replace(/Plate Deviations \(Sec 453\)/g, 'Plate Deviations (Legal)');
    
    // app/faq/page.tsx
    content = content.replace(/to ensure compliance with Criminal Code Section 453\./g, 'to ensure compliance with the Criminal Code.');
    
    // app/layout.tsx
    content = content.replace(/ Strictly compliant with subsection 453\./g, ' Strictly compliant with legal guidelines.');
    
    // app/checkout/page.tsx
    content = content.replace(/specifying Subsection 453 compliance/g, 'specifying legal compliance');
    
    // lib/data.ts
    content = content.replace(/Subsection 453 compliance requirements/g, 'legal compliance requirements');
    content = content.replace(/Subsection 453 certified compliant/g, 'Certified compliant');
    content = content.replace(/\*\*subsection 453 of the Criminal Code of Canada\*\*/g, '**the Criminal Code of Canada**');
    content = content.replace(/Navigating Subsection 453 of the Criminal Code\./g, 'Navigating the Criminal Code.');
    content = content.replace(/Under Section 453 of the/g, 'Under the');
    content = content.replace(/Subsection 453 of the Criminal Code/g, 'the Criminal Code');
    
    // components/Footer.tsx
    content = content.replace(/meet Section 453 of the Criminal Code/g, 'meet the Criminal Code');
    content = content.replace(/Criminal Code Sec 453 Explamation/g, 'Legal Guidelines Explanation');
    
    fs.writeFileSync(file, content, 'utf8');
  }
});

console.log('done');
