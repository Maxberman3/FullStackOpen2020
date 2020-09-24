import React, {useState,useEffect} from 'react';
import './App.css';
import axios from 'axios';
import Display from './components/Display'

function App() {
  const [countries,setCountries]=useState([])
  const [countryFilter, setCountryFilter]=useState('')

  useEffect(()=>{
    axios
    .get("https://restcountries.eu/rest/v2/all")
    .then((response)=>{
      setCountries(response.data)
    })
  }, [])

  const onFindCountryChange=(event)=>{
    setCountryFilter(event.target.value)
  }
  const filteredCountries=countries.filter(country => country.name.toLowerCase().includes(countryFilter.toLowerCase()))
  const onShowClick=(event)=>{
    setCountryFilter(event.target.value)
  }
  // console.log(countries)
  // console.log(filteredCountries)
  return (<div>
    Find Countries: <input onChange={onFindCountryChange}/>
    <h2>Results</h2>
    <Display filteredCountries={filteredCountries} onShowClick={onShowClick}/>
    </div>
  );
}

export default App;
