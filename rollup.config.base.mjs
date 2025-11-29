import { defineConfig } from 'rollup';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';

// Shared Rollup config used by all packages
export default defineConfig({
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.cjs',
      format: 'cjs',
      sourcemap: true
    },
    {
      file: 'dist/index.mjs',
      format: 'esm',
      sourcemap: true
    }
  ],
  plugins: [
    resolve(),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json'
    }),
    postcss({
      extract: true,
      // Use global class names so BEM-style strings like `fs-button` work as-is
      modules: false,
      use: {
        sass: {}
      }
    })
  ],
  external: [
    // add framework deps in each package rollup config if needed
  ]
});
