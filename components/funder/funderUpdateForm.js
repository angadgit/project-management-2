import { useSession } from "next-auth/react"
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from "react";
import { funderValidate } from "../../lib/validate";
import { Formik, Form, Field } from "formik";

export default function FunderAddForm({ id }) {
  const { data: session } = useSession()
  const router = useRouter();
  // console.log(session)

  const refreshData = () => {
    router.replace(router.asPath);
  }

  const [funderName, setfunderName] = useState(null)
  const [contactPerson, setcontactPerson] = useState(null)
  const [contactNumber, setcontactNumber] = useState(null)
  const [email, setemail] = useState(null)
  const [pan, setpan] = useState(null)
  const [funderType, setfunderType] = useState(null)
  const [funderCategory, setfunderCategory] = useState(null)
  const [addressLine1, setaddressLine1] = useState(null)
  const [addressLine2, setaddressLine2] = useState(null)
  const [country, setcountry] = useState(null)
  const [state, setstate] = useState(null)
  const [pinCode, setpinCode] = useState(null)
  const [nationality, setnationality] = useState(null)
  const [website, setwebsite] = useState(null)

  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch(`/api/funderApi/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setfunderName(data?.funderName)
        setcontactPerson(data?.contactPerson)
        setcontactNumber(data?.contactNumber)
        setemail(data?.email)
        setpan(data?.pan)
        setfunderType(data?.funderType)
        setfunderCategory(data?.funderCategory)
        setaddressLine1(data?.addressLine1)
        setaddressLine2(data?.addressLine2)
        setcountry(data?.country)
        setstate(data?.state)
        setpinCode(data?.pinCode)
        setnationality(data?.nationality)
        setwebsite(data?.website)
        setLoading(false)
      })
  }, [])

  console.log(session.user.createdBy)
  async function onSubmit(e) {
    // console.log(values)
    e.preventDefault();
    const data = {
      user: session.user.createdBy, funderName, contactPerson, contactNumber, email, pan, funderType, funderCategory, addressLine1, addressLine2, country, state, pinCode, nationality, website
    }
    console.log(data)
    if (funderValidate) {
      let res = await fetch(`/api/funderApi/${id}`, {
        method: "PUT", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res2 = await res.json();
      if (res2.success === 'Success') {
        toast.success('Funder Updated Success !', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        if (router.pathname === '/funder') {
          // console.log('path funder')
          refreshData()
        } else {
          router.push('/recepit')
          // console.log('path receipt')
        }
      } else {
        toast.error('Funder not Updated !', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  }


  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No profile data</p>

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <form onSubmit={onSubmit} className="grid lg:grid-cols-2 w-auto gap-2">
        <div className="input-type">
          <input type="text" name="funderName" value={funderName} onChange={e => setfunderName(e.target.value)} className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Funder Name" />
        </div>
        {/* <div className="input-type">
          <input type="text" name="lastname" value={lastname} onChange={e => setLastname(e.target.value)} className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="LastName" />
        </div> */}
        <div className="input-type">
          <input type="text" name="contactPerson" value={contactPerson} onChange={e => setcontactPerson(e.target.value)} className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Contact Person" />
        </div>
        <div className="input-type">
          <input type="number" name="contactNumber" value={contactNumber} onChange={e => setcontactNumber(e.target.value)} className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Contact No." />
        </div>
        <div className="input-type">
          <input type="email" name="email" value={email} onChange={e => setemail(e.target.value)} className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Email" />
        </div>
        <div className="input-type">
          <input type="text" name="pan" value={pan} onChange={e => setpan(e.target.value)} className="border w-full px-5 py-3 focus:outline-none rounded-md uppercase" placeholder="PAN" />
        </div>

        <div className="flex gap-2 items-center">
          <div className="input-type w-full">
            <select id="funderType" name="funderType" value={funderType} onChange={e => setfunderType(e.target.value)} className="border w-full px-5 py-3 focus:outline-none rounded-md">
              <option value="">Choose a Funter Type</option>
              <option value="CSR">CSR</option>
              <option value="Foundation">Foundation</option>
              <option value="Individual">Individual</option>
              <option value="Corporate Donation">Corporate Donation</option>
            </select>
          </div>
          <div className="input-type w-full">
            <select id="funderCategory" name="funderCategory" value={funderCategory} onChange={e => setfunderCategory(e.target.value)} className="border w-full px-5 py-3 focus:outline-none rounded-md">
              <option value="DEFAULT">Choose a Funter Category</option>
              <option value="Domestic">Domestic</option>
              <option value="FCRA">FCRA</option>
            </select>
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <div className="input-type w-full">
            <input type="text" name="addressLine1" value={addressLine1} onChange={e => setaddressLine1(e.target.value)} className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Address Line 1" />
          </div>
          <div className="input-type w-full">
            <input type="text" name="addressLine2" value={addressLine2} onChange={e => setaddressLine2(e.target.value)} className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Address Line 2" />
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <div className="input-type w-full">
            <input type="text" name="country" value={country} onChange={e => setcountry(e.target.value)} className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Country" />
          </div>
          <div className="input-type w-full">
            <input type="text" name="state" value={state} onChange={e => setstate(e.target.value)} className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="State" />
          </div>
          <div className="input-type w-full">
            <input type="number" name="pinCode" value={pinCode} onChange={e => setpinCode(e.target.value)} className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Zip Code" />
          </div>
        </div>


        <div className="flex gap-2 items-center">
          <div className="input-type">
            <input type="text" name="nationality" value={nationality} onChange={e => setnationality(e.target.value)} className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Nationality" />
          </div>
          <div className="input-type">
            <input type="text" name="website" value={website} onChange={e => setwebsite(e.target.value)} className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Website" />
          </div>
        </div>

        <button type="submit" className="flex justify-center text-md w-2/6 bg-yellow-500 text-white px-4 py-3 border rounded-md hover:bg-gray-50 hover:border-yellow-500 hover:text-yellow-500">Update</button>

      </form>
    </>
  )
}

