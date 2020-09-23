import React from 'react'

const Directory=(props)=>{
  return(
    <div>
    <ul>
    {props.persons.map((person,i)=>{
      return <li key={i}>{person.name}</li>
    })}
    </ul>
    </div>
  )
}
export default Directory
