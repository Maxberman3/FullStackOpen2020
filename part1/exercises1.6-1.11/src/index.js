import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'

const Button = (props) => {
  return <button onClick={props.handleClick}> {props.text} </button>
}

const Stats = (props) => {
    const total = props.good+props.neutral+props.bad
    const average= ((props.good*1)+(props.bad*-1))/total
    if(total>0){
    return(
      <div>
      <table>
      <tr><th style={{backgroundColor: 'Gray' }}>Statistic</th><th style={{backgroundColor: 'Gray'}}>Value</th></tr>
      <tr><td><b>Total feedback collected</b></td><td>{total}</td></tr>
      <tr><td><b> Average feedback value </b></td><td> {average}</td></tr>
      <tr><td><b>Percentage of positive feedback</b></td><td> {props.good/total} %</td></tr>
      </table>
      </div>
    )
  }
  else{
    return <h4> No stats yet since we haven't recieved any feedback (yet!)</h4>
  }
}

const Statistic = (props)=>{
  return <h5> {props.text}: {props.value} </h5>
}

const Display = (props) => {
  return (
    <div>
    <h5>People who thought we were great: {props.good}</h5>
    <h5>People who don't really think anything: {props.neutral}</h5>
    <h5>People who politely told us we could do better: {props.bad}</h5>
    </div>
  )
}

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
      <Display good={good} neutral={neutral} bad={bad}/>
      <Stats good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
