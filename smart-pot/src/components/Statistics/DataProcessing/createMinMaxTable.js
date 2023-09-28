const createMinMaxTable = (
  averagedTimeData,
  tempData,
  luxData,
  humidityData
) => {
  const tableData = {};

  for (let i = 0; i < averagedTimeData.length; i++) {
    const date = new Date(averagedTimeData[i]).toISOString().split("T")[0];
    if (!tableData[date]) {
      tableData[date] = {
        tempMin: Infinity,
        tempMax: -Infinity,
        luxMin: Infinity,
        luxMax: -Infinity,
        humidityMin: Infinity,
        humidityMax: -Infinity,
      };
    }

    tableData[date].tempMin = Math.min(tableData[date].tempMin, tempData[i]);
    tableData[date].tempMax = Math.max(tableData[date].tempMax, tempData[i]);
    tableData[date].luxMin = Math.min(tableData[date].luxMin, luxData[i]);
    tableData[date].luxMax = Math.max(tableData[date].luxMax, luxData[i]);
    tableData[date].humidityMin = Math.min(
      tableData[date].humidityMin,
      humidityData[i]
    );
    tableData[date].humidityMax = Math.max(
      tableData[date].humidityMax,
      humidityData[i]
    );
  }

  const tableArray = Object.keys(tableData).map((date) => ({
    date,
    ...tableData[date],
  }));

  return tableArray;
};

export default createMinMaxTable;
