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

    feedback.className = 'hidden';
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (res.status === 201) {
        const result = await res.json();
        const msg = result.message;

        const article = document.createElement('article');
        article.className = 'bg-light-silver-100 p-4 border border-light-silver-200 rounded-lg';
        article.innerHTML =
          '<div class="flex justify-between items-start mb-2">' +
          '<strong class="text-blood-red-950">' + escapeHtml(msg.name) + '</strong>' +
          '<time class="text-gray-500 text-xs">' + new Date(msg.timestamp).toLocaleDateString('pt-BR') + '</time>' +
          '</div>' +
          '<p class="text-errie-black-900">' + escapeHtml(msg.message) + '</p>';

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
    feedback.className = type === 'success'
      ? 'p-3 rounded bg-green-100 text-green-800 text-sm'
      : 'p-3 rounded bg-red-100 text-red-800 text-sm';
  }

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }
})();
