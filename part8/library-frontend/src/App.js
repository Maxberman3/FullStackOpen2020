import React from "react";
import Menu from "./components/Menu";
import {Switch, Route} from "react-router-dom";
import Authors from "./components/Authors";
import Books from "./components/Books";
import BookForm from "./components/BookForm";

const App = () => {
  return (
    <div>
      <Menu />
      <Switch>
        <Route path="/authors">
          <Authors />
        </Route>
        <Route path="/books">
          <Books />
        </Route>
        <Route path="/addBook">
          <BookForm />
        </Route>
        <Route path="">
          <h1>Welcome to the Libary App</h1>
        </Route>
      </Switch>
    </div>
  );
};

export default App;
