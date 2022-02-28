import React, { Component } from "react";
import DateTimePicker from 'react-datetime-picker';

class Interviews extends Component{
    constructor(props){
        super(props);
        this.state = {
            onchange : null,
            value:null,
        }
    }
    onchangevlaue(event){

        // this.setState({value:new Date()})
    }
    render(){
        return(
            <React.Fragment>
                <div className="card mx-auto text-left" style={{width:30+'%',marginTop:1+'%',borderRadius:5+'px',textAlign:"left"}}>
                            <h5 className="card-header"></h5>
                            <div className="card-body">
                                <h5 className="card-title">Description:Software Engineer </h5>
                                <p className="card-text">Skill: Python Django</p>
                                <p className="card-text">Vacancy: 2</p>
                                <p className="card-text">Salary: 100000</p>
                            </div>
                            <div className="card-footer mx-auto">
                            <DateTimePicker onChange={this.onchangevlaue} value={this.state.value} />
                            </div>                                
                </div>
            </React.Fragment>
        )  
    }
}

export default Interviews;