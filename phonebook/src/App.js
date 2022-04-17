import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '977-221' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input onChange={handleNameChange} value={newName}/><br/>
          number: <input onChange={handleNumberChange} value={newNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        <ul>
          {persons.map(person => <li key={person.name}>{person.name} {person.number}</li>)}
        </ul>
      </div>
    </div>
  )
}


export default App;
