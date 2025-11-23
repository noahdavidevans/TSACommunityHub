// Seed data for resources shown in the directory
const resources = [
  {
    id: "res-1",
    name: "Florence Food Bank",
    community: "South Florence",
    category: "Food Assistance",
    type: "Non-profit",
    neighborhood: "Downtown",
    description: "Weekly groceries and emergency food boxes for families.",
    website: "https://Ffoodbank.org",
    email: "help@Ffoodbank.org",
    phone: "(555) 111-2200",
    address: "120 Market Ave",
    tags: ["food", "families", "nutrition"],
    highlighted: true,
    openNow: true
  },
  {
    id: "res-2",
    name: "Harbor Shelter",
    community: "South Florence",
    category: "Housing",
    type: "Non-profit",
    neighborhood: "Eastside",
    description: "Temporary shelter and housing navigation services.",
    website: "https://harborshelter.org",
    email: "contact@harborshelter.org",
    phone: "(555) 222-3300",
    address: "45 Harbor Rd",
    tags: ["housing", "shelter", "navigation"],
    highlighted: true,
    openNow: false
  },
  {
    id: "res-3",
    name: "Youth Mentorship Coalition",
    community: "South Florence",
    category: "Youth Programs",
    type: "Community Group",
    neighborhood: "Westside",
    description: "Mentorship, tutoring, and after-school enrichment for grades 6–12.",
    website: "https://ymc-westside.org",
    email: "info@ymc-westside.org",
    phone: "(555) 333-4400",
    address: "780 Elm St",
    tags: ["youth", "tutoring", "mentorship"],
    highlighted: true,
    openNow: true
  },
  {
    id: "res-4",
    name: "F Counseling Center",
    community: "South Florence",
    category: "Mental Health",
    type: "Non-profit",
    neighborhood: "North Hills",
    description: "Sliding-scale counseling and support groups.",
    website: "https://Fcounseling.org",
    email: "care@Fcounseling.org",
    phone: "(555) 444-5500",
    address: "220 Ridge Blvd",
    tags: ["mental health", "counseling", "groups"],
    highlighted: false,
    openNow: true
  },
  {
    id: "res-5",
    name: "Community Health Clinic",
    community: "South Florence",
    category: "Health",
    type: "Government",
    neighborhood: "South Park",
    description: "Primary care, vaccinations, and wellness screenings.",
    website: "https://cityhealth.example.gov",
    email: "appointments@cityhealth.example.gov",
    phone: "(555) 555-6600",
    address: "10 Oak Ave",
    tags: ["health", "vaccines", "primary care"],
    highlighted: false,
    openNow: false
  },
  {
    id: "res-6",
    name: "Adult Learning Center",
    community: "South Florence",
    category: "Education",
    type: "Non-profit",
    neighborhood: "Downtown",
    description: "GED prep, ESL classes, and workforce training.",
    website: "https://alc-learn.org",
    email: "enroll@alc-learn.org",
    phone: "(555) 666-7700",
    address: "300 Center St",
    tags: ["education", "GED", "ESL", "jobs"],
    highlighted: false,
    openNow: true
  },
  {
    id: "res-7",
    name: "Legal Aid Partners",
    community: "South Florence",
    category: "Legal Aid",
    type: "Non-profit",
    neighborhood: "Eastside",
    description: "Free legal consultations for housing and employment.",
    website: "https://legalaidpartners.org",
    email: "support@legalaidpartners.org",
    phone: "(555) 777-8800",
    address: "88 Justice Ln",
    tags: ["legal", "housing", "employment"],
    highlighted: false,
    openNow: true
  }
];

// Event listings shown in the Events section
const events = [
  {
    title: "Community Wellness Fair",
    when: "Sat, Apr 12 • 10:00 AM",
    where: "City Park Pavilion",
    desc: "Free screenings, flu shots, and wellness resources."
  },
  {
    title: "Youth Coding Night",
    when: "Fri, Apr 18 • 6:00 PM",
    where: "F Library Makerspace",
    desc: "Hands-on coding activities for middle and high school students."
  },
  {
    title: "Neighborhood Clean-Up",
    when: "Sun, Apr 27 • 9:00 AM",
    where: "Westside Community Center",
    desc: "Join volunteers to clean streets and plant trees."
  }
];
// Small DOM helpers
const qs = (s) => document.querySelector(s);
const qsa = (s) => Array.from(document.querySelectorAll(s));
const searchInput = qs('#searchInput');
const categorySelect = qs('#categorySelect');
const typeSelect = qs('#typeSelect');
const neighborhoodSelect = qs('#neighborhoodSelect');
const openNowToggle = qs('#openNowToggle');
const resourceGrid = qs('#resourceGrid');
const resourceCount = qs('#resourceCount');
const highlightGrid = qs('#highlightGrid');
const suggestForm = qs('#suggestForm');
const submitStatus = qs('#submitStatus');
const orgCategory = qs('#orgCategory');
const orgType = qs('#orgType');
const orgNeighborhood = qs('#orgNeighborhood');
const eventList = qs('#eventList');
const communitySelect = qs('#communitySelect');
// Utilities and state
const distinct = (arr) => Array.from(new Set(arr)).sort();
const communities = distinct(resources.map((r) => r.community));
const communityKey = 'currentCommunity';
const getCommunity = () => localStorage.getItem(communityKey) || '';
const setCommunity = (v) => { localStorage.setItem(communityKey, v || ''); };
const initSelect = (el, values) => { values.forEach((v) => { const o = document.createElement('option'); o.value = v; o.textContent = v; el.appendChild(o); }); };
// Fill filter dropdowns and community selector
const populateFilters = () => {
  initSelect(categorySelect, distinct(resources.map((r) => r.category)));
  initSelect(typeSelect, distinct(resources.map((r) => r.type)));
  initSelect(neighborhoodSelect, distinct(resources.map((r) => r.neighborhood)));
  initSelect(orgCategory, distinct(resources.map((r) => r.category)));
  initSelect(orgType, distinct(resources.map((r) => r.type)));
  initSelect(orgNeighborhood, distinct(resources.map((r) => r.neighborhood)));
  if (communitySelect) {
    initSelect(communitySelect, communities);
    const cur = getCommunity();
    if (cur) { communitySelect.value = cur; }
  }
};
// Render a single resource card
const cardHTML = (r) => {
  const tags = r.tags.map((t) => `<span class="tag">${t}</span>`).join('');
  const open = r.openNow ? 'Open now' : 'Closed';
  const pending = r.pending ? ' • Pending' : '';
  return (
    `<article class="card reveal" data-aos="fade-up">
      ${r.image ? `<img class="thumb" src="${r.image}" alt="${r.name}">` : ''}
      <div class="title">${r.name}</div>
      <div class="meta">${r.community} • ${r.category} • ${r.type} • ${r.neighborhood} • ${open}${pending}</div>
      <div class="desc">${r.description}</div>
      <div class="tags">${tags}</div>
      <div class="actions">
        ${r.website ? `<a class="btn" href="${r.website}" target="_blank" rel="noopener">Website</a>` : ''}
        ${r.phone ? `<a class="btn" href="tel:${r.phone.replace(/[^\d]/g,'')}">Call</a>` : ''}
        ${r.email ? `<a class="btn" href="mailto:${r.email}">Email</a>` : ''}
      </div>
    </article>`
  );
};
// Show featured resources in the Spotlight section
const renderHighlights = () => {
  const featured = resources.filter((r) => r.highlighted).slice(0, 3);
  highlightGrid.innerHTML = featured.map(cardHTML).join('');
};
// Simple text search across key resource fields
const matchesText = (r, t) => {
  if (!t) return true;
  const s = t.toLowerCase();
  const hay = [
    r.name,
    r.description,
    r.category,
    r.type,
    r.neighborhood,
    (r.tags || []).join(' ')
  ].join(' ').toLowerCase();
  return hay.includes(s);
};
// Compute filtered resource list based on UI controls
const applyFilters = () => {
  const text = searchInput.value.trim();
  const cat = categorySelect.value;
  const typ = typeSelect.value;
  const hood = neighborhoodSelect.value;
  const open = openNowToggle.checked;
  const com = getCommunity();
  return resources.filter((r) => (
    matchesText(r, text) &&
    (cat ? r.category === cat : true) &&
    (typ ? r.type === typ : true) &&
    (hood ? r.neighborhood === hood : true) &&
    (open ? r.openNow : true) &&
    (com ? r.community === com : true)
  ));
};
// Update count and resource grid
const renderResources = () => {
  const list = applyFilters();
  resourceCount.textContent = `${list.length} resources${getCommunity() ? ` in ${getCommunity()}` : ''}`;
  resourceGrid.innerHTML = list.map(cardHTML).join('');
  revealOnScroll();
};
// Render events to the page
const renderEvents = () => {
  eventList.innerHTML = events.map((e) => (
    `<div class="event reveal" data-aos="fade-up">
      <div class="title">${e.title}</div>
      <div class="when">${e.when}</div>
      <div class="where">${e.where}</div>
      <div>${e.desc}</div>
    </div>`
  )).join('');
  revealOnScroll();
};
// Handle Suggest a Resource form submission
const handleSuggestSubmit = (ev) => {
  ev.preventDefault();
  const form = new FormData(suggestForm);
  const name = form.get('orgName')?.toString().trim();
  const website = form.get('orgWebsite')?.toString().trim();
  const email = form.get('orgEmail')?.toString().trim();
  const phone = form.get('orgPhone')?.toString().trim();
  const category = form.get('orgCategory')?.toString();
  const type = form.get('orgType')?.toString();
  const neighborhood = form.get('orgNeighborhood')?.toString();
  const address = form.get('orgAddress')?.toString().trim();
  const description = form.get('orgDescription')?.toString().trim();
  const tags = (form.get('orgTags')?.toString() || '').split(',').map((s) => s.trim()).filter(Boolean);
  if (!name || !category || !type || !neighborhood || !description) {
    submitStatus.textContent = 'Please complete required fields.';
    return;
  }
  const suggestion = {
    id: `sug-${Date.now()}`,
    name,
    community: getCommunity() || '',
    category,
    type,
    neighborhood,
    description,
    website,
    email,
    phone,
    address,
    tags,
    openNow: false,
    pending: true
  };
  try {
    const key = 'suggestedResources';
    const saved = JSON.parse(localStorage.getItem(key) || '[]');
    saved.push(suggestion);
    localStorage.setItem(key, JSON.stringify(saved));
    resources.push(suggestion);
    renderResources();
    submitStatus.textContent = 'Thanks! Your suggestion was received.';
    suggestForm.reset();
  } catch (e) {
    submitStatus.textContent = 'Submission failed. Try again.';
  }
};
// Persist community selection and re-render
const setupCommunitySelector = () => {
  if (!communitySelect) return;
  communitySelect.addEventListener('change', (e) => { setCommunity(e.target.value); renderResources(); });
};
// IntersectionObserver to animate elements when they enter viewport
const revealOnScroll = () => {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('reveal-in'); io.unobserve(en.target); } });
  }, { threshold: .15 });
  qsa('.reveal').forEach((el) => io.observe(el));
};
// Wire filter change events and textarea auto-resize
const wireEvents = () => {
  [searchInput, categorySelect, typeSelect, neighborhoodSelect, openNowToggle].forEach((el) => {
    el.addEventListener('input', renderResources);
    el.addEventListener('change', renderResources);
  });
  suggestForm.addEventListener('submit', handleSuggestSubmit);
  Array.from(document.querySelectorAll('textarea')).forEach((t) => {
    const min = 44;
    const fit = () => { t.style.height = min + 'px'; t.style.height = Math.max(min, t.scrollHeight) + 'px'; };
    t.addEventListener('input', fit);
    fit();
  });
};
// Boot the page
const init = () => {
  populateFilters();
  renderHighlights();
  renderResources();
  renderEvents();
  wireEvents();
  setupCommunitySelector();
};
document.addEventListener('DOMContentLoaded', init);