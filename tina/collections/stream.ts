import type {Collection} from 'tinacms';

export const StreamCollection: Collection = {
	name: 'stream',
	label: 'Streams',
	path: 'src/content/streams',
	format: 'md',
	match: {
		include: '**/*'
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
			name: 'type',
			label: 'Tipo',
			searchable: false
		},
		{
			type: 'string',
			name: 'detail',
			label: 'Detalhes',
			searchable: false
		},
		{
			type: 'datetime',
			name: 'pubDate',
			label: 'Data de Publicação',
			ui: {
				dateFormat: 'DD/MM/YYYY'
			},
			searchable: false
		},
		{
			type: 'string',
			name: 'tags',
			label: 'Tags',
			list: true,
			ui: {
				component: 'tags'
			},
			searchable: false
		},
		{
			type: 'string',
			name: 'body',
			label: 'Conteúdo',
			isBody: true
		}
	]
};
