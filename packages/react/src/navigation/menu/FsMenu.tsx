import type {
  CSSProperties,
  HTMLAttributes,
  ReactNode
} from 'react';
import {
  createContext,
  useContext,
  useMemo,
  useState
} from 'react';
import {
  createMenuItemStyles,
  createMenuRootStyles,
  createNamespace,
  type MenuMode
} from '@freestyle/core';

interface MenuContextValue {
  mode: MenuMode;
  activeKey?: string;
  onItemSelect?: (key: string) => void;
}

const MenuContext = createContext<MenuContextValue | null>(null);

export interface MenuProps
  extends Omit<HTMLAttributes<HTMLUListElement>, 'onSelect'> {
  children?: ReactNode;
  /**
   * Menu mode: horizontal (top nav) or vertical (side nav).
   */
  mode?: MenuMode;
  /**
   * Controlled active key.
   */
  activeKey?: string;
  /**
   * Default active key (uncontrolled).
   */
  defaultActiveKey?: string;
  /**
   * Callback when a menu item is selected.
   */
  onSelect?: (key: string) => void;
  /**
   * Design-level style override (merged after computed styles).
   */
  fsStyle?: CSSProperties;
}

const ns = createNamespace('menu');

export function FsMenu(props: MenuProps) {
  const {
    children,
    mode = 'vertical',
    activeKey,
    defaultActiveKey,
    onSelect,
    fsStyle,
    style,
    className,
    ...rest
  } = props;

  const [innerActive, setInnerActive] = useState<string | undefined>(defaultActiveKey);
  const isControlled = typeof activeKey === 'string';
  const effectiveActive = isControlled ? activeKey : innerActive;

  const handleSelect = (key: string) => {
    if (!isControlled) {
      setInnerActive(key);
    }
    onSelect?.(key);
  };

  const ctx = useMemo<MenuContextValue>(
    () => ({
      mode,
      activeKey: effectiveActive,
      onItemSelect: handleSelect
    }),
    [mode, effectiveActive]
  );

  const baseStyle = createMenuRootStyles({ mode, gap: 16 }) as CSSProperties;

  const mergedStyle: CSSProperties = {
    ...baseStyle,
    ...(fsStyle ?? {}),
    ...style
  };

  const mergedClassName = [ns.bem(), className].filter(Boolean).join(' ');

  return (
    <MenuContext.Provider value={ctx}>
      <ul
        {...rest}
        className={mergedClassName}
        style={mergedStyle}
      >
        {children}
      </ul>
    </MenuContext.Provider>
  );
}

export interface MenuItemProps extends HTMLAttributes<HTMLLIElement> {
  children?: ReactNode;
  /**
   * Unique key for this menu item.
   */
  itemKey: string;
  /**
   * Disable selection.
   */
  disabled?: boolean;
  /**
   * Design-level style override (merged after computed styles).
   */
  fsStyle?: CSSProperties;
}

export function FsMenuItem(props: MenuItemProps) {
  const { itemKey, disabled, children, fsStyle, style, className, ...rest } = props;
  const ctx = useContext(MenuContext);

  const isActive = ctx?.activeKey === itemKey;
  const baseStyle = createMenuItemStyles({
    mode: ctx?.mode,
    active: isActive,
    disabled
  }) as CSSProperties;

  const mergedStyle: CSSProperties = {
    ...baseStyle,
    ...(fsStyle ?? {}),
    ...style
  };

  const mergedClassName = [ns.bem('item'), className].filter(Boolean).join(' ');

  const handleClick = () => {
    if (disabled) return;
    ctx?.onItemSelect?.(itemKey);
  };

  return (
    <li
      {...rest}
      className={mergedClassName}
      style={mergedStyle}
      onClick={handleClick}
    >
      {children}
    </li>
  );
}

export interface SubMenuProps
  extends Omit<HTMLAttributes<HTMLLIElement>, 'title'> {
  /**
   * Unique key for this submenu.
   */
  itemKey: string;
  /**
   * Title shown in the submenu header.
   */
  title: ReactNode;
  /**
   * Start open by default (uncontrolled).
   */
  defaultOpen?: boolean;
  /**
   * Design-level style override (merged after computed styles).
   */
  fsStyle?: CSSProperties;
}

export function FsSubMenu(props: SubMenuProps) {
  const { itemKey, title, defaultOpen, children, fsStyle, style, className, ...rest } =
    props;
  const ctx = useContext(MenuContext);
  const [open, setOpen] = useState(!!defaultOpen);

  const baseStyle: CSSProperties = {
    boxSizing: 'border-box'
  };

  const mergedStyle: CSSProperties = {
    ...baseStyle,
    ...(fsStyle ?? {}),
    ...style
  };

  const isActive = ctx?.activeKey === itemKey;

  const headerStyle: CSSProperties = {
    padding: '8px 12px',
    cursor: 'pointer',
    userSelect: 'none',
    color: isActive ? '#409eff' : '#303133',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  };

  const bodyStyle: CSSProperties = {
    // Expand/collapse with a smoother transition.
    overflow: 'hidden',
    maxHeight: open ? '500px' : '0px',
    opacity: open ? 1 : 0,
    transform: open ? 'translateY(0px)' : 'translateY(-2px)',
    transition:
      'max-height 0.28s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.2s ease, transform 0.2s ease',
    paddingLeft: ctx?.mode === 'vertical' ? 12 : 0
  };

  const mergedClassName = [ns.bem('submenu'), className].filter(Boolean).join(' ');

  const toggleOpen = () => {
    setOpen((prev) => !prev);
  };

  return (
    <li
      {...rest}
      className={mergedClassName}
      style={mergedStyle}
    >
      <div
        className={ns.bem('submenu-header')}
        style={headerStyle}
        onClick={toggleOpen}
      >
        <span>{title}</span>
        <span
          style={{
            display: 'inline-block',
            marginLeft: 4,
            width: 0,
            height: 0,
            borderTop: '4px solid transparent',
            borderBottom: '4px solid transparent',
            borderLeft: '6px solid currentColor',
            transition: 'transform 0.2s ease',
            transform: open ? 'rotate(90deg)' : 'rotate(0deg)'
          }}
        />
      </div>
      <div
        className={ns.bem('submenu-body')}
        style={bodyStyle}
      >
        <ul
          className={ns.bem('submenu-list')}
          style={{
            listStyle: 'none',
            margin: 0,
            padding: 0
          }}
        >
          {children}
        </ul>
      </div>
    </li>
  );
}
