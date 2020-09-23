import React, { useState } from 'react'
import Directory from './components/Directory'
import NumberForm from './components/NumberForm'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [newNumber,setNewNumber] = useState('')
  const [nameFilter, setNameFilter]=useState('')

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
