/* ==========================================================
   FRACTIONS — INTERACTIVE ACTIVITIES

   1. Fraction builder
   2. Equivalent-fraction models
   3. Practice challenges

   This script only controls the fractions page.
   ========================================================== */

(() => {
  "use strict";


  /* PAGE ELEMENTS
     -------------------------------------------------------- */

  const denominatorSelect = document.querySelector("#denominator");
  const piecesContainer = document.querySelector("#fraction-pieces");
  const clearButton = document.querySelector("#clear-parts");
  const fillButton = document.querySelector("#fill-parts");

  const numeratorValue = document.querySelector("#numerator-value");
  const denominatorValue = document.querySelector("#denominator-value");
  const description = document.querySelector("#fraction-description");
  const conversions = document.querySelector("#fraction-conversions");

  const factorSlider = document.querySelector("#equivalence-factor");
  const factorValue = document.querySelector("#factor-value");

  const originalLabel = document.querySelector("#original-label");
  const originalBar = document.querySelector("#original-bar");
  const equivalentLabel = document.querySelector("#equivalent-label");
  const equivalentBar = document.querySelector("#equivalent-bar");
  const equivalenceExplanation = document.querySelector(
    "#equivalence-explanation"
  );

  const practiceModel = document.querySelector("#practice-model");
  const practiceForm = document.querySelector("#fraction-practice-form");
  const numeratorInput = document.querySelector("#answer-numerator");
  const denominatorInput = document.querySelector("#answer-denominator");
  const feedback = document.querySelector("#practice-feedback");
  const hintButton = document.querySelector("#fraction-hint");
  const nextButton = document.querySelector("#next-fraction");

  const requiredElements = [
    denominatorSelect,
    piecesContainer,
    clearButton,
    fillButton,
    numeratorValue,
    denominatorValue,
    description,
    conversions,
    factorSlider,
    factorValue,
    originalLabel,
    originalBar,
    equivalentLabel,
    equivalentBar,
    equivalenceExplanation,
    practiceModel,
    practiceForm,
    numeratorInput,
    denominatorInput,
    feedback,
    hintButton,
    nextButton
  ];

  if (requiredElements.some(element => !element)) {
    return;
  }


  /* STATE AND SMALL HELPERS
     -------------------------------------------------------- */

  let selectedParts = new Set();

  let challenge = {
    numerator: 0,
    denominator: 4
  };

  let previousChallenge = "";
  let hintLevel = 0;

  function getDenominator() {
    return Number(denominatorSelect.value);
  }

  function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function greatestCommonDivisor(first, second) {
    while (second !== 0) {
      [first, second] = [second, first % second];
    }

    return first;
  }

  function formatNumber(value) {
    return value.toLocaleString(undefined, {
      maximumFractionDigits: 3
    });
  }

  function setFeedback(message, state = "") {
    feedback.textContent = message;
    feedback.dataset.state = state;
  }


  /* FRACTION BUILDER
     -------------------------------------------------------- */

  function buildPieceButtons() {
    const denominator = getDenominator();
    const fragment = document.createDocumentFragment();

    // Keep the buttons comfortably sized, with equal widths.
    const columns = denominator <= 6
      ? Math.min(denominator, 3)
      : 4;

    piecesContainer.style.gridTemplateColumns =
      `repeat(${columns}, minmax(0, 1fr))`;

    for (let index = 0; index < denominator; index++) {
      const button = document.createElement("button");

      button.type = "button";
      button.className = "fraction-piece";
      button.dataset.index = String(index);

      button.setAttribute("aria-pressed", "false");

      button.setAttribute(
        "aria-label",
        `Piece ${index + 1}, one of ${denominator} equal parts`
      );

      const mark = document.createElement("span");
      mark.className = "piece-mark";
      mark.setAttribute("aria-hidden", "true");

      const label = document.createElement("span");
      label.textContent = `1/${denominator}`;
      label.setAttribute("aria-hidden", "true");

      button.append(mark, label);
      fragment.append(button);
    }

    piecesContainer.replaceChildren(fragment);
  }

  function updateBuilder() {
    const numerator = selectedParts.size;
    const denominator = getDenominator();
    const value = numerator / denominator;

    piecesContainer
      .querySelectorAll(".fraction-piece")
      .forEach(button => {
        const index = Number(button.dataset.index);
        const selected = selectedParts.has(index);

        button.setAttribute(
          "aria-pressed",
          String(selected)
        );

        button.querySelector(".piece-mark").textContent =
          selected ? "✓" : "○";
      });

    numeratorValue.textContent = numerator;
    denominatorValue.textContent = denominator;

    if (numerator === 0) {
      description.textContent =
        `No parts selected. Your fraction is 0/${denominator}.`;
    } else if (numerator === denominator) {
      description.textContent =
        `${numerator}/${denominator} represents one whole.`;
    } else {
      description.textContent =
        `${numerator} of ${denominator} equal parts selected. ` +
        `Your fraction is ${numerator}/${denominator}.`;
    }

    const divisor = greatestCommonDivisor(numerator, denominator);

    const simplifiedNumerator = numerator / divisor;
    const simplifiedDenominator = denominator / divisor;

    const simplestForm = simplifiedDenominator === 1
      ? String(simplifiedNumerator)
      : `${simplifiedNumerator}/${simplifiedDenominator}`;

    // Explicit approximation signs help with repeating decimals.
    const decimal = Number.isInteger(value * 1000)
      ? `Decimal: ${formatNumber(value)}`
      : `Decimal: ≈ ${formatNumber(value)}`;

    const percent = value * 100;

    const percentage = Number.isInteger(percent * 1000)
      ? `Percentage: ${formatNumber(percent)}%`
      : `Percentage: ≈ ${formatNumber(percent)}%`;

    conversions.textContent =
      `${decimal} · ${percentage} · Simplest form: ${simplestForm}`;

    updateEquivalence();
  }

  piecesContainer.addEventListener("click", event => {
    const button = event.target.closest(".fraction-piece");

    if (!button || !piecesContainer.contains(button)) {
      return;
    }

    const index = Number(button.dataset.index);

    if (selectedParts.has(index)) {
      selectedParts.delete(index);
    } else {
      selectedParts.add(index);
    }

    updateBuilder();
  });

  denominatorSelect.addEventListener("change", () => {
    // Start fresh when the size of each piece changes.
    selectedParts.clear();

    buildPieceButtons();
    updateBuilder();
  });

  clearButton.addEventListener("click", () => {
    selectedParts.clear();
    updateBuilder();
  });

  fillButton.addEventListener("click", () => {
    selectedParts = new Set(
      Array.from(
        { length: getDenominator() },
        (_, index) => index
      )
    );

    updateBuilder();
  });


  /* EQUIVALENT FRACTIONS
     -------------------------------------------------------- */

  function drawBar(container, numerator, denominator) {
    const fragment = document.createDocumentFragment();

    for (let index = 0; index < denominator; index++) {
      const piece = document.createElement("span");

      piece.className = "bar-piece";

      if (index < numerator) {
        piece.classList.add("is-selected");
      }

      // The containing model provides one complete description.
      piece.setAttribute("aria-hidden", "true");

      fragment.append(piece);
    }

    container.replaceChildren(fragment);

    container.setAttribute(
      "aria-label",
      `${numerator} of ${denominator} equal parts highlighted`
    );
  }

  function updateEquivalence() {
    const numerator = selectedParts.size;
    const denominator = getDenominator();
    const factor = Number(factorSlider.value);

    const newNumerator = numerator * factor;
    const newDenominator = denominator * factor;

    factorValue.textContent = factor;

    factorSlider.setAttribute(
      "aria-valuetext",
      `${factor} ${factor === 1 ? "piece" : "pieces"} per original piece`
    );

    originalLabel.textContent =
      `Original: ${numerator}/${denominator}`;

    equivalentLabel.textContent =
      `Equivalent: ${newNumerator}/${newDenominator}`;

    drawBar(originalBar, numerator, denominator);
    drawBar(equivalentBar, newNumerator, newDenominator);

    if (factor === 1) {
      equivalenceExplanation.textContent =
        `${numerator}/${denominator} stays the same when ` +
        "both numbers are multiplied by 1. " +
        "Move the slider to split each piece into smaller parts.";

      return;
    }

    equivalenceExplanation.textContent =
      `${numerator}/${denominator} = ` +
      `${newNumerator}/${newDenominator}. ` +
      `Multiply both numbers by ${factor}: ` +
      `${numerator} × ${factor} = ${newNumerator}, and ` +
      `${denominator} × ${factor} = ${newDenominator}. ` +
      "The pieces get smaller, but the selected amount stays the same.";
  }

  factorSlider.addEventListener("input", updateEquivalence);


  /* PRACTICE CHALLENGES
     -------------------------------------------------------- */

  function createChallenge(moveFocus = false) {
    const denominators = [2, 3, 4, 5, 6, 8, 10, 12];

    let nextChallenge;
    let key;

    do {
      const denominator = denominators[
        randomInteger(0, denominators.length - 1)
      ];

      const numerator = randomInteger(0, denominator);

      nextChallenge = {
        numerator,
        denominator
      };

      key = `${numerator}/${denominator}`;
    } while (key === previousChallenge);

    challenge = nextChallenge;
    previousChallenge = key;
    hintLevel = 0;

    drawBar(
      practiceModel,
      challenge.numerator,
      challenge.denominator
    );

    numeratorInput.value = "";
    denominatorInput.value = "";

    numeratorInput.removeAttribute("aria-invalid");
    denominatorInput.removeAttribute("aria-invalid");

    setFeedback("New challenge ready. What fraction is highlighted?");

    if (moveFocus) {
      numeratorInput.focus();
    }
  }

  function validateInput(input, name, minimum) {
    const value = input.valueAsNumber;

    const valid =
      input.value.trim() !== "" &&
      Number.isInteger(value) &&
      value >= minimum &&
      value <= 12;

    if (!valid) {
      input.setAttribute("aria-invalid", "true");

      setFeedback(
        `Enter a whole-number ${name} from ${minimum} to 12.`,
        "retry"
      );

      input.focus();

      return false;
    }

    input.removeAttribute("aria-invalid");

    return true;
  }

  practiceForm.addEventListener("submit", event => {
    event.preventDefault();

    numeratorInput.removeAttribute("aria-invalid");
    denominatorInput.removeAttribute("aria-invalid");

    if (!validateInput(numeratorInput, "numerator", 0)) {
      return;
    }

    if (!validateInput(denominatorInput, "denominator", 1)) {
      return;
    }

    const numerator = numeratorInput.valueAsNumber;
    const denominator = denominatorInput.valueAsNumber;

    // Cross-multiplication also accepts equivalent answers.
    const equivalent =
      numerator * challenge.denominator ===
      challenge.numerator * denominator;

    if (equivalent) {
      const exact =
        numerator === challenge.numerator &&
        denominator === challenge.denominator;

      const explanation = exact
        ? "You counted the highlighted pieces and all the equal parts."
        : `${numerator}/${denominator} is equivalent to ` +
          `${challenge.numerator}/${challenge.denominator}, ` +
          "the fraction shown by the pieces.";

      setFeedback(
        `Correct! ${explanation} ` +
        "Choose Next challenge when you’re ready.",
        "correct"
      );

      return;
    }

    setFeedback(
      "Not quite. Count the highlighted pieces for the top number " +
      "and all the pieces for the bottom number. " +
      "You can also ask for a hint.",
      "retry"
    );
  });

  hintButton.addEventListener("click", () => {
    hintLevel += 1;

    if (hintLevel === 1) {
      setFeedback(
        `The whole is divided into ${challenge.denominator} ` +
        "equal parts. Use that number as the denominator, " +
        "then count the highlighted pieces."
      );

      return;
    }

    setFeedback(
      `There are ${challenge.numerator} highlighted pieces out of ` +
      `${challenge.denominator} equal parts. ` +
      `The model shows ${challenge.numerator}/${challenge.denominator}.`
    );
  });

  nextButton.addEventListener("click", () => {
    createChallenge(true);
  });

  [numeratorInput, denominatorInput].forEach(input => {
    input.addEventListener("input", () => {
      input.removeAttribute("aria-invalid");
      setFeedback("");
    });
  });


  /* INITIAL DISPLAY
     -------------------------------------------------------- */

  buildPieceButtons();
  updateBuilder();
  createChallenge();
})();