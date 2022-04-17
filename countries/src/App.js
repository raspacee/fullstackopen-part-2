import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log(response.data)
        setCountries(response.data);
      })
  }, [])

  const handleQueryChange = (e) => {
    setQuery(e.target.value);

    const filtered = countries.filter(country => country.name.common.toLowerCase().includes(e.target.value));
    if (filtered.length > 10) {
      setFilteredCountries([]);
    } else {
      setFilteredCountries(filtered);
    }
  }

  return (
    <div className="App">
      <label>find countries</label><input onChange={handleQueryChange} value={query}/>
      <ul>
        {filteredCountries.length > 0
          ? filteredCountries.map(country => <li key={country.name.common}>{country.name.common}</li>)
          : <li>Too many matches, specify another filter</li>}
      </ul>
      {filteredCountries.length === 1
        ? filteredCountries.map(country => {
          return (
            <div>
              <h1>{country.name.common}</h1>
              <p>capital {country.capital}</p>
              <p>area {country.area}</p>
              <ul>
                {Object.values(country.languages).map(l => <li>{l}</li>)}
              </ul>
            </div>
          )
        })
        : <></>}
    </div>
  );
}

export default App;
