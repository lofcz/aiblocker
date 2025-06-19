const fs = require('fs');
const path = require('path');

const destManifestPath = process.argv[2];
if (!destManifestPath) {
    console.error('Error: Please provide a destination manifest path.');
    process.exit(1);
}

const projectRoot = path.resolve(__dirname, '..');
const packageJsonPath = path.join(projectRoot, 'package.json');
const destPath = path.join(projectRoot, destManifestPath);
const srcManifestPath = path.join(projectRoot, destManifestPath.replace('dist/', 'src/'));

try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const version = packageJson.version;
    let manifestString = fs.readFileSync(srcManifestPath, 'utf8');
    const nameLineRegex = /"name":.*,/;
    const versionLine = `  "version": "${version}",`;

     if (nameLineRegex.test(manifestString)) {
        manifestString = manifestString.replace(
            nameLineRegex,
            `$&
${versionLine}`
        );
    } else {
        throw new Error('Could not find a `"name": "...",` line in the source manifest.');
    }

    const destDir = path.dirname(destPath);
    if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
    }

    fs.writeFileSync(destPath, manifestString);

    console.log(`Successfully built ${destManifestPath} with version ${version}`);
} catch (error) {
    console.error('Error building manifest:', error);
    process.exit(1);
}