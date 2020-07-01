import AWS from 'aws-sdk';

export async function getS3Config(): Promise<
  Pick<
    AWS.S3.ClientConfiguration,
    'accessKeyId' | 'endpoint' | 'secretAccessKey' | 'params'
  >
> {
  return {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    endpoint: process.env.S3_ENDPOINT,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    params: {
      Bucket: process.env.S3_BUCKET_NAME,
    },
  };
}
