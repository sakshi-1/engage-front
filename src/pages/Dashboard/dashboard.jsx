import React,{Component} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import Header from '../../components/dashboard-header/header.jsx';
import NavBar from '../../components/dashboard-navbar/navbar.jsx';
import DashBoardMain from '../../components/dashboard-main/dashboard-main.jsx';
import './dashboard.css';

class App extends Component{
  constructor(props){

    const coursearray = [];
    if(props.user&&props.user.course)
      props.user.course.map((el)=>{coursearray.push(el.coursecode);})

    super(props);
    this.state = {
      sideDrawOpen: false,
      user: {
        detail: props.user,
        subjects: coursearray
      },
      currsubject: 'course'
    }
  }

  menuToggle = ()=>{
    this.setState((prevState)=>{
      return({
        sideDrawOpen: !prevState.sideDrawOpen
      });
    })
  }
  
  onSubChange=(currsubject)=>{
    this.setState({
      currsubject: currsubject
    }) 
  }

  render(){
    const {type}=this.props;
    const {user,currsubject,sideDrawOpen}=this.state;
    return(
      <div className="dashboard">
      <Router>
        <Header user_subjects={user.subjects} currsubject={currsubject} onSubChange={this.onSubChange} menuToggle={this.menuToggle}/>
        <div className="dashboard-navbar-main">
          <NavBar show={sideDrawOpen} isstudent={type==='student'}/>
          <DashBoardMain user={user} currsubject={currsubject}  isstudent={type==='student'}/>
        </div>
      </Router>
      </div>
    )
  }
}

export default App;