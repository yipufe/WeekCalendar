import React from 'react';
import './calendarFront.scss';
import { calDays, calTimes } from '../../calendarDaysAndTimesData';

function CalendarFrontEvent(props) {
  const { startTime, endTime, event, day } = props;

  return (
    <div
      className="cal-front-item"
      style={{
        gridColumn: `${calDays[day]}`,
        gridRow: `${calTimes[startTime]} / ${calTimes[endTime]}`,
      }}
    >
      <p>{event.courseTitle}</p>
      <p>{event.meetingPattern}</p>
      <p>{event.location}</p>
    </div>
  );
}

export default CalendarFrontEvent;
