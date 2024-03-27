#!/usr/bin/env node
export type { TemplatesConfig } from './types';
import {
  AskForTemplateFn,
  BuildTemplatePromptsFn,
  GetConfigFn,
  Template,
  TemplatePromptBuilt,
  TemplatesConfig,
} from './types';
import { workDir } from './utils';
import Enquirer from 'enquirer';
import Handlebars from 'handlebars';
import fs from 'node:fs/promises';

const { prompt } = Enquirer;

const getConfig: GetConfigFn = async (filepath) => {
  const { default: config } = (await import(filepath)) as { default: TemplatesConfig };

  return config;
};

const askForTemplate: AskForTemplateFn = async (templates) => {
  const { template } = await prompt<{ template: Template }>({
    name: 'template',
    message: 'Choose a template',
    type: 'autocomplete',
    choices: templates.map((template) => ({
      name: template.name,
      value: template,
    })),
  });

  return template;
};

const buildTemplatePrompts: BuildTemplatePromptsFn = (template) => {
  const prompts: TemplatePromptBuilt[] = [];

  for (const prop in template.prompts) {
    const { type, message } = template.prompts[prop];

    prompts.push({
      name: prop,
      type,
      message,
    });
  }

  return prompts;
};

const getFilename = (filepath: string, answers: object) => {
  const filename = filepath.split('\\').pop()?.split('/').pop()?.replace('.template', '');

  return filename?.replace('{name}', answers.name);
};

(async () => {
  const filepath = workDir('templates.config.js');
  const config = await getConfig(filepath);
  const templates = config.templates;

  const template = await askForTemplate(templates);
  const questions = buildTemplatePrompts(template);

  const answer = await prompt(questions as any);

  const templateFile = workDir(template.source);
  const filename = getFilename(template.source, answer);
  const dest = workDir(template.dest);
  const templateContent = await fs.readFile(templateFile, 'utf-8');

  const handlebarsTemplate = Handlebars.compile(templateContent);
  const compiledTemplate = handlebarsTemplate(answer);
  // console.log(dest + '/' + filename);

  fs.writeFile(dest + '/' + filename, compiledTemplate);
})();
