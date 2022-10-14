import React, { useRef, useEffect, useState } from 'react'
import ReactToPrint from 'react-to-print';
import Image from "next/image";
import { useSession } from "next-auth/react"

export default function RecepitPrint_1({Rid}) {
  // console.log(Rid)
  const componentRef = useRef()
  const { data: session } = useSession()
  
  const [dt, setDt] = useState("")
  const [isLoading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  const [recepitData, setRecepitData] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetch(`/api/recepitApi/${Rid}`)
      .then((res) => res.json())
      .then((item) => {
        setRecepitData(item)
        setLoading(false)
      })
  }, [])

  // console.log("recepit",recepitData)

  useEffect(() => {
    setLoading(true)
    fetch('/api/companyProfileApi')
    .then((res) => res.json())
    .then((data) => {
      setData(data)
      setLoading(false)
    })
  }, [])
  
  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No profile data</p>

  setTimeout(() => {
    const item = data.filter(item => item.user === session.user.email);
    item.map(it => setDt(it))
  }, 2000);
  // console.log(dt)

  return (
    <>
      <div className='flex justify-center'>

        <div className=' mt-5 w-xl p-5 text-center' ref={componentRef}>
          <h1 className='text-xl'>80G / Donations Receipt</h1><hr />
          <div className='grid grid-cols-6 gap-4 mt-5'>
            <div className='w-3/4'>
              {/* <h1>logo</h1> */}
              <img src={dt.logo} alt="logo" width="150" height="150" className="bg-black" />
            </div>
            <div className='col-start-2 col-span-4'>
              <p className='text-lg mb-0'>{dt.name}</p>
              <span>{dt.addressLine1+ " " + dt.addressLine2 + " " + dt.city + " " + dt.state + " " + dt.pinCode}</span>
              <p className='flex justify-center gap-1'> Mobile <span className=''>{dt.mobileNo},</span> Office no <span className=''>{dt.officeNo},</span>  Email <span className=''>{dt.email}</span></p>
            </div>
            <div className='text-end mr-5'>
              <p>10001</p>
            </div>
          </div>
          <div className='text-end mr-5'>
            <p>Date {new Date().toLocaleString() + ''}</p>
          </div>
          <div className='grid grid-cols-2'>
            <div className='text-start'>
              <p>Received From {recepitData?.fullName}</p>
            </div>
            <div className='text-end mr-8'>
              <p>Amount {recepitData?.receiptAmount}</p>
            </div>
          </div>
          <div className='grid grid-cols-1'>
            <p className='text-start'>As {recepitData?.typeFund} for {recepitData?.description}</p>
          </div>
          <div className='grid grid-cols-2 mb-5'>
            <p className='text-start'> payment mode {recepitData?.funderType}</p>
            {/* <h1>by</h1> */}
          </div>
          <hr />
          <div className='grid grid-cols-3 '>

            <div className='flex'>Pan <h1 className="font-semibold ml-2 uppercase">{dt.pan}</h1> </div>
            <div className='flex'>12A Registration no <h1 className="font-semibold ml-2 uppercase">{dt.twelveA}</h1> </div>
            <div className='flex'>80G Registration no <h1 className="font-semibold ml-2 uppercase">{dt.eightyG}</h1> </div>
            <div className='flex'>Organization Type <h1 className="font-semibold ml-2">{dt.organizationType}</h1> </div>
            <div className='flex col-span-2 gap-2'>Organization Registration no <h1 className="font-semibold">{dt.organizationRegistrationNo}</h1> </div>

          </div>
          <hr />
        </div>
      </div>
      <div className='text-end'>
        <ReactToPrint
          trigger={() => <button variant='outlined'>Print / Download</button>}
          content={() => componentRef.current}
        />
      </div>
    </>
  )
}
