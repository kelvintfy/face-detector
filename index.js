const downloader = require('./lib/downloader');
const REKOG = require('./lib/aws/rekognition');

const config = require('./config');

const rekog = new REKOG(config.region);

async function main() {
  const sourceBuffer = await downloader.sourceImage('elon.jpeg');
  const targetBuffer = await downloader.targetImage('elon_fam.jpeg');
  const response = await rekog.compareFaces(sourceBuffer, targetBuffer);
  console.log(JSON.stringify(response));
}

main();
