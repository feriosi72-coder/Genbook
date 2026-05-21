module.exports = [
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "script",
      globals: {
        browser: "readonly",
        window: "readonly",
        document: "readonly",
        localStorage: "readonly",
        console: "readonly",
        alert: "readonly",
        setTimeout: "readonly",
        setInterval: "readonly",
        clearTimeout: "readonly",
        clearInterval: "readonly",
        fetch: "readonly",
        Blob: "readonly",
        URL: "readonly",
        FileReader: "readonly",
        DOMParser: "readonly"
      }
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "off",
      semi: ["error", "always"],
      quotes: ["warn", "single"]
    }
  }
];
