(function () {
  'use strict';

  const tabsContainer = document.getElementById('bookshelf-tabs');
  if (!tabsContainer) return;

  const tabs = tabsContainer.querySelectorAll('[role="tab"]');
  const sections = document.querySelectorAll('[data-year]');
  if (!tabs.length || !sections.length) return;

  const params = new URLSearchParams(window.location.search);
  const requestedTab = params.get('ano');
  const hasTab = requestedTab && Array.from(tabs).some(tab => tab.dataset.tab === requestedTab);
  const initialTab = hasTab ? requestedTab : 'lendo';

  function activateTab(tabName) {
    tabs.forEach(tab => {
      const isActive = tab.dataset.tab === tabName;
      tab.setAttribute('aria-selected', isActive);
      tab.setAttribute('tabindex', isActive ? '0' : '-1');
    });

    sections.forEach(section => {
      section.hidden = section.dataset.year !== tabName;
    });

    if (tabName === 'lendo') {
      history.replaceState(null, '', window.location.pathname);
    } else {
      history.replaceState(null, '', window.location.pathname + '?ano=' + tabName);
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
