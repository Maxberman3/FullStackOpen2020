import React from "react";
import Menu from "./components/Menu";
import {Switch, Route} from "react-router-dom";
import Authors from "./components/Authors";

const App = () => {
  return (
    <div>
      <Menu />
      <Switch>
        <Route path="/authors">
          <Authors />
        </Route>
        <Route path="">
          <h1>Welcome to the Phonebook App</h1>
        </Route>
      </Switch>
    </div>
  );
};

export default App;
