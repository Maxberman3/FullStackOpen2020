import React from 'react'

const Countries=(props)=>{
  // console.log('Countries', props.filteredCountries)
  if(props.filteredCountries.length<=10){
  return (<ul>
    {
      props.filteredCountries.map(country => {
        return <li key={country.alpha3Code}>{country.name}
        <button value={country.name} onClick={props.onShowClick}>Show</button>
        </li>
      })
    }
  </ul>)
}
else{
  return(
    <h3> Too many results, please specify desired countries </h3>
  )
}
}

export default Countries
