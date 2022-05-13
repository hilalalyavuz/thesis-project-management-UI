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
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import { useEffect,useRef } from 'react';
import logo from '../img/logo.png';
import React from 'react';

const Sidebar = (props) =>{
    if(document.getElementById(props.dname)){
        var a = document.getElementById(props.dname);
     //   a.style = "background-color:red";
    }
    
return(
<ProSidebar>
  <Menu className='menu'>
     <img src={logo} style={{height:'20%',width:'50%',marginLeft:'3.5rem'}}/>
     <MenuItem className='menuItem' id='Home' icon={ <HomeOutlinedIcon />}>
        Home
        <Link to={'/Home'} />
     </MenuItem>
    <MenuItem className='menuItem' id='Documents' icon={<AssignmentIcon />}>
        Documents
        <Link to={'/Documents'} />
     </MenuItem>
    <MenuItem className='menuItem' id='Tasks' icon={ <TaskAltIcon />}>
        Tasks
        <Link to={'/Tasks'} />
    </MenuItem>

    <h5> SUPERVISOR </h5>

    <MenuItem className='menuItem' id='MakeApp' icon={<CalendarMonthIcon />}>
        Make an Appointment
        <Link to={'/MakeAppointment'} />
    </MenuItem>

    <MenuItem className='menuItem' id='ContactSupervisor' icon={<ChatIcon />}>
        Contact Supervisor
        <Link to={'/ContactSupervisor'} />
    </MenuItem>

    <h5> PROFILE </h5>
    <MenuItem className='menuItem' id='Profile' icon={<PermIdentityIcon />}>
        My Profile
        <Link to={'/Profile'} />
    </MenuItem>
         
 <SubMenu title="Project Settings" icon={<SettingsIcon></SettingsIcon>}>
    <MenuItem className='menuItem' id='CreateGroup'>
        <GroupsIcon />
        Create Group
        <Link to={'/CreateGroup'} />
    </MenuItem>
    <MenuItem className='menuItem' id='ChooseSup'>
        <ManageAccountsIcon />
        Choose Supervisor
        <Link to={'/ChooseSupervisor'} />
    </MenuItem>
    </SubMenu>
    
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
