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
        overflow: 'hidden',
        maxHeight: isActive ? '500px' : '0px',
        opacity: isActive ? 1 : 0,
        transform: isActive ? 'translateY(0px)' : 'translateY(-2px)',
        transition:
          'max-height 0.28s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.2s ease, transform 0.2s ease'
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
            h('span', {
              style: {
                display: 'inline-block',
                marginLeft: '4px',
                width: 0,
                height: 0,
                borderTop: '4px solid transparent',
                borderBottom: '4px solid transparent',
                borderLeft: '6px solid currentColor',
                transition: 'transform 0.2s ease',
                transform: isActive ? 'rotate(90deg)' : 'rotate(0deg)'
              }
            })
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
