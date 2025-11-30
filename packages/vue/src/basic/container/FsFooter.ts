import { App, defineComponent, h } from 'vue';
import type { CSSProperties, PropType } from 'vue';
import {
  createFooterStyles,
  createNamespace
} from '@freestyle/core';

const ns = createNamespace('footer');

export const FsFooter = defineComponent({
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
    // Legacy prop name kept for backward compatibility.
    border: Boolean,
    // Preferred prop to avoid clashing with native HTML `border` attribute.
    bordered: {
      type: Boolean,
      default: undefined
    },
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
      const showBorder =
        props.bordered !== undefined ? props.bordered : props.border;

      const baseStyle = createFooterStyles({
        height: props.height,
        paddingX: props.paddingX,
        paddingY: props.paddingY,
        border: showBorder,
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
        'footer',
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
  app.component(ns.name, FsFooter);
}
