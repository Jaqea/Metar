export function randomExtend(minNum, maxNum) {
  if (arguments.length === 1) {
    return parseInt(Math.random() * minNum + 1, 10);
  }
  return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
}

export function debounce(delay, callback) {
  let lastTime;

  // eslint-disable-next-line func-names
  return function () {
    clearTimeout(lastTime);

    // eslint-disable-next-line prefer-rest-params
    const [that, args] = [this, arguments];

    lastTime = setTimeout(() => {
      callback.apply(that, args);
    }, delay);
  };
}

export function observerDomResize(dom, callback) {
  const MutationObserver =
    window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

  const observer = new MutationObserver(callback);

  observer.observe(dom, { attributes: true, attributeFilter: ["style"], attributeOldValue: true });

  return observer;
}

export function getPointDistance(pointOne, pointTwo) {
  const minusX = Math.abs(pointOne[0] - pointTwo[0]);

  const minusY = Math.abs(pointOne[1] - pointTwo[1]);

  return Math.sqrt(minusX * minusX + minusY * minusY);
}
// eslint-disable-next-line func-names
export function uuid(hasHyphen) {
  return (
    (hasHyphen ? "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx" : "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx")
      // eslint-disable-next-line func-names
      .replace(/[xy]/g, function (c) {
        // eslint-disable-next-line no-bitwise
        const r = (Math.random() * 16) | 0;
        // eslint-disable-next-line no-bitwise
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      })
  );
}
