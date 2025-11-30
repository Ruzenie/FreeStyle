import type { StyleObject } from '../basic/button';

// ---------------------
// Top / side navigation
// ---------------------

export interface NavBarStyleOptions {
  height?: number | string;
  backgroundColor?: string;
  border?: boolean;
  paddingX?: number | string;
}

export interface NavSideStyleOptions {
  width?: number | string;
  backgroundColor?: string;
  border?: boolean;
}

export function createNavBarStyles(
  options: NavBarStyleOptions = {}
): StyleObject {
  const {
    height = 56,
    backgroundColor = '#ffffff',
    border = true,
    paddingX = 16
  } = options;

  const resolvedHeight =
    typeof height === 'number' ? `${height}px` : height;
  const resolvedPaddingX =
    typeof paddingX === 'number' ? `${paddingX}px` : paddingX;

  const style: StyleObject = {
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: resolvedPaddingX,
    paddingRight: resolvedPaddingX,
    height: resolvedHeight,
    backgroundColor
  };

  if (border) {
    style.borderBottom = '1px solid #ebeef5';
  }

  return style;
}

export function createNavSideStyles(
  options: NavSideStyleOptions = {}
): StyleObject {
  const {
    width = 200,
    backgroundColor = '#ffffff',
    border = true
  } = options;

  const resolvedWidth =
    typeof width === 'number' ? `${width}px` : width;

  const style: StyleObject = {
    boxSizing: 'border-box',
    width: resolvedWidth,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor
  };

  if (border) {
    style.borderRight = '1px solid #ebeef5';
  }

  return style;
}

// ---------------------
// Collapse logic
// ---------------------

export interface CollapseLogicOptions {
  accordion?: boolean;
}

/**
 * Compute next active panel keys for a collapse / accordion component.
 * Pure, framework-agnostic helper used by React/Vue bindings.
 */
export function computeCollapseNextKeys(
  currentKeys: string[],
  toggledKey: string,
  options: CollapseLogicOptions = {}
): string[] {
  const { accordion = false } = options;
  if (accordion) {
    return currentKeys.includes(toggledKey) ? [] : [toggledKey];
  }
  return currentKeys.includes(toggledKey)
    ? currentKeys.filter((k) => k !== toggledKey)
    : [...currentKeys, toggledKey];
}

// ---------------------
// Menu styles / logic
// ---------------------

export type MenuMode = 'horizontal' | 'vertical';

export interface MenuRootStyleOptions {
  mode?: MenuMode;
  gap?: number;
}

export function createMenuRootStyles(
  options: MenuRootStyleOptions = {}
): StyleObject {
  const { mode = 'vertical', gap = 16 } = options;

  const resolvedGap =
    typeof gap === 'number' ? `${gap}px` : gap;

  if (mode === 'horizontal') {
    return {
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',
      gap: resolvedGap,
      padding: 0,
      margin: 0,
      listStyle: 'none'
    };
  }

  return {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
    margin: 0,
    listStyle: 'none'
  };
}

export interface MenuItemStyleOptions {
  mode?: MenuMode;
  active?: boolean;
  disabled?: boolean;
}

export function createMenuItemStyles(
  options: MenuItemStyleOptions = {}
): StyleObject {
  const {
    mode = 'vertical',
    active = false,
    disabled = false
  } = options;

  const style: StyleObject = {
    boxSizing: 'border-box',
    padding: '8px 12px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    userSelect: 'none',
    color: disabled ? '#c0c4cc' : active ? '#409eff' : '#303133',
    backgroundColor: active ? 'rgba(64, 158, 255, 0.08)' : 'transparent'
  };

  if (mode === 'horizontal') {
    style.borderRadius = '4px';
  }

  return style;
}
