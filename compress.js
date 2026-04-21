const fs = require('fs');
const Jimp = require('jimp');

async function compressImages() {
    for (let i = 1; i <= 4; i++) {
        const inputPath = './assets/carousel_' + i + '.png';
        const outputPath = './assets/carousel_' + i + '.jpg';
        if (fs.existsSync(inputPath)) {
            try {
                const image = await Jimp.read(inputPath);
                // Resize height to 300px for sharpness on retina
                image.resize(Jimp.AUTO, 300);
                // Lower quality to 75% for web optimization
                image.quality(75);
                await image.writeAsync(outputPath);
                console.log('Compressed ' + inputPath + ' to ' + outputPath);
            } catch (err) {
                console.error("Error compressing " + inputPath, err);
            }
        }
    }
}

compressImages().catch(console.error);
