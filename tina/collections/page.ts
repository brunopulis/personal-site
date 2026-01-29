import type {Collection} from 'tinacms';

export const PageCollection: Collection = {
	name: 'page',
	label: 'Páginas',
	path: 'src/pages',
	format: 'md',
	match: {
		include: '*',
		exclude: 'services/**/*'
	},
	fields: [
		{
			type: 'string',
			name: 'title',
			label: 'Título',
			isTitle: true,
			required: true
		},
		{
			type: 'string',
			name: 'description',
			label: 'Descrição',
			ui: {
				component: 'textarea'
			},
			searchable: false
		},
		{
			type: 'string',
			name: 'permalink',
			label: 'Permalink',
			searchable: false
		},
		{
			type: 'rich-text',
			name: 'body',
			label: 'Conteúdo',
			isBody: true
		}
	]
};
