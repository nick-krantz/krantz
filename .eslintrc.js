module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',

    // Make sure this is last
    'plugin:prettier/recommended'
  ],
  plugins: [
    '@typescript-eslint',
    'import'
  ],

  "settings": {
    react: {
      version: 'detect'
    },
    "import/resolver": {
      typescript: {} // this loads <rootdir>/tsconfig.json to eslint
    },

  },
  rules: {
    indent: 0,
    semi: 0,
    singleQuote: 0,
    eqeqeq: [ 'error' ],
    '@typescript-eslint/indent': 0,
    'import/order': [
      'error',
      {
        pathGroups: [
          { pattern: '~/components/**', group: 'internal' },
          { pattern: '~/routes/**', group: 'internal' },
          { pattern: '~/styles/**', group: 'internal' },
          { pattern: '~/utils/**', group: 'internal' },
        ],
        pathGroupsExcludedImportTypes: [],
        groups: [ 'builtin', 'unknown', 'external', 'internal', 'parent', 'sibling', 'index' ],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        }
      }
    ]
  }
}
