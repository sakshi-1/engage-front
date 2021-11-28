import React from 'react';
import './toggle-btn-style.css';
const ToggleBtn = ({menuToggle})=>{
    return(
        <button className="teacher-toggle-btn" onClick = {menuToggle}>
            <div className = "teacher-toggle-btn-line"/>
            <div className = "teacher-toggle-btn-line"/>
            <div className = "teacher-toggle-btn-line"/>
        </button>
    )
};

export default ToggleBtn;