import { BiEdit, BiTrashAlt } from "react-icons/bi";
import { useSession } from "next-auth/react"
import { useSelector, useDispatch } from 'react-redux'
import { toggleChangeAction, updateAction, deleteAction } from "../../redux/reducer";

export default function FunderTable({ data }) {
  const { data: session } = useSession()

  return (
    <div className="overflow-auto rounded-lg">
      <table className="md:table-fixed w-full table-auto">
        <thead>
          <tr className="bg-gray-800">
            <th className="px-16 py-2">
              <span className="text-gray-200">Funder</span>
            </th>
            <th className="px-16 py-2">
              <span className="text-gray-200">Contact Person</span>
            </th>
            <th className="px-16 py-2">
              <span className="text-gray-200">Email</span>
            </th>
            <th className="px-16 py-2">
              <span className="text-gray-200">Contact Number</span>
            </th>
            <th className="px-16 py-2">
              <span className="text-gray-200">Pan Id</span>
            </th>
            <th className="px-16 py-2">
              <span className="text-gray-200">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-200">
          {
            data.filter(item => item.user === session.user.email).map((obj, i) => <Tr {...obj} key={i} />)
          }
        </tbody>
      </table>
    </div>
  )
}

function Tr({ _id, funderName, contactPerson, contactNumber, email, pan }) {

  const visible = useSelector((state) => state.app.client.toggleForm)
  const dispatch = useDispatch()

  const onUpdate = () => {
    dispatch(toggleChangeAction(_id))
    if (visible) {
      dispatch(updateAction(_id))
    }
  }

  const onDelete = () => {
    if (!visible) {
      dispatch(deleteAction(_id))
    }
  }

  return (
    <tr className="bg-gray-50 text-center">
      <td className="px-16 py-2 flex flex-row items-center">
        <span className="text-center ml-2 font-semibold">{funderName || "Unknown"}</span>
      </td>
      <td className="px-16 py-2">
        <span>{contactPerson || "Unknown"}</span>
      </td>
      <td className="px-16 py-2">
        <span>{email || "Unknown"}</span>
      </td>
      <td className="px-16 py-2">
        <span>{contactNumber || "Unknown"}</span>
      </td>
      <td className="px-16 py-2">
        <span>{pan || "Unknown"}</span>
      </td>
      <td className="px-16 py-2 flex justify-around gap-5">
        <button className="cursor" onClick={onUpdate} ><BiEdit size={25} color={"rgb(34,197,94)"}></BiEdit></button>
        <button className="cursor" onClick={onDelete}><BiTrashAlt size={25} color={"rgb(244,63,94)"}></BiTrashAlt></button>
      </td>
    </tr>
  )
}