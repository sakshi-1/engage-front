
const DendoPopupCard=(props)=>{
    const img=<img id="dendrogram" src={props.src}/>;
    return(
        <div className="popup">
            <div className="overlay"></div>
            <div className="overlay-content">
                <div className="close-btn" onClick={props.togglePopup}>&times;</div>
                <div className="student-info">
                    {img}
                </div>
            </div>
        </div>
    )
}

export default DendoPopupCard;