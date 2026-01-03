import { readdirSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';

const EVENTS_DIR = './src/data/events';
const IMAGES_DIR = './public/images/events';

const eventFiles = readdirSync(EVENTS_DIR).filter((f) => f.endsWith('.md'));

let missing = 0;
let found = 0;

for (const file of eventFiles) {
  const content = readFileSync(join(EVENTS_DIR, file), 'utf-8');
  const match = content.match(/^image:\s*(.+)$/m);
  if (match) {
    const imageName = match[1].replace(/^["']|["']$/g, '').trim();
    const imagePath = join(IMAGES_DIR, imageName);
    if (existsSync(imagePath)) {
      found++;
    } else {
      console.log(`MISSING: ${imageName} (${file})`);
      missing++;
    }
  }
}

console.log(`\nTotal: ${found} found, ${missing} missing`);
