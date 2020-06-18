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
            <h2>New Class</h2>
          </div>
          <div className="add-class-section-information">
            <h3>Section Information</h3>
            <div className="section-info">
              <div className="section-info-left">
                <label htmlFor="classTitle">
                  Title
                  <input type="text" />
                </label>
                <label htmlFor="classSection">
                  Section
                  <input type="text" />
                </label>
                <label htmlFor="creditHours">
                  Credit Hours
                  <input type="text" />
                </label>
                <label htmlFor="classStatus">
                  Status
                  <input type="text" />
                </label>
                <label htmlFor="specialApproval">
                  Special Approval
                  <input type="text" />
                </label>
                <label htmlFor="GradeMode">
                  Grade Mode
                  <input type="text" />
                </label>
                <label htmlFor="crossListWith">
                  Cross List With
                  <input type="text" />
                </label>
              </div>
              <div className="section-info-right">
                <label htmlFor="partOfTerm">
                  Part of Term
                  <input type="text" />
                </label>
                <label htmlFor="campus">
                  Campus
                  <input type="text" />
                </label>
                <label htmlFor="instructionMethod">
                  Instruction Method
                  <input type="text" />
                </label>
                <label htmlFor="isVisible">
                  Visable
                  <input type="text" />
                </label>
                <label htmlFor="scheduleType">
                  Schedule Type
                  <input type="text" />
                </label>
                <label htmlFor="session">
                  Session
                  <input type="text" />
                </label>
              </div>
            </div>
          </div>
          <div className="add-class-bottom">
            <label htmlFor="classInstructor">
              Instructor
              <input type="text" />
            </label>
            <label htmlFor="buildingAndRoom">
              Building and Room
              <input type="text" />
            </label>
            <label htmlFor="classSchedule">
              Schedule
              <input type="text" />
            </label>
          </div>
          <div className="add-class-btns">
            <button onClick={() => setOpenAddClassModal(false)}>Cancel</button>
            <button>Save Section</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Sidebar;
