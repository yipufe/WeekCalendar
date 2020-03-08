import React, { useState } from 'react';
import './sidebar.scss';
import Select from 'react-select';

function Sidebar(props) {
  return (
    <div className="sidebar">
      <h1 style={{ color: 'white', fontWeight: '600' }}>Calendar Week</h1>
      <div className="selects">
        <Select
          className="select"
          defaultValue={{ label: 'Filter Room...', value: 0 }}
          options={props.room}
          onChange={props.handleRoomChange}
        />
        <Select
          className="select"
          defaultValue={{ label: 'Filter Instructor...', value: 0 }}
          options={props.instructor}
          onChange={props.handleInstructorChange}
        />
        <Select
          className="select"
          defaultValue={{ label: 'Filter Block...', value: 0 }}
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
