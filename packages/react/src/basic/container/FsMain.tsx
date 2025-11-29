import type {
  CSSProperties,
  HTMLAttributes,
  ReactNode
} from 'react';
import {
  createMainStyles,
  createNamespace
} from '@freestyle/core';

export interface MainProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  paddingX?: number | string;
  paddingY?: number | string;
  backgroundColor?: string;
  fsStyle?: CSSProperties;
}

const ns = createNamespace('main');

export function FsMain(props: MainProps) {
  const {
    children,
    paddingX,
    paddingY,
    backgroundColor,
    fsStyle,
    style,
    className,
    ...rest
  } = props;

  const baseStyle = createMainStyles({
    paddingX,
    paddingY,
    backgroundColor
  });

  const mergedStyle: CSSProperties = {
    ...baseStyle,
    ...(fsStyle ?? {}),
    ...style
  };

  const mergedClassName = [ns.bem(), className].filter(Boolean).join(' ');

  return (
    <main
      {...rest}
      className={mergedClassName}
      style={mergedStyle}
    >
      {children}
    </main>
  );
}

