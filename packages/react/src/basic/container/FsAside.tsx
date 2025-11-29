import type {
  CSSProperties,
  HTMLAttributes,
  ReactNode
} from 'react';
import {
  createAsideStyles,
  createNamespace
} from '@freestyle/core';

export interface AsideProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  width?: number | string;
  paddingX?: number | string;
  paddingY?: number | string;
  border?: boolean;
  backgroundColor?: string;
  fsStyle?: CSSProperties;
}

const ns = createNamespace('aside');

export function FsAside(props: AsideProps) {
  const {
    children,
    width,
    paddingX,
    paddingY,
    border,
    backgroundColor,
    fsStyle,
    style,
    className,
    ...rest
  } = props;

  const baseStyle = createAsideStyles({
    width,
    paddingX,
    paddingY,
    border,
    backgroundColor
  });

  const mergedStyle: CSSProperties = {
    ...baseStyle,
    ...(fsStyle ?? {}),
    ...style
  };

  const mergedClassName = [ns.bem(), className].filter(Boolean).join(' ');

  return (
    <aside
      {...rest}
      className={mergedClassName}
      style={mergedStyle}
    >
      {children}
    </aside>
  );
}

