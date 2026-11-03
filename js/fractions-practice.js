/* ==========================================================
   FRACTIONS — COMPARE, ADD, AND SUBTRACT

   Independent from the existing builder and naming activity.
   Each lab keeps its own question and feedback.
   ========================================================== */

(() => {
  "use strict";


  /* SHARED HELPERS
     -------------------------------------------------------- */

  const denominators = [2, 3, 4, 5, 6, 8, 10, 12];

  function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function chooseDenominator() {
    return denominators[
      randomInteger(0, denominators.length - 1)
    ];
  }

  function drawBar(container, numerator, denominator) {
    const fragment = document.createDocumentFragment();

    for (let index = 0; index < denominator; index++) {
      const piece = document.createElement("span");

      piece.className = "bar-piece";
      piece.setAttribute("aria-hidden", "true");

      if (index < numerator) {
        piece.classList.add("is-selected");
      }

      fragment.append(piece);
    }

    container.replaceChildren(fragment);

    container.setAttribute(
      "aria-label",
      `${numerator} of ${denominator} equal parts highlighted`
    );
  }

  function greatestCommonDivisor(first, second) {
    while (second !== 0) {
      [first, second] = [second, first % second];
    }

    return first;
  }

  function simplestForm(numerator, denominator) {
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


  /* CHALLENGE GENERATION
     -------------------------------------------------------- */

  function makeChallenge(operation) {
    const firstDenominator = chooseDenominator();

    if (operation === "compare") {
      const secondDenominator = chooseDenominator();

      const firstNumerator = randomInteger(
        0,
        firstDenominator
      );

      const secondNumerator = randomInteger(
        0,
        secondDenominator
      );

      // Compare exactly without rounding decimal values.
      const left = firstNumerator * secondDenominator;
      const right = secondNumerator * firstDenominator;

      return {
        firstNumerator,
        firstDenominator,
        secondNumerator,
        secondDenominator,
        answer: left < right ? "<" : left > right ? ">" : "=",
        symbol: "?"
      };
    }

    // Both arithmetic fractions use the same denominator.
    const denominator = firstDenominator;

    let firstNumerator;
    let secondNumerator;
    let answer;

    if (operation === "add") {
      firstNumerator = randomInteger(1, denominator - 1);

      secondNumerator = randomInteger(
        1,
        denominator - firstNumerator
      );

      answer = firstNumerator + secondNumerator;
    } else {
      firstNumerator = randomInteger(1, denominator);

      secondNumerator = randomInteger(
        1,
        firstNumerator
      );

      answer = firstNumerator - secondNumerator;
    }

    return {
      firstNumerator,
      firstDenominator: denominator,
      secondNumerator,
      secondDenominator: denominator,
      answer,
      symbol: operation === "add" ? "+" : "−"
    };
  }


  /* INITIALIZE ONE LAB
     -------------------------------------------------------- */

  function initializeLab(lab) {
    const operation = lab.dataset.fractionOperation;
    const mount = lab.querySelector(".fraction-operation-mount");

    if (
      !mount ||
      !["compare", "add", "subtract"].includes(operation)
    ) {
      return;
    }

    const id = `fraction-${operation}`;
    const isComparison = operation === "compare";

    /*
     * This template contains fixed application markup only.
     * Learner answers are handled as values, never as HTML.
     */
    const answerControls = isComparison
      ? `
        <label for="${id}-relation">
          Choose the relationship
        </label>

        <select
          id="${id}-relation"
          aria-describedby="${id}-question ${id}-feedback"
          required
        >
          <option value="">Choose…</option>
          <option value="<">Less than (&lt;)</option>
          <option value="=">Equal to (=)</option>
          <option value=">">Greater than (&gt;)</option>
        </select>
      `
      : `
        <fieldset>
          <legend>Your answer</legend>

          <p>
            Enter a numerator and denominator.
            Equivalent fractions are accepted.
            For a whole number, use denominator 1.
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
      `;

    mount.innerHTML = `
      <div class="fraction-operation-models">
        <div>
          <p data-label="first"></p>

          <div
            class="fraction-bar"
            data-bar="first"
            role="img"
            aria-label="First fraction model"
          ></div>
        </div>

        <div>
          <p data-label="second"></p>

          <div
            class="fraction-bar"
            data-bar="second"
            role="img"
            aria-label="Second fraction model"
          ></div>
        </div>
      </div>

      <form novalidate>
        <p
          id="${id}-question"
          class="fraction-question"
          aria-live="polite"
          aria-atomic="true"
        ></p>

        ${answerControls}

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

      <div class="fraction-result" hidden>
        <p data-result-label></p>

        <div
          class="fraction-bar"
          data-bar="result"
          role="img"
          aria-label="Result model"
        ></div>
      </div>
    `;


    /* LOCAL ELEMENTS AND STATE */

    const form = mount.querySelector("form");
    const question = mount.querySelector(".fraction-question");
    const feedback = mount.querySelector(".fraction-feedback");

    const firstLabel = mount.querySelector('[data-label="first"]');
    const secondLabel = mount.querySelector('[data-label="second"]');

    const firstBar = mount.querySelector('[data-bar="first"]');
    const secondBar = mount.querySelector('[data-bar="second"]');

    const result = mount.querySelector(".fraction-result");
    const resultLabel = mount.querySelector("[data-result-label]");
    const resultBar = mount.querySelector('[data-bar="result"]');

    const controls = [...form.querySelectorAll("input, select")];

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
          challenge.firstNumerator,
          challenge.firstDenominator,
          challenge.secondNumerator,
          challenge.secondDenominator
        ].join("/");
      } while (key === previousKey);

      previousKey = key;

      const first =
        `${challenge.firstNumerator}/` +
        `${challenge.firstDenominator}`;

      const second =
        `${challenge.secondNumerator}/` +
        `${challenge.secondDenominator}`;

      firstLabel.textContent = `First amount: ${first}`;
      secondLabel.textContent = `Second amount: ${second}`;

      drawBar(
        firstBar,
        challenge.firstNumerator,
        challenge.firstDenominator
      );

      drawBar(
        secondBar,
        challenge.secondNumerator,
        challenge.secondDenominator
      );

      question.textContent = isComparison
        ? `${first} ? ${second}`
        : `${first} ${challenge.symbol} ${second} = ?`;

      form.reset();

      controls.forEach(control => {
        control.removeAttribute("aria-invalid");
      });

      result.hidden = true;
      tell("");

      if (moveFocus) {
        controls[0].focus();
      }
    }


    /* HINTS AND EXPLANATIONS */

    function showHint() {
      if (isComparison) {
        tell(
          "Both bars represent the same-sized whole. " +
          "Compare the highlighted lengths, not just " +
          "the number of highlighted pieces."
        );

        return;
      }

      tell(
        operation === "add"
          ? "The pieces are the same size. Add the top numbers " +
            "and keep the bottom number."
          : "The pieces are the same size. Subtract the second " +
            "top number from the first and keep the bottom number."
      );
    }

    function showExplanation() {
      const {
        firstNumerator: a,
        firstDenominator: b,
        secondNumerator: c,
        secondDenominator: d,
        answer
      } = challenge;

      if (isComparison) {
        const commonDenominator = b * d;
        const firstTop = a * d;
        const secondTop = c * b;

        tell(
          `Use a common denominator of ${commonDenominator}. ` +
          `${a}/${b} = ${firstTop}/${commonDenominator}, and ` +
          `${c}/${d} = ${secondTop}/${commonDenominator}. ` +
          `Compare ${firstTop} and ${secondTop}: ` +
          `${a}/${b} ${answer} ${c}/${d}.`
        );

        return;
      }

      const simplified = simplestForm(answer, b);

      tell(
        `Both fractions have denominator ${b}, so the pieces ` +
        `have the same size. ${a} ${challenge.symbol} ${c} ` +
        `= ${answer}. The result is ${answer}/${b}, ` +
        `which is ${simplified} in simplest form.`
      );

      resultLabel.textContent =
        `Result: ${answer}/${b} — simplest form: ${simplified}`;

      drawBar(resultBar, answer, b);
      result.hidden = false;
    }


    /* ANSWER CHECKING */

    function validateNumber(input, minimum, name) {
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

      controls.forEach(control => {
        control.removeAttribute("aria-invalid");
      });

      let correct;

      if (isComparison) {
        const select = controls[0];

        if (!select.value) {
          select.setAttribute("aria-invalid", "true");
          tell("Choose less than, equal to, or greater than.", "retry");
          select.focus();
          return;
        }

        correct = select.value === challenge.answer;
      } else {
        const [numerator, denominator] = controls;

        if (!validateNumber(numerator, 0, "numerator")) {
          return;
        }

        if (!validateNumber(denominator, 1, "denominator")) {
          return;
        }

        // Exact comparison also accepts simplified answers.
        correct =
          numerator.valueAsNumber * challenge.firstDenominator ===
          challenge.answer * denominator.valueAsNumber;
      }

      tell(
        correct
          ? "Correct! Choose Explain to explore why, " +
            "or Next problem to try another."
          : "Not quite. Take another look at the models, " +
            "or choose Hint for a starting point.",
        correct ? "correct" : "retry"
      );
    });


    /* BUTTON AND INPUT EVENTS */

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

    controls.forEach(control => {
      const eventName = control.tagName === "SELECT"
        ? "change"
        : "input";

      control.addEventListener(eventName, () => {
        control.removeAttribute("aria-invalid");
        tell("");
      });
    });

    nextProblem();
  }


  /* START ALL THREE LABS
     -------------------------------------------------------- */

  document
    .querySelectorAll("[data-fraction-operation]")
    .forEach(initializeLab);
})();