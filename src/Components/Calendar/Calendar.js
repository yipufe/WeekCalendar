import React from 'react';
import './calendar.scss';

import CalendarCells from '../CalendarCells/CalendarCells';
import CalendarTimes from '../CalendarTimes/CalendarTimes';
import CalendarFront from '../CalendarFront/CalendarFront';

// This component is the parent Calendar component that houses all of the other component for the calendar like the rows and columns and the times.

function Calendar(props) {
  return (
    <div className="calendar-wrap">
      <div className="dayname-row">
        <div className="dayname-left"></div>
        <div className="dayname-wrap">
          <div className="dayname">Monday</div>
          <div className="dayname">Tuesday</div>
          <div className="dayname">Wednesday</div>
          <div className="dayname">Thursday</div>
          <div className="dayname">Friday</div>
          <div className="dayname">Saturday</div>
        </div>
      </div>
      <div className="full-cal">
        <CalendarTimes />
        <div className="full-cal-body">
          <CalendarCells />
          <CalendarFront
            initialData={props.initialData}
            setInitialData={props.setInitialData}
            displayData={props.displayData}
            setDisplayData={props.setDisplayData}
          />
        </div>
      </div>
    </div>
  );
}

export default Calendar;
