import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '977-221' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault();
    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to the phonebook`);
    } else {
      let tmp_persons = [...persons];
      tmp_persons.push({ name: newName, number: newNumber });
      setPersons(tmp_persons);
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


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange} filter={filter}/>
      <PersonForm handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} newName={newName}
        newNumber={newNumber} handleSubmit={handleSubmit}/>
      <Persons filter={filter} persons={persons}/>
    </div>
  )
}


export default App;
