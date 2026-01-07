import type {Collection} from 'tinacms';

export const PostCollection: Collection = {
	name: 'post',
	label: 'Blog',
	path: 'src/content/posts',
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
			label: 'Data de Publicação',
			required: true,
			ui: {
				dateFormat: 'DD/MM/YYYY'
			},
			searchable: false
		},
		{
			type: 'string',
			name: 'description',
			label: 'Descrição/Resumo',
			required: true,
			ui: {
				component: 'textarea',
				description: 'Resumo do post para SEO e preview'
			}
		},
		{
			type: 'image',
			name: 'featured_image',
			label: 'Imagem Destaque',
			searchable: false
		},
		{
			type: 'rich-text',
			name: 'body',
			label: 'Conteúdo',
			isBody: true,
			ui: {
				component: 'markdown'
			}
		},
		{
			type: 'string',
			name: 'categories',
			label: 'Categorias',
			list: true,
			ui: {
				component: 'list'
			},
			options: [
				{value: 'tecnologia', label: 'Tecnologia'},
				{value: 'design', label: 'Design'},
				{value: 'desenvolvimento', label: 'Desenvolvimento'},
				{value: 'tutorial', label: 'Tutorial'},
				{value: 'opiniao', label: 'Opinião'},
				{value: 'noticias', label: 'Notícias'}
			],
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
			type: 'boolean',
			name: 'draft',
			label: 'Rascunho',
			ui: {
				description: 'Marque para manter como rascunho'
			},
			searchable: false
		},
		{
			type: 'object',
			name: 'seo',
			label: 'SEO',
			fields: [
				{
					type: 'string',
					name: 'meta_title',
					label: 'Meta Title'
				},
				{
					type: 'string',
					name: 'meta_description',
					label: 'Meta Description',
					ui: {
						component: 'textarea'
					}
				},
				{
					type: 'string',
					name: 'keywords',
					label: 'Keywords',
					list: true,
					searchable: false
				}
			],
			searchable: false
		}
	]
};
