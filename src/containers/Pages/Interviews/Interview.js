import React, { Component } from "react";
import DateTimePicker from 'react-datetime-picker';

class Interviews extends Component{
    constructor(props){
        super(props);
        this.state = {
            onchange : null,
            value:new Date(),
        }
    }
    onChange(date){
        this.setState({value:date})
    }
    render(){
        return(
            <React.Fragment>
                <div className="card mx-auto text-left" style={{width:30+'%',marginTop:1+'%',borderRadius:5+'px',textAlign:"left"}}>
                            <h5 className="card-header">Software Engineer</h5>
                            <div className="card-body">
                                <h6 className="card-title">Description:Software Engineer </h6>
                                <p className="card-text">Skill: Python Django</p>
                                <p className="card-text">Vacancy: 2</p>
                                <p className="card-text">Salary: 100000</p>
                            </div>
                            <div className="card-footer mx-auto w-100">
                                <div>
                                    <DateTimePicker className="mx-auto" onChange={(date)=>this.onChange(date)} value={this.state.value} minDate={new Date()}/>
                                </div>
                                <div>
                                    <button className="btn btn-primary m-1 mx-auto w-100">Apply</button>
                                </div>
                            </div>                                
                </div>
            </React.Fragment>
        )  
    }
}

export default Interviews;