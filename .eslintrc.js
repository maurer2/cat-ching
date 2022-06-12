module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:react-hooks/recommended",
    // "plugin:unicorn/recommended",
    "airbnb",
    "airbnb-typescript",
  ],
  env: {
    browser: true,
    es2020: true,
    jest: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
    project: ["tsconfig.json"],
    tsconfigRootDir: __dirname,
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "jsx-a11y/label-has-for": [
      "warn",
      {
        required: {
          some: ["nesting", "id"],
        },
      },
    ],
    "jsx-a11y/label-has-associated-control": [
      "warn",
      {
        required: {
          some: ["nesting", "id"],
        },
      },
    ],
    "object-curly-newline": [
      "warn",
      {
        ObjectExpression: "always",
        ObjectPattern: { multiline: true },
        ImportDeclaration: "never",
        ExportDeclaration: { multiline: true, minProperties: 3 },
      },
    ],
    "import/no-extraneous-dependencies": "off",
    "react/jsx-no-bind": "off", // temp
    "@typescript-eslint/ban-ts-comment": "off", // temp
    "no-restricted-exports": "off", // https://github.com/airbnb/javascript/issues/2500
  },
};
