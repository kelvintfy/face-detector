const { RekognitionClient, CompareFacesCommand } = require('@aws-sdk/client-rekognition');

class REKOG {
  constructor(region) {
    this.client = new RekognitionClient(region);
  }

  async compareFaces(sourceB64, targetB64) {
    const command = new CompareFacesCommand({
      SourceImage: {
        Bytes: sourceB64,
      },
      TargetImage: {
        Bytes: targetB64,
      },
    });

    const response = await this.client.send(command);
    return response;
  }
}

module.exports = REKOG;
