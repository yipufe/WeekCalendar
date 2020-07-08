import React from 'react';
import ClassModalDay from './classModalDay';

function ClassModalDays(props) {
    let [monday,tuesday,wednesday,thursday,friday,saterday] = [false,false,false,false,false,false];
    Array.prototype.map.call(props.days, letter=>{
        switch(letter) {
            case('M'):
                monday = true;
                break;
            case('T'):
                tuesday = true;
                break;
            case('W'):
                wednesday = true;
                break;
            case('R'):
                thursday = true;
                break;
            case('F'):
                friday = true;
                break;
            case('S'):
                saterday = true;
                break;
            default:
        }
    })

    return (
        <div className="course-days-container">
            <div className="course-days">
                <ClassModalDay dayChecked={monday} changed={props.changed} letter="M"></ClassModalDay>
                <ClassModalDay dayChecked={tuesday} changed={props.changed} letter="T"></ClassModalDay>
                <ClassModalDay dayChecked={wednesday} changed={props.changed} letter="W"></ClassModalDay>
                <ClassModalDay dayChecked={thursday} changed={props.changed} letter="R"></ClassModalDay>
                <ClassModalDay dayChecked={friday} changed={props.changed} letter="F"></ClassModalDay>
                <ClassModalDay dayChecked={saterday} changed={props.changed} letter="Sa"></ClassModalDay>
            </div>
        </div>

    );
}

export default ClassModalDays;