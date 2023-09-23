import React, { useEffect, useState } from "react";
import { getPlantHistoryByLimit } from "../hooks/api";
import PlantChart from "./PlantChart";

const PlantHistoryLimit = () => {
  const [limit, setLimit] = useState(5);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await getPlantHistoryByLimit(12, 5);
      const data = response.data;
      console.log(data);
      const timestamps = data.map((d) => new Date(d.added_at).toISOString());
      const humidity = data.map((d) => d.humidity);
      const temperature = data.map((d) => d.temperature);

      setChartData({
        labels: timestamps,
        datasets: [
          {
            label: "Humidity",
            data: humidity,
            backgroundColor: "rgba(0, 123, 255, 0.5)",
            borderColor: "rgba(0, 123, 255, 1)",
          },
          {
            label: "Temperature",
            data: temperature,
            backgroundColor: "rgba(255, 193, 7, 0.5)",
            borderColor: "rgba(255, 193, 7, 1)",
          },
        ],
      });
    };

    fetchData();
  }, [limit]);

  return (
    <div>
      <h2>Plant History Limit</h2>
      <button onClick={() => setLimit(limit + 5)}>Load More</button>
    </div>
  );
};

export default PlantHistoryLimit;
