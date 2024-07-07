const path = require("path");
const resolve = (dir) => path.resolve(__dirname, dir);
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2020: true,
  },
  parserOptions: {
    parser: "babel-eslint",
    ecmaVersion: 12,
    sourceType: "module",
  },
  extends: ["plugin:vue/essential", "airbnb-base", "plugin:prettier/recommended"],
  globals: {
    __static: true,
  },
  plugins: ["html", "vue", "prettier", "babel"],
  rules: {
    quotes: [1, "double"],
    // allow paren-less arrow functions
    "arrow-parens": 0,
    // allow async-await
    "generator-star-spacing": 0,
    // allow debugger during development
    "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0,
    "import/extensions": [
      "error",
      "always",
      {
        js: "never",
        vue: "never",
      },
    ],
    "global-require": 0,
    "import/no-dynamic-require": 0,
    "import/no-cycle": 0,
    "import/prefer-default-export": 0,
    "no-console": 0,
    "no-param-reassign": 0,
    "import/no-extraneous-dependencies": 0,
    "no-underscore-dangle": 0,
    "no-multi-assign": 0,
    "no-sequences": 0,
    "no-plusplus": 0,
    "vue/valid-v-else": 0,
    "no-buffer-constructor": 0,
    "no-useless-escape": 0,
    "consistent-return": 0,
    "prefer-destructuring": 0,
  },
  settings: {
    "import/resolver": {
      alias: {
        map: [
          ["@", resolve("./src/renderer")],
          ["assets", resolve("./src/renderer/assets")],
          ["views", resolve("./src/renderer/views")],
          ["components", resolve("./src/renderer/components")],
          ["utils", resolve("./src/renderer/utils")],
          ["api", resolve("./src/renderer/api")],
          ["store", resolve("./src/renderer/store")],
          ["router", resolve("./src/renderer/router")],
          ["vue$", "vue/dist/vue.esm.js"],
        ],
      },
    },
  },
};
