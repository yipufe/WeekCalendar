import React from 'react';
import './classmodal.scss';
import ClassModalDays from './classModalDays'

function ClassModal(props) {
    const {meetingPattern} = props.classModalData;
    //console.log(meetingPattern);
    const [days, timeSpan] = meetingPattern.split(' ');  //Get days and time span
    const [startTime12Hour, endTime12Hour] = timeSpan.split('-');
    const startTime24Hour = convertTime24Hour(startTime12Hour);
    const endTime24Hour = convertTime24Hour(endTime12Hour);

    //Convert 12 hour to 24 hour time
    function convertTime24Hour(time12Hour) {
        let hour, minute, meridiem;

        //Seperate out hour, minute, and meridiem
        if(time12Hour.indexOf(':')>-1) {
            hour = time12Hour.split(':')[0];
            minute = time12Hour.split(':')[1];
            meridiem = minute.substring(2);
            minute = minute.substring(0,2);            
        } else {
            if(time12Hour.length === 3)
                time12Hour = '0'+time12Hour;
            hour = time12Hour.substring(0,2);
            meridiem = time12Hour.substring(2);
            minute = '00';
        }

        //Convert hour to 24 hour time
        if(hour === '12')
            hour = '0';
        hour = parseInt(hour);
        if(meridiem === 'pm')
            hour += 12;
        hour = hour.toString();
        if(hour.length === 1)
            hour = '0'+hour;

        return hour+":"+minute;
    }

    return (
        <div className="modalContentsShell">
            <h1 className="modalTitle">Class Details</h1>
            <div className="modalFormContainer">
                <h2>Section Information</h2>
                <form>
                    <div className="modalColumnContainer">
                        <div className="col">
                            <label htmlFor="course-title">Title</label>
                            <input type="text" id="course-title" onChange={props.changed} value={props.classModalData.courseTitle} />
                            <br/>

                            <label htmlFor="course-number">Course Number</label>
                            <input type="text" id="course-number" onChange={props.changed} value={props.classModalData.course} />
                            <br/>

                            <label htmlFor="course-instructor">Instructor</label>
                            <input type="text" id="course-instructor" onChange={props.changed} value={props.classModalData.instructor} />
                            <br/>

                            <label htmlFor="course-location">Location</label>
                            <input type="text" id="course-location" onChange={props.changed} value={props.classModalData.location} />
                            <br/>

                            <label htmlFor="course-credits">Credit Hours</label>
                            <input type="number" min=".5" step="0.5" id="course-credits" onChange={props.changed} value={props.classModalData.creditHours} />
                            <br/>
                        </div>
                        <div className="col">
                            <label>Days</label>
                            <ClassModalDays
                                days={days}
                                changed={props.changed}
                            />
                            <br/>

                            <label htmlFor="course-time-start">Start Time</label>
                            <input type="time" id="course-time-start" onChange={props.changed} value={startTime24Hour}/>
                            <br/>

                            <label htmlFor="course-time-end">End Time</label>
                            <input type="time" id="course-time-end" onChange={props.changed} value={endTime24Hour}/>
                            <br/>
                        </div>

                    </div>
                    <div className="course-modal-buttons">
                        <button className="red-btn">Delete Course</button>

                        <div className="buttons-right">
                            <button className="gray-btn" onClick={props.closeClassModal}>Cancel</button>
                            <button className="green-btn">Save Selection</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ClassModal;