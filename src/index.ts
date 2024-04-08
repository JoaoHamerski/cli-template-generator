#!/usr/bin/env node
export type { TemplatesFileConfig } from './types';
import templateGenerator from './template-generator';
import buildTemplate from './template-builder';
import templateConfig from './template-config';
import { validate } from './validation';

const execute = async () => {
  const config = await templateConfig();
  const generator = await templateGenerator(config);

  buildTemplate(generator);
};

(async () => {
  await validate();
  await execute();
})();
