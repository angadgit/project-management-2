import React, { useState } from "react";
import { getSession, useSession } from "next-auth/react";
import App from "../DefaultLayout";
import useSWR from "swr";
import GanttChart from "../../components/GanttChart/GanttChart";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function ProjectGanttChart({ session, projectData }) {
  // const { data: session } = useSession();

  // const { data: projects, error } = useSWR("/api/projectAddApi", fetcher);
  // const projectData = projects?.filter(
  //   (item) => item.user === session?.user.email
  // );

  // if (error) return <div>Failed to load</div>;
  // if (!projectData) return <div>Gantt Chart Loading...</div>;
  // if (!projects) return <div>Project Data Loading...</div>;

  if(!projectData) return<div>ProjectData not available</div>

  return (
    <>
      <App>
        <GanttChart projectData={projectData} />
        {/* <GanttChart_2/> */}
      </App>
    </>
  );
}

export async function getServerSideProps({ req }) {
  try {
    const session = await getSession({ req });
    // authorize user return session
    if (!session) {
      return {
        redirect: {
          destination: "/login",
          premanent: false,
        },
      };
    }

    const res = await fetch(`${process.env.BaseURL}api/projectAddApi`);
    const projectGanttChart = await res.json();
    const projectData = projectGanttChart.filter(
      (item) => item.user === session.user.email
    );

    return {
      props: { session, projectData },
    };
  } catch (error) {
    console.error("Error fetching homepage data", error);
  }
}
