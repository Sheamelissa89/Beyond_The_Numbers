/* ==========================================================
   MATHEMATICAL CODEX — GLOSSARY

   Responsibilities:
   - Display glossary entries
   - Search names, definitions, examples, and categories
   - Filter by category
   - Open related entries
   - Connect discovery portals to the glossary

   Requires glossary-data.js to load first.
   ========================================================== */

(() => {
  "use strict";


  /* PAGE ELEMENTS
     -------------------------------------------------------- */

  const search = document.querySelector("#search");
  const termsContainer = document.querySelector("#terms");
  const filters = document.querySelector("#filters");
  const resetButton = document.querySelector("#reset");
  const resultCount = document.querySelector("#result-count");

  const codex = window.Codex;

  // Leave other pages alone if this script is included accidentally.
  if (
    !search ||
    !termsContainer ||
    !filters ||
    !resetButton ||
    !resultCount
  ) {
    return;
  }

  if (
    !codex ||
    !Array.isArray(codex.terms) ||
    !codex.categories
  ) {
    resultCount.textContent =
      "The glossary could not load. Check that " +
      "glossary-data.js loads before glossary.js.";

    return;
  }


  /* STATE AND LOOKUP
     -------------------------------------------------------- */

  let activeCategory = "all";

  const termsById = new Map(
    codex.terms.map(term => [term.id, term])
  );

  const sortedTerms = [...codex.terms].sort((first, second) =>
    first.name.localeCompare(second.name)
  );

  function normalize(text) {
    return String(text)
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }

  function isValidCategory(category) {
    return (
      category === "all" ||
      Object.prototype.hasOwnProperty.call(
        codex.categories,
        category
      )
    );
  }


  /* CREATE ONE GLOSSARY ENTRY
     -------------------------------------------------------- */

  function createTermCard(term) {
    const card = document.createElement("details");

    card.className = "term";
    card.id = `term-${term.id}`;

    // The native details/summary elements provide keyboard
    // support and announce whether an entry is expanded.
    const summary = document.createElement("summary");

    const categoryLabel = document.createElement("span");

    categoryLabel.className = "term-category";
    categoryLabel.textContent =
      codex.categories[term.category] || term.category;

    summary.append(
      categoryLabel,
      document.createTextNode(term.name)
    );

    const definition = document.createElement("p");
    definition.textContent = term.definition;

    const example = document.createElement("p");
    example.className = "example";
    example.textContent = term.example;

    card.append(summary, definition, example);

    const relatedIds = Array.isArray(term.related)
      ? term.related
      : [];

    const relatedTerms = relatedIds
      .map(id => termsById.get(id))
      .filter(Boolean);

    if (relatedTerms.length > 0) {
      const related = document.createElement("div");

      related.className = "related";
      related.setAttribute("role", "group");
      related.setAttribute(
        "aria-label",
        `Ideas connected to ${term.name}`
      );

      relatedTerms.forEach(relatedTerm => {
        const button = document.createElement("button");

        button.type = "button";
        button.textContent = `↗ ${relatedTerm.name}`;

        button.addEventListener("click", () => {
          openTerm(relatedTerm.id);
        });

        related.append(button);
      });

      card.append(related);
    }

    return card;
  }


  /* SEARCH AND DISPLAY
     -------------------------------------------------------- */

  function getMatchingTerms() {
    const searchWords = normalize(search.value)
      .trim()
      .split(/\s+/)
      .filter(Boolean);

    return sortedTerms.filter(term => {
      const matchesCategory =
        activeCategory === "all" ||
        term.category === activeCategory;

      if (!matchesCategory) {
        return false;
      }

      const searchableText = normalize(
        [
          term.name,
          term.definition,
          term.example,
          codex.categories[term.category] || term.category
        ].join(" ")
      );

      // Every search word must appear somewhere in the entry.
      return searchWords.every(word =>
        searchableText.includes(word)
      );
    });
  }

  function updateFilterButtons() {
    filters
      .querySelectorAll("button[data-category]")
      .forEach(button => {
        const isActive =
          button.dataset.category === activeCategory;

        button.setAttribute(
          "aria-pressed",
          String(isActive)
        );
      });
  }

  function render() {
    // Preserve expanded entries when they still match a search.
    const expandedIds = new Set(
      Array.from(
        termsContainer.querySelectorAll("details[open]")
      ).map(card => card.id)
    );

    const matches = getMatchingTerms();
    const fragment = document.createDocumentFragment();

    matches.forEach(term => {
      const card = createTermCard(term);

      if (expandedIds.has(card.id)) {
        card.open = true;
      }

      fragment.append(card);
    });

    if (matches.length === 0) {
      const message = document.createElement("p");

      message.className = "empty";
      message.textContent =
        "No matching ideas yet. Try another word " +
        "or reset your filters.";

      fragment.append(message);
    }

    termsContainer.replaceChildren(fragment);
    updateFilterButtons();

    const noun = matches.length === 1 ? "idea" : "ideas";

    const categoryDescription =
      activeCategory === "all"
        ? "all worlds"
        : codex.categories[activeCategory];

    resultCount.textContent =
      `${matches.length} ${noun} found in ` +
      `${categoryDescription}.`;
  }


  /* NAVIGATION HELPERS
     -------------------------------------------------------- */

  function filterByCategory(category) {
    if (!isValidCategory(category)) {
      return;
    }

    activeCategory = category;
    search.value = "";

    render();
  }

  function openTerm(id) {
    if (!termsById.has(id)) {
      return;
    }

    // Clear filters so a connected idea is always reachable.
    filterByCategory("all");

    const card = document.getElementById(`term-${id}`);

    if (!card) {
      return;
    }

    card.open = true;
    card.scrollIntoView({
      block: "center"
    });

    card.querySelector("summary").focus({
      preventScroll: true
    });
  }

  // The concept map can use these without duplicating logic.
  codex.filter = filterByCategory;
  codex.openTerm = openTerm;


  /* SEARCH AND FILTER EVENTS
     -------------------------------------------------------- */

  search.addEventListener("input", render);

  filters.addEventListener("click", event => {
    const button = event.target.closest(
      "button[data-category]"
    );

    if (!button || !filters.contains(button)) {
      return;
    }

    const category = button.dataset.category;

    if (!isValidCategory(category)) {
      return;
    }

    // Keep the search text when switching filter buttons.
    activeCategory = category;
    render();
  });

  resetButton.addEventListener("click", () => {
    filterByCategory("all");
    search.focus();
  });


  /* DISCOVERY PORTAL EVENTS
     -------------------------------------------------------- */

  document
    .querySelectorAll(".portal[data-category]")
    .forEach(portal => {
      portal.addEventListener("click", () => {
        const category = portal.dataset.category;

        if (!isValidCategory(category)) {
          return;
        }

        filterByCategory(category);

        document.querySelector("#glossary").scrollIntoView({
          block: "start"
        });

        search.focus({
          preventScroll: true
        });
      });
    });


  /* INITIAL DISPLAY
     -------------------------------------------------------- */

  render();
})();