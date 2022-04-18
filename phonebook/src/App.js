import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import { create, getAll, deletePerson } from './services/numbers'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    getAll()
      .then(returnedPersons => {
        setPersons(returnedPersons);
      })
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to the phonebook`);
    } else {
      let tmp_persons = [...persons];
      let new_person = { name: newName, number: newNumber };

      create(new_person)
        .then(data => {
          tmp_persons.push(data);
          setPersons(tmp_persons);
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
      deletePerson(id)
        .then(data => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          alert(error);
        })
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange} filter={filter}/>
      <PersonForm handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} newName={newName}
        newNumber={newNumber} handleSubmit={handleSubmit}/>
      <Persons handleDelete={handleDelete} filter={filter} persons={persons}/>
    </div>
  )
}


export default App;
