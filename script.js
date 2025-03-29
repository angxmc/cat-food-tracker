function calculateCalories() {
  const weight = parseFloat(document.getElementById("weight").value);
  const condition = document.querySelector('input[name="condition"]:checked');

  if (!weight || !condition) {
    document.getElementById("result").innerText =
      "Please enter weight and select a body condition.";
    return;
  }
  // resting energy requirement: RER = 70 * (body weight in kg)^0.75
  const rer = 70 * Math.pow(weight, 0.75);
  //variable changes based on bodyshape
  let multiplier = 1.0;

  switch (condition.value) {
    case "underweight":
      multiplier = 1.2;
      break;
    case "ideal":
      multiplier = 1.0;
      break;
    case "overweight":
      multiplier = 0.85;
      break;
  }

  const calories = Math.round(rer * multiplier);
  document.getElementById(
    "result"
  ).innerText = `Your cat needs about ${calories} calories/day.`;
}
