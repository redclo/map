module.exports = {
  presets: [
    "@vue/cli-plugin-babel/preset",
    "@babel/preset-typescript",
    "@linaria",
  ],
  plugins: [
    "@vue/babel-plugin-jsx",
    ["import", { libraryName: "ant-design-vue", libraryDirectory: "es",  style: true}, "antd"],
    ["import", { libraryName: "queenjs/ui", libraryDirectory: "."}, "queen-ui"],
    ["import", { libraryName: "queenjs/use", libraryDirectory: "."}, "queen-use"],

  ],
};
