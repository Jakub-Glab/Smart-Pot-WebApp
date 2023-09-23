const averageDailyData = (timeData, valueData) => {
  const averagedTimeData = [];
  const averagedValueData = [];

  let tempTimeSum = 0;
  let tempValueSum = 0;
  let count = 0;

  let currentDate = new Date(timeData[0]).toISOString().split("T")[0]; // Extract just the date part

  for (let i = 0; i < timeData.length; i++) {
    const currentTimeDate = new Date(timeData[i]).toISOString().split("T")[0];

    if (currentDate === currentTimeDate) {
      tempTimeSum += new Date(timeData[i]).getTime();
      tempValueSum += valueData[i];
      count++;
    } else {
      if (count > 0) {
        averagedTimeData.push(new Date(tempTimeSum / count).toISOString());
        averagedValueData.push(tempValueSum / count);
      }

      currentDate = currentTimeDate;
      tempTimeSum = new Date(timeData[i]).getTime();
      tempValueSum = valueData[i];
      count = 1;
    }
  }

  if (count > 0) {
    averagedTimeData.push(new Date(tempTimeSum / count).toISOString());
    averagedValueData.push(tempValueSum / count);
  }

  //for every time in averagedTimeData add 4hours
  for (let i = 0; i < averagedTimeData.length; i++) {
    let date = new Date(averagedTimeData[i]);
    date.setHours(date.getHours() + 4);
    averagedTimeData[i] = date.toISOString();
  }

  console.log("Daily averagedTimeData:", averagedTimeData);
  console.log("Daily averagedValueData:", averagedValueData);

  return [averagedTimeData, averagedValueData];
};

export default averageDailyData;
