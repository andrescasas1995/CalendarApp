import Swal from "sweetalert2";
import { fetchWithToken } from "../helpers/fetch";
import { prepareEvent } from "../helpers/prepareEvent";
import { types } from "../types/types";

export const eventStartAdded = (event) => {
  return async (dispatch, getState) => {
    const { uid, name } = getState().auth;
    try {
      const res = await fetchWithToken("events", event, "POST");
      const body = await res.json();

      if (body.ok) {
        event.id = body.event.id;
        event.user = {
          _id: uid,
          name,
        };
        dispatch(eventAdded(event));
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    } catch (error) {}
  };
};

const eventAdded = (event) => ({
  type: types.eventAdded,
  payload: event,
});

export const eventStartUpdated = (event) => {
  return async (dispatch, getState) => {
    const { uid, name } = getState().auth;
    try {
      if (event.user._id !== uid) {
        return Swal.fire(
          "Error",
          "No tiene permisos para hacer este cambio",
          "error"
        );
      }
      const res = await fetchWithToken(`events/${event.id}`, event, "PUT");
      const body = await res.json();

      if (body.ok) {
        event.user = {
          _id: uid,
          name,
        };
        dispatch(eventUpdated(event));
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    } catch (error) {}
  };
};

const eventUpdated = (event) => ({
  type: types.eventUpdated,
  payload: event,
});

export const eventStartDeleted = () => {
  return async (dispatch, getState) => {
    const { activeEvent } = getState().calendar;
    const { uid } = getState().auth;
    try {
      if (activeEvent.user._id !== uid) {
        return Swal.fire(
          "Error",
          "No tiene permisos para hacer este cambio",
          "error"
        );
      }
      const res = await fetchWithToken(
        `events/${activeEvent.id}`,
        {},
        "DELETE"
      );
      const body = await res.json();

      if (body.ok) {
        dispatch(eventDeleted());
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    } catch (error) {}
  };
};

const eventDeleted = () => ({
  type: types.eventDeleted,
});

export const eventSetActive = (event) => ({
  type: types.eventSetActive,
  payload: event,
});

export const eventStartLoading = () => {
  return async (dispatch) => {
    try {
      const res = await fetchWithToken("events");
      const body = await res.json();
      const events = prepareEvent(body.events);

      if (body.ok) {
        dispatch(eventLoaded(events));
      }
    } catch (error) {}
  };
};

const eventLoaded = (events) => ({
  type: types.eventLoaded,
  payload: events,
});
