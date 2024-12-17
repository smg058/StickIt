# StickIt

**StickIt** is a modern, customizable sticky header plugin that allows you to "stick" elements to the top of the viewport on demand. It is a modernized and enhanced version of the original [Headhesive.js](https://github.com/markgoodyear/headhesive.js) by Mark Goodyear, updated and maintained by **Chayson Media Group**.

StickIt supports configurable offsets, numeric or element-based triggers, and includes modern development features like source maps and modular code.

---

## Table of Contents

1. [Features](#features)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Configuration](#configuration)
5. [Examples](#examples)
6. [Development](#development)
7. [Credits](#credits)
8. [License](#license)

---

## Features

- **On-Demand Sticky Headers**: Stick any element to the top of the page when you scroll past a defined threshold.
- **Configurable Offsets**: Trigger sticky behavior using either:
  - A **numeric offset** (in pixels).
  - An existing **element** on the page.
- **Modular Codebase**: Written in ES6 modules for modern JavaScript development.
- **Production Ready**: Minified builds (`stick-it.min.js`) with source maps for debugging.
- **Customizable**: Fully customizable CSS classes and lifecycle callbacks.
- **Lightweight**: No external dependencies.

---

## Installation

You can install StickIt via NPM:

```bash
npm install stick-it-plugin
```

Alternatively, include the pre-built UMD version via a `<script>` tag:

```html
<script src="dist/stick-it.min.js"></script>
```

---

## Usage

### Including StickIt in Your Project

#### 1. **Using ES Modules (Recommended)**

If you are using a bundler like Rollup, Webpack, or Vite, you can import StickIt as an ES module:

```javascript
import StickIt from './dist/stick-it.min.js';
```

#### 2. **Using UMD Build**

Include StickIt in your project using a `<script>` tag. This makes StickIt available globally.

```html
<script src="dist/stick-it.min.js"></script>
<script>
  const stickyHeader = new StickIt('.my-header', {
    offset: 200,
    onStick: () => console.log('Header stuck!'),
    onUnstick: () => console.log('Header unstuck!')
  });
</script>
```

---

## Configuration

StickIt accepts an object with customizable options:

| Option           | Type                | Default                | Description                                                                 |
|------------------|---------------------|------------------------|-----------------------------------------------------------------------------|
| `offset`         | `number` / `string`| `300`                  | Numeric scroll offset (in px) or a CSS selector for an element.             |
| `offsetSide`     | `string`           | `'top'`                | Determines which side (`'top'` or `'bottom'`) is used for the offset.       |
| `classes`        | `object`           | `{}`                   | Custom CSS classes for the sticky element. See below for class options.     |
| `throttle`       | `number`           | `250`                  | Delay in ms for throttling scroll and resize events.                        |
| `onInit`         | `function`         | `() => {}`             | Callback when StickIt is initialized.                                       |
| `onStick`        | `function`         | `() => {}`             | Callback when the element becomes sticky.                                   |
| `onUnstick`      | `function`         | `() => {}`             | Callback when the element is unstuck.                                       |
| `onDestroy`      | `function`         | `() => {}`             | Callback when StickIt is destroyed.                                         |

### Default Classes

StickIt applies the following CSS classes:

| Class               | Description                                         |
|----------------------|-----------------------------------------------------|
| `clone`             | Applied to the cloned sticky element.               |
| `stick`             | Applied when the element becomes sticky.            |
| `unstick`           | Applied when the element is no longer sticky.       |

---

## Example: Basic Usage

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>StickIt Demo</title>
  <script src="dist/stick-it.min.js"></script>
</head>
<body>
  <header class="my-header">My Sticky Header</header>
  <div style="height: 1500px;">Scroll down to see it stick!</div>

  <script>
    const stickyHeader = new StickIt('.my-header', {
      offset: 100,
      onStick: () => console.log('Header is now sticky!'),
      onUnstick: () => console.log('Header is unstuck.')
    });
  </script>
</body>
</html>
```

---

## Development

Clone the repository and install dependencies:

```bash
git clone https://github.com/chayson/stick-it.git
cd stick-it
npm install
```

### Build the Project

To bundle the project with Rollup, run:

```bash
npm run build
```

The output files will be available in the `dist/` folder:
- `stick-it.js` - Unminified UMD build.
- `stick-it.min.js` - Minified UMD build with source maps.

---

## Credits

- **Original Inspiration**: [Headhesive.js](https://github.com/markgoodyear/headhesive.js) by Mark Goodyear.
- **Modernization & Enhancements**: Maintained by [Chayson Media Group](https://chayson.com).

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
