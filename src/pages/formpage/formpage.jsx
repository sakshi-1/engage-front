import React, { Component } from 'react';
import {Switch,Redirect,Route,Link} from 'react-router-dom';
import $ from 'jquery';
import Login from '../../forms/student login/student-login-form.jsx';
import './formpage-styles.css';

import TeacherDashboard from '../Teacherdashboard/teacher-dashboard.jsx';
import DashBoard from '../Dashboard/dashboard.jsx';

class FormPage extends Component{
    constructor(props){
        super(props);
        this.state={
          email:'',
          password:'',
          user:''
        }
    }

    componentDidMount(){
        const token = localStorage.getItem('token');
        const type = localStorage.getItem('type');

        if(!token){
            this.setState({
                user: ''
            });
        }

        this.setState({type:type});
        if(type==='teacher'&&this.props.logintype==='teacher'){
            $.post('https://msengageback.herokuapp.com/prof/getteacher',{token:token},(data)=>{
                if(data.status==="success"){
                    this.setState({
                        user: data.message
                    });
                }
                else{
                    localStorage.removeItem('token','');
                    localStorage.removeItem('type','');
                }
            })
        }
        else if(type==='student'&&this.props.logintype==='student'){            
            $.post('https://msengageback.herokuapp.com/student/getstudent',{token:token},(data)=>{
                if(data.status==="success"){
                    this.setState({
                        user: data.message,
                    });
                }
                else{
                    localStorage.removeItem('token','');
                    localStorage.removeItem('type','');
                }
            })
        }
    }
    
    handlechange=e=>{
        const {value,name} = e.target;
        this.setState({[name]: value})
    }
    
    handlestudentsubmit=async(e)=>{
        try{
            const email =await this.state.email;
            const password =await this.state.password;
            if(!email||!password)
                alert('please enter email and password both');
            else{
                    document.getElementById('submit').disabled=true;
                    $.post('https://msengageback.herokuapp.com/student/login',{email:email,password:password},async(data)=>{
                    if(data.status==="success"){
                        await alert('Logged in successfully');
                        await localStorage.setItem('token',data.token);
                        await localStorage.setItem('type','student');
                        this.setState({
                            user: data.student,
                            email: '',
                            password: ''
                        });
                    }
                    else
                        alert('Enter correct email or password');
                })
                    document.getElementById('submit').disabled=false;
            }
            e.preventDefault();
        }
        catch(err){
            alert('unsuccess');
        }
    }

    handleprofsubmit=async(e)=>{
        try{
            const email =await this.state.email;
            const password =await this.state.password;
            if(!email||!password)
                alert('please enter email and password both');
            else{
                $.post('https://msengageback.herokuapp.com/prof/login',{email:email,password:password},async(data)=>{
                    if(data.status==="success"){
                        await alert('Logged in successfully');
                        await localStorage.setItem('token',data.token);
                        await localStorage.setItem('type','teacher');
                        this.setState({
                            user: data.professor,
                            email: '',
                            password: ''
                        });
                    }
                    else{alert('Enter correct email or password');}
                })
            }
            e.preventDefault();
        }
        catch(err){
            alert('unsuccess');
        }
    }

    render(){
        return(
            <div>
            {
                this.state.user===''?
                <div className="form-page">
                    <Link className="login-home-btn" to="/">&#8656; Go to Home</Link>
                    <Login logintype={this.props.logintype} handleprofsubmit={this.handleprofsubmit} handlestudentsubmit={this.handlestudentsubmit} handlechange={this.handlechange} email={this.state.email} password={this.state.password}/>            
                </div>
                :(
                    this.props.logintype==="student"
                    ?<DashBoard type={"student"} user={this.state.user}/>
                    :<TeacherDashboard user={this.state.user}/>
                )
            }
            </div>
        )
    }
}

export default FormPage;