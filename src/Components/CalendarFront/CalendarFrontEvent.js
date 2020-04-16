import React, { useState } from 'react';
import './calendarFront.scss';
import { calDays, calTimes } from '../../calendarDaysAndTimesData';

function CalendarFrontEvent(props) {
  const {
    initialData,
    setInitialData,
    displayData,
    setDisplayData,
    index,
    startTime,
    endTime,
    event,
    day,
  } = props;

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
    </div>
  );
}

export default CalendarFrontEvent;
