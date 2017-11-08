# ReasonML Example

A simple example demonstrating how to setup `nodify` with [reason](https://reasonml.github.io/)

## Clone

 Clone just this example using 

```shell
curl https://codeload.github.com/shrynx/nodify/tar.gz/master | tar -xz --strip=2 nodify-master/examples/reasonml
```

## Usage

  first install the dependencies

```shell
npm install 
```

  and then run development build

```shell
npm run dev
```

## Customization

Added [bucklescript platform](http://bucklescript.github.io/bucklescript/Manual.html#_installation), configured `bsconfig.json` and customized `rollup` config to add [rollup-plugin-bucklescript](https://github.com/shrynx/rollup-plugin-bucklescript) and modify entry point as `src/main.re`

for more refer

-   [reason](https://reasonml.github.io/)

-   [bucklesript](https://bucklescript.github.io/bucklescript/Manual.html)

-   [nodify rollup customization](https://github.com/shrynx/nodify#rollup)
