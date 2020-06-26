import React, { useState } from 'react';
import './sidebar.scss';
import Select from 'react-select';
import Modal from 'react-modal';
import AddClass from './AddClass';

function Sidebar(props) {
  const [openAddClassModal, setOpenAddClassModal] = useState(false);
  const [addClassData, setAddClassData] = useState({});

  const handleAddClass = (e) => {
    setAddClassData({
      ...addClassData,
      [e.target.name]: e.target.value,
    });
  };

  console.log(addClassData);

  return (
    <div className="sidebar">
      <h1>Academic Scheduling Aid</h1>
      <div className="btns">
        <input
          type="file"
          name="csvfile"
          id="csvfile"
          onChange={props.handleChange}
          style={{
            width: '100%',
            height: '30px',
            fontSize: '10pt',
          }}
        />
        <button
          type="submit"
          onClick={props.fileHandler}
          className="upload-btn"
        >
          IMPORT
        </button>
      </div>
      <div className="filters">
        <div className="filter-header">
          <h3>Filter by</h3>
          <button onClick={props.clearFilters} className="clear-filters-btn">
            Clear All
          </button>
        </div>
        <Select
          className="select"
          placeholder="Filter Course..."
          value={props.courseValue}
          options={props.course}
          onChange={props.handleCourseChange}
        />
        <Select
          className="select"
          placeholder="Filter Room..."
          value={props.roomValue}
          options={props.room}
          onChange={props.handleRoomChange}
        />
        <Select
          className="select"
          placeholder="Filter Instructor..."
          value={props.instructorValue}
          options={props.instructor}
          onChange={props.handleInstructorChange}
        />
        <Select
          className="select"
          placeholder="Filter Block..."
          value={props.blockValue}
          options={props.block}
          onChange={props.handleBlockChange}
        />
      </div>
      <button
        className="add-new-class-btn"
        onClick={() => setOpenAddClassModal(true)}
      >
        ADD NEW CLASS
      </button>
      <button
        className="reset-calendar"
        onClick={() => {
          props.handleResetCalendar();
          document.getElementById('csvfile').value = '';
        }}
      >
        RESET CALENDAR
      </button>

      {/*** MODAL ***/}
      <Modal
        isOpen={openAddClassModal}
        contentLabel="onRequestClose Example"
        onRequestClose={() => setOpenAddClassModal(false)}
        shouldCloseOnOverlayClick={true}
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
      {/*** MODAL END ***/}
    </div>
  );
}

export default Sidebar;
