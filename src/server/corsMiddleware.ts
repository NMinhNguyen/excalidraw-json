import Cors from 'cors';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

const cors = Cors({
  origin: [
    /^http:\/\/localhost:/,
    // TODO allow this to be customised
  ],
});

export function corsMiddleware<
  Request extends NextApiRequest = NextApiRequest,
  Response = any
>(
  fn: (
    req: Request,
    res: NextApiResponse<Response>,
  ) => ReturnType<NextApiHandler>,
): (
  req: Request,
  res: NextApiResponse<Response>,
) => ReturnType<NextApiHandler> {
  return async (req, res) => {
    await new Promise((resolve, reject) => {
      cors(
        // @ts-ignore
        req,
        res,
        (result: Error) => {
          if (result) {
            return reject(result);
          }
          resolve();
        },
      );
    });

    return fn(req, res);
  };
}
