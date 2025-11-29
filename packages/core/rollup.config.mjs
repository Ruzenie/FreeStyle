import baseConfig from '../../rollup.config.base.mjs';

export default {
  ...baseConfig,
  external: [
    ...(Array.isArray(baseConfig.external) ? baseConfig.external : []),
    // add shared external deps here
  ]
};

