import type { Collection } from 'tinacms';

export const ServiceCollection: Collection = {
  name: 'service',
  label: 'Serviços',
  path: 'src/content/pages/services',
  format: 'md',
  match: {
    include: '**/*',
  },
  fields: [
    {
      type: 'string',
      name: 'title',
      label: 'Título',
      isTitle: true,
      required: true,
    },
    {
      type: 'string',
      name: 'slug',
      label: 'Slug',
      searchable: false,
    },
    {
      type: 'string',
      name: 'description',
      label: 'Descrição',
      ui: {
        component: 'textarea',
      },
      searchable: false,
    },
    {
      type: 'string',
      name: 'permalink',
      label: 'Permalink',
      searchable: false,
    },
    {
      type: 'string',
      name: 'url',
      label: 'URL',
      searchable: false,
    },
    {
      type: 'object',
      name: 'service',
      label: 'Detalhes do Serviço',
      fields: [
        {
          type: 'string',
          name: 'color',
          label: 'Cor (Tailwind Class)',
          searchable: false,
        },
        {
          type: 'string',
          name: 'tagline',
          label: 'Tagline',
          searchable: false,
        },
        {
          type: 'string',
          name: 'icon',
          label: 'Ícone (Emoji)',
          searchable: false,
        },
        {
          type: 'string',
          name: 'problem',
          label: 'Problema',
          ui: {
            component: 'textarea',
          },
          searchable: false,
        },
        {
          type: 'string',
          name: 'solution',
          label: 'Solução',
          ui: {
            component: 'textarea',
          },
          searchable: false,
        },
        {
          type: 'string',
          name: 'differentials',
          label: 'Diferenciais',
          list: true,
          searchable: false,
        },
        {
          type: 'string',
          name: 'included',
          label: 'O que está incluso',
          list: true,
          searchable: false,
        },
        {
          type: 'object',
          name: 'results',
          label: 'Resultados',
          list: true,
          fields: [
            {
              type: 'string',
              name: 'title',
              label: 'Título',
            },
            {
              type: 'string',
              name: 'description',
              label: 'Descrição',
            },
          ],
          searchable: false,
        },
        {
          type: 'string',
          name: 'target',
          label: 'Público Alvo',
          list: true,
          searchable: false,
        },
        {
          type: 'object',
          name: 'processes',
          label: 'Processo',
          list: true,
          fields: [
            {
              type: 'string',
              name: 'title',
              label: 'Título',
            },
            {
              type: 'string',
              name: 'description',
              label: 'Descrição',
            },
          ],
          searchable: false,
        },
        {
          type: 'string',
          name: 'timeline',
          label: 'Timeline',
          searchable: false,
        },
        {
          type: 'object',
          name: 'plans',
          label: 'Planos',
          list: true,
          fields: [
            {
              type: 'string',
              name: 'name',
              label: 'Nome',
            },
            {
              type: 'boolean',
              name: 'highlight',
              label: 'Destaque',
            },
            {
              type: 'string',
              name: 'subtitle',
              label: 'Subtítulo',
            },
            {
              type: 'string',
              name: 'description',
              label: 'Descrição',
              ui: {
                component: 'textarea',
              },
            },
            {
              type: 'string',
              name: 'includes',
              label: 'Incluso',
              list: true,
              searchable: false,
            },
            {
              type: 'string',
              name: 'delivery',
              label: 'Entrega',
            },
          ],
          searchable: false,
        },
        {
          type: 'object',
          name: 'testimonials',
          label: 'Depoimentos',
          fields: [
            {
              type: 'string',
              name: 'cliente',
              label: 'Cliente',
            },
            {
              type: 'string',
              name: 'quote',
              label: 'Citação',
              ui: {
                component: 'textarea',
              },
            },
            {
              type: 'string',
              name: 'resultado',
              label: 'Resultado',
            },
          ],
          searchable: false,
        },
        {
          type: 'object',
          name: 'faq',
          label: 'FAQ',
          list: true,
          fields: [
            {
              type: 'string',
              name: 'question',
              label: 'Pergunta',
            },
            {
              type: 'string',
              name: 'answer',
              label: 'Resposta',
              ui: {
                component: 'textarea',
              },
            },
          ],
          searchable: false,
        },
        {
          type: 'object',
          name: 'cta',
          label: 'Call to Action',
          fields: [
            {
              type: 'string',
              name: 'title',
              label: 'Título',
            },
            {
              type: 'string',
              name: 'description',
              label: 'Descrição',
            },
            {
              type: 'string',
              name: 'primary',
              label: 'Botão Primário',
            },
            {
              type: 'string',
              name: 'secondary',
              label: 'Botão Secundário',
            },
            {
              type: 'string',
              name: 'link',
              label: 'Link',
            },
          ],
          searchable: false,
        },
      ],
    },
  ],
};
