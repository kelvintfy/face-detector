const { RekognitionClient, CompareFacesCommand } = require('@aws-sdk/client-rekognition');

class REKOG {
  constructor(region) {
    this.client = new RekognitionClient(region);
  }

  async compareFaces(sourceBuffer, targetBuffer) {
    const command = new CompareFacesCommand({
      SourceImage: {
        Bytes: sourceBuffer,
      },
      TargetImage: {
        Bytes: targetBuffer,
      },
    });

    const response = await this.client.send(command);
    return response;
  }
}

module.exports = REKOG;
