import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Calendar, Card, Carousel, Col, Descriptions, Grid, Layout, Menu, Row } from 'antd';
import React, { useEffect, useState } from 'react';
const { Header, Sider, Content } = Layout;
import requester from '../requester'

export default function Home() {
  const [reservations, setReservations] = useState();
  useEffect(() => {
    requester.get(`${process.env.NEXT_PUBLIC_API_URL}/reservations`).then(data => {
      console.log(data)
    }).catch(err => {
      console.log(err)
    });
  }, [])
  return (
    <>
      <div className='w-full flex justify-center mb-[50px]'>
        <Carousel autoplay className='w-[90vw] md:w-[70vw]'>
          <>
            <img src="https://d37b96571lewzk.cloudfront.net/assets/image/94/60367d801753f/top_esports_arenas_main_o.jpg" width="100%" height="100%" />
          </>
          <>
            <img src="https://d37b96571lewzk.cloudfront.net/assets/image/94/60367d801753f/top_esports_arenas_main_o.jpg" width="100%" height="100%" />
          </>
          <>
            <img src="https://d37b96571lewzk.cloudfront.net/assets/image/94/60367d801753f/top_esports_arenas_main_o.jpg" width="100%" height="100%" />
          </>
          <>
            <img src="https://d37b96571lewzk.cloudfront.net/assets/image/94/60367d801753f/top_esports_arenas_main_o.jpg" width="100%" height="100%" />
          </>
          <>
            <img src="https://d37b96571lewzk.cloudfront.net/assets/image/94/60367d801753f/top_esports_arenas_main_o.jpg" width="100%" height="100%" />
          </>
          <>
            <img src="https://d37b96571lewzk.cloudfront.net/assets/image/94/60367d801753f/top_esports_arenas_main_o.jpg" width="100%" height="100%" />
          </>
        </Carousel>
      </div>
      <div className='w-[100%] flex justify-center'>
        <p className='text-[22px] font-bold w-[100%] md:w-[70vw]'>Próximas reservas</p>
      </div>
      <div className='flex flex-wrap justify-center md:justify-between w-[100%] md:w-[70vw] mx-auto'>
        <Card title="14/02 - 18:30" bordered={false} className="my-2 w-[100%] max-w-[300px]">
          <p>Quadra: Arena UTPFR</p>
          <p>Esporte: Futebol</p>
          <Button type="primary" size='small' className='bg-[#1677ff] my-2'>Ver mais</Button>
        </Card>
        <Card title="14/02 - 18:30" bordered={false} className="my-2 w-[100%] max-w-[300px]">
          <p>Quadra: Arena UTPFR</p>
          <p>Esporte: Futebol</p>
          <Button type="primary" size='small' className='bg-[#1677ff] my-2'>Ver mais</Button>
        </Card>
      </div>
      <div className='w-[100%] flex justify-center'>
        <p className='text-[22px] font-bold w-[100%] md:w-[70vw]'>Suas reservas</p>
      </div>
      <div className='flex flex-wrap justify-center md:justify-between w-[100%] md:w-[70vw] mx-auto'>
        <Card title="14/02 - 18:30" bordered={false} className="my-2 w-[100%] max-w-[300px]">
          <p>Quadra: Arena UTPFR</p>
          <p>Esporte: Futebol</p>
          <Button type="primary" size='small' className='bg-[#1677ff] my-2'>Ver mais</Button>
        </Card>
        <Card title="14/02 - 18:30" bordered={false} className="my-2 w-[100%] max-w-[300px]">
          <p>Quadra: Arena UTPFR</p>
          <p>Esporte: Futebol</p>
          <Button type="primary" size='small' className='bg-[#1677ff] my-2'>Ver mais</Button>
        </Card>
      </div>
    </>
  )
}