import React from 'react';
import ContactUsCard from '../../cards/contactuscards/contact-us-card';
import Sakshi from '../../../assets/images/sakshi.jpg';
import './teacher-dashboard-contact-styles.css';

const DashBoardContact = ()=>{
    return(
        <div className="teacher-contact-body">
            <div className="teacher-contact-title">
                <h2 className="teacher-contact-title-text">Contact Me</h2>
            </div>
            <div className="contact-us-cards">
               <div className="row-2">
                    <ContactUsCard image={Sakshi} name={'Sakshi Sinha'} desig={'nitp '} 
                    linkedin={'https://www.linkedin.com/in/sakshi-sinha-627532173/'} github={'https://github.com/sakshi-1'}/>
                    
                </div>
                
            </div>
        </div>
    )
}

export default DashBoardContact;