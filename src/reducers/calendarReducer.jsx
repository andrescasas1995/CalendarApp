import { types } from "../types/types";

const initialState = {
    events: [],
    activeEvent: null
};

export const calendarReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.eventAdded:
            return {
                ...state,
                events: [...state.events, action.payload]
            }
        case types.eventUpdated:
            return {
                ...state,
                events: state.events.map(event => (event.id === action.payload.id) ? action.payload : event)
            }
        case types.eventDeleted:
            return {
                ...state,
                events: state.events.filter(event => event.id !== state.activeEvent.id),
                activeEvent: null
            }
        case types.eventSetActive:
            return {
                ...state,
                activeEvent: action.payload
            }
        default:
            return state;
    }
}