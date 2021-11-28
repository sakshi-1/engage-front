import React from 'react';
import logo from '../../../assets/images/p4.gif';
import ToggleBtn from '../sidedrawer/togglebtn/toggle-btn';
import './header-styles.css';
const Header = ({menuToggle})=>{
    return(
        <div className="teacher-header-container">
            <nav className="teacher-header">
                <div className="teacher-logo">
                    <ToggleBtn menuToggle={menuToggle}/>
                   <div className="logo-prof">
                        <img src={logo} alt=""/>
                        </div>
                </div>
                <div className="teacher-links" onClick={()=>{localStorage.removeItem('token');window.location.replace('/');}}>
                    <p>Logout</p>
                </div>
            </nav>
        </div>
    )
}

export default Header;