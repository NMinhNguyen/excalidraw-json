import { NextApiRequest, NextApiResponse, PageConfig } from 'next';
import { notFound } from '@hapi/boom';

import { corsMiddleware } from '../../../src/server/corsMiddleware';
import { errorMiddleware } from '../../../src/server/errorMiddleware';
import { httpMethodRouter } from '../../../src/server/httpMethodRouter';
import { get } from '../../../src/server/s3';

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};

export default errorMiddleware(
  corsMiddleware(
    httpMethodRouter({
      GET: async (
        req: NextApiRequest & { query: { id: string } },
        res: NextApiResponse,
      ) => {
        // See https://github.com/excalidraw/excalidraw-json/blob/040e45b/main/api/v2/hash.py#L16-L32

        const { id } = req.query;

        const drawing = await get(id);
        if (!drawing) {
          throw notFound(`Drawing ${id} not found`);
        }

        res.setHeader('Content-Type', 'application/octet-stream');
        res.status(200).send(drawing);
      },
    }),
  ),
);
