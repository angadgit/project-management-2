import { BiEdit, BiTrashAlt, BiShow } from "react-icons/bi";
import { getRecepits } from "../../lib/recepitHelper";
import { useQuery } from 'react-query';
import { useSession } from "next-auth/react"
import { useSelector, useDispatch } from 'react-redux'
import { toggleChangeAction, updateAction, deleteAction } from "../../redux/reducer";
import { useEffect, useState } from "react";
import FunderAddForm from "../funder/funderAddForm";
import RecepitPrint_1 from "../printPages/recepitPrint_1";
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function RecepitTable({ data }) {
  const { data: session } = useSession()
  // const { data: recepit, error } = useSWR('/api/recepitApi', fetcher)
  // if (error) return <div>Failed to load</div>
  // if (!recepit) return <div>Loading...</div>

  return (
    <>
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-800">
            <th className="px-16 py-2">
              <span className="text-gray-200">Funder</span>
            </th>
            <th className="px-16 py-2">
              <span className="text-gray-200">Fund Type</span>
            </th>
            <th className="px-16 py-2">
              <span className="text-gray-200">Recepit Amount </span>
            </th>
            <th className="px-16 py-2">
              <span className="text-gray-200">Type of fund</span>
            </th>
            <th className="px-16 py-2">
              <span className="text-gray-200">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-200">
          {
            data?.filter(item => item.user === session.user.email).map((obj, i) =>  <Tr {...obj} key={i} /> )
          }
        </tbody>
      </table>
    </>
  )
}


function Tr({ _id, fullName, funderType, receiptAmount, typeFund }) {

  const visible = useSelector((state) => state.app.client.toggleForm)

  const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(false);

  const onUpdate = () => {
    dispatch(toggleChangeAction(_id))
    if (visible) {
      dispatch(updateAction(_id))
    }
  }

  const [id, setId] = useState()

  const onView = () => {
    setId(_id)
    setShowModal(true)
  }

  const onDelete = () => {
    if (!visible) {
      dispatch(deleteAction(_id))
    }

  }
  return (
    <>
      <tr className="bg-gray-50 text-center">
        <td className="px-16 py-2 flex flex-row items-center">
          {/* <img src="#" alt="" /> */}
          <span className="text-center ml-2 font-semibold">{fullName || "Unknown"}</span>
        </td>
        <td className="px-16 py-2">
          <span>{funderType || "Unknown"}</span>
        </td>
        <td className="px-16 py-2">
          <span>{receiptAmount || "Unknown"}</span>
        </td>
        <td className="px-16 py-2">
          <span>{typeFund || "Unknown"}</span>
        </td>
        <td className="px-16 py-2 flex justify-around gap-5">
          <button className="cursor" onClick={onView} ><BiShow size={25} color={"rgb(0 ,0,254)"}></BiShow></button>
          <button className="cursor" onClick={onUpdate} ><BiEdit size={25} color={"rgb(34,197,94)"}></BiEdit></button>
          <button className="cursor" onClick={onDelete}><BiTrashAlt size={25} color={"rgb(244,63,94)"}></BiTrashAlt></button>
        </td>
      </tr>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">

                {/*body*/}
                <div className="relative p-6 flex-auto">
                  {/* <FunderAddForm/> */}
                  <RecepitPrint_1 Rid={id} />
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
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


