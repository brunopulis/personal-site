import type { Collection } from 'tinacms';

export const ServiceCollection: Collection = {
  name: 'service',
  label: 'Serviços',
  path: 'src/content/pages/services',
  format: 'md',
  match: {
    include: '*',
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
      name: 'permalink',
      label: 'Permalink',
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
        },
        {
          type: 'string',
          name: 'tagline',
          label: 'Tagline',
        },
        {
          type: 'string',
          name: 'icon',
          label: 'Ícone (Emoji)',
        },
        {
          type: 'string',
          name: 'problem',
          label: 'Problema',
          ui: {
            component: 'textarea',
          },
        },
        {
          type: 'string',
          name: 'solution',
          label: 'Solução',
          ui: {
            component: 'textarea',
          },
        },
        {
          type: 'string',
          name: 'differentials',
          label: 'Diferenciais',
          list: true,
        },
        {
          type: 'string',
          name: 'included',
          label: 'O que está incluso',
          list: true,
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
        },
        {
          type: 'string',
          name: 'target',
          label: 'Público Alvo',
          list: true,
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
        },
      ],
    },
  ],
};
