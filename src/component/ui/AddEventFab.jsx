import React from 'react';
import { useDispatch } from 'react-redux';
import { uiOpenModal } from '../../actions/actions';
import { eventSetActive } from '../../actions/events';

const AddEventFab = () => {
    const dispatch = useDispatch();

    const handleClickNew = () => {
        dispatch(eventSetActive(null));
        dispatch(uiOpenModal());
    }

    return (
        <button
            className="btn btn-primary fab"
            onClick={handleClickNew}
        >
            <i className="fas fa-plus"></i>
        </button>
    );
};

export default AddEventFab;