import React, { useEffect, useState } from 'react'
import { useSession, getSession } from "next-auth/react"
import DefaultLayout from '../../components/DefaultLayout';
import { BiStoreAlt } from "react-icons/bi";
import CompanyProfileAddForm from '../../components/companyProfile/companyAddForm';
import CompanyProfileView from '../../components/companyProfile/companyProfileView';

export default function CompanyProfile() {

  const { data: session } = useSession()
  const [visible, setVisible] = React.useState(false)

  const [userCheck, setUserCheck] = React.useState()

  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    fetch('/api/companyProfileApi')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [])

  setTimeout(() => {
    data?.filter(item => item.user === session.user.email).map(item => setUserCheck(item.user))
  }, 1000)

  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No profile data</p>


  const handler = () => {
    setVisible(!visible)
  }

  return (
    <DefaultLayout>
      <div className="container mx-auto flex justify-between py-5 border-b">
        <div className="left flex gap-3">
          {
            userCheck ? <></> : <button button className='flex bg-indigo-500 text-white px-4 py-2 border rounded-md hover:bg-grary-50 hover:border-indigo-500 hover:text-gray-800' onClick={handler}>Add Company <span className='px-1'><BiStoreAlt size={23}></BiStoreAlt></span> </button>
          }

        </div>
      </div>

      {/* collapsable form */}
      <div className="container mx-auto py-5">
        {visible ? <CompanyProfileAddForm /> : <></>}
      </div>

      {/* table */}
      <div className="container mx-auto">
        {/* <FunderTable /> */}
        <CompanyProfileView />
      </div>
    </DefaultLayout >
  )
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req })

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        premanent: false
      }
    }
  }
  // authorize user return session
  return {
    props: { session }
  }
}