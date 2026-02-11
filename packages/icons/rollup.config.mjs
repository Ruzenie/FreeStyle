import baseConfig from '../../rollup.config.base.mjs';

export default {
  // Inherit shared Rollup configuration (TS + PostCSS, outputs, etc.)
  ...baseConfig,
  external: [
    ...(Array.isArray(baseConfig.external) ? baseConfig.external : [])
    // Icons package is framework-agnostic, no extra externals needed for now.
  ]
};

