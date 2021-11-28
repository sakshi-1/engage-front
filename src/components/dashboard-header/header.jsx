import {useLocation} from 'react-router-dom';

import './header-styles.css';
import logo from '../../assets/images/p4.gif';
import ToggleBtn from '../sidedrawer/togglebtn/toggle-btn';
import Dropdown from '../dropdown/dropdown.js';

const Header = ({user_subjects,currsubject,onSubChange,menuToggle})=>{
    let dropdown;
    const currlocation=useLocation().pathname;
    if(currlocation==="/login-student/Explore"||currlocation==="/login-student/MyFiles")
        dropdown=<Dropdown user_subjects={user_subjects} currsubject={currsubject} onSubChange={onSubChange}/>
    return(
        <div className="header-container">
            <nav className="header">
                <div className="logo">
                    <ToggleBtn menuToggle={menuToggle}/>
                    <img src={logo} alt=""/>
                </div>
                {dropdown}
                <div onClick={()=>{localStorage.removeItem('token');localStorage.removeItem('type');window.location.replace('/');}} className="links">
                    <p>Logout</p>
                </div>
            </nav>
        </div>
    )
}

export default Header;