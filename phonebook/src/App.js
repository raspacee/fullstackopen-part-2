import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import NumberService from './services/numbers'
import { SuccessNotification, ErrorNotification } from './components/Notifications'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [sucessMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    NumberService.getAll()
      .then(returnedPersons => {
        setPersons(returnedPersons);
      })
  }, [])

  const handleSubmit = (event, name) => {
    event.preventDefault();
    const person = persons.find(person => person.name === newName) 
    if (person) {
      if (window.confirm(`${person.name} is already added. Do you want to change the phone number?`)) {
        NumberService.updateNumber({ ...person, number: newNumber })
          .then(returnedPerson => {
            setPersons(persons.map(person => person.name === returnedPerson.name ? returnedPerson : person));
          })
      }
    } else {
      NumberService.create({ name: newName, number: newNumber })
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));

          setSuccessMessage(`Added ${returnedPerson.name}`)
          setTimeout(() => {
            setSuccessMessage(null);
          }, 5000)
        })
        .catch(error => {
          alert('error')
        })
    }

    setNewName('');
    setNewNumber('');
  }

  const handleNameChange= (event) => {
    event.preventDefault();
    setNewName(event.target.value);
  }

  const handleNumberChange= (event) => {
    event.preventDefault();
    setNewNumber(event.target.value);
  }

  const handleFilterChange= (event) => {
    event.preventDefault();
    setFilter(event.target.value);
  }

  const handleDelete = (id, name) => {
    if (window.confirm(`Do you really want to delete ${name}?`)) {
      NumberService.deletePerson(id)
        .then(data => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          setErrorMessage(`${name}'s information was already deleted from server`)
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000)
          setPersons(persons.filter(person => person.name !== name))
        })
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <SuccessNotification message={sucessMessage}/>
      <ErrorNotification message={errorMessage}/>
      <Filter handleFilterChange={handleFilterChange} filter={filter}/>
      <PersonForm handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} newName={newName}
        newNumber={newNumber} handleSubmit={handleSubmit}/>
      <Persons handleDelete={handleDelete} filter={filter} persons={persons}/>
    </div>
  )
}


export default App;
