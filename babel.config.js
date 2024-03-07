module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    "react-native-reanimated/plugin",
    [
      "module:react-native-dotenv",
      {
        moduleName: "@env",
        path: ".env",
        blocklist: null,
        allowlist: ["SKIP_LOGIN_TYPE"],
        safe: true,
        allowUndefined: true,
        verbose: true,
      },
    ],
  ],
};
