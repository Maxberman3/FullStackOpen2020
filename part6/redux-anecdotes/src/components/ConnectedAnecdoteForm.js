import React from "react";
import {connect} from "react-redux";
import {createAnecdote} from "../reducers/anecdoteReducer";
import {createNotification} from "../reducers/notificationReducer";

const MappedAnecdoteForm = props => {
  const addAnecdote = async event => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    props.createAnecdote(content);
    props.createNotification(`You created '${content}'`, 3);
  };
  return (
    <form onSubmit={addAnecdote}>
      <div>
        <input name="anecdote" />
      </div>
      <button type="submit">create</button>
    </form>
  );
};

const mapDispatchToProps = {
  createAnecdote,
  createNotification
};
const ConnectedAnecdoteForm = connect(
  null,
  mapDispatchToProps
)(MappedAnecdoteForm);
export default ConnectedAnecdoteForm;
