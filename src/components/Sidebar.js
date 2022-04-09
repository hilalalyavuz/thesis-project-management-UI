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

const Sidebar = () =>{

return(<ProSidebar>
  <Menu className='menu'>
     <h4 style={{marginLeft:'5rem'}}>Hoşgeldiniz!</h4>

     <h5> DASHBOARD </h5>
    <MenuItem className='menuItem'>
        <AssignmentIcon />
        Documents
     </MenuItem>
    <MenuItem className='menuItem'>
        <TaskAltIcon />
        Tasks
    </MenuItem>

    <h5> SUPERVISOR </h5>

    <MenuItem className='menuItem'>
        <ManageAccountsIcon />
        Choose Supervisor
    </MenuItem>

    <MenuItem className='menuItem'>
        <CalendarMonthIcon />
        Make an Appointment
    </MenuItem>

    <MenuItem className='menuItem'>
        <ChatIcon />
        Contact Supervisor
    </MenuItem>

    <h5> GROUP </h5>
    <MenuItem className='menuItem'>
        <GroupsIcon />
        Create Group
    </MenuItem>

    <h5> PROFILE </h5>
    <MenuItem className='menuItem'>
        <PermIdentityIcon />
        My Profile
    </MenuItem>

    <SubMenu title="Components" className='subMenu'>
      <MenuItem className='menuItem'>Component 1</MenuItem>
      <MenuItem className='menuItem'>Component 2</MenuItem>
    </SubMenu>
  </Menu>
</ProSidebar>);

};

export default Sidebar;
