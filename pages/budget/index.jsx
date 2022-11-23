import Head from "next/head";
import React from "react";
import { getSession } from "next-auth/react";
import DefaultLayout from "../DefaultLayout";
import { useSelector, useDispatch } from "react-redux";
import { toggleChangeAction, deleteAction } from "../../redux/reducer";
import BudgetAdd from "../../components/budgetComponents/budgetAdd";
import BudgetTable from "../../components/budgetComponents/budgetTable";

const isServerReq = (req) => !req.url.startsWith("/_next");

export default function Budget({
  session,
  funderData,
  err,
  projectData,
  budgetData,
}) {
  const dispatch = useDispatch();
  const visible = useSelector((state) => state.app.client.toggleForm);

  const addAccess = session?.user?.access?.map((item) => item.addForms.add);
  const deleteAccess = session?.user?.access?.map(
    (item) => item.deleteForms.delete_dt
  );
  const viewAccess = session?.user?.access?.map((item) => item.viewForms.view);
  const updateAccess = session?.user?.access?.map(
    (item) => item.updateForms.update
  );

  const addForm = addAccess?.map((item) => item.indexOf("budget") !== -1);
  const viewTable = viewAccess?.map((item) => item.indexOf("budget") !== -1);

  // visible add and update forms
  const handler = () => {
    dispatch(toggleChangeAction());
  };

  if (err) return alert(err);

  return (
    <>
      <Head>
        <title>Budget</title>
      </Head>
      <DefaultLayout>
        <div className="container mx-auto flex justify-between py-5 border-b">
          <div className="left flex gap-5">
            {session?.user.userRole === "super admin" ? (
              <button
                className="flex bg-indigo-500 text-white px-4 py-2 border rounded-md hover:bg-grary-50 hover:border-indigo-500 hover:text-gray-800"
                onClick={handler}
              >
                Add Budget{" "}
                <span className="px-1">
                  {/* <BiUserPlus size={23}></BiUserPlus> */}
                </span>
              </button>
            ) : (
              <button
                className="flex bg-indigo-500 text-white px-4 py-2 border rounded-md hover:bg-grary-50 hover:border-indigo-500 hover:text-gray-800"
                onClick={handler}
              >
                Add Budget{" "}
                <span className="px-1">
                  {/* <BiUserPlus size={23}></BiUserPlus> */}
                </span>
              </button>
            )}
          </div>
        </div>

        {/* collapsable form */}
        <div className="container mx-auto py-5">
          {visible ? (
            <BudgetAdd
              session={session}
              funderData={funderData}
              projectData={projectData}
            />
          ) : (
            ""
          )}
        </div>

        {/* table */}

        {/* access for admin  */}
        {session?.user.userRole === "super admin" ? (
          <div className="container mx-auto">
            <BudgetTable
              session={session}
              Budget={budgetData}
              deleteAccess={deleteAccess}
              viewAccess={viewAccess}
              updateAccess={updateAccess}
            />
          </div>
        ) : (
          <div className="container mx-auto">
            <BudgetTable
              session={session}
              Budget={budgetData}
              deleteAccess={deleteAccess}
              viewAccess={viewAccess}
              updateAccess={updateAccess}
            />
          </div>
        )}

        {/* access for users  */}
        {/* {viewTable[0] ? (
          <div className="container mx-auto">
            <BudgetTable
              session={session}
              Budget={budgetData}
              deleteAccess={deleteAccess}
              viewAccess={viewAccess}
              updateAccess={updateAccess}
            />
          </div>
        ) : (
          ""
        )} */}
      </DefaultLayout>
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

    const res = await fetch(`${process.env.BaseURL}api/budgetApi`);
    const budgets = await res.json();
    const budgetData = budgets?.filter(
      (item) => item.user === session.user.createdBy
    );

    const res3 = await fetch(`${process.env.BaseURL}api/funderApi`);
    const funders = await res3.json();
    const funderData = funders.filter(
      (item) => item.user === session.user.createdBy
    );

    const project = await fetch(`${process.env.BaseURL}api/projectAddApi`);
    const projectDt = await project.json();
    const projectData = projectDt.filter(
      (item) => item.user === session.user.createdBy
    );

    return {
      props: { session, funderData, projectData, budgetData },
    };
  } catch (error) {
    // console.error("Error fetching homepage data", error);
    const err = error;
    return {
      props: { err },
    };
  }
}
