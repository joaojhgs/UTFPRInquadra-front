import { Button, Card, Empty, Form, Modal, notification, Tabs } from "antd";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react"
import UserContext from "../../contexts/user"
import requester from "../../requester";
import { CirclePlus } from 'tabler-icons-react';
import CreateUpdateSport from "../../components/createUpdateSport";
import CreateUpdateCourt from "../../components/createUpdateCourt";


export default function Admin() {
    const { decodedToken } = useContext(UserContext);
    const router = useRouter();
    const [sports, setSports] = useState<{ id: string, maxAmount: string, name: string }[]>([]);
    const [courts, setCourts] = useState<{ id: string, name: string }[]>([]);
    const [createUpdateSportVisible, setCreateUpdateSportVisible] = useState(false);
    const [createUpdateCourtVisible, setCreateUpdateCourtVisible] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const [sportForm] = Form.useForm();
    const [courtForm] = Form.useForm();

    useEffect(() => {
        if(!createUpdateSportVisible){
            sportForm.resetFields();
        }
    }, [createUpdateSportVisible])

    useEffect(() => {
        if(!createUpdateCourtVisible){
            courtForm.resetFields();
        }
    }, [createUpdateCourtVisible])

    useEffect(() => {
        if (decodedToken !== undefined) {
            if (decodedToken === null) {
                router.push('/')
            } else if (decodedToken?.role !== 'ADMIN') router.push('/')
        }
        console.log(decodedToken)
    }, [decodedToken])

    useEffect(() => {
        requester.get(`${process.env.NEXT_PUBLIC_API_URL}/sports`).then(data => {
            console.log(data.data)
            setSports(data.data);
        }).catch(err => {
            console.log(err)
        });
        requester.get(`${process.env.NEXT_PUBLIC_API_URL}/courts`).then(data => {
            console.log(data.data)
            setCourts(data.data);
        }).catch(err => {
            console.log(err)
        });
    }, [])

    const deleteSport = (sportId: string) => requester.post(`${process.env.NEXT_PUBLIC_API_URL}/sports/delete`, {id: sportId}).then((data) => {
        api.success({
            message: `Sucesso`,
            description: 'Esporte removido com sucesso!',
            placement: 'bottomRight',
        });
        setCreateUpdateSportVisible(false)
    }).catch(err => {
        api.error({
            message: `Erro`,
            description: err?.response?.data,
            placement: 'bottomRight',
        });
    })

    const handleSportSubmit = (values: { name: string, maxAmount: number, id?: string }) => {
        console.log(values);
        if (values.id) {
            requester.post(`${process.env.NEXT_PUBLIC_API_URL}/sports/update`, values).then(data => {
                api.success({
                    message: `Sucesso`,
                    description: 'Esporte atualizdo com sucesso!',
                    placement: 'bottomRight',
                });
                setCreateUpdateSportVisible(false)
            }).catch(err => {
                api.error({
                    message: `Erro`,
                    description: err?.response?.data,
                    placement: 'bottomRight',
                });
            })
        } else {
            requester.post(`${process.env.NEXT_PUBLIC_API_URL}/sports/create`, values).then(data => {
                api.success({
                    message: `Sucesso`,
                    description: 'Esporte criado com sucesso!',
                    placement: 'bottomRight',
                });
                setCreateUpdateSportVisible(false)
            }).catch(err => {
                api.error({
                    message: `Erro`,
                    description: err?.response?.data,
                    placement: 'bottomRight',
                });
            })
        }
    };

    const deleteCourt = (courtId: string) => requester.post(`${process.env.NEXT_PUBLIC_API_URL}/courts/delete`, {id: courtId}).then((data) => {
        api.success({
            message: `Sucesso`,
            description: 'Quadra removida com sucesso!',
            placement: 'bottomRight',
        });
        setCreateUpdateSportVisible(false)
    }).catch(err => {
        api.error({
            message: `Erro`,
            description: err?.response?.data,
            placement: 'bottomRight',
        });
    })

    const handleCourtSubmit = (values: { name: string, id?: string }) => {
        console.log(values);
        if (values.id) {
            requester.post(`${process.env.NEXT_PUBLIC_API_URL}/courts/update`, values).then(data => {
                api.success({
                    message: `Sucesso`,
                    description: 'Quadra atualizada com sucesso!',
                    placement: 'bottomRight',
                });
                setCreateUpdateCourtVisible(false)
            }).catch(err => {
                api.error({
                    message: `Erro`,
                    description: err?.response?.data,
                    placement: 'bottomRight',
                });
            })
        } else {
            requester.post(`${process.env.NEXT_PUBLIC_API_URL}/courts/create`, values).then(data => {
                api.success({
                    message: `Sucesso`,
                    description: 'Quadra criada com sucesso!',
                    placement: 'bottomRight',
                });
                setCreateUpdateCourtVisible(false)
            }).catch(err => {
                api.error({
                    message: `Erro`,
                    description: err?.response?.data,
                    placement: 'bottomRight',
                });
            })
        }
    };

    const SportsCrud = (): React.ReactNode => {
        return (
            <>
                <button className="w-[100%]" onClick={() => setCreateUpdateSportVisible(true)}>
                    <div className="w-[100%] flex justify-center border rounded">
                        <CirclePlus
                            size={30}
                            color='black'
                            className="ml-[20px] mr-auto"
                            strokeWidth={2} />
                        <span
                            className="mr-auto my-auto font-bold"
                        >Novo esporte</span>
                    </div>
                </button>
                {sports.length > 0 ? sports.map(sport => <Card key={sport.id} title={sport.name} bordered={false} className="my-2 w-[100%] max-w-[300px]">
                    <p>Maximo recomendado: {sport?.maxAmount}</p>
                    <div className="flex">
                        <Button className="w-full bg-[#1677ff] text-white my-4" onClick={() => {
                            setCreateUpdateSportVisible(true);
                            sportForm.setFieldsValue({ name: sport.name, maxAmount: sport.maxAmount, id: sport.id });
                        }}>Atualizar</Button>
                        <Button className="w-full bg-[red] text-white my-4" onClick={() => { deleteSport(sport.id)}}>Remover</Button>
                    </div>
                </Card>) : <Empty description="Vazio" />}
            </>
        )
    }

    const CourtsCrud = (): React.ReactNode => {
        return (
            <>
                <button className="w-[100%]" onClick={() => setCreateUpdateCourtVisible(true)}>
                    <div className="w-[100%] flex justify-center border rounded">
                        <CirclePlus
                            size={30}
                            color='black'
                            className="ml-[20px] mr-auto"
                            strokeWidth={2} />
                        <span
                            className="mr-auto my-auto font-bold"
                        >Nova quadra</span>
                    </div>
                </button>
                {courts.length > 0 ? courts.map(court => <Card key={court.id} title={court.name} bordered={false} className="my-2 w-[100%] max-w-[300px]">
                    <div className="flex">
                        <Button className="w-full bg-[#1677ff] text-white my-4" onClick={() => {
                            setCreateUpdateCourtVisible(true);
                            courtForm.setFieldsValue({ name: court.name, id: court.id });
                        }}>Atualizar</Button>
                        <Button className="w-full bg-[red] text-white my-4" onClick={() => { deleteCourt(court.id)}}>Remover</Button>
                    </div>
                </Card>) : <Empty description="Vazio" />}
            </>
        )
    }

    return (
        <>
            <Tabs
                defaultActiveKey="1"
                centered
                items={[
                    {
                        label: `Esportes`,
                        key: '1',
                        children: SportsCrud(),
                    },
                    {
                        label: `Quadras`,
                        key: '2',
                        children: CourtsCrud(),
                    },
                    {
                        label: `Horarios`,
                        key: '3',
                        disabled: true,
                        children: `Content of Tab Pane 3`,
                    },
                ]}
            />
            <Modal open={createUpdateSportVisible} onCancel={() => { setCreateUpdateSportVisible(false) }} footer>
                <Form form={sportForm} onFinish={handleSportSubmit}>
                    <CreateUpdateSport />
                </Form>
            </Modal>
            <Modal open={createUpdateCourtVisible} onCancel={() => { setCreateUpdateCourtVisible(false) }} footer>
                <Form form={courtForm} onFinish={handleCourtSubmit}>
                    <CreateUpdateCourt sports={sports} />
                </Form>
            </Modal>
            {contextHolder}
        </>
    )
}