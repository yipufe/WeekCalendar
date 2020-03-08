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
        setInitialData(resData);
        setDisplayData(resData);
        const roomArray = [];
        const instructorArray = [];
        const blockArray = [];
        for (let item of resData) {
          if (roomArray.length <= 0) {
            roomArray.push(item['Building and Room']);
          }
          if (!roomArray.includes(item['Building and Room'])) {
            roomArray.push(item['Building and Room']);
          }
          if (instructorArray.length <= 0) {
            instructorArray.push(item.Instructor);
          }
          if (!instructorArray.includes(item.Instructor)) {
            instructorArray.push(item.Instructor);
          }
          if (blockArray.length <= 0) {
            blockArray.push(item['Part of Term']);
          }
          if (!blockArray.includes(item['Part of Term'])) {
            blockArray.push(item['Part of Term']);
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
        setRoom(roomOptions);
        setInstructor(instructorOptions);
        setBlock(blockOptions);
      })
      .catch(err => console.log(err));
  };

  const handleBlockChange = selectedOption => {
    console.log(`Option selected:`, selectedOption);
    const blockFilteredData = initialData.filter(
      item => item['Part of Term'] === selectedOption.value
    );
    setDisplayData(blockFilteredData);
  };
  const handleInstructorChange = selectedOption => {
    console.log(`Option selected:`, selectedOption);
    const instructorFilteredData = initialData.filter(
      item => item.Instructor === selectedOption.value
    );
    setDisplayData(instructorFilteredData);
  };
  const handleRoomChange = selectedOption => {
    console.log(`Option selected:`, selectedOption);
    const roomFilteredData = initialData.filter(
      item => item['Building and Room'] === selectedOption.value
    );
    setDisplayData(roomFilteredData);
  };

  const clearRoomValue = () => null;
  const clearInstructorValue = () => null;
  const clearBlockValue = () => null;

  const clearFilters = () => {
    setDisplayData(initialData);
  };

  console.log(initialData);
  console.log(block, instructor, room);

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
        clearRoomValue={clearRoomValue}
        clearInstructorValue={clearInstructorValue}
        clearBlockValue={clearBlockValue}
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
