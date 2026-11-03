/* ==========================================================
   FRACTIONS — MULTIPLICATION AND DIVISION

   Multiplication: area overlap model.
   Division: count portions with matching denominators.

   Independent from the other fraction scripts.
   ========================================================== */

(() => {
  "use strict";


  /* HELPERS
     -------------------------------------------------------- */

  function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function greatestCommonDivisor(first, second) {
    while (second !== 0) {
      [first, second] = [second, first % second];
    }

    return first;
  }

  function simplify(numerator, denominator) {
    const divisor = greatestCommonDivisor(
      numerator,
      denominator
    );

    const top = numerator / divisor;
    const bottom = denominator / divisor;

    return bottom === 1
      ? String(top)
      : `${top}/${bottom}`;
  }

  function makeChallenge(operation) {
    if (operation === "multiply") {
      const b = randomInteger(2, 8);
      const d = randomInteger(2, 8);
      const a = randomInteger(1, b - 1);
      const c = randomInteger(1, d - 1);

      return {
        a,
        b,
        c,
        d,
        numerator: a * c,
        denominator: b * d
      };
    }

    const denominator = randomInteger(2, 12);
    const a = randomInteger(1, denominator);
    const c = randomInteger(1, denominator);

    // (a / denominator) ÷ (c / denominator) = a / c.
    // Both amounts are positive, so the divisor is never zero.
    return {
      a,
      b: denominator,
      c,
      d: denominator,
      numerator: a,
      denominator: c
    };
  }


  /* MULTIPLICATION MODEL
     -------------------------------------------------------- */

  function drawMultiplication(container, challenge) {
    const { a, b, c, d } = challenge;

    const grid = document.createElement("div");

    grid.className = "fraction-area";
    grid.style.gridTemplateColumns =
      `repeat(${d}, minmax(0, 1fr))`;

    grid.style.gridTemplateRows =
      `repeat(${b}, minmax(0, 1fr))`;

    grid.setAttribute("role", "img");

    grid.setAttribute(
      "aria-label",
      `One whole divided into ${b} rows and ${d} columns. ` +
      `${a} rows and ${c} columns are highlighted. ` +
      `Their golden overlap contains ${a * c} of ${b * d} cells.`
    );

    const fragment = document.createDocumentFragment();

    for (let row = 0; row < b; row++) {
      for (let column = 0; column < d; column++) {
        const cell = document.createElement("span");

        cell.className = "fraction-area-cell";
        cell.setAttribute("aria-hidden", "true");

        const inFirstFactor = row < a;
        const inSecondFactor = column < c;

        if (inFirstFactor && inSecondFactor) {
          cell.classList.add("overlap");
        } else if (inFirstFactor) {
          cell.classList.add("first-factor");
        } else if (inSecondFactor) {
          cell.classList.add("second-factor");
        }

        fragment.append(cell);
      }
    }

    grid.append(fragment);

    const note = document.createElement("p");

    note.className = "fraction-model-note";
    note.textContent =
      `Horizontal stripes mark ${a}/${b} of the whole. ` +
      `Vertical stripes mark ${c}/${d}. ` +
      "The dotted golden overlap belongs to both. " +
      "Count the golden cells out of all the cells.";

    container.replaceChildren(grid, note);
  }


  /* DIVISION MODEL
     -------------------------------------------------------- */

  function drawDivision(container, challenge) {
    const { a, b, c } = challenge;

    const groups = document.createElement("div");
    groups.className = "fraction-portion-groups";

    groups.setAttribute("role", "img");

    const completeGroups = Math.floor(a / c);
    const remainder = a % c;

    groups.setAttribute(
      "aria-label",
      `${a} units of size 1/${b}, arranged in portions ` +
      `of ${c} units each. There are ${completeGroups} ` +
      `complete portions and ${remainder} units left over.`
    );

    // Every outlined box represents one divisor-sized portion.
    // An unfinished box shows the fraction of a portion remaining.
    const groupCount = Math.ceil(a / c);

    for (let groupIndex = 0; groupIndex < groupCount; groupIndex++) {
      const group = document.createElement("div");
      group.className = "fraction-portion";

      const filledCount = Math.min(
        c,
        a - groupIndex * c
      );

      if (filledCount < c) {
        group.classList.add("partial");
      }

      group.setAttribute("aria-hidden", "true");

      for (let unitIndex = 0; unitIndex < c; unitIndex++) {
        const unit = document.createElement("span");
        unit.className = "fraction-unit";

        if (unitIndex < filledCount) {
          unit.classList.add("filled");
        }

        group.append(unit);
      }

      groups.append(group);
    }

    const note = document.createElement("p");

    note.className = "fraction-model-note";
    note.textContent =
      `Each golden block is 1/${b}. ` +
      `Each outlined box holds ${c} blocks, representing ` +
      `one portion of ${c}/${b}. ` +
      "Count complete boxes and any fraction of a box. " +
      "Dark spaces in an unfinished box are not part of the amount.";

    container.replaceChildren(groups, note);
  }


  /* INITIALIZE ONE LAB
     -------------------------------------------------------- */

  function initializeLab(lab) {
    const operation = lab.dataset.fractionProduct;
    const mount = lab.querySelector(".fraction-product-mount");

    if (
      !mount ||
      !["multiply", "divide"].includes(operation)
    ) {
      return;
    }

    const id = `fraction-${operation}`;
    const symbol = operation === "multiply" ? "×" : "÷";

    // Only fixed application markup is inserted as HTML.
    mount.innerHTML = `
      <div class="fraction-product-model"></div>

      <form novalidate>
        <p
          id="${id}-question"
          class="fraction-question"
          aria-live="polite"
          aria-atomic="true"
        ></p>

        <fieldset>
          <legend>Your answer</legend>

          <p>
            Equivalent fractions are accepted.
            For a whole number, use denominator 1.
            Enter whole numbers from 0 to 120;
            the denominator must be at least 1.
          </p>

          <div class="answer-fields">
            <label for="${id}-numerator">
              Numerator

              <input
                id="${id}-numerator"
                type="number"
                min="0"
                max="120"
                step="1"
                inputmode="numeric"
                autocomplete="off"
                aria-describedby="${id}-question ${id}-feedback"
                required
              >
            </label>

            <span class="answer-divider" aria-hidden="true">
              /
            </span>

            <label for="${id}-denominator">
              Denominator

              <input
                id="${id}-denominator"
                type="number"
                min="1"
                max="120"
                step="1"
                inputmode="numeric"
                autocomplete="off"
                aria-describedby="${id}-question ${id}-feedback"
                required
              >
            </label>
          </div>
        </fieldset>

        <div class="practice-actions">
          <button class="primary" type="submit">
            Check answer
          </button>

          <button
            class="secondary"
            type="button"
            data-action="hint"
          >
            Hint
          </button>

          <button
            class="secondary"
            type="button"
            data-action="explain"
          >
            Explain
          </button>

          <button
            class="secondary"
            type="button"
            data-action="next"
          >
            Next problem
          </button>
        </div>

        <p
          id="${id}-feedback"
          class="fraction-feedback"
          role="status"
          aria-atomic="true"
        ></p>
      </form>
    `;

    const model = mount.querySelector(".fraction-product-model");
    const form = mount.querySelector("form");
    const question = mount.querySelector(".fraction-question");
    const feedback = mount.querySelector(".fraction-feedback");

    const numeratorInput = mount.querySelector(
      `#${id}-numerator`
    );

    const denominatorInput = mount.querySelector(
      `#${id}-denominator`
    );

    let challenge;
    let previousKey = "";

    function tell(message, state = "") {
      feedback.textContent = message;
      feedback.dataset.state = state;
    }


    /* NEW PROBLEM */

    function nextProblem(moveFocus = false) {
      let key;

      do {
        challenge = makeChallenge(operation);

        key = [
          challenge.a,
          challenge.b,
          challenge.c,
          challenge.d
        ].join("/");
      } while (key === previousKey);

      previousKey = key;

      question.textContent =
        `${challenge.a}/${challenge.b} ${symbol} ` +
        `${challenge.c}/${challenge.d} = ?`;

      if (operation === "multiply") {
        drawMultiplication(model, challenge);
      } else {
        drawDivision(model, challenge);
      }

      form.reset();

      numeratorInput.removeAttribute("aria-invalid");
      denominatorInput.removeAttribute("aria-invalid");

      tell("");

      if (moveFocus) {
        numeratorInput.focus();
      }
    }


    /* HINTS */

    function showHint() {
      if (operation === "multiply") {
        tell(
          "Count the golden overlap cells for the numerator. " +
          "Count every cell in the whole grid for the denominator. " +
          "You can also multiply top × top and bottom × bottom."
        );
      } else {
        tell(
          "Each outlined box is one portion. " +
          "Count the full boxes. If a box is unfinished, " +
          "count its golden blocks out of its total spaces. " +
          "A division answer can be greater than one."
        );
      }
    }


    /* EXPLANATIONS */

    function showExplanation() {
      const {
        a,
        b,
        c,
        d,
        numerator,
        denominator
      } = challenge;

      const simplified = simplify(
        numerator,
        denominator
      );

      if (operation === "multiply") {
        tell(
          `The whole has ${b} × ${d} = ${b * d} cells. ` +
          `The overlap has ${a} × ${c} = ${a * c} cells. ` +
          `${a}/${b} × ${c}/${d} = ` +
          `${numerator}/${denominator}, ` +
          `which is ${simplified} in simplest form.`
        );

        return;
      }

      const complete = Math.floor(a / c);
      const remainder = a % c;

      const groupingExplanation = remainder === 0
        ? `${complete} complete portions fit exactly.`
        : `${complete} complete portions fit, with ` +
          `${remainder}/${c} of another portion remaining.`;

      tell(
        `You have ${a} blocks, and each portion needs ${c} blocks. ` +
        `${groupingExplanation} ` +
        `So ${a}/${b} ÷ ${c}/${d} = ${a}/${c}, ` +
        `which is ${simplified} in simplest form. ` +
        `The reciprocal rule gives the same result: ` +
        `${a}/${b} × ${d}/${c} = ${a * d}/${b * c}.`
      );
    }


    /* VALIDATION AND ANSWER CHECKING */

    function validNumber(input, minimum, name) {
      const value = input.valueAsNumber;

      if (
        input.value.trim() === "" ||
        !Number.isInteger(value) ||
        value < minimum ||
        value > 120
      ) {
        input.setAttribute("aria-invalid", "true");

        tell(
          `Enter a whole-number ${name} from ${minimum} to 120.`,
          "retry"
        );

        input.focus();
        return false;
      }

      return true;
    }

    form.addEventListener("submit", event => {
      event.preventDefault();

      numeratorInput.removeAttribute("aria-invalid");
      denominatorInput.removeAttribute("aria-invalid");

      if (!validNumber(numeratorInput, 0, "numerator")) {
        return;
      }

      if (!validNumber(denominatorInput, 1, "denominator")) {
        return;
      }

      // Cross-multiplication accepts equivalent fractions.
      const correct =
        numeratorInput.valueAsNumber * challenge.denominator ===
        challenge.numerator * denominatorInput.valueAsNumber;

      tell(
        correct
          ? "Correct! Choose Explain to connect your answer " +
            "to the model, or Next problem to continue."
          : "Not quite. Look at the model again, " +
            "or choose Hint for a starting point.",
        correct ? "correct" : "retry"
      );
    });


    /* EVENTS */

    mount
      .querySelector('[data-action="hint"]')
      .addEventListener("click", showHint);

    mount
      .querySelector('[data-action="explain"]')
      .addEventListener("click", showExplanation);

    mount
      .querySelector('[data-action="next"]')
      .addEventListener("click", () => {
        nextProblem(true);
      });

    [numeratorInput, denominatorInput].forEach(input => {
      input.addEventListener("input", () => {
        input.removeAttribute("aria-invalid");
        tell("");
      });
    });

    nextProblem();
  }


  /* START BOTH LABS
     -------------------------------------------------------- */

  document
    .querySelectorAll("[data-fraction-product]")
    .forEach(initializeLab);
})();