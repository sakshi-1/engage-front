import './toggle-btn-style.css';

const ToggleBtn = ({menuToggle})=>{
    return(
        <button className="toggle-btn" onClick = {menuToggle}>
            <div className = "toggle-btn-line"/>
            <div className = "toggle-btn-line"/>
            <div className = "toggle-btn-line"/>
        </button>
    )
};

export default ToggleBtn;