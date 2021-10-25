import React, { useState } from "react";
import "./App.scss";
import { Sidebar, Chat, Login } from "./components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useStateValue } from "./StateProvider";

function App() {
  const [{ user }, dispatch] = useStateValue();
  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app-body">
          <Router>
            <Switch>
              <Route exact path="/">
                <Sidebar />
              </Route>
              <Route path="/rooms/:roomId">
                <Sidebar />
                <Chat />
              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
