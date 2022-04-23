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
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import {Link} from 'react-router-dom';

const Sidebar = (props) =>{

return(
<ProSidebar>
  <Menu className='menu'>
     <h4 style={{marginLeft:'5rem'}}>Hoşgeldiniz!
     <Link to={'/Home'} />
     </h4>
     <MenuItem className='menuItem'>
        <HomeOutlinedIcon />
        Home
        <Link to={'/'} />
     </MenuItem>
     <h5> STUDENTS </h5>
     <MenuItem className='menuItem'>
        <GroupsIcon />
        Students
        <Link to={'/'} />
    </MenuItem>
    <MenuItem className='menuItem'>
        <CalendarMonthIcon />
        Appointment Requests
        <Link to={'/'} />
     </MenuItem>
     <MenuItem className='menuItem'>
        <EmailOutlinedIcon />
        Messages
        <Link to={'/'} />
     </MenuItem>
     <MenuItem className='menuItem'>
     <AssignmentIcon />
        Documents
        <Link to={'/DocumentsSup'} />
     </MenuItem>
    <MenuItem className='menuItem'>
        <TaskAltIcon />
        Tasks
        <Link to={'/'} />
    </MenuItem>
    <h5> CONTACT </h5>
    <MenuItem className='menuItem'>
        <ChatIcon />
        Contact Admin
        <Link to={'/ContactSupervisor'} />
    </MenuItem>

    <h5> PROFILE </h5>
    <MenuItem className='menuItem'>
        <PermIdentityIcon />
        My Profile
        <Link to={'/Profile'} />
    </MenuItem>
    
    <div style={{display:'flex',height:'100%',alignItems:'flex-end'}}>
        <MenuItem className='menuItem'>
        <h5 style={{marginLeft:'0rem',marginRight:'8rem'}}> {props.name} </h5>
        <LogoutIcon />
        Log Out
        <Link to={'/Home'} />
    </MenuItem>
    </div>
    

  </Menu>

  
</ProSidebar>);

};

export default Sidebar;
