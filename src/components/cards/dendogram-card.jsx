import {Component} from 'react';
import DendoPopupCard from './dendogram-card-popup.jsx';

let src="#";
class DendoCard extends Component{
    constructor(props){
        super(props);
        this.state={
            roll: "",
            assign_id: "",
            popup: false
        }
    }
    onChange=(event)=>{
        this.setState({
            roll: event.target.value,
            student_data: ""
        });
    }
    onAssignmentChange=(event)=>{
        this.setState({
            assign_id: event.target.value
        });
    }
    onSubmit=()=>{
        if(this.state.assign_id===""){
            alert('Select an assignment');
            return;
        }
        fetch('https://msengageback.herokuapp.com/text/assignment-data',{
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                coursecode: this.props.coursecode,
                assignment_id: this.state.assign_id//this.state.currassignment.id
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
                if(data==={})
                    alert("can't perform clustering on single student.");
                else{
                    console.log(data);
                    fetch('https://msengageback.herokuapp.com/python/dendrogram')
                    .then(res=>res.json())
                    .then(res=>{
                        src=`data:image/png;base64,${res}`;
                        this.togglePopup();
                    })
                    .catch(err=>alert("dendrogram wasn't received"));
                }
            })
            .catch(err=>alert("couldn't perform clustering"));
        })
        .catch(err=>alert(err));
    }
    togglePopup=()=>{
        this.setState({
            popup: !this.state.popup
        })
    }
    render(){
        let options=[];
        options.push(<option key={-1} value="">Select Any</option>);
        for(let i=0;i<this.props.assignments.length;i++)
            options.push(<option key={i} value={this.props.assignments[i].assignment_id}>{this.props.assignments[i].assignment_name}</option>);
        return(
            <div className="card-body">
                <div className="card-head-text">
                    <h2>Forging Clustering (detecting most probable grouping within)</h2>
                </div>
                <div className="sub-body">
                    <p className="sub-text">
                        Currently 5 students have submitted out of 5.
                    </p>
                    <select className="submit-input" onChange={this.onAssignmentChange}>
                        {options}
                    </select>
                    <input className="submit-btn" type="submit" onClick={this.onSubmit} value="get clusters !"/>
                </div>
                {
                    this.state.popup?
                    <DendoPopupCard togglePopup={this.togglePopup} src={src}/>:<div></div>
                }
            </div>
        );
    }
}

export default DendoCard;