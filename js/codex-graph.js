/* ==========================================================
   CODEX — INTERACTIVE FUNCTION GRAPH

   Linear:    y = ax + b
   Quadratic: y = ax² + bx + c

   Graph window: −10 to 10 on both axes.
   ========================================================== */

(() => {
  "use strict";

  const graph = document.querySelector("#function-graph");

  if (!graph) {
    return;
  }

  const type = document.querySelector("#graph-type");

  const aSlider = document.querySelector("#graph-a");
  const bSlider = document.querySelector("#graph-b");
  const cSlider = document.querySelector("#graph-c");
  const xSlider = document.querySelector("#graph-x");

  const aLabel = document.querySelector("#graph-a-label");
  const bLabel = document.querySelector("#graph-b-label");
  const cControl = document.querySelector("#graph-c-control");

  const equation = document.querySelector("#graph-equation");
  const grid = document.querySelector("#graph-grid");
  const curve = document.querySelector("#graph-curve");
  const point = document.querySelector("#graph-point");

  const summary = document.querySelector("#graph-summary");
  const explanation = document.querySelector("#graph-explanation");

  const description = document.querySelector(
    "#function-graph-description"
  );

  const svgNamespace = "http://www.w3.org/2000/svg";

  const minimum = -10;
  const maximum = 10;

  const left = 40;
  const top = 20;
  const plotSize = 420;


  /* COORDINATE HELPERS
     -------------------------------------------------------- */

  function screenX(x) {
    return left + (x - minimum) / (maximum - minimum) * plotSize;
  }

  function screenY(y) {
    return top + (maximum - y) / (maximum - minimum) * plotSize;
  }

  function makeSvgElement(tag, attributes, text = "") {
    const element = document.createElementNS(
      svgNamespace,
      tag
    );

    Object.entries(attributes).forEach(([name, value]) => {
      element.setAttribute(name, String(value));
    });

    if (text !== "") {
      element.textContent = text;
    }

    return element;
  }

  function format(number) {
    return Number(number.toFixed(3)).toString();
  }

  function signedTerm(number, suffix = "") {
    const sign = number < 0 ? "−" : "+";

    return `${sign} ${format(Math.abs(number))}${suffix}`;
  }


  /* DRAW THE FIXED GRID
     -------------------------------------------------------- */

  function drawGrid() {
    const fragment = document.createDocumentFragment();

    for (let value = minimum; value <= maximum; value++) {
      const axis = value === 0;

      fragment.append(
        makeSvgElement("line", {
          x1: screenX(value),
          y1: top,
          x2: screenX(value),
          y2: top + plotSize,
          stroke: axis ? "#c0c9e4" : "#293650",
          "stroke-width": axis ? 1.8 : 0.7
        }),

        makeSvgElement("line", {
          x1: left,
          y1: screenY(value),
          x2: left + plotSize,
          y2: screenY(value),
          stroke: axis ? "#c0c9e4" : "#293650",
          "stroke-width": axis ? 1.8 : 0.7
        })
      );

      // Label every second unit along the outside edges.
      if (value % 2 === 0) {
        fragment.append(
          makeSvgElement(
            "text",
            {
              x: screenX(value),
              y: 458,
              "text-anchor": "middle"
            },
            String(value)
          ),

          makeSvgElement(
            "text",
            {
              x: 31,
              y: screenY(value) + 4,
              "text-anchor": "end"
            },
            String(value)
          )
        );
      }
    }

    fragment.append(
      makeSvgElement(
        "text",
        {
          x: 455,
          y: screenY(0) - 10,
          "text-anchor": "end"
        },
        "x"
      ),

      makeSvgElement(
        "text",
        {
          x: screenX(0) + 10,
          y: 34
        },
        "y"
      )
    );

    grid.replaceChildren(fragment);
  }


  /* UPDATE EQUATION, CURVE, AND POINT
     -------------------------------------------------------- */

  function updateGraph() {
    const quadratic = type.value === "quadratic";

    const a = Number(aSlider.value);
    const b = Number(bSlider.value);
    const c = Number(cSlider.value);
    const x = Number(xSlider.value);

    cControl.hidden = !quadratic;

    aLabel.textContent = quadratic
      ? "Quadratic coefficient a"
      : "Slope a";

    bLabel.textContent = quadratic
      ? "Coefficient b"
      : "Vertical intercept b";

    document.querySelector("#graph-a-value").textContent = format(a);
    document.querySelector("#graph-b-value").textContent = format(b);
    document.querySelector("#graph-c-value").textContent = format(c);
    document.querySelector("#graph-x-value").textContent = format(x);

    function evaluate(input) {
      return quadratic
        ? a * input * input + b * input + c
        : a * input + b;
    }

    const formula = quadratic
      ? `y = ${format(a)}x² ${signedTerm(b, "x")} ${signedTerm(c)}`
      : `y = ${format(a)}x ${signedTerm(b)}`;

    equation.textContent = formula;

    // Sample the function across the visible x range.
    // SVG clipping handles outputs beyond the visible y range.
    let path = "";

    const samples = 400;

    for (let index = 0; index <= samples; index++) {
      const input =
        minimum + (maximum - minimum) * index / samples;

      const output = evaluate(input);

      path +=
        `${index === 0 ? "M" : "L"} ` +
        `${screenX(input)} ${screenY(output)} `;
    }

    curve.setAttribute("d", path);

    const y = evaluate(x);
    const visible = y >= minimum && y <= maximum;

    point.setAttribute("cx", screenX(x));
    point.setAttribute("cy", screenY(y));
    point.setAttribute("visibility", visible ? "visible" : "hidden");

    summary.textContent =
      `When x = ${format(x)}, y = ${format(y)}. ` +
      `Point: (${format(x)}, ${format(y)}).` +
      (visible
        ? ""
        : " This point is outside the displayed y range.");

    if (!quadratic) {
      explanation.textContent =
        a === 0
          ? `The slope is zero, so y stays at ${format(b)} ` +
            "for every x. The graph is horizontal."
          : `The slope is ${format(a)}: increasing x by 1 ` +
            `changes y by ${format(a)}. ` +
            `The graph crosses the y-axis at (0, ${format(b)}).`;
    } else if (a === 0) {
      explanation.textContent =
        "With a = 0, the squared term disappears. " +
        "This equation becomes linear rather than quadratic.";
    } else {
      explanation.textContent =
        `The parabola opens ${a > 0 ? "upward" : "downward"}. ` +
        "Changing a affects its curvature; b and c also affect " +
        `its position. The y-intercept is (0, ${format(c)}).`;
    }

    description.textContent =
      `${formula}. Both axes run from −10 to 10. ` +
      `Selected point: (${format(x)}, ${format(y)}). ` +
      explanation.textContent;
  }


  /* EVENTS AND INITIAL DISPLAY
     -------------------------------------------------------- */

  [aSlider, bSlider, cSlider, xSlider].forEach(slider => {
    slider.addEventListener("input", updateGraph);
  });

  type.addEventListener("change", updateGraph);

  document
    .querySelector("#graph-reset")
    .addEventListener("click", () => {
      type.value = "linear";

      aSlider.value = 1;
      bSlider.value = 0;
      cSlider.value = 0;
      xSlider.value = 2;

      updateGraph();
    });

  drawGrid();
  updateGraph();
})();