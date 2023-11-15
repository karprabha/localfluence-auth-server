module.exports = {
    extends: [
        'plugin:prettier/recommended',
        'prettier',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    ignorePatterns: [".eslintrc.cjs"],
    parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        project: 'tsconfig.json',
    },
    env: {
        es2020: true,
        Bun: true
    },
    root: true,
};