import React,{Component} from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Header from '../../components/teacherDashboard/header/header';
import NavBar from '../../components/teacherDashboard/navbar/navbar';
import DashBoardMain from '../../components/teacherDashboard/teacherdashboardmain/teacherdashboard-main';
import DashBoardCheck from '../../components/teacherDashboard/teachercheck/teacherdashboard-check';
import DashBoardContact from '../../components/teacherDashboard/teachercontactus/teacherdashboard-contact';
import DashBoardExplore from '../../components/teacherDashboard/teacherexplore/teacherdashboard-explore';
import DashBoardMyFile from '../../components/teacherDashboard/teachermyfiles/teacherdashboard-file';
import './teacher-dashboard-styles.css';

class TeacherDashboard extends Component{
  constructor(props){
    super(props);
    this.state = {
      sideDrawOpen: false,
      route:'home'
    }
  }
  
  menuToggle = ()=>{
    this.setState((prevState)=>{
      return(
        {sideDrawOpen:!prevState.sideDrawOpen}
      )
    })
  }
  render(){
    return(
      <div className="teacher-dashboard-main">
          <Header menuToggle={this.menuToggle}/>
          <Router>
          <div className="teacher-dashboard">
            <NavBar show={this.state.sideDrawOpen}  name={this.props.user.name}/>
            <Switch>
              <Route exact path="/login-teacher/" render={()=>(<DashBoardMain name={this.props.user.name} branch={this.props.user.branch} email={this.props.user.email} mbno={this.props.user.mobno} course={this.props.user.course}/>)}/>
              <Route exact path="/login-teacher/explore"><DashBoardExplore user={this.props.user}/></Route>
              <Route exact path="/login-teacher/assign"> <DashBoardMyFile user={this.props.user}/></Route>
              <Route exact path="/login-teacher/check"> <DashBoardCheck user={this.props.user}/></Route>
              <Route exact path="/login-teacher/contact" component={DashBoardContact}/>
            </Switch>
          </div>
          </Router>
      </div>
    )
  }
}

export default TeacherDashboard;