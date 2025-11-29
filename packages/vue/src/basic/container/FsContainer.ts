import { App, defineComponent, h } from 'vue';
import type { CSSProperties, PropType } from 'vue';
import {
  createContainerStyles,
  createNamespace,
  type ContainerAlign
} from '@freestyle/core';

const ns = createNamespace('container');

export const FsContainer = defineComponent({
  name: ns.name,
  inheritAttrs: false,
  props: {
    fullWidth: Boolean,
    maxWidth: {
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
    align: {
      type: String as PropType<ContainerAlign>,
      default: 'center'
    },
    fsStyle: {
      type: Object as PropType<CSSProperties>,
      default: undefined
    }
  },
  setup(props, { slots, attrs }) {
    return () => {
      const baseStyle = createContainerStyles({
        fullWidth: props.fullWidth,
        maxWidth: props.maxWidth,
        paddingX: props.paddingX,
        paddingY: props.paddingY,
        align: props.align
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
  // Use namespace name (string) to avoid `string | undefined` type on `FsContainer.name`.
  app.component(ns.name, FsContainer);
}
