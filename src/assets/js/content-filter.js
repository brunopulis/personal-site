(function () {
  'use strict';

  const tabsContainer = document.getElementById('content-tabs');
  const grid = document.getElementById('content-grid');
  const noResults = document.getElementById('no-results');
  if (!tabsContainer || !grid) return;

  const tabs = tabsContainer.querySelectorAll('[role="tab"]');
  const cards = grid.querySelectorAll('[data-type]');
  const params = new URLSearchParams(window.location.search);
  const initialTab = params.get('tab') || 'todos';

  function activateTab(tabName) {
    let visibleCount = 0;

    tabs.forEach(tab => {
      const isActive = tab.dataset.tab === tabName;
      tab.setAttribute('aria-selected', isActive);
      tab.setAttribute('tabindex', isActive ? '0' : '-1');
    });

    cards.forEach(card => {
      const matches = tabName === 'todos' || card.dataset.type === tabName;
      card.hidden = !matches;
      if (matches) visibleCount++;
    });

    if (noResults) noResults.hidden = visibleCount > 0;

    if (tabName === 'todos') {
      history.replaceState(null, '', window.location.pathname);
    } else {
      history.replaceState(null, '', window.location.pathname + '?tab=' + tabName);
    }
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => activateTab(tab.dataset.tab));
    tab.addEventListener('keydown', e => {
      const tabList = Array.from(tabs);
      const index = tabList.indexOf(tab);
      let next;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        next = tabList[(index + 1) % tabList.length];
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        next = tabList[(index - 1 + tabList.length) % tabList.length];
      } else if (e.key === 'Home') {
        e.preventDefault();
        next = tabList[0];
      } else if (e.key === 'End') {
        e.preventDefault();
        next = tabList[tabList.length - 1];
      }

      if (next) {
        next.focus();
        activateTab(next.dataset.tab);
      }
    });
  });

  activateTab(initialTab);
})();
