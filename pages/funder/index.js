import React from 'react'
import { getSession, useSession } from "next-auth/react"
import DefaultLayout from '../../components/DefaultLayout';
import { BiUserPlus } from "react-icons/bi";
import FunderForm from '../../components/funder/funderForm';
import FunderTable from '../../components/funder/funderTable';
import { useSelector, useDispatch } from 'react-redux';
import { toggleChangeAction, deleteAction } from '../../redux/reducer';
import { BiX, BiCheck } from "react-icons/bi";
import { useRouter } from 'next/router';

export default function Funder({ funderData }) {
  const { data: session } = useSession()
  const router = useRouter()
  router.reload(window.location.pathname)
  const visible = useSelector((state) => state.app.client.toggleForm)
  const deleteId = useSelector(state => state.app.client.deleteId)
  const formId = useSelector((state) => state.app.client.formId)

  const dispatch = useDispatch()

  const refreshData = () => {
    router.replace(router.asPath);
  }

  const handler = () => {
    dispatch(toggleChangeAction())
  }

  const deletehandler = async () => {
    const id = deleteId;
    if (id) {
      await fetch(`/api/funderApi/${id}`, { method: "DELETE", })
      refreshData();
      await dispatch(deleteAction(null));
    }
  }

  const canclehandler = async () => {
    console.log("cancel")
    await dispatch(deleteAction(null))
  }

  return (
    <DefaultLayout>
      <div className="container mx-auto flex justify-between py-5 border-b">
        <div className="left flex gap-3">
          <button className='flex bg-indigo-500 text-white px-4 py-2 border rounded-md hover:bg-grary-50 hover:border-indigo-500 hover:text-gray-800' onClick={handler}>
            Add Funder <span className='px-1'><BiUserPlus size={23}></BiUserPlus></span>
          </button>
        </div>
        {deleteId ? DeleteComponent({ deletehandler, canclehandler }) : <></>}
      </div>

      {/* collapsable form */}
      {visible ? <FunderForm data={funderData} /> : <></>}

      {/* table */}
      <div className="container mx-auto">
        <FunderTable data={funderData} />
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

  const res = await fetch(`${process.env.BaseURL}api/funderApi`)
  const funderData = await res.json()


  return {
    props: { session, funderData }
  }
}
