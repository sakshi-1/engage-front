import { Component } from 'react';
import $ from 'jquery';
import './uploaded-styles.css';

class Uploadedtab extends Component {
  constructor(Props){
    super(Props);
  }

  render(){
  const {data }=this.props;
  return(
		<div className="uploaded-myfiles">
      <h5>id: {data.msg._id}</h5>
      <h3>{data.msg.name}</h3>
      <p className="upload-p">{data.msg.description}</p>
      <a className="upload-dwnld" href={`https://msengageback.herokuapp.com/student/dwnldfile/${data.textid}`} target="blank">download</a>
		</div>
    )
  }
}

export default  Uploadedtab;