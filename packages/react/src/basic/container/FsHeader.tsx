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
  /**
   * @deprecated Use `bordered` instead to avoid clashing with native HTML `border`.
   */
  border?: boolean;
  /**
   * Whether to show a 1px bottom border.
   */
  bordered?: boolean;
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
    bordered,
    border,
    backgroundColor,
    fsStyle,
    style,
    className,
    ...rest
  } = props;

  const showBorder = bordered ?? border;

  const baseStyle = createHeaderStyles({
    height,
    paddingX,
    paddingY,
    border: showBorder,
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
