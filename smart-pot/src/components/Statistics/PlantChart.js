import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { getPlantHistoryByDate } from "../hooks/api"; // Assuming API is in hooks folder
import "chartjs-adapter-moment";
import "../../assets/css/App.css";
Chart.register(...registerables);

const PlantChart = ({
  timestamps,
  humidity,
  temperature,
  lux,
  plants,
  plantId,
  hideCharts,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [humidityChartData, setHumidityChartData] = useState({});
  const [temperatureChartData, setTemperatureChartData] = useState({});
  const [luxChartData, setLuxChartData] = useState({});
  const [plantToDisplay, setPlant] = useState({});

  useEffect(() => {
    const selectedPlant = plants.find((plant) => plant.id === plantId);
    setPlant(selectedPlant);

    setHumidityChartData({
      labels: timestamps,
      datasets: [
        {
          label: "Humidity",
          data: humidity,
          backgroundColor: "rgba(0, 123, 255, 0.5)",
          borderColor: "rgba(0, 123, 255, 1)",
          tension: 0.2,
        },
      ],
    });

    setTemperatureChartData({
      labels: timestamps,
      datasets: [
        {
          label: "Temperature",
          data: temperature,
          backgroundColor: "rgba(40, 167, 69, 0.5)",
          borderColor: "rgba(40, 167, 69, 1)",
          tension: 0.2,
        },
      ],
    });

    setLuxChartData({
      labels: timestamps,
      datasets: [
        {
          label: "Lux",
          data: lux,
          backgroundColor: "rgba(255, 193, 7, 0.5)",
          borderColor: "rgba(255, 193, 7, 1)",
          tension: 0.2,
        },
      ],
    });

    setIsLoading(false);
  }, [timestamps, humidity, temperature, lux]);

  return (
    <div>
      {isLoading ? (
        "Loading..."
      ) : (
        <div className="chartContainer">
          <div
            className="form"
            style={{
              padding: "1rem",
            }}
          >
            <header style={{ padding: "1rem" }}>
              {plantToDisplay.name}{" "}
              <img
                src={plantToDisplay.imgsrc}
                alt={plantToDisplay.name}
                style={{
                  width: "60px",
                  height: "60px",
                  float: "right",
                  backgroundColor: "transparent",
                  transition: "transform 0.4s ease-in-out",
                  borderRadius: "50%",
                }}
              />
            </header>

            <div>
              <Line
                data={humidityChartData}
                options={chartOptions("Time", "Humidity (%)", 0, 100)}
              />
              <Line
                data={temperatureChartData}
                options={chartOptions("Time", "Temperature (°C)")}
              />
              <Line
                data={luxChartData}
                options={chartOptions("Time", "Lux (lx)")}
              />
            </div>
            <div
              style={{
                padding: "1rem",
              }}
            >
              <input
                type="button"
                className="button"
                value="Close"
                onClick={hideCharts}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const chartOptions = (xLabel, yLabel, yAxisMin = null, yAxisMax = null) => ({
  scales: {
    x: {
      type: "time",
      title: {
        display: true,
        text: xLabel,
      },
      time: {
        displayFormats: {
          millisecond: "MMM DD HH:mm",
          second: "MMM DD HH:mm",
          minute: "MMM DD HH:mm",
          hour: "MMM DD HH:mm",
          day: "MMM DD HH:mm",
          week: "MMM DD HH:mm",
          month: "MMM DD HH:mm",
          quarter: "MMM DD HH:mm",
          year: "MMM DD HH:mm",
        },
      },
    },
    y: {
      type: "linear",
      title: {
        display: true,
        text: yLabel,
      },
      min: yAxisMin,
      max: yAxisMax,
    },
  },
});

export default PlantChart;
