import React from 'react';
import './icon-card-component-styles.css';
const IconCard = ({image})=>{
    return(
        <div className="icon-wrapper">
            <div className="inner-icon">
                <img src={image} alt=""/>
            </div>
        </div>
    )
}

export default IconCard;