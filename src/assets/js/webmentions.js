(function () {
  // Webmentions functionality
  async function loadWebmentions() {
    const webmentionsContainer = document.getElementById('webmentions-list');
    if (!webmentionsContainer) return;

    const currentUrl = window.location.href;
    const domain = window.location.hostname;

    try {
      // Fetch webmentions from webmention.io
      const response = await fetch(
        `https://webmention.io/api/mentions.jf2?target=${encodeURIComponent(currentUrl)}&per-page=50`
      );
      const data = await response.json();

      if (data.children && data.children.length > 0) {
        displayWebmentions(data.children, webmentionsContainer, currentUrl);
      } else {
        showEmptyState(webmentionsContainer);
      }
    } catch (error) {
      console.warn('Failed to load webmentions:', error);
      showEmptyState(webmentionsContainer);
    }
  }

  function displayWebmentions(mentions, container, url) {
    const likes = mentions.filter(m => m['wm-property'] === 'like-of');
    const reposts = mentions.filter(m => m['wm-property'] === 'repost-of');
    const replies = mentions.filter(m => m['wm-property'] === 'in-reply-to');
    const bookmarks = mentions.filter(m => m['wm-property'] === 'bookmark-of');
    const general = mentions.filter(m => m['wm-property'] === 'mention-of');

    let html = '';

    // Show counts
    if (likes.length > 0 || reposts.length > 0 || bookmarks.length > 0) {
      html += '<div class="cluster meta" style="--gutter: var(--space-m)">';
      if (likes.length > 0) html += `<span>❤️ ${likes.length} like${likes.length !== 1 ? 's' : ''}</span>`;
      if (reposts.length > 0)
        html += `<span>🔄 ${reposts.length} repost${reposts.length !== 1 ? 's' : ''}</span>`;
      if (bookmarks.length > 0)
        html += `<span>🔖 ${bookmarks.length} bookmark${bookmarks.length !== 1 ? 's' : ''}</span>`;
      html += '</div>';
    }

    // Show replies and mentions
    const conversationMentions = [...replies, ...general].sort(
      (a, b) => new Date(a.published) - new Date(b.published)
    );

    if (conversationMentions.length > 0) {
      html += '<div class="flow" style="--flow-space: var(--space-s)">';
      conversationMentions.forEach(mention => {
        html += renderMention(mention);
      });
      html += '</div>';
    }

    container.innerHTML = html || url;
  }

  function renderMention(mention) {
    const author = mention.author || {};
    const content = mention.content || {};
    const published = mention.published ? new Date(mention.published).toLocaleDateString() : '';

    return `
      <article class="callout flow" style="--flow-space: var(--space-2xs)">
        <div class="cluster" style="--gutter: var(--space-xs); --cluster-vertical-alignment: flex-start;">
          ${
            author.photo
              ? `<img class="avatar" src="${author.photo}" alt="${author.name || 'Anonymous'}" loading="lazy" />`
              : `<div class="avatar center" style="background-color: var(--color-surface-raised);">
                 <span class="meta">${(author.name || 'A')[0].toUpperCase()}</span>
               </div>`
          }
          <div style="flex: 1 1 16rem; min-width: 0;">
            <div class="cluster" style="--gutter: var(--space-2xs)">
              <a href="${author.url || '#'}" target="_blank" rel="noopener">
                ${author.name || 'Anonymous'}
              </a>
              <span>${mention['wm-property'] === 'in-reply-to' ? 'respondi' : 'mencionei isso'}</span>
              ${published ? `<time class="meta">${published}</time>` : ''}
            </div>
            ${
              content.text
                ? `<p>${content.text.length > 280 ? content.text.substring(0, 280) + '...' : content.text}</p>`
                : ''
            }
            <a href="${mention.url}" target="_blank" rel="noopener">
              Ver o original
            </a>
          </div>
        </div>
      </article>
    `;
  }

  function showEmptyState(container) {
    container.innerHTML = `
      <div class="region flow" style="--region-space: var(--space-l)">
        <p>Ainda não há menções via webmention. Seja o primeiro a responder!</p>
        <p>
          <a href="https://indieweb.org/Webmention" target="_blank" rel="noopener noreferrer">
            Aprenda sobre <em>webmentions</em>
          </a>
        </p>
      </div>
    `;
  }

  // Initialize webmentions when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadWebmentions);
  } else {
    loadWebmentions();
  }
})();
