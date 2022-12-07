import { Button, Form, Input } from "antd";
import jwtDecode from "jwt-decode";
import { useContext } from "react";
import UserContext from "../../contexts/user";
import requester from '../../requester'

const Login = () => {
    const [form] = Form.useForm()
    const {setDecodedToken} = useContext(UserContext);
    const handleFormSubmit = (values: { ra: number, password: string }) => {
        values.ra = Number(values.ra);
        console.log(values);
        requester.post(`${process.env.NEXT_PUBLIC_API_URL}/login`, values).then(data => {
            console.log(data)
            setDecodedToken(jwtDecode(data.data));
            localStorage.setItem('token', data.data);

        }).catch(err => {
            console.log(err);
        })
    };
    return (
        <div className="w-full h-full p-[10px]">
            <Form form={form} onFinish={handleFormSubmit}>
                <Form.Item label="RA" name="ra">
                    <Input type="number" />
                </Form.Item>
                <Form.Item label="Senha" name="password">
                    <Input.Password />
                </Form.Item>
                <div className="flex w-full">
                    <Button type="primary" size='middle' className='bg-[#1677ff] my-2 ml-auto' onClick={() => form.submit()}>Login</Button>
                </div>
            </Form>
        </div>
    )
}

export default Login;