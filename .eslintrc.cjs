module.exports = {
  env: {
    node: true,
  },
  parserOptions: {
    "parser": "@typescript-eslint/parser",
  },
  plugins: [
    "vue",
    "@typescript-eslint",
  ],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/vue3-recommended",
  ],
  rules: {
    "quotes": ["warn", "double"],
    "vue/max-attributes-per-line": ["warn", { "singleline": 3 }],
    "semi": ["warn", "always", { "omitLastInOneLineBlock": true }],
    "vue/singleline-html-element-content-newline": 0,
    "vue/attribute-hyphenation": ["warn", "never"],
    "vue/v-on-event-hyphenation": ["warn", "never"],
    "vue/multi-word-component-names": "off"
  }
};