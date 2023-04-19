/* eslint-disable max-len */
const {
  RekognitionClient,
  CreateCollectionCommand,
  IndexFacesCommand,
  ListFacesCommand,
  SearchFacesCommand,
} = require('@aws-sdk/client-rekognition');

class REKOG {
  constructor(region) {
    this.client = new RekognitionClient(region);
  }

  async createCollection(collectionId) {
    const command = new CreateCollectionCommand({
      CollectionId: collectionId,
    });

    return this.client.send(command);
  }

  async indexFace(collectionId, imageBuffer) {
    const command = new IndexFacesCommand({
      CollectionId: collectionId,
      Image: {
        Bytes: imageBuffer,
      },
    });

    const response = await this.client.send(command);
    if (!response.FaceRecords) throw new Error('Invalid response from AWS Rekognition IndexFacesCommand');
    if (response.FaceRecords.length > 1) throw new Error('More than one face is detected when running AWS Rekognition IndexFacesCommand');

    return {
      faceId: response.FaceRecords[0].Face.FaceId,
      imageId: response.FaceRecords[0].Face.ImageId,
    };
  }

  async importImageToCollection(collectionId, imageBuffer) {
    const command = new IndexFacesCommand({
      CollectionId: collectionId,
      Image: {
        Bytes: imageBuffer,
      },
    });

    const response = await this.client.send(command);
    if (!response.FaceRecords) throw new Error('Invalid response from AWS Rekognition IndexFacesCommand');

    return response.FaceRecords[0].Face.ImageId;
  }

  async listFaces(collectionId) {
    const command = new ListFacesCommand({
      CollectionId: collectionId,
    });

    return this.client.send(command);
  }

  async searchFaces(collectionId, faceId) {
    const command = new SearchFacesCommand({
      CollectionId: collectionId,
      FaceId: faceId,
    });

    return this.client.send(command);
  }
}

module.exports = REKOG;
