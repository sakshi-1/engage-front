const SubjectCard=({currsubject,user})=>{
	let course_details;

	for(let i=0;i<user.detail.course.length;i++)
		if(user.detail.course[i].coursecode===currsubject)
			course_details=user.detail.course[i];
	
	return(
		<div className="card-body">
		    <div className="card-head-text">
		        <h2>Subject Details</h2>
		    </div>
		    <div className="sub-text">
		        <p><strong>Name</strong> - {course_details.name}</p>
		        <p><strong>Domain Branch</strong> - {course_details.branch}</p>
		    </div>
		</div>
	);
}

export default SubjectCard;