import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import '../css/Sidebar.css'
import AssignmentIcon from '@mui/icons-material/Assignment';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import ChatIcon from '@mui/icons-material/Chat';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GroupsIcon from '@mui/icons-material/Groups';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import {Link} from 'react-router-dom';
import logo from '../img/logo.png';

const Sidebar = (props) =>{

    const logout = () => {
        sessionStorage.clear();
    }

return(
<ProSidebar>
  <Menu className='menu'>
  <img src={logo} style={{height:'20%',width:'50%',marginLeft:'3.5rem'}}/>
     <h5> STUDENTS </h5>
     <MenuItem className='menuItem' icon={<GroupsIcon />}>
        Students
        <Link to={'/Students'} />
    </MenuItem>
    <MenuItem className='menuItem' icon={<CalendarMonthIcon />}>
        Appointment Requests
        <Link to={'/AppointmentRequests'} />
     </MenuItem>
     <MenuItem className='menuItem' icon={<AccessTimeIcon />}>
        Available Hours
        <Link to={'/AvailableHours'} />
     </MenuItem>
     <MenuItem className='menuItem' icon={<AssignmentIcon />}>
        Documents
        <Link to={'/DocumentsSup'} />
     </MenuItem>
    <MenuItem className='menuItem' icon={<TaskAltIcon />}>
        Tasks
        <Link to={'/TaskSup'} />
    </MenuItem>
    <MenuItem className='menuItem' icon={<AccountBoxIcon />}>
        Choose Requests
        <Link to={'/ChooseRequests'} />
    </MenuItem>
    <h5> CONTACT </h5>
    <MenuItem className='menuItem' id='Contact' icon={<MailOutlineIcon/>}>
        Messages
        <Link to={'/Messages'} />
    </MenuItem>
    <SubMenu title="Contact" icon={<ChatIcon></ChatIcon>}>
    <MenuItem className='menuItem' icon={ <HelpOutlineIcon />}>
        Contact Admin
        <Link to={'/ContactAdmin'} />
    </MenuItem>
    <MenuItem className='menuItem' icon={ <ForwardToInboxIcon />}>
        Contact Student
        <Link to={'/ContactStudent'} />
    </MenuItem>
    </SubMenu>

    <h5> PROFILE </h5>
    <MenuItem className='menuItem' icon={<PermIdentityIcon />}>
        My Profile
        <Link to={'/ProfileSup'} />
    </MenuItem>
    
    <div style={{display:'flex',height:'100%',alignItems:'flex-end'}}>
        <MenuItem onClick={logout} className='menuItem'>
        <h5 style={{marginLeft:'0rem',marginRight:'8rem'}}> {props.name} </h5>
        <LogoutIcon />
        Log Out
        <Link to={'/SignIn'} />
    </MenuItem>
    </div>
    

  </Menu>

  
</ProSidebar>);

};

export default Sidebar;
