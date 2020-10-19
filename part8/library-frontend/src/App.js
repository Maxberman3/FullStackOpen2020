import React, {useState} from "react";
import Menu from "./components/Menu";
import {Switch, Route} from "react-router-dom";
import Authors from "./components/Authors";
import Books from "./components/Books";
import BookForm from "./components/BookForm";

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const notify = message => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };
  return (
    <div>
      <Menu />
      <Notify errorMessage={errorMessage} />
      <Switch>
        <Route path="/authors">
          <Authors />
        </Route>
        <Route path="/books">
          <Books />
        </Route>
        <Route path="/addBook">
          <BookForm setError={notify} />
        </Route>
        <Route path="">
          <h1>Welcome to the Libary App</h1>
        </Route>
      </Switch>
    </div>
  );
};
const Notify = ({errorMessage}) => {
  if (!errorMessage) {
    return null;
  }
  return <div style={{color: "red"}}>{errorMessage}</div>;
};
export default App;
