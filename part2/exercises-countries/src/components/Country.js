import React from 'react'

const Country = (props) => {
  // console.log('Country',props.filteredCountries)
  if(props.filteredCountries.length===0){
    return (<div></div>)
  }
  else{
    let country=props.filteredCountries[0]
    // console.log(country)
    return (<div>
      <h3>{country.name}</h3>
      Capital: {country.capital} <br></br>
      Population: {country.population}
      <h5>Languages</h5>
      <ul>
      {country.languages.map(language=><li key={language.iso639_2}>{language.name}</li>)}
      </ul>
      Flag: <br></br>
      <img src={country.flag} alt={`The flag of ${country.name}`}/>
      </div>
    )
  }
}
export default Country
