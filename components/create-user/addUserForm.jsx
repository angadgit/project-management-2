import React from "react";
import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

const Forms = [
  { value: "funder", label: "Funder" },
  { value: "recepit", label: "Recepit" },
  { value: "create-user", label: "Create User" },
  { value: "profile", label: "User Profile" },
  { value: "company-profile", label: "Company Profile" },
];

export default function AddUserForm() {
  const router = useRouter();
  const { data: session } = useSession();
  const [logoUrl, setLogoUrl] = useState();
  const [imageUrl, setImageUrl] = useState(null);
  const [selectForms, setSelectForms] = useState(null);
  // const [veiw, setVeiw] = useState([]);

  const [viewForms, setViewForms] = useState({
    view: [],
  });
  const [updateForms, setUpdateForms] = useState({
    update: [],
  });
  const [addForms, setAddForms] = useState({
    add: [],
  });
  const [deleteForms, setDeleteForms] = useState({
    delete_dt: [],
  });

  // console.log("set",userinfo.add)
  const handleChange = (e) => {
    const { value, checked, name } = e.target;
    const { view } = viewForms;
    const { update } = updateForms;
    const { add } = addForms;
    const { delete_dt } = deleteForms;

    console.log(`${value} is ${checked} name ${name}`);

    // Case 1 : The user checks the box
    if (name === "veiw") {
      if (checked) {
        setViewForms({
          view: [...view, value],
        });
      }
      // Case 2  : The user unchecks the box
      else {
        setViewForms({
          view: view.filter((e) => e !== value),
        });
      }
    }

    if (name === "update") {
      if (checked) {
        setUpdateForms({
          update: [...update, value],
        });
      }
      // Case 2  : The user unchecks the box
      else {
        setUpdateForms({
          update: update.filter((e) => e !== value),
        });
      }
    }
    // Case 1 : The user checks the box
    if (name === "add") {
      if (checked) {
        setAddForms({
          add: [...add, value],
        });
      }
      // Case 2  : The user unchecks the box
      else {
        setAddForms({
          add: add.filter((e) => e !== value),
        });
      }
    }

    if (name === "delete") {
      if (checked) {
        setDeleteForms({
          delete_dt: [...delete_dt, value],
        });
      }
      // Case 2  : The user unchecks the box
      else {
        setDeleteForms({
          delete_dt: delete_dt.filter((e) => e !== value),
        });
      }
    }
  };
console.log(imageUrl)
  const formik = useFormik({
    initialValues: {
      createdBy: `${session?.user.email}`,
      name: "",
      logo: "",
      email: "",
      department: "",
      mobileNo: "",
      addressLine1: "",
      addressLine2: "",
      country: "",
      state: "",
      pinCode: "",
      userRole: "",
      formPermission: "",
      access: "",
      userName: "",
      password: "",
    },
    // validate: registerValidate,
    onSubmit,
  });

  async function onSubmit(values) {
    const data = {
      createdBy: values.createdBy,
      name: values.name,
      email: values.email,
      logo: imageUrl,
      department: values.department,
      mobileNo: values.mobileNo,
      addressLine1: values.addressLine1,
      addressLine2: values.addressLine2,
      country: values.country,
      state: values.state,
      pinCode: values.pinCode,
      userRole: values.userRole,
      access: { viewForms, updateForms, addForms, deleteForms },
      formPermission: selectForms,
      userName: values.userName,
      password: values.password,
    };
    console.log(data);
    let res = await fetch("/api/auth/signup", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const res2 = await res.json();
    // console.log(res2)
    if (res2.status) {
      router.push("/create-user");
      toast.success(res2.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.error(res2.message, {
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

  const imageUploadhandler = async (e) => {
    const body = new FormData();
    body.append("file", logoUrl);
    let res = await fetch(`/api/imageUpload`, {
      method: "POST",
      body,
    });
    let response = await res.json();
    await setImageUrl(response.newPath);
  };

  const [checkFile, setCheckFile] = useState(false);

  const imageHandler = (e) => {
    setLogoUrl(e.target.files[0]);
    setCheckFile(true);
  };

  const imagesubmission = () => {
    if (checkFile) {
      imageUploadhandler();
      alert("File Uploaded");
      console.log(logoUrl);
    } else {
      alert("select a file");
    }
  };

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

      <form
        onSubmit={formik.handleSubmit}
        className="grid lg:grid-cols-2 w-auto gap-4"
        encType="multipart/form-data"
      >
        <div className="flex gap-4 items-center">
          <div className="input-type flex gap-1 w-full">
            <div className="px-5 py-3 w-full cursor-pointer relative flex justify-center items-center border-2 rounded-md bg-gray-200">
              <input
                type="file"
                name="logoUrl"
                onChange={imageHandler}
                accept="image/*"
                className="z-20 opacity-0 cursor-pointer h-full w-full"
              />
              <div className="absolute flex justify-center items-center gap-2">
                <img
                  className={`h-10 w-10 rounded-full ${
                    checkFile ? "opacity-1" : "opacity-0"
                  }`}
                  src={logoUrl ? URL.createObjectURL(logoUrl) : null}
                  alt={"userImg"}
                />
                <span className="text-[18px] w-56 truncate">
                  {checkFile ? logoUrl.name : "choose User Pic"}
                </span>
              </div>
            </div>
            <div className="self-center">
              <button
                onClick={imagesubmission}
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  aria-hidden="true"
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  >
                    {" "}
                  </path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="input-type">
          <input
            type="text"
            name="name"
            {...formik.getFieldProps("name")}
            className="border w-full px-5 py-3 focus:outline-none rounded-md"
            placeholder="Name"
          />
        </div>
        <div className="input-type">
          <input
            type="email"
            name="email"
            {...formik.getFieldProps("email")}
            className="border w-full px-5 py-3 focus:outline-none rounded-md"
            placeholder="Email"
          />
        </div>
        <div className="input-type">
          <input
            type="text"
            name="department"
            {...formik.getFieldProps("department")}
            className="border w-full px-5 py-3 focus:outline-none rounded-md"
            placeholder="Department"
          />
        </div>

        <div className="flex gap-4 items-center">
          <div className="input-type w-full">
            <input
              type="number"
              name="mobileNo"
              {...formik.getFieldProps("mobileNo")}
              className="border w-full px-5 py-3 focus:outline-none rounded-md"
              placeholder="Mobile No."
            />
          </div>
          <div className="input-type w-full">
            <select
              id="userRole"
              name="userRole"
              {...formik.getFieldProps("userRole")}
              className="border w-full px-5 py-3 focus:outline-none rounded-md"
            >
              <option value="">Choose User Role</option>
              {/* <option value="super admin">Super admin</option> */}
              <option value="admin">admin</option>
              <option value="user">user</option>
            </select>
          </div>
        </div>

        <div className="flex gap-4 items-center">
          <div className="input-type w-full">
            <input
              type="text"
              name="addressLine1"
              {...formik.getFieldProps("addressLine1")}
              className="border w-full px-5 py-3 focus:outline-none rounded-md"
              placeholder="Address Line 1"
            />
          </div>
          <div className="input-type w-full">
            <input
              type="text"
              name="addressLine2"
              {...formik.getFieldProps("addressLine2")}
              className="border w-full px-5 py-3 focus:outline-none rounded-md"
              placeholder="Address Line 2"
            />
          </div>
        </div>

        <div className="flex gap-4 items-center">
          <div className="input-type w-full">
            <input
              type="text"
              name="country"
              {...formik.getFieldProps("country")}
              className="border w-full px-5 py-3 focus:outline-none rounded-md"
              placeholder="Country"
            />
          </div>
          <div className="input-type w-full">
            <input
              type="text"
              name="state"
              {...formik.getFieldProps("state")}
              className="border w-full px-5 py-3 focus:outline-none rounded-md"
              placeholder="State"
            />
          </div>
          <div className="input-type w-full">
            <input
              type="number"
              name="pinCode"
              {...formik.getFieldProps("pinCode")}
              className="border w-full px-5 py-3 focus:outline-none rounded-md"
              placeholder="Zip Code"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="input-type w-full">
            <Select
              options={Forms}
              name="formPermission"
              // {...formik.getFieldProps("formPermission")}
              // onChange={formik.handleChange}
              // value={formik.values.formPermission}
              onChange={(e) =>
                setSelectForms(
                  Array.isArray(e) ? e.map((hotel) => hotel.value) : []
                )
              }
              isMulti
              placeholder="Form Permission"
              className=""
            />
            {/* <select
              name="formPermission"
              multiple
              {...formik.getFieldProps("formPermission")}
              className="border w-full px-5 py-3 focus:outline-none rounded-md"
            >
              <option value="">Choose User Form Permissions</option>
              <option value="funder">Funder</option>
              <option value="receipt">Recepit</option>
            </select> */}
          </div>
        </div>

        <div className="col-span-2">
          <div className="grid grid-cols-2 items-center gap-2">
            <div className="input-type w-full">
              <input
                type="text"
                name="userName"
                {...formik.getFieldProps("userName")}
                className="border w-full px-5 py-3 focus:outline-none rounded-md"
                placeholder="User Name"
              />
            </div>
            <div className="input-type w-full">
              <input
                type="password"
                name="userPassword"
                {...formik.getFieldProps("password")}
                className="border w-full px-5 py-3 focus:outline-none rounded-md"
                placeholder="User Password"
              />
            </div>
          </div>
        </div>

        <div className="col-span-2">
          <div className="grid grid-cols-1">
            {selectForms?.map((val, i) => (
              <>
                <div className="grid grid-rows grid-flow-col md:w-1/2 ">
                  <div className="flex items-center gap-1 w-64">{val} :- </div>
                  <div className="flex items-center gap-1">
                    <input
                      id="delete"
                      type="checkbox"
                      name="delete"
                      value={val}
                      // {...formik.getFieldProps("delete")}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="delete"
                      className="text-sm font-medium text-rose-600"
                    >
                      Delete
                    </label>
                  </div>
                  <div className="flex items-center gap-1">
                    <input
                      id="add"
                      type="checkbox"
                      value={val}
                      name="add"
                      // {...formik.getFieldProps("Add")}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="add"
                      className="text-sm font-medium text-green-600"
                    >
                      Add
                    </label>
                  </div>
                  <div className="flex items-center gap-1">
                    <input
                      id="update"
                      type="checkbox"
                      value={val}
                      name="update"
                      // {...formik.getFieldProps("update")}
                      // onChange={(e) => setAccess.update(e.target.value)}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="update"
                      className="text-sm font-medium text-yellow-600"
                    >
                      Update
                    </label>
                  </div>
                  <div className="flex items-center gap-1">
                    <input
                      id="veiw"
                      type="checkbox"
                      value={val}
                      name="veiw"
                      // {...formik.getFieldProps("veiw")}
                      // onChange={(e) => {
                      //   // e.target.value;
                      //   setVeiw([...veiw,e.target.value]);
                      // }}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="veiw"
                      className="text-sm font-medium text-blue-600"
                    >
                      Veiw
                    </label>
                  </div>
                </div>
              </>
            ))}

            {/* <div className="flex items-center gap-1">
              <input
                id="delete"
                type="checkbox"
                name="delete"
                value="Delete"
                {...formik.getFieldProps("delete")}
                className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="delete"
                className="text-sm font-medium text-rose-600"
              >
                Delete
              </label>
            </div>
            <div className="flex items-center gap-1">
              <input
                id="add"
                type="checkbox"
                value="Add"
                name="add"
                {...formik.getFieldProps("add")}
                className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="add"
                className="text-sm font-medium text-green-600"
              >
                Add
              </label>
            </div>
            <div className="flex items-center gap-1">
              <input
                id="update"
                type="checkbox"
                value="Update"
                name="update"
                {...formik.getFieldProps("update")}
                className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="update"
                className="text-sm font-medium text-yellow-600"
              >
                Update
              </label>
            </div>
            <div className="flex items-center gap-1">
              <input
                id="veiw"
                type="checkbox"
                value="Veiw"
                name="veiw"
                {...formik.getFieldProps("veiw")}
                className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="veiw"
                className="text-sm font-medium text-blue-600"
              >
                Veiw
              </label>
            </div> */}
          </div>
        </div>

        <button
          type="submit"
          className="flex justify-center text-md w-2/6 bg-green-500 text-white px-4 py-3 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500"
        >
          Add User
        </button>
      </form>
    </>
  );
}
