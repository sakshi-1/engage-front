import {Component} from 'react';
import $ from 'jquery';
import './basic-card-styles.css';
import PopupCard from './student-card-popup.jsx';
import ReactDOM from 'react-dom';
var student={};
class StudentreportCard extends Component{
    constructor(props){
        super(props);
        this.state={
            rollno: '07',
            coursecode: this.props.user.course[0].coursecode,
            assignment:'',
            popup: false,
            student:[],
            textid:'',
            filename:''
        }
    }
    onRollChange=(event)=>{
        this.setState({
            rollno: event.target.value
        });
    }
    onSubChange=(event)=>{
        this.setState({
            coursecode: event.target.value
        });
    }
    onrollChange=(e)=>{
        this.setState({
            textid: e.target.value
        });
    }

    onassChange=(e)=>{
        const assignment = e.target.value;
        if(assignment!="")
        $.post("https://msengageback.herokuapp.com/student/getassignment",{id:assignment},(data)=>{
            if(data.status=="success")
            {this.setState({student:data.message.student,assignment:e.target.value});}
        })
    }

    togglePopup=()=>{
        this.setState({
            popup: !this.state.popup
        })
    }

    render(){
        let options=[],options2=[];
        options.push(<option key={'77'} value={'select any'}>{'select any'}</option>);
        for(let i=0;i<this.props.assignments.length;i++)
            options.push(<option key={i} value={this.props.assignments[i].assignment_id}>{this.props.assignments[i].assignment_name}</option>);
        
        options2.push(<option key={'77'} value={'select any'}>{'select any'}</option>);
        
        for(let i=0;i<this.state.student.length;i++)
            {options2.push(<option key={i} value={this.state.student[i].id}>{this.state.student[i].rollno}</option>);}

        return(
            <div className="card-body">
                <div className="card-head-text">
                    <h2>Download Student Report</h2>
                </div> 
                <div className="sub-body">
                    <p style={{marginTop:"2px"}}>You can download student's answersheet here</p>
                    
                    <p id="roll-label" style={{marginBottom:5}}>Assignment</p>
                    <select className="submit-input" id="asschange" onChange={this.onassChange}>
                        {options}
                    </select>

                    <p id="roll-label" style={{margin:0,marginTop:10}}>Roll No.</p>
                    <select className="submit-input" id="rollchange" onChange={this.onrollChange}>
                        {options2}
                    </select>
                        {(this.state.textid!='')?<a className="submit-btn" style={{textDecoration:"none",borderRadius:"3px",textAlign:"center"}} href={`https://msengageback.herokuapp.com/student/dwnldfile/${this.state.textid}`} target="blank">download</a>:''}
                </div>
                {
                    this.state.popup?
                    <PopupCard togglePopup={this.togglePopup} student={student}/>:<div></div>
                }
            </div>
        );
    }
}

export default StudentreportCard;
