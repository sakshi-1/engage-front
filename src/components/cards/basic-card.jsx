import './basic-card-styles.css';

const BasicCard = ({title})=>{
    return(
        <div className="card-body">
            <div className="card-head-text">
                <h2>{title}</h2>
            </div>
            <p className="sub-text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam repellat illo ducimus beatae commodi, perspiciatis, repellendus quaerat quae quos atque sapiente id laboriosam totam voluptas soluta! Commodi cum a in.
            </p>
        </div>
    )
}

export default BasicCard;