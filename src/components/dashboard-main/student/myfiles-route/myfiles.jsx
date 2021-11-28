import './myfiles.css';
import { Component } from 'react';
import ReactDOM from 'react-dom';
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/core";
import Uploadedtab from '../../../uploaded-document/uploaded-document';
import $, { data } from 'jquery';
import e from 'cors';

const override = css`
  top:200px;
  position:relative;
  display: block;
  margin: 0 auto;
  border-color: purple;
`;

class MyFiles extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectfile: "",
			filename: "Please upload your answer sheet above",
			message: "",
			overlay: ""
		}
	}

	async componentDidMount() {
		this.setState({ filename: '' });
		this.setState({ overlay: 'myfiles' });
		if(this.props.currsubject!='course'){
		document.getElementById('upload-sub').disabled = true;
		document.getElementById('file').disabled = true;}
	}

	componentDidUpdate() {
		const subject =this.props.currsubject;
		const user = this.props.user.detail;
		const rollno = user.rollno;
		var allassignment=[];
		if (this.props.currsubject!='course')
			{
				$.post("https://msengageback.herokuapp.com/student/assignment", { "ass": subject }, (res) => {
				if (res.status === "success") {
					const assignments = res.message;
					var todo=[],done=[];
					if(assignments.length>0)
					assignments.map((el)=>{
						$.post("https://msengageback.herokuapp.com/student/getassignment",{id:el},(data)=>{
							var find =false;
							data.message.student.map((el)=>{
								if(el.rollno==rollno){find=true;done.push({textid:el.id,msg:data.message});}
							})
							if(find==false)todo.push(data.message);
						}).then(()=>{

							if(todo.length>0)
							{
							document.getElementById('upload-id').innerHTML=todo[0]._id;
							document.getElementById('assignmentname').innerHTML=todo[0].name;
						 	document.getElementById('description').innerHTML=todo[0].description;
						 	document.getElementById('upload-sub').disabled = false;
						 	document.getElementById('file').disabled = false;}
							else{
							document.getElementById('assignmentname').innerHTML="No new works assigned";
						 	document.getElementById('description').innerHTML="Currently no assignmnent";
						 	document.getElementById('upload-sub').disabled = true;
						 	document.getElementById('file').disabled = true;
							}
							ReactDOM.render(done.map((el)=>{return <Uploadedtab key={el.name} data={el}/>}),document.getElementById('uploaded'));		
						})
					})
					else{
						document.getElementById('upload-id').innerHTML="";
						document.getElementById('assignmentname').innerHTML="No new works assigned";
						document.getElementById('description').innerHTML="Currently no assignmnent";
						document.getElementById('upload-sub').disabled = true;
						document.getElementById('file').disabled = true;
						ReactDOM.render('',document.getElementById('uploaded'));
					}
					
				}
				else {alert('Invalid request');}
			})
		}
	}

	onfilechange = e => {
		this.setState({ selectfile: e.target.files[0] });
		this.setState({ filename: e.target.files[0].name });
	}

	dwnld=(id)=>{
		alert('id');
	}

	handlesubmit = async (e) => {
			e.preventDefault();
		if (this.state.selectfile) {
			document.getElementById('file-info').style.color = 'black';
			document.getElementById('upload-sub').disabled = true;
			document.getElementById('file').disabled = true;
			document.getElementById('upload-sub').style.opacity = 0.5;
			document.getElementById('upload-loader').style.opacity = 1;
			this.setState({ overlay: 'myfiles myfiles-overlay' });
			this.setState({ message: 'It will take a few minute to process your answersheet' });
			
			const form = new FormData();
			form.append("myFile",this.state.selectfile);
			form.append("name", this.props.user.detail.name);
			form.append("email", this.props.user.detail.email);
			form.append("assignmentid",document.getElementById('upload-id').innerHTML);
			form.append("coursecode", this.props.currsubject);
			form.append("rollno", this.props.user.detail.rollno);
		
			await $.ajax({
				type: "POST",
				url: "https://msengageback.herokuapp.com/student/myfiles",
				data: form,
				processData: false,
				contentType: false
			}).done(function (data) {
				if (data.status === 'success') {alert("File Uploaded Successfully");}
				else {console.log(data);
					alert("There is some internal problem");}

				document.getElementById('upload-sub').disabled = false;
				document.getElementById('file').disabled = false;
				document.getElementById('upload-sub').style.opacity = 1;
				document.getElementById('upload-loader').style.opacity = 0;
			 });
			 	this.setState({ overlay: 'myfiles' });
				this.setState({ message: '' });
				this.setState({ filename: '' });
		}
		else {
				alert('select answersheet first');
				document.getElementById('file-info').style.color = 'red';
			}
	}


	render() {
		const sub =this.props.currsubject;
		return (
			<div>
			{
			sub=='course'?
			<div>
				<h2 className="title-text">My Files</h2>
				<p className="title-text" style={{fontSize:"26px", background:"rgba(250,250,250,1)"}}>Select a course to <strong><i>explore</i></strong>.</p>
			</div>
			:
			<div>
				<div className="upload-container">
					<div id="upload-loader" className="upload-loader">
						<ClipLoader color="#000000" loading="true" css={override} size={50} />
						<h4 className="message">{this.state.message}</h4>
					</div>

					<div id="myfiles" className={`${this.state.overlay}`} >
						<form className="upload-form">
							<p className="upload-id" id="upload-id">id:None</p>
							<p className="upload-p" id="assignmentname">No new works assigned</p>
							<h4 id="description">Currently no assignmet</h4>
							<input type="file" id="file" onChange={this.onfilechange} className="upload-input"></input>
							<button type="submit" id="upload-sub" onClick={this.handlesubmit} className="upload-input-btn">Submit here</button>
							<p id="file-info">{this.state.filename}</p>
						</form>
					</div>
				</div>

				<div className="divider"></div>
				<div id="uploaded"></div>
				<div className="footer-space"></div>
			</div>
			}
		</div>
		)
	}
}

export default MyFiles;