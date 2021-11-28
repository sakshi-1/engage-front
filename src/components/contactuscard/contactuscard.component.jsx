import React from 'react';
import './contactuscard.styles.css';

import Example from './profilecard.component';

import sakshi from '../../assets/images/sakshi.jpg';


const Contactuscard = ()=>{
    return(
        <div className="contactus-card">
            <h3 className="contact-us-h3">Name: Sakshi Sinha</h3>
            <h4 className="contact-us-h4">College: National Institute Of Technology Patna</h4>
            <div className="contact-profile">
            <Example className="profile-card" name="Sakshi Sinha" img={sakshi}/>
           </div>
            
            
        </div>
    )
}


export default Contactuscard;