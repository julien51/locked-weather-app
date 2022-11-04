
import { useEffect, useState } from 'react'
import useLocalStorage from 'use-local-storage';
import { useUnlock } from '../hooks/useUnlock';


export default function Save({ zipcode, ready, onLoaded }) {
  const [saved, setSaved] = useLocalStorage("zipcode", "");
  const [data, setData] = useState({})

  const { loading, checkout, authenticate, isAuthorized, user } = useUnlock({
    title: "My weather app",
    locks: {
      '0xbf02f832f3f2dc3085ceced0520c53e9b97d1293': {
        network: 5
      }
    }
  })

  useEffect(() => {
    onLoaded(saved)
  }, [saved])

  if (!zipcode || !ready) {
    return null
  }

  if (!user) {
    return <button onClick={authenticate} class="bg-blue-500 text-white font-bold py-2 px-4 rounded enabled:hover:bg-blue-700 disabled:opacity-75">
      Authenticate to save your zipcode!
    </button>
  }
  if (!isAuthorized) {
    <button onClick={() => checkout()} class="bg-blue-500 text-white font-bold py-2 px-4 rounded enabled:hover:bg-blue-700 disabled:opacity-75">
      Purchase Premium!
    </button>
  }

  return (
    <>
      <button disabled={saved === zipcode} onClick={() => setSaved(zipcode)} class="bg-blue-500 text-white font-bold py-2 px-4 rounded enabled:hover:bg-blue-700 disabled:opacity-75">
        {saved === zipcode ? 'Saved!' : 'Remember location'}
      </button>
    </>

  )
}
