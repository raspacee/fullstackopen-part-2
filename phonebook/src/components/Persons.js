const Persons = ({ persons, filter }) => {
    return (
    <>
    <h2>Numbers</h2>
      <div>
        <ul>
          {persons.filter(person => person.name.toLowerCase().includes(filter))
            .map(person => <li key={person.name}>{person.name} {person.number}</li>)}
        </ul>
      </div>
    </>
    )
}

export default Persons;