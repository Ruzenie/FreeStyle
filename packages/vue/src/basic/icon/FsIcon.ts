import { defineComponent, h, type PropType } from 'vue';
import { getIcon, type FsIconName } from '@freestyle/icons';

export const FsIcon = defineComponent({
  name: 'FsIcon',
  props: {
    name: {
      type: String as PropType<FsIconName>,
      required: true
    },
    size: {
      type: [Number, String] as PropType<number | string>,
      default: 16
    },
    color: {
      type: String,
      default: undefined
    }
  },
  setup(props, { attrs }) {
    return () => {
      const def = getIcon(props.name);

      if (!def) {
        // Unknown icon names render nothing instead of throwing.
        return null;
      }

      const resolvedSize =
        typeof props.size === 'number' ? `${props.size}px` : props.size;

      const mode = def.mode ?? 'stroke';

      const { style, ...restAttrs } = attrs as {
        style?: Record<string, unknown>;
        [key: string]: unknown;
      };

      const mergedStyle: Record<string, unknown> = {
        ...(style ?? {}),
        ...(props.color ? { color: props.color } : {})
      };
      // Legacy icons like "delete" / "copy" / "refresh" / "settings" are
      // authored on a 1024x1024 grid. Scale them down to the 24x24 viewBox
      // used by outline icons.
      const needsLegacyScale =
        props.name === 'delete' ||
        props.name === 'copy' ||
        props.name === 'refresh' ||
        props.name === 'settings';
      const pathTransform = needsLegacyScale ? 'scale(0.0234375)' : undefined;

      return h(
        'svg',
        {
          ...restAttrs,
          width: resolvedSize,
          height: resolvedSize,
          viewBox: def.viewBox,
          fill: mode === 'fill' ? 'currentColor' : 'none',
          'aria-hidden': 'true',
          focusable: 'false',
          style: mergedStyle
        },
        def.paths.map((d, index) =>
          mode === 'fill'
            ? h('path', {
                // Index is stable for this static data set.
                key: index,
                d,
                fill: 'currentColor',
                transform: pathTransform
              })
            : h('path', {
                // Index is stable for this static data set.
                key: index,
                d,
                fill: 'none',
                stroke: 'currentColor',
                'stroke-width': 2,
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                transform: pathTransform
              })
        )
      );
    };
  }
});
