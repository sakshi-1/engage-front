import './home.css';

const Home=({user})=>{
	let courses=[];	
	for(let i=0;i<user.detail.course.length;i++)
		courses.push(<p key={i}>{user.detail.course[i].name} ({user.detail.course[i].coursecode})</p>);
	return(
		<div>
			<h2 className="title-text">Home</h2>
			<div id="student-home">
				<div className="card-head-text">
				 	<h2>Name: </h2>
				 	<p>{user.detail.name.toUpperCase()}</p>
				</div>
				<div className="card-head-text">
				 	<h2>Contact Details: </h2>
				 	<h3>E-mail: </h3>
				 	<p><i>{user.detail.email}</i></p>
				 	<h3>Mobile No. </h3>
				 	<p><i>{user.detail.mobno?user.detail.mobno:"N/A"}</i></p>
				</div>
				<div className="card-head-text">
				 	<h2>Branch: </h2>
				 	<p>{user.detail.branch}</p>
				</div>
				<div className="card-head-text">
	                <h2>Active Courses:</h2>
	                {courses}
	            </div>
	        </div>
		</div>
	);
}

export default Home;