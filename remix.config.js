/**
 * @type {import('@remix-run/dev').AppConfig}
 */
export default {
	tailwind: true,
	postcss: true,
	ignoredRouteFiles: [".*", "_*.components"],
	serverDependenciesToBundle: [/^react-icons/],
};
