const passwordInput = document.querySelector("#password");
const visibilityToggle = document.querySelector("#visibility-toggle");
const strengthLabel = document.querySelector("#strength-label");
const strengthMeter = document.querySelector("#strength-meter");
const meterSegments = [...document.querySelectorAll(".meter-segment")];
const suggestions = document.querySelector("#suggestions");

const criteria = {
  length: document.querySelector("#criterion-length"),
  uppercase: document.querySelector("#criterion-uppercase"),
  lowercase: document.querySelector("#criterion-lowercase"),
  number: document.querySelector("#criterion-number"),
  special: document.querySelector("#criterion-special"),
};

function analyzePassword(password) {
  const length = Array.from(password).length;
  const checks = {
    length: length >= 12,
    uppercase: /\p{Lu}/u.test(password),
    lowercase: /\p{Ll}/u.test(password),
    number: /\p{N}/u.test(password),
    special: /[^\p{L}\p{N}\s]/u.test(password),
  };

  const lengthScore =
    length >= 20 ? 4 : length >= 16 ? 3 : length >= 12 ? 2 : length >= 8 ? 1 : 0;
  const score = lengthScore + Number(checks.uppercase) +
    Number(checks.lowercase) + Number(checks.number) + Number(checks.special);
  const strength =
    score <= 2 ? "Weak" : score <= 5 ? "Medium" : score <= 7 ? "Strong" : "Very Strong";

  return { checks, score, strength };
}

function getSuggestions(checks) {
  const tips = [];
  if (!checks.length) tips.push("Use at least 12 characters; 16 or more is even better.");
  if (!checks.uppercase) tips.push("Add an uppercase letter.");
  if (!checks.lowercase) tips.push("Add a lowercase letter.");
  if (!checks.number) tips.push("Include a number.");
  if (!checks.special) tips.push("Add a special character, such as !, @, or #.");
  return tips;
}

function updateChecker() {
  const password = passwordInput.value;
  if (!password) {
    strengthLabel.textContent = "Not checked";
    strengthLabel.dataset.strength = "empty";
    strengthMeter.setAttribute("aria-valuenow", "0");
    strengthMeter.setAttribute("aria-valuetext", "Not checked");
    meterSegments.forEach((segment) => {
      segment.dataset.active = "false";
    });
    Object.values(criteria).forEach((criterion) => {
      criterion.dataset.met = "false";
    });
    suggestions.textContent = "Your password is checked only in this browser.";
    return;
  }

  const result = analyzePassword(password);
  strengthLabel.textContent = result.strength;
  strengthLabel.dataset.strength = result.strength.toLowerCase().replace(" ", "-");
  strengthMeter.setAttribute("aria-valuenow", String(result.score));
  strengthMeter.setAttribute("aria-valuetext", result.strength);

  const activeSegments = result.score === 0 ? 1 : Math.ceil(result.score / 2);
  meterSegments.forEach((segment, index) => {
    segment.dataset.active = String(index < activeSegments);
    segment.dataset.strength = result.strength.toLowerCase().replace(" ", "-");
  });
  for (const [name, criterion] of Object.entries(criteria)) {
    criterion.dataset.met = String(result.checks[name]);
  }

  const tips = getSuggestions(result.checks);
  suggestions.textContent = tips.length
    ? `Try this: ${tips.join(" ")}`
    : "Great mix of length and character types.";
}

passwordInput.addEventListener("input", updateChecker);

visibilityToggle.addEventListener("click", () => {
  const isVisible = passwordInput.type === "text";
  passwordInput.type = isVisible ? "password" : "text";
  visibilityToggle.setAttribute("aria-pressed", String(!isVisible));
  visibilityToggle.setAttribute("aria-label", isVisible ? "Show password" : "Hide password");
  visibilityToggle.querySelector("span").textContent = isVisible ? "Show" : "Hide";
});
