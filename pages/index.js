import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import Weather from './Weather'


export default function Home() {

  return (
    <div className={styles.container}>
      <Head>
        <title>The weather app</title>
      </Head>

      <main className='container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10'>

        <Weather />
      </main>


    </div>
  )
}
