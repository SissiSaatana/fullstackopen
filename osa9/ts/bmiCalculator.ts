const calculateBmi = (heightInCm: number, weight: number): string => {
  const heightInMeters = heightInCm / 100;
  const BMI: number = weight / (heightInMeters * heightInMeters);

  switch (true) {
    case (BMI < 16): {
      return "Underweight (Severe thinness)";
      break;
    }
    case (BMI <= 16.9): {
      return "Underweight (Severe thinness)";
      break;
    }
    case (BMI <= 18.4): {
      return "Mild thinness";
      break;
    }
    case (BMI <= 24.9): {
      return "Normal range";
      break;
    }
    case (BMI <= 29.9): {
      return "Overweight (Pre-obese)";
      break;
    }
    case (BMI <= 34.9): {
      return "Obese (Class I)";
      break;
    }
    case (BMI <= 39.9): {
      return "Obese (Class II)";
      break;
    }
    case (BMI > 39.9): {
      return "Obese (Class III)";
      break;
    }
    default: {
      throw new Error("unable to calculate BMI");
    }
  }
}

console.log(calculateBmi(180, 74))