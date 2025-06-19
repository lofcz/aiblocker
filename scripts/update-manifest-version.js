const fs = require('fs');
const path = require('path');

const destManifestPath = process.argv[2];

if (!destManifestPath) {
    console.error('Error: Please provide a destination manifest path.');
    process.exit(1);
}

const packageJsonPath = path.resolve(__dirname, '../package.json');
const destPath = path.resolve(__dirname, '..', destManifestPath);
const srcManifestPath = path.resolve(__dirname, '..', destManifestPath.replace('dist/', 'src/'));

try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const version = packageJson.version;
    const manifest = JSON.parse(fs.readFileSync(srcManifestPath, 'utf8'));

    manifest.version = version;

    const destDir = path.dirname(destPath);

    if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
    }

    fs.writeFileSync(destPath, JSON.stringify(manifest, null, 2));

    console.log(`Successfully updated ${destManifestPath} to version ${version}`);
} catch (error) {
    console.error('Error updating manifest version:', error);
    process.exit(1);
}