# cli-template-generator

This package provides an automated way to generate similar files based on templates, it prompts you the defined occurrences via CLI, and replace it with the answers.

## 🚀 Motivation

I found myself the need of creating similar file structures for some projects, and it felt unproductive to copy/paste and change all occurrences myself. Even though some frameworks like Laravel (Artisan) provide such tools natively, for other projects you might want the same feature but don't want to spend time creating it from scratch.

## 🛠️ Installation

1. Install the package

```
npm i @joaohamerski/cli-template-generator
```

2. Add the script into your `package.json` file:

```json
"scripts": {
  "template-generator": "template-generator"
}
```

3. Run `npm run template-generator` to auto generate a base config file

## 🔍 Example

1. Add an object config in your `templates` array:

```js
// templates.config.js
/** @type {import('@joaohamerski/cli-template-generator').TemplatesFileConfig} */
module.exports = {
  templates: [
    {
      // The name to be shown via CLI 
      name: 'Functions',

      // The destination directory to generate the new file
      dest: './functions',

      // The filepath of our template
      source: './templates/get-{{filename}}.{{extension}}.template',

      // Prompts to be asked, it'll replace {{prop}} by the prop defined here 
      prompts: {
        filename: {
          type: 'input',
          message: 'Type the file name: ',
        },
        function: {
          type: 'input',
          message: 'Type the function name: ',
        },
        extension: {
          type: 'input',
          message: 'Define the file extension: ',
        },
      },
    },
  ],
};
```

2. I'll use a very simple template, where we want to generate a new file, changing the `filename`, `extension` and `function` every time the script is executed:

```js
// get-{{filename}}.{{extension}}.template

import fs from 'node:fs'
import CONSTANTS from '@/constants'

export const get{{function}} = () => {
  //
}
```

3. Now, when you run `npm run template-generator`, it'll ask what template you want to choose and ask the occurrences to be replaced:

- filename: foo
- function: Bar
- extension: js

Generating this file:

```js
// get-foo.js

import fs from 'node:fs';
import CONSTANTS from '@/constants';

export const getBar = () => {
  //
};
```

## API<a name="api"></a>

### templates: Template[]

An array of objects, each object defines a different template config

```js
templates: [
    {
      name: "Controller",
      dest: "./controllers",
      source: "./templates/{{name}}Controller.php.template",
      prompts: {
        name: {
          type: "input",
          message: "Type the controller name: ",
        },
      },
    },
  ],
```

### name: string

The name that will be displayed via CLI as an option to be chosen

### dest: string

The destination folder where the template will be stored

### source: string

The path to the template file to be used

### prompts: Prompt[]

An array of objects, the `prop` of the object must match the occurrence in the template as: `{{prop}}`

### type: "input"

The prompt type

### message: string

The message to display when the prompt request an input

## TODO List

- [ ] Reduce the necessary boilerplate, removing redundant properties on config file
- [ ] Remove some dependencies, providing a native way to them
- [ ] Add more input options: multiple options, boolean (if/else).
- [ ] Add multiple choices of directories when the `dest` prop ends in `*`
