export type WorkDirFn = (joinPath?: string) => string;

export interface TemplatePrompt {
  type: 'input' | 'autocomplete';
  message?: string;
  options?: string[];
}

export interface TemplatePromptBuilt extends TemplatePrompt {
  name: string;
}

export interface Template {
  dest: string;
  name: string;
  source: string;
  prompts: Record<string, TemplatePrompt>;
}

export interface TemplatesConfig {
  templates: Template[];
}

// Functions
type GetConfigFn = (filepath: string) => Promise<TemplatesConfig>;
type AskForTemplateFn = (templates: Template[]) => Promise<Template>;
type BuildTemplatePromptsFn = (template: Template) => TemplatePromptBuilt[];
