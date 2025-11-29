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
        display: open.value ? 'block' : 'none',
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
              h('span', null, open.value ? '▾' : '▸')
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
