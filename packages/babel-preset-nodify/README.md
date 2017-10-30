# babel-preset-nodify

This package includes the [Babel](https://babeljs.io) preset used by [Nodify](https://github/com/shrynx/nodify).

## Features

-   [`babel-env-preset`](http://babeljs.io/docs/plugins/preset-env/) included to compile to user's node version.
-   adds support for transorming [class properties](https://babeljs.io/docs/plugins/transform-class-properties).
-   adds support for [object rest-spread operator](https://babeljs.io/docs/plugins/transform-object-rest-spread/).
-   support `test` enviromnet useful for testing with libraries like jest, etc.

## Usage

This package is comes pre-installed with `Nodify`, you don't have to install it seperately.

## Alternate usage

If you want to use this preset outside the context of `Nodify`,
simply install `babel-preset-nodify` and add to `.babelrc`.

```javascript
{
  "presets": ["nodify"]
}
```
