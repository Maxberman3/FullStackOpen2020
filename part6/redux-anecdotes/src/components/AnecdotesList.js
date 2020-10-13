import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { castVote } from '../reducers/anecdoteReducer'

const AnecdotesList = ()=>{

    const anecdotes = useSelector(state => state)
    const dispatch=useDispatch()
  return (
    <div>
    {anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => dispatch(castVote(anecdote.id))}>vote</button>
        </div>
      </div>
    )}</div>
  )
}
export default AnecdotesList
