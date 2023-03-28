module.exports = function (api) {
	api.cache(true);
	return {
		presets: ['babel-preset-expo'],
		plugins: [
			[
				'module-resolver',
				{
					alias: {
						'@/shared-components': './src/shared-components',
						'@/routes': './src/routes',
						'@/hooks': './src/hooks',
						'@/lib': './src/lib',
						'@/api': './src/api',
						'@/assets': './assets',
						'@/context': './src/context',
					},
					extensions: ['.js', '.jsx', '.ts', '.tsx'],
				},
			],
		],
		env: {
			production: {
				plugins: ['react-native-paper/babel'],
			},
		},
	};
};
