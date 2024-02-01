interface exerciseResult {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const calculateExercises = (dailyHours: number[], targetHours: number): exerciseResult => {
  const average = dailyHours.reduce((a, b) => a + b, 0) / dailyHours.length;
  // with random specs we give random ratings
  const rating = Math.floor((Math.random() * 2) + 1)
  let ratingDescription;

  switch (rating) {
    case 1:
      ratingDescription = 'You\'re shit out of luck';
      break;
    case 2:
      ratingDescription = 'You have average luck';
      break;
    case 3:
      ratingDescription = 'Congratz on winning the lottery'
      break;
    default:
      ratingDescription = 'There is no luck'
      break;
  }

  const result: exerciseResult = {
    periodLength: dailyHours.length,
    trainingDays: dailyHours.filter(hours => hours > 0).length,
    success: average >= targetHours,
    rating: rating,
    ratingDescription: ratingDescription,
    target: targetHours,
    average: average
  };

  return result;
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))