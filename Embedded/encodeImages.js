const fs = require('fs');
const path = require('path');

const imageDir = './Embedded';
const outputFile = 'encodedImages.json';

const encoded = [];
fs.readdirSync(imageDir).forEach(file => {
  if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.svg')) {
    const imagePath = path.join(imageDir, file);
    const base64 = fs.readFileSync(imagePath).toString('base64');
    const mimeType = file.endsWith('.png') ? 'image/png' : file.endsWith('.jpg') ? 'image/jpeg' : 'image/svg+xml';
    const dataURI = `data:${mimeType};base64,${base64}`;
    encoded.push(dataURI);
  }
});

fs.writeFileSync(outputFile, JSON.stringify(encoded, null, 2));
console.log(`Encoded ${encoded.length} images to ${outputFile}`);