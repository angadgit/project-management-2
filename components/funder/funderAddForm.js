import { useSession } from "next-auth/react"
import { useFormik } from "formik"
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function FunderAddForm() {
  const { data: session } = useSession()
  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  }
  const formik = useFormik({
    initialValues: {
      user: session.user.email,
      funderName: '',
      contactPerson: '',
      contactNumber: '',
      email: '',
      pan: '',
      funderType: '',
      funderCategory: '',
      addressLine1: '',
      addressLine2: '',
      country: '',
      state: '',
      pinCode: '',
      nationality: '',
      website: '',
    },
    // validate: registerValidate,
    onSubmit
  })


  async function onSubmit(values) {
    console.log(values)
    let res = await fetch("/api/funderApi", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const res2 = await res.json();
    if (res2.success === 'Success') {
      toast.success('Funder Add Success !', {
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
        console.log('path funder')
        refreshData()
      } else {
        router.push('/receipt')
        console.log('path receipt')
      }
    } else {
      toast.error('Funder not insert !', {
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
      <form onSubmit={formik.handleSubmit} className="grid lg:grid-cols-2 w-auto gap-2">
        <div className="input-type">
          <input type="text" name="funderName" {...formik.getFieldProps('funderName')} className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Funder Name" />
        </div>
        <div className="input-type">
          <input type="text" name="contactPerson" {...formik.getFieldProps('contactPerson')} className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Contact Person" />
        </div>
        <div className="input-type">
          <input type="number" name="contactNumber" {...formik.getFieldProps('contactNumber')} className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Contact No." />
        </div>
        <div className="input-type">
          <input type="email" name="email" {...formik.getFieldProps('email')} className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Email" />
        </div>
        <div className="input-type">
          <input type="text" name="pan" {...formik.getFieldProps('pan')} className="border w-full px-5 py-3 focus:outline-none rounded-md uppercase" placeholder="PAN" />
        </div>

        <div className="flex gap-2 items-center">
          <div className="input-type w-full">
            <select id="funderType" name="funderType" {...formik.getFieldProps('funderType')} className="border w-full px-5 py-3 focus:outline-none rounded-md">
              <option value="">Choose a Funter Type</option>
              <option value="CSR">CSR</option>
              <option value="Foundation">Foundation</option>
              <option value="Individual">Individual</option>
              <option value="Corporate Donation">Corporate Donation</option>
            </select>
          </div>
          <div className="input-type w-full">
            <select id="funderCategory" name="funderCategory" {...formik.getFieldProps('funderCategory')} className="border w-full px-5 py-3 focus:outline-none rounded-md">
              <option value="DEFAULT">Choose a Funter Category</option>
              <option value="Domestic">Domestic</option>
              <option value="FCRA">FCRA</option>
            </select>
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <div className="input-type w-full">
            <input type="text" name="addressLine1" {...formik.getFieldProps('addressLine1')} className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Address Line 1" />
          </div>
          <div className="input-type w-full">
            <input type="text" name="addressLine2" {...formik.getFieldProps('addressLine2')} className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Address Line 2" />
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <div className="input-type w-full">
            <input type="text" name="country" {...formik.getFieldProps('country')} className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Country" />
          </div>
          <div className="input-type w-full">
            <input type="text" name="state" {...formik.getFieldProps('state')} className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="State" />
          </div>
          <div className="input-type w-full">
            <input type="number" name="pinCode" {...formik.getFieldProps('pinCode')} className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Zip Code" />
          </div>
        </div>


        <div className="flex gap-2 items-center">
          <div className="input-type">
            <input type="text" name="nationality" {...formik.getFieldProps('nationality')} className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Nationality" />
          </div>
          <div className="input-type">
            <input type="text" name="website" {...formik.getFieldProps('website')} className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Website" />
          </div>
        </div>

        <button type="submit" className="flex justify-center text-md w-2/6 bg-green-500 text-white px-4 py-3 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500">Add</button>

      </form>
    </>
  )
}