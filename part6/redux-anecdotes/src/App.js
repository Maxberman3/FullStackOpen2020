import React, {useEffect} from "react";
// import AnecdoteForm from "./components/AnecdoteForm";
import ConnectedAnecdoteForm from "./components/ConnectedAnecdoteForm";
// import AnecdotesList from "./components/AnecdotesList";
import ConnectedAnecdotesList from "./components/ConnectedAnecdotesList";
import Notification from "./components/Notification";
// import Filter from "./components/Filter";
import ConnectedFilter from "./components/ConnectedFilter";
import {useDispatch} from "react-redux";
import {initializeAnecdotes} from "./reducers/anecdoteReducer";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, [dispatch]);

  return (
    <div>
      <Notification />
      <ConnectedFilter />
      <h2>Anecdotes</h2>
      <ConnectedAnecdotesList />
      <h2>create new</h2>
      <ConnectedAnecdoteForm />
    </div>
  );
};

export default App;
