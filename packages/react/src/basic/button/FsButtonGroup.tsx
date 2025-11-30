import type {
  CSSProperties,
  HTMLAttributes,
  ReactNode
} from 'react';
import {
  Children,
  cloneElement,
  isValidElement
} from 'react';
import {
  createButtonGroupStyles,
  createNamespace,
  type ButtonGroupAlign,
  type ButtonGroupDirection,
  type ButtonSize,
  type FsButtonType
} from '@freestyle/core';
import { FsButton } from './FsButton';

export interface ButtonGroupProps
  extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  /**
   * Layout direction: horizontal (default) or vertical.
   */
  direction?: ButtonGroupDirection;
  /**
   * Alignment when there is extra space.
   */
  align?: ButtonGroupAlign;
  /**
   * Gap between buttons (px by default).
   */
  gap?: number | string;
  /**
   * Stretch group to full width.
   */
  fullWidth?: boolean;
  /**
   * Custom design-level style override (merged after computed styles).
   */
  fsStyle?: CSSProperties;
  /**
   * Default size for buttons inside the group (can be overridden per button).
   */
  size?: ButtonSize;
  /**
   * Default visual type for buttons inside the group (can be overridden per button).
   */
  fsType?: FsButtonType;
  /**
   * Disable all buttons inside the group.
   */
  disabled?: boolean;
}

const ns = createNamespace('button-group');

type GroupPosition = 'single' | 'first' | 'middle' | 'last';

type ButtonChildProps = {
  fsType?: FsButtonType;
  size?: ButtonSize;
  disabled?: boolean;
  fsStyle?: CSSProperties;
  // Allow any other props (onClick, className, etc.).
  [key: string]: unknown;
};

function getItemStyle(
  direction: ButtonGroupDirection | undefined,
  position: GroupPosition
): CSSProperties {
  const resolvedDirection: ButtonGroupDirection =
    direction ?? 'horizontal';

  const style: CSSProperties = {};

    if (resolvedDirection === 'horizontal') {
      if (position === 'first') {
        style.borderTopRightRadius = 0;
        style.borderBottomRightRadius = 0;
      } else if (position === 'last') {
        style.borderTopLeftRadius = 0;
        style.borderBottomLeftRadius = 0;
        style.marginLeft = '-1px';
      } else if (position === 'middle') {
        style.borderRadius = 0;
        style.marginLeft = '-1px';
      }
    } else {
      if (position === 'first') {
        style.borderBottomLeftRadius = 0;
        style.borderBottomRightRadius = 0;
      } else if (position === 'last') {
        style.borderTopLeftRadius = 0;
        style.borderTopRightRadius = 0;
        style.marginTop = '-1px';
      } else if (position === 'middle') {
        style.borderRadius = 0;
        style.marginTop = '-1px';
      }
  }

  return style;
}

export function FsButtonGroup(props: ButtonGroupProps) {
  const {
    children,
    direction,
    align,
    gap,
    fullWidth,
    fsStyle,
    size,
    fsType,
    disabled: groupDisabled,
    style,
    className,
    ...rest
  } = props;

  const baseStyle = createButtonGroupStyles({
    direction,
    align,
    gap: gap ?? 0,
    fullWidth
  });

  const mergedStyle: CSSProperties = {
    ...baseStyle,
    ...(fsStyle ?? {}),
    ...style
  };

  const mergedClassName = [ns.bem(), className].filter(Boolean).join(' ');

  const childrenArray = Children.toArray(children);

  const enhancedChildren = childrenArray.map((child, index) => {
    if (!isValidElement(child)) return child;

    // Only attempt to adjust FsButton children.
    if (child.type !== FsButton) return child;

    const total = childrenArray.length;
    let position: GroupPosition = 'middle';
    if (total === 1) {
      position = 'single';
    } else if (index === 0) {
      position = 'first';
    } else if (index === total - 1) {
      position = 'last';
    }

    if (position === 'single') {
      return child;
    }

    const itemStyle = getItemStyle(direction, position);
    const originalProps = child.props as ButtonChildProps;
    const existingFsStyle = originalProps.fsStyle ?? {};

    // Apply group-specific radius / overlap first,
    // then let the button's own fsStyle override if needed.
    const mergedFsStyle: CSSProperties = {
      ...itemStyle,
      ...existingFsStyle
    };

    const mergedChildProps: ButtonChildProps = {
      ...originalProps,
      // Group-level defaults for type/size, unless button overrides.
      fsType: originalProps.fsType ?? fsType,
      size: originalProps.size ?? size,
      // Group-level disabled takes precedence.
      disabled: groupDisabled || originalProps.disabled,
      fsStyle: mergedFsStyle
    };

    return cloneElement(child, mergedChildProps);
  });

  return (
    <div
      {...rest}
      className={mergedClassName}
      style={mergedStyle}
    >
      {enhancedChildren}
    </div>
  );
}
