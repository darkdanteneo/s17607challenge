import React, { Component } from 'react';
import axios from 'axios';
export default class CreateUser extends Component{
    constructor(props){
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            team_name: ''
        }
    }
    onChangeUsername(e){
        this.setState({
            team_name: e.target.value
        });
    }
    onSubmit(e){
        e.preventDefault();
        const team ={
            team_name: this.state.team_name,
            wins:0,
            losses: 0,
            ties: 0,
            score: 0
        }
       
        axios.post('http://localhost:5000/team/add', team)
        .then(res => console.log(res.data));
        this.setState({
            team_name: ''
        }); 
        window.location = '/';
    }
    render(){
        return(
            <div>
                <h3>Create new team</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label type="text">Team Name:</label>
                        <input type="text" required className="form-control" value={this.state.team_name} onChange={this.onChangeUsername}/>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Team" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}