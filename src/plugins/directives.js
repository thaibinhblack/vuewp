export default {
  install(VueInstance) {
    const clickOutsideStorage = [];

    VueInstance.directive('img', (element, { value }) => {
      element.onerror = () => {
        element.src = '';
        element.classList.add('--error');
      };

      element.onload = () => {
        if (element.classList.contains('--error')) {
          element.classList.remove('--error');
        }
      };

      element.src = value;
    });

    VueInstance.directive('click-outside', {
      bind(el, binding) {
        const handler = (evt) => {
          if (el !== evt.target && !el.contains(evt.target)) {
            binding.value();
          }
        };

        clickOutsideStorage.push({
          el,
          handler,
        });

        document.body.addEventListener('click', handler);
        document.body.addEventListener('touchstart', handler);
      },

      unbind(el) {
        const matched = clickOutsideStorage.find((data) => data.el === el);

        if (!matched) {
          return;
        }

        const matchedIdx = clickOutsideStorage.indexOf(matched);
        const { handler } = matched;

        document.body.removeEventListener('click', handler);
        document.body.removeEventListener('touchstart', handler);
        clickOutsideStorage.splice(matchedIdx, 1);
      },
    });
  },
};
