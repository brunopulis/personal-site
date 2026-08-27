---
layout: base.njk
permalink: '/contact/'
title: Contato
---

# Entre em contato

Se você quiser conversar comigo ou me dar sugestões, este é o lugar certo. Siga qualquer link abaixo para encontrar os lugares aonde costumo estar.

> A melhor forma de falar comigo é por e-mail.

## Redes sociais

- <a href="mailto:{{ meta.author.email }}" rel="me">{{ meta.author.email }}</a>
{% if meta.author.social.github %}
- <span aria-hidden="true">🐙</span> <a href="https://github.com/{{ meta.author.social.github }}" target="_blank" rel="me noopener">GitHub</a>
{% endif %}
{% if meta.author.social.bluesky %}
- <span aria-hidden="true">🦋</span> <a href="{{ meta.author.social.bluesky }}" target="_blank" rel="me noopener">Bluesky</a>
{% endif %}
{% if meta.author.social.mastodon %}
- <span aria-hidden="true">🐘</span> <a href="{{ meta.author.social.mastodon }}" target="_blank" rel="me noopener">Mastodon</a>
{% endif %}
{% if meta.author.social.youtube %}
- <span aria-hidden="true">📺</span> <a href="{{ meta.author.social.youtube }}" target="_blank" rel="me noopener">YouTube</a>
{% endif %}
{% if meta.author.social.linkedin %}
- <span aria-hidden="true">🎓</span> <a href="{{ meta.author.social.linkedin | replace('@', 'https://') | replace('@', '/') }}" target="_blank" rel="me noopener">LinkedIn</a>
{% endif %}
