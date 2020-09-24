import React, { useState, useEffect } from 'react'
import Directory from './components/Directory'
import NumberForm from './components/NumberForm'
import axios from 'axios'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [newNumber,setNewNumber] = useState('')
  const [nameFilter, setNameFilter]=useState('')

  useEffect(()=>{
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
    })
  },[])

  const filteredPersons=persons.filter(person=>person.name.toLowerCase().includes(nameFilter.toLowerCase()))

  const onNameChange=(event)=>{
    setNewName(event.target.value)
  }
  const onNumberChange=(event)=>{
    setNewNumber(event.target.value)
  }
  const onFilterChange=(event)=>{
    setNameFilter(event.target.value)
  }
  const onSubmit=(event)=>{
    event.preventDefault()
    let ret=persons.findIndex((person)=>{
      // console.log(person.name)
      return person.name===newName})
    if(ret<0){
    const newPerson={ name: newName, number: newNumber}
    setPersons(persons.concat(newPerson))
  }
  else{
    window.alert(`${newName} has already been added to the phone book`)
  }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <NumberForm onNameChange={onNameChange} onNumberChange={onNumberChange} onSubmit={onSubmit}/>
      <h2>Numbers</h2>
      Filter by Name: <input onChange={onFilterChange}/>
      <Directory persons={filteredPersons}/>
    </div>
  )
}

export default App
