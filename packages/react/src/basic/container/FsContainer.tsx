import type {
  CSSProperties,
  HTMLAttributes,
  ReactNode
} from 'react';
import { createContainerStyles, createNamespace } from '@freestyle/core';

export interface ContainerProps
  extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  /**
   * When true, container spans full width (no maxWidth constraint).
   */
  fullWidth?: boolean;
  /**
   * Max content width (ignored when fullWidth is true).
   */
  maxWidth?: number | string;
  /**
   * Horizontal padding (left/right).
   */
  paddingX?: number | string;
  /**
   * Vertical padding (top/bottom).
   */
  paddingY?: number | string;
  /**
   * Horizontal alignment: centered (default) or left-aligned.
   */
  align?: 'left' | 'center';
  /**
   * Custom design-level style override (merged after computed styles).
   */
  fsStyle?: CSSProperties;
}

const ns = createNamespace('container');

export function FsContainer(props: ContainerProps) {
  const {
    children,
    fullWidth,
    maxWidth,
    paddingX,
    paddingY,
    align,
    fsStyle,
    style,
    className,
    ...rest
  } = props;

  const baseStyle = createContainerStyles({
    fullWidth,
    maxWidth,
    paddingX,
    paddingY,
    align
  });

  const mergedStyle: CSSProperties = {
    ...baseStyle,
    ...(fsStyle ?? {}),
    ...style
  };

  const mergedClassName = [ns.bem(), className].filter(Boolean).join(' ');

  return (
    <div
      {...rest}
      className={mergedClassName}
      style={mergedStyle}
    >
      {children}
    </div>
  );
}

