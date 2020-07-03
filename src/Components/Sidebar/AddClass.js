import React from 'react';
import './sidebar.scss';

export default function AddClass(props) {
  const {
    handleAddClass,
    addClassData,
    setOpenAddClassModal,
    setScheduleChangesData,
    scheduleChangesData,
  } = props;
  return (
    <div className="add-class-modal-wrap">
      <div className="add-class-modal-header">
        <h2>New Class</h2>
      </div>
      <div className="add-class-section-information">
        <h3>Section Information</h3>
        <div className="section-info">
          <div className="section-info-left">
            <label htmlFor="classTitle">
              Title
              <input type="text" name="courseTitle" onChange={handleAddClass} />
            </label>
            <label htmlFor="classSection">
              Section
              <input type="text" name="section" onChange={handleAddClass} />
            </label>
            <label htmlFor="creditHours">
              Credit Hours
              <input type="text" name="creditHours" onChange={handleAddClass} />
            </label>
            <label htmlFor="classStatus">
              Status
              <input type="text" name="status" onChange={handleAddClass} />
            </label>
            <label htmlFor="specialApproval">
              Special Approval
              <input
                type="text"
                name="specialApproval"
                onChange={handleAddClass}
              />
            </label>
            <label htmlFor="gradeMode">
              Grade Mode
              <input type="text" name="gradeMode" onChange={handleAddClass} />
            </label>
            <label htmlFor="crossListWith">
              Cross List With
              <input
                type="text"
                name="crossListWith"
                onChange={handleAddClass}
              />
            </label>
          </div>
          <div className="section-info-right">
            <label htmlFor="partOfTerm">
              Part of Term
              <input type="text" name="block" onChange={handleAddClass} />
            </label>
            <label htmlFor="campus">
              Campus
              <input type="text" name="campus" onChange={handleAddClass} />
            </label>
            <label htmlFor="instructionMethod">
              Instruction Method
              <input
                type="text"
                name="instructionMethod"
                onChange={handleAddClass}
              />
            </label>
            <label htmlFor="isVisible">
              Visable
              <input type="text" name="visible" onChange={handleAddClass} />
            </label>
            <label htmlFor="scheduleType">
              Schedule Type
              <input
                type="text"
                name="scheduleType"
                onChange={handleAddClass}
              />
            </label>
            <label htmlFor="session">
              Session
              <input type="text" name="session" onChange={handleAddClass} />
            </label>
          </div>
        </div>
      </div>
      <div className="section-course-attributes">
        <div className="section-course-attribute">
          <h3>Section Attributes</h3>
          <textarea
            rows="3"
            name="sectionAttributes"
            onChange={handleAddClass}
          />
        </div>
        <div className="section-course-attribute">
          <h3>Course Attributes</h3>
          <textarea
            rows="3"
            name="courseAttributes"
            onChange={handleAddClass}
          />
        </div>
      </div>
      <div className="schedule-section">
        <div className="schedule-section-column">
          <h3>Instructor</h3>
          <input
            type="text"
            placeholder="e.g. Hatch, Daniel (12345678)"
            name="instructor"
            onChange={handleAddClass}
          />
        </div>
        <div className="schedule-section-column">
          <h3>Building and Room</h3>
          <input
            type="text"
            placeholder="e.g. CS 406"
            name="location"
            onChange={handleAddClass}
          />
        </div>
        <div className="schedule-section-column">
          <h3>Schedule</h3>
          <input
            type="text"
            placeholder="e.g. MWF 8:30am - 9:45am"
            name="meetingPattern"
            onChange={handleAddClass}
          />
        </div>
      </div>
      <div className="enrollment-section-text">
        <div className="enrollment-section-text-column">
          <h3>Enrollment</h3>
          <div className="enrollment-section">
            <label htmlFor="maxEnrollment">
              Maximum
              <input
                type="text"
                id="maxEnrollment"
                name="maxEnrollment"
                onChange={handleAddClass}
              />
            </label>
            <label htmlFor="maxWaitlistEnrollment">
              Waitlist Max.
              <input
                type="text"
                id="maxWaitlistEnrollment"
                name="maxWaitlistEnrollment"
                onChange={handleAddClass}
              />
            </label>
          </div>
        </div>
        <div className="enrollment-section-text-column">
          <h3>Section Text</h3>
          <textarea
            type="text"
            rows="5"
            name="sectionText"
            onChange={handleAddClass}
          />
        </div>
        <div className="enrollment-section-text-column">
          <h3>Comments</h3>
          <textarea
            type="text"
            rows="5"
            name="sectionComments"
            onChange={handleAddClass}
          />
        </div>
      </div>
      <div className="add-class-btns">
        <button
          className="add-class-cancel-btn"
          onClick={() => setOpenAddClassModal(false)}
        >
          Cancel
        </button>
        <button
          className="add-class-save-btn"
          onClick={() => {
            setScheduleChangesData([...scheduleChangesData, addClassData]);
            setOpenAddClassModal(false);
          }}
        >
          Save Section
        </button>
      </div>
    </div>
  );
}
