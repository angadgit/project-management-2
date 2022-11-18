import React from "react";
import App from "./DefaultLayout";
import { useEffect, useState } from "react";
import { useSession, getSession } from "next-auth/react";
import { BiStoreAlt } from "react-icons/bi";
import AddProject from "../components/project-manage/addProject";
// import GanttChart from "../components/GanttChart/GanttChart";
import useSWR from "swr";
import ProjectTable from "../components/project-manage/projectTables";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function ProjectManage() {
  const { data: session } = useSession();
  const [visible, setVisible] = React.useState(false);

  const { data: funder, error } = useSWR("/api/funderApi", fetcher);
  const funderdata = funder?.filter((item) => item.user === session.user.email);
  const { data: projects } = useSWR("/api/projectAddApi", fetcher);
  const ProjectData = projects?.filter(
    (item) => item.user === session?.user.email
  );

  if (error) return <div>Failed to load</div>;
  if (!funderdata) return <div>Funder Loading...</div>;
  if (!ProjectData) return <div>ProjectData Loading...</div>;

  const handler = () => {
    setVisible(!visible);
  };

  return (
    <>
      <App>
        <div className="container mx-auto flex justify-between py-5 border-b">
          <div className="left flex gap-3">
            <button
              className="flex bg-indigo-500 text-white px-4 py-2 border rounded-md hover:bg-grary-50 hover:border-indigo-500 hover:text-gray-800"
              onClick={handler}
            >
              Add Project{" "}
              <span className="px-1">
                <BiStoreAlt size={23}></BiStoreAlt>
              </span>{" "}
            </button>
          </div>
        </div>

        {/* collapsable form */}
        <div className="container mx-auto mb-10">
          {/* {visible ? <GanttChart/> : <></>} */}
          {visible ? <AddProject funders={funderdata} /> : <></>}
        </div>

        {/* <hr className="mx-auto w-auto h-1 bg-gray-100 rounded border-0 md:my-3 dark:bg-white"/> */}

        {/* table */}
        <div className="container mx-auto">
          <ProjectTable session={session} ProjectData={ProjectData} />
        </div>
      </App>
    </>
  );
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        premanent: false,
      },
    };
  }
  // authorize user return session
  return {
    props: { session },
  };
}
