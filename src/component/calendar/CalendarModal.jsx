import React, { useEffect, useState } from "react";
import moment from "moment";
import Swal from "sweetalert2";
import Modal from "react-modal";
import DateTimePicker from "react-datetime-picker";
import { useDispatch, useSelector } from "react-redux";

import { uiCloseModal } from "../../actions/actions";
import { eventAdded, eventSetActive, eventUpdated } from "../../actions/events";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

const now = moment().minutes(0).seconds(0).add(1, "hours");
const nowPlus = now.clone().add(1, "hours");

const initEvent = {
  title: "",
  notes: "",
  start: now.toDate(),
  end: nowPlus.toDate(),
}

const CalendarModal = () => {
  const dispatch = useDispatch();
  const [dateStart, setDateStart] = useState(now.toDate());
  const [dateEnd, setDateEnd] = useState(nowPlus.toDate());
  const [formValid, setFormValid] = useState(true);

  const { modalOpen } = useSelector(state => state.ui);
  const { activeEvent } = useSelector(state => state.calendar);

  const [formValues, setformValues] = useState(initEvent);

  const { notes, title, start, end } = formValues;


  useEffect(() => {
    if (activeEvent) {
      setformValues(activeEvent);
    }
  }, [activeEvent, setformValues])

  const handleInputChange = ({ target }) => {
    setformValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const closeModal = () => {
    setformValues(initEvent);
    dispatch(uiCloseModal());
    dispatch(eventSetActive(null));
  };

  const handleStartDateChange = (e) => {
    setDateStart(e);
    setformValues({
      ...formValues,
      start: e,
    });
  };

  const handleEndDateChange = (e) => {
    setDateEnd(e);
    setformValues({
      ...formValues,
      end: e,
    });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    
    const momentStart = moment(start);
    const momentEnd = moment(end);

    if (momentStart.isSameOrAfter(momentEnd)) {
      return Swal.fire('Ups T_T ...!!', 'Fecha fin debe ser mayor que la fecha inicio', 'error');
    }

    if (title.trim().length < 2) {
      return setFormValid(false);
    }

    //TODO realizar grabación
    if (activeEvent) {
      dispatch(eventUpdated(formValues));
    } else {
      dispatch(eventAdded({
        ...formValues,
        id: new Date().getTime(),
        user: {
          _id: 1234,
          name: "Andres"
        }
      }));
    }
    
    setFormValid(true);
    closeModal();
  }

  return (
    <Modal
      isOpen={modalOpen}
      // onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h1> {activeEvent ? "Editar evento" : "Nuevo evento"} </h1>
      <hr />
      <form className="container" onSubmit={handleSubmitForm}>
        <div className="form-group">
          <label>Fecha y hora inicio</label>
          <DateTimePicker
            onChange={handleStartDateChange}
            value={dateStart}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Fecha y hora fin</label>
          <DateTimePicker
            onChange={handleEndDateChange}
            value={dateEnd}
            minDate={dateStart}
            className="form-control"
          />
        </div>

        <hr />
        <div className="form-group">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${!formValid && 'is-invalid'}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={title}
            onChange={handleInputChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={notes}
            onChange={handleInputChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};

export default CalendarModal;
