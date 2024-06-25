const fs = require('fs-extra');
const archiver = require('archiver');
const path = require('path');

const buildDir = path.join(__dirname, 'dist/whatsapp-floating-plugin');

// Clean up previous build
fs.removeSync(buildDir);

// Create necessary directories
fs.ensureDirSync(buildDir);

// Copy necessary files and directories
const filesToCopy = [
  'whatsapp-floating-plugin.php',
  'css',
  'js',
  'templates',
];

filesToCopy.forEach(file => {
  fs.copySync(path.join(__dirname, file), path.join(buildDir, file));
});

// Create a zip file
const output = fs.createWriteStream(path.join(__dirname, 'dist/whatsapp-floating-plugin.zip'));
const archive = archiver('zip', { zlib: { level: 9 } });

output.on('close', () => {
  console.log(`whatsapp-floating-plugin.zip created: ${archive.pointer()} total bytes`);
});

archive.on('error', err => {
  throw err;
});

archive.pipe(output);

// Add the entire buildDir to the zip under whatsapp-floating-plugin folder
archive.directory(buildDir, 'whatsapp-floating-plugin');
archive.finalize();
