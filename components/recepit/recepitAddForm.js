import React, { useRef } from "react";
import { useFormik } from "formik"
import { useSession } from "next-auth/react"
import FunderAddForm from "../funder/funderAddForm";
import { useRouter } from 'next/router';
import { BiPlusCircle } from "react-icons/bi";
import FundTypeForm from "../fundType/fundTypeForm";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ReceiptAddForm({ fundDt, funderDt }) {
  const router = useRouter();
  const { data: session } = useSession()

  const [funderPopUp, setFunderPopUp] = React.useState(false);
  const [fundTypePopUp, setFundTypePopUp] = React.useState(false);


  const formik = useFormik({
    initialValues: {
      user: session.user.email,
      funder: '',
      fullName: '',
      contactPerson: '',
      contactNumber: '',
      email: '',
      pan: '',
      addressLine1: '',
      addressLine2: '',
      country: '',
      state: '',
      pinCode: '',
      funderType: '',
      receiptAmount: '',
      typeFund: '',
      description: '',
    },
    // validate: registerValidate,
    onSubmit
  })

  funderDt?.filter(item => item.funderName === formik.values?.funder).map(item => formik.setValues({ user: session.user.email, fullName: item.funderName || '', contactPerson: item.contactPerson || '', contactNumber: item.contactNumber || '', email: item.email || '', pan: item.pan || '', addressLine1: item.addressLine1 || '', addressLine2: item.addressLine2 || '', country: item.country || '', state: item.state || '', pinCode: item.pinCode || '' }))

  async function onSubmit(values) {
    let res = await fetch("/api/recepitApi", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const res2 = await res.json();
    if (res2.success === 'Success') {
      toast.success('Recepit Add Success !', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      router.push('/receipt')
    } else {
      toast.error('Recepit not insert !', {
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
      <form className="grid lg:grid-cols-2 w-4/6 gap-4" onSubmit={formik.handleSubmit}>
        <div className="flex input-type gap-1">
          <select id="funder" name="funder" {...formik.getFieldProps('funder')}  className="border w-full px-5 py-3 focus:outline-none rounded-md">
            <option value={null}>Choose a Funter</option>
            {
              funderDt?.filter(item => item.user === session.user.email).map((obj) => <option value={obj.funderName || ''} key={obj._id} > {obj.funderName} </option>)
            }
          </select>
          <BiPlusCircle onClick={() => setFunderPopUp(true)} className='text-4xl text-green-300 m-1 cursor-pointer' />
        </div>
        <div className="input-type">
          <input type="text" name="fullName" {...formik.getFieldProps('fullName')} className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Full Name" disabled />
        </div>
        <div className="input-type">
          <input type="text" name="contactPerson" {...formik.getFieldProps('contactPerson')} className="border w-full px-5 py-3 focus:outline-none rounded-md " placeholder="Contact Person" disabled />
        </div>
        <div className="input-type">
          <input type="number" name="contactNumber" {...formik.getFieldProps('contactNumber')} className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Contact No." disabled />
        </div>
        <div className="input-type">
          <input type="email" name="email" {...formik.getFieldProps('email')} className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Email" disabled />
        </div>
        <div className="input-type">
          <input type="text" name="pan" {...formik.getFieldProps('pan')} className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="PAN" disabled />
        </div>

        <div className="flex gap-2 items-center">
          <div className="input-type w-full">
            <input type="text" name="addressLine1" {...formik.getFieldProps('addressLine1')} className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Address Line 1" disabled />
          </div>
          <div className="input-type w-full">
            <input type="text" name="addressLine2" {...formik.getFieldProps('addressLine2')} className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Address Line 2" disabled />
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <div className="input-type w-full">
            <input type="text" name="country" {...formik.getFieldProps('country')} className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Country" disabled />
          </div>
          <div className="input-type w-full">
            <input type="text" name="state" {...formik.getFieldProps('state')} className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="State" disabled />
          </div>
          <div className="input-type w-full">
            <input type="number" name="pinCode" {...formik.getFieldProps('pinCode')} className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Zip Code" disabled />
          </div>
        </div>


        <div className="flex gap-2 items-center">
          <div className="input-type w-full">
            <select id="funderType" name="funderType" {...formik.getFieldProps('funderType')} className="border w-full px-5 py-3 focus:outline-none rounded-md">
              <option value=''>Choose a Funter Type</option>
              <option value="Cash">Cash</option>
              <option value="Bank">Bank</option>
              <option value="Cheque">Cheque</option>
              <option value="UPI">UPI</option>
            </select>
          </div>
          <div className="input-type w-full">
            <input type="number" name="receiptAmount" {...formik.getFieldProps('receiptAmount')} className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Receipt Amount" />
          </div>
        </div>

        <div className="flex gap-4 items-center">
          <div className="input-type w-full flex">
            <select id="typeFund" name="typeFund" {...formik.getFieldProps('typeFund')} className="border w-full px-5 py-3 focus:outline-none rounded-md">
              <option value=''>Choose Type of Fund</option>
              {
                fundDt?.filter(item => item.user === session.user.email).map((obj) => <option value={obj.name || ''} key={obj._id} > {obj.name} </option>)
              }
            </select>
            <BiPlusCircle onClick={() => setFundTypePopUp(true)} className='text-4xl text-green-300 m-1 cursor-pointer' />
          </div>
          <div className="input-type w-full">
            <input type="text" name="description" {...formik.getFieldProps('description')} className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="description" />
          </div>
        </div>

        <button type='submit' className="flex justify-center text-md w-2/6 bg-green-500 text-white px-4 py-3 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500">Add</button>


      </form>

      {funderPopUp ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-4xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Add Funder
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-2 w-full">
                  <FunderAddForm />
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setFunderPopUp(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      {fundTypePopUp ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-4xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Add Type of Fund
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setFundTypePopUp(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-2 w-full">
                  <FundTypeForm />
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setFundTypePopUp(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

    </>
  )
}

