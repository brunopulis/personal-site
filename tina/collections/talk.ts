import type {Collection} from 'tinacms';

export const TalkCollection: Collection = {
	name: 'talk',
	label: 'Palestras',
	path: 'src/content/talks',
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
			type: 'datetime',
			name: 'date',
			label: 'Data',
			ui: {
				dateFormat: 'DD/MM/YYYY'
			},
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
