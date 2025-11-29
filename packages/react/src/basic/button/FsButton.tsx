import type {
  ButtonHTMLAttributes,
  CSSProperties,
  ReactNode
} from 'react';
import { useRef, useState } from 'react';
import {
  createNamespace,
  createButtonStyles,
  type StyleObject,
  deriveFocusRingColor,
  type FsButtonType,
  type ButtonSize
} from '@freestyle/core';

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  /**
   * Visual style of the button.
   */
  fsType?: FsButtonType;
  /**
   * Size of the button.
   */
  size?: ButtonSize;
  /**
   * Override text color.
   */
  color?: string;
  /**
   * Override background color.
   */
  backgroundColor?: string;
  /**
   * Custom design-level style override (merged after computed styles).
   */
  fsStyle?: CSSProperties;
  /**
   * Show loading state (will reduce pointer feedback).
   */
  loading?: boolean;
  /**
   * Icon class name to render on the left side.
   */
  icon?: string;
  /**
   * Circle shape button.
   */
  circle?: boolean;
  /**
   * Round (pill-like) button.
   */
  round?: boolean;
  /**
   * Plain style (transparent background).
   */
  plain?: boolean;
}

const ns = createNamespace('button');

export function FsButton(props: ButtonProps) {
  const {
    children,
    fsType,
    size,
    color,
    backgroundColor,
    fsStyle,
    loading,
    icon,
    circle,
    round,
    plain,
    style,
    className,
    disabled,
    ...rest
  } = props;

  const resolvedType: FsButtonType = fsType ?? 'primary';
  const resolvedSize: ButtonSize = size ?? 'medium';

  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  const [focused, setFocused] = useState(false);
  const mouseDownInsideRef = useRef(false);

  const baseStyle = createButtonStyles({
    fsType: resolvedType,
    size: resolvedSize,
    plain,
    round,
    circle,
    loading: !!loading,
    disabled: !!disabled,
    hovered,
    active,
    color,
    backgroundColor
  });

  // Apply design-level and inline custom styles on top of base style.
  const styled: CSSProperties = {
    ...baseStyle,
    ...(fsStyle ?? {}),
    ...style
  };

  // Derive focus ring color from the final styled button using core helper.
  const focusRingColor = deriveFocusRingColor(styled as unknown as StyleObject);

  const mergedStyle: CSSProperties = {
    ...styled,
    ...(focused && !disabled && !loading
      ? {
          outline: `2px solid ${focusRingColor}`,
          outlineOffset: 2
        }
      : null)
  };

  const mergedClassName = [ns.bem(), className].filter(Boolean).join(' ');

  // Preserve any external handlers while tracking internal focus state.
  const { onFocus, onBlur, onMouseDown, onMouseUp, ...restProps } = rest;

  return (
    <button
      {...restProps}
      className={mergedClassName}
      style={mergedStyle}
      disabled={disabled || loading}
      data-fs-type={resolvedType}
      data-fs-size={resolvedSize}
      data-fs-plain={plain ? 'true' : 'false'}
      data-fs-round={round ? 'true' : 'false'}
      data-fs-circle={circle ? 'true' : 'false'}
      data-fs-loading={loading ? 'true' : 'false'}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setActive(false);
      }}
      onMouseDown={(event) => {
        mouseDownInsideRef.current = true;
        setActive(true);
        if (typeof onMouseDown === 'function') {
          onMouseDown(event);
        }
      }}
      onMouseUp={(event) => {
        setActive(false);
        if (typeof onMouseUp === 'function') {
          onMouseUp(event);
        }
      }}
      onFocus={(event) => {
        // Only show focus ring when focus did not come from mouse click (Tab/autoFocus).
        if (!mouseDownInsideRef.current) {
          setFocused(true);
        }
        mouseDownInsideRef.current = false;
        if (typeof onFocus === 'function') {
          onFocus(event);
        }
      }}
      onBlur={(event) => {
        setFocused(false);
        if (typeof onBlur === 'function') {
          onBlur(event);
        }
      }}
    >
      {icon ? <i className={icon} style={{ marginRight: children ? 6 : 0 }} /> : null}
      {children}
    </button>
  );
}
