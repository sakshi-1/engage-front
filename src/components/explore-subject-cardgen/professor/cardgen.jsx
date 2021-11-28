import '../cardgen.css';
import BasicCard from '../../cards/basic-card.jsx';
import SubjectCard from '../../cards/subject-card.jsx';
import GraphCard from '../../cards/graph-card.jsx';
import StudentCard from '../../cards/student-card.jsx';
import DendoCard from '../../cards/dendogram-card.jsx';
//import LargeCard from '../cards/large-rect-card.jsx';

const cardgen=({currsubject,user})=>{
	if(currsubject==="course")
		return(
			<p className="title-text" style={{fontSize:"26px", background:"rgba(250,250,250,1)"}}>Select a course to <strong><i>explore</i></strong>.</p>
		);
	else
		return(
			<div className="cards">
				<SubjectCard currsubject={currsubject} user={user}/>
				<GraphCard title="Class Performance (test wise)"  data_labels={['one','two','three','four','five']} data_values={[80,82,79,86,91]} y_label="%Avg. Marks"/>
				<DendoCard/>
				<StudentCard/>
			</div>
		);
}

export default cardgen;
/*
<GrapgCard title="Subject Details"/>
*/