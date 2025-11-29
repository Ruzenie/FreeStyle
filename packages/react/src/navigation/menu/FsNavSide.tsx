import type {
  CSSProperties,
  HTMLAttributes,
  ReactNode
} from 'react';
import {
  createNamespace,
  createNavSideStyles
} from '@freestyle/core';

export interface NavSideProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  /**
   * Width of the side navigation.
   */
  width?: number | string;
  /**
   * Background color.
   */
  backgroundColor?: string;
  /**
   * Whether to show a right border.
   */
  border?: boolean;
  /**
   * Design-level style override (merged after computed styles).
   */
  fsStyle?: CSSProperties;
}

const ns = createNamespace('nav-side');

export function FsNavSide(props: NavSideProps) {
  const {
    children,
    width,
    backgroundColor,
    border,
    fsStyle,
    style,
    className,
    ...rest
  } = props;

  const baseStyle = createNavSideStyles({
    width,
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
    <aside
      {...rest}
      className={mergedClassName}
      style={mergedStyle}
    >
      {children}
    </aside>
  );
}
