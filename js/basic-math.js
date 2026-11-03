/* ==========================================================
   BASIC MATH — PRACTICE LOGIC

   Each lab owns its own question and feedback.
   No dependency on js/main.js.
   ========================================================== */

(() => {
  "use strict";


  /* PROBLEM GENERATION
     -------------------------------------------------------- */

  function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function makeProblem(operation) {
    const first = randomNumber(1, 12);
    const second = randomNumber(1, 12);

    switch (operation) {
      case "addition":
        return {
          first,
          second,
          symbol: "+",
          answer: first + second
        };

      case "subtraction": {
        const larger = Math.max(first, second);
        const smaller = Math.min(first, second);

        return {
          first: larger,
          second: smaller,
          symbol: "−",
          answer: larger - smaller
        };
      }

      case "multiplication":
        return {
          first,
          second,
          symbol: "×",
          answer: first * second
        };

      case "division":
        return {
          first: first * second,
          second,
          symbol: "÷",
          answer: first
        };

      default:
        return null;
    }
  }


  /* EXPLANATIONS
     -------------------------------------------------------- */

  function explainProblem(operation, problem) {
    const {
      first,
      second,
      answer
    } = problem;

    switch (operation) {
      case "addition":
        return (
          `Start with ${first} and count up ${second} more. ` +
          `${first} + ${second} = ${answer}.`
        );

      case "subtraction":
        return (
          `Start with ${first} and take away ${second}. ` +
          `${answer} remain. Check by adding: ` +
          `${answer} + ${second} = ${first}.`
        );

      case "multiplication": {
        const repeatedAddition = Array(first)
          .fill(second)
          .join(" + ");

        return (
          `${first} × ${second} means ${first} ` +
          `${first === 1 ? "group" : "groups"} of ${second}. ` +
          `${repeatedAddition} = ${answer}.`
        );
      }

      case "division":
        return (
          `Share ${first} among ${second} equal ` +
          `${second === 1 ? "group" : "groups"}. ` +
          `Each group gets ${answer}. Check by multiplying: ` +
          `${second} × ${answer} = ${first}.`
        );
    }
  }

  function getHint(operation, problem) {
    switch (operation) {
      case "addition":
        return (
          `Begin at ${problem.first}. Count forward ` +
          `${problem.second} steps.`
        );

      case "subtraction":
        return (
          `Begin at ${problem.first}. Count back ` +
          `${problem.second} steps.`
        );

      case "multiplication":
        return (
          `Count ${problem.first} equal ` +
          `${problem.first === 1 ? "group" : "groups"} ` +
          `of ${problem.second}. Try repeated addition.`
        );

      case "division":
        return (
          `What number multiplied by ${problem.second} ` +
          `equals ${problem.first}?`
        );
    }
  }


  /* CREATE ONE INDEPENDENT LAB
     -------------------------------------------------------- */

  function initializeLab(lab) {
    const operation = lab.dataset.operation;
    const mount = lab.querySelector(".practice-mount");

    if (!mount || !makeProblem(operation)) {
      return;
    }

    /*
     * This template contains only fixed markup.
     * Learner answers are never inserted as HTML.
     */
    mount.innerHTML = `
      <form class="math-form" novalidate>
        <p
          id="${operation}-problem"
          class="math-problem"
          aria-live="polite"
          aria-atomic="true"
        ></p>

        <label for="${operation}-answer">
          Your answer
        </label>

        <input
          id="${operation}-answer"
          name="answer"
          type="number"
          min="0"
          step="1"
          inputmode="numeric"
          autocomplete="off"
          aria-describedby="${operation}-problem ${operation}-feedback"
          required
        >

        <div class="math-actions">
          <button type="submit">Check answer</button>

          <button type="button" data-action="hint">
            Hint
          </button>

          <button type="button" data-action="explain">
            Explain
          </button>

          <button type="button" data-action="next">
            Next problem
          </button>
        </div>

        <p
          id="${operation}-feedback"
          class="math-feedback"
          role="status"
          aria-atomic="true"
        ></p>
      </form>
    `;

    const form = mount.querySelector("form");
    const question = mount.querySelector(".math-problem");
    const input = mount.querySelector("input");
    const feedback = mount.querySelector(".math-feedback");

    let currentProblem;
    let previousQuestion = "";

    function showFeedback(message, state = "") {
      feedback.textContent = message;
      feedback.dataset.state = state;
    }

    function nextProblem(moveFocus = false) {
      let questionText;

      do {
        currentProblem = makeProblem(operation);

        questionText =
          `${currentProblem.first} ` +
          `${currentProblem.symbol} ` +
          `${currentProblem.second} = ?`;
      } while (questionText === previousQuestion);

      previousQuestion = questionText;
      question.textContent = questionText;

      input.value = "";
      input.removeAttribute("aria-invalid");

      showFeedback("");

      if (moveFocus) {
        input.focus();
      }
    }

    form.addEventListener("submit", event => {
      event.preventDefault();

      const answer = input.valueAsNumber;

      if (
        input.value.trim() === "" ||
        !Number.isFinite(answer) ||
        !Number.isInteger(answer) ||
        answer < 0
      ) {
        input.setAttribute("aria-invalid", "true");

        showFeedback(
          "Enter a whole number of zero or more.",
          "retry"
        );

        input.focus();
        return;
      }

      input.removeAttribute("aria-invalid");

      if (answer === currentProblem.answer) {
        showFeedback(
          "Correct! Choose Next problem when you’re ready.",
          "correct"
        );
      } else {
        showFeedback(
          "Not quite. Try again, or choose Hint for a starting point.",
          "retry"
        );

        input.focus();
        input.select();
      }
    });

    mount
      .querySelector('[data-action="hint"]')
      .addEventListener("click", () => {
        showFeedback(getHint(operation, currentProblem));
      });

    mount
      .querySelector('[data-action="explain"]')
      .addEventListener("click", () => {
        showFeedback(
          explainProblem(operation, currentProblem)
        );
      });

    mount
      .querySelector('[data-action="next"]')
      .addEventListener("click", () => {
        nextProblem(true);
      });

    input.addEventListener("input", () => {
      input.removeAttribute("aria-invalid");
      showFeedback("");
    });

    nextProblem();
  }


  /* START ALL FOUR LABS
     -------------------------------------------------------- */

  document
    .querySelectorAll(".math-lab[data-operation]")
    .forEach(initializeLab);
})();