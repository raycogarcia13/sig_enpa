import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import {
    DashboardOutlined,
    AppstoreOutlined,
    ContainerOutlined,
  } from '@ant-design/icons';

const { SubMenu } = Menu;

export default (props)=>{

    return (
        <Menu mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Divider />
            <Menu.Item key="home" icon={<DashboardOutlined />}>
              <Link to="/"/>
              Inicio
            </Menu.Item>
            
            <SubMenu key="nomencladores" icon={<AppstoreOutlined />} title="Nomencladores">
                <Menu.Item key="nom_ser" icon={<ContainerOutlined />}>
                    <Link to="/servicios" />
                    Servicios
                </Menu.Item>
                <Menu.Item key="nom_client" icon={<ContainerOutlined />} >
                    <Link to="/clients" />
                    Clientes
                </Menu.Item>
            </SubMenu>
        </Menu>
    )
}