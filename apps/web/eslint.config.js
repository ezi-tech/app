import baseConfig, { restrictEnvAccess } from "@ezi/eslint-config/base";
import nextjsConfig from "@ezi/eslint-config/nextjs";
import reactConfig from "@ezi/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [".next/**"],
  },
  ...baseConfig,
  ...reactConfig,
  ...nextjsConfig,
  ...restrictEnvAccess,
];