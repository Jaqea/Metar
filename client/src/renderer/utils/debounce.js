function debounce(fn, wait, immediate) {
  let timer;
  return () => {
    if (timer) clearTimeout(timer);
    if (immediate) {
      // 如果已经执行过，不再执行
      const callNow = !timer;
      timer = setTimeout(() => {
        timer = null;
      }, wait);
      if (callNow) {
        // eslint-disable-next-line prefer-rest-params
        fn.apply(this, arguments);
      }
    } else {
      timer = setTimeout(() => {
        // eslint-disable-next-line prefer-rest-params
        fn.apply(this, arguments);
      }, wait);
    }
  };
}

export default debounce;
