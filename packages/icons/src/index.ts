// Public entry for the @freestyle/icons package.
// Exposes the icon name / style types and helpers used by React/Vue FsIcon components.

import type {
  FsIconCategory,
  FsIconDefinition,
  FsIconMap,
  FsIconName,
  FsIconStyle
} from './types';
import { outlineIcons } from './outline';
import { filledIcons } from './filled';
import { multicolorIcons } from './multicolor';

export type {
  FsIconName,
  FsIconDefinition,
  FsIconStyle,
  FsIconCategory
};

// Individual style maps are exported so callers can inspect or build
// custom icon pickers if needed.
export { outlineIcons, filledIcons, multicolorIcons };

const ICON_SETS: Record<FsIconStyle, FsIconMap> = {
  // outlineIcons is a complete map (all names present); cast to FsIconMap
  outline: outlineIcons as FsIconMap,
  filled: filledIcons,
  multicolor: multicolorIcons
};

/**
 * Lookup helper used by framework FsIcon components.
 * For styles other than "outline", this falls back to outline icons
 * when a dedicated styled version does not exist yet.
 */
export function getIcon(
  name: FsIconName,
  style: FsIconStyle = 'outline'
): FsIconDefinition | undefined {
  const byStyle = ICON_SETS[style]?.[name];
  if (byStyle) return byStyle;

  if (style !== 'outline') {
    return outlineIcons[name];
  }

  return undefined;
}

// Backwards-compatible export: the default icon map is the outline set.
export const icons: Record<FsIconName, FsIconDefinition> =
  outlineIcons as Record<FsIconName, FsIconDefinition>;

/**
 * Helper for docs / pickers: group icons of a given style by category.
 * Currently only outline icons are fully categorized; other styles will
 * reuse outline metadata when falling back.
 */
export function getIconsByCategory(
  style: FsIconStyle = 'outline'
): Record<FsIconCategory, FsIconName[]> {
  const categories: Record<FsIconCategory, FsIconName[]> = {
    direction: [],
    feedback: [],
    edit: [],
    data: [],
    common: []
  };

  const source = ICON_SETS[style] ?? outlineIcons;

  (Object.keys(source) as FsIconName[]).forEach((name) => {
    const def = source[name] ?? outlineIcons[name];
    if (!def) return;
    categories[def.category].push(name);
  });

  return categories;
}
