/* eslint-disable no-restricted-syntax */
/* eslint-disable max-len */
const downloader = require('./lib/downloader');
const REKOG = require('./lib/aws/rekognition');

const config = require('./config');

const rekog = new REKOG(config.region);

async function createRekogCollection(collectionId) {
  try {
    await rekog.createCollection(collectionId);
  } catch (err) {
    if (err.message.match(/already exists/)) {
      console.log(`Skipping creation of collection: ${collectionId} as it already exists`);
      return;
    }
    throw err;
  }
}

async function importTargetImagesToCollection(imageNames, collectionId) {
  const imageIds = [];
  for await (const imageName of imageNames) {
    const imageBuffer = await downloader.targetImage(imageName);
    const imageId = await rekog.importImageToCollection(collectionId, imageBuffer);
    imageIds.push(imageId);
  }

  return imageIds;
}

async function main() {
  // create collection for all images
  const collectionId = 'celebrities';
  await createRekogCollection(collectionId);

  const elonImageBuffer = await downloader.sourceImage('elon.jpeg');
  const elonIndexes = await rekog.indexFace(collectionId, elonImageBuffer); // add elon musk face to collection

  const targetImageList = ['elon_fam.jpeg'];
  const imageIds = await importTargetImagesToCollection(targetImageList, collectionId);

  // const source = await rekog.listFaces(sourceCollectionId);
  // console.log(source);
  // const target = await rekog.listFaces(targetCollectionId);
  // console.log(target);

  const response = await rekog.searchFaces(collectionId, elonIndexes.faceId);
  console.log(JSON.stringify(response));
}

main();
