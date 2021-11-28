import React,{Component} from 'react';
import CheckResultCard from '../checkResultCard/check-result-card-component';
import './teacher-dashboard-check-styles.css';

class DashBoardCheck extends Component{
    constructor(props){
        super(props);
        this.state={
            show: false,
            assignedCourse: [],
            assignidselect:'',
            clusterData:[]

        }
        let assignedCourse=[];
        for(let i=0;i<this.props.user.course.length;i++){
            fetch('https://msengageback.herokuapp.com/text/all-assignments',{
                method: 'post',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({
                    coursecode: this.props.user.course[i].coursecode
                })
            })
            .then(res=>res.json())
            .then(assignments=>{
                assignedCourse.push({
                    name: this.props.user.course[i].name,
                    coursecode: this.props.user.course[i].coursecode,
                    assignments: assignments
                });
                this.setState({
                    assignedCourse: assignedCourse
                });
            })
            .catch(err=>alert(err));
        }

    }
    handleClick = (coursecode)=>{
        if(this.state.assignidselect===""){
            return;
        }
        fetch('https://msengageback.herokuapp.com/text/assignment-data',{
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                coursecode: coursecode,
                assignment_id: this.state.assignidselect//this.state.currassignment.id
            })
        })
        .then(res=>res.json())
        .then(data=>{
            
            fetch('https://msengageback.herokuapp.com/python/clustering',{
              method: 'post',
              headers: {'Content-Type':'application/json'},
              body: JSON.stringify(data)
            })
            .then(response=>response.json())
            .then(data=>{
                if(data=={})
                    console.log("can't perform clustering on single student.");
                else{
                    this.setState({
                        clusterData:data
                    });
                }
            })
            .catch(err=>console.log("couldn't perform clustering"));
        })
        .catch(err=>alert(err));
    }
    
    handleChange=(event)=>{
        const {value} = event.target;
        this.setState({
            assignidselect:value
        })
    }

    
    render(){
        const {assignedCourse,clusterData}=this.state;
        console.log(clusterData);
        var max = -1;
        for(var i=0;i<clusterData.length;i++){
            if(clusterData[i].cluster>max)max=clusterData[i].cluster;
        }
        let arr =[];
        for(var i=0;i<max+1;i++){
            arr.push([]);
        }
        console.log(arr)
        for(var i=0;i<clusterData.length;i++){
            arr[clusterData[i].cluster].push({roll:clusterData[i].id})
        }
        let newArr=[];
        for(var i=0;i<max+1;i++){
            if(arr[i].length>1){
                newArr.push(arr[i]);
            }
        }
        let component;
        if(newArr.length===0){
            
        }
        console.log(newArr);
        return(
            <div className="teacher-check-body">
                <div className="teacher-check-title">
                    <h2 className="teacher-check-title-text">
                        Check
                    </h2>
                </div>
                <div className="table">
                    <table>
                        <thead>
                            <tr>
                                <th className="first-head">Sno.</th>
                                <th className="second-head">Course Code</th>
                                <th className="third-head">Assignement</th>
                                <th className="fourth-head">No. of Submissions</th>
                                <th className="fifth-head">Check</th>
                            </tr>
                        </thead>
                        <tbody>
                            {assignedCourse.map((course,index)=>(
                                <tr key={index+1}>
                                    <td className="first" key={index+1}>{index+1}</td>
                                    <td className="second" key={index+2}>{course.coursecode}</td>
                                    <td className="third" key={index+3}>
                                        <select name="assignmentid"  onChange={this.handleChange}>
                                            <option value="default">Select</option>
                                            {course.assignments.map((assignment,index)=>(
                                                <option value={assignment.assignment_id} key={index+12}>{assignment.assignment_name}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className="fourth" key={index+4}>{course.assignments.length}</td>
                                    <td className="fifth" key={index+9}>
                                        <button className="check" onClick={()=>{this.handleClick(course.coursecode)}}>Check</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="results">
                    <h2 className="check-result-text">Result: </h2>
                    {
                        newArr.map((arr,index)=>(
                            <CheckResultCard arr={arr} key={index+56} />
                        ))
                    }
                </div>
            </div>
        )
    }
}

export default DashBoardCheck;