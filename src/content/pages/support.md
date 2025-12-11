---
layout: page
title: "Apoie meu trabalho"
permalink: /apoie/index.html
description: 'Descubra formas de apoiar meu trabalho'
tags: ['plataform']
---

Se meu conteúdo te ajudou de alguma forma, considere apoiar.
Sua contribuição ajuda a manter e melhorar este projeto

<ul>
  {% for plataform in plataforms %}
  <li>
      <h3 class="plataform-title">
      <a href="{{ plataform.url }}" data-plataform={{plataform.name}} target="_blank" rel="noopener noreferrer">
      {{ plataform.name }}
      </a>
      </h3>
  </li>
  {% endfor %}
</ul>

{% if supporters %}
  <div class="supporters-section">
    <h2 class="supporters-title">Nossos Apoiadores ❤️</h2>
    <p class="supporters-subtitle">Agradecemos imensamente a todas as pessoas que apoiam este projeto</p>
    
    <div class="grid" data-layout="50-50">
      {% for supporter in supporters %}
        <div class="supporter-card">
          {% if supporter.avatar %}
            <img src="{{ supporter.avatar }}" alt="{{ supporter.name }}" class="supporter-avatar">
          {% else %}
            <div class="supporter-avatar-placeholder">{{ supporter.name.charAt(0) | upper }}</div>
          {% endif %}
          <h3 class="supporter-name">{{ supporter.name }}</h3>
          {% if supporter.contribution %}
            <span class="supporter-contribution">{{ supporter.contribution }}</span>
          {% endif %}
          {% if supporter.message %}
            <p class="supporter-message">"{{ supporter.message }}"</p>
          {% endif %}
        </div>
      {% endfor %}
    </div>
  </div>
{% endif %}

<div class="cta-section">
    <h2>Pronto para apoiar?</h2>
    <p>Escolha a plataforma de sua preferência acima e faça sua contribuição.</p>
    <p class="cta-note">Todas as contribuições são voluntárias e fazem uma diferença real.</p>
  </div>
</div>
