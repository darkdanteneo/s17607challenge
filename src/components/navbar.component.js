import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component{
    render(){
        return(
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand">Score Tracker</Link>
                <div className="navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/" className="nav-link">Teams</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/team" className="nav-link">Create Team</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/compare" className="nav-link">Add Result</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}