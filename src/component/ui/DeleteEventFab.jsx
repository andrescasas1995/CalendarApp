import React from 'react';
import { useDispatch } from 'react-redux';
import { eventDeleted } from '../../actions/events';

const DeleteEventFab = () => {
    const dispatch = useDispatch();

    const handleClickDelete = () => {
        dispatch(eventDeleted());
    }

    return (
        <button
            className="btn btn-danger fab-danger"
            onClick={handleClickDelete}
        >
            <i className="fas fa-trash"></i>
        </button>
    );
};

export default DeleteEventFab;