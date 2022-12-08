import { Button, Descriptions, notification } from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { IReservation } from "..";
import UserContext from "../../contexts/user";
import requester from '../../requester'

const Reservation = () => {
  const router = useRouter()
  const { id } = router.query
  const [reservation, setReservation] = useState<IReservation>({} as IReservation);
  const { decodedToken } = useContext(UserContext);
  const [api, contextHolder] = notification.useNotification();

  const joinReservation = () => requester.post(`${process.env.NEXT_PUBLIC_API_URL}/reservations/request/join`, {reservationId: id}).then(data => {
    api.success({
      message: `Sucesso`,
      description: 'Pedido realizado com sucesso!',
      placement: 'bottomRight',
  });
  }).catch(err => {
    console.log(err)
  });

  useEffect(() => {
    requester.get(`${process.env.NEXT_PUBLIC_API_URL}/reservations`).then(data => {
      setReservation((data.data as IReservation[]).filter(reservation => reservation.id === id)[0]);
    }).catch(err => {
      console.log(err)
    });
  }, [])

  useEffect(() => {
    console.log(reservation)
  }, [reservation])

  return <>
    <Descriptions>
      <Descriptions.Item label="Quadra">{reservation?.court?.name}</Descriptions.Item>
      <Descriptions.Item label="Esporte">{reservation?.sport?.name}</Descriptions.Item>
      <Descriptions.Item label="Máximo de participantes">{reservation?.max_participants}</Descriptions.Item>
      <Descriptions.Item label="Hora de inicio">{moment(reservation?.startDateTime).format('DD/MM - HH:mm')}</Descriptions.Item>
      <Descriptions.Item label="Hora de término">{moment(reservation?.endDateTime).format('DD/MM - HH:mm')}</Descriptions.Item>
    </Descriptions>
    {decodedToken?.id === reservation?.manager_id ? 
      <div><Button className="w-full bg-[#1677ff] text-white my-4">Participantes</Button><Button className="w-full bg-[#1677ff] text-white my-4">Pedidos de participação</Button></div>
      : decodedToken && <Button className="w-full bg-[#1677ff] text-white my-4" onClick={() => {joinReservation()}}>Juntar-se à reserva</Button>}
    {contextHolder}
  </>
}

export default Reservation;