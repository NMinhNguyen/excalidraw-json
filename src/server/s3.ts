import AWS from 'aws-sdk';

import { once } from '../once';
import { getS3Config } from './getS3Config';

const getS3 = once(async function getS3() {
  return new AWS.S3(await getS3Config());
});

export async function get(id: string) {
  try {
    const objectParams = {
      Key: id,
    };
    const data = await (await getS3())
      // @ts-expect-error
      .getObject(objectParams)
      .promise();
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
  };
  return (
    (await getS3())
      // @ts-expect-error
      .putObject(objectParams)
      .promise()
  );
}
