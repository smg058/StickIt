import { throttle, getScrollY, getElementYPosition } from './helpers.js'

/**
 * @typedef {Object} StickItClasses
 * @property {string} clone CSS class applied to the cloned element.
 * @property {string} stick CSS class applied when the element is stuck.
 * @property {string} unstick CSS class applied when the element is unstuck.
 */

/**
 * @typedef {Object} StickItOptions
 * @property {number|string} offset - Numeric offset (in px) or a CSS selector string indicating when the element should "stick".
 * @property {string} offsetSide - Side of the element used for calculating offset ('top' or 'bottom').
 * @property {StickItClasses} classes - CSS classes used for styling the cloned/stuck elements.
 * @property {number} throttle - Throttle delay in ms for scroll and resize events.
 * @property {Function} onInit - Callback fired after initialization.
 * @property {Function} onStick - Callback fired when the element becomes stuck.
 * @property {Function} onUnstick - Callback fired when the element becomes unstuck.
 * @property {Function} onDestroy - Callback fired after destroying the instance.
 */

/**
 * StickIt
 *
 * Description:
 * StickIt is a utility that clones a specified element and "sticks" it
 * to the top of the viewport once the user scrolls past a certain threshold (offset).
 * This can be used to create sticky headers or navigation bars that remain visible as the user scrolls.
 *
 * This project is a custom modernized version of headhesive.js by Mark Goodyear.
 *
 * @version 1.0.0
 * @author Chayson Media Group
 * @license MIT
 *
 * Original Project:
 * Headhesive.js by Mark Goodyear
 * @see https://github.com/markgoodyear/headhesive.js
 *
 * Modernized and adapted by Chayson Media Group
 * @see https://chayson.com/
 */
export default class StickIt {
  /**
   * Creates a new StickIt instance.
   * @param {HTMLElement|string} elem - The target element (or a selector string) to make sticky.
   * @param {Partial<StickItOptions>} [options={}] - Custom configuration options.
   */
  constructor(elem, options = {}) {
    if (!('querySelector' in document && 'addEventListener' in window)) {
      // Feature test fails, do not initialize.
      return
    }

    /**
     * @type {boolean} visible - Indicates whether the cloned element is currently stuck.
     */
    this.visible = false

    /**
     * @type {StickItOptions} options - Merged configuration options.
     */
    this.options = Object.assign({
      offset: 300,
      offsetSide: 'top',
      classes: {
        clone: 'stickit',
        stick: 'stickit-stick',
        unstick: 'stickit-unstick'
      },
      throttle: 250,
      onInit: () => {},
      onStick: () => {},
      onUnstick: () => {},
      onDestroy: () => {}
    }, options)

    /**
     * @type {HTMLElement} elem - The target element to stick.
     */
    this.elem = (typeof elem === 'string') ? document.querySelector(elem) : elem

    // Proceed with initialization only if elem exists.
    if (this.elem) {
      this.init()
    }
  }

  /**
   * Initializes the StickIt instance:
   * - Clones the target element and inserts it into the DOM.
   * - Calculates the scroll offset threshold.
   * - Sets up scroll and resize event listeners with throttling.
   * - Calls the onInit callback.
   */
  init() {
    // Clone the element and add the clone class.
    this.clonedElem = this.elem.cloneNode(true)
    this.clonedElem.classList.add(this.options.classes.clone)
    document.body.insertBefore(this.clonedElem, document.body.firstChild)

    // Determine the initial scroll offset.
    this._setScrollOffset()

    // Bind and throttle update methods.
    this._throttledUpdate = throttle(this.update.bind(this), this.options.throttle)
    this._throttledScrollOffset = throttle(this._setScrollOffset.bind(this), this.options.throttle)

    // Listen to scroll and resize events.
    window.addEventListener('scroll', this._throttledUpdate, false)
    window.addEventListener('resize', this._throttledScrollOffset, false)

    // Call the initialization callback.
    this.options.onInit.call(this)
  }

  /**
   * Calculates and sets the scroll offset at which the element should become stuck.
   * If the offset is a number, it uses that directly.
   * If the offset is a string (selector), it finds that element and calculates its position.
   * @private
   */
  _setScrollOffset() {
    const { offset, offsetSide } = this.options
    if (typeof offset === 'number') {
      this.scrollOffset = offset
    } else if (typeof offset === 'string') {
      const target = document.querySelector(offset)
      if (target) {
        this.scrollOffset = getElementYPosition(target, offsetSide)
      } else {
        this.scrollOffset = 300 // Default fallback if the selector isn't found.
      }
    } else {
      throw new Error(`Invalid offset: ${offset}`)
    }
  }

  /**
   * Destroys the StickIt instance:
   * - Removes the cloned element from the DOM.
   * - Removes scroll and resize event listeners.
   * - Calls the onDestroy callback.
   */
  destroy() {
    if (this.clonedElem && this.clonedElem.parentNode) {
      document.body.removeChild(this.clonedElem)
    }
    window.removeEventListener('scroll', this._throttledUpdate)
    window.removeEventListener('resize', this._throttledScrollOffset)

    this.options.onDestroy.call(this)
  }

  /**
   * Makes the element "stick" by adding the sticky class and removing any unstick class.
   * Also sets the visible state to true and calls the onStick callback.
   */
  stick() {
    if (!this.visible) {
      this.clonedElem.classList.remove(this.options.classes.unstick)
      this.clonedElem.classList.add(this.options.classes.stick)
      this.visible = true
      this.options.onStick.call(this)
    }
  }

  /**
   * Makes the element "unstick" by adding the unstick class and removing the stick class.
   * Also sets the visible state to false and calls the onUnstick callback.
   */
  unstick() {
    if (this.visible) {
      this.clonedElem.classList.remove(this.options.classes.stick)
      this.clonedElem.classList.add(this.options.classes.unstick)
      this.visible = false
      this.options.onUnstick.call(this)
    }
  }

  /**
   * Checks the current scroll position and decides whether the element should
   * stick or unstick.
   */
  update() {
    if (getScrollY() > this.scrollOffset) {
      this.stick()
    } else {
      this.unstick()
    }
  }
}
