import { WorkDirFn } from './types';

import { cwd } from 'node:process';
import path from 'node:path';

export const workDir: WorkDirFn = (joinPath) => {
  if (!joinPath) {
    return cwd();
  }

  return path.join(cwd(), joinPath);
};

export const getFilename = (filepath: string) => {
  return filepath.split('/').pop() || null;
};
