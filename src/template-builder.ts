import type { Answers, Generator, Template } from './types';
import fs from 'node:fs';
import path from 'node:path';
import { getFilename, workDir } from './utils';
import { compile } from './utils';

const getCompiledTemplate = (generator: Generator) => {
  const templateRaw = fs.readFileSync(generator.template.source, 'utf8');

  return compile(templateRaw, generator.answers);
};

const getCompiledFilename = (source: string, answers: Answers) => {
  return compile(getFilename(source), answers).replace('.template', '');
};

const buildConfig = (template: Template, answers: Answers) => {
  const filename = getCompiledFilename(template.source, answers);
  const destPath = workDir(template.dest);
  const destFilepath = path.join(destPath, filename);

  return {
    destPath,
    destFilepath,
  };
};

const buildTemplate = (generator: Generator) => {
  const { destPath, destFilepath } = buildConfig(generator.template, generator.answers);

  const compiledTemplate = getCompiledTemplate(generator);

  if (!fs.existsSync(destPath)) {
    fs.mkdirSync(destPath);
  }

  fs.writeFileSync(destFilepath, compiledTemplate);
};

export default buildTemplate;
