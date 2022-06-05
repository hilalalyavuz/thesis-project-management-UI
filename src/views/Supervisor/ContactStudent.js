import * as React from 'react';
import {useState, useRef, useEffect} from 'react'
import Sidebar from '../../components/Sup_Sidebar';
import '../../css/Common.css'
import '../../css/ContactSupervisor.css'
import TextField from '@mui/material/TextField';
import { Card } from '@mui/material';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Toast } from 'primereact/toast';
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import TextareaAutosize from '@mui/material/TextareaAutosize'; 
import axios from 'axios';
import { Dropdown } from "primereact/dropdown";
import { Helmet } from 'react-helmet';
import Unauthorized from '../Warnings/Unauthorized';

export default function ContactStudent() {

  
  let userEmail = sessionStorage.getItem("email");
  let tok = sessionStorage.getItem("token");
  const[pageRole, setPageRole] = useState(sessionStorage.getItem("role"));

  const config = {
    headers: { Authorization: `bearer ${tok}` }
  };
    const [state2, setState2] = useState([]);
    const [topic, setTopic] = useState("");
    const [message, setMessage] = useState("");
    const toast = useRef(null);
    const [groups, setGroups] = useState([]);
    const [groupsNames, setGroupsNames] = useState([]);
    const [selectedGroups, setSelectedGroups] = useState(null);
    const [id,setID] = useState();

      const handleChange2 = () => {
          axios.post(`https://localhost:7084/api/Supervisor/ContactStudent/${userEmail}`,{topic:topic,message:message,status_id:"new",to_user_id:id},config).then(response => {
            toast.current.show({severity:'success', summary: 'Success Message', detail:'Your message sent succesfully', life: 3000});
          }).catch(error => {
            toast.current.show({severity:'error', summary: `Error: ${error}`, life: 3000});
        });  
      }

      const onGroupChange = (e) => {
        setSelectedGroups(e.value);
        setID(e.value.split("Group ")[1]);
      } 
      
      useEffect(()=>{
        async function getData(){
            await axios.get(`https://localhost:7084/api/Supervisor/Group/${userEmail}`,config).then((result)=>{
                for(var i = 0; i < result.data.length; i++){
                  setGroups(oldArray => [...oldArray, result.data[i].id]);
                  setGroupsNames(oldArray => [...oldArray, `Group ${result.data[i].id}`]);
                }
            });
        }
        getData();
        setPageRole(sessionStorage.getItem("role"));
    
    },[]);



    return(
        <>
        { pageRole=="supervisor" ? 
        <div className='Page'>
        <Helmet>
        <title>Thesis Tracker | Contact Student</title>
        </Helmet>
        <Toast ref={toast} />
<div className='Sidebar'>
    <Sidebar/>
</div>

<div className='Main'>
  <div className='Main2'>
    

  <Card className="card" style={{width:'60%'}}>
    <h3>Contact Group</h3>
    <form onSubmit={handleChange2} style={{display:'flex', flexDirection:'column'}}>
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '50ch' },
      }}
      noValidate
      autoComplete="off"
    >
        <div className='area'>
        <label>
             Group:
            </label>
            <Dropdown style ={{width:'50ch'}}value={selectedGroups} options={groupsNames} onChange={onGroupChange} placeholder="Select a Group" />
        </div>
        <div className='area'>
            <label>
                Topic:
            </label>
            <TextField className='textf'
                required
                id="outlined-required"
                label="Topic"
                value={topic}
                onChange={(e)=>{setTopic(e.target.value)}}
            />
        </div>
        <div className='area'>
            <label>
                Message:
            </label>
            <TextField
                id="outlined-multiline-static"
                label="Message"
                multiline
                rows={4}
                value={message}
                onChange={(e)=>{setMessage(e.target.value)}}
        />
        </div>
      
    </Box>

       
    <div style={{display:'flex',justifyContent:'center',marginBottom:'1rem'}}>
         <Button style={{width:'40%'}} type="submit" value="Submit" variant="contained">Submit</Button>
       </div>
</form>
            
        
          
        
      </Card>  
    
  </div>
  
    


</div>

</div> : <Unauthorized></Unauthorized>}

        





      </>
    )
}