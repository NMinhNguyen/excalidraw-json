import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';

const REGEX_PREFIX = 'regex:';

function getOrigins() {
  const origins = (process.env.EXCALIDRAW_ALLOWED_ORIGIN ?? '')
    .trim()
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)
    .map((origin) =>
      origin.startsWith(REGEX_PREFIX)
        ? new RegExp(origin.slice(REGEX_PREFIX.length))
        : origin,
    );

  return [/^http:\/\/localhost:/, ...origins];
}

const cors = Cors({
  origin: getOrigins(),
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
