import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return <button onClick={props.handleClick}> {props.text} </button>
}

const Display

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementGood = () => setGood(good+1)
  const incrementNeutral = () => setNeutral(neutral+1)
  const incrementBad = () => setBad(bad+1)
  return (
    <div>
      <h1 style={{textDecoration:'underline', textAlign:'center'}}> We appreciate your feedback! </h1>
      <h3>Did you enjoy your experience?</h3>
      <Button handleClick={incrementGood} text='Yes I Did'/>
      <Button handleClick={incrementNeutral} text='Fine enough'/>
      <Button handleClick={incrementBad} text='Nah, you suck'/>
      <h3> Here's how we're doing so far: </h3>
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
