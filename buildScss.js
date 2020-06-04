const fs = require("fs");
const util = require("util");
const path = require("path");
const sass = require("node-sass");

const sassRender = util.promisify(sass.render);
const writeFile = util.promisify(fs.writeFile);

const compile = async () => {
  const { css } = await sassRender({
    file: path.resolve(__dirname, "./src/scss/entry.scss"),
    outputStyle: "expanded",
  });
  await writeFile(path.resolve(__dirname, "./dist/styles.css"), css);
};

compile();
