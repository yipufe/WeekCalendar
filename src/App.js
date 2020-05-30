import React, { useState } from 'react';
import './app.scss';
import Calendar from './Components/Calendar/Calendar';
import Sidebar from './Components/Sidebar/Sidebar';
import Header from './Components/Header/Header';
import Nav from './Components/Nav/Nav';
import Footer from './Components/Footer/Footer';

function App() {
  // All of these useState items are the states or data for different parts of the calendar.
  // This App component is the parent component to all of the other components.
  // We have all the data and functions here and then we pass them to the child components through props.
  const [displayData, setDisplayData] = useState([]);
  const [initialData, setInitialData] = useState([]);
  const [file, setFile] = useState('');
  const [course, setCourse] = useState([]);
  const [courseValue, setCourseValue] = useState([]);
  const [room, setRoom] = useState([]);
  const [roomValue, setRoomValue] = useState([]);
  const [instructor, setInstructor] = useState([]);
  const [instructorValue, setInstructorValue] = useState([]);
  const [block, setBlock] = useState([]);
  const [blockValue, setBlockValue] = useState([]);

  // This function is for when the user uploads a file it stores the file in the file state.
  const handleChange = (e) => {
    const file = e.target.files[0]; // accessing file
    setFile(file); // storing file
    console.log(file);
  };

  /*
    This function is the main function that actually uploads the file to the server,
    then the function receives the response data (resData)
  */
  const csvFileHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('csvfile', file);
    let url = 'https://schedge.dev/calendar/postcsv';
    let method = 'POST';

    fetch(url, {
      method: method,
      body: formData,
    })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error('Uploading file failed!');
        }
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        // These are all the empty arrays that will be filled with data after filtering through the resData.
        const dataArray = [];
        const roomArray = [];
        const instructorArray = [];
        const blockArray = [];
        const courseArray = [];
        // This for loop is for filtering through the data and getting rid of all the heading rows and columns in the csv file.
        for (let item of resData) {
          if (item.field2 && item.field2 !== 'CLSS ID') {
            // This pushes the classes into the dataArray state.
            dataArray.push({
              courseTitle: item.field11,
              instructor: item.field16.split(' (')[0],
              meetingPattern: item.field14,
              location: item.field17,
              block: item.field19,
              creditHours: item.field27,
              classId: item.field2,
            });
          }
        }
        console.log(dataArray);
        // This for loop loops through the dataArray and pushes the correct data into each of the different useState data arrays.
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
          if (courseArray.length <= 0) {
            courseArray.push(item.courseTitle);
          }
          if (!courseArray.includes(item.courseTitle)) {
            courseArray.push(item.courseTitle);
          }
        }
        // These variables are for the filter dropdown options.
        // They filter through the specific arrays for each filter and add the correct data for the value and label in the object.
        const courseOptions = courseArray.sort().map((item) => {
          return {
            value: item,
            label: item,
          };
        });
        const roomOptions = roomArray.sort().map((item) => {
          return {
            value: item,
            label: item,
          };
        });
        const instructorOptions = instructorArray.sort().map((item) => {
          return {
            value: item,
            label: item,
          };
        });
        const blockOptions = blockArray.sort().map((item) => {
          return {
            value: item,
            label: item,
          };
        });
        // These then set the useState variables with the correct data to be used elsewhere in the app.
        setInitialData(dataArray);
        setDisplayData(dataArray);
        setCourse(courseOptions);
        setRoom(roomOptions);
        setInstructor(instructorOptions);
        setBlock(blockOptions);
      })
      .catch((err) => console.log(err));
  };

  // Each of these handle change functions are for when the user selects something in the filters.
  // Whena  user selects something it filters through the specific filter data and sets the specific useStates with the new filtered data.
  // Each function also resets the other filters back to 0.
  const handleBlockChange = (selectedOption) => {
    console.log(`Option selected:`, selectedOption);
    const blockFilteredData = initialData.filter(
      (item) => item.block === selectedOption.value
    );
    setDisplayData(blockFilteredData);
    setBlockValue(selectedOption);
    setCourseValue({ label: 'Filter Course...', value: 0 });
    setInstructorValue({ label: 'Filter Instructor...', value: 0 });
    setRoomValue({ label: 'Filter Room...', value: 0 });
  };
  const handleInstructorChange = (selectedOption) => {
    console.log(`Option selected:`, selectedOption);
    const instructorFilteredData = initialData.filter(
      (item) => item.instructor === selectedOption.value
    );
    setDisplayData(instructorFilteredData);
    setInstructorValue(selectedOption);
    setCourseValue({ label: 'Filter Course...', value: 0 });
    setBlockValue({ label: 'Filter Block...', value: 0 });
    setRoomValue({ label: 'Filter Room...', value: 0 });
  };
  const handleRoomChange = (selectedOption) => {
    console.log(`Option selected:`, selectedOption);
    const roomFilteredData = initialData.filter(
      (item) => item.location === selectedOption.value
    );
    setDisplayData(roomFilteredData);
    setRoomValue(selectedOption);
    setCourseValue({ label: 'Filter Course...', value: 0 });
    setInstructorValue({ label: 'Filter Instructor...', value: 0 });
    setBlockValue({ label: 'Filter Block...', value: 0 });
  };
  const handleCourseChange = (selectedOption) => {
    console.log(`Option selected:`, selectedOption);
    const courseFilteredData = initialData.filter(
      (item) => item.courseTitle === selectedOption.value
    );
    setDisplayData(courseFilteredData);
    setCourseValue(selectedOption);
    setRoomValue({ label: 'Filter Room...', value: 0 });
    setInstructorValue({ label: 'Filter Instructor...', value: 0 });
    setBlockValue({ label: 'Filter Block...', value: 0 });
  };

  const clearFilters = () => {
    setDisplayData(initialData);
    setCourseValue({ label: 'Filter Course...', value: 0 });
    setRoomValue({ label: 'Filter Room...', value: 0 });
    setInstructorValue({ label: 'Filter Instructor...', value: 0 });
    setBlockValue({ label: 'Filter Block...', value: 0 });
  };

  // console.log(initialData);
  // console.log(block, instructor, room);

  return (
    <div className="App">
      <Header />
      <Nav />
      <div className="app-body">
        <Sidebar
          fileHandler={csvFileHandler}
          handleChange={handleChange}
          course={course}
          courseValue={courseValue}
          room={room}
          roomValue={roomValue}
          instructor={instructor}
          instructorValue={instructorValue}
          block={block}
          blockValue={blockValue}
          handleBlockChange={handleBlockChange}
          handleInstructorChange={handleInstructorChange}
          handleRoomChange={handleRoomChange}
          handleCourseChange={handleCourseChange}
          clearFilters={clearFilters}
        />
        <Calendar
          initialData={initialData}
          setInitialData={setInitialData}
          displayData={displayData}
          setDisplayData={setDisplayData}
        />
      </div>
      <Footer />
    </div>
  );
}

export default App;
