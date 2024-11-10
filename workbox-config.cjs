module.exports = {
	globDirectory: 'src/',
	globPatterns: [
		'**/*.{jsx,svg,jpg,css}'
	],
	swDest: 'src/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};