import React, { useState } from "react";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { useDispatch } from "react-redux";
import { uiOpenModal } from "../../actions/actions";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/es";

import { messages } from "../../helpers/calendar-messages-es";
import Navbar from "../ui/Navbar";
import CalendarEvent from "./CalendarEvent";
import CalendarModal from "./CalendarModal";

moment.locale("es");
const localizer = momentLocalizer(moment);

const events = [
  {
    id: 1,
    title: "Mi cumpleños",
    start: moment().toDate(),
    end: moment().add(1.5, "hours").toDate(),
    bgcolor: "#fafafa",
    user: {
      _id: "1234",
      name: "Andres",
    },
  },
  {
    id: 2,
    title: "Today",
    start: new Date(new Date().setHours(new Date().getHours() - 0.5)),
    end: new Date(new Date().setHours(new Date().getHours() + 0.5)),
  },
];

const CalendarScreen = () => {
  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );
  const dispatch = useDispatch();

  const onDoubleClickEvent = () => {
    dispatch(uiOpenModal());
  };

  const onSelectEvent = () => {
  };

  const onViewChangeEvent = (e) => {
    setLastView(e);
    localStorage.setItem("lastView", e);
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: "#367CF7",
      boderRadius: "0px",
      opacity: 0.8,
      color: "white",
    };

    return {
      style,
    };
  };

  return (
    <div className="calendar-screen">
      <Navbar />
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        view={lastView}
        messages={messages}
        eventPropGetter={eventStyleGetter}
        onDoubleClickEvent={onDoubleClickEvent}
        onSelectEvent={onSelectEvent}
        onView={onViewChangeEvent}
        components={{
          event: CalendarEvent,
        }}
      />

      <CalendarModal />
    </div>
  );
};

export default CalendarScreen;
