import React, {useEffect, useState} from 'react';
import axios from 'axios';

const Weather=({capital,apiKey})=>{
  const [weather,setWeather]=useState('')
  const [hasWeather,setHasWeather]=useState(false)
  const params={
    q:capital,
    appid:apiKey
  }
  // console.log(apiKey)
  useEffect(()=>{
    axios
    .get('http://api.openweathermap.org/data/2.5/weather', {params:params})
    .catch((error)=>{
      console.log(error)
    })
    .then((response)=>{
      setWeather(response.data)
      setHasWeather(true)
    })
  },[]) // eslint-disable-line react-hooks/exhaustive-deps
  // console.log(weather)
  if(hasWeather){
  return (<div>
    Conditions: {weather.weather[0].main} <br></br>
    Temperature: {Math.floor(weather.main.temp/10)} <br></br>
    </div>
  )
}
return <h5> No weather data retrieved </h5>
}

export default Weather
