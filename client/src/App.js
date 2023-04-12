import "./App.css";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/landing/LandingPage";
import HomePage from "./components/home/HomePage";
import Create from "./components/create/Create";
import Detail from "./components/detail/Detail";
import Modal from "react-modal";
import axios from "axios";

axios.defaults.baseURL = "https://deploy-production-d3a9.up.railway.app/";

Modal.setAppElement("#root");

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/home" component={HomePage} />
          <Route exact path="/pokemon" component={Create} />
          <Route exact path="/home/:id" component={Detail} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
