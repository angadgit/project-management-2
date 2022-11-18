import Link from "next/link";
import DefaultLayout from './DefaultLayout';
import { getSession, useSession, signOut } from "next-auth/react"

export default function Profile() {

  const { data: session } = useSession()
  // console.log(session.user.logo)
  const logo = session?.user.logo.split("./public");
  // console.log(logo)
  return (
    <DefaultLayout>
      {/* <section className="container mx-auto text-center">
        <h3 className="text-4xl font-bold">User Profile</h3>
        <div className='details'>
          <h5>{session.user.name}</h5>
          <h5>{session.user.email}</h5>
        </div>
        <Link href={"/"}>Home Page</Link>
      </section> */}
      <section className="text-gray-600 body-font bg-white rounded-lg shadow-lg">
        <div className="container mx-auto flex pt-5 md:flex-row flex-col items-center w-fit">
          <h3 className="text-4xl font-bold">User Profile</h3>
        </div>
        <div className="container mx-auto flex px-5 py-10 md:flex-row flex-col items-center w-fit">
          {session?.user.logo ?
            <div className="lg:max-w-lg lg:w-36 md:w-36 w-5/6 mb-10 md:mb-0">
              <img className="object-cover object-center rounded outline" alt="user img" src={logo[1]} />
            </div> :
            <div className="lg:max-w-lg lg:w-36 md:w-36 w-5/6 mb-10 md:mb-0">
              <svg className="object-cover object-center rounded outline" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
            </div>
          }

          <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
            <div className='details'>
              <div className="grid grid-cols-2 gap-3">
                <span className="font-bold text-lg">Name</span>
                <h1 className="text-lg capitalize text-gray-700 font-sans">{session.user.name}</h1>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <span className="font-bold text-lg">Email</span>
                <h1 className="text-lg text-gray-700 font-sans">{session.user.email}</h1>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <span className="font-bold text-lg">Mobile</span>
                <h1 className="text-lg text-gray-700 font-sans">{session.user.mobileNo}</h1>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <span className="font-bold text-lg">Department</span>
                <h1 className="text-lg text-gray-700 font-sans">{session.user.department}</h1>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <span className="font-bold text-lg">Address</span>
                <h1 className="text-lg text-gray-700 font-sans">{session.user.addressLine1}, {session.user.addressLine2} <br />{session.user.country}, {session.user.state} - {session.user.pinCode} </h1>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <span className="font-bold text-lg">Role</span>
                <h1 className="text-lg text-gray-700 font-sans">{session.user.userRole}</h1>
              </div>
              {/* <div className="grid grid-cols-2 gap-3">
                <span className="font-bold text-lg">Email</span>
                <h1 className="text-lg text-gray-700 font-sans">{session?.user.access.map((item) => (<><span>{item}</span></>))}</h1>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <span className="font-bold text-lg">Email</span>
                <h1 className="text-lg text-gray-700 font-sans">{session?.user.formPermission.map(item => <><span>{item}</span></>)}</h1>
              </div> */}
            </div>
          </div>
        </div>
      </section>

    </DefaultLayout>
  )
}

export async function getServerSideProps({ req }) {

  try {
    const session = await getSession({ req })

    if (!session) {
      return {
        redirect: {
          destination: "/login",
          premanent: false
        }
      }
    }

    // const res = await fetch(`${process.env.BaseURL}api/companyProfileApi`)
    // const profileData = await res.json()
    // const data = profileData?.filter((item) => item.user === session.user.email);

    // authorize user return session
    return {
      props: { session }
    }
  } catch (error) {
    console.error("Error fetching homepage data", error);
  }
}