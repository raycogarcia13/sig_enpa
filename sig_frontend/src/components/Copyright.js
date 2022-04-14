import { Footer } from 'antd/lib/layout/layout';
import { Link } from 'react-router-dom';

export default (props)=>{
    return (
      <Footer style={{ textAlign: 'center' }}>
        {'Copyright © '}
        <a color="inherit" href="https://portal.enpa.iju.minag.cu/">
          ENPA
        </a>{' '}
        {new Date().getFullYear()}
        {'.'}
        </Footer>
    );
}