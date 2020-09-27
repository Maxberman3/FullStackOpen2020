import React from 'react'

const Directory=(props)=>{
  return(
    <div>
    <ul>
    {props.persons.map((person)=>{
      return (<li key={person.id}>{person.name} - {person.number} <button onClick={()=>props.onDeleteClick(person.id,person.name)}>Delete</button></li>)
    })}
    </ul>
    </div>
  )
}
export default Directory
