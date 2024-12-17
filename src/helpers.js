/**
 * Throttles a function so it is only called once within the specified time window.
 * This prevents performance issues from running a function repeatedly during scroll or resize events.
 *
 * @since 1.0.0
 * @param {Function} func - The function to throttle.
 * @param {number} wait - The number of milliseconds to wait before allowing another call.
 * @returns {Function} A throttled version of the provided function.
 */
export function throttle(func, wait) {
  let context, args, result, timeout = null
  let previous = 0

  const later = () => {
    previous = Date.now()
    timeout = null
    result = func.apply(context, args)
    context = args = null
  }

  return function(...innerArgs) {
    const now = Date.now()
    const remaining = wait - (now - previous)
    context = this
    args = innerArgs

    if (remaining <= 0) {
      clearTimeout(timeout)
      timeout = null
      previous = now
      result = func.apply(context, args)
      context = args = null
    } else if (!timeout) {
      timeout = setTimeout(later, remaining)
    }
    return result
  }
}

/**
 * Retrieves the current vertical scroll position of the page.
 *
 * @returns {number} The current vertical scroll position in pixels.
 */
export function getScrollY() {
  // Prefer window.scrollY for modern browsers.
  // If scrollY is undefined, fallback to scrollTop for legacy browsers.
  return (typeof window.scrollY === 'number')
        ? window.scrollY
        : (document.documentElement || document.body.parentNode || document.body).scrollTop
}

/**
 * Calculates the vertical position of an element relative to the top of the document.
 *
 * @param {HTMLElement} elem - The element whose position should be determined.
 * @param {string} side - Which side of the element to use for calculation ('top' or 'bottom').
 * @returns {number} The element's vertical position in pixels.
 */
export function getElementYPosition(elem, side) {
  let pos = 0
  const elemHeight = elem.offsetHeight

  let currentElem = elem
  while (currentElem) {
    pos += currentElem.offsetTop
    currentElem = currentElem.offsetParent
  }

  if (side === 'bottom') {
    pos += elemHeight
  }

  return pos
}
