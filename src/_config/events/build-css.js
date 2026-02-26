import fs from 'node:fs/promises';
import sass from 'sass';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

export const buildAllCss = async () => {
	try {
		const fg = (await import('fast-glob')).default;
		const path = await import('node:path');

		const scssFiles = await fg('src/assets/scss/**/*.scss', {
			ignore: ['**/_*.scss']
		});

		await fs.mkdir('src/assets/css', {recursive: true});

		for (const file of scssFiles) {
			const parsedPath = path.parse(file);
			const cssFilename = `${parsedPath.name}.css`;
			const destPath = path.posix.join('src/assets/css', cssFilename);

			const result = sass.compile(file, {
				loadPaths: ['node_modules'],
				style: 'compressed',
				sourceMap: process.env.ELEVENTY_RUN_MODE !== 'build'
			});

			const processed = await postcss([autoprefixer(), cssnano({preset: 'default'})]).process(result.css, {
				from: file,
				to: destPath
			});

			await fs.writeFile(destPath, processed.css);

			console.log(`✅ CSS compilado com sucesso em ${destPath}`);

			if (process.env.ELEVENTY_RUN_MODE !== 'build' && result.sourceMap) {
				await fs.writeFile(`${destPath}.map`, JSON.stringify(result.sourceMap));
			}
		}
	} catch (error) {
		console.error('❌ Erro ao compilar SCSS:', error);
		throw error;
	}
};
