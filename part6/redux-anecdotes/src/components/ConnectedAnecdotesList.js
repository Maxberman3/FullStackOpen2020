import React from "react";
import {connect} from "react-redux";
import {castVote} from "../reducers/anecdoteReducer";
import {createNotification} from "../reducers/notificationReducer";

const MappedAnecdotesList = props => {
  // console.log(props.castVote);
  // console.log(props.createNotification);
  return (
    <div>
      {props.anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button
              onClick={() => {
                props.castVote(anecdote.id);
                props.createNotification(
                  `You voted for '${anecdote.content}'`,
                  3
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

const mapStateToProps = state => {
  if (state.filter !== "") {
    return {
      anecdotes: state.anecdotes.filter(anecdote =>
        anecdote.content.includes(state.filter)
      )
    };
  }
  return {
    anecdotes: state.anecdotes
  };
};
const mapDispatchToProps = {
  createNotification,
  castVote
};
const ConnectedAnecdotesList = connect(
  mapStateToProps,
  mapDispatchToProps
)(MappedAnecdotesList);
export default ConnectedAnecdotesList;
