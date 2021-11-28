import React, { Component } from 'react';
import { Switch, Route} from 'react-router-dom';
import './App.css';
import FormPage from './pages/formpage/formpage';
import HomePage from './pages/HomePage/HomePage';

class App extends Component{
  render(){
    return(
      <div className="App">
        <Switch>
          <Route path='/login-teacher' render={()=>(<FormPage logintype={'teacher'}/>)}/>
          <Route path='/login-student' render={()=>(<FormPage logintype={'student'}/>)}/>
          <Route path='/' component={HomePage} props/>
        </Switch>
      </div>
    );
  }
}

export default App;



