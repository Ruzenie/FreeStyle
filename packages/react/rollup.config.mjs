import baseConfig from '../../rollup.config.base.mjs';

export default {
  // Inherit shared config first, then override as needed
  ...baseConfig,
  // React bindings entry file uses TSX
  input: 'src/index.tsx',
  external: [
    ...(Array.isArray(baseConfig.external) ? baseConfig.external : []),
    'react',
    'react-dom',
    '@freestyle/core',
    '@freestyle/icons'
  ]
};
