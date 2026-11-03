/* ==========================================================
   MATHEMATICAL CODEX — GLOSSARY DATA

   Edit definitions and add new terms here.

   Each entry needs:
   - id: unique identifier
   - name: displayed title
   - category: quantum, waves, geometry, or cosmos
   - definition: explanation
   - example: a concrete example or exploration prompt
   - related: IDs of other entries in this file

   Keep IDs unchanged when other entries refer to them.
   ========================================================== */

window.Codex = window.Codex || {};


/* CATEGORY LABELS
   ---------------------------------------------------------- */

window.Codex.categories = {
  quantum: "Quantum physics",
  waves: "Waves & sound",
  geometry: "Geometry",
  cosmos: "Cosmos"
};


/* GLOSSARY ENTRIES
   ---------------------------------------------------------- */

window.Codex.terms = [

  /* QUANTUM PHYSICS */

  {
    id: "atom",
    name: "Atom",
    category: "quantum",

    definition:
      "A basic unit of a chemical element. An atom has a nucleus " +
      "containing protons and, usually, neutrons, with electrons " +
      "occupying quantum states around it.",

    example:
      "Hydrogen has one proton. Helium has two. Change the number " +
      "of protons and you change which element you have.",

    related: [
      "isotope",
      "electron",
      "probability"
    ]
  },

  {
    id: "isotope",
    name: "Isotope",
    category: "quantum",

    definition:
      "Atoms of the same element that have different numbers " +
      "of neutrons. They share the same number of protons.",

    example:
      "Carbon-12 has six protons and six neutrons. Carbon-14 " +
      "has six protons and eight neutrons. Both are carbon.",

    related: [
      "atom"
    ]
  },

  {
    id: "electron",
    name: "Electron",
    category: "quantum",

    definition:
      "A negatively charged elementary particle. In an atom, " +
      "electrons occupy quantum states rather than following " +
      "little planetary tracks around the nucleus.",

    example:
      "An electron in an atom can absorb a photon with the right " +
      "energy and move to a higher allowed energy state.",

    related: [
      "atom",
      "photon",
      "probability"
    ]
  },

  {
    id: "probability",
    name: "Probability",
    category: "quantum",

    definition:
      "A measure of how likely an outcome is, from 0 for an " +
      "impossible outcome to 1 for a certain outcome. Quantum " +
      "theory uses probabilities to predict measurement results.",

    example:
      "A fair coin has a probability of 1/2 of landing heads on " +
      "one toss. In an atom, a probability distribution describes " +
      "where an electron might be detected.",

    related: [
      "electron",
      "atom"
    ]
  },

  {
    id: "photon",
    name: "Photon",
    category: "quantum",

    definition:
      "A quantum of electromagnetic radiation. A photon’s energy " +
      "is proportional to its frequency: E = hf, where h is " +
      "Planck’s constant and f is frequency.",

    example:
      "A photon of blue light has more energy than a photon of " +
      "red light because blue light has a higher frequency.",

    related: [
      "frequency",
      "light",
      "electron"
    ]
  },


  /* WAVES AND SOUND */

  {
    id: "frequency",
    name: "Frequency",
    category: "waves",

    definition:
      "The number of complete cycles in one second. Frequency " +
      "is measured in hertz, abbreviated Hz. One hertz means " +
      "one cycle per second.",

    example:
      "A 440 Hz tone completes 440 cycles each second. Compare " +
      "220 Hz and 440 Hz in the wave lab: doubling frequency " +
      "raises a pure tone’s pitch by one octave.",

    related: [
      "wavelength",
      "amplitude",
      "photon",
      "resonance",
      "solfeggio"
    ]
  },

  {
    id: "wavelength",
    name: "Wavelength",
    category: "waves",

    definition:
      "The distance between matching points in neighboring " +
      "wave cycles, such as one crest and the next. For a " +
      "periodic traveling wave, speed = frequency × wavelength.",

    example:
      "When wave speed stays the same, doubling frequency " +
      "halves wavelength. More cycles fit into the same distance.",

    related: [
      "frequency",
      "light"
    ]
  },

  {
    id: "amplitude",
    name: "Amplitude",
    category: "waves",

    definition:
      "The greatest displacement of an oscillating quantity " +
      "from its equilibrium value. On a simple wave graph, " +
      "it is the height from the center line to a crest.",

    example:
      "Raise the amplitude slider in the wave lab. The wave " +
      "becomes taller and the audio signal becomes stronger, " +
      "while its frequency stays the same.",

    related: [
      "frequency",
      "resonance"
    ]
  },

  {
    id: "resonance",
    name: "Resonance",
    category: "waves",

    definition:
      "A strong response that can occur when a system is " +
      "driven near one of its natural frequencies. The size " +
      "of the response also depends on damping.",

    example:
      "Push a playground swing at the right moments and its " +
      "motion can grow. The timing of the pushes matters.",

    related: [
      "frequency",
      "amplitude"
    ]
  },

  {
    id: "solfeggio",
    name: "Solfeggio frequencies",
    category: "waves",

    definition:
      "A label used in modern listening and wellness practices " +
      "for particular sets of tones. This usage is distinct " +
      "from solfège, the musical syllable system using names " +
      "such as do, re, and mi.",

    example:
      "Compare the 396 Hz, 528 Hz, and 639 Hz presets in the " +
      "wave lab. Explore their pitches as ordinary tones; " +
      "the activity does not demonstrate special healing effects.",

    related: [
      "frequency",
      "resonance"
    ]
  },


  /* GEOMETRY */

  {
    id: "symmetry",
    name: "Symmetry",
    category: "geometry",

    definition:
      "A property of a shape or system that stays unchanged " +
      "under a particular transformation, such as reflection " +
      "or rotation.",

    example:
      "Rotate a square a quarter-turn around its center. " +
      "It occupies the same shape and position as before.",

    related: [
      "circle",
      "fractal"
    ]
  },

  {
    id: "circle",
    name: "Circle",
    category: "geometry",

    definition:
      "The set of all points in a plane at the same distance " +
      "from one fixed point, called the center. That distance " +
      "is the radius.",

    example:
      "A circle with radius r has circumference 2πr. " +
      "A point traveling around a circle repeatedly can " +
      "help us visualize cycles and frequency.",

    related: [
      "pi",
      "symmetry",
      "orbit",
      "frequency"
    ]
  },

  {
    id: "pi",
    name: "Pi (π)",
    category: "geometry",

    definition:
      "The ratio of a circle’s circumference to its diameter " +
      "in Euclidean geometry. Its value is approximately " +
      "3.14159, and its decimal expansion never terminates " +
      "or settles into a repeating pattern.",

    example:
      "A circle with diameter 2 units has circumference " +
      "2π units. One complete turn also measures 2π radians, " +
      "which connects circles to wave calculations.",

    related: [
      "circle",
      "frequency"
    ]
  },

  {
    id: "fractal",
    name: "Fractal",
    category: "geometry",

    definition:
      "A mathematical shape with detailed structure at many " +
      "scales. Many familiar fractals repeat similar patterns " +
      "as you zoom in.",

    example:
      "Build a Sierpiński triangle by dividing a triangle into " +
      "four smaller triangles, removing the middle one, and " +
      "repeating the process in each remaining triangle.",

    related: [
      "symmetry"
    ]
  },


  /* COSMOS */

  {
    id: "gravity",
    name: "Gravity",
    category: "cosmos",

    definition:
      "The interaction associated with mass and energy. " +
      "Newton’s model describes attraction between masses; " +
      "general relativity describes gravity through " +
      "the curvature of spacetime.",

    example:
      "Earth’s gravity continually changes the direction " +
      "of the Moon’s motion, helping keep it in orbit " +
      "rather than traveling away in a straight line.",

    related: [
      "orbit",
      "spacetime",
      "light"
    ]
  },

  {
    id: "orbit",
    name: "Orbit",
    category: "cosmos",

    definition:
      "A path an object follows around another under an " +
      "interaction such as gravity. In an ideal Newtonian " +
      "two-body model, bound orbits are ellipses, with " +
      "circles as a special case.",

    example:
      "A satellite in a circular orbit is constantly falling " +
      "toward Earth while moving sideways fast enough " +
      "to keep missing the surface.",

    related: [
      "gravity",
      "circle"
    ]
  },

  {
    id: "light",
    name: "Light",
    category: "cosmos",

    definition:
      "Electromagnetic radiation. Visible light is the portion " +
      "human eyes can detect. Light exhibits both wave " +
      "and particle behavior.",

    example:
      "A prism separates white light into colors because " +
      "different wavelengths bend by different amounts " +
      "as they pass through the material.",

    related: [
      "photon",
      "wavelength",
      "frequency",
      "spacetime",
      "gravity"
    ]
  },

  {
    id: "spacetime",
    name: "Spacetime",
    category: "cosmos",

    definition:
      "The combined framework of three spatial dimensions " +
      "and time used in relativity. An event has both " +
      "a location and a time.",

    example:
      "Describing a flash of light requires saying where " +
      "it happened and when it happened. Together, these " +
      "identify an event in spacetime.",

    related: [
      "gravity",
      "light"
    ]
  }
];


/* CONCEPT MAP CONNECTIONS
   ----------------------------------------------------------
   Each connection contains:
   [first term ID, second term ID, explanation]

   The map layout will use these eight ideas:
   atom, photon, frequency, wavelength,
   light, gravity, orbit, circle
   ---------------------------------------------------------- */

window.Codex.connections = [
  [
    "atom",
    "photon",
    "Atoms can absorb or emit photons when their energy states change."
  ],

  [
    "photon",
    "frequency",
    "A photon’s energy is proportional to its frequency."
  ],

  [
    "frequency",
    "wavelength",
    "At a fixed wave speed, a higher frequency means a shorter wavelength."
  ],

  [
    "wavelength",
    "light",
    "Visible colors correspond to different wavelength ranges."
  ],

  [
    "light",
    "gravity",
    "Gravity can bend the path of light through curved spacetime."
  ],

  [
    "gravity",
    "orbit",
    "Gravity shapes the paths of orbiting bodies."
  ],

  [
    "orbit",
    "circle",
    "A circle is a special case of an elliptical orbit."
  ],

  [
    "circle",
    "frequency",
    "Repeating circular motion has a frequency, measured in revolutions per second."
  ]
];