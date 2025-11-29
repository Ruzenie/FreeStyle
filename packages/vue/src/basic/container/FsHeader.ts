import { App, defineComponent, h } from 'vue';
import type { CSSProperties, PropType } from 'vue';
import {
  createHeaderStyles,
  createNamespace
} from '@freestyle/core';

const ns = createNamespace('header');

export const FsHeader = defineComponent({
  name: ns.name,
  inheritAttrs: false,
  props: {
    height: {
      type: [Number, String] as PropType<number | string>,
      default: undefined
    },
    paddingX: {
      type: [Number, String] as PropType<number | string>,
      default: undefined
    },
    paddingY: {
      type: [Number, String] as PropType<number | string>,
      default: undefined
    },
    border: Boolean,
    backgroundColor: {
      type: String,
      default: undefined
    },
    fsStyle: {
      type: Object as PropType<CSSProperties>,
      default: undefined
    }
  },
  setup(props, { slots, attrs }) {
    return () => {
      const baseStyle = createHeaderStyles({
        height: props.height,
        paddingX: props.paddingX,
        paddingY: props.paddingY,
        border: props.border,
        backgroundColor: props.backgroundColor
      });

      const { style: attrStyle, ...restAttrs } = attrs as {
        style?: CSSProperties;
        [key: string]: unknown;
      };

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
  app.component(ns.name, FsHeader);
}
