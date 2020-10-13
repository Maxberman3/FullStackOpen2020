import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {castVote} from "../reducers/anecdoteReducer";
import {createNotification} from "../reducers/notificationReducer";

const AnecdotesList = () => {
  const anecdotes = useSelector(({filter, anecdotes}) => {
    // console.log(filter)
    // console.log(anecdotes)
    return anecdotes.filter(anecdote => anecdote.content.includes(filter));
  });
  const dispatch = useDispatch();
  return (
    <div>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button
              onClick={() => {
                dispatch(castVote(anecdote.id));
                dispatch(
                  createNotification(`You voted for '${anecdote.content}'`, 3)
                );
              }}
            >
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
export default AnecdotesList;
