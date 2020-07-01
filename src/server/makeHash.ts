// Copied from https://github.com/yarnpkg/berry/blob/c2c97ec/packages/yarnpkg-core/sources/hashUtils.ts

import { createHash } from 'crypto';

export function makeHash<T extends string = string>(
  ...args: Array<string | Buffer | null>
): T {
  const hash = createHash('sha512');

  for (const arg of args) hash.update(arg ? arg : '');

  return hash.digest('hex') as T;
}
