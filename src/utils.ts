import type { WorkDirFn } from './types';

import { cwd } from 'node:process';
import path from 'node:path';
import Handlebars from 'handlebars';

export const workDir: WorkDirFn = (...joinPaths) => {
  if (!joinPaths.length) {
    return cwd();
  }

  return path.join(cwd(), ...joinPaths);
};

export const getFilename = (filepath: string) => {
  return filepath.split('/').pop() || null;
};

export const compile = (input: string, data: any) => {
  return Handlebars.compile(input)(data);
};

export const getFilepathDir = (filepath: string) => {
  return filepath!.substring(0, filepath!.lastIndexOf('/'));
};
