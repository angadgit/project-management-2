import React from 'react'
import styles from '../styles/Layout.module.css'

export default function Layout({ children }) {
  return (
    <div className='flex h-screen bg-purple-400'>
      <div className='m-5 md:m-auto bg-slate-50 rounded-md grid w-1/5 shadow-lg'>
        <div className='right flex flex-col justify-evenly'>
          <div className='text-center md:py-10'>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
