function calculateCalories() {
  // Get basic inputs
  let weight = parseFloat(document.getElementById("weight").value);
  const unit = document.getElementById("unit").value;
  const condition = document.querySelector('input[name="condition"]:checked');

  if (!weight || !condition) {
    document.getElementById("result").innerText =
      "Please enter weight and select a body condition.";
    return;
  }

  // Convert lbs to kg if needed
  if (unit === "lbs") {
    weight = weight * 0.453592;
  }

  // Calculate the Resting Energy Requirement (RER)
  const rer = 70 * Math.pow(weight, 0.75);
  let multiplier = 1.0;

  // Set multiplier based on body condition
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

  const totalCalories = Math.round(rer * multiplier);
  let message = `Your cat needs about ${totalCalories} calories/day. `;

  // Get the selected food ratio
  const foodRatio = document.getElementById("foodRatio").value;
  let wetCalories = 0;
  let dryCalories = 0;

  // Determine calories from wet and dry food based on the ratio
  switch (foodRatio) {
    case "100wet":
      wetCalories = totalCalories;
      dryCalories = 0;
      break;
    case "100dry":
      wetCalories = 0;
      dryCalories = totalCalories;
      break;
    case "50/50":
      wetCalories = totalCalories * 0.5;
      dryCalories = totalCalories * 0.5;
      break;
    case "30/70":
      wetCalories = totalCalories * 0.3;
      dryCalories = totalCalories * 0.7;
      break;
    case "20/80":
      wetCalories = totalCalories * 0.2;
      dryCalories = totalCalories * 0.8;
      break;
    case "10/90":
      wetCalories = totalCalories * 0.1;
      dryCalories = totalCalories * 0.9;
      break;
    default:
      wetCalories = totalCalories;
      dryCalories = 0;
      break;
  }

  // Get the calories per gram for wet and dry food from user input
  const wetCal = parseFloat(document.getElementById("wetCal").value);
  const dryCal = parseFloat(document.getElementById("dryCal").value);

  // Calculate the grams needed based on each food's calorie density
  if (wetCal && wetCal > 0) {
    const wetGrams = Math.round(wetCalories / wetCal);
    message += `For wet food: approximately ${wetGrams} grams needed. `;
  }

  if (dryCal && dryCal > 0) {
    const dryGrams = Math.round(dryCalories / dryCal);
    message += `For dry food: approximately ${dryGrams} grams needed.`;
  }

  document.getElementById("result").innerText = message;
}
