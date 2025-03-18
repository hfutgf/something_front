import eslint from "@eslint/js";
import airbnb from "eslint-config-airbnb";
import prettier from "eslint-config-prettier";
import next from "eslint-plugin-next";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import tailwindcss from "eslint-plugin-tailwindcss";

export default [
  eslint.configs.recommended,
  airbnb,
  prettier,
  tailwindcss.configs.recommended,
  next.configs["core-web-vitals"],
  {
    plugins: {
      prettier,
      tailwindcss,
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "react/jsx-filename-extension": [
        1,
        { extensions: [".js", ".jsx", ".ts", ".tsx"] },
      ],
      "no-console": "warn",
      "simple-import-sort/imports": "error",
      "import/no-duplicates": "error",
      "newline-before-return": "error",
      "no-unused-vars": ["error", { args: "none" }],
      "import/no-extraneous-dependencies": "off",
      "import/extensions": "off",
      "react/jsx-props-no-spreading": "off",
      "react/no-array-index-key": "off",
      "react/require-default-props": [
        "error",
        { ignoreFunctionalComponents: true },
      ],
      "tailwindcss/migration-from-tailwind-2": "off",
      "eol-last": ["error", "always"],
      "react/function-component-definition": "off",
      "jsx-a11y/no-static-element-interactions": "off",
      "jsx-a11y/click-events-have-key-events": "off",
      "jsx-a11y/no-noninteractive-element-interactions": "off",
    },
  },
];
