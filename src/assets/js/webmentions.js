(function () {
  function isSafeUrl(value) {
    if (typeof value !== 'string' || !value) return false;
    try {
      const url = new URL(value, window.location.origin);
      return url.protocol === 'https:' || url.protocol === 'http:';
    } catch {
      return false;
    }
  }

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = text;
    return node;
  }

  function link(href, className, text) {
    const a = el('a', className, text);
    if (isSafeUrl(href)) {
      a.href = href;
      a.target = '_blank';
      a.rel = 'noopener';
    }
    return a;
  }

  async function loadWebmentions() {
    const webmentionsContainer = document.getElementById('webmentions-list');
    if (!webmentionsContainer) return;

    const currentUrl = window.location.href;

    try {
      const response = await fetch(
        `https://webmention.io/api/mentions.jf2?target=${encodeURIComponent(currentUrl)}&per-page=50`
      );
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();

      if (data.children && data.children.length > 0) {
        displayWebmentions(data.children, webmentionsContainer);
      } else {
        showEmptyState(webmentionsContainer);
      }
    } catch (error) {
      console.warn('Failed to load webmentions:', error);
      showEmptyState(webmentionsContainer);
    }
  }

  function renderMention(mention) {
    const author = mention.author || {};
    const content = mention.content || {};
    const published = mention.published ? new Date(mention.published).toLocaleDateString() : '';

    const card = el('article', 'callout flow');
    const clusterStyle = '1 1 16rem';

    const cluster = el('div');
    cluster.style.flex = clusterStyle;
    cluster.style.minWidth = '0';

    if (!isSafeUrl(author.photo)) {
      const fallback = el('div', 'avatar center');
      fallback.style.backgroundColor = 'var(--color-surface-raised)';

      const initial = el('span', 'meta', (author.name || 'A').charAt(0).toUpperCase());
      fallback.appendChild(initial);
      card.appendChild(fallback);
    } else {
      const img = el('img', 'avatar');

      img.src = author.photo;
      img.alt = author.name || 'Anonymous';
      img.loading = 'lazy';

      card.appendChild(img);
    }

    const header = el('div', 'cluster');
    header.appendChild(link(author.url, '', author.name || 'Anonymous'));

    const badge = el('span', '', mention['wm-property'] === 'in-reply-to' ? 'respondi' : 'mencionei isso');
    header.appendChild(badge);

    if (published) {
      const time = el('time', 'meta', published);
      time.dateTime = mention.published || '';
      header.appendChild(time);
    }
    cluster.appendChild(header);

    if (content.text) {
      const text = content.text.length > 280 ? `${content.text.substring(0, 280)}...` : content.text;
      cluster.appendChild(el('p', '', text));
    }

    cluster.appendChild(link(mention.url, '', 'Ver o original'));

    card.appendChild(cluster);
    return card;
  }

  function displayWebmentions(mentions, container) {
    container.replaceChildren();

    const likes = mentions.filter(m => m['wm-property'] === 'like-of');
    const reposts = mentions.filter(m => m['wm-property'] === 'repost-of');
    const bookmarks = mentions.filter(m => m['wm-property'] === 'bookmark-of');
    const replies = mentions.filter(m => m['wm-property'] === 'in-reply-to');
    const general = mentions.filter(m => m['wm-property'] === 'mention-of');

    if (likes.length > 0 || reposts.length > 0 || bookmarks.length > 0) {
      const summary = el('div', 'cluster meta');
      summary.style.gap = 'var(--space-m)';
      if (likes.length > 0)
        summary.appendChild(el('span', '', `${likes.length} like${likes.length !== 1 ? 's' : ''}`));
      if (reposts.length > 0)
        summary.appendChild(el('span', '', `${reposts.length} repost${reposts.length !== 1 ? 's' : ''}`));
      if (bookmarks.length > 0)
        summary.appendChild(
          el('span', '', `${bookmarks.length} bookmark${bookmarks.length !== 1 ? 's' : ''}`)
        );
      container.appendChild(summary);
    }

    const conversation = [...replies, ...general].sort(
      (a, b) => new Date(a.published) - new Date(b.published)
    );

    if (conversation.length > 0) {
      const flow = el('div', 'flow');
      flow.style.gap = 'var(--space-s)';
      conversation.forEach(mention => flow.appendChild(renderMention(mention)));
      container.appendChild(flow);
    }
  }

  function showEmptyState(container) {
    container.replaceChildren();

    const region = el('div', 'region flow');
    region.style.gap = 'var(--space-l)';
    region.appendChild(el('p', '', 'Ainda não há menções via webmention. Seja o primeiro a responder!'));

    const hint = el('p');
    hint.appendChild(link('https://indieweb.org/Webmention', '', 'Aprenda sobre webmentions'));
    region.appendChild(hint);
    container.appendChild(region);
  }

  // Initialize webmentions when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadWebmentions);
  } else {
    loadWebmentions();
  }
})();
