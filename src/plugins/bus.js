import Vue from 'vue';
import { Layout } from '@/plugins/layout';
import { throttle } from '@/helpers';

const $bus = new Vue();

let passiveIfSupported = false;
let resizeTimeout = null;
let lastWinScroll = Layout.scroll;
let lastWinWidth = Layout.width;
let lastWinHeight = Layout.height;
let lastBreakpointIsDesktop = Layout.isDesktop;

try {
  const passive = Object.defineProperty({}, 'passive', {
    get() {
      passiveIfSupported = { passive: true };

      return true;
    },
  });

  window.addEventListener('test', null, passive);
} catch (error) { /* */ }

window.addEventListener('scroll', throttle(() => {
  const currentWinScroll = Layout.scroll;

  if (currentWinScroll === lastWinScroll) {
    return;
  }

  const name = currentWinScroll < lastWinScroll ? 'up' : 'down';

  $bus.$emit(`scroll:${name}`, currentWinScroll);

  lastWinScroll = currentWinScroll;
}, passiveIfSupported));

window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    const currentWinWidth = Layout.width;
    const currentWinHeight = Layout.height;
    const isWidthChanged = lastWinWidth !== currentWinWidth;
    const isHeightChanged = lastWinHeight !== currentWinHeight;

    $bus.$emit('resized', currentWinWidth, currentWinHeight);

    if (isWidthChanged) {
      $bus.$emit('width-change', currentWinWidth);

      const currentBreakpointIsDesktop = Layout.isDesktop;

      if (lastBreakpointIsDesktop !== currentBreakpointIsDesktop) {
        // Prevent confict event name with slick
        $bus.$emit('breakpoint:change', currentWinWidth);

        const breakpointEvtName = currentBreakpointIsDesktop
          ? 'desktop'
          : 'mobie';

        $bus.$emit(`breakpoint:${breakpointEvtName}`, currentWinWidth);

        lastBreakpointIsDesktop = currentBreakpointIsDesktop;
      }

      lastWinWidth = currentWinWidth;
    }

    if (isHeightChanged) {
      $bus.$emit('height-change', currentWinHeight);

      lastWinHeight = currentWinHeight;
    }

    if (isWidthChanged && isHeightChanged) {
      $bus.$emit('size-change', currentWinWidth, currentWinHeight);
    }
  }, 250);
});

export default {
  install(VueInstance) {
    VueInstance.prototype.$bus = $bus;
  }
};
