    const operation = document.querySelector("#operation");
    const example = document.querySelector("#example");
    const problem = document.querySelector("#problem");
    const answer = document.querySelector("#answer");
    const feedback = document.querySelector("#feedback");
    const form = document.querySelector("#practice-form");
    const nextButton = document.querySelector("#next-problem");

    let correctAnswer;
    let previousProblem = "";

    const examples = {
      addition: "Addition combines amounts. Example: 3 + 2 = 5.",
      subtraction: "Subtraction finds what remains. Example: 7 − 3 = 4.",
      multiplication: "Multiplication combines equal groups. Example: 3 × 4 = 12.",
      division: "Division splits an amount into equal groups. Example: 12 ÷ 3 = 4."
    };

    function randomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function createProblem(moveFocus = false) {
      let question;

      do {
        let first = randomNumber(1, 12);
        let second = randomNumber(1, 12);

        switch (operation.value) {
          case "addition":
            correctAnswer = first + second;
            question = `${first} + ${second} = ?`;
            break;

          case "subtraction":
            // Keep subtraction answers at zero or above.
            [first, second] = [
              Math.max(first, second),
              Math.min(first, second)
            ];
            correctAnswer = first - second;
            question = `${first} − ${second} = ?`;
            break;

          case "multiplication":
            correctAnswer = first * second;
            question = `${first} × ${second} = ?`;
            break;

          case "division":
            // Build the dividend from two factors for exact division.
            correctAnswer = first;
            question = `${first * second} ÷ ${second} = ?`;
            break;
        }
      } while (question === previousProblem);

      previousProblem = question;
      example.textContent = examples[operation.value];
      problem.textContent = question;
      answer.value = "";
      answer.removeAttribute("aria-invalid");
      feedback.textContent = "";

      if (moveFocus) {
        answer.focus();
      }
    }

    function explainAnswer() {
  const [first, , second] = problem.textContent.split(" ");
  const a = Number(first);
  const b = Number(second);

  switch (operation.value) {
    case "addition":
      return `Start with ${a} and count up ${b} more.
        ${a} + ${b} = ${correctAnswer}.`;

    case "subtraction":
      return `Start with ${a} and take away ${b}.
        You have ${correctAnswer} left.
        Check it by adding: ${correctAnswer} + ${b} = ${a}.`;

    case "multiplication":
      return `${a} × ${b} means ${a} groups of ${b}.
        ${Array(a).fill(b).join(" + ")} = ${correctAnswer}.`;

    case "division":
      return `Split ${a} into ${b} equal groups.
        Each group has ${correctAnswer}.
        Check it by multiplying: ${b} × ${correctAnswer} = ${a}.`;
  }
}

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const submittedAnswer = answer.valueAsNumber;

      if (answer.value.trim() === "" || !Number.isFinite(submittedAnswer)) {
        feedback.textContent = "Enter a number before checking your answer.";
        answer.setAttribute("aria-invalid", "true");
        answer.focus();
        return;
      }

      if (!Number.isInteger(submittedAnswer)) {
        feedback.textContent = "These problems use whole-number answers. Try again.";
        answer.setAttribute("aria-invalid", "true");
        answer.focus();
        return;
      }

      answer.removeAttribute("aria-invalid");

      if (submittedAnswer === correctAnswer) {
        feedback.textContent = "Correct! Choose Next Problem when you’re ready.";
      } else {
        feedback.textContent = "Not quite. Take another look and try again.";
        answer.focus();
        answer.select();
      }
    });

    operation.addEventListener("change", function () {
      createProblem();
    });

    nextButton.addEventListener("click", function () {
      createProblem(true);
    });

    createProblem();
