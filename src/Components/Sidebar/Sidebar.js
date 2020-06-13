import React, { useState } from 'react';
import './sidebar.scss';
import Select from 'react-select';
import Modal from 'react-modal';

function Sidebar(props) {
  const [openAddClassModal, setOpenAddClassModal] = useState(false);
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
      <Modal
        isOpen={openAddClassModal}
        contentLabel="onRequestClose Example"
        onRequestClose={() => setOpenAddClassModal(false)}
        shouldCloseOnOverlayClick={true}
        style={{ display: 'flex' }}
        className="add-class-modal"
        ariaHideApp={false}
      >
        <div className="add-class-modal-wrap">
          <div className="add-class-modal-header">
            <h3>Add Class</h3>
            <div className="add-class-section-information">
              <div className="section-info-left">
                <label htmlFor="classTitle">
                  <input type="text" />
                </label>
                <label htmlFor="classSection">
                  <input type="text" />
                </label>
                <label htmlFor="creditHours">
                  <input type="text" />
                </label>
                <label htmlFor="classStatus">
                  <input type="text" />
                </label>
                <label htmlFor="specialApproval">
                  <input type="text" />
                </label>
                <label htmlFor="GradeMode">
                  <input type="text" />
                </label>
                <label htmlFor="crossListWith">
                  <input type="text" />
                </label>
              </div>
              <div className="section-info-left">
                <label htmlFor="partOfTerm">
                  <input type="text" />
                </label>
                <label htmlFor="campus">
                  <input type="text" />
                </label>
                <label htmlFor="instructionMethod">
                  <input type="text" />
                </label>
                <label htmlFor="isVisible">
                  <input type="text" />
                </label>
                <label htmlFor="scheduleType">
                  <input type="text" />
                </label>
                <label htmlFor="session">
                  <input type="text" />
                </label>
              </div>
            </div>
            <div className="add-class-bottom">
              <label htmlFor="classInstructor">
                <input type="text" />
              </label>
              <label htmlFor="buildingAndRoom">
                <input type="text" />
              </label>
              <label htmlFor="classSchedule">
                <input type="text" />
              </label>
            </div>
            <button onClick={() => setOpenAddClassModal(false)}>X</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Sidebar;
