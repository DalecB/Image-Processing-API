import express, { query } from 'express';
import { resizeImage, getMetadata } from './utilities/getImage';
// import { promises as fsPromises } from 'fs';
// import { execPath } from 'process';

const imagePath = '/Users/jaytheb/FSD/thumb/';
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
  const url: string = String(req.query);
  if (isNaN(width) || isNaN(height)) {
    // todo return 404 or 500 or any else
  }
  if(url === `localhost:3000/image?filename=${name}&width=${width}&height=${height}`){
    
  } else {
    await resizeImage(width, height, name);
    res.sendFile(imagePath + req.query.filename + '_thumb.png');
  }
});

// app.get('/yumi', (req, res) => {
// 	res.sendFile(imagePath);
//   resizeImage();
// })

app.listen(port, () => {
  console.log(`
  ############################################
    server started at http://localhost:${port}
  ############################################
  `);
});

export { app };
