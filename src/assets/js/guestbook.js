(function () {
  const form = document.getElementById('guestbook-form');
  if (!form) return;

  const feedback = document.getElementById('form-feedback');
  const messagesList = document.getElementById('messages-list');
  const emptyState = document.getElementById('empty-state');
  const messageCount = document.getElementById('message-count');
  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    feedback.hidden = true;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';

    const data = {
      name: document.getElementById('name').value.trim(),
      message: document.getElementById('message').value.trim(),
      honeypot: document.getElementById('honeypot').value
    };

    try {
      const res = await fetch('/api/guestbook', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      });

      if (res.status === 201) {
        const result = await res.json();
        const msg = result.message;

        const article = document.createElement('article');
        article.className = 'callout flow';
        article.style.setProperty('--flow-space', 'var(--space-2xs)');
        article.style.backgroundColor = 'var(--color-surface)';
        article.style.borderColor = 'var(--color-surface-raised)';
        article.style.borderStyle = 'solid';
        article.style.padding = 'var(--space-xs)';
        article.innerHTML =
          '<div class="repel" style="--repel-vertical-alignment: flex-start;">' +
          '<strong style="color: var(--color-brand)">' +
          escapeHtml(msg.name) +
          '</strong>' +
          '<time class="meta">' +
          new Date(msg.timestamp).toLocaleDateString('pt-BR') +
          '</time>' +
          '</div>' +
          '<p>' +
          escapeHtml(msg.message) +
          '</p>';

        messagesList.prepend(article);

        if (emptyState) {
          emptyState.remove();
        }

        const count = messagesList.children.length;
        messageCount.textContent = '(' + count + ')';

        form.reset();
        showFeedback('Mensagem enviada com sucesso!', 'success');
      } else {
        const err = await res.json();
        showFeedback(err.error || 'Erro ao enviar mensagem.', 'error');
      }
    } catch {
      showFeedback('Erro de conexão. Tente novamente.', 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Enviar mensagem';
    }
  });

  function showFeedback(text, type) {
    feedback.textContent = text;
    feedback.className = 'callout mb-4';
    feedback.style.borderStyle = 'solid';
    if (type === 'success') {
      feedback.style.backgroundColor = '#dcfce7';
      feedback.style.borderColor = '#16a34a';
      feedback.style.color = '#166534';
    } else {
      feedback.style.backgroundColor = '#fee2e2';
      feedback.style.borderColor = '#dc2626';
      feedback.style.color = '#991b1b';
    }
    feedback.hidden = false;
  }

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }
})();
