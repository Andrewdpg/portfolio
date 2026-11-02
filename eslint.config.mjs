import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {settings: {react: {version: "detect"}}},
  // react-three-fiber JSX props (position, args, castShadow…) aren't DOM props.
  {files: ["src/features/desk/**/*.tsx"], rules: {"react/no-unknown-property": "off"}},
];