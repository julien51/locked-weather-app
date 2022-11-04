
import { useEffect, useState } from 'react'
import useLocalStorage from 'use-local-storage';
import Save from './Save';


export default function Weather() {

  const [zipcode, setZipcode] = useState()
  const [weatherData, setWeatherData] = useState({})

  useEffect(() => {
    var isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zipcode);
    if (isValidZip) {
      fetch(`https://openweathermap.org/data/2.5/find?q=${zipcode}&appid=439d4b804bc8187953eb36d2a8c26a02&units=metric`)
        .then((r) => r.json())
        .then((result) => {
          if (result.count > 0) {
            setWeatherData({
              location: [result.list[0].name, result.list[0].sys?.country].join(', '),
              icon: result.list[0].weather[0].icon
            })
          }
        })
    }
  }, [zipcode])

  const handleChange = (event) => {
    setWeatherData({})
    setZipcode(event.target.value)
  }

  const handleLoaded = (value) => {
    setZipcode(value)
  }

  return (
    <>
      <div className='mb-10'>
        <label className='block text-gray-700 text-sm mb-2'>Enter your zip code: </label>
        <input value={zipcode} type="number" className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' onChange={handleChange} />
      </div>

      {weatherData?.location &&
        <div className='container mx-auto flex flex-col items-center'>
          <img style={{ width: '250px' }} src={`/icons/${weatherData.icon}.svg`} />
          <h1 className='text-center text-lg font-bold text-gray-700 mb-10'>{weatherData.location}</h1>
        </div>
      }
      <div className='container mx-auto flex flex-col items-center'>
        <Save ready={weatherData?.location} zipcode={zipcode} onLoaded={handleLoaded} />
      </div>
    </>

  )
}
