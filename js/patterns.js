/* ==========================================================
   PATTERNS — INTERACTIVE ACTIVITIES

   Each activity initializes independently.
   No dependency on main.js.
   ========================================================== */

(() => {
  "use strict";

  function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  /* 1. NUMBER MACHINE
     -------------------------------------------------------- */

  function initializeSequences() {
    const form = document.querySelector("#sequence-form");

    if (!form) {
      return;
    }

    const rule = document.querySelector("#sequence-rule");
    const start = document.querySelector("#sequence-start");
    const step = document.querySelector("#sequence-step");
    const stepLabel = document.querySelector("#sequence-step-label");
    const description = document.querySelector(
      "#sequence-rule-description"
    );

    const list = document.querySelector("#sequence-values");
    const answer = document.querySelector("#sequence-answer");
    const feedback = document.querySelector("#sequence-feedback");

    let numbers = [];

    function tell(message, state = "") {
      feedback.textContent = message;
      feedback.dataset.state = state;
    }

    function updateSequence() {
      answer.value = "";
      answer.removeAttribute("aria-invalid");

      const startingNumber = start.valueAsNumber;

      stepLabel.textContent = rule.value === "add"
        ? "Amount to add"
        : "Amount to multiply by";

      if (
        start.value.trim() === "" ||
        !Number.isInteger(startingNumber) ||
        startingNumber < 1 ||
        startingNumber > 10
      ) {
        numbers = [];
        list.replaceChildren();

        start.setAttribute("aria-invalid", "true");

        description.textContent =
          "Enter a whole-number starting value from 1 to 10.";

        tell("");
        return;
      }

      start.removeAttribute("aria-invalid");

      const amount = Number(step.value);
      numbers = [startingNumber];

      // Store six values; display five and ask for the sixth.
      for (let index = 1; index < 6; index++) {
        const previous = numbers[index - 1];

        numbers.push(
          rule.value === "add"
            ? previous + amount
            : previous * amount
        );
      }

      description.textContent = rule.value === "add"
        ? `Start at ${startingNumber}. Add ${amount} each time.`
        : `Start at ${startingNumber}. Multiply by ${amount} each time.`;

      const fragment = document.createDocumentFragment();

      numbers.slice(0, 5).forEach(number => {
        const item = document.createElement("li");
        item.textContent = number.toLocaleString();
        fragment.append(item);
      });

      list.replaceChildren(fragment);
      tell("");
    }

    function requireSequence() {
      if (numbers.length === 6) {
        return true;
      }

      tell("Choose a starting number from 1 to 10.", "retry");
      start.focus();

      return false;
    }

    form.addEventListener("submit", event => {
      event.preventDefault();

      if (!requireSequence()) {
        return;
      }

      const submitted = answer.valueAsNumber;

      if (
        answer.value.trim() === "" ||
        !Number.isSafeInteger(submitted) ||
        submitted < 0
      ) {
        answer.setAttribute("aria-invalid", "true");

        tell("Enter a whole-number answer of zero or more.", "retry");

        answer.focus();
        return;
      }

      answer.removeAttribute("aria-invalid");

      const correct = submitted === numbers[5];

      tell(
        correct
          ? "Correct! You followed the rule. Change a control " +
            "or choose New challenge to explore another sequence."
          : "Not quite. Apply the chosen rule to the last number. " +
            "Choose Hint if you need a starting point.",
        correct ? "correct" : "retry"
      );
    });

    document
      .querySelector("#sequence-hint")
      .addEventListener("click", () => {
        if (!requireSequence()) {
          return;
        }

        tell(
          rule.value === "add"
            ? `Take ${numbers[4]} and add ${step.value}.`
            : `Take ${numbers[4]} and multiply by ${step.value}.`
        );
      });

    document
      .querySelector("#sequence-explain")
      .addEventListener("click", () => {
        if (!requireSequence()) {
          return;
        }

        const symbol = rule.value === "add" ? "+" : "×";

        tell(
          `The rule is repeated at every step. ` +
          `${numbers[4]} ${symbol} ${step.value} = ${numbers[5]}. ` +
          `So the next number under this rule is ${numbers[5]}.`
        );
      });

    document
      .querySelector("#sequence-random")
      .addEventListener("click", () => {
        const previousSettings = [
          rule.value,
          start.value,
          step.value
        ].join("/");

        let nextSettings;

        do {
          rule.value = Math.random() < 0.5 ? "add" : "multiply";
          start.value = randomInteger(1, 10);
          step.value = randomInteger(2, 5);

          nextSettings = [
            rule.value,
            start.value,
            step.value
          ].join("/");
        } while (nextSettings === previousSettings);

        updateSequence();
        answer.focus();
      });

    rule.addEventListener("change", updateSequence);
    start.addEventListener("input", updateSequence);
    step.addEventListener("change", updateSequence);

    answer.addEventListener("input", () => {
      answer.removeAttribute("aria-invalid");
      tell("");
    });

    updateSequence();
  }


  /* 2. REPEATING SHAPE BUILDER
     -------------------------------------------------------- */

  function initializePatternBuilder() {
    const preview = document.querySelector("#pattern-preview");

    if (!preview) {
      return;
    }

    const choices = [
      ...document.querySelectorAll(".shape-choice")
    ];

    const repeats = document.querySelector("#pattern-repeats");
    const repeatValue = document.querySelector("#pattern-repeat-value");
    const description = document.querySelector("#pattern-description");

    const shapes = {
      star: { symbol: "★", name: "star" },
      circle: { symbol: "●", name: "circle" },
      triangle: { symbol: "▲", name: "triangle" },
      diamond: { symbol: "◆", name: "diamond" }
    };

    const shapeKeys = Object.keys(shapes);

    function findSmallestUnit(unit) {
      for (let length = 1; length <= unit.length; length++) {
        if (unit.length % length !== 0) {
          continue;
        }

        const repeatsExactly = unit.every(
          (shape, index) => shape === unit[index % length]
        );

        if (repeatsExactly) {
          return unit.slice(0, length);
        }
      }

      return unit;
    }

    function updatePattern() {
      const unit = choices.map(choice => choice.value);
      const count = Number(repeats.value);
      const fragment = document.createDocumentFragment();

      repeatValue.textContent = count;

      for (let repetition = 0; repetition < count; repetition++) {
        const group = document.createElement("div");

        group.className = "pattern-unit";
        group.setAttribute("role", "group");
        group.setAttribute(
          "aria-label",
          `Repeating unit ${repetition + 1}`
        );

        unit.forEach(shapeKey => {
          const tile = document.createElement("span");

          tile.className = "pattern-tile";
          tile.dataset.shape = shapeKey;

          tile.setAttribute("role", "img");
          tile.setAttribute("aria-label", shapes[shapeKey].name);

          tile.textContent = shapes[shapeKey].symbol;

          group.append(tile);
        });

        fragment.append(group);
      }

      preview.replaceChildren(fragment);

      const smallest = findSmallestUnit(unit);

      const unitNames = unit
        .map(key => shapes[key].name)
        .join(", ");

      const smallestNames = smallest
        .map(key => shapes[key].name)
        .join(", ");

      description.textContent =
        `Your unit is ${unitNames}. ` +
        `Repeated ${count} times, it makes ${unit.length * count} shapes. ` +
        `The smallest repeating unit is ${smallestNames}.`;
    }

    choices.forEach(choice => {
      choice.addEventListener("change", updatePattern);
    });

    repeats.addEventListener("input", updatePattern);

    document
      .querySelector("#pattern-random")
      .addEventListener("click", () => {
        choices.forEach(choice => {
          choice.value = shapeKeys[
            randomInteger(0, shapeKeys.length - 1)
          ];
        });

        updatePattern();
      });

    document
      .querySelector("#pattern-reset")
      .addEventListener("click", () => {
        const defaults = ["star", "circle", "star", "circle"];

        choices.forEach((choice, index) => {
          choice.value = defaults[index];
        });

        repeats.value = 3;
        updatePattern();
      });

    updatePattern();
  }


  /* 3. SPIRAL OBSERVATORY
     -------------------------------------------------------- */

  function initializeSpiral() {
    const dots = document.querySelector("#spiral-dots");

    if (!dots) {
      return;
    }

    const angle = document.querySelector("#spiral-angle");
    const count = document.querySelector("#spiral-count");

    const angleValue = document.querySelector("#spiral-angle-value");
    const countValue = document.querySelector("#spiral-count-value");

    const description = document.querySelector("#spiral-description");
    const observation = document.querySelector("#spiral-observation");

    const svgNamespace = "http://www.w3.org/2000/svg";

    function updateSpiral() {
      const degrees = Number(angle.value);
      const total = Number(count.value);
      const radians = degrees * Math.PI / 180;

      angleValue.textContent = `${degrees.toFixed(1)}°`;
      countValue.textContent = total;

      angle.setAttribute(
        "aria-valuetext",
        `${degrees.toFixed(1)} degrees`
      );

      const fragment = document.createDocumentFragment();

      for (let index = 0; index < total; index++) {
        // Square-root spacing spreads dots over a disk.
        const radius =
          225 * Math.sqrt(index / Math.max(total - 1, 1));

        const rotation = index * radians;

        const dot = document.createElementNS(
          svgNamespace,
          "circle"
        );

        dot.setAttribute(
          "cx",
          250 + Math.cos(rotation) * radius
        );

        dot.setAttribute(
          "cy",
          250 + Math.sin(rotation) * radius
        );

        dot.setAttribute("r", 3.5);

        const progress = index / total;
        const hue = 38 + progress * 150;

        dot.setAttribute(
          "fill",
          `hsl(${hue}, 80%, 72%)`
        );

        fragment.append(dot);
      }

      dots.replaceChildren(fragment);

      description.textContent =
        `${total} dots arranged with a turning angle of ` +
        `${degrees.toFixed(1)} degrees between successive dots. ` +
        "Each successive dot is farther from the center.";

      if (degrees === 90) {
        observation.textContent =
          "At 90°, four turns complete a full circle. " +
          "Successive dots return to four directions, forming spokes.";
      } else if (degrees === 120) {
        observation.textContent =
          "At 120°, three turns complete a full circle. " +
          "Successive dots return to three directions.";
      } else {
        observation.textContent =
          `Each dot turns ${degrees.toFixed(1)}° from the previous dot. ` +
          "Look for gaps, curved bands, or spokes. " +
          "Try a nearby angle and compare the result.";
      }
    }

    angle.addEventListener("input", updateSpiral);
    count.addEventListener("input", updateSpiral);

    document.querySelectorAll("[data-angle]").forEach(button => {
      button.addEventListener("click", () => {
        angle.value = button.dataset.angle;
        updateSpiral();
      });
    });

    document
      .querySelector("#spiral-reset")
      .addEventListener("click", () => {
        angle.value = 137.5;
        count.value = 180;
        updateSpiral();
      });

    updateSpiral();
  }


  /* START THE ACTIVITIES */

  initializeSequences();
  initializePatternBuilder();
  initializeSpiral();
})();