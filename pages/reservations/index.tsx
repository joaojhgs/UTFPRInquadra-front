import { Button, Card, DatePicker, Form, TimePicker } from "antd";
import { useEffect, useState } from "react";
import { IReservation } from "..";
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs'
import requester from '../../requester'
import moment from "moment";
import { useRouter } from "next/router";


const Reservations = () => {
    const router = useRouter()
    const [form] = Form.useForm();
    const [reservations, setReservations] = useState<Array<IReservation>>([]);
    const watchDatePicker: Dayjs = Form.useWatch('DatePicker', form);

    const ReservationCard = ({ reservation }: { reservation: IReservation }) => <Card key={reservation.id} title={moment(reservation.startDateTime).format('DD/MM - HH:mm')} bordered={false} className="my-2 w-[100%] max-w-[300px]">
    <p>Quadra: {reservation?.court?.name}</p>
    <p>Esporte: {reservation?.sport?.name}</p>
    <Button type="primary" size='small' className='bg-[#1677ff] my-2' onClick={() => {router.push(`/reservation/${reservation.id}`)}}>Ver mais</Button>
</Card>

    useEffect(() => {
        requester.get(`${process.env.NEXT_PUBLIC_API_URL}/reservations`).then(data => {
            setReservations(data.data);
        }).catch(err => {
            console.log(err)
        });
    }, [])
    return <>
        <Form form={form} className="w-full">
            <div className="justify-center">
                <Form.Item name='DatePicker' className="w-full">
                    <DatePicker className="w-full" />
                </Form.Item>
                <div className="w-full flex flex-wrap">
                    {
                        reservations.filter(reservation => watchDatePicker ? watchDatePicker?.isSame(reservation.startDateTime, 'day') : true).map(reservation => <ReservationCard reservation={reservation} key={reservation.id} />)
                    }
                </div>
            </div>
        </Form>
    </>
}

export default Reservations;