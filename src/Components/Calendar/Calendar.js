import React, { useState } from 'react';
import './calendar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFileExport,
  faPrint,
  faPlusCircle,
} from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';
import AddClass from '../AddClass/AddClass';

import CalendarCells from '../CalendarCells/CalendarCells';
import CalendarTimes from '../CalendarTimes/CalendarTimes';
import CalendarFront from '../CalendarFront/CalendarFront';

// This component is the parent Calendar component that houses all of the other component for the calendar like the rows and columns and the times.

function Calendar(props) {
  const [openAddClassModal, setOpenAddClassModal] = useState(false);
  const [addClassData, setAddClassData] = useState({});

  const handleAddClass = (e) => {
    setAddClassData({
      ...addClassData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="calendar-wrap">
      <section className="calendar-header">
        <div
          className="calendar-header-icon-wrap"
          onClick={() => setOpenAddClassModal(openAddClassModal ? false : true)}
        >
          <FontAwesomeIcon
            icon={faPlusCircle}
            className="calendar-header-icon"
            size="lg"
          />
          <p>Add Class</p>
        </div>
        <div className="calendar-header-icon-wrap">
          <FontAwesomeIcon
            icon={faPrint}
            className="calendar-header-icon"
            size="lg"
          />
          <p>Print</p>
        </div>
        <div className="calendar-header-icon-wrap">
          <FontAwesomeIcon
            icon={faFileExport}
            className="calendar-header-icon"
            size="lg"
          />
          <p>Export</p>
        </div>
      </section>
      <div className="calendar">
        <div className="dayname-row">
          <div className="dayname-left"></div>
          <div className="dayname-wrap">
            <div className="dayname">Monday</div>
            <div className="dayname">Tuesday</div>
            <div className="dayname">Wednesday</div>
            <div className="dayname">Thursday</div>
            <div className="dayname">Friday</div>
            <div className="dayname">Saturday</div>
          </div>
        </div>
        <div className="full-cal">
          <CalendarTimes />
          <div className="full-cal-body">
            <CalendarCells />
            <CalendarFront
              initialData={props.initialData}
              setInitialData={props.setInitialData}
              displayData={props.displayData}
              setDisplayData={props.setDisplayData}
            />
          </div>
        </div>
      </div>
      {/* ** MODAL ***/}
      <Modal
        isOpen={openAddClassModal}
        contentLabel="onRequestClose Example"
        onRequestClose={() => setOpenAddClassModal(false)}
        shouldCloseOnOverlayClick={false}
        style={{ display: 'flex' }}
        className="add-class-modal"
        ariaHideApp={false}
      >
        <AddClass
          handleAddClass={handleAddClass}
          addClassData={addClassData}
          setOpenAddClassModal={setOpenAddClassModal}
          setScheduleChangesData={props.setScheduleChangesData}
          scheduleChangesData={props.scheduleChangesData}
        />
      </Modal>
      {/*** MODAL END **/}
    </div>
  );
}

export default Calendar;
