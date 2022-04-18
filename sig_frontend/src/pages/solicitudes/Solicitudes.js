import * as React from 'react';

import { 
  Table, 
  message,
  Space, 
  Card, 
  Divider, 
  Button, 
  Typography, 
  Form,
  Descriptions
} from 'antd';

import { 
  ContainerOutlined, 
  DeleteOutlined, 
  EditOutlined 
} from '@ant-design/icons';

import {api_contratacion} from '../../config/axios'


export default function DataTable() {
  const [open, setOpen] = React.useState(false);
  const [data,setData] = React.useState([])
  const [nuevo,setNuevo] = React.useState({})
  const [action,setAction] = React.useState("Nuevo")
  
  const [form] = Form.useForm();
  
  const [id,setId] = React.useState("")
  const [status,setStatus] = React.useState('')

  const columns = [
    { dataIndex: 'client', key: 'client', title: 'Cliente',
      render: (item)=>{
        return (
          <Space>
          {item.name}
          </Space>
        )
      } 
    },
    { dataIndex: 'service', key: 'service', title: 'Servicio',
        render: (item)=>{
          return (
            <Space>
            {item.name}
            </Space>
          )
        } 
      },
    { dataIndex: 'fecha_sol', key: 'fecha_sol', title: 'Fecha de solicitud'},
  ];

  const loadData = ()=>{
    api_contratacion.get('/solicitud').then(res=>{
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

         <Descriptions title="Descripción de la solicitud">
          <Descriptions.Item>{prop.description}</Descriptions.Item>
         </Descriptions>
         <Descriptions title="Información del cliente">
            <Descriptions.Item label="Cliente">{prop.client.name}</Descriptions.Item>
            <Descriptions.Item label="Organismo">{prop.client.organismo}</Descriptions.Item>
            <Descriptions.Item label="Teléfono">{prop.client.phone}</Descriptions.Item>
            <Descriptions.Item label="Dirección">{prop.client.address}</Descriptions.Item>
            <Descriptions.Item label="Cuenta CUP">{prop.client.account_cup}</Descriptions.Item>
            <Descriptions.Item label="Código REEUP">{prop.client.reeup}</Descriptions.Item>
            <Descriptions.Item label="Código NIT">{prop.client.nit}</Descriptions.Item>
            <Descriptions.Item label="Municipio">{prop.client.municipio}</Descriptions.Item>
            <Descriptions.Item label=""></Descriptions.Item>
            <Descriptions.Item label="Director">{prop.client.director}</Descriptions.Item>
            <Descriptions.Item label="Resolución">{prop.client.resolucion_director}</Descriptions.Item>
            <Descriptions.Item label="Fecha">{prop.client.resolucion_fecha}</Descriptions.Item>
          </Descriptions>
         <Descriptions title="Información del servicio">
            <Descriptions.Item label="Servicio">{prop.service.name}</Descriptions.Item>
            <Descriptions.Item label="Descripción">{prop.service.description}</Descriptions.Item>
          </Descriptions>
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
              Soliitudes
            </Typography.Title>
         </div>

         <Divider />
          <Table
            dataSource={data}
            columns={columns}
            expandable={{expandedRowRender}}
          />
      </Card>
  );
}