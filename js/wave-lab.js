/* ==========================================================
   MATHEMATICAL CODEX — WAVE LAB

   Responsibilities:
   - Draw a sine wave over a 0.01-second window
   - Update frequency and relative amplitude
   - Play a matching sine-wave tone
   - Pause animation and reset the lab

   Sound starts only after the visitor selects Play tone.
   ========================================================== */

(() => {
  "use strict";


  /* PAGE ELEMENTS
     -------------------------------------------------------- */

  const canvas = document.querySelector("#wave-canvas");
  const frequency = document.querySelector("#frequency");
  const amplitude = document.querySelector("#amplitude");
  const frequencyValue = document.querySelector("#frequency-value");
  const amplitudeValue = document.querySelector("#amplitude-value");
  const preset = document.querySelector("#preset");
  const playButton = document.querySelector("#play-tone");
  const pauseButton = document.querySelector("#pause-wave");
  const resetButton = document.querySelector("#reset-lab");
  const status = document.querySelector("#lab-status");

  const requiredElements = [
    canvas,
    frequency,
    amplitude,
    frequencyValue,
    amplitudeValue,
    preset,
    playButton,
    pauseButton,
    resetButton,
    status
  ];

  if (requiredElements.some(element => !element)) {
    return;
  }

  const pen = canvas.getContext("2d");


  /* SETTINGS AND STATE
     -------------------------------------------------------- */

  const DEFAULT_FREQUENCY = 220;
  const DEFAULT_AMPLITUDE = 35;

  const TIME_WINDOW = 0.01;

  // Keep the generated signal modest.
  // Actual listening volume still depends on the device.
  const MAX_AUDIO_GAIN = 0.12;

  const motionPreference = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  let animationPaused = motionPreference.matches;
  let animationFrame = null;
  let previousTime = null;
  let phase = 0;

  let audioContext = null;
  let oscillator = null;
  let gainNode = null;
  let soundPlaying = false;
  let soundStarting = false;

  // Invalidates an unfinished audio start when the lab stops.
  let audioRequest = 0;


  /* DRAW THE WAVE
     -------------------------------------------------------- */

  function drawWave() {
    if (!pen) {
      return;
    }

    const width = canvas.width;
    const height = canvas.height;

    const left = 24;
    const right = width - 24;
    const top = 24;
    const bottom = height - 38;

    const graphWidth = right - left;
    const centerY = (top + bottom) / 2;

    const waveHeight =
      ((bottom - top) / 2) *
      0.88 *
      (Number(amplitude.value) / 100);

    const selectedFrequency = Number(frequency.value);

    pen.clearRect(0, 0, width, height);

    // Time grid: ten equal divisions across 0.01 seconds.
    pen.strokeStyle = "rgba(142, 154, 196, 0.18)";
    pen.lineWidth = 1;

    for (let division = 0; division <= 10; division++) {
      const x = left + graphWidth * division / 10;

      pen.beginPath();
      pen.moveTo(x, top);
      pen.lineTo(x, bottom);
      pen.stroke();
    }

    // Equilibrium line.
    pen.strokeStyle = "rgba(185, 190, 213, 0.5)";

    pen.beginPath();
    pen.moveTo(left, centerY);
    pen.lineTo(right, centerY);
    pen.stroke();

    // y = A sin(2πft + phase)
    pen.strokeStyle = "#98e3e5";
    pen.lineWidth = 3;
    pen.lineJoin = "round";
    pen.lineCap = "round";

    pen.beginPath();

    for (let pixel = 0; pixel <= graphWidth; pixel++) {
      const time = TIME_WINDOW * pixel / graphWidth;

      const angle =
        2 * Math.PI * selectedFrequency * time + phase;

      const x = left + pixel;
      const y = centerY - Math.sin(angle) * waveHeight;

      if (pixel === 0) {
        pen.moveTo(x, y);
      } else {
        pen.lineTo(x, y);
      }
    }

    pen.stroke();

    // Time labels.
    pen.fillStyle = "#b9bed5";
    pen.font = "16px system-ui";
    pen.textBaseline = "alphabetic";

    pen.textAlign = "left";
    pen.fillText("0 s", left, height - 12);

    pen.textAlign = "center";
    pen.fillText("0.005 s", width / 2, height - 12);

    pen.textAlign = "right";
    pen.fillText("0.01 s", right, height - 12);
  }


  /* ANIMATION
     --------------------------------------------------------
     The phase moves slowly for inspection. This animation
     does not attempt to display audio oscillation in real time.
     -------------------------------------------------------- */

  function animate(timestamp) {
    animationFrame = null;

    if (animationPaused || document.hidden) {
      previousTime = null;
      return;
    }

    if (previousTime !== null) {
      const elapsedSeconds = Math.min(
        (timestamp - previousTime) / 1000,
        0.05
      );

      phase = (
        phase + elapsedSeconds * 1.8
      ) % (2 * Math.PI);
    }

    previousTime = timestamp;

    drawWave();

    animationFrame = window.requestAnimationFrame(animate);
  }

  function syncAnimation() {
    if (animationFrame !== null) {
      window.cancelAnimationFrame(animationFrame);
    }

    animationFrame = null;
    previousTime = null;

    pauseButton.textContent = animationPaused
      ? "Resume animation"
      : "Pause animation";

    pauseButton.setAttribute(
      "aria-pressed",
      String(animationPaused)
    );

    drawWave();

    if (pen && !animationPaused && !document.hidden) {
      animationFrame = window.requestAnimationFrame(animate);
    }
  }


  /* SOUND HELPERS
     -------------------------------------------------------- */

  function describeSound() {
    if (!soundPlaying) {
      return;
    }

    if (Number(amplitude.value) === 0) {
      status.textContent =
        "Tone playback is on, but amplitude is zero. " +
        "Raise amplitude to hear the tone.";

      return;
    }

    status.textContent =
      `Playing ${frequency.value} Hz at ` +
      `${amplitude.value}% relative amplitude.`;
  }

  function updateAudio() {
    if (!audioContext || !oscillator || !gainNode) {
      return;
    }

    const now = audioContext.currentTime;

    oscillator.frequency.setTargetAtTime(
      Number(frequency.value),
      now,
      0.03
    );

    const targetGain =
      Number(amplitude.value) / 100 * MAX_AUDIO_GAIN;

    gainNode.gain.setTargetAtTime(
      targetGain,
      now,
      0.03
    );
  }

  function stopSound(message = "Sound is off.") {
    audioRequest += 1;
    soundStarting = false;
    soundPlaying = false;

    const oldOscillator = oscillator;
    const oldGain = gainNode;

    oscillator = null;
    gainNode = null;

    if (oldOscillator && oldGain && audioContext) {
      const now = audioContext.currentTime;

      // Fade out briefly to avoid an abrupt click.
      oldGain.gain.cancelScheduledValues(now);
      oldGain.gain.setTargetAtTime(0, now, 0.015);

      oldOscillator.onended = () => {
        oldOscillator.disconnect();
        oldGain.disconnect();
      };

      oldOscillator.stop(now + 0.1);
    }

    playButton.disabled = false;
    playButton.textContent = "Play tone";
    playButton.setAttribute("aria-pressed", "false");

    status.textContent = message;
  }

  async function startSound() {
    if (soundStarting || soundPlaying) {
      return;
    }

    const AudioContextClass =
      window.AudioContext || window.webkitAudioContext;

    if (!AudioContextClass) {
      status.textContent =
        "This browser does not support tone playback. " +
        "You can still explore the visual wave.";

      return;
    }

    const requestId = ++audioRequest;

    soundStarting = true;
    playButton.disabled = true;

    status.textContent = "Starting the tone…";

    try {
      if (
        !audioContext ||
        audioContext.state === "closed"
      ) {
        audioContext = new AudioContextClass();
      }

      await audioContext.resume();

      // A reset, page change, or tab change may have happened
      // while the browser was preparing audio.
      if (requestId !== audioRequest) {
        return;
      }

      if (document.hidden) {
        stopSound();
        return;
      }

      if (audioContext.state !== "running") {
        throw new Error("Audio did not start.");
      }

      oscillator = audioContext.createOscillator();
      gainNode = audioContext.createGain();

      oscillator.type = "sine";
      oscillator.frequency.value = Number(frequency.value);

      gainNode.gain.value = 0;

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.start();

      soundPlaying = true;

      updateAudio();

      playButton.textContent = "Stop tone";
      playButton.setAttribute("aria-pressed", "true");

      describeSound();
    } catch (error) {
      if (requestId === audioRequest) {
        stopSound(
          "Audio could not start. Try Play tone again " +
          "or continue with the visual wave."
        );
      }
    } finally {
      if (requestId === audioRequest) {
        soundStarting = false;
        playButton.disabled = false;
      }
    }
  }


  /* UPDATE CONTROLS AND OUTPUTS
     -------------------------------------------------------- */

  function updateLab() {
    frequencyValue.textContent = `${frequency.value} Hz`;
    amplitudeValue.textContent = `${amplitude.value}%`;

    frequency.setAttribute(
      "aria-valuetext",
      `${frequency.value} hertz`
    );

    amplitude.setAttribute(
      "aria-valuetext",
      `${amplitude.value} percent`
    );

    canvas.setAttribute(
      "aria-label",
      `Sine wave at ${frequency.value} hertz and ` +
      `${amplitude.value} percent relative amplitude, ` +
      "shown across 0.01 seconds."
    );

    updateAudio();
    describeSound();
    drawWave();
  }


  /* CONTROL EVENTS
     -------------------------------------------------------- */

  frequency.addEventListener("input", () => {
    // Manual adjustment clears the preset selection.
    preset.value = "";
    updateLab();
  });

  amplitude.addEventListener("input", updateLab);

  preset.addEventListener("change", () => {
    if (preset.value === "") {
      return;
    }

    frequency.value = preset.value;
    updateLab();
  });

  playButton.addEventListener("click", () => {
    if (soundPlaying) {
      stopSound();
    } else {
      startSound();
    }
  });

  pauseButton.addEventListener("click", () => {
    // Pausing the picture does not stop the tone.
    animationPaused = !animationPaused;
    syncAnimation();
  });

  resetButton.addEventListener("click", () => {
    stopSound(
      "Lab reset. Sound is off. " +
      "Start with a comfortable device volume."
    );

    frequency.value = DEFAULT_FREQUENCY;
    amplitude.value = DEFAULT_AMPLITUDE;
    preset.value = "";

    phase = 0;
    animationPaused = motionPreference.matches;

    updateLab();
    syncAnimation();
  });


  /* PAGE AND ACCESSIBILITY EVENTS
     -------------------------------------------------------- */

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopSound("Sound stopped because the page is hidden.");
    }

    // Audio remains off when the visitor returns.
    syncAnimation();
  });

  window.addEventListener("pagehide", () => {
    stopSound();

    if (animationFrame !== null) {
      window.cancelAnimationFrame(animationFrame);
    }

    animationFrame = null;

    if (audioContext && audioContext.state !== "closed") {
      audioContext.close().catch(() => {
        // The browser may already be closing the audio context.
      });
    }
  });

  window.addEventListener("pageshow", () => {
    syncAnimation();
  });

  function handleMotionPreference(event) {
    animationPaused = event.matches;
    syncAnimation();
  }

  if (typeof motionPreference.addEventListener === "function") {
    motionPreference.addEventListener(
      "change",
      handleMotionPreference
    );
  } else if (typeof motionPreference.addListener === "function") {
    motionPreference.addListener(handleMotionPreference);
  }


  /* INITIAL DISPLAY
     -------------------------------------------------------- */

  if (!pen) {
    pauseButton.disabled = true;

    status.textContent =
      "The wave drawing is unavailable in this browser. " +
      "You can still try the sound controls.";
  }

  updateLab();
  syncAnimation();
})();