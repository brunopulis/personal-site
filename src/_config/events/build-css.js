import fs from 'node:fs/promises';
import sass from 'sass';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

export const buildAllCss = async () => {
	try {
		const result = sass.compile('src/assets/scss/main.scss', {
			loadPaths: ['node_modules'],
			style: 'compressed',
			sourceMap: process.env.ELEVENTY_RUN_MODE !== 'build'
		});

		const processed = await postcss([autoprefixer(), cssnano({preset: 'default'})]).process(result.css, {
			from: 'src/assets/scss/main.scss',
			to: 'src/assets/css/main.css'
		});
		await fs.mkdir('src/assets/css', {recursive: true});

		await fs.writeFile('src/assets/css/main.css', processed.css);

		console.log('✅ CSS compilado com sucesso em src/assets/css/main.css');

		if (process.env.ELEVENTY_RUN_MODE !== 'build' && result.sourceMap) {
			await fs.writeFile('src/assets/css/main.css.map', JSON.stringify(result.sourceMap));
		}
	} catch (error) {
		console.error('❌ Erro ao compilar SCSS:', error);
		throw error;
	}
};
