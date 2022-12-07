import { AiOutlineMenu } from "react-icons/ai";
import { Drawer, Layout, Menu } from 'antd';
import React, { useState } from 'react';
import FooterBar from "../footerBar";
const { Header, Sider, Content } = Layout;

function MainLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout className="layout h-fit min-h-[100vh]">
      <div className='hidden md:flex w-[100%] fixed top-0 left-0 bg-white h-[50px] z-[1000]'>
        <div className='ml-auto w-[30px] h-[30px] text-[30px] my-auto mr-[10px]'>
          <button onClick={() => setCollapsed(true)}>
            <AiOutlineMenu color="black" />
          </button>
        </div>
      </div>
      <Layout
      className="h-fit"
        style={{
          margin: '24px 16px',
          padding: 24,
        }}
      >
        {children}
      </Layout>
      <FooterBar />
      <Drawer title="Basic Drawer" placement="right" onClose={() => setCollapsed(false)} open={collapsed}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </Layout>
  )
}

export default MainLayout;