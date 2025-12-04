---
layout: services
title: Como posso ajudar
permalink: /servicos/index.html
key: 'services'
description: 'I focus on developing things for the web. I place value on performance, accessibility, simplicity and long term support.'
tags: ['services']
lead: 'I focus on developing things for the web. My approach is semantic HTML, CSS, and a dash of JavaScript. I care about performance, accessibility, simplicity and long term support. Also: websites should be fun!'
---

<div class="wrapper">
  # {{ title }}
          
Ofereço seis formas principais de serviços e trabalhos.
Vamos conversar sem compromisso e descobrir juntos.

<div class="grid" data-layout="thirds">
  {%- for service in services %}
    <article class="rounded-2xl border-2 border-gray-200 bg-white p-8 shadow-sm transition hover:shadow-xl">
      <header role="banner" class="mb-6 flex items-start gap-4">
        <div class="flex-1">
          <span class="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
            {{service.badge}}
          </span>
          <h3 class="mt-2 mb-1 text-2xl font-bold text-gray-900">{{service.title}}</h3>
          <p class="text-base text-gray-600 italic">{{service.tagline}}</p>
        </div>
      </header>
      <p class="mb-6 leading-relaxed text-gray-700">{{service.descricao}}</p>
      <div class="flex">
        <a
          href={service.url}
          class="text-blood-red-800 text-sm font-semibold transition hover:underline hover:underline-offset-8"
        >
          Saiba mais
          <ArrowRight class="ml-2 inline-block h-5 w-5" aria-hidden="true" />
        </a>
      </div>
    </article>
  {%- endfor %}
</div>
</div>