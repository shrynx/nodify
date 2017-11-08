# Serverless Example

A simple example demonstrating how to setup `nodify` for [serverless](https://serverless.com/)

## Clone

 Clone just this example using 

```shell
curl https://codeload.github.com/shrynx/nodify/tar.gz/master | tar -xz --strip=2 nodify-master/examples/serverless
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

customized `rollup` config to add [rollup-plugin-node-resolve](https://github.com/rollup/rollup-plugin-node-resolve) to bundle node_modules with the build and also added [rollup-plugin-babel-minify](https://github.com/Comandeer/rollup-plugin-babel-minify) so as to reduce the size of the build.
Also babel has been customised to target appropriate node version for serverless.

for more refer

-   [serverless](https://github.com/serverless/serverless)

-   [nodify rollup customization](https://github.com/shrynx/nodify#rollup)

-   [nodify babel customization](https://github.com/shrynx/nodify#babel)

