import { defineComponent, h, inject } from 'vue';
import type { CSSProperties, PropType } from 'vue';
import { createNamespace } from '@freestyle/core';
import {
  CollapseKey,
  type CollapseContextValue
} from './FsCollapse';

const ns = createNamespace('collapse');

export const FsCollapseItem = defineComponent({
  name: ns.bem('item'),
  inheritAttrs: false,
  props: {
    itemKey: {
      type: String,
      required: true
    },
    title: {
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
    const ctx = inject<CollapseContextValue | null>(CollapseKey, null);

    return () => {
      if (!ctx) return null;

      const { style: attrStyle, ...restAttrs } = attrs as {
        style?: CSSProperties;
        [key: string]: unknown;
      };
      const isActive = ctx.activeKeys.includes(props.itemKey);

      const baseStyle: CSSProperties = {
        borderBottom: '1px solid #ebeef5'
      };

      const mergedStyle: CSSProperties = {
        ...baseStyle,
        ...(props.fsStyle ?? {}),
        ...(attrStyle as CSSProperties | undefined)
      };

      const headerStyle: CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 12px',
        cursor: props.disabled ? 'not-allowed' : 'pointer',
        userSelect: 'none',
        backgroundColor: '#f5f7fa'
      };

      const bodyStyle: CSSProperties = {
        padding: '10px 12px',
        display: isActive ? 'block' : 'none'
      };

      const onClick = () => {
        if (props.disabled) return;
        ctx.toggleItem(props.itemKey);
      };

      return h('div', { ...restAttrs, class: [ns.bem('item'), attrs.class], style: mergedStyle }, [
        h(
          'div',
          {
            class: ns.bem('item-header'),
            style: headerStyle,
            onClick
          },
          [
            h('span', null, props.title),
            h('span', null, isActive ? '−' : '+')
          ]
        ),
        h(
          'div',
          {
            class: ns.bem('item-body'),
            style: bodyStyle
          },
          slots.default ? slots.default() : undefined
        )
      ]);
    };
  }
});
