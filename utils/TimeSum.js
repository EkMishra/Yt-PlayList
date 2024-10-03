import { DateTime, Duration } from "luxon";

const timeSum = (durations, scale) => {
  let combinedDuration = Duration.fromMillis(0);
  durations.forEach((durationString) => {
    const duration = Duration.fromISO(durationString);
    combinedDuration = combinedDuration.plus(duration);
  });

  const totalMS = combinedDuration.toMillis() / scale;
  combinedDuration = Duration.fromMillis(totalMS);
  return timeTransform(combinedDuration, scale);

  //   return ;
};
export const timeBuilderJson = (TotalDuration) => {
  let scalingOptions = [1, 1.25, 1.5, 1.75, 2];
  let output = [];
  scalingOptions.map((scale) => {
    output.push(timeSum(TotalDuration, scale));
  });
  //   console.log(output);
  return output;
};

const timeTransform = (totalDurationISO, scale) => {
  const days = Math.floor(totalDurationISO.as("days"));
  const hours = Math.floor(totalDurationISO.as("hours") % 24);
  const minutes = Math.floor(totalDurationISO.as("minutes") % 60);
  const seconds = Math.floor(totalDurationISO.as("seconds") % 60);
  const durationTemplate = {
    scale,
    duration: {
      days,
      hours,
      minutes,
      seconds,
    },
  };
  return durationTemplate;
};
