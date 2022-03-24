import {useEffect, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { CircularProgress } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Snackbar } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import { useNavigate } from 'react-router-dom';

import Copyright from '../components/Copyright'
import { api_security } from '../config/axios'
import theme from '../config/theme';


export default function Login() {
  
  const [error,setError] = useState('');
  const [load,setLoad] = useState(false);
  const [login,setLogin] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');
    setLoad(true);
    const data = new FormData(event.currentTarget);
    const dataFrm = {
      username: data.get('email'),
      password: data.get('password'),
    };
    api_security.post('/login',dataFrm).then(res=>{
      console.log(res)
      setLogin(true)
      navigate('/',{replace:true});
    }).catch(err=>{
      console.log(err.response.data.error)
      setError(err.response.data.error);
      setLoad(false)
    })
  };


  const message = ()=>{
    if(error)
      return (
        <Alert severity="error"  >{error}</Alert>
      )

      return  (<></>)
  }

  const loading = (text)=>{
    if(load)
      return (
        <CircularProgress color="success"/>
      )

      return  (<>{text}</>)
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            SIG ENPA
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            
           {message()}

            <Button
              type="submit"
              fullWidth
              disabled = {load}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {loading('Entrar')}
            </Button>
           
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
        <Snackbar 
          open={login} 
          autoHideDuration={3000} 
          onClose={()=>{
            setLogin(false);
          }}
          anchorOrigin={{vertical: 'top',
          horizontal: 'center'}}>
          <Alert severity="success" sx={{ width: '100%' }}>
            Login correcto, bienvenidos al SIG ENPA
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
}