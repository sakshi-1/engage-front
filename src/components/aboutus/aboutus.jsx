import React from 'react'
import './aboutus.css';
import aboutusimg from '../../assets/images/about.gif';

function Aboutus() {
  return (
    <div className="container2" id="container2">
      <div className="text-container2">

        <h3 id="aboutush">About Us</h3>
        
        <img className="image-container2" src={aboutusimg} />
        <p style={{padding:"15px",margin:0}}>Our project aims at solving the problems of online mass cheating during online written examinations.
        It’s for teachers, professors as well as students. It is a way of communication between students and professors
        during semester. It has several features
        like plagiarism detection, assignment tracking and much more. It has separate portals for
        students and professors. Professors can assign tasks to students.
        Students can submit their tasks and can have their track of subject-wise marks and assignments. It will help the professors as well as students to stay organised and focussed during their online semester.
        </p>

      </div>

    </div>

  )
}

export default Aboutus
