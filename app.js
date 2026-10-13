/**
 * NTH LEARNING HUB - INTERACTIVE LOGIC (app.js)
 * North Tees and Hartlepool NHS Foundation Trust
 */

(function () {
  'use strict';

  // --- State ---
  const state = {
    searchQuery: '',
    selectedDept: 'all',
    selectedStatus: 'all',
    expandedCards: new Set(),
    allCategories: window.PORTAL_DATA ? window.PORTAL_DATA.categories : []
  };

  // --- Department Groups Configuration ---
  const DEPARTMENTS = [
    { id: 'all', label: 'All Roles' },
    { id: 'Doctors & Medical Staff', label: 'Doctors & Students' },
    { id: 'Emergency & Acute Care', label: 'Emergency & Acute' },
    { id: 'Nursing & Wards', label: 'Nursing & Inpatients' },
    { id: 'Theatres & Surgery', label: 'Theatres & Surgery' },
    { id: 'Specialist Clinical', label: 'Specialist Clinical' },
    { id: 'Outpatients & Clinics', label: 'Outpatients' },
    { id: 'Administration & Records', label: 'Admin & Records' },
    { id: 'Digital & IT Systems', label: 'SystmOne & IT Systems' }
  ];

  // SVG Icons
  const ICONS = {
    'user-doctor': `<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2a5 5 0 100 10 5 5 0 000-10zm-7 18a7 7 0 0114 0H5zm7-7a2 2 0 012 2v1h1a1 1 0 110 2h-1v1a2 2 0 11-4 0v-1h-1a1 1 0 110-2h1v-1a2 2 0 012-2z"/></svg>`,
    'graduation-cap': `<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zm0 8.55L4.47 9 12 4.9 19.53 9 12 11.55zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/></svg>`,
    'truck-medical': `<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M18 18.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm-10 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zm-11 5H7v2H6v-2H4v-1h2v-2h1v2h2v1zm9-2h-3V9.5h3V11z"/></svg>`,
    'bed': `<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M19 7h-8v6H3V5H1v15h2v-3h18v3h2v-9a4 4 0 00-4-4zm-8 4H5V9h6v2zM7 7a2 2 0 100-4 2 2 0 000 4z"/></svg>`,
    'scissors': `<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M9.64 7.64c.23-.5.36-1.05.36-1.64 0-2.21-1.79-4-4-4S2 3.79 2 6s1.79 4 4 4c.59 0 1.14-.13 1.64-.36L10 12l-2.36 2.36C7.14 14.13 6.59 14 6 14c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4c0-.59-.13-1.14-.36-1.64L12 14l7 7h3v-1L9.64 7.64zM6 8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm0 12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm9-7.5l7-7V4h-3l-5.5 5.5 1.5 2z"/></svg>`,
    'laptop-medical': `<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M20 18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6zm7 2h2v2h2v2h-2v2h-2v-2H9v-2h2V8z"/></svg>`,
    'book-open': `<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 6.5c-2.6 0-5.2-1.3-6.5-2.5V18c1.3 1.2 3.9 2.5 6.5 2.5s5.2-1.3 6.5-2.5V4c-1.3 1.2-3.9 2.5-6.5 2.5zm0-2c2.4 0 4.8-1 6-2.1V16c-1.2 1.1-3.6 2.1-6 2.1s-4.8-1-6-2.1V2.4C7.2 3.5 9.6 4.5 12 4.5z"/></svg>`,
    'chevron-down': `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>`,
    'external-link': `<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6m4-3h6v6m-11 5L21 3"/></svg>`,
    'copy': `<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>`
  };

  // --- DOM Elements ---
  const elements = {
    deptFilterBar: document.getElementById('deptFilterBar'),
    searchInput: document.getElementById('searchInput'),
    clearSearchBtn: document.getElementById('clearSearchBtn'),
    statusToggles: document.getElementById('statusToggles'),
    btnToggleAll: document.getElementById('btnToggleAll'),
    resultsCountText: document.getElementById('resultsCountText'),
    cardsContainer: document.getElementById('cardsContainer'),
    toast: document.getElementById('toast'),
    guideModal: document.getElementById('guideModal'),
    btnOpenGuide: document.getElementById('btnOpenGuide'),
    btnCloseGuide: document.getElementById('btnCloseGuide')
  };

  // --- Initialization ---
  function init() {
    renderDepartmentPills();
    bindEvents();

    // Check URL Hash for deep linking (e.g., #collapseOne)
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      state.expandedCards.add(hash);
    }

    renderCards();

    // Scroll to deep-linked card if present
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 200);
    }
  }

  // --- Department Filter Pills ---
  function renderDepartmentPills() {
    elements.deptFilterBar.innerHTML = '';
    DEPARTMENTS.forEach(dept => {
      const btn = document.createElement('button');
      btn.className = `dept-pill ${state.selectedDept === dept.id ? 'active' : ''}`;
      btn.dataset.dept = dept.id;

      // Count matching categories
      const count = dept.id === 'all'
        ? state.allCategories.length
        : state.allCategories.filter(c => c.department === dept.id).length;

      btn.textContent = `${dept.label} (${count})`;
      btn.addEventListener('click', () => {
        state.selectedDept = dept.id;
        document.querySelectorAll('.dept-pill').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        renderCards();
      });
      elements.deptFilterBar.appendChild(btn);
    });
  }

  // --- Bind UI Events ---
  function bindEvents() {
    // Search input
    elements.searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value.trim().toLowerCase();
      elements.clearSearchBtn.style.display = state.searchQuery ? 'flex' : 'none';
      if (state.searchQuery.length > 1) {
        // Automatically expand matching cards when searching
        state.allCategories.forEach(c => state.expandedCards.add(c.id));
      }
      renderCards();
    });

    elements.clearSearchBtn.addEventListener('click', () => {
      elements.searchInput.value = '';
      state.searchQuery = '';
      elements.clearSearchBtn.style.display = 'none';
      renderCards();
    });

    // Status filter buttons
    elements.statusToggles.addEventListener('click', (e) => {
      const btn = e.target.closest('.status-btn');
      if (!btn) return;
      document.querySelectorAll('.status-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.selectedStatus = btn.dataset.status;
      renderCards();
    });

    // Toggle All (Expand / Collapse)
    elements.btnToggleAll.addEventListener('click', () => {
      const areAllExpanded = state.allCategories.every(c => state.expandedCards.has(c.id));
      if (areAllExpanded) {
        state.expandedCards.clear();
        elements.btnToggleAll.innerHTML = `<span>Expand All</span>`;
      } else {
        state.allCategories.forEach(c => state.expandedCards.add(c.id));
        elements.btnToggleAll.innerHTML = `<span>Collapse All</span>`;
      }
      renderCards();
    });

    // Guide Modal
    if (elements.btnOpenGuide) {
      elements.btnOpenGuide.addEventListener('click', () => {
        elements.guideModal.classList.add('active');
      });
    }
    if (elements.btnCloseGuide) {
      elements.btnCloseGuide.addEventListener('click', () => {
        elements.guideModal.classList.remove('active');
      });
    }

    // Close modal on clicking overlay background
    if (elements.guideModal) {
      elements.guideModal.addEventListener('click', (e) => {
        if (e.target === elements.guideModal) elements.guideModal.classList.remove('active');
      });
    }

    // Keyboard ESC to close modal
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && elements.guideModal) {
        elements.guideModal.classList.remove('active');
      }
    });
  }

  // --- Filtering Logic ---
  function getFilteredCategories() {
    const q = state.searchQuery;
    const dept = state.selectedDept;
    const status = state.selectedStatus;

    return state.allCategories.map(cat => {
      // Department filter
      if (dept !== 'all' && cat.department !== dept) {
        return null;
      }

      // Filter items within category
      const matchedItems = cat.items.filter(item => {
        // Status filter
        if (status !== 'all' && item.status !== status) {
          return false;
        }

        // Query filter
        if (q) {
          const matchCat = cat.title.toLowerCase().includes(q);
          const matchSub = item.subgroup.toLowerCase().includes(q);
          const matchTitle = item.title.toLowerCase().includes(q);
          return matchCat || matchSub || matchTitle;
        }

        return true;
      });

      if (matchedItems.length === 0 && q) {
        return null;
      }

      return {
        ...cat,
        items: matchedItems
      };
    }).filter(Boolean);
  }

  // --- Render Cards ---
  function renderCards() {
    const filtered = getFilteredCategories();
    elements.cardsContainer.innerHTML = '';

    const totalCoursesVisible = filtered.reduce((acc, cat) => acc + cat.items.length, 0);
    elements.resultsCountText.textContent = `Showing ${filtered.length} roles (${totalCoursesVisible} courses)`;

    if (filtered.length === 0) {
      elements.cardsContainer.innerHTML = `
        <div class="no-results">
          <div class="no-results-icon">🔍</div>
          <h3 class="no-results-title">No training courses matched your search</h3>
          <p class="no-results-desc">Try clearing your filters or search for another keyword like "Doctor", "SystmOne", "Ward", or "TrakCare".</p>
          <button class="btn-sn trakcare" onclick="document.getElementById('searchInput').value=''; state.searchQuery=''; renderCards();">Reset Search</button>
        </div>
      `;
      return;
    }

    filtered.forEach(cat => {
      const isExpanded = state.expandedCards.has(cat.id);
      const iconSvg = ICONS[cat.icon] || ICONS['book-open'];

      // Group items by subgroup
      const subgroups = {};
      cat.items.forEach(item => {
        if (!subgroups[item.subgroup]) subgroups[item.subgroup] = [];
        subgroups[item.subgroup].push(item);
      });

      const card = document.createElement('div');
      card.className = `role-card ${isExpanded ? 'expanded' : ''}`;
      card.id = cat.id;

      // Card Header
      const header = document.createElement('div');
      header.className = 'role-header';
      header.innerHTML = `
        <div class="role-header-left">
          <div class="role-icon-box">${iconSvg}</div>
          <div class="role-title-wrap">
            <span class="role-dept-tag">${cat.department}</span>
            <h3 class="role-name">${cat.title}</h3>
          </div>
        </div>
        <div class="role-header-right">
          <span class="role-count-badge">${cat.items.length} Modules</span>
          <div class="role-chevron">${ICONS['chevron-down']}</div>
        </div>
      `;

      header.addEventListener('click', () => {
        if (state.expandedCards.has(cat.id)) {
          state.expandedCards.delete(cat.id);
          card.classList.remove('expanded');
        } else {
          state.expandedCards.add(cat.id);
          card.classList.add('expanded');
        }
      });

      // Card Body
      const body = document.createElement('div');
      body.className = 'role-body';

      // Render Subgroups
      Object.entries(subgroups).forEach(([subgroupName, items]) => {
        const subgroupBlock = document.createElement('div');
        subgroupBlock.className = 'subgroup-block';

        const showSubgroupHeader = subgroupName !== 'General' || Object.keys(subgroups).length > 1;
        if (showSubgroupHeader) {
          const subHeader = document.createElement('div');
          subHeader.className = 'subgroup-header';
          subHeader.innerHTML = `
            <h4 class="subgroup-title">${subgroupName}</h4>
            <span class="subgroup-count">${items.length} Courses</span>
          `;
          subgroupBlock.appendChild(subHeader);
        }

        const grid = document.createElement('div');
        grid.className = 'course-grid';

        items.forEach(item => {
          const courseItem = document.createElement('div');
          courseItem.className = 'course-item';

          // Course Code Extraction (e.g. 345)
          const codeMatch = item.title.match(/^(345\s+)/);
          const cleanTitle = codeMatch ? item.title.substring(codeMatch[0].length) : item.title;
          const codeTag = codeMatch ? `<span class="course-code-tag">345</span>` : '';

          // Status Badge
          let badgeText = 'ESR e-Learning';
          let badgeClass = 'available';
          if (item.status === 'in_department') {
            badgeText = 'Taught in Dept';
            badgeClass = 'in_department';
          } else if (item.status === 'in_development') {
            badgeText = 'In Development';
            badgeClass = 'in_development';
          }

          const hasValidUrl = item.url && item.url.startsWith('http');

          courseItem.innerHTML = `
            <div class="course-left">
              <div class="course-info">
                <div class="course-title">${cleanTitle}</div>
                <div class="course-tags">
                  ${codeTag}
                  <span class="course-badge ${badgeClass}">${badgeText}</span>
                </div>
              </div>
            </div>
            <div class="course-actions">
              ${hasValidUrl ? `
                <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="btn-enrol" title="Launch course directly in ESR">
                  Enrol on ESR ${ICONS['external-link']}
                </a>
              ` : `
                <span style="font-size: 0.78rem; color: #94A3B8; font-style: italic; padding: 0.4rem;">See Department</span>
              `}
              <button class="btn-copy-link" title="Copy direct link to role" data-roleid="${cat.id}">
                ${ICONS['copy']}
              </button>
            </div>
          `;

          // Copy link event
          const copyBtn = courseItem.querySelector('.btn-copy-link');
          copyBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const shareUrl = `${window.location.origin}${window.location.pathname}#${cat.id}`;
            navigator.clipboard.writeText(shareUrl).then(() => {
              showToast(`Copied direct link for ${cat.title}`);
            }).catch(() => {
              showToast(`Link: ${shareUrl}`);
            });
          });

          grid.appendChild(courseItem);
        });

        subgroupBlock.appendChild(grid);
        body.appendChild(subgroupBlock);
      });

      card.appendChild(header);
      card.appendChild(body);
      elements.cardsContainer.appendChild(card);
    });
  }

  // --- Toast Notification ---
  let toastTimer = null;
  function showToast(message) {
    if (toastTimer) clearTimeout(toastTimer);
    elements.toast.textContent = message;
    elements.toast.classList.add('show');
    toastTimer = setTimeout(() => {
      elements.toast.classList.remove('show');
    }, 3200);
  }

  // Expose init
  document.addEventListener('DOMContentLoaded', init);
})();
