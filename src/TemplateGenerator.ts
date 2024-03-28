import { Template, TemplateConfig, Prompt, PromptBuilt, Answer } from './types';
import Enquirer from 'enquirer';
import { map } from 'lodash-es';
import TemplateBuilder from './TemplateBuilder';

const { prompt } = Enquirer;

export default class TemplateGenerator {
  config: TemplateConfig;
  template: Template | null;
  answers: Answer | null;

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
    this.answers = await prompt(this.templatePrompts as any);

    return this;
  }

  build() {
    return new TemplateBuilder(this);
  }

  get templatePrompts(): PromptBuilt[] {
    if (!this.template) {
      return [];
    }

    return map(this.template.prompts, ({ type, message }: Prompt, prop: string) => ({
      name: prop,
      type,
      message,
    }));
  }
}
