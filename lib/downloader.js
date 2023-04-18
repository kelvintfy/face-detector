const S3 = require('./aws/s3');
const config = require('../config');

const s3 = new S3(config.region);

async function sourceImage(image) {
  const path = 'sources/';
  return s3.get(config.bucket, `${path}${image}`);
}

async function targetImage(image) {
  const path = 'targets/';
  return s3.get(config.bucket, `${path}${image}`);
}

module.exports = {
  sourceImage,
  targetImage,
};
