import type { Template, TemplateConfig, Prompt, PromptBuilt, Answers } from './types';
import Enquirer from 'enquirer';
import { map } from 'lodash-es';
import TemplateBuilder from './TemplateBuilder';

const { prompt } = Enquirer;

export default class TemplateGenerator {
  config: TemplateConfig;
  template: Template | null;
  answers: Answers | null;

  constructor(config: TemplateConfig) {
    this.config = config;
    this.template = null;
    this.answers = null;
  }

  async askForTemplate() {
    const { template } = await prompt<{ template: Template }>({
      name: 'template',
      message: 'Choose a template',
      type: 'autocomplete',
      choices: this.config.templates.map((template) => ({
        name: template.name,
        value: template,
      })),
    });

    this.template = template;

    return this;
  }

  async askForPrompts() {
    this.answers = await prompt(this.prompts as any);

    return this;
  }

  get prompts(): PromptBuilt[] {
    if (!this.template) {
      return [];
    }

    return map(this.template.prompts, ({ type, message }: Prompt, prop: string) => ({
      name: prop,
      type,
      message,
    }));
  }

  build() {
    return new TemplateBuilder(this);
  }
}
