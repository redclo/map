const { getThemeVariables } = require("ant-design-vue/dist/theme");

module.exports = Object.assign(
  getThemeVariables({
    dark: true,
  }),
  {
    "primary-color": "#E88B00",
    "component-background": "#383838",
  }
);
