import React from 'react';
import './calendarFront.scss';
import { calDays, calTimes } from '../../calendarDaysAndTimesData';

function CalendarFrontEvent(props) {
  const { startTime, endTime, event, day } = props;

  console.log(event)

  return (
    <div
      className="cal-front-item"
      style={{
        gridColumn: `${calDays[day]}`,
        gridRow: `${calTimes[startTime]} / ${calTimes[endTime]}`,
      }}
    >
      <p>{event.course}</p>
      <p>{event.courseTitle}</p>
      <p>{event.meetingPattern}</p>
    </div>
  );
}

export default CalendarFrontEvent;
