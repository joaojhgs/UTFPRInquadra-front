import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Calendar, Card, Carousel, Col, Descriptions, Grid, Layout, Menu, Row } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
const { Header, Sider, Content } = Layout;
import requester from '../requester'

export interface IReservation {
  courtId: string;
  created_at: string;
  description: string;
  endDateTime: string;
  id: string;
  manager_id: string;
  max_participants: number
  sportId: string;
  startDateTime: string;
  sport: {
    id: string
    maxAmount: string
    name: string
  }
  court: {
    id: string
    name: string
  }
}

export default function Home() {
  const [reservations, setReservations] = useState<Array<IReservation>>([]);
  const [myReservations, setMyReservations] = useState<Array<IReservation>>([]);

  useEffect(() => {
    requester.get(`${process.env.NEXT_PUBLIC_API_URL}/reservations`).then(data => {
      setReservations(data.data);
    }).catch(err => {
      console.log(err)
    });
    requester.get(`${process.env.NEXT_PUBLIC_API_URL}/myReservation`).then(data => {
      setMyReservations(data.data);
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
      <div className='flex flex-wrap justify-center md:justify-start w-[100%] md:w-[70vw] mx-auto'>
        {reservations.slice(0, 4).map((reservation, index) => <Card key={reservation.id} title={moment(reservation.startDateTime).format('DD/MM - HH:mm')} bordered={false} className="my-2 w-[100%] max-w-[300px]">
          <p>Quadra: {reservation?.court?.name}</p>
          <p>Esporte: {reservation?.sport?.name}</p>
          <Button type="primary" size='small' className='bg-[#1677ff] my-2'>Ver mais</Button>
        </Card>)}
      </div>
      {myReservations.length > 0 && <><div className='w-[100%] flex justify-center'>
        <p className='text-[22px] font-bold w-[100%] md:w-[70vw]'>Suas reservas</p>
      </div><div className='flex flex-wrap justify-center md:justify-start w-[100%] md:w-[70vw] mx-auto'>
          {myReservations.slice(0, 4).map((reservation, index) => <Card key={reservation.id} title={moment(reservation.startDateTime).format('DD/MM - HH:mm')} bordered={false} className="my-2 w-[100%] max-w-[300px]">
            <p>Quadra: {reservation?.court?.name}</p>
            <p>Esporte: {reservation?.sport?.name}</p>
            <Button type="primary" size='small' className='bg-[#1677ff] my-2'>Ver mais</Button>
          </Card>)}
        </div></>}
    </>
  )
}