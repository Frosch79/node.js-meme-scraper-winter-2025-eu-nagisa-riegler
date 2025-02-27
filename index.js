import fs from 'node:fs';
import { JSDOM } from 'jsdom';
import fetch from 'node-fetch';

const url = 'https://memegen-link-examples-upleveled.netlify.app/';
let dom;
const path = './memes';

// Fetch URL
await fetch(url)
  .then((data) => data.text())
  .then((response) => {
    dom = new JSDOM(response);

    // Make new directory
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true });
    }
  })
  .catch((error) => console.error(error));

// Search image tag from html text
const img = dom.window.document.querySelectorAll('img');

// Get image binary and assign to created directory

for (let i = 0; i < 10; i++) {
  const res = await fetch(img[i].getAttribute('src'));
  const arrayBuffer = await res.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const num = i + 1;
  const zeroNum = ('00' + num).slice(-2);
  fs.writeFileSync('memes/' + zeroNum + '.jpg', buffer);
}
