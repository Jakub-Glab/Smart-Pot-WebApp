const averageData = (timeData, valueData, intervalMinutes = 15) => {
  const averagedTimeData = [];
  const averagedValueData = [];

  let tempTimeSum = 0;
  let tempValueSum = 0;
  let count = 0;

  let lastTime = new Date(timeData[0]);
  lastTime.setMinutes(
    Math.ceil(lastTime.getMinutes() / intervalMinutes) * intervalMinutes
  );
  lastTime.setSeconds(0);
  lastTime.setMilliseconds(0);

  let windowEndTime = lastTime.getTime();
  let windowStartTime = windowEndTime - intervalMinutes * 60 * 1000;

  for (let i = 0; i < timeData.length; i++) {
    const currentTimestamp = new Date(timeData[i]).getTime();

    if (
      currentTimestamp < windowEndTime &&
      currentTimestamp >= windowStartTime
    ) {
      tempTimeSum += currentTimestamp;
      tempValueSum += valueData[i];
      count++;
    } else {
      if (count > 0) {
        averagedTimeData.unshift(new Date(tempTimeSum / count).toISOString());
        averagedValueData.unshift(tempValueSum / count);
      }

      tempTimeSum = 0;
      tempValueSum = 0;
      count = 0;

      while (currentTimestamp < windowStartTime) {
        windowEndTime = windowStartTime;
        windowStartTime -= intervalMinutes * 60 * 1000;
      }

      tempTimeSum += currentTimestamp;
      tempValueSum += valueData[i];
      count++;
    }
  }

  if (count > 0) {
    averagedTimeData.unshift(new Date(tempTimeSum / count).toISOString());
    averagedValueData.unshift(tempValueSum / count);
  }

  for (let i = 0; i < averagedTimeData.length; i++) {
    let date = new Date(averagedTimeData[i]);
    date.setHours(date.getHours());
    averagedTimeData[i] = date.toISOString();
  }

  // console.log("averagedTimeData:", averagedTimeData);
  // console.log("averagedValueData:", averagedValueData);

  return [averagedTimeData, averagedValueData];
};

export default averageData;
