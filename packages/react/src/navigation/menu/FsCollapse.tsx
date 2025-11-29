import type {
  CSSProperties,
  HTMLAttributes,
  ReactNode
} from 'react';
import { createContext, useContext, useMemo, useState } from 'react';
import {
  computeCollapseNextKeys,
  createNamespace
} from '@freestyle/core';

interface CollapseContextValue {
  activeKeys: string[];
  accordion: boolean;
  toggleItem: (key: string) => void;
}

const CollapseContext = createContext<CollapseContextValue | null>(null);

export interface CollapseProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  children?: ReactNode;
  /**
   * When true, only one item can be expanded at a time.
   */
  accordion?: boolean;
  /**
   * Controlled active keys.
   */
  activeKeys?: string[];
  /**
   * Default active keys (uncontrolled).
   */
  defaultActiveKeys?: string[];
  /**
   * Callback when active keys change.
   */
  onChange?: (keys: string[]) => void;
  /**
   * Design-level style override (merged after computed styles).
   */
  fsStyle?: CSSProperties;
}

const ns = createNamespace('collapse');

export function FsCollapse(props: CollapseProps) {
  const {
    children,
    accordion = false,
    activeKeys,
    defaultActiveKeys,
    onChange,
    fsStyle,
    style,
    className,
    ...rest
  } = props;

  const [innerKeys, setInnerKeys] = useState<string[]>(defaultActiveKeys ?? []);

  const isControlled = Array.isArray(activeKeys);
  const effectiveKeys = isControlled ? activeKeys! : innerKeys;

  const toggleItem = (key: string) => {
    const next = computeCollapseNextKeys(effectiveKeys, key, {
      accordion
    });
    if (!isControlled) {
      setInnerKeys(next);
    }
    onChange?.(next);
  };

  const ctx = useMemo<CollapseContextValue>(
    () => ({
      activeKeys: effectiveKeys,
      accordion,
      toggleItem
    }),
    [effectiveKeys, accordion]
  );

  const baseStyle: CSSProperties = {
    boxSizing: 'border-box',
    borderRadius: 4,
    border: '1px solid #ebeef5'
  };

  const mergedStyle: CSSProperties = {
    ...baseStyle,
    ...(fsStyle ?? {}),
    ...style
  };

  const mergedClassName = [ns.bem(), className].filter(Boolean).join(' ');

  return (
    <CollapseContext.Provider value={ctx}>
      <div
        {...rest}
        className={mergedClassName}
        style={mergedStyle}
      >
        {children}
      </div>
    </CollapseContext.Provider>
  );
}

export interface CollapseItemProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * Unique key for this panel (different from React's key).
   */
  itemKey: string;
  /**
   * Header content.
   */
  title: ReactNode;
  /**
   * Disable expanding/collapsing.
   */
  disabled?: boolean;
  /**
   * Design-level style override (merged after computed styles).
   */
  fsStyle?: CSSProperties;
}

export function FsCollapseItem(props: CollapseItemProps) {
  const { itemKey, title, disabled, children, fsStyle, style, className, ...rest } = props;
  const ctx = useContext(CollapseContext);

  if (!ctx) {
    // Fail silently if used outside of FsCollapse.
    return null;
  }

  const { activeKeys, toggleItem } = ctx;
  const isActive = activeKeys.includes(itemKey);

  const baseStyle: CSSProperties = {
    borderBottom: '1px solid #ebeef5'
  };

  const mergedStyle: CSSProperties = {
    ...baseStyle,
    ...(fsStyle ?? {}),
    ...style
  };

  const headerStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 12px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    userSelect: 'none',
    backgroundColor: '#f5f7fa'
  };

  const bodyStyle: CSSProperties = {
    padding: '10px 12px',
    display: isActive ? 'block' : 'none'
  };

  const mergedClassName = [ns.bem('item'), className].filter(Boolean).join(' ');

  const handleClick = () => {
    if (disabled) return;
    toggleItem(itemKey);
  };

  return (
    <div
      {...rest}
      className={mergedClassName}
      style={mergedStyle}
    >
      <div
        className={ns.bem('item-header')}
        style={headerStyle}
        onClick={handleClick}
      >
        <span>{title}</span>
        <span>{isActive ? '−' : '+'}</span>
      </div>
      <div
        className={ns.bem('item-body')}
        style={bodyStyle}
      >
        {children}
      </div>
    </div>
  );
}
