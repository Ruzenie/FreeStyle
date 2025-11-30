import { defineComponent, h, inject, ref } from 'vue';
import type { CSSProperties, PropType } from 'vue';
import { createNamespace } from '@freestyle/core';
import {
  MenuKey,
  type MenuContextValue
} from './FsMenu';

const ns = createNamespace('menu');

export const FsSubMenu = defineComponent({
  name: ns.bem('submenu'),
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
    defaultOpen: Boolean,
    fsStyle: {
      type: Object as PropType<CSSProperties>,
      default: undefined
    }
  },
  setup(props, { slots, attrs }) {
    const ctx = inject<MenuContextValue | null>(MenuKey, null);
    const open = ref(!!props.defaultOpen);

    const toggleOpen = () => {
      open.value = !open.value;
    };

    return () => {
      const { style: attrStyle, ...restAttrs } = attrs as {
        style?: CSSProperties;
        [key: string]: unknown;
      };

      const baseStyle: CSSProperties = {
        boxSizing: 'border-box'
      };

      const mergedStyle: CSSProperties = {
        ...baseStyle,
        ...(props.fsStyle ?? {}),
        ...(attrStyle as CSSProperties | undefined)
      };

      const headerStyle: CSSProperties = {
        padding: '8px 12px',
        cursor: 'pointer',
        userSelect: 'none',
        color: '#303133',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      };

      const bodyStyle: CSSProperties = {
        // Expand/collapse with a smoother transition.
        overflow: 'hidden',
        maxHeight: open.value ? '500px' : '0px',
        opacity: open.value ? 1 : 0,
        transform: open.value ? 'translateY(0px)' : 'translateY(-2px)',
        transition:
          'max-height 0.28s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.2s ease, transform 0.2s ease',
        paddingLeft: ctx?.mode === 'vertical' ? 12 : 0
      };

      return h(
        'li',
        {
          ...restAttrs,
          class: [ns.bem('submenu'), attrs.class],
          style: mergedStyle
        },
        [
          h(
            'div',
            {
              class: ns.bem('submenu-header'),
              style: headerStyle,
              onClick: toggleOpen
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
                  transform: open.value ? 'rotate(90deg)' : 'rotate(0deg)'
                }
              })
            ]
          ),
          h(
            'div',
            {
              class: ns.bem('submenu-body'),
              style: bodyStyle
            },
            [
              h(
                'ul',
                {
                  class: ns.bem('submenu-list'),
                  style: {
                    listStyle: 'none',
                    margin: 0,
                    padding: 0
                  }
                },
                slots.default ? slots.default() : undefined
              )
            ]
          )
        ]
      );
    };
  }
});
