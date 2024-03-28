export type WorkDirFn = (joinPath?: string) => string;

export interface Prompt {
  type: 'input' | 'autocomplete';
  message?: string;
  options?: string[];
}

export type Answer = Record<string, string>;

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

export type TemplateConfigFn = () => Promise<TemplateConfig>;
export type TemplateConfig = {
  filepath: string;
  templates: Template[];
};

export type TemplateGeneratorFn = () => Promise<TemplateGenerator>;
export type TemplateGenerator = {
  config: TemplateConfig;
  template: Template | null;
  askForTemplate: AskForTemplateFn;
};

// Functions
type GetConfigFn = (filepath: string) => Promise<TemplatesFileConfig>;
type AskForTemplateFn = (templates: Template[]) => Promise<Template>;
type BuildTemplatePromptsFn = (template: Template) => PromptBuilt[];
type GetFilenameFn = (filepath: string) => string;
