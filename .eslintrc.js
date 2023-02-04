// @ts-check

const { getTsconfigPath } = require("@grikomsn/style-guide-core/eslint/utils/tsconfig");

const tsconfigPath = getTsconfigPath();

/** @type {import("eslint").Linter.Config} */
const eslintConfig = {
  extends: [
    require.resolve("@grikomsn/style-guide-core/eslint/node"),
    require.resolve("@grikomsn/style-guide-core/eslint/typescript"),
  ],
  ignorePatterns: ["node_modules"],
  parserOptions: {
    project: tsconfigPath,
  },
  settings: {
    "import/resolver": {
      typescript: {
        project: tsconfigPath,
      },
    },
  },
  root: true,
};

module.exports = eslintConfig;
