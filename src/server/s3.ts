import AWS from 'aws-sdk';

const BUCKET_NAME = process.env.EXCALIDRAW_S3_BUCKET_NAME!;

const s3 = new AWS.S3({
  accessKeyId: process.env.EXCALIDRAW_S3_ACCESS_KEY_ID,
  endpoint: process.env.EXCALIDRAW_S3_ENDPOINT,
  secretAccessKey: process.env.EXCALIDRAW_S3_SECRET_ACCESS_KEY,
});

export async function get(id: string) {
  try {
    const objectParams = {
      Key: id,
      Bucket: BUCKET_NAME,
    };
    const data = await s3.getObject(objectParams).promise();
    return data.Body;
  } catch (error) {
    if (error.code === 'NoSuchKey') {
      return null;
    }
    throw error;
  }
}

export async function put(id: string, body: string | Buffer) {
  const objectParams = {
    Key: id,
    Body: body,
    Bucket: BUCKET_NAME,
  };
  return s3.putObject(objectParams).promise();
}
