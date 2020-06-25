import React, { useState } from 'react';
import './app.scss';
import Calendar from './Components/Calendar/Calendar';
import Sidebar from './Components/Sidebar/Sidebar';
import Header from './Components/Header/Header';
import Nav from './Components/Nav/Nav';
import Footer from './Components/Footer/Footer';

import Modal from 'react-modal';
import ClassModal from './Components/ClassModal/classmodal';
Modal.setAppElement('#root');  //Bind modal to app element
const classModalShellStyle = {
  content: {
    padding: '0px',
    bottom: 'auto',
    marginRight: 'auto',
    marginLeft: 'auto',
    width: '800px',
  }
}


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

  const [classModalIsOpen, setClassModalIsOpen] = useState(false);
  const [classModalData, setClassModalData] = useState({});
  
  //Convert 24hour time to 12hour time were 09:00 would be 9am and 09:01 would be 9:01am
  function convertTime(time24Hour) {
    let meridiem = 'am';
    let [hour, minute] = time24Hour.split(':');
    hour = parseInt(hour);
    minute = parseInt(minute);

    if(hour>=12) {
      hour-=12;
      meridiem = 'pm';
    }
    if(hour===0)
      hour=12;
    if(minute===0) {
      return hour+meridiem;
    }
    if(minute<10)
      minute = "0"+minute;
    return hour+":"+minute+meridiem;
  }

  //Orders days in order they appear in the week
  //Example: gets "SaWR" Returns "WRSa"
  function orderDays(days) {
    const dayLookup = {
      'M':0,
      'T':1,
      'W':2,
      'R':3,
      'F':4,
      'S':5,
    }
    days = days.replace('a', '');
    const daysArray = days.split('');
    daysArray.sort((a,b)=>{
      return dayLookup[a]-dayLookup[b]
    })
    days = daysArray.join('');
    days = days.replace('S', 'Sa');
    return days;
  }

  //Called when class information changes in the modal due to the user changing an input field
  //Uses the input id to identify what value is changing
  function changeClassModal(event) {
    //Look up table for inputs and the associated key in classModalData
    const classModalFieldLookup = {
      "course-title":"courseTitle",
      "course-number":"course",
      "course-instructor":"instructor",
      "course-location":"location",
      "course-credits":"creditHours",
    }
    const id = event.target.id;
    const value = event.target.value;
    const checked = event.target.checked;

    const newClassModalData = {...classModalData};

    if(id==="course-time-start") {
      const timeStr = convertTime(value)
      const [days, timeRange] = classModalData.meetingPattern.split(' ');
      const endTime = timeRange.split('-')[1];
      newClassModalData.meetingPattern = days+" "+timeStr+"-"+endTime;

    } else if(id==="course-time-end") {
      const timeStr = convertTime(value)
      const [days, timeRange] = classModalData.meetingPattern.split(' ');
      const startTime = timeRange.split('-')[0];
      newClassModalData.meetingPattern = days+" "+startTime+"-"+timeStr;

    } else if(id.substring(0,10)==="course-day") {
      const day = id.substring(11);
      let [days, timeRange] = classModalData.meetingPattern.split(' ');
      if(checked) {
        days += day;
        days = orderDays(days);
      } else {
        days = days.replace(day,"");
      }
      newClassModalData.meetingPattern = days+" "+timeRange;

    } else {
      newClassModalData[classModalFieldLookup[id]]=value;
    }

    setClassModalData(newClassModalData);
  }

  //Opens Modal with appropriate class information
  function openClassModal(classId) { 
    const courseForModalDisplay = initialData.find(item=>{
      return item.classId === classId;
    });

    setClassModalData(courseForModalDisplay)    
    setClassModalIsOpen(true); 
  }
  function closeClassModal() { setClassModalIsOpen(false); }




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
              course: item.field9,
            });
          }
        }
        console.log(dataArray);
        // This for loop loops through the dataArray and pushes the correct data into each of the different useState data arrays.
        for (let item of dataArray) {
          if (roomArray.length <= 0) {
            const room = item.location.split(';')[0]; //Remove extra information after the semicolon
            roomArray.push(room);
          }
          if (!roomArray.includes(item.location)) {
            const room = item.location.split(';')[0]; //Remove extra information after the semicolon
            roomArray.push(room);
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
            courseArray.push({
              courseNumber: item.course,
              courseTitle: item.courseTitle,
            });
          }
          if (!courseArray.includes(item.courseTitle)) {
            courseArray.push({
              courseNumber: item.course,
              courseTitle: item.courseTitle,
            });
          }
        }

        //Remove duplicates from courseArray
        const courseArrayUnique = courseArray.filter((item, index, self) => {
          return (
            index ===
            self.findIndex((t) => {
              //This will return the first index match so will be false for duplicates
              return (
                t.courseNumber === item.courseNumber &&
                t.courseTitle === item.courseTitle
              ); //Finds index where this condition is true
            })
          );
        });
        //Remove duplicates from roomArray
        const roomArrayUnique = roomArray.filter((item, index, self) => {
          return (
            index ===
            self.findIndex((t) => {
              //This will return the first index match so will be false for duplicates
              return t === item; //Finds index where this condition is true
            })
          );
        });

        // These variables are for the filter dropdown options.
        // They filter through the specific arrays for each filter and add the correct data for the value and label in the object.
        const courseOptions = courseArrayUnique.sort().map((item) => {
          return {
            value: item.courseTitle,
            label: item.courseNumber + ' ' + item.courseTitle,
          };
        });
        const roomOptions = roomArrayUnique.sort().map((item) => {
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

  // Each of these handle change functions do the same thing for each filter and are for when the user selects something in the filters.
  // When a user selects something it filters through the specific filter data and sets the specific useState with the new filtered data.
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
    const roomFilteredData = initialData.filter((item) => {
      /* SelectedOption.value will be only the room number such as "CS 406" and
        item.location will be the room number and may include details after such
        as "CS 406; Online Online"
        This will select all items that have the same room number in the front of the string*/
      return item.location.split(';')[0] === selectedOption.value;
    });
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
  const handleResetCalendar = () => {
    setFile('');
    setBlock([]);
    setBlockValue([]);
    setCourse([]);
    setCourseValue([]);
    setInstructor([]);
    setInstructorValue([]);
    setRoom([]);
    setRoomValue([]);
    setInitialData([]);
    setDisplayData([]);
  };

  return (
    <div className="App">
      <Modal
        isOpen={classModalIsOpen}
        onRequestClose={closeClassModal}
        style={classModalShellStyle}
      >
        <ClassModal 
          closeClassModal={closeClassModal}
          classModalData={classModalData}
          changed={changeClassModal}
        />
      </Modal>
      <Header />
      <Nav />
      <div className="app-body">
        <Sidebar
          // These are all of the props that are being sent to the Sidebar component
          fileHandler={csvFileHandler}
          handleChange={handleChange}
          course={course}
          courseValue={courseValue}
          courseAndNumber={course}
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
          setFile={setFile}
          setDisplayData={setDisplayData}
          setInitialData={setInitialData}
          handleResetCalendar={handleResetCalendar}
        />
        <Calendar
          // These are all the props being sent to the Calendar component
          initialData={initialData}
          setInitialData={setInitialData}
          displayData={displayData}
          setDisplayData={setDisplayData}
          openClassModal={openClassModal}
        />
      </div>
      <Footer />
    </div>
  );
}

export default App;
