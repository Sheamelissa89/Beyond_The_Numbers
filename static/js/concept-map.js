/* ==========================================================
   CODEX — EXPLAINED CONCEPT MAP

   Everyday mathematics is the starting map.
   The original science connections remain available.

   Requires:
   - glossary-data.js
   - glossary.js
   - codex-reference-data.js
   - codex-reference.js
   ========================================================== */

(() => {
  "use strict";

  const map = document.querySelector("#concept-map");
  const detail = document.querySelector("#map-detail");
  const selector = document.querySelector("#map-world");

  const codex = window.Codex;

  if (
    !map ||
    !detail ||
    !selector ||
    !codex?.referenceEntries
  ) {
    return;
  }


  /* CONNECTIONS
     Each row: first ID, second ID, reason, example */

  const mathEdges = [
    [
      "addition",
      "multiplication",
      "Whole-number multiplication can describe repeated addition.",
      "3 × 4 = 4 + 4 + 4 = 12."
    ],

    [
      "multiplication",
      "area",
      "Multiplication counts equal rows of square units in a rectangle.",
      "A rectangle 3 units wide and 4 units high contains 12 square units."
    ],

    [
      "area",
      "perimeter",
      "These measure different features of the same shape: inside versus boundary.",
      "A 3 by 4 rectangle has area 12 square units and perimeter 14 units."
    ],

    [
      "addition",
      "perimeter",
      "Add the boundary lengths to find a polygon’s perimeter.",
      "A 3 by 4 rectangle has perimeter 3 + 4 + 3 + 4 = 14."
    ],

    [
      "multiplication",
      "division",
      "Division can undo multiplication when the divisor is nonzero.",
      "3 × 4 = 12, so 12 ÷ 3 = 4."
    ],

    [
      "division",
      "fraction",
      "A fraction represents division by a nonzero denominator.",
      "3/4 means 3 ÷ 4, which equals 0.75."
    ],

    [
      "fraction",
      "probability-math",
      "For equally likely outcomes, probability is favorable outcomes divided by all possible outcomes.",
      "A fair die has 3 even faces out of 6: P(even) = 3/6 = 1/2."
    ],

    [
      "fraction",
      "ratio",
      "Fractions can express comparisons, but notice which quantities are being compared.",
      "2 red and 3 blue gives red:blue = 2:3, while red:total = 2:5."
    ],

    [
      "ratio",
      "division",
      "The quotient of the compared quantities gives a ratio’s numerical value.",
      "The ratio 6:3 has value 6 ÷ 3 = 2."
    ]
  ];

  const positions = [
    [50, 9],
    [80, 21],
    [84, 50],
    [80, 79],
    [50, 91],
    [20, 79],
    [16, 50],
    [20, 21]
  ];

  const svgNamespace = "http://www.w3.org/2000/svg";

  let buttons;
  let lines;
  let edges;
  let terms;
  let ids;


  /* SMALL DISPLAY HELPERS */

  function paragraph(text, className = "") {
    const element = document.createElement("p");

    element.textContent = text;
    element.className = className;

    return element;
  }

  function termName(id) {
    return terms.get(id).name;
  }


  /* SELECT AN IDEA */

  function selectIdea(id, moveFocus = false) {
    const term = terms.get(id);

    const connected = edges.filter(
      ([first, second]) => first === id || second === id
    );

    const neighbors = connected.map(
      ([first, second]) => first === id ? second : first
    );

    buttons.forEach((button, nodeId) => {
      const selected = nodeId === id;
      const isConnected = neighbors.includes(nodeId);

      button.setAttribute(
        "aria-pressed",
        String(selected)
      );

      button.classList.toggle(
        "connected",
        isConnected
      );

      const description = selected
        ? ", selected idea"
        : isConnected
          ? ", connected idea"
          : "";

      button.setAttribute(
        "aria-label",
        termName(nodeId) + description
      );
    });

    lines.forEach(({ line, first, second }) => {
      line.classList.toggle(
        "active",
        first === id || second === id
      );
    });

    const heading = document.createElement("h3");
    heading.textContent = term.name;

    const list = document.createElement("ul");

    connected.forEach(([first, second, reason, example]) => {
      const other = first === id ? second : first;

      const item = document.createElement("li");
      const button = document.createElement("button");

      button.type = "button";
      button.textContent = `Explore ${termName(other)} →`;

      button.addEventListener("click", () => {
        selectIdea(other, true);
      });

      item.append(
        button,
        paragraph(reason),
        paragraph(
          `Example: ${example}`,
          "connection-example"
        )
      );

      list.append(item);
    });

    const openButton = document.createElement("button");

    openButton.type = "button";

    openButton.textContent = selector.value === "math"
      ? "Read this in the Math Reference Library ↗"
      : "Read this in the discovery glossary ↗";

    openButton.addEventListener("click", () => {
      if (selector.value === "math") {
        codex.openReference?.(id);
      } else {
        codex.openTerm?.(id);
      }
    });

    detail.replaceChildren(
      paragraph("Selected idea", "eyebrow"),
      heading,
      paragraph(term.meaning || term.definition),
      paragraph("How it connects"),
      list,
      openButton
    );

    if (moveFocus) {
      buttons.get(id).focus({
        preventScroll: true
      });
    }
  }


  /* BUILD THE SELECTED MAP */

  function buildMap() {
    const isMath = selector.value === "math";

    const sourceTerms = isMath
      ? codex.referenceEntries
      : codex.terms;

    terms = new Map(
      sourceTerms.map(term => [term.id, term])
    );

    ids = isMath
      ? [
          "addition",
          "multiplication",
          "area",
          "perimeter",
          "division",
          "fraction",
          "probability-math",
          "ratio"
        ]
      : [
          "atom",
          "photon",
          "frequency",
          "wavelength",
          "light",
          "gravity",
          "orbit",
          "circle"
        ];

    edges = isMath
      ? mathEdges
      : codex.connections.map(([first, second, reason]) => [
          first,
          second,
          reason,
          terms.get(second).example
        ]);

    buttons = new Map();
    lines = [];

    const svg = document.createElementNS(
      svgNamespace,
      "svg"
    );

    svg.setAttribute("viewBox", "0 0 100 100");
    svg.setAttribute("preserveAspectRatio", "none");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");

    edges.forEach(([first, second]) => {
      const [x1, y1] = positions[ids.indexOf(first)];
      const [x2, y2] = positions[ids.indexOf(second)];

      const line = document.createElementNS(
        svgNamespace,
        "line"
      );

      Object.entries({
        x1,
        y1,
        x2,
        y2
      }).forEach(([name, value]) => {
        line.setAttribute(name, value);
      });

      svg.append(line);

      lines.push({
        line,
        first,
        second
      });
    });

    map.replaceChildren(svg);

    ids.forEach((id, index) => {
      const button = document.createElement("button");

      button.type = "button";
      button.className = "map-node";
      button.textContent = termName(id);

      button.style.left = `${positions[index][0]}%`;
      button.style.top = `${positions[index][1]}%`;

      button.setAttribute("aria-controls", "map-detail");

      button.addEventListener("click", () => {
        selectIdea(id);
      });

      map.append(button);
      buttons.set(id, button);
    });

    selectIdea(
      isMath ? "multiplication" : "frequency"
    );
  }

  selector.addEventListener("change", buildMap);

  buildMap();
})();