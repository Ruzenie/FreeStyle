// Framework-agnostic button style logic shared by React and Vue bindings.

export type StyleObject = Record<string, string | number>;

// Visual size of the button, as requested: large / medium / small / mini.
export type ButtonSize = 'large' | 'medium' | 'small' | 'mini';

// Visual type of the button (to avoid conflicting with native `type` attribute).
export type FsButtonType =
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'text';

export interface ButtonStyleOptions {
  size?: ButtonSize;
  fsType?: FsButtonType;
  plain?: boolean;
  round?: boolean;
  circle?: boolean;
  loading?: boolean;
  disabled?: boolean;
  hovered?: boolean;
  active?: boolean;
  color?: string;
  backgroundColor?: string;
}

// Base layout style (shared for all buttons).
const baseStyle: StyleObject = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '8px 16px',
  borderRadius: 4,
  borderWidth: 1,
  borderStyle: 'solid',
  fontSize: 14,
  lineHeight: 1,
  cursor: 'pointer',
  userSelect: 'none',
  transition: 'all 0.2s ease'
};

// Colors for different fsType variants.
const typeColors: Record<FsButtonType, { bg: string; border: string; text: string }> = {
  primary: { bg: '#409eff', border: '#409eff', text: '#ffffff' },
  success: { bg: '#67c23a', border: '#67c23a', text: '#ffffff' },
  warning: { bg: '#e6a23c', border: '#e6a23c', text: '#ffffff' },
  danger: { bg: '#f56c6c', border: '#f56c6c', text: '#ffffff' },
  info: { bg: '#909399', border: '#909399', text: '#ffffff' },
  text: { bg: 'transparent', border: 'transparent', text: '#409eff' }
};

// Size mapping.
const sizeStyles: Record<ButtonSize, StyleObject> = {
  large: {
    padding: '10px 20px',
    fontSize: 18
  },
  medium: {
    padding: '9px 16px',
    fontSize: 16
  },
  small: {
    padding: '6px 12px',
    fontSize: 14
  },
  mini: {
    padding: '4px 10px',
    fontSize: 12
  }
};

/**
 * Compute the base inline styles for a button given its options.
 * Framework bindings (React/Vue) can merge additional framework-specific styles on top.
 */
export function createButtonStyles(options: ButtonStyleOptions = {}): StyleObject {
  const {
    size = 'medium',
    fsType = 'primary',
    plain,
    round,
    circle,
    loading,
    disabled,
    hovered,
    active,
    color,
    backgroundColor
  } = options;

  const sizeStyle = sizeStyles[size];
  const typeColor = typeColors[fsType];

  const style: StyleObject = {
    ...baseStyle,
    ...sizeStyle
  };

  // Base colors based on fsType / plain.
  if (fsType === 'text') {
    // Text button: no border, transparent background, colored text.
    style.backgroundColor = 'transparent';
    style.borderColor = 'transparent';
    style.color = color ?? typeColor.text;
    style.padding = sizeStyle.padding;
  } else if (plain) {
    // Plain button: transparent background, colored border and text.
    style.backgroundColor = backgroundColor ?? 'transparent';
    style.borderColor = typeColor.border;
    style.color = color ?? typeColor.border;
  } else {
    // Solid button.
    style.backgroundColor = backgroundColor ?? typeColor.bg;
    style.borderColor = typeColor.border;
    style.color = color ?? typeColor.text;
  }

  // Shape modifiers.
  if (round) {
    style.borderRadius = 20;
  }
  if (circle) {
    style.borderRadius = '50%';
    // Enforce equal width/height so the shape is a true circle.
    const circleSizeMap: Record<ButtonSize, number> = {
      large: 40,
      medium: 36,
      small: 32,
      mini: 28
    };
    const d = circleSizeMap[size];
    style.width = d;
    style.height = d;
    style.padding = 0;
  }

  // Disabled / loading state.
  if (disabled) {
    style.cursor = 'not-allowed';
    style.opacity = 0.55;
    style.filter = 'grayscale(0.2)';
  } else if (loading) {
    style.cursor = 'not-allowed';
    style.opacity = 0.7;
  }

  // Hover / active visual feedback (skip when loading).
  if (!disabled && !loading) {
     // For simplicity, tweak opacity and shadow rather than doing full color math.
     if (hovered) {
       style.filter = 'brightness(1.06)';
       style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.12)';
     }
     if (active) {
       style.filter = 'brightness(0.97)';
       style.transform = 'translateY(1px)';
       style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.18)';
     }
   }

  return style;
}

// ---------------------
// Shared color helpers
// ---------------------

/**
 * Try to extract the first usable color token from a CSS background string,
 * e.g. from "linear-gradient(90deg, #ff7e5f, #feb47b)" -> "#ff7e5f".
 */
export function extractFirstColorToken(input?: string): string | undefined {
  if (!input) return undefined;
  const match = input.match(
    /(#(?:[0-9a-fA-F]{3}){1,2}\b|rgba?\([^)]*\)|hsla?\([^)]*\))/
  );
  return match ? match[0] : undefined;
}

/**
 * Given a computed style object for a button, derive an appropriate focus ring color.
 * Preference order: gradient (background/backgroundImage) -> backgroundColor -> borderColor -> text color.
 */
export function deriveFocusRingColor(style: StyleObject): string {
  const backgroundString =
    (style.background as unknown as string | undefined) ??
    (style.backgroundImage as unknown as string | undefined);
  const gradientColor = extractFirstColorToken(backgroundString);

  const solidColor =
    gradientColor ??
    ((style.backgroundColor &&
      style.backgroundColor !== 'transparent' &&
      (style.backgroundColor as string)) ||
      (style.borderColor &&
        style.borderColor !== 'transparent' &&
        (style.borderColor as string)) ||
      (style.color as string | undefined));

  return solidColor ?? '#409eff';
}
