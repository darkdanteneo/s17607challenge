import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import './teams-list.css'

const Team = props =>(
    <tr>
        <td>{props.team.team_name}</td>
        <td>{props.team.wins}</td>
        <td>{props.team.losses}</td>
        <td>{props.team.ties}</td>
        <td>{props.team.score}</td>
      </tr>
)
export default class TeamList extends Component{
    constructor(props){
        super(props);

        this.state = { 
            teams: [],
            offset: 0,
            perPage: 10,
            currentPage: 0
        };
        this.handlePageClick = this.handlePageClick.bind(this);
    }
    recievedData(){
        axios.get('http://localhost:5000/team/')
        .then(response => {
            let teams = response.data;
            teams.sort((a,b) => {
                let x = a.score, 
                    y = b.score;
                return ((x > y) ? -1 : ((x < y) ? 1 : 0));
            });;
            const slice = teams.slice(this.state.offset, this.state.offset+ this.state.perPage)
            const postData  = slice.map(currentTeam => <React.Fragment>
                                                            <Team key={currentTeam._id} team={currentTeam} />
                                                        </React.Fragment>)
            this.setState({ pageCount: Math.ceil(teams.length / this.state.perPage), postData })
        })
        .catch((error) => {console.log(error);})
    }
    componentDidMount(){
        this.recievedData()
    }
    handlePageClick = (e) =>{
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage : selectedPage,
            offset : offset
        }, () => {this.recievedData()});
    }
    TeamList() {
        console.log(this.state.teams);
        return this.state.teams.map(currentTeam => {
              return <Team key={currentTeam._id} team={currentTeam} />;
          });
    }
    render(){
        return(
            <div>
                <h3> Logged Teams</h3>
                <table className="table">
                    <thead clasname="thead-light">
                        <tr>
                            <th>Team Name</th>
                            <th>Wins</th>
                            <th>Losses</th>
                            <th>Ties</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.postData}
                    </tbody>
                </table>
                <ReactPaginate
                  previousLabel={"prev"}
                  nextLabel={"next"}
                  breakLabel={"..."}
                  breakClassName={"break-me"}
                  pageCount={this.state.pageCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={this.handlePageClick}
                  containerClassName={"pagination"}
                  subContainerClassName={"pages pagination"}
                  activeClassName={"active"}/>
            </div>
        )
    }
}