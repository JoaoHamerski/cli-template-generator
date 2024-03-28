import type { PromptBuilt, TemplatesFileConfig, Template } from './template';

export type GetConfigFn = (filepath: string) => Promise<TemplatesFileConfig>;
export type AskForTemplateFn = (templates: Template[]) => Promise<Template>;
export type BuildTemplatePromptsFn = (template: Template) => PromptBuilt[];
export type GetFilenameFn = (filepath: string) => string;
export type WorkDirFn = (...joinPath: string[]) => string;
