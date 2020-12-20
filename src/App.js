import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import TeamList from "./components/teams-list.component";
import CreateTeam from "./components/create-team.component.js";
import AddResult from "./components/create-result.component.js";
function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={TeamList} />
        <Route path="/compare" component={AddResult} />
        <Route path="/team" component={CreateTeam} />
      </div>
    </Router>
  );
}

export default App;
