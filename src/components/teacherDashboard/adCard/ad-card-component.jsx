import React from 'react';
import './ad-card-styles.css';


const AdCard = ({image,head,Desc})=>{
    return(
        <div className="ad-card-body">
            <div className="ad-card-image">
                <img src={image} alt=""/>
            </div>
            <div className="ad-card-desc">
                <h2 className="ad-card-title">{head}</h2>
                <p className="sub-text">{Desc}</p>
            </div>
        </div>
    )
}

export default AdCard;