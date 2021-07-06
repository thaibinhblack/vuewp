import BREAKPOINTS from '@/breakpoints.json';

const { body, documentElement: html } = document;

const freezeClass = '--freeze';
const addBorderClass = '--ad-fixed-border';
const fixedSelector = [];

let lockTimeout;
let lastScroll;

function calculateScollWidth() {
  const $div = document.createElement('div');

  $div.style.position = 'absolute';
  $div.style.top = '0px';
  $div.style.left = '0px';
  $div.style.width = '100%';
  $div.style.height = '50px';

  body.appendChild($div);

  const fullWidth = $div.offsetWidth;

  $div.style.overflowY = 'scroll';

  const limitWidth = $div.clientWidth;

  body.removeChild($div);

  const scrollWidth = fullWidth - limitWidth;

  body.classList.add(`--scroll-${scrollWidth}`);

  return scrollWidth;
}

export const scrollWidth = calculateScollWidth();
export const lang = html.getAttribute('lang') || '';
export const isRTL = html.getAttribute('dir') === 'rtl';
export const isIOS = html.classList.contains('ios');
export const isIE = html.classList.contains('ie')
  || html.classList.contains('edge');

export const Layout = {
  scrollWidth,
  lang,
  isRTL,
  isIOS,
  isIE,

  get screenWidth() {
    return window.innerWidth;
  },

  get width() {
    return body.clientWidth;
  },

  get height() {
    return window.innerHeight;
  },

  get bodyHeight() {
    return body.clientHeight;
  },

  get isFrozen() {
    return body.classList.contains(freezeClass);
  },

  get isDesktop() {
    return this.screenWidth >= BREAKPOINTS.LG;
  },

  get isMobile() {
    return !this.isDesktop;
  },

  get scroll() {
    return document.documentElement.scrollTop;
  },

  set scroll(top) {
    window.scrollTo({
      top,
      left: 0,
      behavior: 'smooth',
    });
  },

  scrollImmediate(top) {
    window.scrollTo(0, top);
  },

  freeze(callback) {
    clearTimeout(lockTimeout);
    lockTimeout = setTimeout(() => {
      window.isFreezing = true;

      const willBeFrozen = !this.isFrozen;

      if (!willBeFrozen) {
        if (typeof callback === 'function') {
          callback();
        }

        return;
      }

      if (this.isIOS) {
        lastScroll = this.scroll;
        body.style.top = `${-lastScroll}px`;
      }

      body.classList.add(freezeClass);

      if (this.bodyHeight > this.height) {
        body.classList.add(addBorderClass);
        fixedSelector.forEach((selector) => {
          document.querySelectorAll(selector).forEach((element) => {
            if (window.getComputedStyle(element).position === 'fixed') {
              element.classList.add(addBorderClass);
            }
          });
        });
      }

      if (this.isIOS) {
        this.scrollImmediate(0);
      }

      if (typeof callback === 'function') {
        callback();
      }
    });
  },

  unfreeze(callback) {
    clearTimeout(lockTimeout);
    lockTimeout = setTimeout(() => {
      window.isFreezing = false;

      if (!this.isFrozen) {
        if (typeof callback === 'function') {
          callback();
        }

        return;
      }

      body.classList.remove(freezeClass);
      body.classList.remove(addBorderClass);
      fixedSelector.forEach((selector) => {
        document.querySelectorAll(selector).forEach((element) => {
          element.classList.remove(addBorderClass);
        });
      });

      if (this.isIOS) {
        body.style.top = '';
        this.scrollImmediate(lastScroll);

        if (typeof callback === 'function') {
          setTimeout(() => {
            callback();
          }, 50);
        }
      } else if (typeof callback === 'function') {
        callback();
      }
    });
  },
};

export default {
  install(VueInstance) {
    VueInstance.prototype.$layout = Layout;
  },
};
