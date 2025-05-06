# safe-open

A small utility to safely open URLs, upgrading `http` to `https` when necessary.

<p>
  <a href="https://www.npmjs.com/package/safe-open">
    <img src="https://img.shields.io/npm/v/safe-open.svg" alt="Version" />
  </a>
  <a href="https://coveralls.io/github/yyz945947732/safe-open?branch=master">
    <img
      src="https://coveralls.io/repos/github/yyz945947732/safe-open/badge.svg?branch=master"
      alt="Coverage Status"
    />
  </a>
  <a href="https://github.com/yyz945947732/safe-open/pulls">
    <img
      src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg"
      alt="PRs Welcome"
    />
  </a>
  <a href="https://github.com/yyz945947732/safe-open/blob/master/LICENSE">
    <img
      src="https://img.shields.io/badge/license-MIT-blue.svg"
      alt="GitHub license"
    />
  </a>
</p>

## Install

```bash
npm install safe-open
# or
yarn add safe-open
# or
pnpm install safe-open
```

## Usage

```js
import open from 'safe-open';

// Open 'https://www.google.com' if the current page is served over HTTPS
open('http://www.google.com');

// Specify target window (e.g., same tab)
open('http://www.google.com', '_self');

// Specify window features
open("http://www.google.com", "mozillaWindow", "popup");
```

## API

### open(url?, target?, features?)

This function follows the same signature as [window.open](https://developer.mozilla.org/en-US/docs/Web/API/Window/open).

#### Parameters

- `url` _(string)_ – The URL to open. If the page is HTTPS and the URL starts with `http://`, it will be automatically converted to `https://`.
- `target` _(string, optional)_ – Specifies where to open the URL (`_blank`, `_self`, etc.).
- `features` _(string, optional)_ – Additional window features such as size or position.

## LICENSE

[MIT](https://github.com/yyz945947732/safe-open/blob/master/LICENSE)

---

This project is created using [generator-stupid](https://github.com/yyz945947732/generator-stupid).
