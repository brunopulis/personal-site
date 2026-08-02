---
layout: base.njk
permalink: '/contact/'
title: Contato
---

# Entre em contato

Se você quiser conversar comigo ou me dar sugestões, este é o lugar certo. Siga qualquer link abaixo para encontrar os lugares aonde costumo estar.

> A melhor forma de falar comigo é por e-mail.

## Redes sociais

- <a href="mailto:{{ site.email }}" rel="me">{{ site.email }}</a>
{% if site.social.github %}
- <span aria-hidden="true">🐙</span> <a href="https://github.com/{{ site.social.github }}" target="_blank" rel="me noopener">GitHub</a>
{% endif %}
{% if site.social.bluesky %}
- <span aria-hidden="true">🦋</span> <a href="{{ site.social.bluesky }}" target="_blank" rel="me noopener">Bluesky</a>
{% endif %}
{% if site.social.mastodon %}
- <span aria-hidden="true">🐘</span> <a href="{{ site.social.mastodon }}" target="_blank" rel="me noopener">Mastodon</a>
{% endif %}
{% if site.social.youtube %}
- <span aria-hidden="true">📺</span> <a href="{{ site.social.youtube }}" target="_blank" rel="me noopener">YouTube</a>
{% endif %}
{% if site.social.linkedin %}
- <span aria-hidden="true">🎓</span> <a href="{{ site.social.linkedin | replace('@', 'https://') | replace('@', '/') }}" target="_blank" rel="me noopener">LinkedIn</a>
{% endif %}
