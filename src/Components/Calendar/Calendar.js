import React from 'react';
import './calendar.scss';

import CalendarCells from '../CalendarCells/CalendarCells';
import CalendarTimes from '../CalendarTimes/CalendarTimes';
import CalendarFront from '../CalendarFront/CalendarFront';

function Calendar() {
  return (
    <div className="calendar-wrap">
      <div className="dayname-row">
        <div className="dayname-left"></div>
        <div className="dayname-wrap">
          <div className="dayname">MON</div>
          <div className="dayname">TUE</div>
          <div className="dayname">WED</div>
          <div className="dayname">THUR</div>
          <div className="dayname">FRI</div>
          <div className="dayname">SAT</div>
        </div>
      </div>
      <div className="full-cal">
        <CalendarTimes />
        <div className="full-cal-body">
          <CalendarCells />
          <CalendarFront />
        </div>
      </div>
    </div>
  );
}

export default Calendar;
