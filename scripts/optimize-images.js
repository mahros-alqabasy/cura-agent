const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, '../public/screenshots');
const outputDir = path.join(__dirname, '../public/screenshots/optimized');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.readdir(inputDir, (err, files) => {
  if (err) {
    console.error('Error reading input directory:', err);
    return;
  }

  files.forEach((file) => {
    const inputFile = path.join(inputDir, file);
    const outputFile = path.join(outputDir, file);

    sharp(inputFile)
      .resize(800) // Resize to a width of 800px, maintaining aspect ratio
      .toFormat('jpeg', { quality: 80 }) // Convert to JPEG with 80% quality
      .toFile(outputFile, (err) => {
        if (err) {
          console.error('Error processing file:', file, err);
        } else {
          console.log('Optimized:', file);
        }
      });
  });
});
