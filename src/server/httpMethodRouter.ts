import { methodNotAllowed } from '@hapi/boom';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

// See https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods
export type HttpMethods =
  | 'GET'
  | 'HEAD'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'CONNECT'
  | 'OPTIONS'
  | 'TRACE'
  | 'PATCH';

export type RouterMap<
  Request extends NextApiRequest = NextApiRequest,
  Response = any
> = Partial<
  Record<
    HttpMethods,
    (req: Request, res: NextApiResponse<Response>) => ReturnType<NextApiHandler>
  >
>;

// See https://github.com/jamo/micro-method-router/blob/3c355c2/index.js
export function httpMethodRouter<
  Request extends NextApiRequest = NextApiRequest,
  Response = any
>(
  map: RouterMap<Request, Response>,
): (
  req: Request,
  res: NextApiResponse<Response>,
) => ReturnType<NextApiHandler> {
  const defaultMap: RouterMap = {
    OPTIONS: (_req, res) => {
      res.setHeader('Allow', allowedVerbs);
      res.end();
    },
  };
  const finalMap = { ...defaultMap, ...map };
  const allowedVerbs = Object.keys(finalMap)
    .map((v) => v.toUpperCase())
    .join(', ');

  return (req, res) => {
    const method = (req.method ?? 'GET').toUpperCase() as HttpMethods;

    const fn = finalMap[method];
    if (!fn) {
      res.setHeader('Allow', allowedVerbs);
      throw methodNotAllowed(`Method ${method} not allowed.`);
    }

    return fn(req, res);
  };
}
