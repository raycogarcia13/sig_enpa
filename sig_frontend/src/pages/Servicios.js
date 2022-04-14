import * as React from 'react';

import { 
  Table, 
  Modal,
  message,
  Space, 
  Card, 
  Divider, 
  Button, 
  Typography, 
  Form,
  Input,
  DatePicker,
  Tooltip,
  Descriptions
} from 'antd';

import { 
  ContainerOutlined, 
  DeleteOutlined, 
  EditOutlined 
} from '@ant-design/icons';

import {api_contratacion} from '../config/axios'
import moment from 'moment';


export default function DataTable() {
  const [open, setOpen] = React.useState(false);
  const [data,setData] = React.useState([])
  const [nuevo,setNuevo] = React.useState({})
  const [action,setAction] = React.useState("Nuevo")
  
  const [form] = Form.useForm();
  
  const [id,setId] = React.useState("")
  const [status,setStatus] = React.useState('')

  const columns = [
    { dataIndex: 'name', key: 'name', title: 'Servicio' },
    { dataIndex: 'description', key: 'description', title: 'Descripción'},
    {
      key:'actions', title:'...',
      render: (item)=>{
        return (
           <Space>
            <Tooltip title="Editar">
              <Button onClick={()=>editOpen(item)} icon={<EditOutlined />} />
            </Tooltip>
            <Tooltip title="Eliminar">
              <Button onClick={()=>editOpen(item)} type="danger" icon={<DeleteOutlined />} />
            </Tooltip>
            
          </Space>
        )
      }
    }
  ];

  const nuevoOpen = () => {
    setAction('Nuevo')
    setOpen(true);
  };

  const editOpen = async (item) => {
    setId(item._id);
    form.setFieldsValue(item);
    setAction('Editar')
    setOpen(true);
  };

  const handleClose = () => {
    setNuevo({})
    form.resetFields();
    setOpen(false);
    setStatus('');
  };

  const submitForm = async (values) =>{
    setStatus('loading');
    if(action=='Nuevo'){
      const uri = "/service";
      api_contratacion.post(uri,values).then(res=>{
        loadData();
        setStatus('recived');
        message.success('Servicio Insertado correctamente')
        handleClose();
      }).catch(err=>{
        message.error(err.message)
      })
    }else{
      const uri = `/service/${id}`;
      api_contratacion.put(uri,values).then(res=>{
        loadData();
        setStatus('recived');
        message.success('Servicio actualizado correctamente')
        handleClose();
      }).catch(err=>{
        message.error(err.message)
      })
    }
  }

  const onFinishFailed = (errorInfo) => {
    setStatus('error')
    message.error('Error interno')
    console.log('Failed:', errorInfo);
  };

  const loadData = ()=>{
    api_contratacion.get('/service').then(res=>{
      const d = res.data.data; 
      setData(d.map((it)=>{return {...it,key:it._id}}))
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
              Servicios
            </Typography.Title>
          <Button onClick={nuevoOpen} type='primary' style={{ background: "#007a3d", borderColor:"#007a3d" }}>Nuevo</Button>
         </div>

         <Divider />
          <Table
            dataSource={data}
            columns={columns}
          />


        <Modal
          title={`${action} cliente`}
          visible={open}
          confirmLoading={loading()}
          okText="Enviar"
          onCancel={handleClose}
          cancelText="Cancelar"
          footer={
            <>
              <Button key="btnclose" onClick={handleClose}>
                  Cancelar
              </Button>
              <Button type='primary' onClick={form.submit} form={form} loading={loading()} key="btnsubmit" htmlType="submit">
                  Enviar
              </Button>
            </>
            }
          >
           <Form
              form={form}
              name="basic"
              labelCol={{ span: 5 }}
              layout="horizontal"
              initialValues={nuevo}
              onFinish={submitForm}
              onFinishFailed={onFinishFailed}
              autoComplete="on"
            >
              <Form.Item
                label="Servicio"
                name="name"
                rules={[{ required: true, message: 'Debe insertar el servicio!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Descripción"
                name="description"
                rules={[{ required: true, message: 'Debe insertar la descripción!' }]}
              >
                <Input />
              </Form.Item>
            </Form>
        </Modal>

      </Card>
  );
}