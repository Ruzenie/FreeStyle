import { App, defineComponent, h, cloneVNode } from 'vue';
import type { CSSProperties, PropType, VNode } from 'vue';
import {
  createButtonGroupStyles,
  createNamespace,
  type ButtonGroupAlign,
  type ButtonGroupDirection,
  type ButtonSize,
  type FsButtonType
} from '@freestyle/core';
import { FsButton } from './FsButton';

const ns = createNamespace('button-group');

type GroupPosition = 'single' | 'first' | 'middle' | 'last';

type ButtonChildProps = {
  fsType?: FsButtonType;
  size?: ButtonSize;
  disabled?: boolean;
  fsStyle?: CSSProperties;
  // Additional attributes / listeners.
  [key: string]: unknown;
};

function getItemStyle(
  direction: ButtonGroupDirection,
  position: GroupPosition
): CSSProperties {
  const style: CSSProperties = {};

  if (direction === 'horizontal') {
    if (position === 'first') {
      style.borderTopRightRadius = 0;
      style.borderBottomRightRadius = 0;
    } else if (position === 'last') {
      style.borderTopLeftRadius = 0;
      style.borderBottomLeftRadius = 0;
      style.marginLeft = '-1px';
    } else if (position === 'middle') {
      style.borderRadius = 0;
      style.marginLeft = '-1px';
    }
  } else {
    if (position === 'first') {
      style.borderBottomLeftRadius = 0;
      style.borderBottomRightRadius = 0;
    } else if (position === 'last') {
      style.borderTopLeftRadius = 0;
      style.borderTopRightRadius = 0;
      style.marginTop = '-1px';
    } else if (position === 'middle') {
      style.borderRadius = 0;
      style.marginTop = '-1px';
    }
  }

  return style;
}

export const FsButtonGroup = defineComponent({
  name: ns.name,
  inheritAttrs: false,
  props: {
    direction: {
      type: String as PropType<ButtonGroupDirection>,
      default: 'horizontal'
    },
    align: {
      type: String as PropType<ButtonGroupAlign>,
      default: 'left'
    },
    gap: {
      type: [Number, String] as PropType<number | string>,
      default: 0
    },
    fullWidth: {
      type: Boolean,
      default: false
    },
    fsStyle: {
      type: Object as PropType<CSSProperties>,
      default: undefined
    },
    size: {
      type: String as PropType<ButtonSize>,
      default: undefined
    },
    fsType: {
      type: String as PropType<FsButtonType>,
      default: undefined
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { slots, attrs }) {
    return () => {
      const baseStyle = createButtonGroupStyles({
        direction: props.direction,
        align: props.align,
        gap: props.gap,
        fullWidth: props.fullWidth
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

      const slotNodes = slots.default ? slots.default() : [];

      const buttonNodes: VNode[] = [];
      slotNodes.forEach((node) => {
        if (node && (node as VNode).type === FsButton) {
          buttonNodes.push(node as VNode);
        } else {
          buttonNodes.push(node as VNode);
        }
      });

      const total = buttonNodes.length;

      const enhancedChildren = buttonNodes.map((node, index) => {
        if (!node || node.type !== FsButton) return node;

        let position: GroupPosition = 'middle';
        if (total === 1) {
          position = 'single';
        } else if (index === 0) {
          position = 'first';
        } else if (index === total - 1) {
          position = 'last';
        }

        if (position === 'single') {
          return node;
        }

        const itemStyle = getItemStyle(props.direction, position);

        const originalProps = (node.props || {}) as ButtonChildProps;

        const mergedFsStyle: CSSProperties = {
          ...itemStyle,
          ...(originalProps.fsStyle ?? {})
        };

        const mergedChildProps: ButtonChildProps = {
          ...originalProps,
          fsType: originalProps.fsType ?? props.fsType,
          size: originalProps.size ?? props.size,
          disabled: props.disabled || originalProps.disabled,
          fsStyle: mergedFsStyle
        };
        return cloneVNode(node, mergedChildProps);
      });

      return h(
        'div',
        {
          ...restAttrs,
          class: [ns.bem(), attrs.class],
          style: mergedStyle
        },
        enhancedChildren
      );
    };
  }
});

export function install(app: App) {
  app.component(ns.name, FsButtonGroup);
}
