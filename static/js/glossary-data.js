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

/* ==========================================================
   BEYOND THE NUMBERS
   MATHEMATICAL CODEX EXPANSION — PART 1

   Paste at the BOTTOM of glossary-data.js.
   Keep all existing entries and connections.
   ========================================================== */

Object.assign(window.Codex.categories, {
  arithmetic: "Arithmetic & Number Sense",
  algebra: "Algebra & Functions",
  trigonometry: "Trigonometry",
  calculus: "Calculus",
  statistics: "Statistics & Probability",
  "number-theory": "Number Theory",
  "linear-algebra": "Linear Algebra",
  "logic-symbols": "Mathematical Symbols & Logic"
});

const codexExpansion1 = [
  // ARITHMETIC
  ["addition", "Addition", "arithmetic",
    "Combining quantities to obtain a total.",
    "7 + 5 = 12."],

  ["subtraction", "Subtraction", "arithmetic",
    "Finding the difference between two quantities.",
    "12 − 5 = 7."],

  ["multiplication", "Multiplication", "arithmetic",
    "Combining equal groups or scaling a quantity.",
    "4 × 3 = 12."],

  ["division", "Division", "arithmetic",
    "Splitting a quantity into equal parts or finding a quotient.",
    "12 ÷ 3 = 4."],

  ["sum", "Sum", "arithmetic",
    "The result of adding two or more numbers.",
    "The sum of 3 and 8 is 11."],

  ["difference", "Difference", "arithmetic",
    "The result of subtracting one number from another.",
    "9 − 4 = 5."],

  ["product", "Product", "arithmetic",
    "The result of multiplying quantities.",
    "6 × 7 = 42."],

  ["quotient", "Quotient", "arithmetic",
    "The result of dividing one quantity by another.",
    "20 ÷ 5 = 4."],

  ["fraction", "Fraction", "arithmetic",
    "A number representing part of a whole or a ratio.",
    "3/4 represents three of four equal parts."],

  ["numerator", "Numerator", "arithmetic",
    "The top number in a fraction.",
    "In 3/5, the numerator is 3."],

  ["denominator", "Denominator", "arithmetic",
    "The bottom number in a fraction.",
    "In 3/5, the denominator is 5."],

  ["decimal", "Decimal", "arithmetic",
    "A base-ten representation using a decimal point.",
    "0.75 = 3/4."],

  ["percentage", "Percentage (%)", "arithmetic",
    "A ratio expressed per hundred.",
    "25% = 25/100 = 0.25."],

  ["ratio", "Ratio", "arithmetic",
    "A comparison of two quantities by division.",
    "A ratio of 2:3 compares two parts to three parts."],

  ["proportion", "Proportion", "arithmetic",
    "An equality between two ratios.",
    "2/3 = 4/6."],

  ["exponent", "Exponent", "arithmetic",
    "A number indicating repeated multiplication of a base when the exponent is a positive integer.",
    "2³ = 2 × 2 × 2 = 8."],

  ["base-exponentiation", "Base (Exponentiation)", "arithmetic",
    "The quantity raised to a power.",
    "In 5², the base is 5."],

  ["square-root", "Square Root (√)", "arithmetic",
    "A number that produces a given value when squared.",
    "√49 = 7 is the principal square root."],

  ["absolute-value-x", "Absolute Value (|x|)", "arithmetic",
    "A real number's distance from zero.",
    "|−8| = 8."],

  ["order-of-operations", "Order of Operations", "arithmetic",
    "Rules determining the sequence of calculations.",
    "2 + 3 × 4 = 14."],

  ["remainder", "Remainder", "arithmetic",
    "The amount left over after whole-number division.",
    "17 ÷ 5 leaves remainder 2."],

  ["rounding", "Rounding", "arithmetic",
    "Replacing a number with a nearby value at a chosen precision.",
    "3.146 rounded to two decimal places is 3.15."],

  // ALGEBRA
  ["variable", "Variable", "algebra",
    "A symbol representing an unknown or changing quantity.",
    "In x + 2 = 7, x = 5."],

  ["constant", "Constant", "algebra",
    "A fixed value within an expression or problem.",
    "In y = 3x + 4, the 4 is constant."],

  ["coefficient", "Coefficient", "algebra",
    "A numerical factor multiplying a variable or expression.",
    "In 7x, the coefficient is 7."],

  ["expression", "Expression", "algebra",
    "A combination of values, variables, and operations.",
    "3x + 2 is an algebraic expression."],

  ["equation", "Equation", "algebra",
    "A statement that two expressions have equal values.",
    "2x + 1 = 9 has solution x = 4."],

  ["inequality", "Inequality", "algebra",
    "A comparison using symbols such as <, >, ≤, or ≥.",
    "x > 3 means x is greater than 3."],

  ["linear-equation", "Linear Equation", "algebra",
    "An equation of degree one.",
    "y = 2x + 1 describes a straight line."],

  ["quadratic-equation", "Quadratic Equation", "algebra",
    "A polynomial equation of degree two.",
    "x² − 5x + 6 = 0 has roots 2 and 3."],

  ["polynomial", "Polynomial", "algebra",
    "A finite sum of terms with nonnegative integer powers of variables.",
    "3x² − 2x + 7."],

  ["monomial", "Monomial", "algebra",
    "A polynomial consisting of one term.",
    "5x³ is a monomial."],

  ["binomial", "Binomial", "algebra",
    "A polynomial consisting of two terms.",
    "x + 4 is a binomial."],

  ["factor", "Factor", "algebra",
    "A number or expression multiplied by another to produce a product.",
    "x + 2 is a factor of x² + 5x + 6."],

  ["factoring", "Factoring", "algebra",
    "Rewriting an expression as a product of factors.",
    "x² − 9 = (x − 3)(x + 3)."],

  ["distributive-property", "Distributive Property", "algebra",
    "Multiplying a sum by a value term by term.",
    "3(a + b) = 3a + 3b."],

  ["commutative-property", "Commutative Property", "algebra",
    "Changing operand order without changing a sum or product.",
    "a + b = b + a."],

  ["associative-property", "Associative Property", "algebra",
    "Changing grouping without changing a sum or product.",
    "(a + b) + c = a + (b + c)."],

  ["function", "Function", "algebra",
    "A rule assigning exactly one output to each input in its domain.",
    "f(x) = x² gives f(3) = 9."],

  ["domain", "Domain", "algebra",
    "The set of allowable inputs of a function.",
    "For f(x) = 1/x over real numbers, x cannot equal zero."],

  ["range", "Range", "algebra",
    "The set of outputs actually attained by a function.",
    "For f(x) = x² over real inputs, the range is [0, ∞)."],

  ["slope", "Slope", "algebra",
    "The rate of vertical change per unit horizontal change.",
    "The line y = 2x + 1 has slope 2."],

  ["intercept", "Intercept", "algebra",
    "A point where a graph crosses a coordinate axis.",
    "y = 2x + 3 crosses the y-axis at (0, 3)."],

  ["system-of-equations", "System of Equations", "algebra",
    "Two or more equations solved simultaneously.",
    "x + y = 5 and x − y = 1 give x = 3, y = 2."],

  ["substitution", "Substitution", "algebra",
    "Replacing a variable or expression with an equal value.",
    "If x = 4, then 2x + 1 = 9."],

  ["elimination", "Elimination", "algebra",
    "Removing a variable by combining equations.",
    "Adding x + y = 5 and x − y = 1 yields 2x = 6."],

  ["inverse-function", "Inverse Function", "algebra",
    "A function that reverses another function on an appropriate domain.",
    "If f(x) = x + 3, then f⁻¹(x) = x − 3."],

  ["composite-function", "Composite Function", "algebra",
    "A function formed by applying one function to another's output.",
    "If f(x) = x² and g(x) = x + 1, then f(g(2)) = 9."],

  ["piecewise-function", "Piecewise Function", "algebra",
    "A function defined by different rules on different portions of its domain.",
    "Absolute value uses x for x ≥ 0 and −x for x < 0."],

  ["arithmetic-sequence", "Arithmetic Sequence", "algebra",
    "A sequence with a constant difference between successive terms.",
    "2, 5, 8, 11 has common difference 3."]
];

/* Convert compact entries into the existing glossary format. */

window.Codex.terms.push(
  ...codexExpansion1.map(
    ([id, name, category, definition, example]) => ({
      id,
      name,
      category,
      definition,
      example,
      related: []
    })
  )
);