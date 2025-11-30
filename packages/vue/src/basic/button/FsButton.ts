import { App, defineComponent, h, ref } from 'vue';
import type { CSSProperties, PropType } from 'vue';
import {
  createNamespace,
  createButtonStyles,
  deriveFocusRingColor,
  type StyleObject,
  type FsButtonType,
  type ButtonSize
} from '@freestyle/core';

const ns = createNamespace('button');

export const FsButton = defineComponent({
  name: ns.name,
  inheritAttrs: false,
  props: {
    fsType: {
      type: String as PropType<FsButtonType>,
      default: 'primary'
    },
    size: {
      type: String as PropType<ButtonSize>,
      default: 'medium'
    },
    color: {
      type: String,
      default: undefined
    },
    backgroundColor: {
      type: String,
      default: undefined
    },
    fsStyle: {
      type: Object as PropType<CSSProperties>,
      default: undefined
    },
    loading: Boolean,
    icon: {
      type: String,
      default: undefined
    },
    circle: Boolean,
    round: Boolean,
    plain: Boolean,
    disabled: Boolean
  },
  setup(props, { slots, attrs }) {
    const hovered = ref(false);
    const active = ref(false);
    const focused = ref(false);
    const mouseDownInside = ref(false);

    return () => {
      const baseStyle = createButtonStyles({
        fsType: props.fsType,
        size: props.size,
        plain: props.plain,
        round: props.round,
        circle: props.circle,
        loading: !!props.loading,
        disabled: !!props.disabled,
        hovered: hovered.value,
        active: active.value,
        color: props.color,
        backgroundColor: props.backgroundColor,
      });

      const { style: attrStyle, onFocus, onBlur, ...restAttrs } = attrs as {
        style?: CSSProperties;
        onFocus?: (event: FocusEvent) => void;
        onBlur?: (event: FocusEvent) => void;
        [key: string]: unknown;
      };

      // Apply design-level and inline custom styles on top of base style.
      const styled: CSSProperties = {
        ...baseStyle,
        ...(props.fsStyle ?? {}),
        ...(attrStyle as CSSProperties | undefined)
      };

      // Focus ring color derived from final styled button using core helper.
      const focusRingColor = deriveFocusRingColor(
        styled as unknown as StyleObject
      );

      const mergedStyle: CSSProperties = {
        ...styled,
        ...(focused.value && !props.disabled && !props.loading
          ? {
              outline: `2px solid ${focusRingColor}`,
              outlineOffset: '2px'
            }
          : null)
      };

      const hasDefaultSlot = !!slots.default;
      const showLoader = !!props.loading;
      const showIcon = !!props.icon && !showLoader;

      return h(
        'button',
        {
          ...restAttrs,
          class: [ns.bem(), attrs.class],
          style: mergedStyle,
          disabled: props.disabled || props.loading,
          'data-fs-type': props.fsType,
          'data-fs-size': props.size,
          'data-fs-plain': props.plain ? 'true' : 'false',
          'data-fs-round': props.round ? 'true' : 'false',
          'data-fs-circle': props.circle ? 'true' : 'false',
          'data-fs-loading': props.loading ? 'true' : 'false',
          onMouseenter: () => {
            hovered.value = true;
          },
          onMouseleave: () => {
            hovered.value = false;
            active.value = false;
          },
          onMousedown: () => {
            mouseDownInside.value = true;
            active.value = true;
          },
          onMouseup: () => {
            active.value = false;
          },
          onFocus: (event: FocusEvent) => {
            // Only show focus ring when focus did not come from mouse click (Tab/autoFocus).
            if (!mouseDownInside.value) {
              focused.value = true;
            }
            mouseDownInside.value = false;
            if (typeof onFocus === 'function') {
              onFocus(event);
            }
          },
          onBlur: (event: FocusEvent) => {
            focused.value = false;
            if (typeof onBlur === 'function') {
              onBlur(event);
            }
          }
        },
        [
          showLoader
            ? h(
                'span',
                {
                  class: ns.bem('loader'),
                  style: {
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: hasDefaultSlot ? '6px' : 0
                  }
                },
                [
                  h(
                    'svg',
                    {
                      width: 14,
                      height: 14,
                      viewBox: '0 0 24 24',
                      'aria-hidden': 'true',
                      focusable: 'false'
                    },
                    [
                      h('g', null, [
                        h('circle', {
                          cx: 12,
                          cy: 12,
                          r: 9,
                          stroke: 'currentColor',
                          'stroke-width': 2,
                          'stroke-linecap': 'round',
                          fill: 'none',
                          'stroke-dasharray': '56 34',
                          'stroke-dashoffset': 10
                        }),
                        h('animateTransform', {
                          attributeName: 'transform',
                          type: 'rotate',
                          from: '0 12 12',
                          to: '360 12 12',
                          dur: '0.8s',
                          repeatCount: 'indefinite'
                        })
                      ])
                    ]
                  )
                ]
              )
            : null,
          showIcon
            ? h('i', {
                class: props.icon,
                style: { marginRight: hasDefaultSlot ? '6px' : 0 }
              })
            : null,
          hasDefaultSlot ? slots.default?.() : undefined
        ]
      );
    };
  }
});

export function install(app: App) {
  // Use namespace name (string) to avoid `string | undefined` type on `FsButton.name`.
  app.component(ns.name, FsButton);
}
