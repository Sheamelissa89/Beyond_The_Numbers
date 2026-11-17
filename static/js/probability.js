/* ==========================================================
   PROBABILITY — EXPERIMENTS

   1. Fair coin
   2. Fair six-sided die
   3. Marble draws with replacement

   Each experiment keeps independent counts.
   No dependency on main.js.
   ========================================================== */

(() => {
  "use strict";


  /* SHARED DISPLAY HELPERS
     -------------------------------------------------------- */

  function percent(value) {
    return `${(value * 100).toFixed(1)}%`;
  }

  function countLabel(value) {
    return value.toLocaleString();
  }

  function sum(values) {
    return values.reduce((total, value) => total + value, 0);
  }

  function greatestCommonDivisor(first, second) {
    while (second !== 0) {
      [first, second] = [second, first % second];
    }

    return first;
  }

  function fraction(numerator, denominator) {
    const divisor = greatestCommonDivisor(
      numerator,
      denominator
    );

    return `${numerator / divisor}/${denominator / divisor}`;
  }

  /*
   * Every bar uses the same 0–100% scale.
   * Text provides the full result, so color is not required.
   */
  function renderResults(container, outcomes, counts, probabilities) {
    const total = sum(counts);
    const fragment = document.createDocumentFragment();

    outcomes.forEach((outcome, index) => {
      const observed = total > 0 ? counts[index] / total : 0;

      const item = document.createElement("li");
      item.className = "chance-result";

      const heading = document.createElement("div");
      heading.className = "chance-result-heading";

      const name = document.createElement("strong");
      name.textContent = outcome.name;

      const count = document.createElement("span");
      count.textContent = `${countLabel(counts[index])} outcomes`;

      heading.append(name, count);

      const track = document.createElement("div");
      track.className = "chance-track";
      track.setAttribute("aria-hidden", "true");

      const fill = document.createElement("div");
      fill.className = "chance-fill";
      fill.style.width = `${observed * 100}%`;
      fill.style.backgroundColor = outcome.color;

      track.append(fill);

      const detail = document.createElement("div");
      detail.className = "chance-result-detail";

      const theoretical = probabilities[index] === null
        ? "Unavailable for an empty bag"
        : percent(probabilities[index]);

      const observedText = total > 0
        ? percent(observed)
        : "No trials yet";

      detail.textContent =
        `Theoretical: ${theoretical} · Observed: ${observedText}`;

      item.append(heading, track, detail);
      fragment.append(item);
    });

    container.replaceChildren(fragment);
  }


  /* 1. FAIR COIN
     -------------------------------------------------------- */

  function initializeCoin() {
    const results = document.querySelector("#coin-results");

    if (!results) {
      return;
    }

    const display = document.querySelector("#coin-display");
    const totalLabel = document.querySelector("#coin-total");
    const status = document.querySelector("#coin-status");

    const outcomes = [
      { name: "Heads", color: "#f2cd83" },
      { name: "Tails", color: "#8be3e5" }
    ];

    let counts = [0, 0];

    function update() {
      const total = sum(counts);

      totalLabel.textContent =
        `Total flips: ${countLabel(total)}`;

      renderResults(
        results,
        outcomes,
        counts,
        [0.5, 0.5]
      );
    }

    document
      .querySelectorAll("[data-coin-trials]")
      .forEach(button => {
        button.addEventListener("click", () => {
          const trials = Number(button.dataset.coinTrials);
          let latest;

          for (let index = 0; index < trials; index++) {
            latest = Math.random() < 0.5 ? 0 : 1;
            counts[latest] += 1;
          }

          display.textContent = latest === 0 ? "H" : "T";

          update();

          status.textContent =
            `Added ${countLabel(trials)} ` +
            `${trials === 1 ? "flip" : "flips"}. ` +
            `Last outcome: ${outcomes[latest].name}. ` +
            `Heads: ${countLabel(counts[0])}. ` +
            `Tails: ${countLabel(counts[1])}.`;
        });
      });

    document
      .querySelector("#coin-reset")
      .addEventListener("click", () => {
        counts = [0, 0];
        display.textContent = "?";

        update();

        status.textContent =
          "Coin experiment reset. Make a prediction and try some flips.";
      });

    update();

    status.textContent =
      "Ready to experiment. Each flip has a 50% chance of heads.";
  }


  /* 2. FAIR DIE
     -------------------------------------------------------- */

  function initializeDice() {
    const results = document.querySelector("#dice-results");

    if (!results) {
      return;
    }

    const display = document.querySelector("#dice-display");
    const totalLabel = document.querySelector("#dice-total");
    const status = document.querySelector("#dice-status");
    const eventSelect = document.querySelector("#dice-event");
    const theory = document.querySelector("#dice-event-theory");

    const outcomes = Array.from(
      { length: 6 },
      (_, index) => ({
        name: `Face ${index + 1}`,
        color: index % 2 === 0 ? "#c5b0ff" : "#8be3e5"
      })
    );

    const events = {
      six: {
        name: "rolling a 6",
        faces: [6]
      },

      even: {
        name: "rolling an even number",
        faces: [2, 4, 6]
      },

      high: {
        name: "rolling greater than 4",
        faces: [5, 6]
      }
    };

    let counts = [0, 0, 0, 0, 0, 0];

    function updateEvent(prefix = "") {
      const event = events[eventSelect.value];
      const total = sum(counts);

      const matching = event.faces.reduce(
        (amount, face) => amount + counts[face - 1],
        0
      );

      const probability = event.faces.length / 6;

      theory.textContent =
        `Matching faces: ${event.faces.join(", ")}. ` +
        `Probability of ${event.name}: ` +
        `${fraction(event.faces.length, 6)} ` +
        `(approximately ${percent(probability)}).`;

      status.textContent = total === 0
        ? `${prefix}No rolls yet. Choose an event and begin.`
        : `${prefix}Your event occurred ${countLabel(matching)} ` +
          `times in ${countLabel(total)} rolls: ` +
          `${percent(matching / total)} observed, compared with ` +
          `${percent(probability)} theoretical probability.`;
    }

    function update() {
      totalLabel.textContent =
        `Total rolls: ${countLabel(sum(counts))}`;

      renderResults(
        results,
        outcomes,
        counts,
        Array(6).fill(1 / 6)
      );
    }

    document
      .querySelectorAll("[data-dice-trials]")
      .forEach(button => {
        button.addEventListener("click", () => {
          const trials = Number(button.dataset.diceTrials);
          let latest;

          for (let index = 0; index < trials; index++) {
            latest = Math.floor(Math.random() * 6);
            counts[latest] += 1;
          }

          display.textContent = latest + 1;

          update();

          updateEvent(
            `Added ${countLabel(trials)} ` +
            `${trials === 1 ? "roll" : "rolls"}. ` +
            `Last outcome: ${latest + 1}. `
          );
        });
      });

    eventSelect.addEventListener("change", () => {
      updateEvent();
    });

    document
      .querySelector("#dice-reset")
      .addEventListener("click", () => {
        counts = [0, 0, 0, 0, 0, 0];
        display.textContent = "?";

        update();
        updateEvent("Dice experiment reset. ");
      });

    update();
    updateEvent();
  }


  /* 3. MARBLE BAG
     -------------------------------------------------------- */

  function initializeBag() {
    const preview = document.querySelector("#marble-preview");

    if (!preview) {
      return;
    }

    const results = document.querySelector("#bag-results");
    const totalLabel = document.querySelector("#bag-total");
    const status = document.querySelector("#bag-status");

    const drawButtons = [
      ...document.querySelectorAll("[data-bag-trials]")
    ];

    const colors = [
      { key: "cyan", name: "Cyan", color: "#8be3e5", mark: "●" },
      { key: "gold", name: "Gold", color: "#f2cd83", mark: "★" },
      { key: "violet", name: "Violet", color: "#c5b0ff", mark: "◆" }
    ];

    const sliders = colors.map(color =>
      document.querySelector(`#marbles-${color.key}`)
    );

    let counts = [0, 0, 0];

    function contents() {
      return sliders.map(slider => Number(slider.value));
    }

    function updateResults() {
      const amounts = contents();
      const totalMarbles = sum(amounts);

      const probabilities = amounts.map(amount =>
        totalMarbles === 0 ? null : amount / totalMarbles
      );

      totalLabel.textContent =
        `Marbles in bag: ${totalMarbles} · ` +
        `Total draws: ${countLabel(sum(counts))}`;

      renderResults(
        results,
        colors,
        counts,
        probabilities
      );

      drawButtons.forEach(button => {
        button.disabled = totalMarbles === 0;
      });
    }

    function rebuildBag() {
      const amounts = contents();
      const totalMarbles = sum(amounts);
      const fragment = document.createDocumentFragment();

      // A changed bag starts a new experiment.
      counts = [0, 0, 0];

      colors.forEach((color, index) => {
        document.querySelector(
          `#marbles-${color.key}-value`
        ).textContent = amounts[index];

        for (let marble = 0; marble < amounts[index]; marble++) {
          const item = document.createElement("span");

          item.className = "marble";
          item.style.setProperty("--marble-color", color.color);
          item.textContent = color.mark;
          item.setAttribute("aria-hidden", "true");

          fragment.append(item);
        }
      });

      preview.replaceChildren(fragment);

      preview.setAttribute(
        "aria-label",
        `Bag contains ${amounts[0]} cyan, ${amounts[1]} gold, ` +
        `and ${amounts[2]} violet marbles.`
      );

      updateResults();

      status.textContent = totalMarbles === 0
        ? "The bag is empty. Add at least one marble to begin."
        : "New bag ready. Results reset. " +
          "Predict a color, then draw with replacement.";
    }

    drawButtons.forEach(button => {
      button.addEventListener("click", () => {
        const amounts = contents();
        const totalMarbles = sum(amounts);

        if (totalMarbles === 0) {
          return;
        }

        const trials = Number(button.dataset.bagTrials);
        let latest;

        for (let index = 0; index < trials; index++) {
          // Select one equally likely marble from the full bag.
          const marbleIndex = Math.floor(
            Math.random() * totalMarbles
          );

          if (marbleIndex < amounts[0]) {
            latest = 0;
          } else if (marbleIndex < amounts[0] + amounts[1]) {
            latest = 1;
          } else {
            latest = 2;
          }

          counts[latest] += 1;
        }

        updateResults();

        status.textContent =
          `Added ${countLabel(trials)} ` +
          `${trials === 1 ? "draw" : "draws"} with replacement. ` +
          `Last outcome: ${colors[latest].name}. ` +
          `Cyan: ${countLabel(counts[0])}. ` +
          `Gold: ${countLabel(counts[1])}. ` +
          `Violet: ${countLabel(counts[2])}.`;
      });
    });

    sliders.forEach(slider => {
      slider.addEventListener("input", rebuildBag);
    });

    document
      .querySelector("#bag-reset")
      .addEventListener("click", () => {
        counts = [0, 0, 0];
        updateResults();

        status.textContent = sum(contents()) === 0
          ? "Results reset. Add at least one marble to begin."
          : "Results reset. Your bag contents are unchanged.";
      });

    rebuildBag();
  }


  /* START THE EXPERIMENTS */

  initializeCoin();
  initializeDice();
  initializeBag();
})();