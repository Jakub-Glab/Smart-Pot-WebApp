import React, { useState, useEffect } from "react";
import SensorCalendar from "./SensorCalendar";
import PlantSelectComponent from "../Modals/PlantSelectComponent";
import { getPlantHistoryByDate, getPlants } from "../hooks/api";
import DatePicker from "react-datepicker";
import averageData from "./DataProcessing/averageData";
import createMinMaxTable from "./DataProcessing/createMinMaxTable";

import "react-datepicker/dist/react-datepicker.css";
import Modal from "../Modals/Modal";
import SensorCharts from "./SensorCharts";
import PlantChart from "./PlantChart";

const Statistics = () => {
  const [plantId, setPlantId] = useState("");
  const [plants, setPlants] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [showCharts, setShowCharts] = useState(false);
  const [labels2, setLabels] = useState([]);
  const [temperatureData2, setTemperatureData] = useState([]);
  const [luxData2, setLuxData] = useState([]);
  const [humidityData2, setHumidityData] = useState([]);
  const [interval, setInterval] = useState(null);

  const onHandleData = async () => {
    let labels = [];
    let temperatureData = [];
    let luxData = [];
    let humidityData = [];

    if (!plantId) {
      setModalMessage("Please select a plant!");
      setShowModal(true);
      return;
    }
    if (!startDate) {
      setModalMessage("Please select a date range!");
      setShowModal(true);
      return;
    }

    let formattedStartDate = startDate.toISOString().slice(0, 10);
    let formattedEndDate = null;
    if (endDate) {
      formattedEndDate = endDate.toISOString().slice(0, 10);
    }

    const response = await getPlantHistoryByDate(
      plantId,
      formattedStartDate,
      formattedEndDate
    );

    const rawLabels = response.data.map((item) =>
      new Date(item.added_at).toISOString()
    );
    const intervalArg = interval !== null ? [interval] : [];

    [labels, temperatureData] = averageData(
      rawLabels,
      response.data.map((item) => item.temperature),
      ...intervalArg
    );
    [labels, luxData] = averageData(
      rawLabels,
      response.data.map((item) => item.lux),
      ...intervalArg
    );
    [labels, humidityData] = averageData(
      rawLabels,
      response.data.map((item) => item.humidity),
      ...intervalArg
    );

    //map labels to timestamps, make it new Date, add 144000 and format it to Iso string
    let timestamps = labels.map((label) =>
      new Date(new Date(label).getTime()).toISOString()
    );
    console.log(labels);
    setLabels(timestamps);
    console.log(labels2);
    setTemperatureData(temperatureData);
    setLuxData(luxData);
    setHumidityData(humidityData);

    const tableArray = createMinMaxTable(
      labels,
      temperatureData,
      luxData,
      humidityData
    );
    const eventsList = [];
    tableArray.forEach((item) => {
      const dateStart = new Date(item.date);
      const dateEnd = new Date(new Date(item.date).setHours(23, 59, 59, 999));

      eventsList.push(
        {
          title: `Sensors Statistics: `,
          start: dateStart,
          end: dateEnd,
        },
        {
          title: `Temp: ${item.tempMin.toFixed(2)}°C  - ${item.tempMax.toFixed(
            2
          )}°C`,
          start: dateStart,
          end: dateEnd,
        },
        {
          title: `Lux: ${item.luxMin.toFixed(2)}lux - ${item.luxMax.toFixed(
            2
          )}lux`,
          start: dateStart,
          end: dateEnd,
        },
        {
          title: `Humidity: ${item.humidityMin.toFixed(
            2
          )}% - ${item.humidityMax.toFixed(2)}%`,
          start: dateStart,
          end: dateEnd,
        }
      );
    });
    setEvents(eventsList);
  };

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const handlePlantSelectChange = (e) => {
    setPlantId(e.id);
  };

  useEffect(() => {
    const fetchData = async () => {
      const plantsResponse = await getPlants();
      setPlants(plantsResponse.data);
    };

    fetchData();
  }, []);

  const onCloseModal = () => {
    setShowModal(false);
  };

  const onShowCharts = () => {
    setShowCharts(true);
  };

  const hideCharts = () => {
    setShowCharts(false);
  };

  const handleInterval = (e) => {
    setInterval(e.target.value);
  };

  const selectedPlant = plants.find((plant) => plant.id === plantId);

  return (
    <div>
      {showCharts ? null : (
        <div className="statisticsContainer">
          <Modal show={showModal} onClose={onCloseModal}>
            {modalMessage} {/* Display the modal message */}
          </Modal>
          <div className="form">
            <h1>Statistics</h1>
            <PlantSelectComponent
              options={plants}
              onChange={handlePlantSelectChange}
              placeholder="Select plant"
              isSearchable={false}
              value={selectedPlant}
            />
            <input
              type="number"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder={"Set resolution in minutes (default 15)"}
              value={interval}
              onChange={handleInterval}
              required
            />
            <br></br>
            <DatePicker
              selectsRange={true}
              valueDefault={null}
              dateFormat="dd/MM/yy"
              calendarClassName="calendar_rounded"
              onChange={onChange}
              startDate={startDate}
              endDate={endDate}
              placeholderText="Select date range"
              isClearable={true}
              zIndex={9999}
            />
            <input
              type="button"
              className="button"
              onClick={onHandleData}
              value="Save"
            />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                padding: "1rem",
                fontSize: "0.7rem",
              }}
            >
              <SensorCalendar events={events} />
            </div>
            <input
              type="button"
              className="button"
              value="Show charts"
              onClick={onShowCharts}
            />
          </div>
        </div>
      )}
      {showCharts && (
        <PlantChart
          hideCharts={hideCharts}
          timestamps={labels2}
          humidity={humidityData2}
          temperature={temperatureData2}
          lux={luxData2}
          plants={plants}
          plantId={plantId}
        />
      )}
    </div>
  );
};

export default Statistics;
