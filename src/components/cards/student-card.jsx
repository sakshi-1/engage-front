import {Component} from 'react';
import './basic-card-styles.css';
import PopupCard from './student-card-popup.jsx';

var student={};
class StudentCard extends Component{
    constructor(props){
        super(props);
        this.state={
            rollno: "1804017",
            popup: false
        }
    }
    onRollChange=(event)=>{
        this.setState({
            rollno: event.target.value
        });
    }
    onSubmit=()=>{
        fetch('https://msengageback.herokuapp.com/text/student-details',{
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(
            {
                rollno: this.state.rollno,
                coursecode: this.props.coursecode
            })
        })
        .then(res=>res.json())
        .then(data=>{
            student=data;
            console.log(student);
            if(student.name===undefined)
                throw student;
            this.togglePopup();
        })
        .catch(err=>alert(err));
    }
    togglePopup=()=>{
        this.setState({
            popup: !this.state.popup
        })
    }
    render(){
        let options=[];
        for(let i=0;i<this.props.user.course.length;i++)
            options.push(<option key={i} value={this.props.user.course[i].coursecode}>{this.props.user.course[i].coursecode}</option>);
        return(
            <div className="card-body">
                <div className="card-head-text">
                    <h2>Student Details</h2>
                </div> 
                <div className="sub-body">
                    <p style={{marginTop:"2px"}}>You can view student's plagiarism details here</p>
                    <h3>Select Student:</h3>
                    <p id="roll-label" style={{margin:0}}>Roll No.</p>
                    <input className="submit-input" type="text" onChange={this.onRollChange} value={this.state.rollno}/>
                    
                    <input className="submit-btn" type="submit" onClick={this.onSubmit} value="submit"  style={{marginTop:"20px"}}/>
                </div>
                {
                    this.state.popup?
                    <PopupCard togglePopup={this.togglePopup} student={student}/>:<div></div>
                }
            </div>
        );
    }
}

export default StudentCard;
/*
<p id="roll-label" style={{marginBottom:0}}>Subject</p>
                    <select className="submit-input" onChange={this.onSubChange}>
                        {options}
                    </select>
                    */