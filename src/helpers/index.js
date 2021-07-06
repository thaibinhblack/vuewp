export function throttle(fn, thisArg = window) {
  let scheduleAnimationFrame;

  return () => {
    if (scheduleAnimationFrame) {
      return;
    }

    scheduleAnimationFrame = true;

    requestAnimationFrame(() => {
      fn.call(thisArg);
      scheduleAnimationFrame = false;
    });
  };
}
