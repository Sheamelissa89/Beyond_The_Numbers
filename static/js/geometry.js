/* ==========================================================
   GEOMETRY — INTERACTIVE ACTIVITIES

   1. Area and perimeter
   2. Angle explorer
   3. Reflection symmetry

   No dependency on main.js.
   ========================================================== */

(() => {
  "use strict";

  const svgNamespace = "http://www.w3.org/2000/svg";

  function makeSvgElement(tag, attributes) {
    const element = document.createElementNS(
      svgNamespace,
      tag
    );

    Object.entries(attributes).forEach(([name, value]) => {
      element.setAttribute(name, String(value));
    });

    return element;
  }


  /* 1. AREA AND PERIMETER
     -------------------------------------------------------- */

  function initializeRectangle() {
    const drawing = document.querySelector("#rectangle-drawing");

    if (!drawing) {
      return;
    }

    const widthSlider = document.querySelector("#rectangle-width");
    const heightSlider = document.querySelector("#rectangle-height");

    const widthValue = document.querySelector("#width-value");
    const heightValue = document.querySelector("#height-value");

    const areaValue = document.querySelector("#rectangle-area");
    const perimeterValue = document.querySelector("#rectangle-perimeter");

    const description = document.querySelector(
      "#rectangle-description"
    );

    const explanation = document.querySelector(
      "#rectangle-explanation"
    );

    function updateRectangle() {
      const width = Number(widthSlider.value);
      const height = Number(heightSlider.value);

      const area = width * height;
      const perimeter = 2 * (width + height);

      widthValue.textContent =
        `${width} ${width === 1 ? "unit" : "units"}`;

      heightValue.textContent =
        `${height} ${height === 1 ? "unit" : "units"}`;

      areaValue.textContent =
        `${area} ${area === 1 ? "square unit" : "square units"}`;

      perimeterValue.textContent = `${perimeter} units`;

      explanation.textContent =
        `Area counts the squares inside: ${width} × ${height} = ${area}. ` +
        `Perimeter measures the boundary: ` +
        `${width} + ${height} + ${width} + ${height} = ${perimeter}. ` +
        (width === height
          ? "This rectangle is also a square because its sides are equal."
          : "Try changing one dimension while keeping the other fixed.");

      description.textContent =
        `Rectangle ${width} units wide and ${height} units high. ` +
        `Area ${area} square units. Perimeter ${perimeter} units.`;

      // A fixed drawing scale makes changes easy to compare.
      const scale = 20;
      const left = (360 - width * scale) / 2;
      const top = (280 - height * scale) / 2;

      const fragment = document.createDocumentFragment();

      fragment.append(
        makeSvgElement("rect", {
          x: left,
          y: top,
          width: width * scale,
          height: height * scale,
          fill: "#173e4e"
        })
      );

      // Interior grid lines mark individual square units.
      for (let column = 1; column < width; column++) {
        const x = left + column * scale;

        fragment.append(
          makeSvgElement("line", {
            x1: x,
            y1: top,
            x2: x,
            y2: top + height * scale,
            stroke: "#75adb7",
            "stroke-width": 1
          })
        );
      }

      for (let row = 1; row < height; row++) {
        const y = top + row * scale;

        fragment.append(
          makeSvgElement("line", {
            x1: left,
            y1: y,
            x2: left + width * scale,
            y2: y,
            stroke: "#75adb7",
            "stroke-width": 1
          })
        );
      }

      // Draw the perimeter last so it stays clearly visible.
      fragment.append(
        makeSvgElement("rect", {
          x: left,
          y: top,
          width: width * scale,
          height: height * scale,
          fill: "none",
          stroke: "#f2cd83",
          "stroke-width": 3
        })
      );

      drawing.replaceChildren(fragment);
    }

    widthSlider.addEventListener("input", updateRectangle);
    heightSlider.addEventListener("input", updateRectangle);

    document
      .querySelector("#make-square")
      .addEventListener("click", () => {
        // Both sliders support side lengths from 1 through 10.
        const side = Math.min(Number(widthSlider.value), 10);

        widthSlider.value = side;
        heightSlider.value = side;

        updateRectangle();
      });

    document
      .querySelector("#reset-rectangle")
      .addEventListener("click", () => {
        widthSlider.value = 6;
        heightSlider.value = 4;

        updateRectangle();
      });

    updateRectangle();
  }


  /* 2. ANGLE EXPLORER
     -------------------------------------------------------- */

  function initializeAngles() {
    const slider = document.querySelector("#angle-slider");

    if (!slider) {
      return;
    }

    const value = document.querySelector("#angle-value");
    const type = document.querySelector("#angle-type");
    const explanation = document.querySelector("#angle-explanation");

    const ray = document.querySelector("#moving-ray");
    const arc = document.querySelector("#angle-arc");
    const description = document.querySelector("#angle-description");

    function classifyAngle(degrees) {
      if (degrees === 0) {
        return ["Zero angle", "No turn has been made."];
      }

      if (degrees < 90) {
        return ["Acute angle", "Greater than 0° and less than 90°."];
      }

      if (degrees === 90) {
        return ["Right angle", "Exactly one quarter of a full turn."];
      }

      if (degrees < 180) {
        return ["Obtuse angle", "Greater than 90° and less than 180°."];
      }

      if (degrees === 180) {
        return ["Straight angle", "Exactly half of a full turn."];
      }

      if (degrees < 360) {
        return ["Reflex angle", "Greater than 180° and less than 360°."];
      }

      return ["Full turn", "A complete 360° turn returns to the starting direction."];
    }

    function updateAngle() {
      const degrees = Number(slider.value);
      const radians = degrees * Math.PI / 180;

      const [name, meaning] = classifyAngle(degrees);

      value.textContent = `${degrees}°`;
      type.textContent = name;

      explanation.textContent =
        `${meaning} The purple arc marks the counterclockwise turn.`;

      slider.setAttribute(
        "aria-valuetext",
        `${degrees} degrees, ${name.toLowerCase()}`
      );

      const endX = 180 + Math.cos(radians) * 120;
      const endY = 160 - Math.sin(radians) * 120;

      ray.setAttribute("x2", endX);
      ray.setAttribute("y2", endY);

      /*
       * Use short line segments for the angle arc.
       * This handles 0°, reflex angles, and 360° consistently.
       */
      const radius = 48;
      const steps = Math.max(1, Math.ceil(degrees / 4));

      let path = "";

      for (let index = 0; index <= steps; index++) {
        const rotation = radians * index / steps;

        const x = 180 + Math.cos(rotation) * radius;
        const y = 160 - Math.sin(rotation) * radius;

        path += `${index === 0 ? "M" : "L"} ${x} ${y} `;
      }

      arc.setAttribute("d", degrees === 0 ? "" : path);

      description.textContent =
        `${degrees}-degree counterclockwise turn. ` +
        `${name}. ${meaning}`;
    }

    slider.addEventListener("input", updateAngle);

    document
      .querySelectorAll("[data-angle-preset]")
      .forEach(button => {
        button.addEventListener("click", () => {
          slider.value = button.dataset.anglePreset;
          updateAngle();
        });
      });

    updateAngle();
  }


  /* 3. REFLECTION SYMMETRY
     -------------------------------------------------------- */

  function initializeSymmetry() {
    const grid = document.querySelector("#symmetry-grid");

    if (!grid) {
      return;
    }

    const mirrorMode = document.querySelector("#mirror-mode");
    const status = document.querySelector("#symmetry-status");

    const size = 8;
    const selected = new Set();
    const buttons = [];

    function cellIndex(row, column) {
      return row * size + column;
    }

    function reflectedIndex(index) {
      const row = Math.floor(index / size);
      const column = index % size;

      return cellIndex(row, size - 1 - column);
    }

    function setCell(index, active) {
      if (active) {
        selected.add(index);
      } else {
        selected.delete(index);
      }
    }

    function copyLeftToRight() {
      for (let row = 0; row < size; row++) {
        for (let column = 0; column < size / 2; column++) {
          const left = cellIndex(row, column);

          setCell(
            reflectedIndex(left),
            selected.has(left)
          );
        }
      }
    }

    function isSymmetric() {
      for (let index = 0; index < size * size; index++) {
        if (
          selected.has(index) !==
          selected.has(reflectedIndex(index))
        ) {
          return false;
        }
      }

      return true;
    }

    function updateGrid() {
      buttons.forEach((button, index) => {
        const active = selected.has(index);

        button.setAttribute("aria-pressed", String(active));
        button.textContent = active ? "◆" : "";
      });

      if (selected.size === 0) {
        status.textContent =
          "The grid is empty. Select a tile to begin your design.";

        return;
      }

      status.textContent =
        `${selected.size} tiles selected. ` +
        (isSymmetric()
          ? "The design has reflection symmetry across the gold line."
          : "The two halves do not match across the gold line.");
    }

    const fragment = document.createDocumentFragment();

    for (let index = 0; index < size * size; index++) {
      const button = document.createElement("button");

      const row = Math.floor(index / size);
      const column = index % size;

      button.type = "button";
      button.className = "symmetry-tile";

      button.setAttribute("aria-pressed", "false");

      button.setAttribute(
        "aria-label",
        `Row ${row + 1}, column ${column + 1}`
      );

      button.addEventListener("click", () => {
        const active = !selected.has(index);

        setCell(index, active);

        if (mirrorMode.checked) {
          setCell(reflectedIndex(index), active);
        }

        updateGrid();
      });

      // Arrow keys supplement the normal Tab navigation.
      button.addEventListener("keydown", event => {
        const moves = {
          ArrowLeft: [0, -1],
          ArrowRight: [0, 1],
          ArrowUp: [-1, 0],
          ArrowDown: [1, 0]
        };

        if (!moves[event.key]) {
          return;
        }

        event.preventDefault();

        const [rowChange, columnChange] = moves[event.key];
        const nextRow = row + rowChange;
        const nextColumn = column + columnChange;

        if (
          nextRow >= 0 &&
          nextRow < size &&
          nextColumn >= 0 &&
          nextColumn < size
        ) {
          buttons[cellIndex(nextRow, nextColumn)].focus();
        }
      });

      buttons.push(button);
      fragment.append(button);
    }

    grid.replaceChildren(fragment);

    mirrorMode.addEventListener("change", () => {
      if (mirrorMode.checked) {
        copyLeftToRight();
      }

      updateGrid();
    });

    document
      .querySelector("#symmetry-reflect")
      .addEventListener("click", () => {
        copyLeftToRight();
        updateGrid();
      });

    document
      .querySelector("#symmetry-clear")
      .addEventListener("click", () => {
        selected.clear();
        updateGrid();
      });

    document
      .querySelector("#symmetry-example")
      .addEventListener("click", () => {
        selected.clear();

        const leftHalf = [
          [0, 3],
          [1, 2], [1, 3],
          [2, 1], [2, 2],
          [3, 0], [3, 1],
          [4, 0], [4, 1],
          [5, 1], [5, 2],
          [6, 2], [6, 3],
          [7, 3]
        ];

        leftHalf.forEach(([row, column]) => {
          selected.add(cellIndex(row, column));
        });

        copyLeftToRight();
        mirrorMode.checked = true;

        updateGrid();
      });

    updateGrid();
  }


  /* START THE ACTIVITIES */

  initializeRectangle();
  initializeAngles();
  initializeSymmetry();
})();