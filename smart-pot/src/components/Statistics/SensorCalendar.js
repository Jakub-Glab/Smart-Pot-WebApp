import React from "react";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const myEventsList = [
  {
    title: "Event 1",
    start: new Date(2023, 9, 10, 10, 0),
    end: new Date(2023, 9, 10, 14, 0),
  },
  {
    title: "Event 2",
    start: new Date(2023, 9, 11, 13, 0),
    end: new Date(2023, 9, 11, 15, 0),
  },
];

const SensorCalendar = (props) => (
  <div>
    <Calendar
      selectable
      localizer={localizer}
      events={myEventsList}
      defaultView={"month"}
      views={["month"]}
      style={{ height: "20rem" }}
    />
  </div>
);

export default SensorCalendar;
