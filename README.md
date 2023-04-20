# [@wirby/codestyle](https://www.npmjs.com/package/@wirby/codestyle)

wir.by codestyle tools shared configs

[![npm](https://img.shields.io/npm/v/@wirby/codestyle)](https://www.npmjs.com/package/@wirby/codestyle)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

## Install

```bash
npm i -D @wirby/codestyle
```

## Development

```bash
make release # to push new version & generate changelog
make prerelease # only push new version to npm, for testing
```

## [EditorConfig](https://editorconfig.org)

Create configuration file `.editorconfig` at the root of the project. Insert the following content:

```editorconfig
root = true

[*]
charset = utf-8
end_of_line = lf
indent_size = 2
indent_style = space
insert_final_newline = true
max_line_length = 100
trim_trailing_whitespace = true

[Makefile]
indent_style = tab
```

### ide

If you use Visual Studio Code, install [EditorConfig plugin](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig).

---

## [Prettier](https://prettier.io)

### config

1. Create configuration file `.prettierrc.js` at the root of the project. Insert the following content:

```js
const config = require('@wirby/codestyle/prettier');
module.exports = config;
```

2. Also create file `.prettierignore`, add some ignore patterns:

```gitignore
# ide
.idea/
.vscode/

# npm
node_modules/
package.json
package-lock.json
yarn.lock

# misc
coverage
tsconfig.json

# changelog
*.hbs
CHANGELOG.md
```

### npm

3. Add following lines to yout `package.json`:

```json
{
  "scripts": {
    "format": "prettier --write ."
  }
}
```

4. And then use as `npm run format`

### ide

#### JetBrains IDE

Install [extension](https://plugins.jetbrains.com/plugin/10456-prettier) (It is already bundled to WebStorm).
You can read more information in [Prettier site](https://prettier.io/docs/en/webstorm.html).

#### Visual Studio Code

Install [extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode).
Detailed documentation can be found at the extension page.

---

## [ESLint](https://eslint.org)

1. Create configuration file `.eslintrc.js` at the root of the project. Insert the following content:

```js
module.exports = {
  root: true,
  extends: [
    // choose and enable needed configs
    './node_modules/@wirby/codestyle/eslint/prettier', // prettier first!
    './node_modules/@wirby/codestyle/eslint/base',
    './node_modules/@wirby/codestyle/eslint/typescript',
    './node_modules/@wirby/codestyle/eslint/import',
    // './node_modules/@wirby/codestyle/eslint/next',
    // './node_modules/@wirby/codestyle/eslint/react',
    // './node_modules/@wirby/codestyle/eslint/node',
  ],
};
```

2. Add following lines to your `package.json`:

```json
{
  "scripts": {
    "lint": "eslint . --ext .ts,.tsx,.js,.jsx,.json --fix --cache --max-warnings=0"
  }
}
```

3. Also create file `.eslintignore`, add some ignore patterns:

```gitignore
# ide
.idea/
.vscode/

# npm
**/node_modules/*
package.json
```

4. Add `.eslintcache` to `.gitignore`

---

## Stylelint

TBD

---

## [Conventional Commits](https://www.conventionalcommits.org/)

- We use [Conventional Commits](https://www.conventionalcommits.org/) convention.

- You can use [@commitizen/cz-cli](https://github.com/commitizen/cz-cli) helper, and then call `git-cz`, `git cz` or just `git commit`

```bash
npm i -g commitizen git-cz
```

- All commit messages checked with [commitlint](https://github.com/conventional-changelog/commitlint), feel free to add new `scope`'s and `type`'s to [`changelog.config.js`](https://gitlab.realt.by/frontend/lib/-/blob/master/codestyle/changelog.config.js)

1. add `.cz.json`:

```json
{
  "path": "git-cz"
}
```

2. add `changelog.config.js` and insert following:

```js
const getChangelogConfig = require('@wirby/codestyle/changelog.config');

module.exports = getChangelogConfig({
  scopes: [
    /* additional scopes */
    'auth',
  ],
  types: {
    /* additional types */
    temp: ['🚧', 'temporary changes'],
  },
});
```

3. add `commitlint.config.js` and insert following:

```js
const getCommitlintConfig = require('@wirby/codestyle/commitlint.config');

const czConfig = require('./changelog.config');

module.exports = getCommitlintConfig(czConfig);
```

4. add `.release-it.js`:

```js
module.exports = require('@wirby/codestyle/release-it');
```

5. Add following lines to your `package.json`:

```json
{
  "scripts": {
    "commit": "git-cz",
    "changelog": "auto-changelog -p && git add CHANGELOG.md",
    "release": "release-it"
  }
}
```

6. add badges to `README.md`

```md
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
```

---

## [lint-staged](https://opencollective.com/lint-staged) & [husky](https://typicode.github.io/husky)

1. add `lint-staged.config.js` and insert following:

```js
module.exports = {
  '*.@(js|jsx|ts|tsx)': ['prettier --write', 'eslint --fix'],
};
```

2. add `.husky` folder to `.gitignore`

3. run `npx husky install` in your project root

You can extend current husky hooks, by adding scripts in you package.json:

- "husky:commit-msg": "commitlint --edit $HUSKY_GIT_PARAMS"
- "husky:pre-commit": "lint-staged"
- "husky:pre-push": "npm run type-check"
- "husky:prepare-commit-msg": "exec < /dev/tty && git cz --hook || true"

> Note: If node_modules are installed and you decide to delete the .husky folder
> then you need to delete all node_modules and install them again.
