module.exports = {
  extends: ['next/core-web-vitals'],
  overrides: [
    {
      files: ['./{src/,}{pages,app}/**/*.{ts,tsx}'],
      rules: {
        'import/no-default-export': 'off',
      },
    },
  ],
};
