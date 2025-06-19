const fs = require('fs');
const path = require('path');

function createContentWithPatterns(distDir) {
    const projectRoot = path.resolve(__dirname, '..');
    const patternsPath = path.join(projectRoot, 'src/common/patterns.js');
    const contentPath = path.join(projectRoot, 'src/common/content.js');
    const outputPath = path.join(projectRoot, distDir, 'content.js');

    try {
        const patternsContent = fs.readFileSync(patternsPath, 'utf8');
        const contentContent = fs.readFileSync(contentPath, 'utf8');
        const combinedContent = `${patternsContent}\n\n${contentContent}`;

        fs.writeFileSync(outputPath, combinedContent, 'utf8');

        const distPatternsPath = path.join(projectRoot, distDir, 'patterns.js');

        if (fs.existsSync(distPatternsPath)) {
            fs.unlinkSync(distPatternsPath);
        }

        console.log(`✅ content.js built successfully in ${distDir}`);
    } catch (error) {
        console.error(`Error building content.js for ${distDir}:`, error);
        process.exit(1);
    }
}

if (require.main === module) {
    const distDir = process.argv[2];
    if (!distDir) {
        console.error('Error: Please provide a destination directory (e.g., dist/chrome).');
        process.exit(1);
    }
    createContentWithPatterns(distDir);
}

module.exports = { createContentWithPatterns };