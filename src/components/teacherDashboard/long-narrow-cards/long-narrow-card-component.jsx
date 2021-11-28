import React from 'react';
import './long-narrow-card-styles.css'
const LongNarrowCard = ({code,name})=>{
    return(
    <div className="long-narrow-card-body">
        <p class="long-narrow-card-item">{code}:</p>
        <p class="long-narrow-card-item">{name}</p>
    </div>
    )
}

export default LongNarrowCard;