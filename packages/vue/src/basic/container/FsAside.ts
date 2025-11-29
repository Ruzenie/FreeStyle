import { App, defineComponent, h } from 'vue';
import type { CSSProperties, PropType } from 'vue';
import {
  createAsideStyles,
  createNamespace
} from '@freestyle/core';

const ns = createNamespace('aside');

export const FsAside = defineComponent({
  name: ns.name,
  inheritAttrs: false,
  props: {
    width: {
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
      const baseStyle = createAsideStyles({
        width: props.width,
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
  app.component(ns.name, FsAside);
}
