import React from 'react'

function ClassModalDay(props) {
    const inputId = "course-day-"+props.letter;
    return (
        <div className="course-day">
            <label htmlFor={inputId}>{props.letter}</label>
            <br/><input type="checkbox" onChange={props.changed} checked={props.dayChecked} id={inputId}/>
        </div>
    );
}

export default ClassModalDay;