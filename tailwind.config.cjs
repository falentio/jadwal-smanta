const config = {
	mode: 'jit',
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				abel: ['Abel', 'sans-serif'],
				cinzel: ['Cinzel', 'serif']
			}
		}
	},

	plugins: []
};

module.exports = config;
