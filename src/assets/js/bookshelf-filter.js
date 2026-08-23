(function () {
  'use strict';

  const filter = document.querySelector('[data-bookshelf-filter]');
  if (!filter) return;

  const radios = Array.from(filter.querySelectorAll('input[type="radio"]'));
  const books = document.querySelectorAll('[data-category]');
  if (!radios.length || !books.length) return;

  function applyFilter(value) {
    const showAll = value === 'todos';

    books.forEach(book => {
      book.hidden = !showAll && book.dataset.category !== value;
    });

    const url = showAll
      ? window.location.pathname
      : window.location.pathname + '?categoria=' + encodeURIComponent(value);
    history.replaceState(null, '', url);
  }

  radios.forEach(radio => {
    radio.addEventListener('change', () => applyFilter(radio.value));
  });

  const params = new URLSearchParams(window.location.search);
  const requested = params.get('categoria');
  const initial = requested && radios.some(radio => radio.value === requested) ? requested : 'todos';
  const initialRadio = radios.find(radio => radio.value === initial);

  if (initialRadio) {
    initialRadio.checked = true;
  }

  applyFilter(initial);
})();
