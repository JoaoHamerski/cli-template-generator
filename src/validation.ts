import fs from 'node:fs';
import path from 'node:path';
import { workDir } from './utils';
import Enquirer from 'enquirer';
import templateConfig from './template-config';

const { prompt } = Enquirer;

const writeBaseTemplate = () => {
  const baseConfigFilepath = path.join(__dirname, 'base-config.template');
  const baseConfigRaw = fs.readFileSync(baseConfigFilepath, 'utf8');

  fs.writeFileSync(workDir('templates.config.js'), baseConfigRaw);

  console.log('Base config file created!');
};

const promptConfigCreation = async () => {
  const { confirmation } = await prompt<{ confirmation: boolean }>({
    type: 'confirm',
    message: 'Would you like to create it?',
    name: 'confirmation',
  });

  return confirmation;
};

const configFileExists = async () => {
  try {
    await templateConfig();
    return true;
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code === 'ERR_MODULE_NOT_FOUND') {
      console.log('Config file not found!');
    }

    return false;
  }
};

const configHasTemplate = async () => {
  const config = await templateConfig();

  return !!config.templates.length;
};

export const validate = async () => {
  if (!(await configFileExists())) {
    if (await promptConfigCreation()) {
      writeBaseTemplate();
    }

    process.exit();
  }

  if (!(await configHasTemplate())) {
    console.log('No templates found in your config file');
    process.exit();
  }
};
