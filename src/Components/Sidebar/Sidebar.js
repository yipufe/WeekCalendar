import React, { useState } from 'react';
import './sidebar.scss';
import Select from 'react-select';
import testData from '../../testCalData';

const blockOptions = [
  { value: 'full', label: 'Full Semester' },
  { value: 'first', label: '1st Block' },
  { value: 'second', label: '2nd Block' }
];

const instructorOptions = testData.map(item => {
  return {
    value: item.Instructor.split(',')[0],
    label: item.Instructor.split(' (')[0]
  };
});

const roomOptions = testData.map(room => {
  return {
    value: room['Building and Room'],
    label: room['Building and Room']
  };
});

function Sidebar(props) {
  const [block, setBlock] = useState();
  const [instructor, setInstructor] = useState();
  const [room, setRoom] = useState();

  const handleBlockChange = selectedOption => {
    setBlock({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };
  const handleInstructorChange = selectedOption => {
    setInstructor({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };
  const handleRoomChange = selectedOption => {
    setRoom({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };

  console.log(block, instructor, room);

  return (
    <div className="sidebar">
      <h1 style={{ color: 'white', fontWeight: '600' }}>Calendar Week</h1>
      <div className="selects">
        <Select
          placeholder="Filter Room..."
          className="select"
          options={roomOptions}
          onChange={handleRoomChange}
        />
        <Select
          placeholder="Filter Instructor..."
          className="select"
          options={instructorOptions}
          onChange={handleInstructorChange}
        />
        <Select
          placeholder="Filter Block..."
          className="select"
          options={blockOptions}
          onChange={handleBlockChange}
        />
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
