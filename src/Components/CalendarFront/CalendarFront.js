import React from 'react';
import './calendarFront.scss';
// import CalendarFrontEvent from './CalendarFrontEvent';
import styled from 'styled-components';
import { calDays, calTimes, colors } from '../../calendarDaysAndTimesData';

const Container = styled.div`
  width: 85%;
  background-color: ${(props) => colors[props.index]};
  color: white;
  border-radius: 5px;
  padding: 5px;
  cursor: pointer;
`;

// This component is the front of the calendar where the events are displays. It goes over top of the back of the calendar which is just the styling for the cells
function CalendarFront(props) {
  const { displayData } = props; // This is filtering through the displayData and filtering out all the data that say "Does Not Meet"
  let meetingPatternArr = displayData.filter(
    (course) => course.meetingPattern !== 'Does Not Meet'
  );

  const eventData = meetingPatternArr.map((event) => {
    // Then we take the array after filtering out all the "Does Not Meet" classes and map through it and store this new array in eventData
    const days = event.meetingPattern.split(' ')[0]; // This is splitting the meeting pattern and taking the first part which is the days like MWF
    const dayArray = days !== 'Sa' ? days.split('') : ['Sa']; // This is splitting the days into each individual day like so ["M", "W", "F"]
    const startTime = event.meetingPattern.split(' ')[1].split('-')[0]; // This is splitting the meeting pattern and taking the second part, and then splitting that and taking the first part which is the start time.
    const endTime = event.meetingPattern.split(' ')[1].split('-')[1]; // This is splitting the meeting pattern and taking the second part, and then splitting that and taking the second part which is the end time.
    console.log(meetingPatternArr.indexOf(event));
    const displayEvents = dayArray.map((day) => {
      return (
        <Container
          key={`${day}-${event.classId}`}
          index={meetingPatternArr.indexOf(event)}
          style={{
            // Because we're using CSS Grid for the positioning of the classes we import the calDays and calTimes from calendarDaysAndTimesData.
            gridColumn: `${calDays[day]}`, // for the column we use calDays and then use bracket notation to put in the day which is then associated to a number, which is the column.
            gridRow: `${calTimes[startTime]} / ${calTimes[endTime]}`, // For the row we use calTimes and the startTime and endTime which is then associated with a number, then we tell it what row to start on with the start time and what row to end on with the end time.
          }}
        >
          <p className="cal-front-item-p">{event.course}</p>
          <p className="cal-front-item-p">
            {event.courseTitle.substring(0, 15) + '...'}
          </p>
          <p className="cal-front-item-p">{event.meetingPattern}</p>
        </Container>
      );
    });
    return displayEvents;
  });

  return <div className="calendar-front">{eventData}</div>;
}
export default CalendarFront;
