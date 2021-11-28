import {Component} from 'react';
import $ from 'jquery';
import './basic-card-styles.css';
import PopupCard from './student-card-popup.jsx';
import ReactDOM from 'react-dom';
var student={};
class StudentmarkCard extends Component{
    constructor(props){
        super(props);
        this.state={
            rollno: '07',
            coursecode: this.props.user.course[0].coursecode,
            assignment:'',
            popup: false,
            student:[],
            textid:'',
            filename:'',
            marks:''
        }
    }

    onmarksChange=(event)=>{
        this.setState({
            marks: event.target.value
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

    onSubmit=(e)=>{
        const textid = this.state.textid;
        const marks = this.state.marks;
        // console.log(textid,marks);
        $.post("https://msengageback.herokuapp.com/prof/givemarks",{textid:textid,marks:marks},(data)=>{
            if(data.status=="success"){
                alert('Marks assigned');
            }
            else alert('server is currently busy');
        })
        e.preventDefault();
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
                    <h2>Assign marks to students</h2>
                </div> 
                <div className="sub-body">
                    <p style={{marginTop:"2px"}}>Assign marks to students</p>
                    
                    <p id="roll-label" style={{marginBottom:5}}>Assignment</p>
                    <select className="submit-input" id="asschange" onChange={this.onassChange}>
                        {options}
                    </select>

                    <p id="roll-label" style={{margin:0,marginTop:10}}>Roll No.</p>
                    <select className="submit-input" id="rollchange" onChange={this.onrollChange}>
                        {options2}
                    </select>
                    <input placeholder="Enter marks here" className="submit-input" type="text" style={{marginTop:"10"}} onChange={this.onmarksChange} value={this.state.marks}/>
                    <input className="submit-btn" type="submit"  onClick={this.onSubmit} value="submit"  style={{marginTop:"20px"}}/>
                </div>
            </div>
        );
    }
}

export default StudentmarkCard;
