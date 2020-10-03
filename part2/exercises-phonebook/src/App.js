import React, { useState, useEffect } from 'react'
import Directory from './components/Directory'
import NumberForm from './components/NumberForm'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [newNumber,setNewNumber] = useState('')
  const [nameFilter, setNameFilter]=useState('')
  const [notificationProps,setNotificationProps]=useState({notificationMessage:'',notificationColor:'green'})

  useEffect(()=>{
    personService.getPersons()
  .then(allPersons=>{
    console.log(allPersons)
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
    let ret=persons.findIndex(person=>person.name===newName)
    if(ret<0){
      const newPerson={name:newName,number:newNumber}
      personService.create(newPerson)
      .then((returnPerson)=>{
        setPersons(persons.concat(returnPerson))
        const submitSuccessNotification={
          notificationMessage:`${returnPerson.name} was successfully added to the Phonebook`,
          notificationColor:'green'
        }
        setNotificationProps(submitSuccessNotification,3000)
      }).catch((error)=>{
        console.log(`The request failed with the following error: ${error}`)
        const submitFailNotification={
          notificationMessage:`The submission to the Phonebook failed due to an internal error`,
          notificationColor:'red'
        }
        setNotificationProps(submitFailNotification,3000)
      }).finally(()=>{
        resetPersonForm()
      })
    }
    else{
      let perfectMatch=persons.findIndex((person)=>{
        return person.name===newName && person.number===newNumber})
      // console.log(`Find index return val is : ${ret}`)
      if(perfectMatch<0){
      const confirm=window.confirm('That name is already recorded in the Phonebook, would you like to change the number?')
      if(confirm){
        // console.log(`The person being updated is ${persons[ret]}`)
        const newPerson={...persons[ret], number:newNumber}
        // console.log(`The new object is ${newPerson}`)
        // console.log(newPerson.id)
        personService.updatePerson(newPerson)
        .then((returnPerson)=>{
          const removedPerson=persons.filter(person=>person.id!==returnPerson.id)
          setPersons(removedPerson.concat(returnPerson))
        })
        .catch((error)=>{
          console.log(`The request failed with the following error: ${error}`)
          const submitFailNotification={
            notificationMessage:`The submission to the Phonebook failed due to an internal error`,
            notificationColor:'red'
          }
          setNotificationProps(submitFailNotification,3000)
        })
      }
      }
      else{
          const submitFailNotification={
            notificationMessage:`The submission to the Phonebook failed due to an internal error`,
            notificationColor:'red'
          }
          setNotificationProps(submitFailNotification,3000)
      }
      resetPersonForm()
    }
  }
  const resetPersonForm=()=>{
    // console.log('entered resetPersonForm function')
    setNewName('')
    setNewNumber('')
  }
  const onDeleteClick=(id, name)=>{
    // console.log(`Clicked to delete person ${id}`)
    const confirmed=window.confirm(`Are you sure you want to delete ${name}?`)
    if(confirmed){
    personService.deletePerson(id)
    .then(()=>{
      personService.getPersons()
      .then(allPersons=>{
        setPersons(allPersons)
      })
    })
    .catch(error=>{
      console.log(`Error deleting: ${error}`)
    })
  }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <NumberForm name={newName} number={newNumber} onNameChange={onNameChange} onNumberChange={onNumberChange} onSubmit={onSubmit}/>
      <Notification notificationMessage={notificationProps.notificationMessage} notificationColor={notificationProps.notificationColor}/>
      <h2>Numbers</h2>
      Filter by Name: <input onChange={onFilterChange}/>
      <Directory persons={filteredPersons} onDeleteClick={onDeleteClick}/>
    </div>
  )
}

export default App
