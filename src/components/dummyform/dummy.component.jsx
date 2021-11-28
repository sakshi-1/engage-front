import React, { Component } from 'react';
import $ from 'jquery';

class Dummy extends Component {
    constructor() {
        super();
        this.state = {
            selectfile: ""
        }
    }

    onfilechange = e => {
        this.setState({ selectfile: e.target.files[0] });
        console.log(this.state.selectfile)
    }

    handlesubmit = e => {
        e.preventDefault();

        const form = new FormData();
        form.append(
            'myFile',
            this.state.selectfile
        );
        form.append("name", "aman");
        form.append("roll", "1804013");
        form.append("email", "amanbharti0302@gmail.com");
        form.append("branch", "ECE");

        $.ajax({
            type: "POST",
            url: "https://msengageback.herokuapp.com/prof/studentreport/",
            data: form,
            processData: false,
            contentType: false
        }).done(function (data) {
            console.log(data);
            alert(data);
            alert("File Uploaded Successfully");
        });



    }

    render() {
        return (
            <div>
                <form>
                    <p>Uplaod your answersheet</p>
                    <input type="file" onChange={this.onfilechange}></input>
                    <button type="submit" onClick={this.handlesubmit}>Submit here</button>
                </form>
            </div>
        )
    }
}

export default Dummy;