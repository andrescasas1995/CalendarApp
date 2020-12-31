import React, { useEffect, useState } from "react";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { useDispatch, useSelector } from "react-redux";
import { uiOpenModal } from "../../actions/ui";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/es";

import { messages } from "../../helpers/calendar-messages-es";
import Navbar from "../ui/Navbar";
import CalendarEvent from "./CalendarEvent";
import CalendarModal from "./CalendarModal";
import { eventSetActive, eventStartLoading } from "../../actions/events";
import AddEventFab from "../ui/AddEventFab";
import DeleteEventFab from "../ui/DeleteEventFab";

moment.locale("es");
const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {
  const dispatch = useDispatch();
  const { uid } = useSelector(state => state.auth);
  const { events, activeEvent } = useSelector(state => state.calendar);
  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );

  useEffect(() => {
    dispatch(eventStartLoading());
  }, [dispatch]);

  const onDoubleClickEvent = () => {
    dispatch(uiOpenModal());
  };

  const onSelectEvent = (e) => {
    dispatch(eventSetActive(e));
  };

  const onSelectSlot = () => {
    dispatch(eventSetActive(null));
  };

  const onViewChangeEvent = (e) => {
    setLastView(e);
    localStorage.setItem("lastView", e);
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: (uid === event.user._id) ? "#367CF7" : '#465660',
      boderRadius: "0px",
      opacity: 0.8,
      color: "white",
    };

    return {
      style,
    };
  };

  return (
    <div>
      <Navbar />
      <div className="calendar-screen">
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
          onSelectSlot={onSelectSlot}
          selectable={true}
          onView={onViewChangeEvent}
          components={{
            event: CalendarEvent,
          }}
        />

        <CalendarModal />

        <AddEventFab />
        {activeEvent && <DeleteEventFab />}
      </div>
    </div>
  );
};
