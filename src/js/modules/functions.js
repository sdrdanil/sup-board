export function isWebp() {
  function testWebP(callback) {
    var webP = new Image();
    webP.onload = webP.onerror = function () {
      callback(webP.height == 2);
    };
    webP.src =
      'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  }

  testWebP(function (support) {
    if (support == true) {
      document.querySelector('html').classList.add('webp');
    } else {
      document.querySelector('html').classList.add('no-webp');
    }
  });
}

export function initSmoothScroll({ duration, offset, mobile }) {
  const DEFAULT_DURATION = 1000;
  const DEFAULT_OFFSET = 0;
  const DEFAULT_MOBILE = true;

  const targets = {
    'a[href^="#"]:not([href="#"])': elem => elem.getAttribute('href'),
    'a[href="#"]': () => 'body',
  }

  document.addEventListener('click', (event) => {
    for (let selector in targets) {
      const elem = event.target.closest(selector);
      if (elem) {
        smoothScroll(
          targets[selector](elem),
          duration ?? DEFAULT_DURATION,
          offset ?? DEFAULT_OFFSET
        );
      }
    }
  });
}

export function smoothScroll(selectorTarget, duration = 1000, offset = 0) {
  const target = document.querySelector(selectorTarget);
  const targetPosition = target.getBoundingClientRect().top;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - offset; // - startPosition;
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  // http://www.gizma.com/easing/
  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}
