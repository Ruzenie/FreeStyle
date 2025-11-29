/** cspell configuration for the FreeStyle monorepo */
module.exports = {
  version: '0.2',
  language: 'en',
  allowCompoundWords: true,
  dictionaries: ['en-us', 'softwareTerms'],
  ignorePaths: [
    'dist',
    'node_modules',
    'coverage',
    'pnpm-lock.yaml',
    'package-lock.json',
    'yarn.lock',
    '.git',
    '.vscode'
  ],
  files: [
    'packages/**/*.{ts,tsx,js,jsx,vue,md,scss,css}',
    'examples/**/*.{ts,tsx,js,jsx,vue,md,scss,css}',
    '*.md'
  ],
  words: [
    'freestyle',
    'FsButton',
    'vitest',
    'pnpm',
    'tsconfig',
    'rollup',
    'jsx'
  ]
};

