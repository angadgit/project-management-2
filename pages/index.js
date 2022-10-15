import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { useState } from 'react'
import { getSession, useSession, signOut } from "next-auth/react"
import DefaultLayout from '../components/DefaultLayout';
import { FiUsers } from "react-icons/fi";
import { FaMoneyCheckAlt } from "react-icons/fa";

export default function Home({ funderData, recepitData }) {

  const { data: session } = useSession()


  function handleSignOut() {
    signOut()
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Home Page</title>
      </Head>

      {session ? User({ session, handleSignOut, funderData, recepitData }) : Guest()}
    </div>
  )
}

// Guest
function Guest() {
  return (
    <main className="container mx-auto text-center py-20">
      <h3 className='text-4xl font-bold'>Guest to Login</h3>

      <div className='flex justify-center'>
        <Link href={'/login'}><a className='mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50'>Sign In</a></Link>
      </div>
    </main>
  )
}

// Authorize User
function User({ session, handleSignOut, funderData, recepitData }) {



  return (
    <DefaultLayout>
      <div className='flex'>
        <div className="p-6 w-64 mr-5 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
          <FiUsers className='mb-2 w-10 h-10 text-gray-500 dark:text-gray-400' />
          <a href="#">
            <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Total Funder</h5>
          </a>
          <p className="font-semibold dark:text-white text-xl">
            {funderData?.filter(item => item.user === session.user.email).map((item, i) => i).reduce((a, b) => a + b,1)}
          </p>
        </div>
        <div className="p-6 w-64 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
          <FaMoneyCheckAlt className='mb-2 w-10 h-10 text-gray-500 dark:text-gray-400' />
          <a href="#">
            <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Recepit Amounts</h5>
          </a>
          <p className="font-semibold dark:text-white text-xl"> Rs. {recepitData.filter(item => item.user === session.user.email).map((item, i) => item.receiptAmount).reduce((a, b) => a + b, 0)}</p>
        </div>
      </div>
    </DefaultLayout >
  )
}


export async function getServerSideProps({ req }) {
  const session = await getSession({ req })

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  const funder = await fetch(`${process.env.BaseURL}api/funderApi`)
  const funderData = await funder.json()

  const recepit = await fetch(`${process.env.BaseURL}api/recepitApi`)
  const recepitData = await recepit.json()

  return {
    props: { session, funderData, recepitData }
  }

}