// import { Grid, Box } from '@mui/material';
import { Col, Layout, Row } from 'antd';
import { Content } from 'antd/lib/layout/layout';

export default function Home() {
    return (
      <>
          <Row style={{height:'100%'}} type="flex" justify="space-around" align='middle'>
              <img width={'50%'} src={require('../assets/image/404.jpg')}/>
          </Row>
      </>
    );
  } 