import React from 'react';
import assign from '../../../assets/images/assign.png';
import check from '../../../assets/images/check.png';
import InfoCard from '../infocard/infocard-component';
import LongNarrowCard from '../long-narrow-cards/long-narrow-card-component';
import AdCard from '../adCard/ad-card-component';
import {Link} from 'react-router-dom';
import './teacher-dashboard-main-styles.css';

const DashBoardMain = ({name,branch,email,mbno,course})=>{
    return(
        <div className="teacher-main-body">
            <div className="teacher-main-title">
                <h2 className="teacher-main-title-text">{name}</h2>
            </div>
            <div className="information-block">
                <h2 className="information-block-title">Personal Information</h2>
                <InfoCard branch = {branch} email={email} phone={mbno}/>
            </div>
            <div className="courses-cards">
                <h2 className="courses-title">
                    Courses
                </h2>
                {course.map((crs)=>{
                    return(
                        <LongNarrowCard code={crs.coursecode} name={crs.name}/>
                    )
                })}
                
            </div>
            <div className="link-cards">

                <Link to='/login-teacher/assign' style={{textDecoration:'none'}}><AdCard image={assign} head={'Assign Work'} Desc={'Click here if you want to assign work'}/></Link>
                <Link to='/login-teacher/check' style={{textDecoration: 'none'}}><AdCard image={check} head={'Check Work'} Desc={'Click If you want to check work'}/></Link>
            </div>
            
        </div>
    )
}

export default DashBoardMain;