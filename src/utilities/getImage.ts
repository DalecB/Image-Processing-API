import sharp from 'sharp';

const imagePath = '/Users/jaytheb/FSD/full/';
const thumbNail = '/Users/jaytheb/FSD/thumb/';

async function getMetadata(name: string) {
  try {
    const metadata = await sharp(imagePath + name + '.png').metadata();
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
      .toFile(thumbNail + name + '_thumb.png');
    return true;
  } catch (error) {
    console.log(error);
  }
}

export { resizeImage, getMetadata };
