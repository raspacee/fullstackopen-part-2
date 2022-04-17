import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [highlightedCountry, setHighlightedCountry] = useState({});

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data);
      })
  }, [])

  const handleQueryChange = (e) => {
    setQuery(e.target.value);

    const filtered = countries.filter(country => country.name.common.toLowerCase().includes(e.target.value));
    if (filtered.length > 10) {
      setFilteredCountries([]);
    } else if (filtered.length === 1) {
      setHighlightedCountry(filtered[0]);
    } else {
      setFilteredCountries(filtered);
    }
  }

  const handleShow = (country) => {
    setHighlightedCountry(country)
  }

  return (
    <div className="App">
      <label>find countries</label><input onChange={handleQueryChange} value={query}/>
      <ul>
        {filteredCountries.length > 0
          ? filteredCountries.map(country => <li key={country.name.common}>{country.name.common} <button onClick={() => handleShow(country)}>show</button></li>)
          : <li>Too many matches, specify another filter</li>}
      </ul>
        { Object.keys(highlightedCountry).length != 0
        ? <div>
            <h1>{highlightedCountry.name.common}</h1>
            <p>capital {highlightedCountry.capital}</p>
            <p>area {highlightedCountry.area}</p>
            <ul>
              {Object.values(highlightedCountry.languages).map(l => <li key={l}>{l}</li>)}
            </ul>
          </div>
        : <></>
        }
    </div>
  );
}

export default App;
