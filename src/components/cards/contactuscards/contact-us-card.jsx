import React from 'react';
import Github from '../../../assets/images/github.png';
import LinkedIn from '../../../assets/images/linkedin.png';
import {Link} from 'react-router-dom';
import IconCard from '../icon-card/icon-card-component';


import './contact-us-card-style.css';
const ContactUsCard=({image,name,desig,linkedin,github})=>{
    return(
        <div className="contact-us-wrapper">
            <div className="image-wrapper">
                <div className="image-outer">
                    <div className="image-inner">
                        <img src={image} alt=""/>
                    </div>
                </div>
            </div>
            <div className="name">
                <h2 className="name-text">{name}</h2>
                <h2 className="designation">{desig}</h2>
            </div>
            <div className="social-icons">
                <a href={github}><IconCard image={Github} /></a>
                <a href={linkedin}><IconCard image={LinkedIn} /></a>
            </div>
            <div className="email">
                <button className="email-btn">Email</button>
            </div>
        </div>
    )
}

export default ContactUsCard;