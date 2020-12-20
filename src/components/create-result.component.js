import React, { Component } from 'react';
import axios from 'axios';
export default class CreateExercise extends Component{

    constructor(props){
        super(props);

        this.onChangeUsername1 = this.onChangeUsername1.bind(this);
        this.onChangeUsername2 = this.onChangeUsername2.bind(this);
        this.onChangeResult = this.onChangeResult.bind(this)
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            teams:[],
            team_name1:'',
            team_name2:'',
            stage: ''
        }
    }

    componentDidMount(){
        axios.get('http://localhost:5000/team/')
        .then(response => {
            if(response.data.length >0)
            {
                this.setState({
                    teams: response.data.map(team => team.team_name),
                    team_name1: response.data[0].team_name,
                    team_name2: response.data[1].team_name
                })
            }
        })
    }

    onChangeUsername1(e){
        this.setState({
            team_name1: e.target.value
        });
    }
    onChangeUsername2(e){
        this.setState({
            team_name2: e.target.value
        });
    }
    onChangeResult(e){
        this.setState({
            stage: e.target.value
        });
        
    }
    onSubmit(e){
        e.preventDefault();
        if(this.state.stage === 'win'){
            axios.post('http://localhost:5000/team/update', {team_name: this.state.team_name1, wins:1, losses:0, ties:0, score:3})
            .then(res => console.log(res.data));
            axios.post('http://localhost:5000/team/update', {team_name: this.state.team_name2, wins:0, losses:1, ties:0, score:0})
            .then(res => console.log(res.data));
        }
        else if(this.state.stage ==='lose'){
            axios.post('http://localhost:5000/team/update', {team_name: this.state.team_name1, wins:0, losses:1, ties:0, score:0})
            .then(res => console.log(res.data));
            axios.post('http://localhost:5000/team/update', {team_name: this.state.team_name2, wins:1, losses:0, ties:0, score:3})
            .then(res => console.log(res.data));
        }
        else{
            axios.post('http://localhost:5000/team/update', {team_name: this.state.team_name2, wins:0, losses:0, ties:1, score:1})
            .then(res => console.log(res.data));
            axios.post('http://localhost:5000/team/update', {team_name: this.state.team_name1, wins:0, losses:0, ties:1, score:1})
            .then(res => console.log(res.data));
        }
        

        window.location = '/';
    }
    render(){
        return(
            <div>
                <h3> Create New Result Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Select Team A:</label>
                        <select required className="form-control"
                        value={this.state.team_name1} onChange={this.onChangeUsername1}>
                            {
                                this.state.teams.map(function(team){
                                    return <option key={team} value={team}> {team} </option>;
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Select Team B:</label>
                        <select required className="form-control"
                        value={this.state.team_name2} onChange={this.onChangeUsername2}>
                            {
                                this.state.teams.map(function(team){
                                    return <option key={team} value={team}> {team} </option>;
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Select Outcome</label>
                        <select required className="form-control"
                        value={this.state.stage} onChange={this.onChangeResult}>
                            <option key="tie" value="tie">Tie</option>
                            <option key="win" value="win">Team A Won</option>
                            <option key="lose" value="lose">Team B Won</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Add Result Log" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}