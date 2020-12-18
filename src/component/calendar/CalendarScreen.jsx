import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { messages } from "../../helpers/calendar-messages-es";
import moment from "moment";

import Navbar from "../ui/Navbar";

import "react-big-calendar/lib/css/react-big-calendar.css";
import 'moment/locale/es';

moment.locale('es');
const localizer = momentLocalizer(moment);

const events = [
  {
    id: 1,
    title: 'Mi cumpleños',
    start: moment().toDate(),
    end: moment().add(1, "hours").toDate(),
  },
  {
    id: 2,
    title: 'Today',
    start: new Date(new Date().setHours(new Date().getHours() - 0.5)),
    end: new Date(new Date().setHours(new Date().getHours() + 0.5)),
  }
];

const CalendarScreen = () => {

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: '#367CF7',
      boderRadius: '0px',
      opacity: 0.8,
      color: 'white',
    }

    return {
      style
    }
  };

  return (
    <div className="calendar-screen">
      <Navbar />
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        messages={messages}
        eventPropGetter={eventStyleGetter}
      />
    </div>
  );
};

export default CalendarScreen;
