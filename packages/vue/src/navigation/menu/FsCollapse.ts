import { App, defineComponent, h, provide, ref } from 'vue';
import type { CSSProperties, PropType } from 'vue';
import {
  computeCollapseNextKeys,
  createNamespace
} from '@freestyle/core';

const ns = createNamespace('collapse');

export interface CollapseContextValue {
  activeKeys: string[];
  accordion: boolean;
  toggleItem: (key: string) => void;
}

export const CollapseKey = Symbol('FsCollapse');

export const FsCollapse = defineComponent({
  name: ns.name,
  inheritAttrs: false,
  props: {
    accordion: Boolean,
    activeKeys: {
      type: Array as PropType<string[]>,
      default: undefined
    },
    defaultActiveKeys: {
      type: Array as PropType<string[]>,
      default: undefined
    },
    fsStyle: {
      type: Object as PropType<CSSProperties>,
      default: undefined
    }
  },
  emits: ['update:activeKeys', 'change'],
  setup(props, { slots, attrs, emit }) {
    const innerKeys = ref<string[]>(props.defaultActiveKeys ?? []);

    const isControlled = () => Array.isArray(props.activeKeys);
    const effectiveKeys = () =>
      isControlled() ? props.activeKeys || [] : innerKeys.value;

    const toggleItem = (key: string) => {
      const current = effectiveKeys();
      const next = computeCollapseNextKeys(current, key, {
        accordion: props.accordion
      });
      if (!isControlled()) {
        innerKeys.value = next;
      }
      emit('update:activeKeys', next);
      emit('change', next);
    };

    const ctx: CollapseContextValue = {
      get activeKeys() {
        return effectiveKeys();
      },
      get accordion() {
        return !!props.accordion;
      },
      toggleItem
    };

    provide(CollapseKey, ctx);

    return () => {
      const { style: attrStyle, ...restAttrs } = attrs as {
        style?: CSSProperties;
        [key: string]: unknown;
      };

      const baseStyle: CSSProperties = {
        boxSizing: 'border-box',
        borderRadius: 4,
        border: '1px solid #ebeef5'
      };

      const mergedStyle: CSSProperties = {
        ...baseStyle,
        ...(props.fsStyle ?? {}),
        ...(attrStyle as CSSProperties | undefined)
      };

      return h(
        'div',
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
  app.component(ns.name, FsCollapse);
}
