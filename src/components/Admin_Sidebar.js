import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import '../css/Sidebar.css'
import AssignmentIcon from '@mui/icons-material/Assignment';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import ChatIcon from '@mui/icons-material/Chat';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GroupsIcon from '@mui/icons-material/Groups';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import LogoutIcon from '@mui/icons-material/Logout';
import {Link} from 'react-router-dom';

const Sidebar = (props) =>{

return(
<ProSidebar>
  <Menu className='menu'>
     <h4 style={{marginLeft:'5rem'}}>Hoşgeldiniz!
     <Link to={'/Home'} />
     </h4>

     <h5> DASHBOARD </h5>
    <MenuItem className='menuItem'>
        <AssignmentIcon />
        Documents
        <Link to={'/DocumentsAdmin'} />
     </MenuItem>
    <MenuItem className='menuItem'>
        <TaskAltIcon />
        User
        <Link to={'/'} />
    </MenuItem>

    <MenuItem className='menuItem'>
        <ManageAccountsIcon />
        Message
        <Link to={'/'} />
    </MenuItem>

    
    <div style={{display:'flex',height:'100%',alignItems:'flex-end'}}>
        <MenuItem className='menuItem'>
        <h5 style={{marginLeft:'0rem',marginRight:'8rem'}}> {props.name} </h5>
        <LogoutIcon />
        Log Out
        <Link to={'/'} />
    </MenuItem>
    </div>
    

  </Menu>

  
</ProSidebar>);

};

export default Sidebar;