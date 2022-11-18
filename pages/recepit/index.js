import React from 'react'
import { getSession } from "next-auth/react"
import { BiBookmarkAltPlus } from "react-icons/bi";
import DefaultLayout from '../DefaultLayout';
import ReceiptForm from '../../components/recepit/recepitForm';
import RecepitTable from '../../components/recepit/recepitTable';
import { useSelector, useDispatch } from 'react-redux';
import { toggleChangeAction, deleteAction } from '../../redux/reducer';
import { BiX, BiCheck } from "react-icons/bi";
import { useRouter } from 'next/router';
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Receipt({ session, dt, fundTypeData, funderData, companyProfileData }) {
  const router = useRouter();

  // const { data: funder, error } = useSWR("/api/funderApi", fetcher);
  // const funderData = funder?.filter((item) => item.user === session.user.email);
  // const { data: recepit } = useSWR("/api/recepitApi", fetcher);
  // const dt = recepit?.filter((item) => item.user === session.user.email);
  // const { data: funderType } = useSWR("/api/fundTypeApi", fetcher);
  // const fundTypeData = funderType?.filter((item) => item.user === session.user.email);
  // const { data: companyProfile } = useSWR("/api/companyProfileApi", fetcher);
  // const companyProfileData = recepit?.filter((item) => item.user === session.user.email);
  // // console.log(funderdata)



  const visible = useSelector((state) => state.app.client.toggleForm)
  const deleteId = useSelector(state => state.app.client.deleteId)

  const dispatch = useDispatch()

  const addAccess = session?.user?.access?.map((item) => item.addForms.add)
  const deleteAccess = session?.user?.access?.map((item) => item.deleteForms.delete_dt)
  const viewAccess = session?.user?.access?.map((item) => item.viewForms.view)
  const updateAccess = session?.user?.access?.map((item) => item.updateForms.update)

  const addForm = addAccess.map((item) => item.indexOf("recepit") !== -1)
  const viewTable = viewAccess.map((item) => item.indexOf("recepit") !== -1)

  const refreshData = () => {
    router.replace(router.asPath);
  }
  const handler = () => {
    dispatch(toggleChangeAction())
  }


  const deletehandler = async () => {
    const id = deleteId;
    if (id) {
      await fetch(`/api/recepitApi/${id}`, { method: "DELETE", })
      refreshData();
      await dispatch(deleteAction(null))
    }
  }

  const canclehandler = async () => {
    // console.log("cancel")
    await dispatch(deleteAction(null))
  }


  // if (error) return <div>Failed to load</div>;
  // if (!funderType) return <div>Funder Type Loading...</div>;
  // if (!funderData) return <div>Funder Loading...</div>;
  // if (!dt) return <div>Recepit Loading...</div>;
  // if (!companyProfileData) return <div>Company Profile Loading...</div>;

  return (
    <DefaultLayout>
      <div className="container mx-auto flex justify-between py-5 border-b">
        <div className="left flex gap-3">

          {/* admin add recepit access  */}
          {session.user.userRole === "super admin" ? <button className='flex bg-indigo-500 text-white px-4 py-2 border rounded-md hover:bg-grary-50 hover:border-indigo-500 hover:text-gray-800' onClick={handler}>
            Add Recepit <span className='px-1'><BiBookmarkAltPlus size={23}></BiBookmarkAltPlus></span>
          </button> : ""}

          {/* users add funder access are not  */}
          {addForm[0] ? <button className='flex bg-indigo-500 text-white px-4 py-2 border rounded-md hover:bg-grary-50 hover:border-indigo-500 hover:text-gray-800' onClick={handler}>
            Add Recepit <span className='px-1'><BiBookmarkAltPlus size={23}></BiBookmarkAltPlus></span>
          </button> : <div></div>}

        </div>
        {deleteId ? DeleteComponent({ deletehandler, canclehandler }) : <></>}
      </div>

      {/* collapsable form */}
      <div className="container mx-auto">
        {visible ? <ReceiptForm fundTypeData={fundTypeData} funderData={funderData} data={dt} companyProfileData={companyProfileData} /> : <></>}
        {/* <ReceiptAddForm /> */}
      </div>

      {/* model popup  */}

      {/* table */}
      <div className="container mx-auto">
        <RecepitTable data={dt} session={session} deleteAccess={deleteAccess} viewAccess={viewAccess} updateAccess={updateAccess}  />
      </div>
    </DefaultLayout>
  )
}

function DeleteComponent({ deletehandler, canclehandler }) {
  return (
    <div className='flex gap-5'>
      <button>Are you sure?</button>
      <button onClick={deletehandler} className='flex bg-red-500 text-white px-4 py-2 border rounded-md hover:bg-rose-500 hover:border-red-500 hover:text-gray-50'>
        Yes <span className='px-1'><BiX color='rgb(255 255 255)' size={25} /></span></button>
      <button onClick={canclehandler} className='flex bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-gree-500 hover:border-green-500 hover:text-gray-50'>
        No <span className='px-1'><BiCheck color='rgb(255 255 255)' size={25} /></span></button>
    </div>
  )
}

export async function getServerSideProps({ req }) {

  try {

    const session = await getSession({ req })
    // authorize user return session
    if (!session) {
      return {
        redirect: {
          destination: "/login",
          premanent: false
        }
      }
    }
    // console.log(session)
    const res = await fetch(`${process.env.BaseURL}api/recepitApi`)
    const recepitData = await res.json()
    const dt = recepitData.filter(item => item.user === session.user.createdBy)

    const res2 = await fetch(`${process.env.BaseURL}api/fundTypeApi`)
    const fundType = await res2.json()
    const fundTypeData = fundType.filter(item => item.user === session.user.createdBy)
    // console.log(fundType)

    const res3 = await fetch(`${process.env.BaseURL}api/funderApi`)
    const funderData = await res3.json()

    const res4 = await fetch(`${process.env.BaseURL}api/companyProfileApi`)
    const companyData = await res4.json()
    const companyProfileData = companyData.filter(item => item.user === session.user.createdBy)

    return {
      props: { session, dt, fundTypeData, funderData, companyProfileData }
    }

  } catch (error) {
    console.error("Error fetching homepage data", error);
  }

}
