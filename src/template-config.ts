import type { TemplatesFileConfig } from './types';
import { workDir } from './utils';

const templateConfig = async () => {
  const filepath = workDir('templates.config.js');
  const configFile = (await import(filepath)) as { default: TemplatesFileConfig };
  const {
    default: { templates },
  } = configFile;

  return {
    filepath,
    templates,
  };
};

export default templateConfig;
