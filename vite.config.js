const { defineConfig } = require('vite');
const react = require('@vitejs/plugin-react');

module.exports = defineConfig({
	plugins: [react()],
	optimizeDeps: {
		include: ['react', 'react/jsx-dev-runtime', 'react/jsx-runtime'],
	},
});
