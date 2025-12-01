// Shared icon types used across different visual styles.

// Logical name of a single icon glyph.
export type FsIconName =
  // Feedback / status
  | 'info'
  | 'success'
  | 'warning'
  | 'error'
  | 'question'
  // Common actions / chrome
  | 'close'
  | 'home'
  | 'search'
  | 'settings'
  | 'user'
  | 'refresh'
  // Directional
  | 'arrowLeft'
  | 'arrowRight'
  | 'arrowUp'
  | 'arrowDown'
  | 'arrowUpDown'
  | 'chevronLeft'
  | 'chevronRight'
  // Edit / manipulate
  | 'plus'
  | 'minus'
  | 'edit'
  | 'delete'
  | 'copy'
  // Data / analytics
  | 'chartBar'
  | 'chartLine'
  | 'chartPie'
  | 'trendUp'
  | 'trendDown';

// Visual style (or "variant") of an icon.
export type FsIconStyle = 'outline' | 'filled' | 'multicolor';

// High-level category for outline icons, mapped from the product spec:
// - "direction":    方向性图标
// - "feedback":     提示 / 建议信息图标（成功、警告、错误等）
// - "edit":         编辑类图标（新增、删除、修改等）
// - "data":         数据类图标（统计、报表、图表等）
// - "common":       网站通用型图标（关闭、刷新、主页等）
export type FsIconCategory =
  | 'direction'
  | 'feedback'
  | 'edit'
  | 'data'
  | 'common';

export interface FsIconDefinition {
  viewBox: string;
  /**
   * Simple path commands. For now these are rendered with a consistent
   * stroke style (stroke="currentColor") by the framework components,
   * unless `mode` is set to "fill", in which case paths are filled.
   */
  paths: string[];
  /**
   * Rendering mode hint for framework components.
   * - "stroke": draw paths with stroke only (default)
   * - "fill":   draw paths as filled shapes
   */
  mode?: 'stroke' | 'fill';
  /**
   * High-level category of the icon, used for building pickers / docs.
   * For non-outline styles this may be omitted in the future, but keeping
   * it required now makes metadata consistent.
   */
  category: FsIconCategory;
}

// Convenience alias for style-specific icon maps.
export type FsIconMap = Partial<Record<FsIconName, FsIconDefinition>>;
