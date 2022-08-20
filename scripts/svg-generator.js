const fs = require("fs");
const { upperFirst } = require("lodash");
const path = require("path");

let pathName = path.join(__dirname, "../queenjs/icons/svg");
fs.readdir(pathName, function (err, files) {
  let icons = [];
  (function iterator(i) {
    const fileName = files[i];
    if (i == files.length) {
      fs.writeFileSync(
        path.join(__dirname, "../queenjs/icons/index.ts"),
        templet_svg(icons)
      );
      return;
    }
    let fileUrl = path.join(pathName, fileName);
    fs.stat(fileUrl, function (err, data) {
      if (data.isFile()) {
        const value = formatSvg(fs.readFileSync(fileUrl, "utf-8"));
        fs.writeFileSync(fileUrl, value);
        const name = ("icon_" + fileName.slice(0, -4))
          .split("_")
          .map((s) => upperFirst(s))
          .join("");
        fs.writeFileSync(
          path.join(__dirname, `../queenjs/icons/components/${name}.tsx`),
          templet_icon({ name, value })
        );
        icons.push(name);
      }
      iterator(i + 1);
    });
  })(0);
});

const templet_svg = template`
export * from "./createIcon";
${(icons) =>
  icons.map((icon) => `export * from "./components/${icon}";`).join("\n")}
`;

const templet_icon = template`
import { createIcon } from '../createIcon';
export const ${(props) => props.name} = createIcon(${(props) => props.value})
`;

function template(arr1, ...arr2) {
  return function (props) {
    let tpl_str = "";
    for (let i = 0; i <= arr1.length; i++) {
      tpl_str += (arr1[i] || "") + (arr2[i] ? arr2[i](props) : "");
    }
    return tpl_str;
  };
}

const formatSvg = function (data) {
  let classList = {};
  let [, styles] = data.match(/<style>((.|\n|\r)+?)<\/style>/) || [];
  let [, svgAttr] = data.match(/<svg((.|\n|\r)+?)>/) || [];

  const attrs = [];
  svgAttr.split(" ").forEach((attr) => {
    if (!/^(xmlns|width|height|version)=/.test(attr)) {
      attrs.push(attr);
    }
  });
  let fmtSvgStr = data.replace(/<svg((.|\n|\r)+?)>/, `<svg${attrs.join(" ")}>`);

  if (styles) {
    styles = styles.replace(/\s/g, "");
    const attrs = styles.split(";}");
    attrs.forEach((attr) => {
      if (!attr) return;
      let [cNames, values] = attr.split("{");
      valuesObj = {};
      values.split(";").forEach((value) => {
        let [key, val] = value.split(":");
        valuesObj[key] = val;
      });
      cNames.split(",").forEach((name) => {
        name = name.slice(1);
        classList[name] = Object.assign({}, classList[name], valuesObj);
      });
    });
  }

  fmtSvgStr = fmtSvgStr.replace(/<defs>(.|\n|\r)+?<\/defs>/, "");
  for (let className in classList) {
    fmtSvgStr = fmtSvgStr.replace(
      new RegExp(`class="${className}"`, "g"),
      fmtVals(classList[className])
    );
  }

  fmtSvgStr = fmtSvgStr.replace(
    / (stroke|fill|class|id|data\-name|p\-id)="(.+?)"/g,
    (str, key, value) => {
      if (["class", "id", "data-name", "p-id"].indexOf(key) != -1) return "";
      if (value !== "none" && value !== "#fff") {
        return ` ${key}="currentColor"`;
      }
      return str;
    }
  );

  function fmtVals(obj) {
    let valArr = [];
    for (let name in obj) {
      valArr.push(`${name}="${obj[name]}"`);
    }
    return valArr.join(" ");
  }

  return fmtSvgStr;
};
