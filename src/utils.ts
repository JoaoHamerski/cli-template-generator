import type { GetFilenameFn, WorkDirFn } from './types';

import { cwd } from 'node:process';
import path from 'node:path';
import Handlebars from 'handlebars';

export const workDir: WorkDirFn = (...joinPaths) => {
  if (!joinPaths.length) {
    return cwd();
  }

  return path.join(cwd(), ...joinPaths);
};

export const getFilename: GetFilenameFn = (filepath: string) =>
  filepath.split('/').pop() || filepath;

export const compile = (input: string, data: any) => {
  return Handlebars.compile(input)(data);
};

export const getDir = (filepath: string) => {
  return filepath.substring(0, filepath.lastIndexOf('/'));
};
