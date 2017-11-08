# Custom Rollup Config Example

A simple example demonstrating how to setup `nodify` with custom `rollup` config.

## Clone

 Clone just this example using 

```shell
curl https://codeload.github.com/shrynx/nodify/tar.gz/master | tar -xz --strip=2 nodify-master/examples/custom-rollup
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

rollup config is modified to use `./main.js` as entry point rather than `src/index.js`.

for more refer

-   [nodify rollup customization](https://github.com/shrynx/nodify#rollup)

-   [rollupjs](https://rollupjs.org/)
