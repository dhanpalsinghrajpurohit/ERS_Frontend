import React, { Component } from "react";
import DateTimePicker from 'react-datetime-picker';
import Navbar from "../../UI/Navbar/Navbar";

class Interviews extends Component{
    constructor(props){
        super(props);
        this.state = {
            data:null,
            message:null,
            schedules:null,
            onchange : null,
            value:new Date(),
        }
        this.insert_schedule = this.insert_schedule.bind(this);
    }
    componentDidMount(){
        this.get_schedule();
        this.show_schedule();
    }
    // functions
    onChange(date){
        this.setState({value:date})
        console.log(this.state.value);
    }

    getdate(dates){
        let date = dates.getDate();
        let month = dates.getMonth() + 1;
        let year = dates.getFullYear();
        return year+"-"+month+"-"+date;
    }
    get_schedule = async() =>{
        const body = {
            user:localStorage.getItem('user')
        }
        await fetch("http://localhost:8000/jobs/get_schedule/",{
            method:"POST",
            headers:{
                'Content-Type':'Application/json'
            },
            body:JSON.stringify(body)
        })
        .then(res => res.json())
        .then(res => {
            if(res.status==="success"){
                console.log(res.data)
                if(res.data.length){
                    this.setState({data:res.data});
                }
            }
            else{
                this.setState({message:res.error})
            }
        })
    }

    insert_schedule = async(schedule) => {
        const body = {
            'user':localStorage.getItem('user'),
            'job': schedule['job'].id,
            'schedule':this.getdate(this.state.value),
        }
        console.log(body);
        await fetch("http://localhost:8000/jobs/insert_schedule/",{
            method:"POST",
            headers:{
                'Content-Type':'Application/json'
            },
            body:JSON.stringify(body)
        })
        .then(res => res.json())
        .then(res => {
            if(res.status==="success"){
                this.setState({message:res.message})
            }
            else{
                this.setState({message:res.error})
            }
        })
    }

    show_schedule = async() =>{
        const body = {
            user:localStorage.getItem('user')
        }
        await fetch("http://localhost:8000/jobs/show_schedule/",{
            method:"POST",
            headers:{
                'Content-Type':'Application/json'
            },
            body:JSON.stringify(body)
        })
        .then(res => res.json())
        .then(res => {
            if(res.status==="success"){
                console.log(res.data)
                if(res.data.length){
                    this.setState({schedules:res.data});
                    console.log(this.state.schedules)
                }
            }
            else{
                this.setState({message:res.error})
            }
        })
    }

    render(){
        return(
            <React.Fragment>
                <Navbar />
                {this.state.message}

                <div className="card mx-auto" style={{width:90+'%',marginTop:5+'%',borderRadius:5+'px'}}>
                <div>
                    <h5>Already Schedule</h5>
                    <table className="table" style={{border:2+"px"}}>
                    <thead>
                        <tr>
                            <th>SR.No</th>
                            <th>Title</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.schedules?this.state.schedules.map((schedule,index)=>{
                        return (
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{schedule['job'].title}</td>
                                <td>{schedule['schedule']}</td>
                                <td>
                                
                                </td>
                                <td>
                                
                                </td>
                            </tr>)
                    }):null}
                        
                    </tbody>
                    </table>
                </div>
                </div>


                <div className="card mx-auto" style={{width:90+'%',marginTop:5+'%',borderRadius:5+'px'}}>
                <div>
                    <table className="table" style={{border:2+"px"}}>
                    <thead>
                        <tr>
                            <th>SR.No</th>
                            <th>Title</th>
                            <th>Skills</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.data?this.state.data.map((schedule,index)=>{
                        return (
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{schedule['job'].title}</td>
                                <td>{schedule['job'].skills}</td>
                                <td>
                                    <DateTimePicker className="mx-auto"
                                    format="dd/MM/yyyy"
                                    onChange={(date)=>this.onChange(date)} 
                                    disableClock={true}
                                    value={this.state.value} minDate={new Date()}/>
                                </td>
                                <td>
                                <button className="btn btn-dark" 
                                        onClick={()=>this.insert_schedule(schedule)}>Schedule
                                </button>
                                </td>
                            </tr>)
                    }):null}
                        
                    </tbody>
                    </table>
                </div>
                </div>
                
            </React.Fragment>
        )  
    }
}

export default Interviews;