(function () {
  // Progress bar - debounced to prevent layout thrashing
  const bar = document.getElementById('progress-bar');
  let scrollTimeout;
  const onScroll = () => {
    if (!bar) return;
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = progress + '%';
    }, 10);
  };
  window.addEventListener('scroll', onScroll, {passive: true});
  onScroll();

  // Dark mode toggle
  const darkToggle = document.getElementById('dark-toggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  const setToggleUI = isDark => {
    if (!darkToggle) return;
    darkToggle.textContent = isDark ? '☀️' : '🌙';
    darkToggle.setAttribute('aria-pressed', isDark ? 'true' : 'false');
    darkToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  };
  const applyTheme = isDark => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    setToggleUI(isDark);
  };
  const savedTheme = localStorage.getItem('theme');
  const initialDark = savedTheme ? savedTheme === 'dark' : prefersDark.matches;
  applyTheme(initialDark);
  if (darkToggle) {
    darkToggle.addEventListener('click', () =>
      applyTheme(!document.documentElement.classList.contains('dark'))
    );
  }

  // Accessibility controls
  const fontInc = document.getElementById('font-inc');
  const fontDec = document.getElementById('font-dec');
  const contrastToggle = document.getElementById('contrast-toggle');
  const motionToggle = document.getElementById('motion-toggle');

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const applyA11y = () => {
    const size = parseFloat(localStorage.getItem('fontScale') || '1');
    const highContrast = localStorage.getItem('highContrast') === '1';
    const reduceMotion = localStorage.getItem('reduceMotion') === '1' || (!localStorage.getItem('reduceMotion') && prefersReducedMotion);

    // Apply all changes in a single batch to prevent layout thrashing
    requestAnimationFrame(() => {
      document.documentElement.style.setProperty('font-size', size * 100 + '%');
      document.documentElement.classList.toggle('contrast', highContrast);
      document.documentElement.classList.toggle('reduce-motion', reduceMotion);
    });
  };
  applyA11y();

  if (fontInc)
    fontInc.addEventListener('click', () => {
      const size = Math.min(1.5, parseFloat(localStorage.getItem('fontScale') || '1') + 0.1);
      localStorage.setItem('fontScale', String(size));
      applyA11y();
    });
  if (fontDec)
    fontDec.addEventListener('click', () => {
      const size = Math.max(0.8, parseFloat(localStorage.getItem('fontScale') || '1') - 0.1);
      localStorage.setItem('fontScale', String(size));
      applyA11y();
    });
  if (contrastToggle)
    contrastToggle.addEventListener('click', () => {
      const v = localStorage.getItem('highContrast') === '1' ? '0' : '1';
      localStorage.setItem('highContrast', v);
      applyA11y();
    });
  if (motionToggle)
    motionToggle.addEventListener('click', () => {
      const v = localStorage.getItem('reduceMotion') === '1' ? '0' : '1';
      localStorage.setItem('reduceMotion', v);
      applyA11y();
    });

  // Mobile navigation toggle + focus trap
  const hamburger = document.getElementById('hamburger');
  const primaryNav = document.getElementById('primary-nav');
  if (hamburger && primaryNav) {
    const focusableSelectors = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    let lastFocusedElement = null;

    const trapFocus = e => {
      const focusable = primaryNav.querySelectorAll(focusableSelectors);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    const openNav = () => {
      primaryNav.classList.remove('hidden');
      hamburger.classList.add('open');
      hamburger.setAttribute('aria-expanded', 'true');
      lastFocusedElement = document.activeElement;
      const firstLink = primaryNav.querySelector(focusableSelectors);
      if (firstLink) firstLink.focus();
      document.addEventListener('keydown', trapFocus);
    };

    const closeNav = () => {
      primaryNav.classList.add('hidden');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.removeEventListener('keydown', trapFocus);
      if (lastFocusedElement) lastFocusedElement.focus();
    };

    hamburger.setAttribute('aria-expanded', primaryNav.classList.contains('hidden') ? 'false' : 'true');
    hamburger.addEventListener('click', () => {
      const isHidden = primaryNav.classList.contains('hidden');
      if (isHidden) openNav();
      else closeNav();
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && !primaryNav.classList.contains('hidden')) {
        closeNav();
      }
    });
  }

  // Dropdown menus (Biblioteca, Sobre)
  const dropdowns = document.querySelectorAll('.dropdown');
  dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    const menu = dropdown.querySelector('.dropdown-menu');
    const arrow = dropdown.querySelector('.dropdown-arrow');
    let closeTimeout;

    if (!toggle || !menu) return;

    const openMenu = () => {
      clearTimeout(closeTimeout);
      menu.classList.remove('hidden');
      toggle.setAttribute('aria-expanded', 'true');
      if (arrow) arrow.classList.add('rotate-180');
    };

    const closeMenu = () => {
      menu.classList.add('hidden');
      toggle.setAttribute('aria-expanded', 'false');
      if (arrow) arrow.classList.remove('rotate-180');
    };

    toggle.addEventListener('click', e => {
      e.stopPropagation();
      const isOpen = !menu.classList.contains('hidden');
      if (isOpen) closeMenu();
      else openMenu();
    });

    // Close on Escape
    toggle.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        closeMenu();
        toggle.focus();
      }
    });

    // Close on Tab outside
    menu.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        closeMenu();
        toggle.focus();
      }
      if (e.key === 'Tab' && !e.shiftKey && e.target === menu.querySelector('li:last-child a, li:last-child button')) {
        closeMenu();
      }
      if (e.key === 'Tab' && e.shiftKey && e.target === menu.querySelector('li:first-child a, li:first-child button')) {
        e.preventDefault();
        closeMenu();
        toggle.focus();
      }
    });

    // Desktop: hover to open, delay on leave
    dropdown.addEventListener('mouseenter', () => {
      if (window.innerWidth >= 768) {
        clearTimeout(closeTimeout);
        openMenu();
      }
    });
    dropdown.addEventListener('mouseleave', () => {
      if (window.innerWidth >= 768) {
        closeTimeout = setTimeout(closeMenu, 200);
      }
    });

    // Close when clicking outside
    document.addEventListener('click', e => {
      if (!dropdown.contains(e.target) && !menu.classList.contains('hidden')) {
        closeMenu();
      }
    });
  });

  // A11y popover (button + menu)
  const a11yToggle = document.getElementById('a11y-toggle');
  const a11yMenu = document.getElementById('a11y-menu');
  if (a11yToggle && a11yMenu) {
    const closeMenu = () => {
      a11yMenu.classList.add('hidden');
      a11yToggle.setAttribute('aria-expanded', 'false');
    };
    const openMenu = () => {
      a11yMenu.classList.remove('hidden');
      a11yToggle.setAttribute('aria-expanded', 'true');
    };
    a11yToggle.addEventListener('click', e => {
      e.stopPropagation();
      const isHidden = a11yMenu.classList.contains('hidden');
      if (isHidden) openMenu();
      else closeMenu();
    });
    document.addEventListener('click', e => {
      if (!a11yMenu.classList.contains('hidden')) {
        const within = a11yMenu.contains(e.target) || a11yToggle.contains(e.target);
        if (!within) closeMenu();
      }
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeMenu();
    });
  }

  // Font toggle for footer
  const fontToggle = document.getElementById('font-toggle');
  if (fontToggle) {
    const applyFontPref = enabled => {
      document.documentElement.classList.toggle('system-fonts', enabled);
      fontToggle.textContent = enabled ? 'Web Fonts' : 'System Fonts';
      fontToggle.setAttribute('aria-pressed', enabled ? 'true' : 'false');
    };

    fontToggle.addEventListener('click', () => {
      const currentlyEnabled = document.documentElement.classList.contains('system-fonts');
      const next = !currentlyEnabled;
      applyFontPref(next);
      localStorage.setItem('systemFonts', next ? '1' : '0');
    });

    // Apply saved font preference
    const savedFontPref = localStorage.getItem('systemFonts');
    applyFontPref(savedFontPref === '1');
  }
})();
