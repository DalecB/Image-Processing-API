import sharp from 'sharp';
import path from 'path';

const imagePath = path.join(__dirname, '../../full/');
const thumbNail = path.join(__dirname, '../../thumb/');

async function getMetadata(name: string) {
  try {
    const metadata: String = String(await sharp(imagePath + name + '.png').metadata());
    return metadata;
  } catch (error) {
    console.log(`An error occured during processing: ${error}`);
  }
}

async function resizeImage(w: number, h: number, name: string) {
  try {
    await sharp(imagePath + name + '.png')
      .resize({
        width: w,
        height: h,
      })
      .toFile(thumbNail + name + '_' + w + '_' + h + '.png');
    return true;
  } catch (error) {
    console.log(error);
  }
}

export { resizeImage, getMetadata };
