const fs = require('fs');
const path = require('path');

function createContentWithPatterns(distDir) {
    const patternsPath = path.join(__dirname, 'src/common/patterns.js');
    const patternsContent = fs.readFileSync(patternsPath, 'utf8');
    const contentPath = path.join(__dirname, 'src/common/content.js');
    const contentContent = fs.readFileSync(contentPath, 'utf8');
    const combinedContent = `${patternsContent}\n\n${contentContent}`;
    const outputPath = path.join(distDir, 'content.js');

    fs.writeFileSync(outputPath, combinedContent, 'utf8');
    
    const distPatternsPath = path.join(distDir, 'patterns.js');
    if (fs.existsSync(distPatternsPath)) {
        fs.unlinkSync(distPatternsPath);
    }
    
    console.log(`✅ content.js built in ${distDir}`);
}

module.exports = { createContentWithPatterns };

if (require.main === module) {
    const distDir = process.argv[2] || 'dist';
    createContentWithPatterns(distDir);
}