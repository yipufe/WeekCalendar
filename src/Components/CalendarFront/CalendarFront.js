import React from 'react';
import './calendarFront.scss';
import CalendarFrontEvent from './CalendarFrontEvent';

function CalendarFront(props) {
  const { displayData } = props;
  let meetingPatternArr = displayData.filter(
    course => course.meetingPattern !== 'Does Not Meet'
  );

  const eventData = meetingPatternArr.map(event => {
    const index = event.classId;
    const days = event.meetingPattern.split(' ')[0];
    const dayArray = days !== 'Sa' ? days.split('') : ['Sa'];
    const startTime = event.meetingPattern.split(' ')[1].split('-')[0];
    const endTime = event.meetingPattern.split(' ')[1].split('-')[1];

    const displayEvents = dayArray.map(day => {
      return (
        <CalendarFrontEvent
          {...props}
          key={`${day}-${index}`}
          index={index}
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
