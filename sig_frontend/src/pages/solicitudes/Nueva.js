import * as React from 'react';

import { 
  message,
  Card, 
  Divider, 
  Button, 
  Typography, 
  Form,
  Input,
  DatePicker,
  Select,
  Row,
  Col
} from 'antd';

import { 
  ContainerOutlined, 
} from '@ant-design/icons';

import {api_contratacion} from '../../config/axios'
import moment from 'moment';
const { Option } = Select;

const { TextArea } = Input;


export default function Formulario() {
  const [clients,setClients] = React.useState([])
  const [status,setStatus] = React.useState(false)
  const [services,setServices] = React.useState([])
  
  const [form] = Form.useForm();
  

  const resetForm = () => {
    form.resetFields();
  };

  const submitForm = async (values) =>{
    setStatus('loading');
    values.fecha_sol =  values.fecha_sol.toDate();
      const uri = "/solicitud";
      api_contratacion.post(uri,values).then(res=>{
        loadData();
        setStatus('recived');
        message.success('Solicitud Insertada correctamente')
        resetForm();
      }).catch(err=>{
        message.error(err.message)
      })
  }

  const onFinishFailed = (errorInfo) => {
    setStatus('error')
    message.error('Error interno')
    console.log('Failed:', errorInfo);
  };

  const loadData = ()=>{
    setStatus('loading');
    api_contratacion.get('/solicitud_nomen').then(res=>{
      setStatus('loading');
      const d = res.data.data; 
      setClients(d.clients)
      setServices(d.services)
      setStatus('recived')
    })
  }

  React.useEffect( ()=>{
    loadData();
  },[] )

  const loading = ()=>{
    return status == 'laading'?true:false
  }

  return (
      <Card style={{ width: '100%',paddingBottom:'10vh' }}>
         <div style={{display:'flex', justifyContent:'space-between'}}>
            <Typography.Title level={5} style={{ margin: 0 }}>
              <ContainerOutlined style={{marginRight:10}}/>
              Nueva solicitud de servicio
            </Typography.Title>
         </div>
            <Divider />

           <Form
              form={form}
              name="basic"
              layout="vertical"
              onFinish={submitForm}
              onFinishFailed={onFinishFailed}
              autoComplete="on"
            >
             
              <Form.Item
                label="Cliente"
                name="client"
                rules={[{ required: true, message: 'Debe escoger el cliente!' }]}
              >

                <Select placeholder="Escoja una opción" loading={loading()} disabled={loading()}>
                  {clients.map(item=>
                    <Option key={item._id} value={item._id}>{item.name}</Option>
                  )}
                </Select>
              </Form.Item>

              <Form.Item
                label="Servicio"
                name="service"
                rules={[{ required: true, message: 'Debe escoger el servicio!' }]}
              >

                <Select placeholder="Escoja una opción" loading={loading()} disabled={loading()}>
                  {services.map(item=>
                    <Option key={item._id} value={item._id}>{item.name}</Option>
                  )}
                </Select>
              </Form.Item>

              <Form.Item
                label="Descripción"
                name="description"
                rules={[{ required: true, message: 'Debe insertar el descripción!' }]}
              >
                <TextArea rows={4} placeholder="Descripción de la solicitud" />
              </Form.Item>
              <Form.Item
                label="Fecha"
                name="fecha_sol"
                type="text"
                rules={[
                  { required: true, message: 'Debe escoger la fecha de la solicitud!' },
                ]}
              >
                {/* <Input /> */}
                <DatePicker format={'DD/MM/YYYY'}  style={{ width: '100%' }}/>
              </Form.Item>
              <Card style={{margin:10}}>
                <Form.Item
                  label="Solicitante"
                  name="solicitante.name"
                  rules={[{ required: true, message: 'Debe insertar el nombre del solicitante!' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Cargo"
                  name="solicitante.cargo"
                  rules={[{ required: true, message: 'Debe insertar el cargo del solicitante!' }]}
                >
                  <Input />
                </Form.Item>
              </Card>
             <Divider />
                <Row>
                  <Col span={24} style={{ textAlign: 'right' }}>
                    <Button htmlType="button" onClick={resetForm}>
                      Limpiar
                    </Button>
                    <Button type="primary" style={{ background: "#007a3d", borderColor:"#007a3d", marginLeft:10 }} htmlType="submit">
                      Enviar
                    </Button>
                  </Col>
                </Row>
            </Form>

      </Card>
  );
}