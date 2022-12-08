
import { Route, Router, Switch } from "react-router-dom";
import "./App.css";
import React, { Component } from "react";
import history from "./history";
import GameRoom from "./GameRoom/GameRoom";
import WaitingRoom from "./WaitingRoom/WaitingRoom";
import Todo from "./TestFirebase/Todo";
import Lobby from "./Lobby/Lobby";
class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Router history={history}>
          <div>
            <Switch>
              <Route path="/" exact component={Lobby} />
              <Route path="/waitingroom" exact component={WaitingRoom} />
              <Route path="/gameroom/:roomid" exact component={GameRoom} />
              <Route path="/todo" exact component={Todo} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;