
import { useEffect, useState } from 'react'
import useLocalStorage from 'use-local-storage';


export default function Save({ zipcode, ready, onLoaded }) {
  const [saved, setSaved] = useLocalStorage("zipcode", "");

  const [data, setData] = useState({})

  useEffect(() => {
    onLoaded(saved)
  }, [saved])

  const onRemember = () => {

  }

  if (!zipcode || !ready) {
    return null
  }

  return (
    <>
      <button disabled={saved === zipcode} onClick={() => setSaved(zipcode)} class="bg-blue-500 text-white font-bold py-2 px-4 rounded enabled:hover:bg-blue-700 disabled:opacity-75">
        {saved === zipcode ? 'Saved!' : 'Remember location'}
      </button>
    </>

  )
}
