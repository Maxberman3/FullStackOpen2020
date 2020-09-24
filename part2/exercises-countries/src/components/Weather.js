import React, {useEffect, useState} from 'react';
import axios from 'axios';

const Weather=({capital,apiKey})=>{
  const [weather,setWeather]=useState('')

  const params={
    q:capital,
    appid:apiKey
  }

  useEffect(()=>{
    axios
    .get('api.openweathermap.org/data/2.5/weather', {params:params})
    .catch((error)=>{
      console.log(error)
    })
    .then((response)=>{
      setWeather(response.data)
    })
  },[]) // eslint-disable-line react-hooks/exhaustive-deps
  return (<div>
    {weather}
    </div>
  )
}

export default Weather
