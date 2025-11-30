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
  /**
   * @deprecated Use `bordered` instead to avoid clashing with native HTML `border`.
   */
  border?: boolean;
  /**
   * Whether to show a 1px right border.
   */
  bordered?: boolean;
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
    bordered,
    border,
    backgroundColor,
    fsStyle,
    style,
    className,
    ...rest
  } = props;

  const showBorder = bordered ?? border;

  const baseStyle = createAsideStyles({
    width,
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
    <aside
      {...rest}
      className={mergedClassName}
      style={mergedStyle}
    >
      {children}
    </aside>
  );
}
