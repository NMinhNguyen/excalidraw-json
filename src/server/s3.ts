import AWS from 'aws-sdk';

const BUCKET_NAME = process.env.EXCALIDRAW_S3_BUCKET_NAME!;

const s3Config: AWS.S3.ClientConfiguration = {
  accessKeyId: process.env.EXCALIDRAW_S3_ACCESS_KEY_ID,
  endpoint: process.env.EXCALIDRAW_S3_ENDPOINT,
  secretAccessKey: process.env.EXCALIDRAW_S3_SECRET_ACCESS_KEY,
};

if (process.env.EXCALIDRAW_S3_FORCE_PATH_STYLE === 'true') {
  s3Config.s3ForcePathStyle = true;
}

const s3 = new AWS.S3(s3Config);

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
