import { WorkDirFn } from './types';

import { cwd } from 'node:process';
import path from 'node:path';

export const workDir: WorkDirFn = (...joinPaths) => {
  if (!joinPaths.length) {
    return cwd();
  }

  return path.join(cwd(), ...joinPaths);
};

export const getFilename = (filepath: string) => {
  return filepath.split('/').pop() || null;
};
