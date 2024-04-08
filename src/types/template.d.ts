export interface Prompt {
  type: 'input' | 'autocomplete';
  message?: string;
  options?: string[];
}

export type Answers = Record<string, string>;

export interface PromptBuilt extends Prompt {
  name: string;
}

export interface Template {
  dest: string;
  name: string;
  source: string;
  prompts: Record<string, Prompt>;
}

export interface TemplatesFileConfig {
  templates: Template[];
}

export type TemplateConfig = {
  filepath: string;
  templates: Template[];
};

export type GeneratorFn = (config: TemplateConfig) => Promise<Generator>;
export type Generator = {
  template: Template;
  prompts: PromptBuilt[];
  answers: Answers;
};
