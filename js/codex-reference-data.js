/* ==========================================================
   CODEX — MATH REFERENCE DATA

   Each row:
   [unique ID, name, notation, meaning, example]

   Add new rows inside the matching subject.
   No HTML is needed.
   ========================================================== */

window.Codex = window.Codex || {};

(() => {
  const entries = [];

  function add(subject, kind, rows) {
    rows.forEach(([id, name, notation, meaning, example]) => {
      entries.push({
        id,
        name,
        notation,
        meaning,
        example,
        subject,
        kind
      });
    });
  }


  /* ARITHMETIC — TERMS */

  add("Arithmetic", "term", [
    ["addition", "Addition", "+",
      "Combining amounts to find a total.",
      "3 + 2 = 5."],

    ["subtraction", "Subtraction", "−",
      "Finding a difference or taking an amount away.",
      "7 − 3 = 4."],

    ["multiplication", "Multiplication", "×",
      "For whole numbers, combining equal groups. The operation extends to fractions and other numbers.",
      "3 × 4 = 4 + 4 + 4 = 12."],

    ["division", "Division", "÷",
      "Finding how many equal portions fit, or sharing equally. Division by zero is undefined.",
      "12 ÷ 3 = 4."],

    ["sum", "Sum", "a + b",
      "The result of addition.",
      "The sum of 8 and 5 is 13."],

    ["difference", "Difference", "a − b",
      "The result of subtraction.",
      "The difference 9 − 4 is 5."],

    ["product", "Product", "ab",
      "The result of multiplication.",
      "The product of 6 and 3 is 18."],

    ["quotient", "Quotient", "a ÷ b",
      "The result of division.",
      "The quotient of 20 and 4 is 5."],

    ["remainder", "Remainder", "r",
      "The amount left after whole-number division, smaller than the positive divisor.",
      "17 = 3 × 5 + 2, so dividing 17 by 5 gives quotient 3 and remainder 2."],

    ["factor", "Factor", "a × b",
      "A number multiplied by another to make a product. An integer factor divides a whole number exactly.",
      "3 and 4 are factors of 12."],

    ["multiple", "Multiple", "kn",
      "A number obtained by multiplying a given number by an integer.",
      "5, 10, and 15 are multiples of 5."],

    ["prime", "Prime number", "",
      "An integer greater than 1 with exactly two positive factors: 1 and itself.",
      "2, 3, 5, and 7 are prime; 1 is not."],

    ["composite", "Composite number", "",
      "An integer greater than 1 with more than two positive factors.",
      "12 is composite because it has factors besides 1 and 12."],

    ["integer", "Integer", "ℤ",
      "A whole-number value, positive, negative, or zero.",
      "−3, 0, and 12 are integers."],

    ["rational", "Rational number", "a/b",
      "A number expressible as a ratio of integers with nonzero denominator.",
      "3/4, −2, and 0.5 are rational."],

    ["irrational", "Irrational number", "",
      "A real number that cannot be written as a ratio of integers.",
      "√2 and π are irrational."],

    ["real", "Real number", "ℝ",
      "A number represented by a point on the real number line.",
      "Integers, fractions, and √2 are real numbers."],

    ["absolute", "Absolute value", "|x|",
      "For a real number, its distance from zero on the number line.",
      "|−5| = 5."],

    ["exponent", "Exponent", "aⁿ",
      "For a positive integer exponent, the number of equal factors of the base.",
      "2³ = 2 × 2 × 2 = 8."],

    ["square-root", "Square root", "√x",
      "The principal square root is the nonnegative number whose square is x, for x ≥ 0.",
      "√25 = 5, while x² = 25 has solutions 5 and −5."],

    ["order", "Order of operations", "( )",
      "Evaluate grouping first, then powers, then multiplication/division left to right, then addition/subtraction left to right.",
      "2 + 3 × 4 = 14, while (2 + 3) × 4 = 20."],

    ["gcd", "Greatest common divisor", "gcd",
      "The greatest positive integer that divides each of two or more integers, not all zero.",
      "gcd(12, 18) = 6."],

    ["lcm", "Least common multiple", "lcm",
      "The smallest positive integer divisible by each of the given positive integers.",
      "lcm(4, 6) = 12."]
  ]);


  /* FRACTIONS AND RATIOS — TERMS */

  add("Fractions & ratios", "term", [
    ["fraction", "Fraction", "a/b",
      "A numerator divided by a nonzero denominator. A fraction can describe part of a whole, a ratio, or a quotient.",
      "3/4 means 3 ÷ 4 and can represent three of four equal parts."],

    ["numerator", "Numerator", "a in a/b",
      "The top number of a fraction.",
      "In 3/5, the numerator is 3."],

    ["denominator", "Denominator", "b in a/b",
      "The nonzero bottom number of a fraction. In a part-whole model, it counts equal parts in one whole.",
      "In 3/5, the whole is divided into 5 equal parts."],

    ["equivalent", "Equivalent fractions", "a/b = c/d",
      "Different fraction expressions with the same numerical value.",
      "1/2 = 2/4 = 3/6."],

    ["simplify", "Simplest form", "",
      "A fraction form whose integer numerator and positive denominator share no factor greater than 1.",
      "6/8 simplifies to 3/4."],

    ["proper", "Proper fraction", "",
      "For positive fractions, a numerator smaller than the denominator.",
      "3/4 is less than one."],

    ["improper", "Improper fraction", "",
      "For nonnegative fractions, a numerator greater than or equal to the positive denominator.",
      "7/4 is greater than one."],

    ["mixed", "Mixed number", "1 3/4",
      "A whole-number part together with a proper fraction.",
      "1 3/4 = 7/4."],

    ["reciprocal", "Reciprocal", "1/x",
      "The number that multiplies a nonzero number to give 1.",
      "The reciprocal of 3/4 is 4/3. Zero has no reciprocal."],

    ["decimal", "Decimal", "0.75",
      "Base-ten notation using place values such as tenths and hundredths.",
      "0.75 = 75/100 = 3/4."],

    ["percent", "Percentage", "%",
      "An amount expressed per hundred.",
      "25% = 25/100 = 1/4."],

    ["ratio", "Ratio", "a:b",
      "A comparison of quantities by division, with a nonzero second quantity when interpreted as a quotient.",
      "A ratio of 2 red marbles to 3 blue is 2:3; red is 2/5 of the total."],

    ["proportion", "Proportion", "a/b = c/d",
      "A statement that two ratios are equal.",
      "2/3 = 4/6."],

    ["rate", "Rate", "",
      "A ratio comparing quantities, often with different units.",
      "120 kilometers in 2 hours gives an average speed of 60 km/h."]
  ]);


  /* ALGEBRA — TERMS */

  add("Algebra", "term", [
    ["variable", "Variable", "x",
      "A symbol representing a value that can vary or is not yet specified.",
      "In x + 3 = 8, x is the unknown value."],

    ["constant", "Constant", "",
      "A value fixed in the context being considered.",
      "In y = 2x + 5, the constant term is 5."],

    ["coefficient", "Coefficient", "3 in 3x",
      "A factor multiplying a variable or variable expression.",
      "In 3x, the coefficient of x is 3."],

    ["expression", "Expression", "2x + 3",
      "A mathematical phrase representing a value, without asserting an equality.",
      "2x + 3 has value 11 when x = 4."],

    ["equation", "Equation", "=",
      "A statement that two expressions have equal values.",
      "x + 3 = 8 has solution x = 5."],

    ["inequality", "Inequality", "<, >, ≤, ≥",
      "A comparison using an order relationship.",
      "x > 3 means x is greater than 3."],

    ["solution", "Solution", "",
      "A value or collection of values that makes a mathematical statement true.",
      "x = 4 solves 2x = 8."],

    ["function", "Function", "f(x)",
      "A rule assigning exactly one output to each input in its domain.",
      "For f(x) = x², f(3) = 9."],

    ["domain", "Domain", "",
      "The set of allowed inputs of a function.",
      "For the real-valued function f(x) = 1/x, x cannot be 0."],

    ["range", "Range of a function", "",
      "The set of outputs a function actually produces.",
      "For f(x) = x² on the real numbers, the range is all nonnegative real numbers."],

    ["slope", "Slope", "m",
      "For a nonvertical line, change in y divided by change in x.",
      "For y = 2x + 1, the slope is 2."],

    ["linear", "Linear equation", "y = mx + b",
      "An equation describing a straight line; this form describes nonvertical lines.",
      "y = 3x − 2 is a straight line."],

    ["quadratic", "Quadratic", "ax² + bx + c",
      "A degree-two polynomial expression, with a ≠ 0.",
      "y = x² is a parabola."],

    ["polynomial", "Polynomial", "",
      "A finite sum of terms with coefficients and nonnegative integer powers of variables.",
      "3x² + 2x − 7 is a polynomial."],

    ["logarithm", "Logarithm", "log_b(x)",
      "The exponent to which b must be raised to obtain x; over the reals, b > 0, b ≠ 1, and x > 0.",
      "log₂(8) = 3 because 2³ = 8."],

    ["sequence", "Sequence", "aₙ",
      "An ordered list of terms, usually indexed by integers.",
      "2, 5, 8, 11 follows the rule add 3."]
  ]);


  /* GEOMETRY — TERMS */

  add("Geometry", "term", [
    ["point", "Point", "",
      "An exact location with no length, width, or height.",
      "A point can be located by coordinates such as (2, 3)."],

    ["line", "Line", "",
      "A straight one-dimensional object extending indefinitely in both directions.",
      "Two distinct points determine one line in Euclidean geometry."],

    ["segment", "Line segment", "",
      "The part of a line between two endpoints, including the endpoints.",
      "A side of a triangle is a line segment."],

    ["ray", "Ray", "",
      "Part of a line beginning at an endpoint and extending indefinitely in one direction.",
      "Two rays with a common endpoint can define an angle."],

    ["angle", "Angle", "∠",
      "A measure of turn between rays sharing an endpoint.",
      "A right angle measures 90°."],

    ["perimeter", "Perimeter", "P",
      "The total length of the boundary of a plane figure.",
      "A 3 by 4 rectangle has perimeter 3 + 4 + 3 + 4 = 14 units."],

    ["area", "Area", "A",
      "A measure of a two-dimensional region, expressed in square units.",
      "A 3 by 4 rectangle has area 3 × 4 = 12 square units."],

    ["volume", "Volume", "V",
      "A measure of three-dimensional space occupied, expressed in cubic units.",
      "A 2 by 3 by 4 rectangular box has volume 24 cubic units."],

    ["triangle", "Triangle", "",
      "A polygon with three sides. Its interior angles total 180° in Euclidean geometry.",
      "A triangle with base 6 and perpendicular height 4 has area 12."],

    ["rectangle", "Rectangle", "",
      "A quadrilateral with four right angles; squares are special rectangles.",
      "Area = width × height."],

    ["square", "Square", "",
      "A quadrilateral with four equal sides and four right angles.",
      "A square with side 5 has area 25 and perimeter 20."],

    ["circle-math", "Circle", "",
      "All points in a plane at one fixed distance from a center.",
      "A circle of radius 2 has circumference 4π."],

    ["radius", "Radius", "r",
      "The distance from the center of a circle to its circumference.",
      "A radius is half the diameter."],

    ["diameter", "Diameter", "d = 2r",
      "A segment through a circle’s center joining two points on the circle, or its length.",
      "A circle with radius 3 has diameter 6."],

    ["circumference", "Circumference", "C = 2πr",
      "The distance around a circle.",
      "For radius 1, the circumference is 2π."],

    ["pi-math", "Pi", "π",
      "The ratio of a Euclidean circle’s circumference to its diameter, approximately 3.14159.",
      "C = πd."],

    ["parallel", "Parallel lines", "∥",
      "Distinct coplanar lines that never meet.",
      "Opposite sides of a rectangle lie on parallel lines."],

    ["perpendicular", "Perpendicular lines", "⊥",
      "Lines that intersect at a right angle.",
      "The coordinate axes are perpendicular."],

    ["symmetry-math", "Symmetry", "",
      "A property of a figure preserved by a transformation.",
      "A square matches itself after a 90° rotation about its center."],

    ["reflection", "Reflection", "",
      "A transformation that mirrors points across a line in the plane.",
      "Reflection across the y-axis maps (2, 3) to (−2, 3)."],

    ["rotation", "Rotation", "",
      "A transformation turning a figure about a fixed center by a specified angle.",
      "A 180° turn about the origin maps (2, 3) to (−2, −3)."],

    ["translation", "Translation", "",
      "A transformation moving every point by the same displacement.",
      "Move every point 3 units right and 2 units up."],

    ["congruent", "Congruent figures", "≅",
      "Figures with the same shape and size, related by distance-preserving transformations.",
      "Two triangles with matching corresponding side lengths are congruent."],

    ["similar", "Similar figures", "∼",
      "Figures with the same shape, with corresponding lengths related by one scale factor.",
      "Squares of sides 2 and 6 are similar with scale factor 3."]
  ]);


  /* TRIGONOMETRY — TERMS */

  add("Trigonometry", "term", [
    ["sine", "Sine", "sin θ",
      "In a right triangle, opposite side divided by hypotenuse for an acute angle θ.",
      "sin 30° = 1/2."],

    ["cosine", "Cosine", "cos θ",
      "In a right triangle, adjacent side divided by hypotenuse for an acute angle θ.",
      "cos 60° = 1/2."],

    ["tangent", "Tangent function", "tan θ",
      "The ratio sin θ / cos θ where cos θ ≠ 0; opposite over adjacent in a right triangle.",
      "tan 45° = 1."],

    ["radian", "Radian", "rad",
      "An angle unit defined by arc length divided by circle radius.",
      "A full turn is 2π radians, equal to 360°."],

    ["unit-circle", "Unit circle", "x² + y² = 1",
      "A circle of radius 1 centered at the origin; angle θ locates the point (cos θ, sin θ).",
      "At 90°, the point is (0, 1)."],

    ["pythagoras", "Pythagorean theorem", "a² + b² = c²",
      "In a right triangle, the square of the hypotenuse equals the sum of the squares of the legs.",
      "3² + 4² = 5²."]
  ]);


  /* CALCULUS — TERMS */

  add("Calculus", "term", [
    ["limit", "Limit", "lim",
      "A value a function or sequence approaches as its input or index approaches a specified value or infinity.",
      "As x approaches 2, x² approaches 4."],

    ["derivative", "Derivative", "f′(x)",
      "An instantaneous rate of change, defined by a limit when that limit exists.",
      "For f(x) = x², f′(x) = 2x."],

    ["integral", "Definite integral", "∫_a^b f(x) dx",
      "A measure of accumulated signed area or change over an interval, when the integral exists.",
      "The integral of 2 from 0 to 3 is 6."],

    ["antiderivative", "Antiderivative", "F′ = f",
      "A function whose derivative is the given function.",
      "x² is an antiderivative of 2x."],

    ["continuous", "Continuity", "",
      "At a point, the function’s limit equals its value; informally, there is no break there.",
      "f(x) = x² is continuous for all real x."],

    ["tangent-line", "Tangent line", "",
      "For a differentiable function, the line through a point on its graph with slope equal to the derivative there.",
      "The tangent to y = x² at x = 1 is y = 2x − 1."]
  ]);


  /* SETS AND LOGIC — TERMS */

  add("Sets & logic", "term", [
    ["set", "Set", "{ }",
      "A collection of distinct objects, called elements.",
      "{1, 2, 3} is a set with three elements."],

    ["subset", "Subset", "⊆",
      "A set whose every element also belongs to another set.",
      "{1, 2} ⊆ {1, 2, 3}."],

    ["union", "Union", "∪",
      "Elements belonging to either set or both.",
      "{1, 2} ∪ {2, 3} = {1, 2, 3}."],

    ["intersection", "Intersection", "∩",
      "Elements common to both sets.",
      "{1, 2} ∩ {2, 3} = {2}."],

    ["empty", "Empty set", "∅",
      "The set containing no elements.",
      "The set of real solutions to x² = −1 is empty."],

    ["implication", "Implication", "⇒",
      "An if-then relationship between statements.",
      "x > 2 ⇒ x > 1."],

    ["converse", "Converse", "",
      "The implication formed by exchanging the hypothesis and conclusion.",
      "The converse of “square ⇒ rectangle” is “rectangle ⇒ square,” which is false."]
  ]);


  /* STATISTICS AND PROBABILITY — TERMS */

  add("Statistics & probability", "term", [
    ["probability-math", "Probability", "P(A)",
      "A measure from 0 to 1 of how likely an event is under a specified model.",
      "For a fair six-sided die, P(rolling 6) = 1/6."],

    ["outcome", "Outcome", "",
      "One possible result of an experiment.",
      "Rolling a 4 is an outcome of a die roll."],

    ["sample-space", "Sample space", "Ω",
      "The set of all possible outcomes in a model.",
      "For one coin flip: {heads, tails}."],

    ["event", "Event", "A",
      "A collection of outcomes from the sample space.",
      "Rolling even is the event {2, 4, 6}."],

    ["independent", "Independent events", "P(A ∩ B) = P(A)P(B)",
      "Events whose joint probability equals the product of their probabilities.",
      "In a model of independent fair flips, one flip does not change the next flip’s probabilities."],

    ["conditional", "Conditional probability", "P(A | B)",
      "The probability of A given B, defined when P(B) > 0.",
      "Given an even roll on a fair die, the probability of a 6 is 1/3."],

    ["mean", "Arithmetic mean", "x̄",
      "The sum of numerical data values divided by the number of values.",
      "The mean of 2, 4, and 9 is 5."],

    ["median", "Median", "",
      "The middle ordered value, or the mean of the two middle values for an even-sized numerical data set.",
      "The median of 2, 4, and 9 is 4."],

    ["mode", "Mode", "",
      "A value occurring most frequently; a data set may have more than one mode.",
      "In 2, 2, 3, 5, the mode is 2."],

    ["data-range", "Range of data", "max − min",
      "The maximum data value minus the minimum.",
      "For 2, 4, 9, the range is 7."],

    ["variance", "Variance", "σ²",
      "A measure of spread. Population variance is the mean squared distance from the population mean.",
      "For the population {1, 3}, the mean is 2 and variance is 1."],

    ["standard-deviation", "Standard deviation", "σ",
      "The nonnegative square root of variance, in the original data units.",
      "A population variance of 9 gives standard deviation 3."],

    ["expected-value", "Expected value", "E(X)",
      "For a finite discrete distribution, the sum of each possible value times its probability.",
      "A fair die has expected value 3.5, even though no face shows 3.5."]
  ]);


  /* ADVANCED FOUNDATIONS — TERMS */

  add("Advanced foundations", "term", [
    ["vector", "Vector", "v",
      "An object that can represent magnitude and direction; coordinate vectors are ordered lists of components.",
      "The vector (3, 4) has length 5."],

    ["matrix", "Matrix", "",
      "A rectangular array of entries used in transformations, equations, and data.",
      "A 2 × 3 matrix has two rows and three columns."],

    ["complex", "Complex number", "a + bi",
      "A number with real components a and b, where i² = −1.",
      "3 + 2i is a complex number."],

    ["factorial", "Factorial", "n!",
      "For a positive integer n, the product of integers from 1 through n; 0! = 1.",
      "4! = 4 × 3 × 2 × 1 = 24."],

    ["permutation", "Permutation", "",
      "An ordered arrangement. The ordering matters.",
      "ABC and BAC are different arrangements."],

    ["combination", "Combination", "n choose r",
      "A selection without regard to order.",
      "Choosing A and B is the same selection as choosing B and A."],

    ["infinity", "Infinity", "∞",
      "A concept describing unboundedness, not an ordinary real number.",
      "The positive integers have no largest member."]
  ]);


  /* ARITHMETIC — SYMBOLS */

  add("Arithmetic", "symbol", [
    ["s-plus", "Plus", "+",
      "Addition; also used as a positive sign.",
      "4 + 3 = 7."],

    ["s-minus", "Minus", "−",
      "Subtraction or a negative sign, depending on position.",
      "7 − 2 = 5; −2 is negative two."],

    ["s-times", "Times", "×, ·",
      "Multiplication in elementary arithmetic; the dot can have other meanings in advanced contexts.",
      "3 × 4 = 3 · 4 = 12."],

    ["s-divide", "Divided by", "÷, /",
      "Division, with a nonzero divisor.",
      "8 ÷ 2 = 8/2 = 4."],

    ["s-equal", "Equals", "=",
      "Both sides have the same value.",
      "2 + 3 = 5."],

    ["s-not-equal", "Not equal", "≠",
      "The values are different.",
      "3 ≠ 4."],

    ["s-approx", "Approximately equal", "≈",
      "Values are close at the stated precision, rather than exactly equal.",
      "π ≈ 3.14159."],

    ["s-plus-minus", "Plus or minus", "±",
      "Represents both a plus case and a minus case.",
      "x = ±3 means x = 3 or x = −3."],

    ["s-root", "Radical sign", "√",
      "The principal square root; other root indices may be written on the radical.",
      "√9 = 3."],

    ["s-abs", "Absolute-value bars", "|x|",
      "Absolute value in this context; bars have other uses.",
      "|−7| = 7."],

    ["s-factorial", "Factorial sign", "!",
      "Factorial when written after a nonnegative integer.",
      "5! = 120."]
  ]);


  /* FRACTIONS AND RATIOS — SYMBOLS */

  add("Fractions & ratios", "symbol", [
    ["s-percent", "Percent sign", "%",
      "Per hundred.",
      "40% = 40/100."],

    ["s-colon", "Ratio colon", ":",
      "Separates quantities in a ratio; colons also have other mathematical uses.",
      "2:3 means a ratio of two to three."],

    ["s-fraction", "Fraction bar", "a/b",
      "Separates numerator and denominator and denotes division.",
      "(2 + 4)/3 = 2."]
  ]);


  /* ALGEBRA — SYMBOLS */

  add("Algebra", "symbol", [
    ["s-less", "Less than", "<",
      "The left value is smaller than the right value.",
      "2 < 5."],

    ["s-greater", "Greater than", ">",
      "The left value is larger than the right value.",
      "8 > 3."],

    ["s-le", "Less than or equal to", "≤",
      "The left value is smaller than or equal to the right.",
      "x ≤ 4 includes x = 4."],

    ["s-ge", "Greater than or equal to", "≥",
      "The left value is larger than or equal to the right.",
      "x ≥ 0 includes zero."],

    ["s-proportional", "Proportional to", "∝",
      "One quantity equals a constant times another in the stated relationship.",
      "y ∝ x means y = kx for a constant k."],

    ["s-function", "Function notation", "f(x)",
      "The output of function f at input x; not generally multiplication.",
      "If f(x) = x + 2, then f(3) = 5."],

    ["s-sigma", "Summation", "Σ, ∑",
      "A capital sigma operator adds terms over specified indices.",
      "∑ from k = 1 to 3 of k means 1 + 2 + 3."],

    ["s-product", "Product notation", "Π, ∏",
      "A capital pi operator multiplies terms over specified indices.",
      "∏ from k = 1 to 3 of k means 1 × 2 × 3."]
  ]);


  /* GEOMETRY — SYMBOLS */

  add("Geometry", "symbol", [
    ["s-angle", "Angle symbol", "∠",
      "Names an angle.",
      "∠ABC has vertex B."],

    ["s-degree", "Degree sign", "°",
      "An angle unit equal to 1/360 of a full turn.",
      "A right angle is 90°."],

    ["s-parallel", "Parallel symbol", "∥",
      "Indicates parallel lines in geometry.",
      "AB ∥ CD."],

    ["s-perp", "Perpendicular symbol", "⊥",
      "Indicates a right-angle intersection.",
      "The x-axis ⊥ the y-axis."],

    ["s-congruent", "Congruence symbol", "≅",
      "Indicates congruent figures in elementary geometry.",
      "Congruent triangles have matching corresponding sides and angles."],

    ["s-similar", "Similarity symbol", "∼",
      "Indicates similar figures in geometry; has other meanings in other subjects.",
      "Similar triangles have proportional corresponding side lengths."],

    ["s-pi", "Lowercase pi", "π",
      "Usually the circle constant in elementary geometry.",
      "Circle area = πr²."]
  ]);


  /* SETS AND LOGIC — SYMBOLS */

  add("Sets & logic", "symbol", [
    ["s-member", "Element of", "∈",
      "An object belongs to a set.",
      "2 ∈ {1, 2, 3}."],

    ["s-not-member", "Not an element of", "∉",
      "An object does not belong to a set.",
      "4 ∉ {1, 2, 3}."],

    ["s-subset", "Subset or equal", "⊆",
      "Every element of the left set belongs to the right set.",
      "{1, 2} ⊆ {1, 2, 3}."],

    ["s-union", "Union symbol", "∪",
      "Elements in either set, including elements in both.",
      "{1} ∪ {2} = {1, 2}."],

    ["s-intersection", "Intersection symbol", "∩",
      "Elements shared by both sets.",
      "{1, 2} ∩ {2, 3} = {2}."],

    ["s-empty", "Empty-set symbol", "∅",
      "A set with no elements, different from the number zero.",
      "∅ has zero elements; {0} has one."],

    ["s-forall", "For all", "∀",
      "A statement applies to every element in a stated domain.",
      "For every real x, x² ≥ 0."],

    ["s-exists", "There exists", "∃",
      "At least one element in a stated domain satisfies the condition.",
      "There exists an integer x with x + 1 = 3."],

    ["s-implies", "Implies", "⇒",
      "If the left statement is true, the right follows.",
      "x = 3 ⇒ x² = 9."],

    ["s-iff", "If and only if", "⇔",
      "Both directions of implication hold.",
      "For real x, x² = 0 ⇔ x = 0."],

    ["s-and", "Logical and", "∧",
      "Both statements must be true.",
      "x > 0 ∧ x < 3 means both inequalities hold."],

    ["s-or", "Logical or", "∨",
      "At least one statement is true; includes the case where both are true.",
      "x = 1 ∨ x = 2."],

    ["s-not", "Logical not", "¬",
      "Negates a statement.",
      "¬(x = 0) means x ≠ 0."],

    ["s-integers", "Integer set", "ℤ",
      "The set of integers.",
      "−2 ∈ ℤ."],

    ["s-rationals", "Rational set", "ℚ",
      "The set of rational numbers.",
      "3/5 ∈ ℚ."],

    ["s-reals", "Real set", "ℝ",
      "The set of real numbers.",
      "√2 ∈ ℝ."],

    ["s-naturals", "Natural-number set", "ℕ",
      "The natural numbers; authors differ on whether zero is included.",
      "Check whether a source uses {1, 2, 3, …} or {0, 1, 2, …}."]
  ]);


  /* CALCULUS — SYMBOLS */

  add("Calculus", "symbol", [
    ["s-infinity", "Infinity symbol", "∞",
      "Indicates unbounded behavior in limits and other contexts; not an ordinary real number.",
      "x → ∞ means x grows without bound."],

    ["s-integral", "Integral sign", "∫",
      "Denotes integration; bounds distinguish definite integrals.",
      "∫ from 0 to 1 of 1 dx = 1."],

    ["s-prime", "Derivative prime", "f′(x)",
      "Common notation for the first derivative of f.",
      "If f(x) = x², f′(x) = 2x."],

    ["s-leibniz", "Derivative notation", "dy/dx",
      "The derivative of y with respect to x; its notation should not automatically be treated as an ordinary fraction.",
      "For y = x³, dy/dx = 3x²."],

    ["s-partial", "Partial derivative", "∂",
      "Differentiation with respect to one variable while holding other independent variables fixed.",
      "For f(x, y) = x² + y, ∂f/∂x = 2x."],

    ["s-delta", "Capital delta", "Δ",
      "Often denotes a finite change in a quantity.",
      "Δx = final x − initial x."],

    ["s-arrow", "Approaches", "→",
      "In a limit, indicates approaching a value; arrows have other meanings elsewhere.",
      "x → 2 means x approaches 2."]
  ]);


  /* STATISTICS AND PROBABILITY — SYMBOLS */

  add("Statistics & probability", "symbol", [
    ["s-probability", "Probability notation", "P(A)",
      "The probability of event A.",
      "P(heads) = 1/2 for a fair coin."],

    ["s-conditional", "Conditional probability bar", "P(A | B)",
      "The vertical bar means given B, not absolute value.",
      "P(6 | even) = 1/3 for a fair die."],

    ["s-mean", "X-bar", "x̄",
      "Common notation for a sample arithmetic mean.",
      "For 2, 4, 6, x̄ = 4."],

    ["s-mu", "Mu", "μ",
      "Often a population mean in statistics; meaning depends on context.",
      "A model may specify μ = 10."],

    ["s-sd", "Lowercase sigma", "σ",
      "Often a population standard deviation; different from summation ∑.",
      "If population variance is 4, σ = 2."]
  ]);

  window.Codex.referenceEntries = entries;
})();