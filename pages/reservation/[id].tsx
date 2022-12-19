import { Button, Descriptions, Empty, List, Modal, notification } from "antd";
import moment from "moment";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { IReservation } from "..";
import UserContext from "../../contexts/user";
import requester from '../../requester'
interface IReservationPage {
  reservationInfo: string;
  errorCode: number;
}
const Reservation = ({
  reservationInfo,
  errorCode,
}: IReservationPage) => {
  let data: IReservation | undefined = undefined;
  if (reservationInfo) {
    data = JSON.parse(reservationInfo);
  }
  const router = useRouter()
  const { id } = router.query
  const { decodedToken } = useContext(UserContext);
  const [api, contextHolder] = notification.useNotification();
  const [participantsModal, setParticipantsModal] = useState(false);
  const [requestedParticipantsModal, setRequestedParticipantsModal] = useState(false);
  const [alreadyParticipant, setAlreadyParticipant] = useState(false);
  const [alreadyRequested, setAlreadyRequested] = useState(false);
  const [isManager, setIsManager] = useState(false);

  useEffect(() => {
    if (decodedToken) {
      if (data?.requested_participants.find(participant => participant.user_id === decodedToken.id)) setAlreadyRequested(true);
      if (data?.participants.find(participant => participant.user_id === decodedToken.id)) setAlreadyParticipant(true);
      if (data?.manager_id === decodedToken.id) setIsManager(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [decodedToken])


  const joinReservation = () => requester.post(`${process.env.NEXT_PUBLIC_API_URL}/reservations/request/join`, { reservationId: id }).then(data => {
    api.success({
      message: `Sucesso`,
      description: 'Pedido realizado com sucesso!',
      placement: 'bottomRight',
    });
  }).catch(err => {
    console.log(err)
  });

  const acceptRequest = (userId: string) => requester.post(`${process.env.NEXT_PUBLIC_API_URL}/reservations/request/accept`, { reservationId: id, userId: userId }).then(data => {
    api.success({
      message: `Sucesso`,
      description: 'Pedido aceitado com sucesso!',
      placement: 'bottomRight',
    });
  }).catch(err => {
    console.log(err)
  });

  const refuseRequest = (userId: string) => requester.post(`${process.env.NEXT_PUBLIC_API_URL}/reservations/request/refuse`, { reservationId: id, userId: userId }).then(data => {
    api.success({
      message: `Sucesso`,
      description: 'Pedido recusado com sucesso!',
      placement: 'bottomRight',
    });
  }).catch(err => {
    console.log(err)
  });

  const refuseParticipant = (userId: string) => requester.post(`${process.env.NEXT_PUBLIC_API_URL}/reservations/remove`, { reservationId: id, userId: userId }).then(data => {
    api.success({
      message: `Sucesso`,
      description: 'Participante removido com sucesso!',
      placement: 'bottomRight',
    });
  }).catch(err => {
    console.log(err)
  });

  const cancelReservation = () => requester.post(`${process.env.NEXT_PUBLIC_API_URL}/reservations/cancel`, { reservationId: id }).then(data => {
    api.success({
      message: `Sucesso`,
      description: 'Cancelado com sucesso!',
      placement: 'bottomRight',
    });
  }).catch(err => {
    console.log(err)
  });

  const cancelRequest = () => requester.post(`${process.env.NEXT_PUBLIC_API_URL}/reservations/request/cancel`, { reservationId: id }).then(data => {
    api.success({
      message: `Sucesso`,
      description: 'Pedido cancelado com sucesso!',
      placement: 'bottomRight',
    });
  }).catch(err => {
    console.log(err)
  });

  return <>
    <Descriptions>
      <Descriptions.Item label="Quadra">{data?.court?.name}</Descriptions.Item>
      <Descriptions.Item label="Esporte">{data?.sport?.name}</Descriptions.Item>
      <Descriptions.Item label="Máximo de participantes">{data?.max_participants}</Descriptions.Item>
      <Descriptions.Item label="Hora de inicio">{moment(data?.startDateTime).format('DD/MM - HH:mm')}</Descriptions.Item>
      <Descriptions.Item label="Hora de término">{moment(data?.endDateTime).format('DD/MM - HH:mm')}</Descriptions.Item>
    </Descriptions>
    <Button className="w-full bg-[#1677ff] text-white my-4" onClick={() => { setParticipantsModal(true) }}>Participantes</Button>
    {decodedToken?.id === data?.manager_id &&
      <div>
        <Button className="w-full bg-[#1677ff] text-white my-4" onClick={() => { setRequestedParticipantsModal(true) }}>Pedidos de participação</Button>
      </div>
    }
    {decodedToken &&
      <>
        {!alreadyParticipant && !alreadyRequested && <Button className="w-full bg-[#1677ff] text-white my-4" onClick={() => { joinReservation() }}>Juntar-se à reserva</Button>}
        {alreadyParticipant && <Button className="w-full bg-[red] text-white my-4" onClick={() => { cancelReservation() }}>{isManager ? 'Cancelar reserva' : 'Sair da reserva'}</Button>}
        {alreadyRequested && <Button className="w-full bg-[red] text-white my-4" onClick={() => { cancelRequest() }}>Cancelar pedido</Button>}
      </>}
    {contextHolder}
    <Modal open={participantsModal} onCancel={() => { setParticipantsModal(false) }} footer>
      <List itemLayout="vertical">
        {data?.participants?.length ? data?.participants?.map(participant => {
          return <List.Item key={participant.user_id} className="border border-[black] rounded m-[15px]">
            <List.Item.Meta
              title={<a href="https://ant.design">{participant?.user?.name}</a>}
              description={participant?.user?.email}
            />
            {decodedToken?.id === data?.manager_id && data?.manager_id !== participant.user_id ? <div className="flex">
              <Button className="w-full bg-[red] text-white my-4" onClick={() => { refuseParticipant(participant.user_id) }}>Remover</Button>
            </div> : <></>}
          </List.Item>
        }) : <Empty description="Vazio"/>}
      </List>
    </Modal>
    <Modal open={requestedParticipantsModal} onCancel={() => { setRequestedParticipantsModal(false) }} footer>
      <List itemLayout="vertical">
        {data?.requested_participants?.length ? data?.requested_participants?.map(participant => {
          return <List.Item key={participant.user_id} className="border border-[black] rounded m-[15px]">
            <List.Item.Meta
              title={<a href="https://ant.design">{participant.user.name}</a>}
              description={participant?.user?.email}
            />
            <div className="flex">
              <Button className="w-full bg-[green] text-white my-4" onClick={() => { acceptRequest(participant.user_id) }}>Aceitar</Button>
              <Button className="w-full bg-[red] text-white my-4" onClick={() => { refuseRequest(participant.user_id) }}>Recusar</Button>
            </div>
          </List.Item>
        }) : <Empty description="Vazio"/>}
      </List>
    </Modal>
  </>
}

export const getStaticProps: GetStaticProps = async ({ params = {} }) => {
  const { id = '' } = params;
  let reservationInfo: null | IReservation = null;
  let errorCode = 0;
  await requester.get(`${process.env.NEXT_PUBLIC_API_URL}/reservations`).then(data => {
    reservationInfo = (data.data as IReservation[]).filter(reservation => reservation.id === id)[0];
  }).catch(err => {
    console.log(err)
  });

  return {
    props: {
      reservationInfo: reservationInfo ? JSON.stringify(reservationInfo) : reservationInfo,
      errorCode,
      id,
    },
    revalidate: 1,
  };
};

export const getStaticPaths = async () => {
  let data: IReservation[];
  const response = await requester.get(`${process.env.NEXT_PUBLIC_API_URL}/reservations`);
  data = response.data;

  const paths = data?.map(path => ({ params: { id: path.id } }));

  return { paths, fallback: 'blocking' };
};

export default Reservation;