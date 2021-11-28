import './explore.css';
import CardGen from '../../../explore-subject-cardgen/student/cardgen.jsx'

const Explore=({currsubject,user})=>{
	return(
		<div>
			<h2 className="title-text">Explore</h2>
            <CardGen currsubject={currsubject} user={user}/>
		</div>
	);
}

export default Explore;