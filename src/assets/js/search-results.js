(function () {
  let searchIndex = null;
  let flexSearch = null;

  function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }

  async function initSearchPage() {
    try {
      const response = await fetch('/search.json');
      searchIndex = await response.json();

      if (typeof FlexSearch !== 'undefined') {
        flexSearch = new FlexSearch.Index({
          tokenize: 'forward',
          cache: true,
          resolution: 9
        });

        searchIndex.forEach((item, index) => {
          if (item && item.title) {
            const searchText = item.title + ' ' + (item.description || '') + ' ' + (item.content || '') + ' ' + (item.tags || []).join(' ');
            flexSearch.add(index, searchText);
          }
        });
      }

      const query = getQueryParam('q');
      if (query) {
        document.getElementById('search-query').value = query;
        performSearch(query);
      }

      const form = document.querySelector('form[role="search"]');
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        const query = document.getElementById('search-query').value.trim();
        if (query) {
          var newUrl = new URL(window.location);
          newUrl.searchParams.set('q', query);
          window.history.pushState({}, '', newUrl);
          performSearch(query);
        }
      });
    } catch (error) {
      console.error('Search initialization failed:', error);
    }
  }

  function performSearch(query) {
    if (!flexSearch || !searchIndex) return;

    showElement('search-loading');
    hideElement('default-content');
    hideElement('search-results-container');
    hideElement('no-results');

    setTimeout(function () {
      try {
        const results = flexSearch.search(query, {limit: 20});
        const items = results.map(function (index) { return searchIndex[index]; });
        displayResults(items, query);
      } catch (error) {
        console.error('Search failed:', error);
        showNoResults();
      }
    }, 300);
  }

  function displayResults(items, query) {
    hideElement('search-loading');
    hideElement('default-content');

    if (items.length === 0) {
      showNoResults();
      return;
    }

    showElement('search-results-container');

    var count = document.getElementById('results-count');
    count.textContent = 'Found ' + items.length + ' result' + (items.length === 1 ? '' : 's') + ' for "' + query + '"';

    var container = document.getElementById('search-results-list');
    container.innerHTML = items.map(function (item) {
      return '<article class="pb-6 border-gray-200 dark:border-gray-700 border-b last:border-b-0">' +
        '<h2 class="mb-2 font-semibold text-xl">' +
        '<a href="' + item.id + '" class="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">' +
        highlightMatch(item.title, query) +
        '</a></h2>' +
        '<p class="mb-3 text-gray-600 dark:text-gray-400 leading-relaxed">' +
        highlightMatch(item.description || item.content, query) +
        '</p>' +
        (item.tags && item.tags.length > 0
          ? '<div class="flex flex-wrap gap-2">' +
            item.tags.map(function (tag) {
              return '<a href="/tags/' + tag.toLowerCase().replace(/\s+/g, '-') + '/" class="bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 px-2 py-1 rounded text-gray-700 dark:text-gray-300 text-xs transition-colors">#' + tag + '</a>';
            }).join('') +
            '</div>'
          : '') +
        '</article>';
    }).join('');
  }

  function showNoResults() {
    hideElement('search-loading');
    hideElement('default-content');
    hideElement('search-results-container');
    showElement('no-results');
  }

  function showElement(id) {
    document.getElementById(id).classList.remove('hidden');
  }

  function hideElement(id) {
    document.getElementById(id).classList.add('hidden');
  }

  function highlightMatch(text, query) {
    if (!text || !query) return text || '';
    var regex = new RegExp('(' + query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
    return text.replace(regex, '<mark class="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">$1</mark>');
  }

  document.addEventListener('DOMContentLoaded', initSearchPage);
})();
