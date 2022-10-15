import React from 'react'
import styles from '../styles/Layout.module.css'

export default function Layout({ children }) {
  return (
    <div className='flex h-screen bg-blue-400'>
      <div className='m-5 md:m-auto bg-slate-50 rounded-md md:w-3/5 md:h-3/4 grid lg:grid-cols-2'>
        <div className={`${styles.imgStyle}`}>
          {/* <div className={styles.cartoonImg}></div> */}
        </div>
        <div className='right flex flex-col justify-evenly'>
          <div className='text-center md:py-10 '>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
