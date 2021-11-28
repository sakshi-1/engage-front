import React,{Component} from 'react';
import $, { data } from 'jquery';
import './teacher-dashboard-file-styles.css';

class DashBoardMyFile extends Component{
    constructor(props){
        super(props);
        this.state={
            name:'',
			branch:'',
			coursecode:'',
			assignmentDesc:'',
			enrolledstudent:'',
			assignment:[]
        }
    }
	handleChange = (event)=>{
		const {value,name}=event.target;
		this.setState({
			[name]:value
		})
	}
	handleAdd = ()=>{
		const {name,branch,assignmentDesc,assignment,coursecode} = this.state;
		let newObj = {
			title:name,
			branch:branch,
			coursecode:coursecode,
			description:assignmentDesc
		}
		let newArr = [...assignment,newObj];
		this.setState({
			assignment:newArr
		})
	}
	handleSubmit = (e)=>{
		//fetch();
		//console.log(this.state);
		//alert(this.state.coursecode);
		$.post('https://msengageback.herokuapp.com/prof/newassignment',{name:this.state.name,coursecode:this.state.coursecode,description:this.state.assignmentDesc,token:localStorage.getItem('token')},(data)=>{
			if(data.status==="success"){
				alert('Assignmet successfully assigned ');
				this.setState({
					name:'',
					branch:'',
					coursecode:'',
					assignmentDesc:'',
					assignment:[]
				})
			}
			else alert(data.message);
		})

		e.preventDefault();
	}
	handleSelect=(event)=>{
		//alert(event.target.value);
		if(event.target.value!=='default'){
		this.setState({
			coursecode:event.target.value
		})}
		else{
			this.setState({
				coursecode:''
			})
		}
	}
    render(){
    	let options=[];
    	for(let i=0;i<this.props.user.course.length;i++)
    		options.push(<option key={i} className="course-option" value={this.props.user.course[i].coursecode}>{this.props.user.course[i].coursecode}</option>);
        const {name,branch,assignmentDesc} = this.state;
        return(
            <div className="teacher-file-body">
				<div className="teacher-form-container">
					<div className="teacher-file-header">
						<h2 className="file-header-text">Assign Work</h2>
					</div>
					<form className="teacher-myfile-form" onSubmit={this.handleSubmit}>
						<label>Name:</label>
						<br/>
						<input type="text" name="name" onChange={this.handleChange} value={name}/>
						<br/>
						<label>Branch:</label>
						<br/>
						<input type="text" name="branch" onChange={this.handleChange} value={branch}/>
						<br/>
						<label>Enter the Assignment Description:</label>
						<br/>
						<textarea name="assignmentDesc" id="assignmentDesc" cols="30" rows="10" onChange={this.handleChange} value={assignmentDesc}></textarea>
						<br/>
						<select className="teacher-file-course" onChange={this.handleSelect}>
							<option className="course-option" value="default">Select an option</option>
							{options}
						</select>
						<div className="teacher-file-btns">
							<input type="submit" value="Assign"/>
						</div>
					</form>
				</div>
            </div>
		)
    }

}

export default DashBoardMyFile;