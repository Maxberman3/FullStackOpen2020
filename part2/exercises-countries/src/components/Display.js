import React from 'react';
import Countries from './Countries';
import Country from './Country'

const Display=(props)=>{
  // console.log('display ',props.filteredCountries)
  if(props.filteredCountries.length>1){
    return(
      <Countries filteredCountries={props.filteredCountries}/>
    )
  }
  else{
    return(
      <Country filteredCountries={props.filteredCountries}/>
    )
  }
}
export default Display
