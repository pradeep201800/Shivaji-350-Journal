// Shivraj 350 Journal Website | Developed by Pradeep Kumar

const articles = [
  {
    id: "01",
    field: "Sciences & Technology",
    type: "Research article",
    title: "Quantum Materials and Sustainable Energy: Computational Perspectives for Next-Generation Photovoltaics",
    authors: "R. K. Sharma, A. Deshmukh & V. Sen",
    pages: "Proposed · pp. 1–14",
    abstract: "A multidisciplinary study of two-dimensional materials, charge separation and photovoltaic performance, connecting computational science with scalable clean-energy systems."
  },
  {
    id: "02",
    field: "Social Sciences",
    type: "Research article",
    title: "Women-Led Self-Help Groups and Agrarian Resilience in Semi-Arid India",
    authors: "M. Sundaram & P. Verma",
    pages: "Proposed · pp. 15–31",
    abstract: "An empirical exploration of collective savings, access to credit and household resilience across rural communities facing climate-linked income volatility."
  },
  {
    id: "03",
    field: "Humanities & Heritage",
    type: "Research article",
    title: "Sovereign Resistance: Re-reading Chhatrapati Shivaji’s Administrative and Maritime Vision",
    authors: "D. N. Joshi & S. Kulkarni",
    pages: "Proposed · pp. 32–48",
    abstract: "An archival reading of administrative records and maritime histories that places Shivaji’s statecraft within a wider conversation on sovereignty and governance."
  },
  {
    id: "04",
    field: "Professional Studies",
    type: "Research article",
    title: "Beyond Compliance: ESG Disclosure and the Cost of Capital in Emerging Markets",
    authors: "A. T. Nair & K. Singhal",
    pages: "Proposed · pp. 49–65",
    abstract: "A study of how the quality and verification of environmental, social and governance disclosures may influence risk perception and corporate financing."
  },
  {
    id: "05",
    field: "Sciences & Technology",
    type: "Review article",
    title: "CRISPR-Cas9 and Abiotic Stress Tolerance in Cereal Cultivars",
    authors: "S. Rao & H. Singh",
    pages: "Proposed · pp. 66–82",
    abstract: "A systematic review of precision genome-editing approaches for improving drought and salinity tolerance, with attention to biosafety and regulation."
  },
  {
    id: "06",
    field: "Social Sciences",
    type: "Research article",
    title: "Digital Public Spheres and Youth Political Engagement in South Asia",
    authors: "A. Mukherjee & T. Bhatia",
    pages: "Proposed · pp. 83–99",
    abstract: "A mixed-method examination of algorithmic curation, civic participation and the evolving political agency of university-age users."
  },
  {
    id: "07",
    field: "Humanities & Heritage",
    type: "Research article",
    title: "Water, Dispossession and Hope in Contemporary Indian Ecological Fiction",
    authors: "R. Vashishta",
    pages: "Proposed · pp. 100–114",
    abstract: "A postcolonial ecocritical reading of literary responses to river degradation, displacement and environmental justice in India."
  },
  {
    id: "08",
    field: "Professional Studies",
    type: "Research article",
    title: "Machine Learning in High-Frequency Trading: Risk Controls and Market Volatility",
    authors: "M. Chawla & S. Goel",
    pages: "Proposed · pp. 115–132",
    abstract: "An evaluation of automated trading systems and adaptive safeguards designed to reduce instability during severe market shocks."
  }
];

const list = document.querySelector("#article-list");
const search = document.querySelector("#article-search");
const filter = document.querySelector("#discipline-filter");
const empty = document.querySelector("#empty-state");

function escapeHTML(value) {
  return value.replace(/[&<>'"]/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;"
  })[character]);
}

function renderArticles() {
  const term = search.value.trim().toLowerCase();
  const field = filter.value;
  const visible = articles.filter(article => {
    const matchesField = field === "All" || article.field === field;
    const haystack = `${article.title} ${article.authors} ${article.field} ${article.abstract}`.toLowerCase();
    return matchesField && haystack.includes(term);
  });

  list.innerHTML = visible.map(article => `
    <article class="article-row">
      <span class="article-no">${escapeHTML(article.id)}</span>
      <div class="article-main">
        <h3>${escapeHTML(article.title)}</h3>
        <p>${escapeHTML(article.authors)}</p>
      </div>
      <div class="article-meta">
        <span>${escapeHTML(article.field)}</span>
        <span>${escapeHTML(article.type)}</span>
        <span>${escapeHTML(article.pages)}</span>
      </div>
      <button class="article-action" type="button" aria-expanded="false" aria-controls="abstract-${escapeHTML(article.id)}">Abstract +</button>
      <div class="abstract" id="abstract-${escapeHTML(article.id)}" hidden>
        <strong>Abstract preview.</strong> ${escapeHTML(article.abstract)}
      </div>
    </article>
  `).join("");

  empty.hidden = visible.length !== 0;
}

list.addEventListener("click", event => {
  const button = event.target.closest(".article-action");
  if (!button) return;
  const panel = document.getElementById(button.getAttribute("aria-controls"));
  const expanded = button.getAttribute("aria-expanded") === "true";
  button.setAttribute("aria-expanded", String(!expanded));
  button.textContent = expanded ? "Abstract +" : "Abstract −";
  panel.hidden = expanded;
});

search.addEventListener("input", renderArticles);
filter.addEventListener("change", renderArticles);
document.querySelectorAll("[data-filter-link]").forEach(link => {
  link.addEventListener("click", () => {
    filter.value = link.dataset.filterLink;
    renderArticles();
  });
});
renderArticles();

const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector(".primary-nav");
menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  nav.classList.toggle("open", !isOpen);
  document.body.classList.toggle("menu-open", !isOpen);
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  menuButton.setAttribute("aria-expanded", "false");
  nav.classList.remove("open");
  document.body.classList.remove("menu-open");
}));

const tabs = [...document.querySelectorAll('[role="tab"]')];
tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => selectTab(tab));
  tab.addEventListener("keydown", event => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    let nextIndex = index;
    if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = tabs.length - 1;
    selectTab(tabs[nextIndex]);
    tabs[nextIndex].focus();
  });
});

function selectTab(selected) {
  tabs.forEach(tab => {
    const active = tab === selected;
    tab.setAttribute("aria-selected", String(active));
    tab.tabIndex = active ? 0 : -1;
    document.getElementById(tab.getAttribute("aria-controls")).hidden = !active;
  });
}

const navLinks = [...document.querySelectorAll(".primary-nav a")];
const sections = navLinks.map(link => document.querySelector(link.getAttribute("href"))).filter(Boolean);
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
  });
}, { rootMargin: "-35% 0px -55%", threshold: 0 });
sections.forEach(section => sectionObserver.observe(section));

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });
document.querySelectorAll(".reveal").forEach(element => revealObserver.observe(element));

document.querySelector("#year").textContent = new Date().getFullYear();

const submissionDialog = document.querySelector("#submission-dialog");
const loginDialog = document.querySelector("#login-dialog");
const supabaseSettings = window.SUPABASE_CONFIG || {};
const supabaseConfigured = Boolean(
  window.supabase &&
  supabaseSettings.url &&
  supabaseSettings.anonKey &&
  !supabaseSettings.url.includes("YOUR_") &&
  !supabaseSettings.anonKey.includes("YOUR_")
);
const supabaseClient = supabaseConfigured
  ? window.supabase.createClient(supabaseSettings.url, supabaseSettings.anonKey)
  : null;

function openDialog(dialog) {
  if (!dialog) return;
  if (typeof dialog.showModal === "function") dialog.showModal();
}

document.querySelectorAll("[data-open-submission]").forEach(button => {
  button.addEventListener("click", () => openDialog(submissionDialog));
});
document.querySelectorAll("[data-open-login]").forEach(button => {
  button.addEventListener("click", () => openDialog(loginDialog));
});
document.querySelectorAll("[data-close-dialog]").forEach(button => {
  button.addEventListener("click", () => button.closest("dialog").close());
});
document.querySelectorAll("dialog").forEach(dialog => {
  dialog.addEventListener("click", event => {
    if (event.target === dialog) dialog.close();
  });
});

const contactForm = document.querySelector("#contact-form");
contactForm.addEventListener("submit", event => {
  event.preventDefault();
  const data = new FormData(contactForm);
  const subject = encodeURIComponent(data.get("subject"));
  const body = encodeURIComponent(`Name: ${data.get("name")}\nEmail: ${data.get("email")}\n\n${data.get("message")}`);
  document.querySelector("#contact-status").textContent = "Your email app is opening with this message prepared.";
  window.location.href = `mailto:journal@shivaji.du.ac.in?subject=${subject}&body=${body}`;
});

const abstractField = document.querySelector("#abstract-field");
const abstractCount = document.querySelector("#abstract-count");

function getWordCount(value) {
  return value.trim() ? value.trim().split(/\s+/).length : 0;
}

function updateAbstractCount() {
  const count = getWordCount(abstractField.value);
  abstractCount.textContent = `${count} word${count === 1 ? "" : "s"} · required: 200–250`;
  abstractCount.classList.toggle("invalid", count > 0 && (count < 200 || count > 250));
  return count;
}
abstractField.addEventListener("input", updateAbstractCount);

const coauthorList = document.querySelector("#coauthor-list");
const coauthorCount = document.querySelector("#coauthor-count");
const emptyCoauthors = document.querySelector("#empty-coauthors");
let coauthorNumber = 0;

function updateCoauthorState() {
  const count = coauthorList.children.length;
  coauthorCount.textContent = `${count} added`;
  emptyCoauthors.hidden = count > 0;
}

document.querySelector("#add-coauthor").addEventListener("click", () => {
  coauthorNumber += 1;
  const row = document.createElement("div");
  row.className = "coauthor-row";
  row.innerHTML = `
    <label><span>Co-author name *</span><input name="coauthorName${coauthorNumber}" data-field="name" required /></label>
    <label><span>Institution *</span><input name="coauthorInstitution${coauthorNumber}" data-field="institution" required /></label>
    <label><span>Email *</span><input name="coauthorEmail${coauthorNumber}" data-field="email" type="email" required /></label>
    <button type="button" aria-label="Remove co-author">×</button>
  `;
  row.querySelector("button").addEventListener("click", () => {
    row.remove();
    updateCoauthorState();
  });
  coauthorList.append(row);
  row.querySelector("input").focus();
  updateCoauthorState();
});

const fileInput = document.querySelector("#manuscript-file");
const fileDrop = document.querySelector("#file-drop");
const fileName = document.querySelector("#file-name");
const fileError = document.querySelector("#file-error");

function validateFile(file) {
  fileError.textContent = "";
  if (!file) {
    fileName.textContent = "No file selected";
    return false;
  }
  const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
  if (!isPdf) {
    fileError.textContent = "Please select a PDF document.";
    fileInput.value = "";
    fileName.textContent = "No file selected";
    return false;
  }
  if (file.size > 10 * 1024 * 1024) {
    fileError.textContent = "The manuscript is larger than 10 MB.";
    fileInput.value = "";
    fileName.textContent = "No file selected";
    return false;
  }
  fileName.textContent = `${file.name} · ${(file.size / 1024 / 1024).toFixed(2)} MB`;
  return true;
}

fileInput.addEventListener("change", () => validateFile(fileInput.files[0]));
["dragenter", "dragover"].forEach(type => fileDrop.addEventListener(type, event => {
  event.preventDefault();
  fileDrop.classList.add("dragging");
}));
["dragleave", "drop"].forEach(type => fileDrop.addEventListener(type, event => {
  event.preventDefault();
  fileDrop.classList.remove("dragging");
}));
fileDrop.addEventListener("drop", event => {
  const file = event.dataTransfer.files[0];
  if (!file) return;
  const transfer = new DataTransfer();
  transfer.items.add(file);
  fileInput.files = transfer.files;
  validateFile(file);
});

const submissionForm = document.querySelector("#submission-form");
const submissionButton = document.querySelector("#submission-button");
const submissionStatus = document.querySelector("#submission-status");

function getCoauthors() {
  return [...coauthorList.querySelectorAll(".coauthor-row")].map(row => ({
    name: row.querySelector('[data-field="name"]').value.trim(),
    institution: row.querySelector('[data-field="institution"]').value.trim(),
    email: row.querySelector('[data-field="email"]').value.trim()
  }));
}

function safeFileName(name) {
  return name.toLowerCase().replace(/[^a-z0-9._-]+/g, "-").replace(/^-+|-+$/g, "");
}

submissionForm.addEventListener("submit", async event => {
  event.preventDefault();
  const wordCount = updateAbstractCount();
  const keywordInput = submissionForm.elements.keywords;
  const keywords = keywordInput.value.split(",").map(word => word.trim()).filter(Boolean);
  const keywordCount = keywords.length;
  abstractField.setCustomValidity(wordCount >= 200 && wordCount <= 250 ? "" : "Please enter an abstract between 200 and 250 words.");
  keywordInput.setCustomValidity(keywordCount >= 4 && keywordCount <= 6 ? "" : "Please enter 4 to 6 comma-separated keywords.");
  const fileIsValid = validateFile(fileInput.files[0]);
  if (!submissionForm.reportValidity() || !fileIsValid) return;

  submissionStatus.classList.remove("error");
  if (!supabaseClient) {
    submissionStatus.classList.add("error");
    submissionStatus.textContent = "Supabase is not connected yet. Add the Project URL and anon key in supabase-config.js, then try again.";
    submissionStatus.scrollIntoView({ behavior: "smooth", block: "nearest" });
    return;
  }

  submissionButton.disabled = true;
  submissionButton.textContent = "Uploading PDF…";
  submissionStatus.textContent = "Please wait while your manuscript is being submitted.";

  try {
    const formData = new FormData(submissionForm);
    const submissionId = crypto.randomUUID();
    const manuscript = fileInput.files[0];
    const filePath = `${submissionId}/${Date.now()}-${safeFileName(manuscript.name)}`;

    const { error: uploadError } = await supabaseClient.storage
      .from("manuscripts")
      .upload(filePath, manuscript, {
        cacheControl: "3600",
        contentType: "application/pdf",
        upsert: false
      });
    if (uploadError) throw uploadError;

    submissionButton.textContent = "Saving details…";
    const { error: databaseError } = await supabaseClient
      .from("manuscript_submissions")
      .insert({
        id: submissionId,
        author_name: formData.get("authorName").trim(),
        author_email: formData.get("authorEmail").trim(),
        phone: formData.get("phone").trim(),
        institution: formData.get("institution").trim(),
        department: formData.get("department").trim(),
        designation: formData.get("designation").trim(),
        orcid: formData.get("orcid").trim() || null,
        article_title: formData.get("articleTitle").trim(),
        article_type: formData.get("articleType"),
        discipline: formData.get("discipline"),
        abstract: formData.get("abstract").trim(),
        keywords,
        coauthors: getCoauthors(),
        manuscript_path: filePath,
        original_work: formData.get("originalWork") === "on",
        ethics_accepted: formData.get("ethicsAccepted") === "on"
      });
    if (databaseError) throw databaseError;

    submissionForm.reset();
    coauthorList.replaceChildren();
    updateCoauthorState();
    fileName.textContent = "No file selected";
    updateAbstractCount();
    submissionStatus.textContent = `Submission received successfully. Reference ID: ${submissionId.slice(0, 8).toUpperCase()}`;
  } catch (error) {
    submissionStatus.classList.add("error");
    submissionStatus.textContent = `Submission failed: ${error.message || "Please check the connection and try again."}`;
  } finally {
    submissionButton.disabled = false;
    submissionButton.textContent = "Submit manuscript online";
    submissionStatus.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
});

const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", event => {
  event.preventDefault();
  loginForm.querySelector('input[type="password"]').value = "";
  document.querySelector("#login-status").textContent = "Editorial authentication is a prototype and has not been connected yet.";
});
