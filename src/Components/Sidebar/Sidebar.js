import React from 'react';
import './sidebar.scss';
import Select from 'react-select';
import Logo from '../../images/SchedgeLogo.svg';

function Sidebar(props) {
  return (
    <div className="sidebar">
      <img
        src={Logo}
        alt="Schedge Logo"
        className="logo"
        style={{ width: '120px', height: '120px' }}
      />
      <div className="selects">
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
        <button onClick={props.clearFilters} className="clear-filters-btn">
          Clear Filters
        </button>
      </div>
      <div className="btns">
        <button className="new-event-btn">New Event</button>
        <button className="clear-btn">Clear Calendar</button>
        <h3 style={{ width: '100%', color: 'white', marginTop: '40px' }}>
          Upload CSV File
        </h3>
        <input
          type="file"
          name="csvfile"
          id="csvfile"
          onChange={props.handleChange}
          style={{
            width: '100%',
            height: '30px',
            color: 'white',
            fontSize: '11pt'
          }}
        />
        <button
          type="submit"
          onClick={props.fileHandler}
          className="upload-btn"
        >
          Upload
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
