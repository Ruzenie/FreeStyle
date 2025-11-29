import { defineComponent, h, inject } from 'vue';
import type { CSSProperties, PropType } from 'vue';
import {
  createMenuItemStyles,
  createNamespace
} from '@freestyle/core';
import {
  MenuKey,
  type MenuContextValue
} from './FsMenu';

const ns = createNamespace('menu');

export const FsMenuItem = defineComponent({
  name: ns.bem('item'),
  inheritAttrs: false,
  props: {
    itemKey: {
      type: String,
      required: true
    },
    disabled: Boolean,
    fsStyle: {
      type: Object as PropType<CSSProperties>,
      default: undefined
    }
  },
  setup(props, { slots, attrs }) {
    const ctx = inject<MenuContextValue | null>(MenuKey, null);

    return () => {
      const { style: attrStyle, ...restAttrs } = attrs as {
        style?: CSSProperties;
        [key: string]: unknown;
      };
      const isActive = ctx?.activeKey === props.itemKey;

      const baseStyle = createMenuItemStyles({
        mode: ctx?.mode,
        active: isActive,
        disabled: props.disabled
      }) as CSSProperties;

      const mergedStyle: CSSProperties = {
        ...baseStyle,
        ...(props.fsStyle ?? {}),
        ...(attrStyle as CSSProperties | undefined)
      };

      const onClick = () => {
        if (props.disabled) return;
        ctx?.onItemSelect?.(props.itemKey);
      };

      return h(
        'li',
        {
          ...restAttrs,
          class: [ns.bem('item'), attrs.class],
          style: mergedStyle,
          onClick
        },
        slots.default ? slots.default() : undefined
      );
    };
  }
});
