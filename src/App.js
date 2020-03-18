import React, { useState, useEffect } from 'react';
import './app.scss';
import Calendar from './Components/Calendar/Calendar';
import Sidebar from './Components/Sidebar/Sidebar';

function App() {
  const [displayData, setDisplayData] = useState([]);
  const [initialData, setInitialData] = useState([]);
  const [file, setFile] = useState('');
  const [block, setBlock] = useState([]);
  const [instructor, setInstructor] = useState([]);
  const [room, setRoom] = useState([]);
  const [blockValue, setBlockValue] = useState([]);
  const [instructorValue, setInstructorValue] = useState([]);
  const [roomValue, setRoomValue] = useState([]);

  const handleChange = e => {
    const file = e.target.files[0]; // accesing file
    setFile(file); // storing file
  };

  const csvFileHandler = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('csvfile', file);
    let url = 'http://localhost:8080/calendar/postcsv';
    let method = 'POST';

    fetch(url, {
      method: method,
      body: formData
    })
      .then(res => {
        if (res.status !== 200) {
          throw new Error('Uploading file failed!');
        }
        return res.json();
      })
      .then(resData => {
        console.log(resData);
        const dataArray = [];
        const roomArray = [];
        const instructorArray = [];
        const blockArray = [];
        for (let item of resData) {
          if (item.field2 && item.field2 !== 'CLSS ID') {
            dataArray.push({
              courseTitle: item.field11,
              instructor: item.field16.split(' (')[0],
              meetingPattern: item.field14,
              location: item.field17,
              block: item.field19,
              creditHours: item.field27,
              classId: item.field2
            });
          }
        }
        console.log(dataArray);
        for (let item of dataArray) {
          if (roomArray.length <= 0) {
            roomArray.push(item.location);
          }
          if (!roomArray.includes(item.location)) {
            roomArray.push(item.location);
          }
          if (instructorArray.length <= 0) {
            instructorArray.push(item.instructor);
          }
          if (!instructorArray.includes(item.instructor)) {
            instructorArray.push(item.instructor);
          }
          if (blockArray.length <= 0) {
            blockArray.push(item.block);
          }
          if (!blockArray.includes(item.block)) {
            blockArray.push(item.block);
          }
        }
        const roomOptions = roomArray.sort().map(item => {
          return {
            value: item,
            label: item
          };
        });
        const instructorOptions = instructorArray.sort().map(item => {
          return {
            value: item,
            label: item
          };
        });
        const blockOptions = blockArray.sort().map(item => {
          return {
            value: item,
            label: item
          };
        });
        setInitialData(dataArray);
        setDisplayData(dataArray);
        setRoom(roomOptions);
        setInstructor(instructorOptions);
        setBlock(blockOptions);
      })
      .catch(err => console.log(err));
  };

  const handleBlockChange = selectedOption => {
    console.log(`Option selected:`, selectedOption);
    const blockFilteredData = initialData.filter(
      item => item.block === selectedOption.value
    );
    setDisplayData(blockFilteredData);
    setBlockValue(selectedOption);
    setInstructorValue({ label: 'Filter Instructor...', value: 0 });
    setRoomValue({ label: 'Filter Room...', value: 0 });
  };
  const handleInstructorChange = selectedOption => {
    console.log(`Option selected:`, selectedOption);
    const instructorFilteredData = initialData.filter(
      item => item.instructor === selectedOption.value
    );
    setDisplayData(instructorFilteredData);
    setInstructorValue(selectedOption);
    setBlockValue({ label: 'Filter Block...', value: 0 });
    setRoomValue({ label: 'Filter Room...', value: 0 });
  };
  const handleRoomChange = selectedOption => {
    console.log(`Option selected:`, selectedOption);
    const roomFilteredData = initialData.filter(
      item => item.location === selectedOption.value
    );
    setDisplayData(roomFilteredData);
    setRoomValue(selectedOption);
    setInstructorValue({ label: 'Filter Instructor...', value: 0 });
    setBlockValue({ label: 'Filter Block...', value: 0 });
  };

  const clearFilters = () => {
    setDisplayData(initialData);
    setRoomValue({ label: 'Filter Room...', value: 0 });
    setInstructorValue({ label: 'Filter Instructor...', value: 0 });
    setBlockValue({ label: 'Filter Block...', value: 0 });
  };

  // console.log(initialData);
  // console.log(block, instructor, room);

  return (
    <div className="App">
      <Sidebar
        fileHandler={csvFileHandler}
        handleChange={handleChange}
        block={block}
        instructor={instructor}
        room={room}
        handleBlockChange={handleBlockChange}
        handleInstructorChange={handleInstructorChange}
        handleRoomChange={handleRoomChange}
        clearFilters={clearFilters}
        blockValue={blockValue}
        instructorValue={instructorValue}
        roomValue={roomValue}
      />
      <Calendar
        initialData={initialData}
        setInitialData={setInitialData}
        displayData={displayData}
        setDisplayData={setDisplayData}
      />
    </div>
  );
}

export default App;
