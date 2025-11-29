// Core exports for framework-agnostic logic (no global CSS here)
export * from './basic/button';
export * from './basic/container';
export * from './navigation';

export function createNamespace(componentName: string) {
  const base = `fs-${componentName}`;
  return {
    name: base,
    bem: (element?: string, modifier?: string) => {
      let cls = base;
      if (element) cls += `__${element}`;
      if (modifier) cls += `--${modifier}`;
      return cls;
    }
  };
}
