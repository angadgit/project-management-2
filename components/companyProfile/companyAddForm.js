import { useFormik } from 'formik';
import { useSession } from "next-auth/react"
import { useState } from 'react';

export default function CompanyProfileAddForm() {
  const { data: session } = useSession()
  const [logoUrl, setLogoUrl] = useState()

  const formik = useFormik({
    initialValues: {
      user: `${session.user.email}`,
      name: '',
      logo: '',
      email: '',
      pan: '',
      officeNo: '',
      mobileNo: '',
      addressLine1: '',
      addressLine2: '',
      country: '',
      state: '',
      pinCode: '',
      twelveA: '',
      eightyG: '',
      organizationType: '',
      organizationRegistrationNo: '',
    },
    // validate: registerValidate,
    onSubmit
  })

  async function onSubmit(values) {
    // imageUpload()
    // console.log(values)
    let res = await fetch("/api/companyProfileApi", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    await res.json();
  }


  const imageUpload = async (e) => {
    // setLogoUrl()
    const data = new FormData();
    data.append("file", logoUrl);
    data.append("upload_preset", "mystore");
    data.append("cloud_name", "ag001");
    console.log(data)
    const res = await fetch(
      "	https://api.cloudinary.com/v1_1/ag001/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const res2 = await res.json();
    formik.setValues({ logo: res2.url, user: `${session.user.email}` });
    // console.log(res2)
    // return res2.url;
  }

  return (
    <form onSubmit={formik.handleSubmit} className="grid lg:grid-cols-2 w-4/5 gap-4" encType="multipart/form-data">
      <div className="flex gap-4 items-center">
        <div className="input-type">
          <input className="border w-full px-5 py-3 focus:outline-none rounded-md" id="logoUrl" name='logoUrl' onChange={e => setLogoUrl(e.target.files[0])} type="file" multiple="" />
        </div>
        <div>
          <button type="button" onClick={imageUpload} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <svg aria-hidden="true" className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            <span className="sr-only">Image upload</span>
          </button>
        </div>
      </div>
      <div className="input-type">
        <input type="text" name="name" {...formik.getFieldProps('name')} className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Name" />
      </div>
      <div className="input-type">
        <input type="email" name="email" {...formik.getFieldProps('email')} className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Email" />
      </div>
      <div className="input-type">
        <input type="text" name="pan" {...formik.getFieldProps('pan')} className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="PAN" />
      </div>

      <div className="flex gap-4 items-center">
        <div className="input-type w-full">
          <input type="number" name="officeNo" {...formik.getFieldProps('officeNo')} className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Landline No." />
        </div>
        <div className="input-type w-full">
          <input type="number" name="mobileNo" {...formik.getFieldProps('mobileNo')} className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Mobile No." />
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <div className="input-type w-full">
          <input type="text" name="addressLine1" {...formik.getFieldProps('addressLine1')} className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Address Line 1" />
        </div>
        <div className="input-type w-full">
          <input type="text" name="addressLine2" {...formik.getFieldProps('addressLine2')} className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Address Line 2" />
        </div>
      </div>

      <div className="flex gap-4 items-center">
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
      <div className="input-type">
        <input type="text" name="twelveA" {...formik.getFieldProps('twelveA')} className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="12A" />
      </div>
      <div className="input-type">
        <input type="text" name="eightyG" {...formik.getFieldProps('eightyG')} className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="80G" />
      </div>
      <div className="input-type">
        <select id="organizationType" name="organizationType" {...formik.getFieldProps('organizationType')} defaultValue='' className="border w-full px-5 py-3 focus:outline-none rounded-md">
          <option value=''>Choose Organization Type</option>
          <option value="Company">Company</option>
          <option value="Trust">Trust</option>
          <option value="Association">Association</option>
        </select>
      </div>
      <div className="input-type">
        <input type="text" name="organizationRegistrationNo" {...formik.getFieldProps('organizationRegistrationNo')} className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Organization Registration No" />
      </div>

      <button type='submit' className="flex justify-center text-md w-2/6 bg-green-500 text-white px-4 py-3 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500">Add</button>

    </form>
  )
}