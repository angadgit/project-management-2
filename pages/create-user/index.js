import React from 'react'
import { useSession, getSession } from "next-auth/react"
import DefaultLayout from '../DefaultLayout';
import AddUserForm from '../../components/create-user/addUserForm';
import UsersList from '../../components/create-user/table';
import UserTable from '../../components/create-user/userTable';

const CreateUsers = ({Users}) => {
  const { data: session } = useSession()
  const [visible, setVisible] = React.useState(false)

  const handler = () => {
    setVisible(!visible)
  }

  return (
    <DefaultLayout>
      <div className="container mx-auto flex justify-between py-5 border-b">
        <div className="left flex gap-3">
          <button className='flex bg-indigo-500 text-white px-4 py-2 border rounded-md hover:bg-grary-50 hover:border-indigo-500 hover:text-gray-800' onClick={handler}>Add Users</button>
        </div>
      </div>

      {/* collapsable form */}
      <div className="container mx-auto py-3">
        {visible ? <AddUserForm /> : <></>}
      </div>

      {/* table */}
      <div className="container mx-auto">
        {/* <CompanyProfileView /> */}
        <UserTable session={session} Users={Users}/>
        {/* <UsersList session={session} Users={Users} /> */}
      </div>
    </DefaultLayout>
  )
}

export async function getServerSideProps({ req }) {

  try {
    const session = await getSession({ req })

    const res = await fetch(`${process.env.BaseURL}api/users`)
    const dt = await res.json()
    const Users = dt.filter(item => item.createdBy === session.user.email)
    // console.log(dt.map(item => item))
    // console.log(session.user.email)

    if (!session) {
      return {
        redirect: {
          destination: "/login",
          premanent: false
        }
      }
    }
    // authorize user return session
    return {
      props: { session, Users }
    }
  } catch (error) {
    console.error("Error fetching homepage data", error);
  }

}

export default CreateUsers