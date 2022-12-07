import { Button, DatePicker, Form, Input, InputNumber, notification, Select } from "antd";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/user";
import requester from '../../requester'

const NewReservation = ({ setModalVisibility }: { setModalVisibility: Dispatch<SetStateAction<boolean>> }) => {
    const [form] = Form.useForm()
    const [api, contextHolder] = notification.useNotification();
    const [sports, setSports] = useState<Array<{
        id: string
        name: string
    }>>([]);
    const [courts, setCourts] = useState<Array<{
        id: string
        name: string
    }>>([]);


    useEffect(() => {
        requester.get(`${process.env.NEXT_PUBLIC_API_URL}/sports`).then(data => {
            console.log('sports', typeof data.data)
            setSports(data.data);
        }).catch(err => {
            console.log(err)
        });
        requester.get(`${process.env.NEXT_PUBLIC_API_URL}/courts`).then(data => {
            console.log('courts', typeof data.data)
            setCourts(data.data);
        }).catch(err => {
            console.log(err)
        });
    }, [])


    const handleFormSubmit = (values: { ra: number, password: string, campi: string, email: string, name: string }) => {
        console.log(values);
        requester.post(`${process.env.NEXT_PUBLIC_API_URL}/reservations/create`, values).then(data => {
            api.success({
                message: `Sucesso`,
                description: 'Reserva criada com sucesso bem sucedido!',
                placement: 'bottomRight',
            });
            setModalVisibility(false)
            // requester.post(`${process.env.NEXT_PUBLIC_API_URL}/login`, values).then(data => {
            //     setDecodedToken(jwtDecode(data.data));
            //     localStorage.setItem('token', data.data);
            //     setModalVisibility(false)
            //     api.success({
            //         message: `Sucesso`,
            //         description: 'Login bem sucedido!',
            //         placement: 'bottomRight',
            //     });
            // })
        }).catch(err => {
            api.error({
                message: `Erro`,
                description: err?.response?.data,
                placement: 'bottomRight',
            });
        })
    };
    return (
        <div className="w-full h-full p-[10px]">
            <Form form={form} onFinish={handleFormSubmit}>
                <Form.Item label="Inicio" name="startDateTime" required rules={[{ required: true }]}>
                    <DatePicker showTime />
                </Form.Item>
                <Form.Item label="Fim" name="endDateTime" required rules={[{ required: true }]}>
                    <DatePicker showTime />
                </Form.Item>
                <Form.Item label="Maximo de participantes" name="maxParticipants" required rules={[{ required: true }]}>
                    <InputNumber />
                </Form.Item>
                <Form.Item label="Esporte" name="sportId" required rules={[{ required: true }]}>
                    <Select options={sports?.map(sport => {
                        return { label: sport.name, value: sport.id };
                    })} />
                </Form.Item>
                <Form.Item label="Quadra" name="courtId" required rules={[{ required: true }]}>
                    <Select options={courts?.map(court => {
                        return { label: court.name, value: court.id }
                    })} />
                </Form.Item>
                <Form.Item label="Descrição" name="description" required rules={[{ required: true }]}>
                    <Input.TextArea />
                </Form.Item>
                <div className="flex w-full">
                    <Button type="primary" size='middle' className='bg-[#1677ff] my-2 ml-auto' onClick={() => form.submit()}>Criar reserva</Button>
                </div>
            </Form>
            {contextHolder}
        </div>
    )
}

export default NewReservation;