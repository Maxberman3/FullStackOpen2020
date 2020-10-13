import anecdoteService from "../services/anecdotes";

const reducer = (state = [], action) => {
  // console.log('state now: ', state)
  // console.log('action', action)
  switch (action.type) {
    case "INIT_ANECDOTES":
      return action.data;
    case "VOTE":
      let voteFor = state.find(item => item.id === action.data.id);
      voteFor.votes = voteFor.votes + 1;
      return state
        .map(item => (item.id === voteFor.id ? voteFor : item))
        .sort((curr, next) => {
          return next.votes - curr.votes;
        });
    case "NEW_ANECDOTE":
      return state.concat(action.data);
    default:
      return state;
  }
};
export const castVote = id => {
  return {
    type: "VOTE",
    data: {id}
  };
};
export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch({
      type: "NEW_ANECDOTE",
      data: newAnecdote
    });
  };
};

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: "INIT_ANECDOTES",
      data: anecdotes
    });
  };
};

export default reducer;
