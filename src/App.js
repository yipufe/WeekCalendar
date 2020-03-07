import React, { useState, useEffect } from 'react';
import './app.scss';
import Calendar from './Components/Calendar/Calendar';
import Sidebar from './Components/Sidebar/Sidebar';

function App() {
  const [displayData, setDisplayData] = useState([]);
  const [initialData, setInitialData] = useState([]);
  const [file, setFile] = useState('');
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

  const handleChange = e => {
    const file = e.target.files[0]; // accesing file
    // console.log(file);
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
      })
      .catch(err => console.log(err));
  };

  console.log(initialData);

  return (
    <div className="App">
      <Sidebar fileHandler={csvFileHandler} handleChange={handleChange} />
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
