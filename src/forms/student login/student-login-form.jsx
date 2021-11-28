import React from 'react';
import { Link } from 'react-router-dom';
import './student-login-form-styles.css';
import v from '../../assets/images/l1.gif';

const StudentLogin =({logintype,handleprofsubmit,handlestudentsubmit,handlechange,email,password})=>{
        return(
            <div className="form">
                 <img src={v} className="v" alt="" />
                <div className="form-header">
                    <h2>{(logintype==='teacher')?`PROFESSOR`:`STUDENT`} LOGIN</h2>
                </div>
                <form onSubmit={(logintype==='teacher')?handleprofsubmit:handlestudentsubmit}>
                    <input id="email"  type="email" name='email' value={email} onChange={handlechange}/>
                    <input id="password"  type="password" name='password' value={password} onChange={handlechange}/>
                    <input type="submit" id="submit" />
                </form>
                <div className="form-footer">
                    <h2>Forgot Password?</h2>
                </div>
               
            </div>
        )
}

export default StudentLogin;