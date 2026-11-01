document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const clearBtn = document.getElementById('clearSearchBtn');
  const categoryPills = document.querySelectorAll('.cat-pill');
  const cards = document.querySelectorAll('.card');
  const noResults = document.getElementById('noResults');
  const toast = document.getElementById('toast');

  let currentCategory = 'all';
  let toastTimer = null;

  // Search input handler
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();
    clearBtn.style.display = query ? 'block' : 'none';
    filterContent();
  });

  // Clear search
  clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    clearBtn.style.display = 'none';
    searchInput.focus();
    filterContent();
  });

  // Category filter handler
  categoryPills.forEach(pill => {
    pill.addEventListener('click', () => {
      categoryPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentCategory = pill.dataset.filter;
      filterContent();
    });
  });

  // Unified filter function
  function filterContent() {
    const query = searchInput.value.trim().toLowerCase();
    let visibleCardsCount = 0;

    cards.forEach(card => {
      const cardCategory = card.dataset.category;
      const categoryMatch = currentCategory === 'all' || cardCategory === currentCategory;

      if (!categoryMatch) {
        card.style.display = 'none';
        return;
      }

      // Filter individual commands inside the card if there's a search query
      const items = card.querySelectorAll('.command-item');
      let matchingItemsInCard = 0;

      items.forEach(item => {
        const codeText = item.querySelector('code').textContent.toLowerCase();
        const descText = item.querySelector('.cmd-desc').textContent.toLowerCase();

        if (!query || codeText.includes(query) || descText.includes(query)) {
          item.style.display = 'flex';
          matchingItemsInCard++;
        } else {
          item.style.display = 'none';
        }
      });

      if (matchingItemsInCard > 0) {
        card.style.display = 'flex';
        visibleCardsCount++;
      } else {
        card.style.display = 'none';
      }
    });

    noResults.style.display = visibleCardsCount === 0 ? 'block' : 'none';
  }

  // Copy to clipboard
  document.addEventListener('click', (e) => {
    if (e.target.matches('.copy-btn')) {
      const btn = e.target;
      const textToCopy = btn.dataset.copy || btn.closest('.code-row').querySelector('code').textContent;

      navigator.clipboard.writeText(textToCopy).then(() => {
        const originalText = btn.textContent;
        btn.textContent = 'Copied! ✓';
        btn.style.backgroundColor = '#34d399';
        btn.style.borderColor = '#34d399';
        btn.style.color = '#070a0f';

        showToast(`Copied: ${textToCopy}`);

        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.backgroundColor = '';
          btn.style.borderColor = '';
          btn.style.color = '';
        }, 1500);
      });
    }
  });

  function showToast(msg) {
    if (toastTimer) clearTimeout(toastTimer);
    toast.textContent = msg;
    toast.classList.add('show');
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2200);
  }

  // Keyboard shortcut '/' to focus search
  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement !== searchInput) {
      e.preventDefault();
      searchInput.focus();
    } else if (e.key === 'Escape' && document.activeElement === searchInput) {
      searchInput.blur();
    }
  });
});
