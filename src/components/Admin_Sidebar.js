import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import '../css/Sidebar.css'
import AssignmentIcon from '@mui/icons-material/Assignment';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import GroupsIcon from '@mui/icons-material/Groups';
import LogoutIcon from '@mui/icons-material/Logout';
import {Link} from 'react-router-dom';
import logo from '../img/logo.png';

const Sidebar = (props) =>{

return(
<ProSidebar>
  <Menu className='menu'>
  <img src={logo} style={{height:'20%',width:'50%',marginLeft:'3.5rem'}}/>
     <h5> DASHBOARD </h5>
    <MenuItem className='menuItem' icon={<AssignmentIcon />}>
        Documents
        <Link to={'/DocumentsAdmin'} />
     </MenuItem>
    <MenuItem className='menuItem' icon={<GroupsIcon />}>
        User
        <Link to={'/UserAdmin'} />
    </MenuItem>

    <MenuItem className='menuItem' icon={<MailOutlineIcon />}>
        Message
        <Link to={'/AdminMessages'} />
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
