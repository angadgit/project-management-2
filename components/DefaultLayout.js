import {
  MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined, LogoutOutlined, HomeOutlined, CopyOutlined, UnorderedListOutlined, ShopOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useState } from "react";
const { Header, Sider, Content } = Layout;
import "antd/dist/antd.css"
import Link from "next/link";
import { getSession, useSession, signOut } from "next-auth/react"
import { useRouter } from 'next/router';
import Image from "next/image";

const App = ({ children }) => {
  const router = useRouter()
  // console.log(router)
  const [collapsed, setCollapsed] = useState(false);

  function handleSignOut() {
    signOut()
  }

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo my-5">
          {/* <Image src={'/assets/vedvika.png'} width={250} height={100} alt="logo" className="mx-auto p-2"></Image> */}
          <img src={'/assets/vedvika.png'} width={250} height={100} alt="logo" className="mx-auto p-2" />
        </div>
        {/* <Menu
          theme="dark"
          mode="inline"
          // selectedKeys={[sideBarMenuKey]}
          defaultSelectedKeys={router.pathname}
        >
          <Menu.Item key="/" icon={<HomeOutlined />}>
            <Link href={"/"}>Home</Link>
          </Menu.Item>
          <Menu.Item key="/funder" icon={<CopyOutlined />}>
            <Link href={"/funder"}>Funder</Link>
          </Menu.Item>
          <Menu.Item key="/receipt" icon={<UnorderedListOutlined />}>
            <Link href={"/receipt"}>Receipt</Link>
          </Menu.Item>
          <Menu.Item key="/profile" icon={<UserOutlined />}>
            <Link href={"/profile"}>Profile</Link>
          </Menu.Item>
          <Menu.Item key="/company-profile" icon={<ShopOutlined />}>
            <Link href={"/company-profile"}>Company Profile</Link>
          </Menu.Item>
          <Menu.Item key="/logout" icon={<LogoutOutlined />} onClick={handleSignOut}>
            Logout
          </Menu.Item>
        </Menu> */}
        {/* <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={router.asPath}
          items={[
            {
              key: "/",
              icon: <HomeOutlined />,
              label: 'Home',
              path: '/'
            },
            {
              key: '/funder',
              icon: <CopyOutlined />,
              label: 'Funder',
              path: '/funder'
            },
            {
              key: '/receipt',
              icon: <UnorderedListOutlined />,
              label: 'Receipt',
              path: '/receipt'
            },
            {
              key: '/profile',
              icon: <UserOutlined />,
              label: 'Profile',
              path: '/profile'
            },
            {
              key: '/company-profile',
              icon: <ShopOutlined />,
              label: 'Company Profile',
              path: '/company-profile'
            },
            // {
            //   key: '6',
            //   icon: <LogoutOutlined />,
            //   label: 'Logout',
            //   path: '/logout',
            //   onClick: {handleSignOut}
            // },
          ].map((item, index) => {
            return {
              key: index,
              label: <Link href={`${item.path}`}>{item.label}</Link>,
              icon: item.icon,
            };
          })}
        /> */}

        <ul className="content-center">
          <Link href={'/funder'} ><li className='text-white cursor-pointer'>Funder</li></Link>
          <Link href={'/receipt'}><li className='text-white cursor-pointer'>Recepit</li></Link>
          <Link href={'/profile'}><li className='text-white cursor-pointer'>Profile</li></Link>
        </ul>

      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background flex justify-between"
          style={{
            padding: 0,
          }}
        >
          <div>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: () => setCollapsed(!collapsed),
              }
            )}
          </div>
          <div className=" flex justify-between ">
            <div className="items-end mr-5">
              <a onClick={handleSignOut} className="text-red-600"><LogoutOutlined /></a>
            </div>
          </div>
        </Header>
        <Content
          className="site-layout-background"
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
