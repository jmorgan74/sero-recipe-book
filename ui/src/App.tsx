import "./App.css";

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Home from "./pages/Home/Home";
import axios from "axios";
import NavBar from "./components/NavBar";
import Create from "./pages/Create/Create";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const App = () => {
  return (
    <>
    <NavBar />
    <div className="container">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
        <Switch>
          <Route exact path="/create" component={Create} />
        </Switch>
      </Router>
    </div>
    </>
  );
};

export default App;
