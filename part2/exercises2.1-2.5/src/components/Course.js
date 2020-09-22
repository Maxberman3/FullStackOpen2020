import React from 'react'

const Course=(props)=>{
  return (
    <div>
    <h2>{props.course.name}</h2>
    <ul>
    {props.course.parts.map(part=><li key={part.id}>{part.name} {part.exercises}</li>)}
    </ul>
    <h5>The total number of exercises is: {props.course.parts.reduce((sum,part)=>{
      // console.log(part)
      // console.log(part.exercises)
      // console.log(sum)
      return sum+=part.exercises}
      ,0)}</h5>
    </div>
  )
}

export default Course
