import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee,faCheck,faClose } from '@fortawesome/free-solid-svg-icons';

import Navbar from "../../UI/Navbar/Navbar";
class JobStatus extends Component{
    constructor(props){
        super(props);
        this.state = {
            job:null,
            data:null,
            username:null,
            form:null,
            rejectForm:null,
            rejectData:null,
            toggleStage:1,
            username:localStorage.getItem('user'),
            logged_in:localStorage.getItem('user')?true:false,
        }
    }

    componentDidMount(){
        if(localStorage.getItem('user')){
            this.setState({username:localStorage.getItem('user')});
        }
        if(!this.state.logged_in){
            this.props.history.push("/signin");
        }
        this.toggle_tab(1);
    }

    //design part
    shortlist_form(){
        this.setState({
            form:(
                <React.Fragment>
                    <div className="card-header">Selection List</div>
                    <div className="card-body">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Titile</th>
                            <th>Shortlist</th>
                        </tr>
                    </thead>
                <tbody>
                {this.state.data?this.state.data.map((jobs,index)=>{
                    return (
                        <tr>
                            <th>{jobs['job'].title}</th>
                            <th><FontAwesomeIcon icon={faCheck} color={"green"}></FontAwesomeIcon></th>
                        </tr>
                    )
                }):<div>No Data Available</div>}
                </tbody> 
                </table>
                    </div>
                </React.Fragment>
            )
        })
    }

    shortlist_rejectForm(){
        this.setState({
            rejectForm:(
                <React.Fragment>
                    <div className="card-header">Rejection List</div>
                    <div className="card-body">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Titile</th>
                            <th>Shortlist</th>
                        </tr>
                    </thead>
                <tbody>
                {this.state.rejectData==="undefined"?this.state.rejectData.map((jobs,index)=>{
                    return (
                        <tr>
                            <th>{jobs['job'].title}</th>
                            <th><FontAwesomeIcon icon={faClose} color={"red"}></FontAwesomeIcon></th>
                        </tr>
                    )
                }):<tr><td>-</td><td>-</td></tr>}
                </tbody> 
                </table>
                    </div>
                </React.Fragment>
            )
        })
    }

    selectedlist_form(){
        this.setState({form:null});
        this.setState({
            form:(
                <React.Fragment>
                    <div className="card-header">Selection List</div>
                    <div className="card-body">
                    <table class="table">
                    <thead>
                        <tr>
                            <th>Titile</th>
                            <th>Selected</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.data?this.state.data.map((jobs,index)=>{
                        return (
                            <tr>
                                <th>{jobs['job'].title}</th>
                                <th><FontAwesomeIcon icon={faCheck} color={"green"}></FontAwesomeIcon></th>
                            </tr>)
                    }):<div>No Data Available</div>}
                    </tbody> 
                    </table>
                    </div>
                </React.Fragment>
            )
        })
    }

    selectedlist_rejectForm(){
        console.log(this.state.rejectData);
        this.setState({rejectForm:null});
        this.setState({
            rejectForm:(
                <React.Fragment>
                    <div className="card-header">Rejection List</div>
                    <div className="card-body">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Titile</th>
                            <th>Shortlist</th>
                        </tr>
                    </thead>
                <tbody>
                {this.state.rejectData?this.state.rejectData.map((jobs,index)=>{
                    return (
                        <tr>
                            <th>{jobs['job'].title}</th>
                            <th><FontAwesomeIcon icon={faClose} color={"red"}></FontAwesomeIcon></th>
                        </tr>
                    )
                }):<div>No Data Available</div>}
                </tbody> 
                </table>
                    </div>
                </React.Fragment>
            )
        })
    }

    //function part
    get_shortlist_select_user = async() => {
        const body = {
            user:this.state.username,
        }
        await fetch("http://localhost:8000/jobs/get_shortlistjobuser/",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(body),
        })
        .then(res => res.json())
        .then(res => {
            console.log(res.data)
            if(res.status==="success"){
                this.setState({data:res.data})
                this.shortlist_form();
            }
        })
    }

    get_shortlist_reject_user = async() => {
        const body = {
            user:this.state.username,
        }
        await fetch("http://localhost:8000/jobs/get_shortlist_rejectjobuser/",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(body),
        })
        .then(res => res.json())
        .then(res => {
            console.log(res.data)
            if(res.status==="success"){
                this.setState({rejectData:res.data})
                this.shortlist_rejectForm();
            }
        })
    }

    get_selected_user = async() => {
        const body = {
            user:this.state.username,
        }
        await fetch("http://localhost:8000/jobs/get_selectedjobuser/",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(body),
        })
        .then(res => res.json())
        .then(res => {
            console.log(res.data)
            if(res.status==="success"){
                this.setState({data:res.data})
                this.selectedlist_form();
            }
        })
    }

    get_selected_reject_user = async() => {
        const body = {
            user:this.state.username,
        }
        await fetch("http://localhost:8000/jobs/get_selected_rejectjobuser/",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(body),
        })
        .then(res => res.json())
        .then(res => {
            if(res.status==="success"){
                this.setState({rejectData:res.data})
                this.selectedlist_rejectForm();

            }
        })
    }

    toggle_tab(index){
        this.setState({toggleStage:index});
        switch(index){
            case 1:
                this.shortlist_form();
                this.shortlist_rejectForm();
                this.get_shortlist_select_user();
                this.get_shortlist_reject_user();
                break;
            case 2:
                this.selectedlist_form();
                this.selectedlist_rejectForm();
                this.get_selected_user();
                this.get_selected_reject_user();
                break;
        }
    }

    render(){
        if(this.state.data!==null){
            this.state.data.map((row,index)=>{
                return (<tr>
                    <td>{index+1}</td>
                    <td>{row.shortlist}</td>
                    <td>{row.selected}</td>
                </tr>)
            })
        }
        return(
        <React.Fragment>
            <Navbar/>
            <div className="card bg-light mb-3 mx-auto" style={{maxWidth:50+"rem"}}>
            <ul className="nav nav-pills nav-justified">
                              <li className="nav-item">
                              <button className={this.state.toggleStage==1?"nav-link active":"nav-link "} 
                                  id="pills-contact-tab" 
                                  data-bs-toggle="pill" 
                                  data-bs-target="#pills-contact" 
                                  type="button" role="tab" 
                                  aria-controls="pills-contact" 
                                  aria-selected="false"
                                  onClick={() => this.toggle_tab(1)}>Shortlisted Job</button>
                              </li>

                              <li className="nav-item">
                              <button className={this.state.toggleStage==2?"nav-link active":"nav-link "} 
                                  id="pills-contact-tab" 
                                  data-bs-toggle="pill" 
                                  data-bs-target="#pills-contact" 
                                  type="button" role="tab" 
                                  aria-controls="pills-contact" 
                                  aria-selected="false"
                                  onClick={() => this.toggle_tab(2)}>Selected Job</button>
                              </li>
            </ul>
                <div>
                    {this.state.form}
                </div>

                <div>
                    {this.state.rejectForm}
                </div>
                
            </div>
        </React.Fragment>
        );
    }

} 

export default JobStatus;