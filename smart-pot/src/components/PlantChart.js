// import React, { useEffect, useState } from "react";
// import { Line } from "react-chartjs-2";
// import { getPlantHistoryByDate } from "./hooks/api"; // Assuming API is in hooks folder
// import "chartjs-adapter-moment";

// const PlantChart = ({ plantId }) => {
//   const [chartData, setChartData] = useState({});
//   const [startDate, setStartDate] = useState("2023-09-10");
//   const [endDate, setEndDate] = useState("2023-09-12");
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true);
//       const response = await getPlantHistoryByDate(plantId, startDate, endDate);
//       const data = response.data;

//       let lastDate = null;
//       let filteredData = [];

//       for (let d of data) {
//         const currDate = new Date(d.added_at);

//         if (
//           lastDate === null ||
//           currDate.getTime() - lastDate.getTime() >= 10 * 60
//         ) {
//           filteredData.push(d);
//           lastDate = currDate;
//         }
//       }

//       const timestamps = filteredData.map((d) =>
//         new Date(d.added_at).toISOString()
//       );
//       const humidity = filteredData.map((d) => d.humidity);
//       const temperature = filteredData.map((d) => d.temperature);
//       console.log(timestamps);

//       setChartData({
//         labels: timestamps,
//         datasets: [
//           {
//             label: "Humidity",
//             data: humidity,
//             backgroundColor: "rgba(0, 123, 255, 0.5)",
//             borderColor: "rgba(0, 123, 255, 1)",
//           },
//           {
//             label: "Temperature",
//             data: temperature,
//             backgroundColor: "rgba(255, 193, 7, 0.5)",
//             borderColor: "rgba(255, 193, 7, 1)",
//           },
//         ],
//       });
//       setIsLoading(false);
//     };

//     fetchData();
//   }, [plantId, startDate, endDate]);

//   return (
//     <div>
//       <div>
//         <label>Start Date:</label>
//         <input
//           type="date"
//           value={startDate}
//           onChange={(e) => setStartDate(e.target.value)}
//         />
//         <label>End Date:</label>
//         <input
//           type="date"
//           value={endDate}
//           onChange={(e) => setEndDate(e.target.value)}
//         />
//       </div>
//       {isLoading ? (
//         "Loading..."
//       ) : (
//         <Line
//           data={chartData}
//           options={{
//             scales: {
//               x: {
//                 type: "time",
//                 title: {
//                   display: true,
//                   text: "Time",
//                 },
//               },
//               y: {
//                 type: "linear",
//                 title: {
//                   display: true,
//                   text: "Value",
//                 },
//               },
//             },
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default PlantChart;
