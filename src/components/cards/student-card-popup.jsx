import './basic-card-styles.css';

const PopupCard=(props)=>{
    //console.log(props.student);
    const student=props.student;
    let plagiarism=[];
    for(let i=0;i<student.assignment.length;i++){
        let x;
        if(student.assignment[i].submit==="yes"){
            if(student.assignment[i].plagiarismcheck==="complete"){
                console.log(student.assignment[i].plagiarism.urls);
                let y=[];
                for (let key in student.assignment[i].plagiarism.urls)
                    y.push(<p><a href={key} target="_blank" rel="noopener noreferrer">{key}</a> : {student.assignment[i].plagiarism.urls[key]*100}%</p>);
                x=<div>
                    <p><strong>Plagiarism check is complete.</strong></p>
                    <p>Total Percent Plagiarism: {student.assignment[i].plagiarism.plagiarism_percentage}</p>
                    {y}
                </div>
            }
            else
                x=<p><strong>Plagiarism check under process</strong></p>;
        }
        //console.log(student.assignment[i].plagiarism);
        plagiarism.push(
            <div key={-i}>
                <p>{student.assignment[i].assign_name} was assigned on {student.assignment[i].assign_date}</p>
                <p>Student Submit : {student.assignment[i].submit}</p>
                {x}
                <hr/>
            </div>
        );
    }
    return(
        <div className="popup">
            <div className="overlay"></div>
            <div className="overlay-content">
                <div className="close-btn" onClick={props.togglePopup}>&times;</div>
                <div className="student-info">
                    <p>Name: {student.name}</p>
                    <p>Branch: {student.branch}</p>
                    <hr/>
                    <hr/>
                    {plagiarism}
                </div>
            </div>
        </div>
    )
}

export default PopupCard;