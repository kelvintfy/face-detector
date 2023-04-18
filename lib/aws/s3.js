/* eslint-disable no-restricted-syntax */
const { S3Client, GetObjectCommand, PutObjectCommand } = require('@aws-sdk/client-s3');

class S3 {
  constructor(region) {
    this.client = new S3Client(region);
  }

  async get(bucket, key) {
    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: key,
    });
    const response = await this.client.send(command);
    const chunks = [];
    for await (const chunk of response.Body) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);
    return buffer;
  }

  async put(bucket, key) { // TODO
    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
    });
    return this.client.send(command);
  }
}

module.exports = S3;
