import { Button, Form, Input, notification } from "antd";
import jwtDecode from "jwt-decode";
import { Dispatch, SetStateAction, useContext } from "react";
import UserContext from "../../contexts/user";
import requester from '../../requester'

const Login = ({ setModalVisibility }: { setModalVisibility: Dispatch<SetStateAction<boolean>> }) => {
    const [form] = Form.useForm()
    const { setDecodedToken } = useContext(UserContext);
    const [api, contextHolder] = notification.useNotification();


    const handleFormSubmit = (values: { ra: number, password: string }) => {
        values.ra = Number(values.ra);
        console.log(values);
        requester.post(`${process.env.NEXT_PUBLIC_API_URL}/login`, values).then(data => {
            setDecodedToken(jwtDecode(data.data));
            localStorage.setItem('token', data.data);
            setModalVisibility(false)
            api.success({
                message: `Sucesso`,
                description: 'Login bem sucedido!',
                placement: 'bottomRight',
            });
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
                <Form.Item label="Email" name="email" required rules={[{ required: true }]}>
                    <Input type="email" />
                </Form.Item>
                <Form.Item label="RA" name="ra" required rules={[{ required: true }]}>
                    <Input type="number" />
                </Form.Item>
                <Form.Item label="Senha" name="password" required rules={[{ required: true }]}>
                    <Input.Password />
                </Form.Item>
                <div className="flex w-full">
                    <span className="text-primary underline pointer-click my-auto">Registrar-se</span>
                    <Button type="primary" size='middle' className='bg-[#1677ff] my-2 ml-auto' onClick={() => form.submit()}>Login</Button>
                </div>
            </Form>
            {contextHolder}
        </div>
    )
}

export default Login;