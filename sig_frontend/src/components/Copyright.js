import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export default (props)=>{
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://portla.enpa.iju.minag.cu/">
          SIG ENPA
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
}