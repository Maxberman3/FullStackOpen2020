import React from 'react'

const Course=(props)=>{
  return (
    <div>
    {props.courses.map((course)=>{
      return(
        <div>
        <h2 key={course.id}>{course.name}</h2>
        <ul>
        {course.parts.map((part)=>{
          // console.log(part.id)
          return<li key={part.id}>{part.name}{part.exercises}</li>
        })}
        </ul>
        <h5>The total number of exercises is {course.parts.reduce((sum,part)=>{
          return sum+=part.exercises
        },0)}</h5>
        </div>
      )
    })}

    </div>
  )
}

export default Course
