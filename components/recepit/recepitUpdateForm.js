import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router"

export default function ReceiptUpdateForm({ id, fundDt, funderData }) {
  const { data: session } = useSession()
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  }

  const [funder, setFunder] = useState(null)
  const [fullName, setfullName] = useState(null)
  const [contactPerson, setcontactPerson] = useState(null)
  const [contactNumber, setcontactNumber] = useState(null)
  const [email, setemail] = useState(null)
  const [pan, setpan] = useState(null)
  const [addressLine1, setaddressLine1] = useState(null)
  const [addressLine2, setaddressLine2] = useState(null)
  const [country, setcountry] = useState(null)
  const [state, setstate] = useState(null)
  const [pinCode, setpinCode] = useState(null)
  const [funderType, setfunderType] = useState(null)
  const [receiptAmount, setreceiptAmount] = useState(null)
  const [typeFund, settypeFund] = useState(null)
  const [description, setdescription] = useState(null)

  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch(`/api/recepitApi/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setFunder(data?.fullName)
        setfullName(data?.fullName)
        setcontactPerson(data?.contactPerson)
        setcontactNumber(data?.contactNumber)
        setemail(data?.email)
        setpan(data?.pan)
        setaddressLine1(data?.addressLine1)
        setaddressLine2(data?.addressLine2)
        setcountry(data?.country)
        setstate(data?.state)
        setpinCode(data?.pinCode)
        setfunderType(data?.funderType)
        setreceiptAmount(data?.receiptAmount)
        settypeFund(data?.typeFund)
        setdescription(data?.description)
        setLoading(false)
      })
  }, [])

  funderData.filter(item => item.funderName === funder).map(dt => { setFunder(dt.fullName), setfullName(dt.funderName), setcontactPerson(dt.contactPerson), setcontactNumber(dt.contactNumber), setemail(dt.email), setpan(dt.pan), setaddressLine1(dt.addressLine1), setaddressLine2(dt.addressLine2), setcountry(dt.country), setstate(dt.state), setpinCode(dt.pinCode) });

  const handleSubmit = async (e) => {
    // console.log(values)
    e.preventDefault();
    const data = {
      user: session.user.email, fullName, contactPerson, contactNumber, email, pan, addressLine1, addressLine2, country, state, pinCode, funderType, receiptAmount, typeFund, description
    }
    console.log(data)
    let res = await fetch(`/api/recepitApi/${id}`, {
      method: "PUT", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const res2 = await res.json();
    if (res2.success === 'Success') {
      toast.success('Recepit Updated Success !', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      if (router.pathname === '/receipt') {
        console.log('path recepit')
        refreshData()
      } else {
        router.push('/receipt')
        console.log('path receipt')
      }
    } else {
      toast.error('Recepit not Updated !', {
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

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 w-4/6 gap-4">
        <div className="input-type">
          <select id="funder" name="funder" value={funder} onChange={e => setFunder(e.target.value)} className="border w-full px-5 py-3 focus:outline-none rounded-md">
            <option value={null}>Choose a Funter</option>
            {
              funderData?.filter(item => item.user === session.user.email).map((obj) => <option value={obj.funderName || ''} key={obj._id} > {obj.funderName} </option>)
            }
          </select>
        </div>
        <div className="input-type">
          <input type="text" name="fullName" value={fullName} onChange={e => setfullName(e.target.value)} className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Full Name" />
        </div>
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
          <input type="text" name="pan" value={pan} onChange={e => setpan(e.target.value)} className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="PAN" />
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
          <div className="input-type w-full">
            <select id="funderType" name="funderType" value={funderType} onChange={e => setfunderType(e.target.value)} className="border w-full px-5 py-3 focus:outline-none rounded-md">
              <option value={null}>Choose a Funter Type</option>
              <option value="Cash">Cash</option>
              <option value="Bank">Bank</option>
              <option value="Cheque">Cheque</option>
              <option value="UPI">UPI</option>
            </select>
          </div>
          <div className="input-type w-full">
            <input type="number" name="receiptAmount" value={receiptAmount} onChange={e => setreceiptAmount(e.target.value)} className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Receipt Amount" />
          </div>
        </div>

        <div className="flex gap-4 items-center">
          <div className="input-type w-full">
            <select id="typeFund" name="typeFund" value={typeFund} onChange={e => settypeFund(e.target.value)} className="border w-full px-5 py-3 focus:outline-none rounded-md">
              <option value={null}>Choose Type of Fund</option>
              {
                fundDt?.filter(item => item.user === session.user.email).map((obj) => <option value={obj.name || ''} key={obj._id} > {obj.name} </option>)
              }
            </select>
          </div>
          <div className="input-type w-full">
            <input type="text" name="description" value={description} onChange={e => setdescription(e.target.value)} className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Description" />
          </div>
        </div>

        <button className="flex justify-center text-md w-2/6 bg-yellow-500 text-white px-4 py-3 border rounded-md hover:bg-gray-50 hover:border-yellow-500 hover:text-yellow-500">Update</button>

      </form>
    </>
  )
}