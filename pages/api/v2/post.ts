import { NextApiRequest, NextApiResponse, PageConfig } from 'next';
import getRawBody from 'raw-body';

import { corsMiddleware } from '../../../src/server/corsMiddleware';
import { errorMiddleware } from '../../../src/server/errorMiddleware';
import { httpMethodRouter } from '../../../src/server/httpMethodRouter';
import { makeHash } from '../../../src/server/makeHash';
import { get, put } from '../../../src/server/s3';

function hexadecimalToDecimal(hexadecimal: string) {
  // See https://stackoverflow.com/a/53751162
  const bigInt = BigInt(`0x${hexadecimal}`);
  return bigInt.toString(10);
}

function makeAbsoluteUrl(req: NextApiRequest, id: string) {
  const protocol = req.headers['x-forwarded-proto'];
  const host = req.headers.host;
  return `${protocol}://${host}/api/v2/${id}`;
}

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};

export default errorMiddleware(
  corsMiddleware(
    httpMethodRouter({
      POST: async (req: NextApiRequest, res: NextApiResponse) => {
        // See https://github.com/excalidraw/excalidraw-json/blob/040e45b/main/api/v2/hash.py#L16-L32
        const buffer = await getRawBody(req, {
          // Default Next.js limit
          // https://github.com/vercel/next.js/blob/15cdb4f/packages/next/next-server/server/api-utils.ts
          limit: '1mb',
        });

        const drawingHash = makeHash(buffer);
        const id = hexadecimalToDecimal(drawingHash);

        const drawing = await get(id);
        if (!drawing) {
          await put(id, buffer);
        }

        res.status(200).json({ id, data: makeAbsoluteUrl(req, id) });
      },
    }),
  ),
);
