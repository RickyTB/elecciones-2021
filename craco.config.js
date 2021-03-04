const rawLoader = require("craco-raw-loader");

module.exports = {
  plugins: [{ plugin: rawLoader, options: { test: /\.sql$/ } }],
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      webpackConfig.module.defaultRules = [
        {
          type: "javascript/auto",
          resolve: {},
        },
        {
          test: /\.json$/i,
          type: "json",
        },
      ];
      return webpackConfig;
    },
  },
};
