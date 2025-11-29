import type {
  CSSProperties,
  HTMLAttributes,
  ReactNode
} from 'react';
import {
  createNamespace,
  createNavBarStyles
} from '@freestyle/core';

export interface NavBarProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  /**
   * Height of the top navigation bar.
   */
  height?: number | string;
  /**
   * Background color of the bar.
   */
  backgroundColor?: string;
  /**
   * Whether to show a bottom border.
   */
  border?: boolean;
  /**
   * Design-level style override (merged after computed styles).
   */
  fsStyle?: CSSProperties;
}

const ns = createNamespace('nav-bar');

export function FsNavBar(props: NavBarProps) {
  const {
    children,
    height,
    backgroundColor,
    border,
    fsStyle,
    style,
    className,
    ...rest
  } = props;

  const baseStyle = createNavBarStyles({
    height,
    backgroundColor,
    border
  }) as CSSProperties;

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
