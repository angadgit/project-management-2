import React, { useEffect, useState } from 'react'
import { useSession, getSession } from "next-auth/react"
import DefaultLayout from '../DefaultLayout';
import { BiStoreAlt } from "react-icons/bi";
import CompanyProfileAddForm from '../../components/companyProfile/companyAddForm';
import CompanyProfileView from '../../components/companyProfile/companyProfileView';
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function CompanyProfile({ profileData }) {
  const { data: session } = useSession()
  const [visible, setVisible] = React.useState(false)

  const [userCheck, setUserCheck] = React.useState([])

  const handler = () => {
    setVisible(!visible)
  }

  console.log(profileData.map(item => item))
  return (
    <DefaultLayout>
      <div className="container mx-auto flex justify-between py-5 border-b">
        <div className="left flex gap-5">
          {
            profileData[0] ? "" : <button className='flex bg-indigo-500 text-white px-4 py-2 border rounded-md hover:bg-grary-50 hover:border-indigo-500 hover:text-gray-800' onClick={handler}>Add Company <span className='px-1'><BiStoreAlt size={23}></BiStoreAlt></span> </button>
          }
        </div>
      </div>

      {/* collapsable form */}
      <div className="container mx-auto py-5">
        {visible ? <CompanyProfileAddForm /> : ""}
      </div>

      {/* company profile  */}

      <section className="text-gray-600 body-font bg-white rounded-lg shadow-lg">
        <div className="container mx-auto flex pt-5 md:flex-row flex-col items-center w-fit">
          <h3 className="text-4xl font-bold">Organization Profile</h3>
        </div>
        {profileData.map((item) => (<>
          <div className="container mx-auto flex px-5 py-10 md:flex-row flex-col items-center w-fit">
            {item.logo ?
              <div className="lg:max-w-lg lg:w-36 md:w-36 w-5/6 mb-10 md:mb-0">
                <img className="object-cover object-center rounded outline" alt="user img" src={item.logo} />
              </div> :
              <div className="lg:max-w-lg lg:w-36 md:w-36 w-5/6 mb-10 md:mb-0">
                <svg className="object-cover object-center rounded outline" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
              </div>
            }

            <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
              <div className='details'>
                <div className="grid grid-cols-2 gap-5">
                  <span className="font-bold text-lg">Company Name</span>
                  <h1 className="text-lg capitalize text-gray-700 font-sans">{item.name}</h1>
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <span className="font-bold text-lg">Email</span>
                  <h1 className="text-lg text-gray-700 font-sans">{item.email}</h1>
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <span className="font-bold text-lg">Mobile</span>
                  <h1 className="text-lg text-gray-700 font-sans">{item.mobileNo}</h1>
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <span className="font-bold text-lg">Office</span>
                  <h1 className="text-lg text-gray-700 font-sans">{item.officeNo}</h1>
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <span className="font-bold text-lg">Address</span>
                  <h1 className="text-lg text-gray-700 font-sans">{item.addressLine1}, {item.addressLine2}, <br />  {item.country} {item.state} - {item.pinCode}</h1>
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <span className="font-bold text-lg">Organization Type</span>
                  <h1 className="text-lg text-gray-700 font-sans">{item.organizationType}</h1>
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <span className="font-bold text-lg">Organization Registration</span>
                  <h1 className="text-lg text-gray-700 font-sans">{item.organizationRegistrationNo}</h1>
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <span className="font-bold text-lg">80 G Registration</span>
                  <h1 className="text-lg text-gray-700 font-sans">{item.eightyG}</h1>
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <span className="font-bold text-lg">12 A Registration</span>
                  <h1 className="text-lg text-gray-700 font-sans">{item.twelveA}</h1>
                </div>
              </div>
            </div>

          </div>
        </>))}

      </section>

      {/* table */}
      <div className="container mx-auto">
        {/* <FunderTable /> */}
        {/* <CompanyProfileView data={profileData} /> */}
      </div>

    </DefaultLayout >
  )
}

export async function getServerSideProps({ req }) {

  try {
    const session = await getSession({ req })

    if (!session) {
      return {
        redirect: {
          destination: "/login",
          premanent: false
        }
      }
    }

    const res = await fetch(`${process.env.BaseURL}api/companyProfileApi`)
    const companyProfileData = await res.json()
    const profileData = companyProfileData?.filter((item) => item.user === session.user.createdBy);

    // authorize user return session
    return {
      props: { session, profileData }
    }

  } catch (error) {
    console.error("Error fetching homepage data", error);
  }
}