import React, { useState } from 'react';
import './calendarFront.scss';
import { calDays, calTimes } from '../../calendarDaysAndTimesData';
import Modal from 'react-modal';

function CalendarFront(props) {
  const { initialData, setInitialData, displayData, setDisplayData } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  let meetingPatternArr = displayData.filter(
    course => course.meetingPattern !== 'Does Not Meet'
  );

  const eventData = meetingPatternArr.map(event => {
    const index = event.classId;
    const days = event.meetingPattern.split(' ')[0];
    const dayArray = days !== 'Sa' ? days.split('') : ['Sa'];
    const startTime = event.meetingPattern.split(' ')[1].split('-')[0];
    const endTime = event.meetingPattern.split(' ')[1].split('-')[1];
    const handleEditCourse = () => {
      console.log(event);
    };
    const openModal = () => {
      setIsModalOpen(true);
    };
    const closeModal = () => {
      setIsModalOpen(false);
    };
    const displayEvents = dayArray.map(day => {
      return (
        <div
          className="cal-front-item"
          style={{
            gridColumn: `${calDays[day]}`,
            gridRow: `${calTimes[startTime]} / ${calTimes[endTime]}`
          }}
          key={`${day}-${index}`}
          onClick={openModal}
        >
          <p>{event.courseTitle}</p>
          <p>{event.location}</p>
          <p>{event.instructor}</p>
          <p>{event.meetingPattern}</p>
          <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="Course Details"
            className="course-modal"
            overlayClassName="course-modal-overlay"
            ariaHideApp={false}
          >
            <div className="course-modal-wrap">
              <p>{event.courseTitle}</p>
              <p>{event.instructor}</p>
              <p>{event.location}</p>
              <p>{event.meetingPattern}</p>
              <p>{event.block}</p>
              <p>{event.creditHours}</p>
              <p>{event.courseId}</p>
            </div>
          </Modal>
        </div>
      );
    });
    return displayEvents;
  });

  return <div className="calendar-front">{eventData}</div>;
}

export default CalendarFront;
