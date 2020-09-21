import React from 'react'
import ReactDOM from 'react-dom'

const Header=(props) =>{
  return <h1> {props.courseName} </h1>
}
const Content=(props)=>{
  return (
    <div>
    <Part part={props.parts[0]}/>
    <Part part={props.parts[1]}/>
    <Part part={props.parts[2]}/>
    </div>
  )
}
const Total = (props)=>{
  return <p> Number of exercises {props.total}</p>
}
const Part = (props)=>{
  return <p> {props.part.name} {props.part.exercises}</p>
}
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header courseName={course.name}/>
      <Content parts={course.parts} />
      <Total total={course.parts[0].exercises+course.parts[1].exercises+course.parts[2].exercises}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
