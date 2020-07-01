import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { isBoom } from '@hapi/boom';

export function errorMiddleware<Request extends NextApiRequest, T = any>(
  handler: (
    req: Request,
    res: NextApiResponse<T>,
  ) => ReturnType<NextApiHandler>,
): (req: Request, res: NextApiResponse<T>) => ReturnType<NextApiHandler> {
  return async (req, res) => {
    try {
      return await handler(req, res);
    } catch (error) {
      if (!isBoom(error)) {
        throw error;
      }

      const { statusCode, payload } = error.output;

      res.status(statusCode);
      res.json(payload as any);
    }
  };
}
