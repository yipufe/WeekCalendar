import React, { useState } from 'react';
import './calendarFront.scss';
import { calDays, calTimes } from '../../calendarDaysAndTimesData';
import Modal from 'react-modal';

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
    day
  } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      className="cal-front-item"
      style={{
        gridColumn: `${calDays[day]}`,
        gridRow: `${calTimes[startTime]} / ${calTimes[endTime]}`
      }}
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
          <p>Course Title: {event.courseTitle}</p>
          <p>Instructor: {event.instructor}</p>
          <p>Location: {event.location}</p>
          <p>Meeting Pattern: {event.meetingPattern}</p>
          <p>Block: {event.block}</p>
          <p>Credit Hours{event.creditHours}</p>
          <p>Class Id: {event.classId}</p>
        </div>
      </Modal>
    </div>
  );
}

export default CalendarFrontEvent;
