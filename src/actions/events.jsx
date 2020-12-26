import { types } from "../types/types";

export const eventAdded = (event) => ({
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