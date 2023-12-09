import { useState, useEffect } from 'react'
import countryService from './services/country'
import weatherService from './services/weather'

const RenderResults = ({searchResults, showSingle}) => {
  const resultLength = searchResults.length;
  switch (true) {
    case (resultLength === 0):
      return
    case (resultLength === 1):
      return (
        <RenderCountry country={searchResults[0]} />
      )
    case (resultLength <= 10):
      return (
        <>
          {searchResults.map((country, i) => {
            return (
                <p  key={i}>
                  {country.name.common}
                  <button onClick={()=>showSingle(country)}>Show</button>
                </p>
            )
          })}
        </>
      )
    case (resultLength > 10):
      return (
        <p>Too many results</p>
      )
  }
}

const FindCountry = ({handleSearchChange}) =>
  <div>
    Find countries
    <input
      onChange={(e) => handleSearchChange(e.target.value)}
    />
  </div>

const RenderCountry = ({country}) => {
  weatherService.getWeather(country.latlng[0], country.latlng[1])

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital[0]}</p>
      <p>Area: {country.area}</p>
      <ul>
        {Object.entries(country.languages).map(([k,v]) => <li key={k}>{v}</li>)}
      </ul>
      <img src={country.flags['png']} />
    </div>
  )
}

function App() {
  const [searchResults, setSearchResults] = useState([])
  const [countries, setCountries] = useState([])

  
  useEffect(() => {
    countryService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
      .catch(error => {
        alert(`Failed to retrieve initial state from the server: ${error}`)
      })
  }, []);

  const searchCountries = (searchStr) => {
    const result = countries.filter(country => 
      country.name.common.toLowerCase().includes(searchStr.toLowerCase())
    )
    setSearchResults(result)
  }

  const showSingle = (country) => 
    setSearchResults([country])
  

  return (
    <>
      <FindCountry handleSearchChange={searchCountries}/>
      <RenderResults searchResults={searchResults} showSingle={showSingle}/>
    </>
  )
}

export default App
