#!/usr/bin/env node
export type { TemplatesFileConfig as TemplatesConfig } from './types';
import templateConfig from './template-config';
import TemplateGenerator from './TemplateGenerator';

(async () => {
  const config = await templateConfig();
  const generator = new TemplateGenerator(config);

  await generator.askForTemplate();
  await generator.askForPrompts();

  const builder = generator.build();

  console.log(builder.createTemplate());
})();
