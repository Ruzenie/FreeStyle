import { App, defineComponent, h, provide, ref } from 'vue';
import type { CSSProperties, PropType } from 'vue';
import {
  createMenuRootStyles,
  createNamespace,
  type MenuMode
} from '@freestyle/core';

export interface MenuContextValue {
  mode: MenuMode;
  activeKey?: string;
  onItemSelect?: (key: string) => void;
}

const ns = createNamespace('menu');
export const MenuKey = Symbol('FsMenu');

export const FsMenu = defineComponent({
  name: ns.name,
  inheritAttrs: false,
  props: {
    mode: {
      type: String as PropType<MenuMode>,
      default: 'vertical'
    },
    activeKey: {
      type: String,
      default: undefined
    },
    defaultActiveKey: {
      type: String,
      default: undefined
    },
    fsStyle: {
      type: Object as PropType<CSSProperties>,
      default: undefined
    }
  },
  emits: ['update:activeKey', 'select'],
  setup(props, { slots, attrs, emit }) {
    const innerActive = ref<string | undefined>(props.defaultActiveKey);

    const isControlled = () => typeof props.activeKey === 'string';
    const effectiveActive = () =>
      isControlled() ? props.activeKey : innerActive.value;

    const handleSelect = (key: string) => {
      if (!isControlled()) {
        innerActive.value = key;
      }
      emit('update:activeKey', key);
      emit('select', key);
    };

    const ctx: MenuContextValue = {
      get mode() {
        return props.mode;
      },
      get activeKey() {
        return effectiveActive();
      },
      onItemSelect: handleSelect
    };

    provide(MenuKey, ctx);

    return () => {
      const { style: attrStyle, ...restAttrs } = attrs as {
        style?: CSSProperties;
        [key: string]: unknown;
      };

      const baseStyle = createMenuRootStyles({
        mode: props.mode,
        gap: 16
      }) as CSSProperties;

      const mergedStyle: CSSProperties = {
        ...baseStyle,
        ...(props.fsStyle ?? {}),
        ...(attrStyle as CSSProperties | undefined)
      };

      return h(
        'ul',
        {
          ...restAttrs,
          class: [ns.bem(), attrs.class],
          style: mergedStyle
        },
        slots.default ? slots.default() : undefined
      );
    };
  }
});

export function install(app: App) {
  app.component(ns.name, FsMenu);
}
