
import { useEffect, useState } from 'react'
import useLocalStorage from 'use-local-storage';
import { useUnlock } from '../hooks/useUnlock';


export default function Weather() {


  const { loading, checkout, authenticate, isAuthorized, user } = useUnlock({
    title: "My weather app",
    locks: {
      '0x5805c1ad24fc267f08413287c584910604f2b5f3': {
        network: 5
      }
    }
  })

  const [saved, setSaved] = useLocalStorage("zipcode", "");
  const [confirmed, setConfirmed] = useState(true);

  const [zipcode, setZipcode] = useState(saved)
  const [data, setData] = useState({})

  useEffect(() => {
    var isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zipcode);
    if (isValidZip) {
      fetch(`https://openweathermap.org/data/2.5/find?q=${zipcode}&appid=439d4b804bc8187953eb36d2a8c26a02&units=metric`)
        .then((r) => r.json())
        .then((result) => {
          if (result.count > 0) {
            setData({
              location: [result.list[0].name, result.list[0].sys?.country].join(', '),
              icon: result.list[0].weather[0].icon
            })
          }
        })
    }
  }, [zipcode])

  const handleChange = (event) => {
    setData({})
    setConfirmed(true)
    setZipcode(event.target.value)

  }

  const onRemember = () => {
    setSaved(zipcode)
    setConfirmed(false)
    setTimeout(() => {
      setConfirmed(true)
    }, 2000)
  }

  return (
    <>
      <div className='mb-10'>
        <label className='block text-gray-700 text-sm mb-2'>Enter your zip code: </label>
        <input value={zipcode} type="number" className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' onChange={handleChange} />
      </div>

      {data?.location &&
        <div className='container mx-auto flex flex-col items-center'>
          <img style={{ width: '250px' }} src={`/icons/${data.icon}.svg`} />
          <h1 className='text-center text-lg font-bold text-gray-700 mb-10'>{data.location}</h1>

          {!user &&
            <button disabled={!confirmed} onClick={authenticate} class="bg-blue-500 text-white font-bold py-2 px-4 rounded enabled:hover:bg-blue-700 disabled:opacity-75">
              Authenticate to save your zipcode!
            </button>
          }
          {user && !isAuthorized && <>
            <button disabled={!confirmed} onClick={() => checkout()} class="bg-blue-500 text-white font-bold py-2 px-4 rounded enabled:hover:bg-blue-700 disabled:opacity-75">
              Purchase Premium!
            </button>
          </>}
          {isAuthorized && (
            <>
              <button disabled={!confirmed} onClick={onRemember} class="bg-blue-500 text-white font-bold py-2 px-4 rounded enabled:hover:bg-blue-700 disabled:opacity-75">
                Remember location
              </button>
              {!confirmed && <small>Saved!</small>}
            </>
          )
          }

        </div>
      }
    </>

  )
}
