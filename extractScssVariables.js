const fs = require("fs");
const util = require("util");
const path = require("path");
const sassExtract = require("sass-extract");
const rgbHex = require("rgb-hex");
const { writeFile } = fs.promises;

const extract = () => {
  const rendered = sassExtract.renderSync(
    {
      file: path.resolve(__dirname, "./src/scss/entry.scss"),
    },
    {
      plugins: [
        {
          plugin: "sass-extract-js",
          options: { camelCase: false },
        },
        {
          plugin: {
            run: () => ({
              postExtract: (vars) =>
                Object.keys(vars).reduce((ret, key) => {
                  ret[`$${key}`] = `#${rgbHex(vars[key])}`;
                  return ret;
                }, {}),
            }),
          },
        },
      ],
    }
  );
  console.log(rendered.vars);
  writeFile(
    path.resolve(__dirname, "./src/variables.js"),
    `
    export const scssVariables = ${JSON.stringify(rendered.vars, null, 2)}
  `.trim()
  );
};

extract();
