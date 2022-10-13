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
  const [collapsed, setCollapsed] = useState(false);

  function handleSignOut() {
    signOut()
  }

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo my-5">
        <Image src={'/assets/vedvika.png'} width={250} height={100} alt="github" className="mx-auto p-2"></Image>
        </div>
        <Menu
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
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
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
