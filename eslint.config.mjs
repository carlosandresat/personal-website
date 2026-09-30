import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  ...nextVitals,
  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      // Remotion project with its own install; see video/README.md.
      "video/**",
    ],
  },
];

export default eslintConfig;