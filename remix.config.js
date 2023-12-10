/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  appDirectory: "app",
  assetsBuildDirectory: "public/build",
  publicPath: "/build/",
  serverBuildDirectory: "api/_build",
  ignoredRouteFiles: [".*", "_*.components"],
  future: {
    v2_dev: true,
    v2_errorBoundary: true,
    v2_normalizeFormMethod: true,
  }
};
