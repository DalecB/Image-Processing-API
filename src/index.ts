import express from 'express';
import { resizeImage, getMetadata } from './utilities/getImage';
import {promises as fs} from 'fs';

const imagePath = '/Users/jaytheb/FSD/Image Process API/thumb/';
const app = express();
const port = 3000;

app.get('/meta', async (req, res) => {
  const name: string = String(req.query.filename);
  res.json(await getMetadata(name)); // 수정
});

app.get('/image', async (req, res) => {
  const width: number = parseInt(String(req.query.width));
  const height: number = parseInt(String(req.query.height));
  const name: string = String(req.query.filename);
  if (isNaN(width) || isNaN(height)) {
    // todo return 404 or 500 or any else
  }
  try {
    const image = await fs.open(imagePath + name + '_' + width + '_' + height + '.png', 'r');
    // console.log(image)
    res.sendFile(imagePath + name + '_' + width + '_' + height + '.png');
  } catch {
    await resizeImage(width, height, name);
    res.sendFile(imagePath + name + '_' + width + '_' + height + '.png');
  }
});

app.listen(port, () => {
  console.log(`
  ############################################
    server started at http://localhost:${port}
  ############################################
  `);
});

export { app };
