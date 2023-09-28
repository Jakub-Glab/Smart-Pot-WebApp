import React from "react";

const SensorTable = ({ tableData }) => {
  return (
    <table id="sensorTable">
      <thead>
        <tr>
          <th>Date</th>
          <th>Temp Min</th>
          <th>Temp Max</th>
          <th>Lux Min</th>
          <th>Lux Max</th>
          <th>Humidity Min</th>
          <th>Humidity Max</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((row, idx) => (
          <tr key={idx}>
            {Object.values(row).map((value, idx) => (
              <td key={idx}>
                {typeof value === "number" ? value.toFixed(2) : value}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SensorTable;
