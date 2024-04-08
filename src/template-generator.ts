import type { Template, TemplateConfig, Prompt, PromptBuilt, Answers, GeneratorFn } from './types';
import Enquirer from 'enquirer';
import { map } from 'lodash-es';

const { prompt } = Enquirer;

const getPrompts = (template: Template): PromptBuilt[] => {
  return map(template.prompts, ({ type, message }: Prompt, prop: string) => ({
    name: prop,
    type,
    message,
  }));
};

const askForAnswers = async (prompts: PromptBuilt[]) => {
  return (await prompt(prompts as any)) as Answers;
};

const askForTemplate = async (config: TemplateConfig) => {
  const { template } = await prompt<{ template: Template }>({
    name: 'template',
    message: 'Choose a template',
    type: 'autocomplete',
    choices: config.templates.map((template) => ({
      name: template.name,
      value: template,
    })),
  });

  return template;
};

const templateGenerator: GeneratorFn = async (config: TemplateConfig) => {
  const template = await askForTemplate(config);
  const prompts = getPrompts(template);
  const answers = await askForAnswers(prompts);

  return { template, prompts, answers };
};

export default templateGenerator;
