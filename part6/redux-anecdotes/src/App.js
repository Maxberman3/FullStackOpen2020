import React, {useEffect} from "react";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdotesList from "./components/AnecdotesList";
import Notification from "./components/Notification";
import Filter from "./components/Filter";
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
      <Filter />
      <h2>Anecdotes</h2>
      <AnecdotesList />
      <h2>create new</h2>
      <AnecdoteForm />
    </div>
  );
};

export default App;
