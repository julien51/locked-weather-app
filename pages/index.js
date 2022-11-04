import Head from 'next/head'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import Weather from '../Components/Weather'

export default function Home() {
  const router = useRouter()
  return (
    <>
      <Head>
        <title>The weather app</title>
      </Head>

      <main className='container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10'>
        <Weather />
      </main>
    </>
  )
}
