import TemplateGenerator from './TemplateGenerator';
import { getFilename, workDir } from './utils';
import Handlebars from 'handlebars';

const compile = (input: string, data: any) => {
  return Handlebars.compile(input)(data);
};

export default class TemplateBuilder {
  generator: TemplateGenerator;

  constructor(generator: TemplateGenerator) {
    this.generator = generator;
  }

  get dest() {
    return workDir(this.generator.template?.dest);
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
