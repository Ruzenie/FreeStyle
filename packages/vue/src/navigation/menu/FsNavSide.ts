import { App, defineComponent, h } from 'vue';
import type { CSSProperties, PropType } from 'vue';
import {
  createNamespace,
  createNavSideStyles
} from '@freestyle/core';

const ns = createNamespace('nav-side');

export const FsNavSide = defineComponent({
  name: ns.name,
  inheritAttrs: false,
  props: {
    width: {
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

      const baseStyle = createNavSideStyles({
        width: props.width,
        backgroundColor: props.backgroundColor,
        border: props.border
      }) as CSSProperties;

      const mergedStyle: CSSProperties = {
        ...baseStyle,
        ...(props.fsStyle ?? {}),
        ...(attrStyle as CSSProperties | undefined)
      };

      return h(
        'aside',
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
  app.component(ns.name, FsNavSide);
}
