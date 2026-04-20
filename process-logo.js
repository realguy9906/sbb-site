const Jimp = require('jimp');

async function removeBackground() {
  const imagePath = './assets/logo.png';
  const image = await Jimp.read(imagePath);
  
  const width = image.bitmap.width;
  const height = image.bitmap.height;
  
  const bgColorHex = image.getPixelColor(0, 0);
  const bgRgba = Jimp.intToRGBA(bgColorHex);
  
  const tolerance = 25; 
  function isBgColor(r, g, b) {
    return Math.abs(r - bgRgba.r) + Math.abs(g - bgRgba.g) + Math.abs(b - bgRgba.b) < tolerance;
  }

  // BFS Queue
  const queue = [{x: 0, y: 0}];
  const visited = new Set();
  function getPosIdx(x, y) { return y * width + x; }

  // We set alpha = 0 for the start pixel just in case
  image.setPixelColor(0, 0, 0);
  
  let iterations = 0;
  let i = 0;
  
  // To avoid maximum call stack or massive arrays, we use an index pointer in the queue
  while(i < queue.length) {
    const {x, y} = queue[i++];
    const idx = (y * width + x) * 4;
    
    // Check neighbors
    const neighbors = [
      {x: x+1, y}, {x: x-1, y}, {x, y: y+1}, {x, y: y-1}
    ];

    for (let current of neighbors) {
      if (current.x >= 0 && current.x < width && current.y >= 0 && current.y < height) {
        const pIdx = getPosIdx(current.x, current.y);
        if (!visited.has(pIdx)) {
          visited.add(pIdx);
          
          const offset = pIdx * 4;
          const r = image.bitmap.data[offset];
          const g = image.bitmap.data[offset + 1];
          const b = image.bitmap.data[offset + 2];
          
          if (isBgColor(r, g, b)) {
            // make transparent
            image.bitmap.data[offset + 0] = 0;
            image.bitmap.data[offset + 1] = 0;
            image.bitmap.data[offset + 2] = 0;
            image.bitmap.data[offset + 3] = 0;
            queue.push(current);
          }
        }
      }
    }
  }

  await image.writeAsync('./assets/logo.png');
  console.log('Flood fill background removal complete.');
}

removeBackground().catch(console.error);
