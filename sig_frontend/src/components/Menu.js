import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
// iconos
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountTreeIcon from '@mui/icons-material/AccountTree';

export default ()=>{
    return (
        <List component="nav">
            <Divider sx={{ my: 1 }} />
                <ListItemButton>
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                <ListItemText primary="Contratos" />
            </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>
                        <AccountTreeIcon />
                    </ListItemIcon>
                <ListItemText primary="Proyectos" />
            </ListItemButton>
        </List>
    )
}