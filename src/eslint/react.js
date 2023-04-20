module.exports = {
  extends: ['react-app', 'plugin:testing-library/react', 'plugin:jsx-a11y/strict'],
  plugins: ['testing-library', 'jsx-a11y'],
  settings: {
    react: {
      version: 'detect',
    },
    'testing-library/utils-module': 'tests/utils',
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/display-name': 'off',
    'react/self-closing-comp': [
      'error',
      {
        component: true,
        html: true,
      },
    ],
    // ts
    'react/prop-types': 'off',
    'react/jsx-curly-brace-presence': [
      'error',
      {
        children: 'ignore',
        props: 'never',
      },
    ],
    'react-hooks/exhaustive-deps': [
      'error',
      { enableDangerousAutofixThisMayCauseInfiniteLoops: true },
    ],
  },
};
