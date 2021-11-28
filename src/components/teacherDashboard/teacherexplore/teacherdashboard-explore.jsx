import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './teacher-dashboard-explore-styles.css';
import BasicCard from '../../cards/basic-card.jsx';
import SubjectCard from '../../cards/subject-card.jsx';
import GraphCard from '../../cards/graph-card.jsx';
import StudentCard from '../../cards/student-card.jsx';
import DendoCard from '../../cards/dendogram-card.jsx';
import StudentreportCard from '../../cards/stdentreportcarddwnld';
import StudentmarkCard from '../../cards/studentmarkscard';

import $ from 'jquery';

class DashBoardExplore extends Component{
    constructor(props){
        super(props);
        this.state={
            assignments: [],//edit ere too
            coursecode: this.props.user.course[0].coursecode,//Use this for all on the page.
            popup: false
        }
        fetch('https://msengageback.herokuapp.com/text/all-assignments',{
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                coursecode: this.props.user.course[0].coursecode
            })
        })
        .then(res=>res.json())
        .then(assignments=>{
            this.setState({
                assignments: assignments
            })
        })
        .catch(err=>console.log(err));
    }

    onSubChange=(event)=>{
        fetch('https://msengageback.herokuapp.com/text/all-assignments',{
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                coursecode: event.target.value
            })
        })
        .then(res=>res.json())
        .then(assignments=>{
            this.setState({
                coursecode: event.target.value,
                assignments: assignments
            })
        })
        .catch(err=>console.log(err));
    }
    render(){
        const {user} = this.props;
        let options=[],performance=[],len=[];
        for(let i=0;i<this.props.user.course.length;i++)
        options.push(<option key={i} value={this.props.user.course[i].coursecode}>{this.props.user.course[i].coursecode}</option>);
        
        $.post('https://msengageback.herokuapp.com/course/getcourseperformance',{coursecode:this.state.coursecode},(data)=>{
            if(data.status=='success'){
                for(var j=0;j<performance.length;j++)if(performance[i]==null)performance[i]=0;
                performance=data.message;
                var i=0;
                len = performance.map((el)=>{i++;return i;})
                len.push(i+1);
            }
        }).then(()=>{
            ReactDOM.render(<GraphCard title="Class Performance (test wise)"  data_labels={len} data_values={performance} y_label="%Avg. Marks"/>,document.getElementById('performance-card'));
        })  

    return(
        <div className="teacher-explore-body">
            <div className="teacher-title">
                <h2 className="teacher-title-text">Explore</h2>
            </div>
            <div className="teacher-cards">
                <div>
                <select className="submit-input" onChange={this.onSubChange}>
                        {options}
                </select>
				<div id="performance-card"><GraphCard title="Class Performance (test wise)"  data_labels={len} data_values={performance} y_label="%Avg. Marks"/></div>
                </div>
                <DendoCard coursecode={this.state.coursecode} assignments={this.state.assignments}/>
				<StudentCard user={user} coursecode={this.state.coursecode}/>
                <StudentreportCard user={user} coursecode={this.state.coursecode} assignments={this.state.assignments}/>
                <StudentmarkCard user={user} coursecode={this.state.coursecode} assignments={this.state.assignments}/>
			</div>

        </div>
    )
    }
}

export default DashBoardExplore;

//import LargeCard from '../cards/large-rect-card.jsx';