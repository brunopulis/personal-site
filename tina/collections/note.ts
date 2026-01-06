import type {Collection} from 'tinacms';

export const NoteCollection: Collection = {
	name: 'note',
	label: 'Notas',
	path: 'src/content/notes',
	format: 'md',
	match: {
		include: '**/*'
	},
	fields: [
		{
			type: 'string',
			name: 'title',
			label: 'Título'
		},
		{
			type: 'datetime',
			name: 'pubDate',
			label: 'Data de Publicação',
			required: true,
			ui: {
				dateFormat: 'DD/MM/YYYY',
				timeFormat: 'HH:mm'
			},
			searchable: false
		},
		{
			type: 'boolean',
			name: 'published',
			label: 'Publicado',
			searchable: false
		},
		{
			type: 'string',
			name: 'type',
			label: 'Tipo',
			options: [{value: 'note', label: 'Nota'}],
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
