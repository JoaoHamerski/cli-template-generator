import TemplateGenerator from './TemplateGenerator';
import { getFilename, getFilepathDir, workDir } from './utils';
import fs from 'node:fs';
import { compile } from './utils';

export default class TemplateBuilder {
  generator: TemplateGenerator;

  constructor(generator: TemplateGenerator) {
    this.generator = generator;
  }

  createTemplate() {
    const destDir = getFilepathDir(this.dest!);

    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir);
    }

    fs.writeFileSync(this.dest!, this.compiledTemplate!);
  }

  get compiledTemplate() {
    if (!this.generator.template) {
      return null;
    }

    const templateText = fs.readFileSync(this.generator.template.source, 'utf8');

    return compile(templateText, this.generator.answers);
  }

  get dest() {
    const destination = this.generator.template?.dest;

    if (!destination) {
      return null;
    }

    if (!this.filename) {
      return destination;
    }

    return workDir(this.generator.template!.dest, this.filename);
  }

  get filename() {
    const source = this.generator.template?.source;
    const sourceFilename = getFilename(source!);

    if (!sourceFilename) {
      return null;
    }

    return compile(sourceFilename, this.generator.answers).replace('.template', '');
  }
}
