import '../cardgen.css';
import $, { extend } from 'jquery';
import BasicCard from '../../cards/basic-card.jsx';
import GraphCard from '../../cards/graph-card.jsx';
import { Component } from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
//import LargeCard from '../cards/large-rect-card.jsx';
class cardgen extends Component {
	constructor(props){
		super(props);
		this.state={
			call:''
		}
	}

	componentDidMount(){
		this.setState({call:"1"});
	}

	componentDidUpdate(){
		const {currsubject,user}=this.props;
		const rollno = user.detail.rollno;
		var marks=[],done=[];
		if(currsubject!="course")
		$.post("https://msengageback.herokuapp.com/student/assignment", { "ass": currsubject }, (res) => {
			if (res.status === "success") {
				const assignments = res.message;
				if(assignments.length>0)
				assignments.map((el)=>{
					$.post("https://msengageback.herokuapp.com/student/getassignment",{id:el},(data)=>{
						var find =false;
						data.message.student.map((el)=>{
							if(el.rollno==rollno){find=true;done.push({textid:el.id});}
						})
						if(find==false)done.push(null);
					}).then(()=>{
						var temp=[];
						if(done.length>0)
						done.map((el)=>{
							if(el==null){
								var value=[];
								temp.push(0);
								for(var i=1;i<=temp.length+1;i++)value.push(i);
								ReactDOM.render(<GraphCard title="Marks Monitor (test wise marks graph)" data_labels={value} data_values={temp} y_label="%Marks" />, document.getElementById('stu-graph'));
							}
							else{
								$.post("https://msengageback.herokuapp.com/student/gettext",{textid:el.textid},(data)=>{
									temp.push(data.message.marks);
								})
								.then(()=>{
									var value=[];
									for(var i=1;i<=temp.length+1;i++)value.push(i);
									ReactDOM.render(<GraphCard title="Marks Monitor (test wise marks graph)" data_labels={value} data_values={temp} y_label="%Marks" />, document.getElementById('stu-graph'));
								})
							}
						});
						else ReactDOM.render(<GraphCard title="Marks Monitor (test wise marks graph)" data_labels={[1,2,3,4,5]} data_values={[]} y_label="%Marks" />, document.getElementById('stu-graph'));
					})
				})
				else{
					ReactDOM.render(<GraphCard title="Marks Monitor (test wise marks graph)" data_labels={[1,2,3,4,5]} data_values={[]} y_label="%Marks" />, document.getElementById('stu-graph'));
				}
			}
			else{ReactDOM.render(<GraphCard title="Marks Monitor (test wise marks graph)" data_labels={[1,2,3,4,5]} data_values={[]} y_label="%Marks" />, document.getElementById('stu-graph'));}
		})
	}

	render(){
	const {currsubject,user}=this.props;
	let course_details=[];
	const attendence="76%";//user.details.
	const rank="#1";//will have to calculate everyones score (fetch() necessary)
	
	for(let i=0;i<user.detail.course.length;i++)
		if(user.detail.course[i].coursecode===currsubject)
			course_details=user.detail.course[i];

	if(currsubject==="course")
		return(
			<p className="title-text" style={{fontSize:"26px", background:"rgba(250,250,250,1)"}}>Select a course to <strong><i>explore</i></strong>.</p>
		);
	else{	
		return(
			<div className="cards">
				<div className="card-body">
		            <div className="card-head-text">
		                <h2>Subject Details</h2>
		            </div>
		            <div className="sub-text">
		                <p><strong>Name</strong> - {course_details.name}</p>
		                <p><strong>Domain Branch</strong> - {course_details.branch}</p>
		            </div>
		        </div>
				<div className="card-body">
		            <div className="card-head-text">
		                <h2>Class Standing (ranking in the class in the selected course)</h2>
		            </div>
		            <p className="sub-text">
		                Congratulation, your standing is <strong style={{fontSize: "27px",color:"purple",padding: "0px 5px"}}>{rank}</strong>
		            </p>
		        </div>
				<div id="stu-graph"></div>
			</div>
		);
}}

}
export default cardgen;