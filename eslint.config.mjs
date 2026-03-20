export default [
  {
    ignores: [".next/*", "dist/*", "node_modules/*"],
  },
  {
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "error"
    }
  }
];
