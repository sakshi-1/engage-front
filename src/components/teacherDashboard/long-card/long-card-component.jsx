import React from 'react';
import './long-card-styles.css'
const LongCard = ({text})=>{
    return(
    <div className="long-narrow-card-body">
        <p className="long-card-item">
            {text}
        </p>
    </div>
    )
}

export default LongCard;