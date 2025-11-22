import fs from 'fs';
import inquirer from 'inquirer';
import path from 'path';

async function run() {
  const { type } = await inquirer.prompt([
    {
      type: 'list',
      name: 'type',
      message: 'Qual tipo de conteúdo você quer criar?',
      choices: [
        'blog',
        'books',
        'bookmarks',
        'likes',
        'movies',
        'newsletter',
        'notes',
        'poetry',
        'speaking',
      ],
    },
  ]);

  const commonQuestions = [
    {
      type: 'input',
      name: 'title',
      message: 'Título:',
      validate: (input) => (input ? true : 'O título não pode estar vazio'),
    },
    {
      type: 'input',
      name: 'description',
      message: 'Descrição curta:',
      default: 'Escreva uma descrição',
    },
    {
      type: 'input',
      name: 'tags',
      message: 'Tags (separadas por vírgula):',
      filter: (input) =>
        input
          .split(',')
          .map((tag) => tag.trim())
          .filter(Boolean),
    },
  ];

  // Perguntas adicionais por tipo
  let extraQuestions = [];
  if (type === 'books') {
    extraQuestions = [
      { type: 'input', name: 'author', message: 'Autor do livro:' },
      { type: 'input', name: 'year', message: 'Ano de publicação:' },
    ];
  } else if (type === 'movies') {
    extraQuestions = [
      { type: 'input', name: 'director', message: 'Diretor do filme:' },
      { type: 'input', name: 'year', message: 'Ano de lançamento:' },
    ];
  } else if (type === 'notes') {
    extraQuestions = [
      {
        type: 'confirm',
        name: 'draft',
        message: 'Nota como rascunho?',
        default: true,
      },
    ];
  } else if (type === 'blog') {
    extraQuestions = [
      {
        type: 'confirm',
        name: 'draft',
        message: 'Post como rascunho?',
        default: true,
      },
    ];
  }

  const answers = await inquirer.prompt([...commonQuestions, ...extraQuestions]);

  const slug = answers.title
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');

  const date = new Date().toISOString().split('T')[0]; // AAAA-MM-DD

  const postsDir = path.join(process.cwd(), 'src', 'content', type);
  if (!fs.existsSync(postsDir)) {
    fs.mkdirSync(postsDir, { recursive: true });
  }

  let filePath;
  if (type === 'notes') {
    // Formato YYYY-DD-MM
    const dateObj = new Date();
    const year = dateObj.getFullYear();
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    filePath = path.join(postsDir, `${year}-${month}-${day}.md`);
  } else {
    filePath = path.join(postsDir, `${slug}.md`);
  }

  let template = '';

  switch (type) {
    case 'blog':
      template = `---
title: "${answers.title}"
description: "${answers.description}"
pubDate: ${date}
tags: [${answers.tags.map((t) => `"${t}"`).join(', ')}]
draft: ${answers.draft}
---

Escreva seu post aqui...
`;
      break;

    case 'notes':
      template = `---
title: "${answers.title}"
description: "${answers.description}"
date: ${date}
tags: [${answers.tags.map((t) => `"${t}"`).join(', ')}]
draft: ${answers.draft}
---

Escreva sua nota aqui...
`;
      break;

    case 'books':
      template = `---
title: "${answers.title}"
description: "${answers.description}"
author: "${answers.author}"
year: "${answers.year}"
dateAdded: ${date}
tags: [${answers.tags.map((t) => `"${t}"`).join(', ')}]
---

Escreva suas impressões sobre o livro...
`;
      break;

    case 'movies':
      template = `---
title: "${answers.title}"
description: "${answers.description}"
director: "${answers.director}"
year: "${answers.year}"
dateWatched: ${date}
tags: [${answers.tags.map((t) => `"${t}"`).join(', ')}]
---

Escreva suas impressões sobre o filme...
`;
      break;
  }

  if (fs.existsSync(filePath)) {
    console.error('❌ Já existe um arquivo com esse slug:', filePath);
    process.exit(1);
  }

  fs.writeFileSync(filePath, template, 'utf8');
  console.warn(`✅ ${type} criado em: ${filePath}`);
}

run();
