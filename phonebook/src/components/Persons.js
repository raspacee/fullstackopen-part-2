const Persons = ({ persons, filter, handleDelete }) => {
    return (
    <>
    <h2>Numbers</h2>
      <div>
        <ul>
          {persons.filter(person => person.name.toLowerCase().includes(filter))
            .map(person => <li key={person.name}>{person.name} {person.number} <button onClick={() => handleDelete(person.id, person.name)}>delete</button></li>)}
        </ul>
      </div>
    </>
    )
}

export default Persons;