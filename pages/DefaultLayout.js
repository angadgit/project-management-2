import {
  MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined, LogoutOutlined, HomeOutlined, CopyOutlined, UnorderedListOutlined, ShopOutlined, UsergroupAddOutlined, UserSwitchOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useState, useEffect } from "react";
const { Header, Sider, Content } = Layout;
import "antd/dist/antd.css"
import Link from "next/link";
import { getSession, useSession, signOut } from "next-auth/react"
import { useRouter } from 'next/router';
import Image from "next/image";
import { BsBarChartSteps } from 'react-icons/bs';
import { AiOutlineFundProjectionScreen } from 'react-icons/ai';
import SidebarMenu from "../components/sidbar";

const App = ({ children }) => {
  const router = useRouter()

  const { data: session } = useSession()

  const [collapsed, setCollapsed] = useState(false);

  function handleSignOut() {
    signOut()
  }

  // console.log(session)

  const menuItems = [
    {
      href: '/',
      title: 'Homepage',
    },
    {
      href: '/profile',
      title: 'User Profile',
    },
    {
      href: '/company-profile',
      title: 'Organization Profile',
    },
    {
      href: '/funder',
      title: 'Funder',
    },
    {
      href: '/recepit',
      title: 'Recepit',
    },
    {
      href: '/create-user',
      title: 'Create Users',
    },
    {
      href: '/project-manage',
      title: 'Project Create',
    },
    {
      href: '/project-ganttChart',
      title: 'Project Gantt chart',
    },
  ];

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed} className="overflow-hidden">
        <div className="logo my-5">
          {/* <Image src={'/assets/vedvika.png'} width={250} height={100} alt="logo" className="mx-auto p-2"></Image> */}
          <Image src={'/assets/vedvika.png'} width={250} height={100} alt={"logo"} loading="eager" className="mx-auto p-2" />

        </div>

        <div className='flex flex-col md:flex-row flex-1'>
          <aside className=' w-full md:w-60'>
            <nav>
              {session.user.userRole === "super admin" ? <ul className="">
                {menuItems.map(({ href, title }) => (
                  <li className='m-2' key={title}>
                    <Link href={href} className={`flex p-2 text-white rounded hover:bg-fuchsia-400 hover:text-white cursor-pointer ${router.asPath === href && 'bg-fuchsia-600 text-white'
                      }`} >
                      {title}
                    </Link>
                  </li>
                ))}
              </ul> : <ul className="">
                {session.user.formPermission.map((item) => (
                  <li className='m-2' key={item}>
                    <Link href={item} className={`flex p-2 uppercase text-white rounded hover:bg-fuchsia-400 hover:text-white cursor-pointer ${router.asPath === item && 'bg-fuchsia-600 text-white'
                      }`} >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>}

            </nav>
          </aside>
        </div>

      </Sider>

      <Layout className="site-layout bg-slate-400">
        <Header
          className="site-layout-background flex justify-between"
          style={{
            padding: 0,
          }}
        >
          <div className="text-white hover:text-blue-400">
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: () => setCollapsed(!collapsed),
              }
            )}
          </div>

          <div className=" flex justify-between ">
            <div className="items-end">
              <p className="text-green-600">{session?.user.name}</p>
            </div>
            <div className="items-end mr-5">
              <a onClick={handleSignOut} className="text-red-600"><LogoutOutlined /></a>
            </div>
          </div>
        </Header>
        <Content
          className="site-layout-background bg-gray-200 shadow-md overflow-scroll"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
