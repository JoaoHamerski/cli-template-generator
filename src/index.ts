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

(async () => {
  const filepath = workDir('templates.config.js');
  const config = await getConfig(filepath);
  const templates = config.templates;

  const template = await askForTemplate(templates);
  const questions = buildTemplatePrompts(template);

  const answer = await prompt(questions as any);

  console.log(answer);
})();
