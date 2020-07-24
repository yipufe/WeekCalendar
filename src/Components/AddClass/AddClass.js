import React, { useState } from 'react';
import './addClass.scss';
import Select from 'react-select';
import { selectDays, selectTimes } from '../../calendarDaysAndTimesData';

export default function AddClass(props) {
  const { initialAndChangedData, setInitialAndChangedData } = props;
  const [schedule, setSchedule] = useState('');
  const [addClassFormError, setAddClassFormError] = useState(false);

  const {
    handleAddClass,
    addClassData,
    setOpenAddClassModal,
    setAddClassData,
    setAddClassSuccess,
  } = props;

  const handleSetDays = (selected) => {
    setSchedule(selected.value);
  };
  const handleSetStartTime = (selected) => {
    setSchedule(schedule.split(' ')[0] + ' ' + selected.value);
  };
  const handleSetEndTime = (selected) => {
    setAddClassData({
      ...addClassData,
      meetingPattern: schedule.includes('-')
        ? schedule.split('-')[0] + '-' + selected.value
        : schedule + '-' + selected.value,
    });
  };




  //Same room at same time error checking
  const allTimes = []
  const timeObj = () => {
    //Location
    let locations = initialAndChangedData.map(obj => {
      let joinLocation = obj.location.split(' ').join('').toLowerCase()
      return joinLocation
    })

    //START TIMES
    let startTimes = initialAndChangedData.map(obj => {
      let splitTime = obj.meetingPattern.split('-')
      let splitDays = splitTime[0].split(' ')
      let combinedDaysTime = splitDays.concat(splitTime[1])

      //split the times into 'time','p','m' for starting
      let splitStartTime = combinedDaysTime[1].split(/([ap])/i)

      //start times to number
      let splitStartHourMinute = splitStartTime[0].split(':')
      console.log("splitStartHourMinute = ", splitStartHourMinute)

      let paddedNum

      if(splitStartHourMinute[0].length === 1){
        // console.log('splitStartHourMinute first =', splitStartHourMinute[0])
        // console.log('splitStartHourMinute first length =', splitStartHourMinute[0].length)
        let splitStartHourMinuteNumber = splitStartHourMinute.map(num => {
          return Number(num)
        })
        
        paddedNum =  Number(splitStartHourMinuteNumber.join('').padEnd(3, 0))

      }else if (splitStartHourMinute[0].length === 2){
        // console.log('splitStartHourMinute first =', splitStartHourMinute[0])
        // console.log('splitStartHourMinute first length =', splitStartHourMinute[0].length)
        let splitStartHourMinuteNumber = splitStartHourMinute.map(num => {
          return Number(num)
        })

        paddedNum = Number(splitStartHourMinuteNumber.join('').padEnd(4, 0))
      }else{
        paddedNum = NaN
      }

      console.log('padded Num = ', paddedNum)
      return paddedNum
    })

    //START PM or AM
    let startAMPM = initialAndChangedData.map(obj => {
      let splitTime = obj.meetingPattern.split('-')
      let splitDays = splitTime[0].split(' ')
      let combinedDaysTime = splitDays.concat(splitTime[1])

      //split the times into 'time','p','m' for starting
      let splitStartTime = combinedDaysTime[1].split(/([ap])/i)
      return splitStartTime[1]
    })

    //END TIMES
    let endTimes = initialAndChangedData.map(obj => {
      let splitTime = obj.meetingPattern.split('-')
      let splitDays = splitTime[0].split(' ')
      let combinedDaysTime = splitDays.concat(splitTime[1])

      //split the times into 'time','p','m' for ending time
      let splitEndTime = combinedDaysTime[2].split(/([ap])/i)

      //end times to number
      let splitEndHourMinute = splitEndTime[0].split(':')
      let paddedNum

      if(splitEndHourMinute[0].length === 1){
        // console.log('splitEndHourMinute first =', splitEndHourMinute[0])
        // console.log('splitEndHourMinute first length =', splitEndHourMinute[0].length)
        let splitEndHourMinuteNumber = splitEndHourMinute.map(num => {
          return Number(num)
        })
        paddedNum =  Number(splitEndHourMinuteNumber.join('').padEnd(3, 0))

      }else if (splitEndHourMinute[0].length === 2){
        // console.log('splitEndHourMinute first =', splitEndHourMinute[0])
        // console.log('splitEndHourMinute first length =', splitEndHourMinute[0].length)
        let splitEndHourMinuteNumber = splitEndHourMinute.map(num => {
          return Number(num)
        })

        paddedNum = Number(splitEndHourMinuteNumber.join('').padEnd(4, 0))
      }else{
        paddedNum = NaN
      }

      // console.log('padded Num = ', paddedNum)
      return paddedNum
    })

    //End PM or AM
    let endAMPM = initialAndChangedData.map(obj => {
      let splitTime = obj.meetingPattern.split('-')
      let splitDays = splitTime[0].split(' ')
      let combinedDaysTime = splitDays.concat(splitTime[1])

      //split the times into 'time','p','m' for ending time
      let splitEndTime = combinedDaysTime[2].split(/([ap])/i)
      return splitEndTime[1]
    })

    //Days of Week
    let weekDays = initialAndChangedData.map(obj => {
      let splitTime = obj.meetingPattern.split('-')
      let splitDays = splitTime[0].split(' ')
      return splitDays[0].toLowerCase()
    })

    //Convert array to array of objects
    let items = startTimes.map((time, index) => {
      let newSTime
      let newETime
      if(startAMPM[index] === "p"){
        
        newSTime = (Number(time.toString().padEnd(4, 0))) * 100
      }else {
        newSTime = time
      }
      if(endAMPM[index] === "p"){
        newETime = (Number(endTimes[index].toString().padEnd(4, 0))) * 100
      }else {
        newETime = endTimes[index]
      }
      return {
        location: locations[index],
        endampm: endAMPM[index],
        endTime: newETime,
        startampm: startAMPM[index],
        startTime: newSTime,
        days: weekDays[index]
      }
    })
    
    allTimes.push(items)
  }
  timeObj()

  console.log('alltimes = ', allTimes)








  //New added class selection to an object
  const addClassObj = (str) => {
    console.log('inside addClassObj ', str)

    let splitTime = str.split('-')
    let splitDays = splitTime[0].split(' ')
    let combinedDaysTime = splitDays.concat(splitTime[1])

    //split the times into 'time','p','m' for starting
    let splitStartTime = combinedDaysTime[1].split(/([ap])/i)

    //start times to number
    let splitStartHourMinute = splitStartTime[0].split(':')


    let startTime
    if(splitStartHourMinute[0].length === 1){
      // console.log('splitStartHourMinute first =', splitStartHourMinute[0])
      // console.log('splitStartHourMinute first length =', splitStartHourMinute[0].length)
      let splitStartHourMinuteNumber = splitStartHourMinute.map(num => {
        return Number(num)
      })
      startTime =  Number(splitStartHourMinuteNumber.join('').padEnd(3, 0))//End Time

    }else if (splitStartHourMinute[0].length === 2){
      // console.log('splitStartHourMinute first =', splitStartHourMinute[0])
      // console.log('splitStartHourMinute first length =', splitStartHourMinute[0].length)
      let splitStartHourMinuteNumber = splitStartHourMinute.map(num => {
        return Number(num)
      })

      startTime = Number(splitStartHourMinuteNumber.join('').padEnd(4, 0))//StartTime
    }else{
      startTime = NaN
    }
    console.log('startTime = ', startTime)


    const startAMPM = splitStartTime[1]//Start AM PM
    console.log('startAMPM = ', startAMPM)


    //split the times into 'time','p','m' for ending time
    let splitEndTime = combinedDaysTime[2].split(/([ap])/i)

    //end times to number
    let splitEndHourMinute = splitEndTime[0].split(':')
    
    let endTime
    if(splitEndHourMinute[0].length === 1){
      // console.log('splitEndHourMinute first =', splitEndHourMinute[0])
      // console.log('splitEndHourMinute first length =', splitEndHourMinute[0].length)
      let splitEndHourMinuteNumber = splitEndHourMinute.map(num => {
        return Number(num)
      })
      endTime =  Number(splitEndHourMinuteNumber.join('').padEnd(3, 0))//End Time

    }else if (splitEndHourMinute[0].length === 2){
      // console.log('splitEndHourMinute first =', splitEndHourMinute[0])
      // console.log('splitEndHourMinute first length =', splitEndHourMinute[0].length)
      let splitEndHourMinuteNumber = splitEndHourMinute.map(num => {
        return Number(num)
      })

      endTime = Number(splitEndHourMinuteNumber.join('').padEnd(4, 0))//End Time
    }else{
      endTime = NaN
    }
    console.log('endTime = ', endTime)



    const endAMPM = splitEndTime[1]//End AM PM
    console.log('end am pm = ', endAMPM)

    
    const weekDays =  splitDays[0].toLowerCase()//weekDays
    console.log('weekdays = ', weekDays)

    //variables to change start time if they are pm
    let newSTime
    let newETime
    if(startAMPM === "p"){
      newSTime = (Number(startTime.toString().padEnd(4, 0))) * 100
    }else {
      newSTime = startTime
    }
    if(endAMPM === "p"){
      newETime = (Number(endTime.toString().padEnd(4, 0))) * 100
    }else {
      newETime = endTime
    }
    //return object to make error checking easier
    return {
      endampm: endAMPM,
      endTime: newETime,
      startampm: startAMPM,
      startTime: newSTime,
      days: weekDays
    }
}


  //Final conflict check
  const conflictCheck = () => {
    let conflict = false
    const newLocation = addClassData.location.split(' ').join('').toLowerCase()
    const ourNewAddedTime = addClassObj(addClassData.meetingPattern)
    console.log("our new added time = ", ourNewAddedTime)

    console.log('inside of error check')


    allTimes[0].forEach(obj => {
      if(obj.location === newLocation) {
        if(obj.days.includes(ourNewAddedTime.days)){
          console.log('yes it includes the same day')
          if(obj.startTime < ourNewAddedTime.startTime && obj.endTime < ourNewAddedTime.startTime){
            console.log('no conflicts, start times are less')
          }else if(obj.startTime > ourNewAddedTime.endTime && obj.endTime > ourNewAddedTime.endTime){
            console.log('no conflicts, start times are greater')
          }else{
            console.log('TIME CONFLICT*********************', obj)
            console.log('new added time', ourNewAddedTime)
            return conflict = true
          }
        }else{
          console.log('no time conflicts DAYS Included ')
        }
      }else {
        console.log('no time conflicts LOCATION')
      }

    })
    //close the modal and save class if no errors
    conflict === true ? alert('Room time conflicts') : setOpenAddClassModal(false);
  }









  

  return (
    <div className="add-class-modal-wrap">
      <div className="add-class-modal-header">
        <h2>New Class</h2>
      </div>
      <div className="add-class-body">
        <div className="add-class-left-section">
          <h3>Section Information</h3>
          <div className="left-section-item">
            <p className="left-section-label">Prefix & Number</p>
            <input type="text" name="course" onChange={handleAddClass} />
          </div>
          <div className="left-section-item">
            <p className="left-section-label">Title</p>
            <input type="text" name="courseTitle" onChange={handleAddClass} />
          </div>
          <div className="left-section-item">
            <p className="left-section-label">Section</p>
            <input type="text" name="section" onChange={handleAddClass} />
          </div>
          <div className="left-section-item">
            <p className="left-section-label">Credit Hours</p>
            <input type="text" name="creditHours" onChange={handleAddClass} />
          </div>
          <div className="left-section-item">
            <p className="left-section-label">Status</p>
            <input type="text" name="status" onChange={handleAddClass} />
          </div>
          <div className="left-section-item">
            <p className="left-section-label">Special Approval</p>
            <input
              type="text"
              name="specialApproval"
              onChange={handleAddClass}
            />
          </div>
          <div className="left-section-item">
            <p className="left-section-label">Grade Mode</p>
            <input type="text" name="gradeMode" onChange={handleAddClass} />
          </div>
          <div className="left-section-item">
            <p className="left-section-label">Cross List With</p>
            <input type="text" name="crossListWith" onChange={handleAddClass} />
          </div>
          <div className="left-section-item">
            <p className="left-section-label">Part of Term</p>
            <input type="text" name="block" onChange={handleAddClass} />
          </div>
          <div className="left-section-item">
            <p className="left-section-label">Campus</p>
            <input type="text" name="campus" onChange={handleAddClass} />
          </div>
          <div className="left-section-item">
            <p className="left-section-label">Instruction Method</p>
            <input
              type="text"
              name="instructionMethod"
              onChange={handleAddClass}
            />
          </div>
          <div className="left-section-item">
            <p className="left-section-label">Visable</p>
            <input type="text" name="visible" onChange={handleAddClass} />
          </div>
          <div className="left-section-item">
            <p className="left-section-label">Schedule Type</p>
            <input type="text" name="scheduleType" onChange={handleAddClass} />
          </div>
          <div className="left-section-item">
            <p className="left-section-label">Session</p>
            <input type="text" name="session" onChange={handleAddClass} />
          </div>
        </div>

        <div className="add-class-right-section">
          <div className="right-section-item">
            <h3>Section Attributes</h3>
            <input
              type="text"
              name="sectionAttributes"
              onChange={handleAddClass}
            />
          </div>
          <div className="right-section-item">
            <h3>Course Attributes</h3>
            <input
              type="text"
              name="courseAttributes"
              onChange={handleAddClass}
            />
          </div>
          <div className="right-section-item">
            <h3>Instructor</h3>
            <input
              type="text"
              placeholder="e.g. Hatch, Daniel (12345678)"
              name="instructor"
              onChange={handleAddClass}
            />
          </div>
          <div className="right-section-item">
            <h3>Building and Room</h3>
            <input
              type="text"
              placeholder="e.g. CS 406"
              name="location"
              onChange={handleAddClass}
            />
          </div>
          <div className="right-section-item">
            <h3>Schedule</h3>
            <div className="schedule-selects">
              <Select
                name="schedule-days"
                options={selectDays}
                className="schedule-select"
                placeholder="Days"
                onChange={handleSetDays}
              />
              <Select
                name="schedule-start-time"
                options={selectTimes}
                className="schedule-select"
                placeholder="Start Time"
                onChange={handleSetStartTime}
              />
              <Select
                name="schedule-end-time"
                options={selectTimes}
                className="schedule-select"
                placeholder="End Time"
                onChange={handleSetEndTime}
              />
            </div>
          </div>
          <div className="right-section-item">
            <h3>Enrollment</h3>
            <div className="enrollment-section">
              <label htmlFor="maxEnrollment">
                Maximum
                <input
                  type="text"
                  id="maxEnrollment"
                  name="maxEnrollment"
                  onChange={handleAddClass}
                />
              </label>
              <label htmlFor="maxWaitlistEnrollment">
                Waitlist Max.
                <input
                  type="text"
                  id="maxWaitlistEnrollment"
                  name="maxWaitlistEnrollment"
                  onChange={handleAddClass}
                />
              </label>
            </div>
          </div>
          <div className="right-section-item">
            <h3>Section Text</h3>
            <input type="text" name="sectionText" onChange={handleAddClass} />
          </div>
          <div className="right-section-item">
            <h3>Comments</h3>
            <textarea
              type="text"
              rows="3"
              name="sectionComments"
              onChange={handleAddClass}
            />
          </div>
          {addClassFormError && (
            <div className="add-class-form-error">
              ** All fields must be filled out **
            </div>
          )}
        </div>
      </div>
      <div className="add-class-btns">
        <button
          className="add-class-cancel-btn"
          onClick={() => setOpenAddClassModal(false)}
        >
          Cancel
        </button>
        <button
          className="add-class-save-btn"
          onClick={() => {
            conflictCheck() //check for errors

            // if (Object.keys(addClassData).length === 23) {
            //   setInitialAndChangedData([
            //     ...initialAndChangedData,
            //     addClassData,
            //   ]);
            //   setAddClassSuccess(true);
            //   setAddClassFormError(false);
            // } else {
            //   setAddClassSuccess(true); //delete this
            //   // setAddClassFormError(true); //add this back in
            // }
          }}
        >
          Save Section
        </button>
      </div>
    </div>
  );
}
