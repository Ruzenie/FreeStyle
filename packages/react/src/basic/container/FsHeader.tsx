import type {
  CSSProperties,
  HTMLAttributes,
  ReactNode
} from 'react';
import {
  createHeaderStyles,
  createNamespace
} from '@freestyle/core';

export interface HeaderProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  height?: number | string;
  paddingX?: number | string;
  paddingY?: number | string;
  border?: boolean;
  backgroundColor?: string;
  fsStyle?: CSSProperties;
}

const ns = createNamespace('header');

export function FsHeader(props: HeaderProps) {
  const {
    children,
    height,
    paddingX,
    paddingY,
    border,
    backgroundColor,
    fsStyle,
    style,
    className,
    ...rest
  } = props;

  const baseStyle = createHeaderStyles({
    height,
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
    <header
      {...rest}
      className={mergedClassName}
      style={mergedStyle}
    >
      {children}
    </header>
  );
}

