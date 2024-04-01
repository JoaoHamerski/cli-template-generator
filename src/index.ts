#!/usr/bin/env node
export type { TemplatesFileConfig } from './types';
import templateConfig from './template-config';
import TemplateGenerator from './TemplateGenerator';

const execute = async () => {
  const config = await templateConfig();

  const generator = new TemplateGenerator(config);
  await generator.askForTemplate();
  await generator.askForPrompts();

  const builder = generator.build();

  builder.createTemplate();
};

(async () => {
  try {
    await execute();
  } catch (e) {
    //
  }
})();
