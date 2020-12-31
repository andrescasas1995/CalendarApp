import { fetchWithToken } from "../helpers/fetch";
import { prepareEvent } from "../helpers/prepareEvent";
import { types } from "../types/types";

export const eventStartAdded = (event) => {
    return async (dispatch, getState) => {
        const { uid, name } = getState().auth;
        try {
            const res = await fetchWithToken('events', event, 'POST');
            const body = await res.json();

            if (body.ok) {
                event.id = body.event.id;
                event.user = {
                    _id: uid,
                    name,
                }
                dispatch(eventAdded(event));
            }
        } catch (error) {

        }
    }
}

const eventAdded = (event) => ({
    type: types.eventAdded,
    payload: event
});

export const eventUpdated = (event) => ({
    type: types.eventUpdated,
    payload: event
});

export const eventDeleted = () => ({
    type: types.eventDeleted
});

export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event
});

export const eventStartLoading = () => {
    return async (dispatch) => {
        try {
            const res = await fetchWithToken('events');
            const body = await res.json();
            const events = prepareEvent(body.events);
            
            if (body.ok) {
                dispatch(eventLoaded(events));
            }
        } catch (error) {
            
        }
    }
}

const eventLoaded = (events) => ({
    type: types.eventLoaded,
    payload: events,
});
