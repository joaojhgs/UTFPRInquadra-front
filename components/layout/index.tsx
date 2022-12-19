import { AiOutlineMenu } from "react-icons/ai";
import { Drawer, Layout, Menu } from 'antd';
import React, { useContext, useState } from 'react';
import FooterBar from "../footerBar";
import UserContext from "../../contexts/user";
import Logo from '../../public/logo.png'
import Image from "next/image";
import { useRouter } from "next/router";
const { Header, Sider, Content } = Layout;


function MainLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const { setDecodedToken, decodedToken } = useContext(UserContext)
  return (
    <Layout className="layout h-fit min-h-[100vh]">
      <div className='flex justify-center w-[100%] fixed top-0 left-0 bg-white h-[50px] z-[1000]'>
        <button onClick={() => router.push('/')}>
          <Image src={Logo} width="75px" height="50px" alt="logo" />
        </button>
        <div className='hidden md:flex ml-auto w-[30px] h-[30px] text-[30px] my-auto mr-[10px]'>
          <button onClick={() => setCollapsed(true)}>
            <AiOutlineMenu color="black" />
          </button>
        </div>
      </div>
      <Layout
        className="h-fit"
        style={{
          marginTop: '50px',
          marginLeft: '16px',
          marginRight: '16px',
          marginBottom: '50px',
          padding: 24,
        }}
      >
        {children}
      </Layout>
      <FooterBar setCollapsed={setCollapsed} collapsed={collapsed} />
      <Drawer title="Menu" placement="right" onClose={() => setCollapsed(false)} open={collapsed}>
        <div>
          {decodedToken?.role === 'ADMIN' && <button onClick={() => {
            router.push('/admin');
            setCollapsed(false);
          }}><p className="text-danger font-bold">Painel de controle</p></button>}
        </div>
        <div>
          <button onClick={() => {
            localStorage.removeItem('token');
            setDecodedToken(null);
            setCollapsed(false);
          }}><p className="text-danger font-bold">Logout</p></button>
        </div>  
      </Drawer>
    </Layout>
  )
}

export default MainLayout;