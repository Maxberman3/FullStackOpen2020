import React, { useState } from 'react'
import Directory from './components/Directory'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ])
  const [ newName, setNewName ] = useState('')

  const onNameChange=(event)=>{
    setNewName(event.target.value)
  }
  const onNameSubmit=(event)=>{
    event.preventDefault()
    const newPerson={ name: newName }
    setPersons(persons.concat(newPerson))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input onChange={onNameChange}/>
        </div>
        <div>
          <button type="submit" onClick={onNameSubmit}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Directory persons={persons}/>
    </div>
  )
}

export default App
