import React from 'react';
import './calendarFront.scss';
import testData from '../../testCalData';
import { calDays, calTimes } from '../../calendarDaysAndTimesData';

function CalendarFront() {
  const displayData = testData.map(event => {
    const index = event['Building and Room'];
    const dayArray = event['Meeting Pattern'].split(' ')[0].split('');
    const startTime = event['Meeting Pattern'].split(' ')[1].split('-')[0];
    const endTime = event['Meeting Pattern'].split(' ')[1].split('-')[1];
    const displayEvents = dayArray.map(ev => {
      return (
        <div
          className="cal-front-item"
          style={{
            gridColumn: `${calDays[ev]}`,
            gridRow: `${calTimes[startTime]} / ${calTimes[endTime]}`
          }}
          key={`${ev}-${index}`}
        >
          {event['Class Title']}
          <br />
          {event['Building and Room']}
          <br />
          {event.Instructor.split(' (')[0]}
          <br />
          {event['Meeting Pattern']}
        </div>
      );
    });
    return displayEvents;
  });

  return <div className="calendar-front">{displayData}</div>;
}

export default CalendarFront;
