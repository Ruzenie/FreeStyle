import type { StyleObject } from '../button';

// ---------------------
// Top-level container
// ---------------------

// Horizontal alignment strategy for the container content.
export type ContainerAlign = 'left' | 'center';

export interface ContainerStyleOptions {
  /**
   * When true, container spans the full viewport width (no maxWidth constraint).
   */
  fullWidth?: boolean;
  /**
   * Max content width in pixels or any CSS length (ignored when fullWidth is true).
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
  align?: ContainerAlign;
}

// Base layout style shared by all containers.
const containerBaseStyle: StyleObject = {
  boxSizing: 'border-box',
  width: '100%',
  marginLeft: 'auto',
  marginRight: 'auto'
};

/**
 * Compute inline styles for a layout container.
 * Framework bindings (React/Vue) can merge additional framework-specific styles on top.
 */
export function createContainerStyles(
  options: ContainerStyleOptions = {}
): StyleObject {
  const {
    fullWidth,
    maxWidth = 1200,
    paddingX = 16,
    paddingY = 16,
    align = 'center'
  } = options;

  const style: StyleObject = {
    ...containerBaseStyle
  };

  if (!fullWidth) {
    style.maxWidth =
      typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth;
  } else {
    style.maxWidth = '100%';
  }

  if (align === 'left') {
    style.marginLeft = 0;
    style.marginRight = 'auto';
  } else {
    style.marginLeft = 'auto';
    style.marginRight = 'auto';
  }

  const resolvedPaddingX =
    typeof paddingX === 'number' ? `${paddingX}px` : paddingX;
  const resolvedPaddingY =
    typeof paddingY === 'number' ? `${paddingY}px` : paddingY;

  style.paddingLeft = resolvedPaddingX;
  style.paddingRight = resolvedPaddingX;
  style.paddingTop = resolvedPaddingY;
  style.paddingBottom = resolvedPaddingY;

  return style;
}

// ---------------------
// Sub-layout parts
// ---------------------

export interface HeaderStyleOptions {
  height?: number | string;
  paddingX?: number | string;
  paddingY?: number | string;
  border?: boolean;
  backgroundColor?: string;
}

export interface AsideStyleOptions {
  width?: number | string;
  paddingX?: number | string;
  paddingY?: number | string;
  border?: boolean;
  backgroundColor?: string;
}

export interface MainStyleOptions {
  paddingX?: number | string;
  paddingY?: number | string;
  backgroundColor?: string;
}

export interface FooterStyleOptions {
  height?: number | string;
  paddingX?: number | string;
  paddingY?: number | string;
  border?: boolean;
  backgroundColor?: string;
}

const headerBase: StyleObject = {
  boxSizing: 'border-box',
  width: '100%',
  flexShrink: 0
};

const asideBase: StyleObject = {
  boxSizing: 'border-box',
  flex: '0 0 auto'
};

const mainBase: StyleObject = {
  boxSizing: 'border-box',
  flex: '1 1 auto',
  minWidth: 0
};

const footerBase: StyleObject = {
  boxSizing: 'border-box',
  width: '100%',
  flexShrink: 0
};

export function createHeaderStyles(
  options: HeaderStyleOptions = {}
): StyleObject {
  const {
    height = 60,
    paddingX = 16,
    paddingY = 0,
    border = false,
    backgroundColor = '#ffffff'
  } = options;

  const resolvedHeight =
    typeof height === 'number' ? `${height}px` : height;
  const resolvedPaddingX =
    typeof paddingX === 'number' ? `${paddingX}px` : paddingX;
  const resolvedPaddingY =
    typeof paddingY === 'number' ? `${paddingY}px` : paddingY;

  const style: StyleObject = {
    ...headerBase,
    height: resolvedHeight,
    paddingLeft: resolvedPaddingX,
    paddingRight: resolvedPaddingX,
    paddingTop: resolvedPaddingY,
    paddingBottom: resolvedPaddingY,
    backgroundColor
  };

  if (border) {
    style.borderBottom = '1px solid #ebeef5';
  }

  return style;
}

export function createAsideStyles(
  options: AsideStyleOptions = {}
): StyleObject {
  const {
    width = 200,
    paddingX = 16,
    paddingY = 16,
    border = false,
    backgroundColor = '#ffffff'
  } = options;

  const resolvedWidth =
    typeof width === 'number' ? `${width}px` : width;
  const resolvedPaddingX =
    typeof paddingX === 'number' ? `${paddingX}px` : paddingX;
  const resolvedPaddingY =
    typeof paddingY === 'number' ? `${paddingY}px` : paddingY;

  const style: StyleObject = {
    ...asideBase,
    width: resolvedWidth,
    paddingLeft: resolvedPaddingX,
    paddingRight: resolvedPaddingX,
    paddingTop: resolvedPaddingY,
    paddingBottom: resolvedPaddingY,
    backgroundColor
  };

  if (border) {
    style.borderRight = '1px solid #ebeef5';
  }

  return style;
}

export function createMainStyles(
  options: MainStyleOptions = {}
): StyleObject {
  const {
    paddingX = 16,
    paddingY = 16,
    backgroundColor = '#ffffff'
  } = options;

  const resolvedPaddingX =
    typeof paddingX === 'number' ? `${paddingX}px` : paddingX;
  const resolvedPaddingY =
    typeof paddingY === 'number' ? `${paddingY}px` : paddingY;

  const style: StyleObject = {
    ...mainBase,
    paddingLeft: resolvedPaddingX,
    paddingRight: resolvedPaddingX,
    paddingTop: resolvedPaddingY,
    paddingBottom: resolvedPaddingY,
    backgroundColor
  };

  return style;
}

export function createFooterStyles(
  options: FooterStyleOptions = {}
): StyleObject {
  const {
    height = 48,
    paddingX = 16,
    paddingY = 0,
    border = false,
    backgroundColor = '#ffffff'
  } = options;

  const resolvedHeight =
    typeof height === 'number' ? `${height}px` : height;
  const resolvedPaddingX =
    typeof paddingX === 'number' ? `${paddingX}px` : paddingX;
  const resolvedPaddingY =
    typeof paddingY === 'number' ? `${paddingY}px` : paddingY;

  const style: StyleObject = {
    ...footerBase,
    height: resolvedHeight,
    paddingLeft: resolvedPaddingX,
    paddingRight: resolvedPaddingX,
    paddingTop: resolvedPaddingY,
    paddingBottom: resolvedPaddingY,
    backgroundColor
  };

  if (border) {
    style.borderTop = '1px solid #ebeef5';
  }

  return style;
}
