import React, { Component } from "react";

class JobStatus extends Component{
    constructor(props){
        super(props);
        this.state = {
            job:null,
            data:null,
            username:null,
        }
    }
    componentDidMount(){
        this.get_status();
        if(localStorage.getItem('user')){
            this.setState({username:localStorage.getItem('user')});
        }
    }

    get_status = async(job) => {
        const body = {
            user:this.state.username,
            job:job
        }
        await("http://localhost:8000/jobs/get_checkstatus/",{
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(body),
        })
        .then(res => res.json())
        .then(res => {
            if(res.status==="success"){
                this.setState({data:res.data})
            }
        })
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
        return(<div className="card bg-light mb-3 mx-auto" style={{maxWidth:50+"rem"}}>
        <div className="card-header">Applied Job</div>
        <div className="card-body">
        <table class="table">
            <thead>
                <tr>
                    <th>Index</th>
                    <th>Titile</th>
                    <th>Applied</th>
                    <th>Shortlist</th>
                    <th>Selected</th>
                </tr>
            </thead>
        <tbody>
          {this.state.data}
        </tbody> 
        </table>
        </div>
      </div>);
    }

} 

export default JobStatus;