import Link from "next/link";
import DefaultLayout from '../components/DefaultLayout';
import { getSession, useSession, signOut } from "next-auth/react"

export default function Profile () {

  const { data: session } = useSession()

  return (
    <DefaultLayout>
      <section className="container mx-auto text-center">
        <h3 className="text-4xl font-bold">Profile Page</h3>
        <div className='details'>
          <h5>{session.user.name}</h5>
          <h5>{session.user.email}</h5>
        </div>
        <Link href={"/"}>Home Page</Link>
      </section>
    </DefaultLayout>
  )
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req })

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
    props: { session }
  }
}