import type { TemplateConfigFn, TemplatesFileConfig } from './types';
import { workDir } from './utils';

const templateConfig: TemplateConfigFn = async () => {
  const filepath = workDir('templates.config.js');
  const { default: config } = (await import(filepath)) as { default: TemplatesFileConfig };

  return {
    filepath,
    templates: config.templates,
  };
};

export default templateConfig;
