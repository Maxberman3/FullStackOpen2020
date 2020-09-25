import React, { useState, useEffect } from 'react'
import Directory from './components/Directory'
import NumberForm from './components/NumberForm'
import axios from 'axios'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [newNumber,setNewNumber] = useState('')
  const [nameFilter, setNameFilter]=useState('')

  useEffect(()=>{
    personService.getPersons()
  .then(allPersons=>{
    setPersons(allPersons)
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
    personService.create(newPerson)
    .then(returnedPerson=>{
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    })
  }
  else{
    window.alert(`${newName} has already been added to the phone book`)
  }
  }
  const onDeleteClick=(id)=>{
    personService.deletePerson(id)
    .then(responseData=>
    console.log(responseData))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <NumberForm onNameChange={onNameChange} onNumberChange={onNumberChange} onSubmit={onSubmit}/>
      <h2>Numbers</h2>
      Filter by Name: <input onChange={onFilterChange}/>
      <Directory persons={filteredPersons} onDeleteClick={}/>
    </div>
  )
}

export default App
