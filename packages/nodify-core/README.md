# Nodify

![nodify-status](https://david-dm.org/shrynx/nodify.svg?path=packages/nodify-core)
[![npm version](https://badge.fury.io/js/nodify-core.svg)](https://badge.fury.io/js/nodify-core)

Nodify is a build tool system for Node.js, allowing you to write next-generation Node.js applications with zero configuration.

## Getting started

### Assumptions

  Nodify assumes by default the entry point of your application to be `src/index.js` 
  and will put output file in `build/main.js`, althought everything is customizable.

* * *

### Installation

  Main package is named `nodify-core`, install it as a **devDependency** in your app.

-   via npm

    ```shell
    npm i -D nodify-core
    ```

-   via yarn

    ```shell
    yarn add -D nodify-core
    ```

* * *

### Usage

  Nodify is exposes two cli commads

-   ### **nodify dev**

     Runs nodify in development mode.
     Allowing you to execute code and reload on change,
     also providing helpful errors.
     ![errors](https://user-images.githubusercontent.com/4706261/32256050-0fa77fa4-bef0-11e7-9326-e678cf7523ac.png)

-   ### **nodify build**

    Builds app ready for production.

    Build version will be outputed in `build/main.js`,

    which you can run directly via node.

    ```shell
    node ./build/main
    ```

Your `package.json` should look like

```javascript
{
  ...
  
  "scripts": {
    "dev": "nodify dev",
    "build": "nodify build",

    ...
  }
  
  ...
}
```

## Customization

Under the hood nodify uses [rollup](https://rollupjs.org/) and [babel](https://babeljs.io/), 
which come preconfigured, but can be completely customised.

### Rollup

To customize rollup config, create a `nodify.config.js` in the root directory of your app.

```javascript
module.exports = {
  rollup: (config) => {
    // access the config here
    // and customize it as you wish
    // finally remember to return the modified config
    return config;
  }
}
```

### Babel

To customize babel plugins and presets configuration, 
create a `.babelrc` file in the root directory of your app.

If this file exisits nodify will rely upon it rather than its internal configuration,
therefore you must use nodify preset in your babelrc file, to make it work woth nodify.
Install the `babel-preset-nodify` as a **devDependency** in your app.

-   via npm

    ```shell
    npm i -D babel-preset-nodify
    ```

-   via yarn

    ```shell
    yarn add -D babel-preset-nodify
    ```

Your `.babelrc` should look like

```javascript
{
  "presets": [
    "nodify",
    // add other presets
  ],
  "plugins": [
    // add plugins
  ]
  ...
}
```

## Built with

-   [rollup](https://rollupjs.org/)
-   [babel](https://babeljs.io/)
-   [nodemon](https://nodemon.io/)

## Acknowledgement

### Prior Art

[Backpack](https://github.com/jaredpalmer/backpack) - Works in same way and uses `webpack`.

### Inspiration

-   [backend-with-webpack](http://jlongster.com/Backend-Apps-with-Webpack--Part-I) by [@jlongster](https://github.com/jlongster)
    for explaing the need of build tools on node backend. 

-   [create-react-app](https://github.com/facebookincubator/create-react-app)
    for popularsing preconfigured tools that help jump start devlopment.

-   [next.js](https://github.com/zeit/next.js)
    for creating customizable configurations.

## License

MIT
