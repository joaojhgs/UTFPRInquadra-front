import { Button, Form, Input, InputNumber, notification, Select } from "antd";
import { Dispatch, SetStateAction } from "react";

const CreateUpdateCourt = ({ sports }: {
    sports: Array<{
        id: string
        name: string
    }>
}) => {

    const form = Form.useFormInstance();

    return (
        <div className="w-full h-full p-[10px]">
            <Form.Item label="Name" name="name" required rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="id" />
            <div className="flex w-full">
                <Button type="primary" size='middle' className='bg-[#1677ff] my-2 ml-auto' onClick={() => form.submit()}>{form.getFieldValue('id') ? 'Salvar' : 'Criar quadra'}</Button>
            </div>
        </div>
    )
}

export default CreateUpdateCourt;