import { App, defineComponent, h } from 'vue';
import type { CSSProperties, PropType } from 'vue';
import {
  createNamespace,
  createNavBarStyles
} from '@freestyle/core';

const ns = createNamespace('nav-bar');

export const FsNavBar = defineComponent({
  name: ns.name,
  inheritAttrs: false,
  props: {
    height: {
      type: [Number, String] as PropType<number | string>,
      default: undefined
    },
    backgroundColor: {
      type: String,
      default: '#ffffff'
    },
    border: {
      type: Boolean,
      default: true
    },
    fsStyle: {
      type: Object as PropType<CSSProperties>,
      default: undefined
    }
  },
  setup(props, { slots, attrs }) {
    return () => {
      const { style: attrStyle, ...restAttrs } = attrs as {
        style?: CSSProperties;
        [key: string]: unknown;
      };

      const baseStyle = createNavBarStyles({
        height: props.height,
        backgroundColor: props.backgroundColor,
        border: props.border
      }) as CSSProperties;

      const mergedStyle: CSSProperties = {
        ...baseStyle,
        ...(props.fsStyle ?? {}),
        ...(attrStyle as CSSProperties | undefined)
      };

      return h(
        'header',
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
  app.component(ns.name, FsNavBar);
}
