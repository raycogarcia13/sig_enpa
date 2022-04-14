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
    { dataIndex: 'name', key: 'name', title: 'Cliente' },
    { dataIndex: 'organismo', key: 'organismo', title: 'Organismo'},
    { dataIndex: 'reeup', key: 'reeup', title: 'Reeup'},
    { dataIndex: 'nit', key: 'nit', title: 'NIT' },
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
    item.resolucion_fecha = moment(item.resolucion_fecha)
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
    values.resolucion_fecha =  values.resolucion_fecha.toDate();
    if(action=='Nuevo'){
      const uri = "/client";
      api_contratacion.post(uri,values).then(res=>{
        loadData();
        setStatus('recived');
        message.success('Cliente Insertado correctamente')
        handleClose();
      }).catch(err=>{
        message.error(err.message)
      })
    }else{
      const uri = `/client/${id}`;
      api_contratacion.put(uri,values).then(res=>{
        loadData();
        setStatus('recived');
        message.success('Cliente actualizado correctamente')
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
    api_contratacion.get('/client').then(res=>{
      const d = res.data.data; 
      setData(d.map((it)=>{return {...it,key:it._id}}))
    })
  }

  React.useEffect( ()=>{
    loadData();
  },[] )

  const expandedRowRender = (prop)=>{
    return (
      <Card key={prop._id}>
         <Descriptions title="Información del cliente">
            <Descriptions.Item label="Cliente">{prop.name}</Descriptions.Item>
            <Descriptions.Item label="Organismo">{prop.organismo}</Descriptions.Item>
            <Descriptions.Item label="Teléfono">{prop.phone}</Descriptions.Item>
            <Descriptions.Item label="Dirección">{prop.address}</Descriptions.Item>
            <Descriptions.Item label="Cuenta CUP">{prop.account_cup}</Descriptions.Item>
            <Descriptions.Item label="Código REEUP">{prop.reeup}</Descriptions.Item>
            <Descriptions.Item label="Código NIT">{prop.nit}</Descriptions.Item>
            <Descriptions.Item label="Municipio">{prop.municipio}</Descriptions.Item>
            <Descriptions.Item label=""></Descriptions.Item>
            <Descriptions.Item label="Director">{prop.director}</Descriptions.Item>
            <Descriptions.Item label="Resolución">{prop.resolucion_director}</Descriptions.Item>
            <Descriptions.Item label="Fecha">{prop.resolucion_fecha}</Descriptions.Item>
          </Descriptions>,
      </Card>
    );
  }
  
  const loading = ()=>{
    return status == 'laading'?true:false
  }

  return (
      <Card style={{ width: '100%',paddingBottom:'10vh' }}>
         <div style={{display:'flex', justifyContent:'space-between'}}>
            <Typography.Title level={5} style={{ margin: 0 }}>
              <ContainerOutlined style={{marginRight:10}}/>
              Clientes
            </Typography.Title>
          <Button onClick={nuevoOpen} type='primary' style={{ background: "#007a3d", borderColor:"#007a3d" }}>Nuevo</Button>
         </div>

         <Divider />
          <Table
            dataSource={data}
            columns={columns}
            expandable={{expandedRowRender}}
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
                label="Cliente"
                name="name"
                rules={[{ required: true, message: 'Debe insertar el cliente!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Organismo"
                name="organismo"
                rules={[{ required: true, message: 'Debe insertar el organismo!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Teléfono"
                name="phone"
                type="number"
                rules={[
                  { required: true, message: 'Debe insertar el teléfono!' },
                  { len: 8, message: 'Debe insertar un teléfono valido!' }
                ]}
              >
                <Input addonBefore="+53" />
              </Form.Item>
              <Form.Item
                label="Dirección"
                name="address"
                type="text"
                rules={[
                  { required: true, message: 'Debe insertar la dirección!' },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Cuenta"
                name="account_cup"
                type="text"
                rules={[
                  { required: true, message: 'Debe insertar la cuenta!' },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Código REEUP"
                name="reeup"
                type="text"
                rules={[
                  { required: true, message: 'Debe insertar el código reeup!' },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Código NIT"
                name="nit"
                type="text"
                rules={[
                  { required: true, message: 'Debe insertar el código NIT!' },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Municipio"
                name="municipio"
                type="text"
                rules={[
                  { required: true, message: 'Debe insertar el municipio!' },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Director"
                name="director"
                type="text"
                rules={[
                  { required: true, message: 'Debe insertar el director!' },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Resolución"
                name="resolucion_director"
                type="text"
                rules={[
                  { required: true, message: 'Debe insertar la resolución de nombramiento!' },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Fecha res"
                name="resolucion_fecha"
                type="text"
                rules={[
                  { required: true, message: 'Debe insertar la fecha de la resolución!' },
                ]}
              >
                {/* <Input /> */}
                <DatePicker format={'DD/MM/YYYY'}  style={{ width: '100%' }}/>
              </Form.Item>
            </Form>
        </Modal>

      </Card>
  );
}