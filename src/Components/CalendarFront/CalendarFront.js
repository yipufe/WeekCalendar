import React from 'react';
import './calendarFront.scss';
import CalendarFrontEvent from './CalendarFrontEvent';

// This component is the front of the calendar where the events are displays. It goes over top of the back of the calendar which is just the styling for the cells

function CalendarFront(props) {
  const { displayData, initialAndChangedData } = props; // This is filtering through the displayData and filtering out all the data that say "Does Not Meet"
  let meetingPatternArr;
  if (displayData) {
    meetingPatternArr = displayData.filter(
      (course) => course.meetingPattern !== 'Does Not Meet'
    );
  } else {
    meetingPatternArr = initialAndChangedData.filter(
      (course) => course.meetingPattern !== 'Does Not Meet'
    );
  }

  const eventData = meetingPatternArr.map((event) => {
    // Then we take the array after filtering out all the "Does Not Meet" classes and map through it and store this new array in eventData
    const days = event.meetingPattern.split(' ')[0]; // This is splitting the meeting pattern and taking the first part which is the days like MWF
    const dayArray = days !== 'Sa' ? days.split('') : ['Sa']; // This is splitting the days into each individual day like so ["M", "W", "F"]
    const startTime = event.meetingPattern.split(' ')[1].split('-')[0]; // This is splitting the meeting pattern and taking the second part, and then splitting that and taking the first part which is the start time.
    const endTime = event.meetingPattern.split(' ')[1].split('-')[1]; // This is splitting the meeting pattern and taking the second part, and then splitting that and taking the second part which is the end time.

    const displayEvents = dayArray.map((day) => {
      return (
        <CalendarFrontEvent
          {...props} // This is adding all the props from CalendarFront to this Component.
          key={`${day}-${event.classId}`}
          classId={event.classId}
          startTime={startTime}
          endTime={endTime}
          event={event}
          day={day}
        />
      );
    });

    return displayEvents;
  });

  return <div className="calendar-front">{eventData}</div>;
}

export default CalendarFront;
