import type { CSSProperties, SVGProps } from 'react';
import { getIcon, type FsIconName } from '@freestyle/icons';

export interface FsIconProps extends SVGProps<SVGSVGElement> {
  /**
   * Name of the icon to render. Backed by the FsIconName union
   * from the @freestyle/icons package.
   */
  name: FsIconName;
  /**
   * Icon size. Number values are treated as px.
   * Defaults to 16.
   */
  size?: number | string;
  /**
   * Optional explicit color. If omitted the icon inherits
   * the current text color.
   */
  color?: string;
}

export function FsIcon(props: FsIconProps) {
  const { name, size = 16, color, style, ...rest } = props;
  const def = getIcon(name);

  if (!def) {
    // Fail soft: unknown icon names simply render nothing so
    // they do not break the surrounding layout.
    return null;
  }

  const resolvedSize = typeof size === 'number' ? `${size}px` : size;

  const mode = def.mode ?? 'stroke';

  // Legacy icons like "delete" / "copy" / "refresh" / "settings" are
  // authored on a 1024x1024 grid. Scale them down to the 24x24 viewBox
  // used by outline icons.
  const needsLegacyScale =
    name === 'delete' ||
    name === 'copy' ||
    name === 'refresh' ||
    name === 'settings';
  const pathTransform = needsLegacyScale ? 'scale(0.0234375)' : undefined;

  const mergedStyle: CSSProperties = {
    // Preserve incoming style
    ...(style ?? {}),
    // Let explicit color prop override style.color
    ...(color ? { color } : {})
  };

  return (
    <svg
      {...rest}
      width={resolvedSize}
      height={resolvedSize}
      viewBox={def.viewBox}
      // Default to no fill for stroke icons; filled icons override per-path.
      fill={mode === 'fill' ? 'currentColor' : 'none'}
      aria-hidden="true"
      focusable="false"
      style={mergedStyle}
    >
      {def.paths.map((d, index) =>
        mode === 'fill' ? (
          <path
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            d={d}
            fill="currentColor"
            transform={pathTransform}
          />
        ) : (
          <path
            // Icon shapes are simple; index is stable and safe as key here.
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            d={d}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            transform={pathTransform}
          />
        )
      )}
    </svg>
  );
}
