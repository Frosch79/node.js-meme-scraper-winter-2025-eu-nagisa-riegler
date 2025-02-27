import fs from 'node:fs';
import axios from 'axios';
import { JSDOM } from 'jsdom';

let dom;
const url = 'https://memegen-link-examples-upleveled.netlify.app/';
let memes = [];

// Fetch URL
await axios
  .get(url)
  .then((fetching) => {
    // Get HTML data
    dom = new JSDOM(fetching.data);
  })
  .catch(() => console.error('error'));
const img = dom.window.document.querySelectorAll('img');

// Save images to memes folder
for (let i = 0; i < 10; i++) {
  memes.push(img[i].getAttribute('src'));

  const res = await fetch(memes[i]);
  const arrayBuffer = await res.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const num = i + 1;
  const zeroNum = ('00' + num).slice(-2);
  fs.writeFileSync('memes/' + zeroNum + '.jpg', buffer);
}
